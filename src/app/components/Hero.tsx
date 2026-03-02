import { Button } from "@/app/components/ui/button"; // Ensure this file exists and uses 'export { Button }'
import { GraduationCap, Play } from "lucide-react";

interface HeroProps {
  onExploreCourses?: () => void;
  onWatchDemo?: () => void;
}

export function Hero({ onExploreCourses, onWatchDemo }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="space-y-6 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Master Digital Skills for{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Tomorrow's Jobs
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl">
              Learn from industry experts and transform your career with our comprehensive 
              online courses in web development, data science, digital marketing, and more.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-base px-8"
                onClick={onExploreCourses}
              >
                Explore Courses
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-orange-200 text-orange-700 hover:bg-orange-50 text-base px-8 gap-2"
                onClick={onWatchDemo}
              >
                <Play className="h-5 w-5 fill-current" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="relative">
            {/* Main Image Wrapper */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/hero.png" 
                alt="Student learning online"
                className="w-full h-auto object-cover"
              />
              {/* Decorative Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-10 -left-6 bg-white rounded-xl shadow-xl p-4 max-w-xs hidden lg:block animate-bounce-subtle">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-inner">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">New Course Alert!</div>
                  <div className="text-sm text-gray-600">Advanced Artificial Intelligence</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20 -z-10"></div>
    </section>
  );
}