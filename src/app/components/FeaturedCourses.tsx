import { CourseCard } from "@/app/components/CourseCard";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2026",
    instructor: "Dr. Angela Yu",
    price: 499,
    originalPrice: 3999,
    rating: 4.8,
    students: 12500,
    duration: "52 hours",
    lessons: 380,
    level: "Beginner",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGluZyUyMGxhcHRvcHxlbnwxfHx8fDE3NjkwOTE4MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Advanced React & TypeScript Masterclass",
    instructor: "Maximilian Schwarzmüller",
    price: 599,
    originalPrice: 4999,
    rating: 4.9,
    students: 8900,
    duration: "45 hours",
    lessons: 320,
    level: "Advanced",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGluZyUyMGxhcHRvcHxlbnwxfHx8fDE3NjkwOTE4MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Data Science & Machine Learning A-Z",
    instructor: "Kirill Eremenko",
    price: 549,
    originalPrice: 4499,
    rating: 4.7,
    students: 15600,
    duration: "44 hours",
    lessons: 285,
    level: "Intermediate",
    category: "Data Science",
    image:
      "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NjkwOTUzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "Digital Marketing Complete Course 2026",
    instructor: "Phil Ebiner",
    price: 399,
    originalPrice: 3499,
    rating: 4.6,
    students: 10200,
    duration: "38 hours",
    lessons: 240,
    level: "Beginner",
    category: "Marketing",
    image:
      "https://images.unsplash.com/photo-1682336869523-2c6859f781cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2OTA0NzEyMHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    title: "UI/UX Design Masterclass with Figma",
    instructor: "Daniel Schifano",
    price: 449,
    originalPrice: 3999,
    rating: 4.8,
    students: 7800,
    duration: "35 hours",
    lessons: 210,
    level: "Intermediate",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1740174459718-fdcc63ee3b4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzY5MDkzMDk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    title: "Python for Data Analysis & Visualization",
    instructor: "Jose Portilla",
    price: 499,
    originalPrice: 4199,
    rating: 4.9,
    students: 13400,
    duration: "42 hours",
    lessons: 295,
    level: "Intermediate",
    category: "Data Science",
    image:
      "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW5jZSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NjkwOTUzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function FeaturedCourses() {
  return (
    <section id="courses" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Courses
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most popular courses designed by industry experts to help
            you achieve your career goals
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
        <div className="-mx-4 px-4 w-full max-w-2xl mx-auto mb-8">
  <TabsList
    className="
      w-full
      flex md:grid md:grid-cols-5
      gap-2
      bg-transparent p-0
      overflow-x-auto md:overflow-visible
      whitespace-nowrap
      px-1
      scroll-px-2
      [-ms-overflow-style:none]
      [scrollbar-width:none]
      [&::-webkit-scrollbar]:hidden
    "
  >
    <TabsTrigger
      value="all"
      className="shrink-0 rounded-full px-4 py-2 text-sm"
    >
      All
    </TabsTrigger>

    <TabsTrigger value="web" className="shrink-0 rounded-full px-4 py-2 text-sm">
      Web Dev
    </TabsTrigger>

    <TabsTrigger value="data" className="shrink-0 rounded-full px-4 py-2 text-sm">
      Data Science
    </TabsTrigger>

    <TabsTrigger
      value="marketing"
      className="shrink-0 rounded-full px-4 py-2 text-sm"
    >
      Marketing
    </TabsTrigger>

    <TabsTrigger
      value="design"
      className="shrink-0 rounded-full px-4 py-2 text-sm"
    >
      Design
    </TabsTrigger>
  </TabsList>
</div>

          <TabsContent value="all">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="web">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter((c) => c.category === "Web Development")
                .map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="data">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter((c) => c.category === "Data Science")
                .map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="marketing">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter((c) => c.category === "Marketing")
                .map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="design">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter((c) => c.category === "Design")
                .map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50"
          >
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
