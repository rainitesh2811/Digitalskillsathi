import { Button } from "@/app/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface Course {
  id: number;
  title: string;
  icon: string;
  category: string;
}

interface CourseDetailsProps {
  course: Course | null;
  onGoBack: () => void;
  onEnrollClick?: () => void;
}

export function CourseDetails({ course, onGoBack, onEnrollClick }: CourseDetailsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Course not found</p>
          <Button onClick={onGoBack} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  const courseDetailsMap: Record<number, { description: string; duration: string; level: string; topics: string[]; price: string }> = {
    1: {
      description: "Master advanced AI concepts and applications. Learn cutting-edge techniques in machine learning, neural networks, and AI implementation.",
      duration: "4 weeks",
      level: "Advanced",
      topics: ["Neural Networks", "Deep Learning", "NLP", "Computer Vision", "AI Ethics"],
      price: "₹199"
    },
    2: {
      description: "Learn the fundamentals of Artificial Intelligence. Perfect for beginners who want to understand AI concepts and applications.",
      duration: "Upcoming",
      level: "Beginner",
      topics: ["AI Basics", "Machine Learning Intro", "Data Processing", "AI Applications", "Python for AI"],
      price: "Upcoming"
    },
    3: {
      description: "Get started with Canva and create beautiful designs. Learn design principles and Canva's tools and features.",
      duration: "Upcoming",
      level: "Beginner",
      topics: ["Canva Interface", "Templates", "Design Principles", "Branding Basics", "Project Creation"],
      price: "Upcoming"
    },
    4: {
      description: "Become a Canva expert and create professional designs. Master advanced features and techniques.",
      duration: "Upcoming",
      level: "Advanced",
      topics: ["Advanced Tools", "Custom Branding", "Animation", "Team Collaboration", "Export & Optimization"],
      price: "Upcoming"
    },
    5: {
      description: "Build modern websites from scratch. Learn HTML, CSS, JavaScript, and responsive design.",
      duration: "Upcoming",
      level: "Beginner",
      topics: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Web Best Practices"],
      price: "Upcoming"
    },
    6: {
      description: "Create professional websites without coding. Master WordPress and build complete websites.",
      duration: "Upcoming",
      level: "Beginner",
      topics: ["WordPress Basics", "Themes & Plugins", "Content Management", "SEO", "Security"],
      price: "Upcoming"
    },
    7: {
      description: "Learn the fundamentals of digital marketing. Build a strong foundation in online marketing strategies.",
      duration: "3 weeks",
      level: "Beginner",
      topics: ["Social Media Marketing", "Email Marketing", "Content Strategy", "Analytics", "SEO Basics"],
      price: "₹199"
    },
    8: {
      description: "Become a digital marketing expert. Master advanced strategies and campaigns.",
      duration: "6 weeks",
      level: "Advanced",
      topics: ["Advanced SEO", "PPC Campaigns", "Marketing Automation", "Analytics & Reporting", "Growth Strategies"],
      price: "₹299"
    }
  };

  const details = courseDetailsMap[course.id] || {
    description: "Comprehensive course on " + course.title,
    duration: "8 weeks",
    level: "Intermediate",
    topics: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
    price: "$299"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onGoBack}
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Courses
          </button>
        </div>
      </div>

      <div className={`container mx-auto px-4 py-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm aspect-square bg-white rounded-[3rem] shadow-lg flex items-center justify-center overflow-hidden">
              <img
                src={course.icon}
                alt={course.title}
                className="w-3/4 h-3/4 object-contain"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
          </div>

          <div>
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {course.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {course.title}
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {details.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Duration</p>
                <p className="text-xl font-bold text-orange-600">{details.duration}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Level</p>
                <p className="text-xl font-bold text-orange-600">{details.level}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Price</p>
                <p className="text-xl font-bold text-orange-600">{details.price}</p>
              </div>
            </div>

            <Button 
              onClick={onEnrollClick}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg font-semibold rounded-lg"
            >
              Enroll Now
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <div className={`bg-white rounded-2xl p-8 shadow-md mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              What You'll Learn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {details.topics.map((topic, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`bg-white rounded-2xl p-8 shadow-md transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Course Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="text-2xl">🎓</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Expert Instruction</h3>
                  <p className="text-gray-600">Learn from industry professionals</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">📚</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Comprehensive Materials</h3>
                  <p className="text-gray-600">Access all course resources</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">💻</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Hands-on Projects</h3>
                  <p className="text-gray-600">Build real-world projects</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">🏆</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Certification</h3>
                  <p className="text-gray-600">Get recognized upon completion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
