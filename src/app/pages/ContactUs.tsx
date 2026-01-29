import {
    ArrowLeft,
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    Send,
    Twitter,
    Youtube
} from "lucide-react";
import { useEffect, useState } from "react";

export function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const socialLinks = [
    { name: "FACEBOOK", icon: <Facebook className="w-4 h-4" />, url: "#" },
    { name: "TWITTER", icon: <Twitter className="w-4 h-4" />, url: "#" },
    { name: "INSTAGRAM", icon: <Instagram className="w-4 h-4" />, url: "https://www.instagram.com/digitalskillsathi/?hl=en" },
    { name: "YOUTUBE", icon: <Youtube className="w-4 h-4" />, url: "https://www.youtube.com/@digitalskillsathi?si=FNwUZNjRtjeaNK8F" },
    { name: "LINKEDIN", icon: <Linkedin className="w-4 h-4" />, url: "#" },
  ];

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      content: "4/185 Virat Khand, Gomti Nagar, Lucknow- 226010"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      content: "+91 9546429362"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "support@digitalskillsathi.com"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Response Time",
      content: "We'll respond within 24 hours"
    }
  ];

  const navigateHome = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the form data to a backend
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden selection:bg-orange-100">
      
      {/* FLOATING BACK BUTTON */}
      <nav className="fixed top-6 left-6 z-50">
        <button 
          onClick={navigateHome}
          className="group flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 px-4 py-2 rounded-full shadow-lg hover:border-orange-500 transition-all active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center text-white transition-transform group-hover:-translate-x-1">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase pr-2">Back to Home</span>
        </button>
      </nav>

      {/* SECTION 1: HERO */}
      <section className="pt-24 md:pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="relative">
            <div className="flex items-center gap-3 mb-8 text-orange-600 font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase">
              <MessageSquare className="w-4 h-4" />
              <span>Digital Skill Sathi • Get in Touch</span>
            </div>
            
            <h1 className="text-[15vw] md:text-[10vw] leading-[0.85] font-black tracking-tighter mb-12 text-slate-900 z-20 relative">
              LET'S <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">CONNECT.</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start -mt-4 md:-mt-10">
              <div className="md:col-span-8 relative z-10 group active:scale-[0.99] transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" 
                  className="w-full h-[300px] md:h-[600px] object-cover rounded-sm shadow-2xl transition-all duration-700 brightness-90 group-hover:brightness-100"
                  alt="Contact Us" 
                />
                <div className="absolute top-0 left-0 w-full h-full border-2 border-white/20 pointer-events-none"></div>
              </div>
              
              <div className="md:col-span-4 flex flex-col gap-8 md:pt-24 relative z-20">
                <div className="bg-slate-950 p-8 text-white rounded-sm shadow-2xl border-l-4 border-orange-600 transform active:scale-95 transition-transform md:-ml-20">
                    <h3 className="text-xl font-bold uppercase mb-4 flex items-center gap-2">
                        <Send className="text-orange-500" /> Quick Contact
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-sm md:text-base font-light">
                        Have questions? We'd love to hear from you. Get in touch with our team today and let's discuss how we can help you achieve your digital learning goals.
                    </p>
                </div>
                <div className="relative group overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" 
                        className="w-full h-[200px] object-cover rounded-sm shadow-md transition-transform duration-700 group-hover:scale-110"
                        alt="Team Communication" 
                    />
                    <div className="absolute inset-0 bg-orange-600/10 mix-blend-multiply"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTACT INFORMATION */}
      <section className="py-20 md:py-32 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 italic">Contact Information</h2>
            <div className="h-[2px] w-32 bg-gradient-to-r from-orange-600 to-red-600 mx-auto"></div>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="group bg-white p-8 rounded-sm shadow-lg border border-slate-100 hover:border-orange-500 transition-all duration-500 transform hover:scale-105 active:scale-95">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-sm flex items-center justify-center text-orange-600 mb-6 group-hover:text-white group-hover:from-orange-600 group-hover:to-red-600 transition-all duration-500">
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight mb-3 group-hover:text-orange-600 transition-colors">{info.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{info.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: CONTACT FORM */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-5xl md:text-8xl font-black mb-12 uppercase tracking-tighter leading-none">
                SEND US A <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">MESSAGE.</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Whether you have a question about courses, pricing, or anything else, our team is ready to answer all your questions.
              </p>
              <div className="space-y-6">
                {contactInfo.slice(0, 3).map((info, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-sm bg-gradient-to-br from-orange-100 to-red-100 text-orange-600">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{info.title}</h4>
                      <p className="text-slate-600 text-sm">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <form onSubmit={handleSubmit} className="bg-slate-50 p-8 md:p-12 rounded-sm shadow-xl border border-slate-100">
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-8">Send a Message</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What is this about?"
                      className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us about your inquiry..."
                      rows={6}
                      className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SOCIAL LINKS FOOTER */}
      <section className="py-24 bg-slate-950 text-white relative">
        <div className="container mx-auto px-4 z-10 relative text-center">
          <p className="text-[10px] tracking-[0.6em] uppercase text-orange-500 font-black mb-12">Connect With Us</p>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-5 max-w-4xl mx-auto">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 border border-white/10 rounded-full px-6 py-3 md:px-10 md:py-4 transition-all duration-300 active:scale-90 hover:bg-white hover:text-slate-950"
              >
                <span className="text-orange-500 transition-transform group-hover:scale-125 duration-300">{social.icon}</span>
                <span className="text-[10px] md:text-xs font-black tracking-widest uppercase">{social.name}</span>
              </a>
            ))}
          </div>

          <div className="mt-32 md:mt-48 pt-10 border-t border-white/5">
            <h2 className="text-[14vw] leading-none font-black text-center tracking-tighter select-none">
              THANK YOU
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
