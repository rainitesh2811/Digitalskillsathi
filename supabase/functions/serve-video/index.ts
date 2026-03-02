/// <reference lib="deno.ns" />
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// Correct way to pull variables from the environment
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);




;

// Google Drive API configuration
const GOOGLE_SERVICE_ACCOUNT_EMAIL = Deno.env.get(
  "GOOGLE_SERVICE_ACCOUNT_EMAIL"
)!;
const GOOGLE_PRIVATE_KEY = Deno.env.get("GOOGLE_PRIVATE_KEY")!;

interface VideoRequest {
  moduleId: string;
  mode?: "stream" | "url"; // "stream" = proxy video, "url" = return URL only
}

/**
 * Get Google Drive API access token using Service Account
 */
async function getGoogleAccessToken(): Promise<string> {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: "https://www.googleapis.com/auth/drive.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const key = await crypto.subtle.importKey(
    "pkcs8",
    new TextEncoder().encode(
      `-----BEGIN PRIVATE KEY-----\n${GOOGLE_PRIVATE_KEY}\n-----END PRIVATE KEY-----`
    ),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const headerEncoded = btoa(JSON.stringify(header));
  const payloadEncoded = btoa(JSON.stringify(payload));
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(`${headerEncoded}.${payloadEncoded}`)
  );

  const signatureEncoded = btoa(String.fromCharCode(...new Uint8Array(signature)));

  const jwt = `${headerEncoded}.${payloadEncoded}.${signatureEncoded}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const data = await response.json() as { access_token: string };
  return data.access_token;
}

/**
 * Stream video from Google Drive to the frontend
 * Acts as a proxy to avoid CORS issues and expose Google Drive credentials
 */
async function streamVideoFromDrive(
  fileId: string,
  accessToken: string
): Promise<Response> {
  try {
    const googleDriveUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;

    const response = await fetch(googleDriveUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: `Failed to fetch video from Google Drive: ${response.statusText}`,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get the content type and size from Google Drive response
    const contentType = response.headers.get("content-type") || "video/mp4";
    const contentLength = response.headers.get("content-length");

    // Stream the video response back to the client
    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Date, Server, Transfer-Encoding, Connection, Access-Control-Allow-Origin",
      "Cache-Control": "public, max-age=3600",
      "Accept-Ranges": "bytes",
    };

    // Add content length if available
    if (contentLength) {
      headers["Content-Length"] = contentLength;
    }

    // Handle range requests for seeking
    if (response.headers.has("content-range")) {
      headers["Content-Range"] = response.headers.get("content-range") || "";
    }

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error("Error streaming video:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to stream video",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

async function verifyModuleAccess(
  moduleId: string,
  authHeader: string | null
): Promise<{ allowed: boolean; driveFileId?: string; error?: string }> {
  try {
    // Get module details
    const { data: module, error: moduleError } = await supabase
      .from("modules")
      .select("id, is_free, drive_file_id, course_id")
      .eq("id", moduleId)
      .single();

    if (moduleError || !module) {
      return { allowed: false, error: "Module not found" };
    }

    // Free modules don't require authentication
    if (module.is_free) {
      return { allowed: true, driveFileId: module.drive_file_id };
    }

    // For paid modules, verify user authentication
    if (!authHeader) {
      return { allowed: false, error: "Authentication required" };
    }

    // Extract JWT token from Authorization header
    const token = authHeader.replace("Bearer ", "");

    // Verify token and get user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return { allowed: false, error: "Invalid authentication token" };
    }

    // Check if user has completed payment for this course
    const { data: purchase, error: purchaseError } = await supabase
      .from("user_courses")
      .select("id")
      .eq("user_id", user.id)
      .eq("course_id", module.course_id)
      .eq("payment_status", "completed")
      .maybeSingle();

    if (purchaseError) {
      return { allowed: false, error: "Error verifying purchase" };
    }

    if (!purchase) {
      return {
        allowed: false,
        error: "You haven't purchased this course",
      };
    }

    return { allowed: true, driveFileId: module.drive_file_id };
  } catch (error) {
    console.error("Access verification error:", error);
    return { allowed: false, error: "Internal server error" };
  }
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  const authHeader = req.headers.get("authorization");

  try {
    let moduleId: string;
    let mode: "stream" | "url" = "stream";

    // Handle both POST and GET requests
    if (req.method === "GET") {
      // Extract from URL query params: /serve-video?moduleId=xxx&mode=stream
      const url = new URL(req.url);
      moduleId = url.searchParams.get("moduleId") || "";
      const modeParam = url.searchParams.get("mode");
      mode = (modeParam === "url" ? "url" : "stream") as "stream" | "url";
    } else if (req.method === "POST") {
      const body = (await req.json()) as VideoRequest;
      moduleId = body.moduleId;
      mode = body.mode || "stream";
    } else {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!moduleId) {
      return new Response(
        JSON.stringify({ error: "Missing moduleId parameter" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify user's access to the module
    const accessCheck = await verifyModuleAccess(moduleId, authHeader);

    if (!accessCheck.allowed) {
      return new Response(
        JSON.stringify({
          error: accessCheck.error || "Access denied",
        }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Get Google Drive access token
    const accessToken = await getGoogleAccessToken();
    const fileId = accessCheck.driveFileId;

    // Mode 1: Stream video directly through this function
    if (mode === "stream") {
      return streamVideoFromDrive(fileId!, accessToken);
    }

    // Mode 2: Return a URL (optional fallback)
    const googleDriveUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;

    return new Response(
      JSON.stringify({
        url: `${googleDriveUrl}&access_token=${accessToken}`,
        expiresIn: 3600, // 1 hour
        mode: "url",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error in serve-video function:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});
