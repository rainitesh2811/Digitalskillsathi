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
  userName: string
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
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create Razorpay order");
    }

    const paymentData = await response.json();
    const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID as string;

    return {
      orderId: "",
      orderId_razorpay: paymentData.id,
      keyId: razorpayKeyId,
    };
  } catch (error) {
    console.error("Error creating Razorpay payment:", error);
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
  amount: number
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
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Payment verification failed:", errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error verifying payment with backend:", error);
    return false;
  }
}
