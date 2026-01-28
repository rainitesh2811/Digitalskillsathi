import { supabase } from "@/supabaseclient";
import { useEffect, useRef, useState } from "react";
import { Categories } from "./components/Categories";
import { CTA } from "./components/CTA";
import { FeaturedCourses } from "./components/FeaturedCourses";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { LoginModal } from "./components/LoginModal";
import { SignupModal } from "./components/SignupModal";
import { Testimonials } from "./components/Testimonials";
import { AboutUs } from "./pages/AboutUs";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { RefundPolicy } from "./pages/RefundPolicy";
import { TermsOfService } from "./pages/TermsOfService";

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("/");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    handleNavigation();
    window.addEventListener("popstate", handleNavigation);
    window.addEventListener("navigate", handleNavigation);
    return () => {
      window.removeEventListener("popstate", handleNavigation);
      window.removeEventListener("navigate", handleNavigation);
    };
  }, []);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
    window.history.pushState({}, "", "/login");
  };

  const handleSignupClick = () => {
    setIsSignupOpen(true);
    window.history.pushState({}, "", "/signup");
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
    window.history.pushState({}, "", "/");
  };

  const handleCloseSignup = () => {
    setIsSignupOpen(false);
    window.history.pushState({}, "", "/");
  };

  const handleExploreCourses = () => {
    if (featuredCoursesRef.current) {
      featuredCoursesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentPage === "/privacy-policy") return <PrivacyPolicy />;
  if (currentPage === "/terms-of-service") return <TermsOfService />;
  if (currentPage === "/refund-policy") return <RefundPolicy />;
  if (currentPage === "/about") return <AboutUs />;

  return (
    <div className="min-h-screen bg-white">
      <Header onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      <main>
        <Hero onExploreCourses={handleExploreCourses} />
        <Categories onExploreCourses={handleExploreCourses} />
        <div ref={featuredCoursesRef}>
          <FeaturedCourses />
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
          setIsLoginOpen(false);
          setIsSignupOpen(true);
          window.history.pushState({}, "", "/signup");
        }}
      />
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={handleCloseSignup}
        onSwitchToLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
          window.history.pushState({}, "", "/login");
        }}
      />
    </div>
  );
}