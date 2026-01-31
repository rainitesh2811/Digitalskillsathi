import {
  ArrowLeft,
  Award,
  BookOpen,
  Facebook,
  GraduationCap,
  Instagram,
  Landmark,
  Linkedin,
  Twitter,
  Users,
  Youtube
} from "lucide-react";
import { useEffect } from "react";

export function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const socialLinks = [
    { name: "FACEBOOK", icon: <Facebook className="w-4 h-4" />, url: "#" },
    { name: "TWITTER", icon: <Twitter className="w-4 h-4" />, url: "#" },
    { name: "INSTAGRAM", icon: <Instagram className="w-4 h-4" />, url: "https://www.instagram.com/digitalskillsathi/?hl=en" },
    { name: "YOUTUBE", icon: <Youtube className="w-4 h-4" />, url: "https://www.youtube.com/@digitalskillsathi?si=FNwUZNjRtjeaNK8F" },
    { name: "LINKEDIN", icon: <Linkedin className="w-4 h-4" />, url: "#" },
  ];

  const navigateHome = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent('popstate'));
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
              <Landmark className="w-4 h-4" />
              <span>Digital Skill Sathi • Educational Practice</span>
            </div>
            
            <h1 className="text-[15vw] md:text-[10vw] leading-[0.85] font-black tracking-tighter mb-12 text-slate-900 z-20 relative">
              CULTIVATING <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">INTELLECT.</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start -mt-4 md:-mt-10">
              <div className="md:col-span-8 relative z-10 group active:scale-[0.99] transition-all duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80" 
                  className="w-full h-[300px] md:h-[600px] object-cover rounded-sm shadow-2xl transition-all duration-700 brightness-90 group-hover:brightness-100"
                  alt="Academic Research" 
                />
                <div className="absolute top-0 left-0 w-full h-full border-2 border-white/20 pointer-events-none"></div>
              </div>
              
              <div className="md:col-span-4 flex flex-col gap-8 md:pt-24 relative z-20">
                <div className="bg-slate-950 p-8 text-white rounded-sm shadow-2xl border-l-4 border-orange-600 transform active:scale-95 transition-transform md:-ml-20">
                    <h3 className="text-xl font-bold uppercase mb-4 flex items-center gap-2">
                        <GraduationCap className="text-orange-500" /> Our Mission
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-sm md:text-base font-light">
                        To serve as a premier educational firm specializing in high-demand digital literacies, empowering the modern workforce through rigorous certification and mentorship.
                    </p>
                </div>
                <div className="relative group overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80" 
                        className="w-full h-[200px] object-cover rounded-sm shadow-md transition-transform duration-700 group-hover:scale-110"
                        alt="Workshop" 
                    />
                    <div className="absolute inset-0 bg-orange-600/10 mix-blend-multiply"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* SECTION 2: FOUNDERS */}
<section className="py-20 md:py-32 bg-slate-50 border-y border-slate-100">
  <div className="container mx-auto px-4">
    {/* Section Header */}
    <div className="text-center mb-24">
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 italic">Founding Partners</h2>
      <div className="h-[2px] w-32 bg-gradient-to-r from-orange-600 to-red-600 mx-auto"></div>
    </div>

    {/* Founders Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto items-start">
      
      <div className="group relative flex flex-col items-center md:items-start transition-all duration-500 md:max-w-[85%]">
        <div className="relative w-full h-auto overflow-hidden rounded-sm shadow-2xl bg-white border border-slate-200">
          <img 
            src="/image.png" 
            className="w-full h-auto object-contain transition-all duration-700 group-hover:scale-105"
            alt="Ravi Virat"
          />
          <div className="absolute inset-0 border-[10px] border-white/5 pointer-events-none"></div>
        </div>
        <div className="mt-8 border-l-4 border-orange-600 pl-5 self-start">
          <h4 className="text-2xl font-bold uppercase tracking-tighter text-slate-900">RAVVI VIRAT</h4>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">FOUNDER</p>
        </div>
      </div>

      <div className="group relative flex flex-col items-center md:items-start transition-all duration-500 md:pt-32">
        <div className="relative w-full h-auto overflow-hidden rounded-sm shadow-2xl bg-white border border-slate-200">
          <img 
            src="/my.png" 
            className="w-full h-auto object-contain transition-all duration-700 group-hover:scale-105"
            alt="Nitesh Rai"
          />
          <div className="absolute inset-0 border-[10px] border-white/5 pointer-events-none"></div>
        </div>
        <div className="mt-8 border-l-4 border-red-600 pl-5 self-start">
          <h4 className="text-2xl font-bold uppercase tracking-tighter text-slate-900">NITESH RAI</h4>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Tech Head</p>
        </div>
      </div>

    </div>
  </div>
</section>
      {/* SECTION 3: INSTITUTIONAL SERVICES */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-5xl md:text-8xl font-black mb-12 uppercase tracking-tighter leading-none">
                OUR <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">PRACTICE.</span>
              </h2>
              <div className="space-y-12">
                {[
                  { icon: <BookOpen />, title: "Curriculum Engineering", desc: "Design of specialized digital syllabi tailored for academic institutional integration." },
                  { icon: <Users />, title: "Executive Mentorship", desc: "Professional one-on-one leadership training for the digital economy." },
                  { icon: <Award />, title: "Certified Accreditation", desc: "Issuing globally recognized credentials verified through industry-standard testing." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group cursor-default">
                    <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-sm bg-slate-50 text-orange-600 border border-slate-100 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-orange-600 group-hover:to-red-600 group-hover:text-white group-hover:rotate-[360deg]">
                        {item.icon}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2 group overflow-hidden rounded-sm shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80" 
                  className="w-full h-[500px] md:h-[700px] object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt="Educational Excellence"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CONTACT FOOTER */}
      <section className="py-24 bg-slate-950 text-white relative">
        <div className="container mx-auto px-4 z-10 relative text-center">
          <p className="text-[10px] tracking-[0.6em] uppercase text-orange-500 font-black mb-12">Global Educational Network</p>
          
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
              CONTACT <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 tracking-[-0.1em]"></span> US
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}