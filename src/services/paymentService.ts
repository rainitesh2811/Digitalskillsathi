// src/services/paymentService.ts
// Handle payment initiation with Razorpay


// Backend API base URL - configure this for your deployment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export interface CreateOrderResponse {
  orderId: string;
  orderId_razorpay?: string; // For Razorpay
  keyId?: string; // For Razorpay
}

/**
 * Create an order and initiate payment with Razorpay
 */
export async function createRazorpayPayment(
  userId: string,
  courseId: string,
  amount: number,
  courseName: string,
  userEmail: string,
  userName: string,
  productType: string = "course"
): Promise<CreateOrderResponse> {
  try {
    // Call backend API to create Razorpay order
    const response = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        courseTitle: courseName,
        amount: amount, // Amount in INR
        category: "", // Add category if available
        productType: productType,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.error || "Failed to create Razorpay order");
    }

    const paymentData = await response.json();
    const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID as string;

    return {
      orderId: "",
      orderId_razorpay: paymentData.id,
      keyId: razorpayKeyId,
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Verify payment with backend
 */
export async function verifyPaymentWithBackend(
  userId: string,
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
  courseTitle: string,
  category: string,
  amount: number,
  productType: string = "course"
): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payment/verify-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        courseTitle,
        category,
        amount,
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: razorpayPaymentId,
        razorpay_signature: razorpaySignature,
        productType: productType,
      }),
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
/**
 * Fetch purchased courses for a user
 */
export async function getPurchasedCourses(userId: string): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payment/purchased-courses/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.purchasedCourses?.map((course: any) => course.course_title) || [];
  } catch (error) {
    return [];
  }
}