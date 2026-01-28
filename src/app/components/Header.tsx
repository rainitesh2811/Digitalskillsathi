import { supabase } from "@/supabaseclient";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface HeaderProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export function Header({ onLoginClick, onSignupClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsLoggedIn(!!user);
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      setUser(session?.user || null);
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
    setIsMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
    window.location.href = href;
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer flex-shrink-0"
          onClick={() => (window.location.href = "/")}
        >
          <img
            src="/logo.png"
            alt="DigitalskillSathi"
            className="h-12 w-auto object-contain flex-shrink-0"
          />
        </div>
        {isLoggedIn && (
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleNavClick("/my-courses")}
              className="text-sm font-medium hover:text-orange-600 transition-colors"
            >
              My Courses
            </button>

            <button
              onClick={() => handleNavClick("/payment-history")}
              className="text-sm font-medium hover:text-orange-600 transition-colors"
            >
              Payment History
            </button>

            <a
              href="#about"
              className="text-sm font-medium hover:text-orange-600 transition-colors"
            >
              About
            </a>

            <a
              href="#contact"
              className="text-sm font-medium hover:text-orange-600 transition-colors"
            >
              Contact Us
            </a>

            <button
              onClick={() => handleNavClick("/settings")}
              className="text-sm font-medium hover:text-orange-600 transition-colors"
            >
              Settings
            </button>

            <Button 
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-sm" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </nav>
        )}

        {!isLoggedIn && (
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-sm" onClick={onLoginClick}>
              Login
            </Button>
            <Button
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              onClick={onSignupClick}
            >
              Sign Up
            </Button>
          </div>
        )}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {isLoggedIn && user?.email && (
              <div className="text-sm text-gray-600 px-2 py-2 rounded-md bg-gray-50 border">
                Logged in as <span className="font-medium">{user.email}</span>
              </div>
            )}

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavClick("/my-courses")}
                  className="text-sm font-medium text-left hover:text-orange-600 transition-colors"
                >
                  My Courses
                </button>

                <button
                  onClick={() => handleNavClick("/payment-history")}
                  className="text-sm font-medium text-left hover:text-orange-600 transition-colors"
                >
                  Payment History
                </button>

                <a
                  href="#about"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium hover:text-orange-600 transition-colors"
                >
                  About
                </a>

                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium hover:text-orange-600 transition-colors"
                >
                  Contact Us
                </a>

                <button
                  onClick={() => handleNavClick("/settings")}
                  className="text-sm font-medium text-left hover:text-orange-600 transition-colors"
                >
                  Settings
                </button>

                <div className="pt-4 border-t">
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button variant="ghost" className="w-full" onClick={onLoginClick}>
                  Login
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  onClick={onSignupClick}
                >
                  Sign Up
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
