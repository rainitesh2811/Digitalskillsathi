import { supabase } from "@/supabaseclient";
import { ChevronDown, Menu, X } from "lucide-react";
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
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoggedIn(!!user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      setUser(session?.user || null);
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div 
          className="flex items-center cursor-pointer flex-shrink-0"
          onClick={() => window.history.pushState({}, "", "/")}
        >
          <img src="/logo.png" alt="DigitalskillSathi" className="h-25 w-30 object-contain flex-shrink-0" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#courses" className="text-sm font-medium hover:text-orange-600 transition-colors">
            Courses
          </a>
          <div className="relative group">
            <button className="text-sm font-medium hover:text-orange-600 transition-colors flex items-center gap-1">
              Categories <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border">
              <div className="py-2">
                <a href="#web-dev" className="block px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600">
                  Web Development
                </a>
                <a href="#data-science" className="block px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600">
                  Data Science
                </a>
                <a href="#marketing" className="block px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600">
                  Digital Marketing
                </a>
                <a href="#design" className="block px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600">
                  Design
                </a>
              </div>
            </div>
          </div>
          <a href="#about" className="text-sm font-medium hover:text-orange-600 transition-colors">
            About
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-orange-600 transition-colors">
            Contact
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <Button variant="ghost" className="text-sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="text-sm" onClick={onLoginClick}>
                Login
              </Button>
              <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700" onClick={onSignupClick}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a href="#courses" className="text-sm font-medium hover:text-orange-600 transition-colors">
              Courses
            </a>
            <a href="#web-dev" className="text-sm font-medium hover:text-orange-600 transition-colors pl-4">
              Web Development
            </a>
            <a href="#data-science" className="text-sm font-medium hover:text-orange-600 transition-colors pl-4">
              Data Science
            </a>
            <a href="#marketing" className="text-sm font-medium hover:text-orange-600 transition-colors pl-4">
              Digital Marketing
            </a>
            <a href="#design" className="text-sm font-medium hover:text-orange-600 transition-colors pl-4">
              Design
            </a>
            <a href="#about" className="text-sm font-medium hover:text-orange-600 transition-colors">
              About
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-orange-600 transition-colors">
              Contact
            </a>
            <div className="flex flex-col gap-2 pt-4 border-t">
              {isLoggedIn ? (
                <>
                  <span className="text-sm text-gray-600 px-2 py-1">Welcome, {user?.email}</span>
                  <Button variant="ghost" className="w-full" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="w-full" onClick={onLoginClick}>
                    Login
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700" onClick={onSignupClick}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}