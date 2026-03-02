import { supabase } from "@/supabaseclient";

export interface ModuleAccessResponse {
  access: boolean;
  driveFileId?: string;
  message?: string;
}

/**
 * Check if a user has access to a specific module
 * Free modules are always accessible
 * Paid modules require a completed purchase
 */
export async function getModuleAccess(
  moduleId: string,
  userId?: string
): Promise<ModuleAccessResponse> {
  try {
    // 1. Get the module details
    const { data: module, error: moduleError } = await supabase
      .from("modules")
      .select("id, is_free, drive_file_id, course_id")
      .eq("id", moduleId)
      .single();

    if (moduleError || !module) {
      return {
        access: false,
        message: "Module not found",
      };
    }

    // 2. If module is free, grant access
    if (module.is_free) {
      return {
        access: true,
        driveFileId: module.drive_file_id,
      };
    }

    // 3. If module is paid, check user authentication
    if (!userId) {
      return {
        access: false,
        message: "Please log in to access this module",
      };
    }

    // 4. Check if user has a completed payment for this course
    const { data: purchase, error: purchaseError } = await supabase
      .from("user_courses")
      .select("payment_status, id")
      .eq("user_id", userId)
      .eq("course_id", module.course_id)
      .eq("payment_status", "completed")
      .single();

    if (purchaseError && purchaseError.code !== "PGRST116") {
      // PGRST116 is "no rows found"
      console.error("Error checking purchase:", purchaseError);
      return {
        access: false,
        message: "Error verifying access",
      };
    }

    if (purchase) {
      return {
        access: true,
        driveFileId: module.drive_file_id,
      };
    }

    return {
      access: false,
      message: "This module is locked. Please purchase the course.",
    };
  } catch (error) {
    console.error("Error in getModuleAccess:", error);
    return {
      access: false,
      message: "Error checking access",
    };
  }
}

/**
 * Get video stream from Edge Function (proxy streams the video directly)
 */
export async function getVideoStream(
  moduleId: string,
  authToken?: string
): Promise<ReadableStream<Uint8Array>> {
  const token = authToken || (await supabase.auth.getSession())
    .data.session?.access_token;

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
    const error = await response.json();
    throw new Error(error.error || "Failed to stream video");
  }

  if (!response.body) {
    throw new Error("No response body from video stream");
  }

  return response.body;
}

/**
 * Get video stream URL from Edge Function (returns URL for certain use cases)
 * @deprecated Use getVideoStream instead for better security
 */
export async function getVideoStreamUrl(moduleId: string): Promise<string> {
  const { data, error } = await supabase.functions.invoke("serve-video", {
    body: { moduleId, mode: "url" },
  });

  if (error) {
    throw new Error(`Failed to get video stream: ${error.message}`);
  }

  return data.url;
}

/**
 * Fetch all modules for a course with access status for current user
 */
export async function getModulesForCourse(courseId: string, userId?: string) {
  const { data: modules, error } = await supabase
    .from("modules")
    .select("id, title, is_free, drive_file_id, course_id, order")
    .eq("course_id", courseId)
    .order("order", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch modules: ${error.message}`);
  }

  // Check access for each module
  const modulesWithAccess = await Promise.all(
    modules.map(async (module) => {
      const access = await getModuleAccess(module.id, userId);
      return {
        ...module,
        canAccess: access.access,
        accessMessage: access.message,
      };
    })
  );

  return modulesWithAccess;
}
