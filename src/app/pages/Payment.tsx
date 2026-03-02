import { Button } from "@/app/components/ui/button";
import { createRazorpayPayment, verifyPaymentWithBackend } from "@/services/paymentService";
import { supabase } from "@/supabaseclient";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface Course {
  id: number;
  title: string;
  icon: string;
  category: string;
}

interface PaymentPageProps {
  course: Course | null;
  onGoBack: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function Payment({ course, onGoBack }: PaymentPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
    
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    getUser();
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Course not found</p>
          <Button onClick={onGoBack} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const courseDetailsMap: Record<number, { price: number; description: string }> = {
    1: { price: 199, description: "Advanced AI course" },
    2: { price: 0, description: "Basic AI course" },
    3: { price: 0, description: "Canva Fundamentals" },
    4: { price: 0, description: "Canva Advanced" },
    5: { price: 0, description: "Web Development" },
    6: { price: 0, description: "WordPress" },
    7: { price: 199, description: "Digital Marketing Basics" },
    8: { price: 299, description: "Digital Marketing Advanced" },
  };

  const details = courseDetailsMap[course.id] || { price: 0, description: "" };

  const handleProceedPayment = async () => {
    if (!user) {
      setError("Please log in to proceed with payment");
      return;
    }

    if (details.price === 0) {
      setError("This course is currently free or coming soon");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Create Razorpay order via backend
      const orderResponse = await createRazorpayPayment(
        user.id,
        course.id.toString(),
        details.price,
        course.title,
        user.email || "",
        user.user_metadata?.name || "Student"
      );

      // Step 2: Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onerror = () => {
          throw new Error("Failed to load Razorpay script");
        };
        document.body.appendChild(script);

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          setTimeout(() => reject(new Error("Razorpay script timeout")), 10000);
        });
      }

      // Step 3: Open Razorpay payment modal
      const razorpay = new window.Razorpay({
        key: orderResponse.keyId,
        order_id: orderResponse.orderId_razorpay,
        handler: async (response: any) => {
          try {
            // Step 4: Verify payment on backend
            const isVerified = await verifyPaymentWithBackend(
              user.id,
              orderResponse.orderId_razorpay || "",
              response.razorpay_payment_id,
              response.razorpay_signature,
              course.title,
              course.category,
              details.price
            );

            if (isVerified) {
              setIsLoading(false);
              // Payment successful - redirect to My Courses
              window.history.pushState({}, "", "/my-courses");
              window.location.reload();
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (verifyError) {
            setError("Payment verified but enrollment failed. Please contact support.");
            console.error("Verification error:", verifyError);
            setIsLoading(false);
          }
        },
        prefill: {
          name: user.user_metadata?.name || "Student",
          email: user.email,
          contact: user.user_metadata?.phone || "",
        },
        theme: {
          color: "#ea580c",
        },
      });

      razorpay.open();
      setIsLoading(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to initiate payment. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onGoBack}
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Course
          </button>
        </div>
      </div>

      <div
        className={`container mx-auto px-4 py-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-900">Complete Your Enrollment</h1>

            {/* Course Summary */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-white rounded-lg shadow flex items-center justify-center overflow-hidden border border-gray-200">
                    <img
                      src={course.icon}
                      alt={course.title}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                    {course.category}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h2>
                  <p className="text-gray-600">{details.description}</p>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="mb-8">
              <div className="bg-orange-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700 font-medium">Course Price</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {details.price === 0 ? "Free" : `₹${details.price}`}
                  </span>
                </div>
                {details.price > 0 && (
                  <>
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-orange-200">
                      <span className="text-gray-700">Taxes & Fees</span>
                      <span className="text-gray-700">Included</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total Amount</span>
                      <span className="text-3xl font-bold text-orange-600">₹{details.price}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* Payment Method Info */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
              <p className="text-gray-600 text-sm mb-3">
                You will be redirected to Razorpay's secure payment gateway. We accept:
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded border border-gray-200">
                  🏦 Credit Card
                </div>
                <div className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded border border-gray-200">
                  💳 Debit Card
                </div>
                <div className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded border border-gray-200">
                  🏪 UPI
                </div>
                <div className="text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded border border-gray-200">
                  💰 Wallets
                </div>
              </div>
            </div>

            {/* Proceed Button */}
            <Button
              onClick={handleProceedPayment}
              disabled={isLoading || details.price === 0}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : details.price === 0 ? "Coming Soon" : "Proceed to Payment"}
            </Button>

            {/* Security Info */}
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>🔒 Your payment is secure and encrypted with Razorpay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
