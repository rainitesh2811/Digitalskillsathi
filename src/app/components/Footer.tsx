import { Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

export function Footer() {
  const handleNavigateToPolicy = (page: string) => {
    window.history.pushState({}, "", `/${page}`);
    window.dispatchEvent(new Event("navigate"));
  };

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="DigitalskillSathi" className="h-24 w-30 object-contain" />
            </div>
            <p className="text-sm mb-4">
              Empowering learners with quality online education and practical skills for the digital age.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/digitalskillsathi/?hl=en" className="h-10 w-10 rounded-full bg-gray-800 hover:bg-orange-600 flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@digitalskillsathi?si=FNwUZNjRtjeaNK8F" className="h-10 w-10 rounded-full bg-gray-800 hover:bg-orange-600 flex items-center justify-center transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNavigateToPolicy("about")} className="hover:text-orange-400 transition-colors cursor-pointer">About Us</button>
              </li>
              <li>
                <button onClick={() => handleNavigateToPolicy("contact")} className="hover:text-orange-400 transition-colors cursor-pointer">Contact Us</button>
              </li>
              <li>
                <a href="#courses" className="hover:text-orange-400 transition-colors">Courses</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Blog</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Web Development</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Data Science</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Digital Marketing</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Design & Creative</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Mobile Development</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">Business</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>4/185 Virat Khand, Gomti Nagar, Lucknow- 226010</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-orange-400 flex-shrink-0" />
                <span>+91 9546429362</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-orange-400 flex-shrink-0" />
                <span>support@digitalskillsathi.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; 2026 DigitalskillSathi. All rights reserved.</p>
            <div className="flex gap-6">
              <button
                onClick={() => handleNavigateToPolicy("privacy-policy")}
                className="hover:text-orange-400 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleNavigateToPolicy("terms-of-service")}
                className="hover:text-orange-400 transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <button
                onClick={() => handleNavigateToPolicy("refund-policy")}
                className="hover:text-orange-400 transition-colors cursor-pointer"
              >
                Refund Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}