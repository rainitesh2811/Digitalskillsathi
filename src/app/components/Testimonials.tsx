import { Card } from "@/app/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Web Developer",
    company: "Tech Solutions Inc.",
    image: "https://images.unsplash.com/photo-1765648636065-fd5c0884b629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHN0dWRlbnR8ZW58MXx8fHwxNzY5MTQwNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    content: "DigitalskillSathi transformed my career! The web development course was incredibly comprehensive and the instructors were always available to help. I landed my dream job within 3 months of completing the course.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Data Scientist",
    company: "Analytics Pro",
    image: "https://images.unsplash.com/photo-1765648636065-fd5c0884b629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHN0dWRlbnR8ZW58MXx8fHwxNzY5MTQwNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    content: "The data science program exceeded my expectations. Real-world projects and hands-on learning made all the difference. Highly recommend for anyone looking to break into data science!",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    role: "Digital Marketer",
    company: "Marketing Wizards",
    image: "https://images.unsplash.com/photo-1765648636065-fd5c0884b629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHN0dWRlbnR8ZW58MXx8fHwxNzY5MTQwNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    content: "Amazing platform with top-notch content! The digital marketing course gave me practical skills that I use every day. The community support is fantastic too!",
    rating: 5,
  },
  {
    name: "Arjun Menon",
    role: "UI/UX Designer",
    company: "Design Studio",
    image: "https://images.unsplash.com/photo-1765648636065-fd5c0884b629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHN0dWRlbnR8ZW58MXx8fHwxNjkxNDA1NTgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    content: "Best investment I've made in my career. The UI/UX course was well-structured and the projects helped me build an impressive portfolio. Now working at my dream company!",
    rating: 5,
  },
  {
    name: "Anjali Singh",
    role: "Full Stack Developer",
    company: "StartupTech",
    image: "https://images.unsplash.com/photo-1765648636065-fd5c0884b629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHN0dWRlbnR8ZW58MXx8fHwxNzY5MTQwNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    content: "The quality of instruction and course material is outstanding. I went from zero coding knowledge to building full-stack applications. Couldn't be happier with my progress!",
    rating: 5,
  },
  {
    name: "Vikram Kumar",
    role: "Business Analyst",
    company: "Consulting Group",
    image: "https://images.unsplash.com/photo-1765648636065-fd5c0884b629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHN0dWRlbnR8ZW58MXx8fHwxNzY5MTQwNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    content: "Exceptional learning experience! The business analytics course provided practical insights and tools I now use daily. Great value for money!",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Students Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied learners who have transformed their careers with DigitalskillSathi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-shadow relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-orange-200" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 relative z-10">{testimonial.content}</p>

              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-xs text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}