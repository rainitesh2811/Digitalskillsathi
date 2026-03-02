import { supabase } from "@/supabaseclient";

export interface PaymentWebhookPayload {
  event: "payment.success" | "payment.failed" | "payment.refunded";
  orderId: string;
  userId: string;
  courseId: string;
  amount: number;
  currency: string;
  paymentMethod: "stripe" | "razorpay";
  transactionId: string;
  timestamp: number;
}

/**
 * Handle successful payment webhook
 * This should be called from your payment provider's webhook endpoint
 */
export async function handlePaymentSuccess(
  payload: PaymentWebhookPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Update orders table with completed status
    const { error: orderError } = await supabase
      .from("orders")
      .update({
        status: "completed",
        payment_status: "completed",
        transaction_id: payload.transactionId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", payload.orderId)
      .eq("user_id", payload.userId);

    if (orderError) {
      console.error("Error updating order:", orderError);
      return {
        success: false,
        error: `Failed to update order: ${orderError.message}`,
      };
    }

    // 2. Insert or update user_courses table
    const { error: enrollmentError } = await supabase
      .from("user_courses")
      .upsert(
        {
          user_id: payload.userId,
          course_id: payload.courseId,
          payment_status: "completed",
          enrolled_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,course_id",
        }
      );

    if (enrollmentError) {
      console.error("Error upserting enrollment:", enrollmentError);
      return {
        success: false,
        error: `Failed to update enrollment: ${enrollmentError.message}`,
      };
    }

    // 3. Optional: Send confirmation email or notification
    // You can add email service here

    return { success: true };
  } catch (error) {
    console.error("Error handling payment webhook:", error);
    return {
      success: false,
      error: `Unexpected error: ${error instanceof Error ? error.message : "Unknown"}`,
    };
  }
}

/**
 * Handle payment failure webhook
 */
export async function handlePaymentFailure(
  payload: PaymentWebhookPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    // Update orders table with failed status
    const { error } = await supabase
      .from("orders")
      .update({
        status: "failed",
        payment_status: "failed",
        transaction_id: payload.transactionId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", payload.orderId)
      .eq("user_id", payload.userId);

    if (error) {
      console.error("Error updating failed order:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error handling payment failure:", error);
    return {
      success: false,
      error: `Unexpected error: ${error instanceof Error ? error.message : "Unknown"}`,
    };
  }
}

/**
 * Handle payment refund webhook
 */
export async function handlePaymentRefund(
  payload: PaymentWebhookPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Update orders table with refunded status
    const { error: orderError } = await supabase
      .from("orders")
      .update({
        status: "refunded",
        payment_status: "refunded",
        updated_at: new Date().toISOString(),
      })
      .eq("id", payload.orderId)
      .eq("user_id", payload.userId);

    if (orderError) {
      return { success: false, error: orderError.message };
    }

    // 2. Update user_courses to revoke access (optional)
    const { error: enrollmentError } = await supabase
      .from("user_courses")
      .update({
        payment_status: "refunded",
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", payload.userId)
      .eq("course_id", payload.courseId);

    if (enrollmentError) {
      return { success: false, error: enrollmentError.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error handling payment refund:", error);
    return {
      success: false,
      error: `Unexpected error: ${error instanceof Error ? error.message : "Unknown"}`,
    };
  }
}

/**
 * Verify webhook signature (implement based on your payment provider)
 */
export async function verifyWebhookSignature(
  _payload: any,
  _signature: string,
  _provider: "stripe" | "razorpay"
): Promise<boolean> {
  // This should verify the webhook came from your payment provider
  // Implementation depends on Stripe/Razorpay webhook verification

  // Example for Stripe (requires stripe package):
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // try {
  //   stripe.webhooks.constructEvent(
  //     body,
  //     signature,
  //     STRIPE_WEBHOOK_SECRET
  //   );
  //   return true;
  // } catch (error) {
  //   return false;
  // }

  // For now, return true - implement verification based on your provider
  return true;
}
