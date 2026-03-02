// Example usage in CourseDetails.tsx

import { ModuleList } from "@/components/ModuleList";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/VideoPlayer";
import { createRazorpayPayment, createStripePayment } from "@/services/paymentService";
import { supabase } from "@/supabaseclient";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
}

export function CourseDetailsExample() {
  const [course, setCourse] = useState<Course | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };

    getUser();
  }, []);

  // Check if user has purchased this course
  useEffect(() => {
    if (!userId || !course) return;

    const checkPurchase = async () => {
      const { data } = await supabase
        .from("user_courses")
        .select("id")
        .eq("user_id", userId)
        .eq("course_id", course.id)
        .eq("payment_status", "completed")
        .single();

      setHasPurchased(!!data);
    };

    checkPurchase();
  }, [userId, course?.id]);

  // Handle purchase with Stripe
  const handleStripePayment = async () => {
    if (!userId || !course) return;

    setIsLoading(true);
    try {
      const paymentData = await createStripePayment(
        userId,
        course.id,
        course.price,
        course.title
      );

      // Redirect to Stripe checkout or open Stripe modal
      // Implementation depends on your payment setup
      console.log("Stripe payment ready:", paymentData);
      toast.success("Redirecting to payment...");

      // Example: Use stripe.js to handle payment
      // window.location.href = `/checkout?clientSecret=${paymentData.clientSecret}`;
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initiate payment");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle purchase with Razorpay
  const handleRazorpayPayment = async () => {
    if (!userId || !course) return;

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const paymentData = await createRazorpayPayment(
        userId,
        course.id,
        course.price,
        course.title,
        user?.email || "",
        user?.user_metadata?.full_name || "User"
      );

      // Open Razorpay checkout
      const options = {
        key: paymentData.keyId,
        amount: course.price * 100, // Convert to paise
        currency: "INR",
        name: "DigitalSkillsAthI",
        description: `Payment for ${course.title}`,
        order_id: paymentData.orderId_razorpay,
        handler: async (response: any) => {
          // Handle successful payment
          console.log("Payment successful:", response);
          setHasPurchased(true);
          toast.success("Course purchased successfully!");
        },
        prefill: {
          email: user?.email,
          name: user?.user_metadata?.full_name,
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Load and open Razorpay
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initiate payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {course && (
        <>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.description}</p>

            {!hasPurchased && userId ? (
              <div className="flex gap-4">
                <Button
                  onClick={handleStripePayment}
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? "Processing..." : "Pay with Stripe"}
                </Button>
                <Button
                  onClick={handleRazorpayPayment}
                  disabled={isLoading}
                  variant="outline"
                  size="lg"
                >
                  {isLoading ? "Processing..." : "Pay with Razorpay"}
                </Button>
              </div>
            ) : hasPurchased ? (
              <div className="bg-green-100 text-green-800 p-4 rounded">
                ✓ You have access to this course
              </div>
            ) : (
              <div className="text-gray-600">
                Please log in to purchase this course
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Modules List */}
            <div className="col-span-1">
              <h2 className="text-xl font-bold mb-4">Course Modules</h2>
              <ModuleList
                courseId={course.id}
                userId={userId || undefined}
                onModuleSelect={setSelectedModuleId}
              />
            </div>

            {/* Video Player */}
            <div className="col-span-2">
              {selectedModuleId ? (
                <VideoPlayer
                  moduleId={selectedModuleId}
                  userId={userId || undefined}
                  moduleName="Video Player"
                />
              ) : (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <p className="text-gray-600">
                    Select a module to watch the video
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
