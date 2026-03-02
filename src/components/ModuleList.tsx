import { getModulesForCourse } from "@/services/videoAccess";
import { Lock, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../app/components/ui/button";
import { Skeleton } from "../app/components/ui/skeleton";

interface Module {
  id: string;
  title: string;
  is_free: boolean;
  drive_file_id: string;
  order: number;
  canAccess: boolean;
  accessMessage?: string;
}

interface ModuleListProps {
  courseId: string;
  userId?: string;
  onModuleSelect?: (moduleId: string) => void;
}

export function ModuleList({
  courseId,
  userId,
  onModuleSelect,
}: ModuleListProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, [courseId, userId]);

  const fetchModules = async () => {
    setLoading(true);
    try {
      const data = await getModulesForCourse(courseId, userId);
      setModules(data);
    } catch (error) {
      console.error("Error fetching modules:", error);
      toast.error("Failed to load modules");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {modules.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          No modules available for this course
        </div>
      ) : (
        modules.map((module) => (
          <div
            key={module.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {module.is_free ? (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    FREE
                  </span>
                ) : (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    PAID
                  </span>
                )}
                <h3 className="font-medium text-gray-900">{module.title}</h3>
              </div>
              {!module.canAccess && module.accessMessage && (
                <p className="text-xs text-gray-500 mt-1">
                  {module.accessMessage}
                </p>
              )}
            </div>

            {module.canAccess ? (
              <Button
                size="sm"
                onClick={() => onModuleSelect?.(module.id)}
                className="gap-2"
              >
                <Play className="w-4 h-4" />
                Play
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-gray-500">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Locked</span>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
