import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { FeaturedCourses } from "@/app/components/FeaturedCourses";
import { Categories } from "@/app/components/Categories";
import { Features } from "@/app/components/Features";
import { Testimonials } from "@/app/components/Testimonials";
import { CTA } from "@/app/components/CTA";
import { Footer } from "@/app/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedCourses />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}