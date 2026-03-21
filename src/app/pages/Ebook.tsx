import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export interface Ebook {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: string;
}

interface EbookProps {
  onBack: () => void;
  onBuyNow?: (ebook: Ebook) => void;
}

export function Ebook({ onBack, onBuyNow }: EbookProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const singleEbook: Ebook = {
    id: "ebook-1",
    title: "Smart Parenting For Modern World",
    description: "Learn effective parenting strategies for the digital age.",
    price: 199,
    originalPrice: 599,
    discount: 66,
    image: "/ebook1.png",
    category: "Parenting",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors mb-8 font-medium text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Ebooks</h1>
          <p className="text-md text-gray-600">
            Download premium ebooks to enhance your learning journey.
          </p>
        </div>

        <div className="flex justify-start mb-16">
          <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-shadow hover:shadow-lg">
            <div className="aspect-video bg-gray-50 flex items-center justify-center overflow-hidden px-4 py-2">
              <img 
                src={singleEbook.image}
                alt={singleEbook.title}
                className="h-full w-auto object-contain drop-shadow-sm transition-transform hover:scale-105 duration-300"
              />
            </div>

            <div className="p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-1 leading-tight">
                {singleEbook.title}
              </h3>
              <p className="text-gray-500 mb-3 text-[10px] leading-relaxed">
                {singleEbook.description}
              </p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold text-gray-900">₹{singleEbook.price}</span>
                <span className="text-xs text-gray-400 line-through">₹{singleEbook.originalPrice}</span>
                <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                  {singleEbook.discount}% OFF
                </span>
              </div>

              <button
                onClick={() => onBuyNow?.(singleEbook)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-1.5 rounded text-[11px] transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Centered CTA Section */}
        <div className="mx-auto max-w-2xl bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-8 text-center border border-orange-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Want More Resources?</h2>
          <p className="text-gray-700 mb-6">
            Explore our full library of courses and premium content to accelerate your learning journey.
          </p>
          <button
            onClick={onBack}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-block"
          >
            Explore Courses
          </button>
        </div>
      </div>
    </div>
  );
}