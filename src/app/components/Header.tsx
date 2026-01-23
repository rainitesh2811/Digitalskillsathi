import { Button } from "@/app/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center text-white">
              <span className="text-sm font-bold">DS</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              DigitalskillSathi
            </span>
          </div>
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
          <Button variant="ghost" className="text-sm">
            Login
          </Button>
          <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
            Sign Up
          </Button>
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
              <Button variant="ghost" className="w-full">
                Login
              </Button>
              <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}