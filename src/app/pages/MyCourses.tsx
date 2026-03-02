import { Button } from "@/app/components/ui/button";
import { supabase } from "@/supabaseclient";
import { useEffect, useState } from "react";

interface Course {
  id: number;
  title: string;
  icon: string;
  category: string;
}

// Local course list (match the one in App.tsx)
const allCourses: Course[] = [
  { id: 1, title: "Advanced Basic AI", icon: "/1.png", category: "Artificial Intelligence" },
  { id: 2, title: "Basic AI", icon: "/2.png", category: "Artificial Intelligence" },
  { id: 3, title: "Canva Fundamentals", icon: "/3.png", category: "Design" },
  { id: 4, title: "Canva Advanced", icon: "/4.png", category: "Design" },
  { id: 5, title: "Web Development", icon: "/5.png", category: "Web Dev" },
  { id: 6, title: "Wordpress", icon: "/6.png", category: "Web Dev" },
  { id: 7, title: "Digital Marketing Basics", icon: "/7.png", category: "Marketing" },
  { id: 8, title: "Digital Marketing Advanced", icon: "/8.png", category: "Marketing" },
];

export default function MyCourses() {
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      window.scrollTo(0, 0);
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user || null;
      if (!user) {
        if (mounted) setLoading(false);
        return;
      }
      if (mounted) setUserEmail(user.email || null);

      try {
        const { data, error } = await supabase
          .from("user_courses")
          .select("course_title")
          .eq("user_id", user.id);

        if (error) {
          console.warn("Error fetching enrollments:", error.message);
          // Fallback: no enrollments
          if (mounted) {
            setEnrolledCourses([]);
            setLoading(false);
          }
          return;
        }

        const titles: string[] = (data || []).map((r: any) => r.course_title);
        const courses = allCourses.filter((c) => titles.includes(c.title));
        if (mounted) setEnrolledCourses(courses);
      } catch (e) {
        console.error(e);
        if (mounted) setEnrolledCourses([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading your courses…</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Courses</h1>
          {userEmail && <div className="text-sm text-gray-600">Logged in as <span className="font-medium">{userEmail}</span></div>}
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 mb-6">You haven't enrolled in any courses yet.</p>
            <Button onClick={() => (window.history.pushState({}, "", "/"), window.dispatchEvent(new PopStateEvent("popstate")))}>Explore Courses</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center">
                <div className="w-32 h-32 mb-4 flex items-center justify-center bg-gray-50 rounded-xl">
                  <img src={course.icon} alt={course.title} className="w-3/4 h-3/4 object-contain"/>
                </div>
                <h3 className="font-semibold text-lg text-center">{course.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{course.category}</p>
                <Button className="mt-4" onClick={() => { window.history.pushState({}, "", `/course/${course.id}`); window.dispatchEvent(new PopStateEvent("popstate")); }}>Open</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
