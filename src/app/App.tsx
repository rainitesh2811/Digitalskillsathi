import { supabase } from "@/supabaseclient";
import { useEffect, useRef, useState } from "react";
import { Categories } from "./components/Categories";
import { CourseCategories } from "./components/CourseCategories";
import { CTA } from "./components/CTA";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { LoginModal } from "./components/LoginModal";
import { SignupModal } from "./components/SignupModal";
import { Testimonials } from "./components/Testimonials";
import { Button } from "./components/ui/button";
import { AboutUs } from "./pages/AboutUs";
import { ContactUs } from "./pages/ContactUs";
import { CourseDetails } from "./pages/CourseDetails";
import MyCourses from "./pages/MyCourses";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { RefundPolicy } from "./pages/RefundPolicy";
import { TermsOfService } from "./pages/TermsOfService";

interface Course {
  id: number;
  title: string;
  icon: string;
  category: string;
}

const allCourses: Course[] = [
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

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("/");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const featuredCoursesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session?.user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const isUserLoggedIn = !!session?.user;
      setIsLoggedIn(isUserLoggedIn);
      
      // If user logs out and is on course page or my-courses page, redirect to home
      if (!isUserLoggedIn && (currentPage.startsWith("/course/") || currentPage === "/my-courses")) {
        handleNavClick("/");
      }
    });

    return () => subscription?.unsubscribe();
  }, [currentPage]);

  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;
      setCurrentPage(path);
      
      if (path.startsWith("/course/")) {
        const courseId = parseInt(path.split("/course/")[1]);
        const course = allCourses.find(c => c.id === courseId);
        if (course) {
          setSelectedCourse(course);
        }
      }
      
      if (path === "/login") {
        setIsLoginOpen(true);
        setIsSignupOpen(false);
      } else if (path === "/signup") {
        setIsSignupOpen(true);
        setIsLoginOpen(false);
      } else {
        setIsLoginOpen(false);
        setIsSignupOpen(false);
      }
    };
    // Call immediately on component mount to handle direct URL access
    handleNavigation();
    
    // Listen for browser back/forward button
    window.addEventListener("popstate", handleNavigation);
    
    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, []);

  const handleNavClick = (href: string) => {
    window.history.pushState({}, "", href);
    // Manually trigger navigation update
    setCurrentPage(href);
    // If navigating to protected route and not logged in, prompt signup/login
    if (href === "/my-courses" && !isLoggedIn) {
      setIsSignupOpen(true);
      setIsLoginOpen(false);
      return;
    }
    if (href === "/login") {
      setIsLoginOpen(true);
      setIsSignupOpen(false);
    } else if (href === "/signup") {
      setIsSignupOpen(true);
      setIsLoginOpen(false);
    } else {
      setIsLoginOpen(false);
      setIsSignupOpen(false);
    }
  };

  const handleLoginClick = () => {
    handleNavClick("/login");
  };

  const handleSignupClick = () => {
    handleNavClick("/signup");
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleCloseSignup = () => {
    setIsSignupOpen(false);
  };

  const handleExploreCourses = (category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    if (featuredCoursesRef.current) {
      featuredCoursesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCourseSelect = (course: Course) => {
    if (!isLoggedIn) {
      setIsSignupOpen(true);
      return;
    }
    setSelectedCourse(course);
    handleNavClick(`/course/${course.id}`);
  };

  const handleGoBackFromDetails = () => {
    setSelectedCourse(null);
    handleNavClick("/");
  };

  if (currentPage === "/privacy-policy") return <PrivacyPolicy />;
  if (currentPage === "/terms-of-service") return <TermsOfService />;
  if (currentPage === "/refund-policy") return <RefundPolicy />;
  if (currentPage === "/about") return <AboutUs />;
  if (currentPage === "/contact") return <ContactUs />;
  
  // Handle My Courses route
  if (currentPage === "/my-courses") {
    if (!isLoggedIn) {
      // Not logged in: show header and prompt signup/login modal
      return (
        <>
          <Header onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">Please log in or sign up to view your courses.</p>
              <div className="flex items-center justify-center gap-4">
                <Button variant="ghost" onClick={handleLoginClick}>Login</Button>
                <Button onClick={handleSignupClick}>Sign Up</Button>
              </div>
            </div>
          </div>
          <Footer />
          <LoginModal isOpen={isLoginOpen} onClose={handleCloseLogin} onSwitchToSignup={() => handleNavClick("/signup")} />
          <SignupModal isOpen={isSignupOpen} onClose={handleCloseSignup} onSwitchToLogin={() => handleNavClick("/login")} />
        </>
      );
    }

    // Logged in: render MyCourses
    return (
      <>
        <Header onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
        <MyCourses />
        <Footer />
        <LoginModal isOpen={isLoginOpen} onClose={handleCloseLogin} onSwitchToSignup={() => handleNavClick("/signup")} />
        <SignupModal isOpen={isSignupOpen} onClose={handleCloseSignup} onSwitchToLogin={() => handleNavClick("/login")} />
      </>
    );
  }
  
  // Handle course details page - extract course ID from URL
  if (currentPage.startsWith("/course/")) {
    return (
      <>
        <Header onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
        <CourseDetails course={selectedCourse} onGoBack={handleGoBackFromDetails} />
        <Footer />
        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={handleCloseLogin}
          onSwitchToSignup={() => {
            handleNavClick("/signup");
          }}
        />
        <SignupModal 
          isOpen={isSignupOpen} 
          onClose={handleCloseSignup}
          onSwitchToLogin={() => {
            handleNavClick("/login");
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      <main>
        <Hero onExploreCourses={handleExploreCourses} />
        <Categories onExploreCourses={handleExploreCourses} />
        <div ref={featuredCoursesRef}>
          <CourseCategories onExploreCourses={handleExploreCourses} selectedCategory={selectedCategory} onCourseSelect={handleCourseSelect} />
        </div>

        <Features />
        <Testimonials />
        <CTA 
          onGetStartedClick={handleSignupClick} 
          isLoggedIn={isLoggedIn} 
        />
      </main>
      <Footer />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={handleCloseLogin}
        onSwitchToSignup={() => {
          handleNavClick("/signup");
        }}
      />
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={handleCloseSignup}
        onSwitchToLogin={() => {
          handleNavClick("/login");
        }}
      />
    </div>
  );
}