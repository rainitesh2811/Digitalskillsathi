import { Button } from "@/app/components/ui/button";
import { Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
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
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-base px-8"
              >
                Explore Courses
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 text-base px-8 gap-2"
              >
                <Play className="h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1762330910399-95caa55acf04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjkwNzQ1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Online Learning"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 to-red-600/20"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 max-w-xs hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center text-white">
                  <span className="text-xl">🎓</span>
                </div>
                <div>
                  <div className="font-semibold">New Course Alert!</div>
                  <div className="text-sm text-gray-600">Advanced React Patterns</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-20 -z-10"></div>
    </section>
  );
}
