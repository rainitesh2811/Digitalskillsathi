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
import { AboutUs } from "./pages/AboutUs";
import { ContactUs } from "./pages/ContactUs";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { RefundPolicy } from "./pages/RefundPolicy";
import { TermsOfService } from "./pages/TermsOfService";

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("/");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const featuredCoursesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session?.user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;
      setCurrentPage(path);
      if (path === "/login") setIsLoginOpen(true);
      else if (path === "/signup") setIsSignupOpen(true);
      else {
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
    if (href === "/login") setIsLoginOpen(true);
    else if (href === "/signup") setIsSignupOpen(true);
    else {
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
    handleNavClick("/");
  };

  const handleCloseSignup = () => {
    handleNavClick("/");
  };

  const handleExploreCourses = (category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    if (featuredCoursesRef.current) {
      featuredCoursesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentPage === "/privacy-policy") return <PrivacyPolicy />;
  if (currentPage === "/terms-of-service") return <TermsOfService />;
  if (currentPage === "/refund-policy") return <RefundPolicy />;
  if (currentPage === "/about") return <AboutUs />;
  if (currentPage === "/contact") return <ContactUs />;

  return (
    <div className="min-h-screen bg-white">
      <Header onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      <main>
        <Hero onExploreCourses={handleExploreCourses} />
        <Categories onExploreCourses={handleExploreCourses} />
        <div ref={featuredCoursesRef}>
          <CourseCategories onExploreCourses={handleExploreCourses} selectedCategory={selectedCategory} />
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