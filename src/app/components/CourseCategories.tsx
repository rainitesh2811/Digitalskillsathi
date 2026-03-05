"use client";
import { Card } from "@/app/components/ui/card";
import { useEffect, useState } from "react";

interface CourseCategory {
  id: number;
  title: string;
  icon: string;
  category: string;
}

interface CourseCategoriesProps {
  onExploreCourses?: (category?: string) => void;
  selectedCategory?: string;
  onCourseSelect?: (course: CourseCategory) => void;
}

const courseCategories: CourseCategory[] = [
  {
    id: 1,
    title: "Advanced Basic AI",
    icon: "/1.png", 
    category: "Artificial Intelligence",
  },
  {
    id: 2,
    title: "Basic AI",
    icon: "/2.png",
    category: "Artificial Intelligence",
  },
  {
    id: 3,
    title: "Canva Fundamentals",
    icon: "/3.png",
    category: "Design",
  },
  {
    id: 4,
    title: "Canva Advanced",
    icon: "/4.png",
    category: "Design",
  },
  {
    id: 5,
    title: "Web Development",
    icon: "/5.png",
    category: "Web Dev",
  },
  {
    id: 6,
    title: "Wordpress",
    icon: "/6.png",
    category: "Web Dev",
  },
  {
    id: 7,
    title: "Digital Marketing Basics",
    icon: "/7.png",
    category: "Marketing",
  },
  {
    id: 8,
    title: "Digital Marketing Advanced",
    icon: "/8.png",
    category: "Marketing",
  },
];

const filterOptions = ["All", "Web Dev", "Data Science", "Marketing", "Design"];

export function CourseCategories({ onCourseSelect }: CourseCategoriesProps) {
  const [activeTab, setActiveTab] = useState("All");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredCategories = activeTab === "All"
    ? courseCategories
    : courseCategories.filter((cat) => cat.category === activeTab);

  const handleCourseClick = (course: CourseCategory) => {
    if (onCourseSelect) {
      onCourseSelect(course);
    }
  };

  return (
    <section className="py-10 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        
        <h2 className={`text-3xl md:text-5xl font-bold mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          Explore Top <span className="text-orange-600">Courses</span>
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
          {filteredCategories.map((category, index) => (
            <div key={category.id} className="flex flex-col items-center">
              <Card
                onClick={() => handleCourseClick(category)}
                style={{ transitionDelay: `${index * 100}ms` }}
                className={`group p-0 transition-all duration-500 cursor-pointer border-none shadow-none hover:shadow-2xl hover:scale-105 rounded-[2rem] md:rounded-[3.5rem] bg-white flex flex-col items-center justify-center overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="w-full h-full aspect-square flex items-center justify-center p-1 md:p-2">
                  <img
                    src={category.icon}
                    alt={category.title}
                    className="w-full h-full object-contain scale-110 md:scale-125 group-hover:scale-[1.35] transition-transform duration-500"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
              </Card>
              <p className="text-orange-600 font-semibold text-sm md:text-base mt-3 text-center">
                {category.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}