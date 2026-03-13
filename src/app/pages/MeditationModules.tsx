import { Card } from "@/app/components/ui/card";
import { supabase } from "@/supabaseclient";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string;
  drive_file_id: string;
  module_order: number;
  is_free: boolean;
  created_at: string;
}

interface MeditationModulesProps {
  onBack?: () => void;
}

export function MeditationModules({ onBack }: MeditationModulesProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchModules();
    setIsVisible(true);
  }, []);

  const fetchModules = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from("modules")
        .select("*")
        .eq("course_id", "meditation")
        .order("module_order", { ascending: true });

      console.log("Fetch response:", { data, error: fetchError });

      if (fetchError) {
        throw fetchError;
      }

      if (data) {
        console.log("Modules loaded:", data.length);
        setModules(data as Module[]);
      }
    } catch (err) {
      console.error("Error fetching modules:", err);
      setError(err instanceof Error ? err.message : "Failed to load modules");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseVideo = () => {
    setSelectedModule(null);
  };

  const getGoogleDriveEmbedUrl = (fileId: string) => {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  return (
    <section className="py-10 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-full text-orange-700 hover:bg-orange-50 transition-all duration-300 border border-orange-200 hover:border-orange-300 font-semibold text-sm md:text-base"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        <div className="text-center">
          <h2 className={`text-3xl md:text-5xl font-bold mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            Meditation <span className="text-orange-600">Modules</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
              <p className="mt-4 text-gray-600">Loading modules...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchModules}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : modules.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-gray-600">No modules available</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {modules.map((module, index) => (
              <div key={module.id} className="flex flex-col items-stretch">
                <Card
                  onClick={() => setSelectedModule(module)}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  className={`group cursor-pointer border-2 border-gray-200 hover:border-orange-600 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden flex flex-col h-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 flex items-center justify-center min-h-[200px]">
                    <div className="text-center w-full">
                      <img 
                        src="/meditation.png" 
                        alt="Meditation" 
                        className="w-24 h-24 object-contain mx-auto mb-4"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="%23f97316"/%3E%3Ctext x="50" y="55" font-size="40" fill="white" text-anchor="middle"%3E🧘%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      <p className="text-sm text-gray-600">Module {module.module_order}</p>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-gray-600 text-sm flex-grow mb-4">
                      {module.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Click to play</span>
                      {module.is_free && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold">
                          Free
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
                    <div className="bg-orange-600 rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <svg
                        className="w-8 h-8 text-white fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5 3v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {selectedModule && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden max-h-[90vh] flex flex-col">
            <button
              onClick={handleCloseVideo}
              className="absolute top-4 right-4 z-10 bg-orange-600 hover:bg-orange-700 p-2 rounded-full text-white transition-colors shadow-lg"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative w-full bg-black flex-grow overflow-auto">
              <iframe
                src={getGoogleDriveEmbedUrl(selectedModule.drive_file_id)}
                title={selectedModule.title}
                className="w-full h-full min-h-[400px] md:min-h-[500px] border-none"
                allow="autoplay; fullscreen"
                allowFullScreen={true}
              ></iframe>
            </div>

            <div className="bg-gray-900 p-6 border-t border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedModule.title}
              </h3>
              <p className="text-gray-400 mb-2">
                Module <span className="text-orange-600 font-semibold">{selectedModule.module_order}</span>
              </p>
              <p className="text-gray-400 text-sm">
                {selectedModule.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
