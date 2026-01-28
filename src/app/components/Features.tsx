import { Card } from "@/app/components/ui/card";
import { Award, BookOpen, Clock, HeadphonesIcon, Trophy, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of real-world experience",
  },
  {
    icon: Clock,
    title: "Lifetime Access",
    description: "Get unlimited access to course materials anytime, anywhere",
  },
  {
    icon: Award,
    title: "Certification",
    description: "Earn recognized certificates upon course completion",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a vibrant community of learners and grow together",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Get help whenever you need it from our dedicated support team",
  },
  {
    icon: Trophy,
    title: "Career Growth",
    description: "Access career resources and job placement assistance",
  },
];

export function Features() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">DigitalskillSathi</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide everything you need to succeed in your learning journey
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-2">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-orange-100 to-red-100 mb-4">
                  <Icon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}