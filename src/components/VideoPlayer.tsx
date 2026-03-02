import { getModuleAccess } from "@/services/videoAccess";
import { supabase } from "@/supabaseclient";
import { AlertCircle, Loader, Lock, Play, RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../app/components/ui/button";

interface VideoPlayerProps {
  moduleId: string;
  userId?: string;
  moduleName?: string;
  onProgress?: (progress: number) => void;
}

type PlayerState =
  | "idle"
  | "checking-access"
  | "loading"
  | "playing"
  | "error"
  | "paused";

export function VideoPlayer({
  moduleId,
  userId,
  moduleName = "Module",
  onProgress,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playerState, setPlayerState] = useState<PlayerState>("checking-access");
  const [access, setAccess] = useState<boolean | null>(null);
  const [accessMessage, setAccessMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [bufferedPercent, setBufferedPercent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    checkAccess();
  }, [moduleId, userId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const progress = duration > 0 ? (video.currentTime / duration) * 100 : 0;
      setCurrentTime(video.currentTime);
      onProgress?.(progress);
      saveWatchProgress(progress);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const percent = (bufferedEnd / video.duration) * 100;
        setBufferedPercent(percent);
      }
    };

    const handlePlay = () => {
      setPlayerState("playing");
    };

    const handlePause = () => {
      setPlayerState("paused");
    };

    const handleError = () => {
      setPlayerState("error");
      setError("Error playing video. Please try refreshing.");
      toast.error("Video playback error");
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("progress", handleProgress);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("error", handleError);
    };
  }, [duration, onProgress]);

  const checkAccess = async () => {
    setPlayerState("checking-access");
    setError(null);
    try {
      const result = await getModuleAccess(moduleId, userId);
      setAccess(result.access);
      if (!result.access) {
        setAccessMessage(result.message || "");
      }
      setPlayerState("idle");
    } catch (error) {
      console.error("Error checking access:", error);
      setAccess(false);
      setAccessMessage("Error checking access");
      setError("Failed to verify access. Please refresh the page.");
      setPlayerState("error");
      toast.error("Failed to check module access");
    }
  };

  const handlePlayClick = async () => {
    if (!access) {
      toast.error(accessMessage || "You don't have access to this module");
      return;
    }

    setPlayerState("loading");
    setError(null);

    try {
      const { data: authData } = await supabase.auth.getSession();
      const token = authData.session?.access_token;

      if (!token) {
        throw new Error("Authentication required");
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
      const response = await fetch(
        `${supabaseUrl}/functions/v1/serve-video?moduleId=${moduleId}&mode=stream`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP ${response.status}: Failed to load video`
        );
      }

      if (!response.body) {
        throw new Error("No response body from video stream");
      }

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }
      } catch (streamError) {
        console.error("Stream error:", streamError);
        throw new Error(
          "Failed to download video. Check your connection and try again."
        );
      }

      const blob = new Blob(chunks as BlobPart[], { type: "video/mp4" });
      const blobUrl = URL.createObjectURL(blob);

      if (videoRef.current) {
        videoRef.current.src = blobUrl;
        videoRef.current.play().catch((err) => {
          console.error("Autoplay failed:", err);
          setPlayerState("paused");
        });
        setPlayerState("playing");
        toast.success("Video loaded successfully");
      }
    } catch (error) {
      console.error("Error loading video:", error);
      setPlayerState("error");
      setError(
        error instanceof Error ? error.message : "Failed to load video. Please try again."
      );
      toast.error("Failed to load video");
    }
  };

  const handleRefresh = () => {
    setError(null);
    setPlayerState("idle");
    if (videoRef.current) {
      videoRef.current.src = "";
      setCurrentTime(0);
      setDuration(0);
    }
  };

  const handleContactSupport = () => {
    toast.info("Redirecting to support...");
    window.location.href = "/contact";
  };

  const saveWatchProgress = async (progress: number) => {
    if (!userId) return;

    try {
      await supabase
        .from("user_progress")
        .upsert(
          {
            user_id: userId,
            module_id: moduleId,
            progress_percent: Math.round(progress),
            last_watched_at: new Date().toISOString(),
          },
          { onConflict: "user_id,module_id" }
        )
        .then(({ error }) => {
          if (error && !error.message.includes("user_progress")) {
            console.debug("Progress tracking: table may not exist");
          }
        });
    } catch (error) {
      console.debug("Progress tracking unavailable");
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || !isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (playerState === "checking-access") {
    return (
      <div className="flex items-center justify-center w-full h-64 bg-gray-900 rounded-lg">
        <div className="flex flex-col items-center gap-3">
          <Loader className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-gray-300 text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (access === false) {
    return (
      <div className="w-full">
        <div className="relative w-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-center px-6">
            <Lock className="w-12 h-12 text-red-500" />
            <div>
              <h3 className="text-white font-semibold mb-1">Locked Module</h3>
              <p className="text-gray-300 text-sm">{accessMessage}</p>
            </div>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">{moduleName}</div>
      </div>
    );
  }

  if (playerState === "error") {
    return (
      <div className="w-full">
        <div className="relative w-full bg-gradient-to-r from-red-900 to-red-950 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-center px-6">
            <AlertCircle className="w-12 h-12 text-red-400" />
            <div>
              <h3 className="text-white font-semibold mb-1">Playback Error</h3>
              <p className="text-gray-200 text-sm mb-4">{error}</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Button
                  size="sm"
                  onClick={handleRefresh}
                  variant="outline"
                  className="gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
                <Button
                  size="sm"
                  onClick={handleContactSupport}
                  variant="secondary"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">{moduleName}</div>
      </div>
    );
  }

  if (playerState === "loading") {
    return (
      <div className="w-full">
        <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-gray-300 text-sm">Loading video...</p>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-600">{moduleName}</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-auto"
          controls
          controlsList="nodownload"
        >
          Your browser does not support the video tag.
        </video>

        {bufferedPercent > 0 && (
          <div className="absolute bottom-12 left-0 right-0 h-1 bg-gray-700">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${bufferedPercent}%` }}
            />
          </div>
        )}

        {playerState === "idle" && access && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition-all">
            <Button
              onClick={handlePlayClick}
              size="lg"
              className="gap-2 hover:scale-105 transition-transform"
            >
              <Play className="w-5 h-5" />
              Play Video
            </Button>
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="text-sm font-medium text-gray-900">{moduleName}</div>
        {playerState === "playing" || playerState === "paused" ? (
          <div className="text-xs text-gray-500 mt-1">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        ) : null}
      </div>
    </div>
  );
}
