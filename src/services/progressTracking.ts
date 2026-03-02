import { supabase } from "@/supabaseclient";

export interface UserProgress {
  id?: string;
  user_id: string;
  module_id: string;
  progress_percent: number; // 0-100
  last_watched_at: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Save watch progress for a module
 * Creates or updates the user's progress record
 */
export async function saveModuleProgress(
  userId: string,
  moduleId: string,
  progressPercent: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("user_progress")
      .upsert(
        {
          user_id: userId,
          module_id: moduleId,
          progress_percent: Math.round(Math.min(100, Math.max(0, progressPercent))),
          last_watched_at: new Date().toISOString(),
        },
        { onConflict: "user_id,module_id" }
      );

    if (error) {
      console.error("Error saving progress:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error saving progress:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get watch progress for a specific module
 */
export async function getModuleProgress(
  userId: string,
  moduleId: string
): Promise<UserProgress | null> {
  try {
    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("module_id", moduleId)
      .maybeSingle();

    if (error) {
      console.debug("Error fetching progress:", error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.debug("Error fetching progress:", error);
    return null;
  }
}

/**
 * Get progress for all modules in a course
 */
export async function getCourseProgress(
  userId: string,
  courseId: string
): Promise<UserProgress[]> {
  try {
    const { data: modules, error: moduleError } = await supabase
      .from("modules")
      .select("id")
      .eq("course_id", courseId);

    if (moduleError || !modules) {
      return [];
    }

    const moduleIds = modules.map((m) => m.id);

    const { data: progress, error: progressError } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .in("module_id", moduleIds);

    if (progressError || !progress) {
      return [];
    }

    return progress;
  } catch (error) {
    console.debug("Error fetching course progress:", error);
    return [];
  }
}

/**
 * Get overall course completion percentage
 */
export async function getCourseCompletionPercent(
  userId: string,
  courseId: string
): Promise<number> {
  try {
    // Get all modules for the course
    const { data: modules, error: moduleError } = await supabase
      .from("modules")
      .select("id")
      .eq("course_id", courseId);

    if (moduleError || !modules || modules.length === 0) {
      return 0;
    }

    // Get progress for all modules
    const { data: progress, error: progressError } = await supabase
      .from("user_progress")
      .select("progress_percent")
      .eq("user_id", userId)
      .in(
        "module_id",
        modules.map((m) => m.id)
      );

    if (progressError || !progress) {
      return 0;
    }

    if (progress.length === 0) {
      return 0;
    }

    // Calculate average completion
    const totalProgress = progress.reduce((sum, p) => sum + p.progress_percent, 0);
    return Math.round(totalProgress / modules.length);
  } catch (error) {
    console.debug("Error calculating course completion:", error);
    return 0;
  }
}

/**
 * Get resume point for a module (last watched timestamp and progress)
 */
export async function getResumePoint(
  userId: string,
  moduleId: string
): Promise<{ progressPercent: number; lastWatchedSeconds: number } | null> {
  try {
    const progress = await getModuleProgress(userId, moduleId);

    if (!progress) {
      return null;
    }

    // Convert progress percent to approximate seconds watched
    // Assumption: average video is 30 minutes (1800 seconds)
    const estimatedDuration = 1800;
    const lastWatchedSeconds = (progress.progress_percent / 100) * estimatedDuration;

    return {
      progressPercent: progress.progress_percent,
      lastWatchedSeconds,
    };
  } catch (error) {
    console.debug("Error getting resume point:", error);
    return null;
  }
}

/**
 * Mark a module as completed (100% watched)
 */
export async function markAsCompleted(
  userId: string,
  moduleId: string
): Promise<{ success: boolean; error?: string }> {
  return saveModuleProgress(userId, moduleId, 100);
}

/**
 * Create the user_progress table if it doesn't exist
 * Call this once on app initialization
 */
export async function ensureProgressTableExists(): Promise<void> {
  try {
    // This will fail silently if the table already exists
    // It's better to create the table via SQL in Supabase migrations
    await supabase.from("user_progress").select("id").limit(1);
  } catch (error) {
    console.warn(
      "user_progress table may not exist. Create it using the migration in supabase/migrations/"
    );
  }
}
