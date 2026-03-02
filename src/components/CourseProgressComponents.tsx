// Example: CourseProgressDisplay.tsx
// Shows course completion progress with module list

import { getCourseCompletionPercent } from "@/services/progressTracking";
import { useEffect, useState } from "react";
import { Badge } from "../app/components/ui/badge";
import { Progress } from "../app/components/ui/progress";

interface CourseProgressDisplayProps {
  courseId: string;
  userId: string;
}

export function CourseProgressDisplay({
  courseId,
  userId,
}: CourseProgressDisplayProps) {
  const [completion, setCompletion] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletion = async () => {
      try {
        const percent = await getCourseCompletionPercent(userId, courseId);
        setCompletion(percent);
      } catch (error) {
        console.error("Error fetching completion:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletion();
  }, [courseId, userId]);

  if (loading) {
    return <div className="text-gray-500">Loading progress...</div>;
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">
          Course Progress
        </span>
        <Badge variant={completion === 100 ? "default" : "secondary"}>
          {completion}%
        </Badge>
      </div>
      <Progress value={completion} className="h-2" />
      {completion === 100 && (
        <p className="text-xs text-green-600 font-medium">
          ✓ Course completed!
        </p>
      )}
    </div>
  );
}


// Example: ModuleProgressItem.tsx
// Individual module item with progress indicator

import { getModuleProgress } from "@/services/progressTracking";
import { Check, Play } from "lucide-react";

interface ModuleProgressItemProps {
  moduleId: string;
  moduleName: string;
  userId: string;
  onSelect: (moduleId: string) => void;
}

export function ModuleProgressItem({
  moduleId,
  moduleName,
  userId,
  onSelect,
}: ModuleProgressItemProps) {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchProgress = async () => {
      const data = await getModuleProgress(userId, moduleId);
      if (data) {
        setProgress(data.progress_percent);
        setIsCompleted(data.progress_percent >= 100);
      }
    };

    fetchProgress();
  }, [moduleId, userId]);

  return (
    <div
      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={() => onSelect(moduleId)}
    >
      <div className="flex-1">
        <div className="flex items-center gap-3">
          {isCompleted ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <Play className="w-5 h-5 text-gray-400" />
          )}
          <h3 className="font-medium text-gray-900">{moduleName}</h3>
        </div>
        {progress > 0 && progress < 100 && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1 bg-gray-200 rounded-full max-w-xs">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">{progress}%</span>
          </div>
        )}
      </div>
      {isCompleted && (
        <span className="text-xs text-green-600 font-medium">Completed</span>
      )}
    </div>
  );
}

import { VideoPlayer } from "@/components/VideoPlayer";
import { supabase } from "@/supabaseclient";

interface Module {
  id: string;
  title: string;
  course_id: string;
  is_free: boolean;
}

export function CourseDetailsWithProgress({ courseId }: { courseId: string }) {
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [_progress, setProgress] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchModules = async () => {
      const { data } = await supabase
        .from("modules")
        .select("*")
        .eq("course_id", courseId)
        .order("order", { ascending: true });

      setModules(data || []);
      if (data && data.length > 0) {
        setSelectedModuleId(data[0].id);
      }
    };

    fetchModules();
  }, [courseId]);

  const handleProgressUpdate = async (moduleId: string) => {
    if (!userId) return;

    const data = await getModuleProgress(userId, moduleId);
    if (data) {
      setProgress((prev) => ({
        ...prev,
        [moduleId]: data.progress_percent,
      }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Course Details</h1>
        {userId && (
          <CourseProgressDisplay courseId={courseId} userId={userId} />
        )}
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Module List */}
        <div className="col-span-1 space-y-3">
          <h2 className="text-xl font-bold">Modules</h2>
          {modules.map((module) => (
            <ModuleProgressItem
              key={module.id}
              moduleId={module.id}
              moduleName={module.title}
              userId={userId || ""}
              onSelect={(id) => {
                setSelectedModuleId(id);
                handleProgressUpdate(id);
              }}
            />
          ))}
        </div>

        {/* Video Player */}
        <div className="col-span-2">
          {selectedModuleId && userId ? (
            <VideoPlayer
              moduleId={selectedModuleId}
              userId={userId}
              moduleName={
                modules.find((m) => m.id === selectedModuleId)?.title ||
                "Module"
              }
              onProgress={(percent) => {
                setProgress((prev) => ({
                  ...prev,
                  [selectedModuleId]: percent,
                }));
              }}
            />
          ) : (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-600">Select a module to watch</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
