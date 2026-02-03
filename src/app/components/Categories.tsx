import { Card } from "@/app/components/ui/card";
import { Brain, Code, Database, Palette, Smartphone, TrendingUp } from "lucide-react";

const categories = [
  {
    icon: Code,
    title: "Web Development",
    courses: 2,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Database,
    title: "Data Science",
    courses: 0,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    courses: 2,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: Palette,
    title: "Design & Creative",
    courses: 2,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    courses: 0,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    icon: Brain,
    title: "Artificial Intelligence",
    courses: 2,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
];

export function Categories({ onExploreCourses }: { onExploreCourses: (category?: string) => void }) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Top <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Categories</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from hundreds of courses across various categories and start learning today
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="group p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-orange-200"
                onClick={() => onExploreCourses(category.title)}
              >
                <div className="flex items-start gap-4">
                  <div className={`${category.bgColor} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${category.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-orange-600 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600">{category.courses} Courses</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}