import { Card } from "@/app/components/ui/card";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from "react";

interface DemoVideo {
  id: number;
  title: string;
  icon: string;
  category: string;
  videoUrl: string;
}

interface WatchDemoProps {
  onBack?: () => void;
  onMeditationClick?: () => void;
}

const demoVideos: DemoVideo[] = [
  {
    id: 1,
    title: "Digital Marketing Basics",
    icon: "/7.png",
    category: "Marketing",
    videoUrl: "/Videos/marketing-demo-1.mp4",
  },
  {
    id: 2,
    title: "Digital Marketing Advanced",
    icon: "/8.png",
    category: "Marketing",
    videoUrl: "/videos/marketing-demo-2.mp4",
  },
  {
    id: 3,
    title: "Meditation",
    icon: "/meditation.png",
    category: "Meditation",
    videoUrl: "/videos/meditation-demo-3.mp4",
  },
];

const filterOptions = ["All", "Web Dev", "Data Science", "Marketing", "Design", "Meditation"];

export function WatchDemo({ onBack, onMeditationClick }: WatchDemoProps) {
  const [activeTab, setActiveTab] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<DemoVideo | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredVideos = activeTab === "All"
    ? demoVideos
    : demoVideos.filter((video) => video.category === activeTab);

  const handleVideoSelect = (video: DemoVideo) => {
    // Handle meditation specially - navigate to modules page
    if (video.category === "Meditation") {
      if (onMeditationClick) {
        onMeditationClick();
      }
      return;
    }
    setSelectedVideo(video);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
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
            Watch Course <span className="text-orange-600">Demos</span>
          </h2>

        <div className={`inline-flex items-center bg-white border border-gray-200 rounded-full p-1.5 mb-12 shadow-sm border-2 overflow-x-auto max-w-full no-scrollbar transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setActiveTab(option)}
              className={`px-6 md:px-10 py-2.5 rounded-full text-xs md:text-base font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === option
                  ? "bg-white text-orange-600 shadow-md border border-gray-100"
                  : "text-gray-500 hover:text-orange-400"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-12">
          {filteredVideos.map((video, index) => (
            <div key={video.id} className="flex flex-col items-center">
              <Card
                onClick={() => handleVideoSelect(video)}
                style={{ transitionDelay: `${index * 100}ms` }}
                className={`group p-0 transition-all duration-500 cursor-pointer border-none shadow-none hover:shadow-2xl hover:scale-105 rounded-[2rem] md:rounded-[3.5rem] bg-white flex flex-col items-center justify-center overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="w-full h-full aspect-square flex items-center justify-center p-1 md:p-2 relative">
                  <img
                    src={video.icon}
                    alt={video.title}
                    className="w-full h-full object-contain scale-110 md:scale-125 group-hover:scale-[1.35] transition-transform duration-500"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                  {/* Play indicator overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-orange-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <svg
                        className="w-6 h-6 text-white fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5 3v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Card>
              <p className="text-orange-600 font-semibold text-sm md:text-base mt-3 text-center">
                {video.title}
              </p>
            </div>
          ))}
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
            <button
              onClick={handleCloseVideo}
              className="absolute top-4 right-4 z-10 bg-orange-600 hover:bg-orange-700 p-2 rounded-full text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="aspect-video w-full">
              <video
                controls
                autoPlay
                className="w-full h-full"
                controlsList="nodownload"
              >
                <source src={selectedVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="bg-gray-900 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedVideo.title}
              </h3>
              <p className="text-gray-400">
                Category: <span className="text-orange-600">{selectedVideo.category}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
