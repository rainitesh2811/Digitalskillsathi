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

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const featuredCoursesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle route changes
    const path = window.location.pathname;
    if (path === "/login") {
      setIsLoginOpen(true);
    } else if (path === "/signup") {
      setIsSignupOpen(true);
    }
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

  return (
    <div className="min-h-screen bg-white">
      <Header onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      <main>
        <Hero />
        <Categories onExploreCourses={handleExploreCourses} />
        <div ref={featuredCoursesRef}>
          <FeaturedCourses />
        </div>
        <Features />
        <Testimonials />
        <CTA />
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