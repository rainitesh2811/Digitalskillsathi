import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Star, Clock, Users, BookOpen } from "lucide-react";

interface CourseCardProps {
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  level: string;
  category: string;
  image: string;
}

export function CourseCard({
  title,
  instructor,
  price,
  originalPrice,
  rating,
  students,
  duration,
  lessons,
  level,
  category,
  image,
}: CourseCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card className="group overflow-hidden border hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
            {discount}% OFF
          </Badge>
        )}
        <Badge className="absolute top-3 right-3 bg-orange-600 hover:bg-orange-700">
          {category}
        </Badge>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {level}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold">{rating}</span>
            <span className="text-xs text-gray-500">({students.toLocaleString()})</span>
          </div>
        </div>

        <h3 className="font-bold text-lg line-clamp-2 group-hover:text-orange-600 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-gray-600">by {instructor}</p>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{lessons} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{(students / 1000).toFixed(1)}K</span>
          </div>
        </div>

        <div className="pt-3 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-600">₹{price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>
            )}
          </div>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </Card>
  );
}