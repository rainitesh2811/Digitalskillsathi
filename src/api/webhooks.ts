import {
    handlePaymentFailure,
    handlePaymentRefund,
    handlePaymentSuccess,
    PaymentWebhookPayload,
    verifyWebhookSignature,
} from "@/services/webhookHandler";

/**
 * Universal webhook handler for both Stripe and Razorpay
 * Call this from your backend API endpoint
 */
export async function handlePaymentWebhook(
  body: any,
  signature: string,
  provider: "stripe" | "razorpay"
): Promise<{ success: boolean; message?: string }> {
  try {
    // Verify webhook signature
    const isValid = await verifyWebhookSignature(body, signature, provider);

    if (!isValid) {
      return {
        success: false,
        message: "Invalid webhook signature",
      };
    }

    let event: PaymentWebhookPayload | null = null;

    if (provider === "stripe") {
      event = parseStripeWebhook(body);
    } else if (provider === "razorpay") {
      event = parseRazorpayWebhook(body);
    }

    if (!event) {
      return {
        success: false,
        message: "Unable to parse webhook",
      };
    }

    if (event.event === "payment.success") {
      const result = await handlePaymentSuccess(event);
      return {
        success: result.success,
        message: result.error || "Payment processed successfully",
      };
    } else if (event.event === "payment.failed") {
      const result = await handlePaymentFailure(event);
      return {
        success: result.success,
        message: result.error || "Payment failure recorded",
      };
    } else if (event.event === "payment.refunded") {
      const result = await handlePaymentRefund(event);
      return {
        success: result.success,
        message: result.error || "Refund processed",
      };
    }

    return { success: false, message: "Unknown event type" };
  } catch (error) {
    console.error("Webhook error:", error);
    return {
      success: false,
      message: `Error processing webhook: ${error instanceof Error ? error.message : "Unknown"}`,
    };
  }
}

/**
 * Parse Stripe webhook payload
 */
function parseStripeWebhook(body: any): PaymentWebhookPayload | null {
  const event = body;

  if (event.type === "charge.succeeded") {
    return {
      event: "payment.success",
      orderId: event.data.object.metadata.orderId,
      userId: event.data.object.metadata.userId,
      courseId: event.data.object.metadata.courseId,
      amount: event.data.object.amount / 100, // Convert from cents
      currency: event.data.object.currency.toUpperCase(),
      paymentMethod: "stripe",
      transactionId: event.data.object.id,
      timestamp: event.created,
    };
  } else if (event.type === "charge.failed") {
    return {
      event: "payment.failed",
      orderId: event.data.object.metadata.orderId,
      userId: event.data.object.metadata.userId,
      courseId: event.data.object.metadata.courseId,
      amount: event.data.object.amount / 100,
      currency: event.data.object.currency.toUpperCase(),
      paymentMethod: "stripe",
      transactionId: event.data.object.id,
      timestamp: event.created,
    };
  } else if (event.type === "charge.refunded") {
    return {
      event: "payment.refunded",
      orderId: event.data.object.metadata.orderId,
      userId: event.data.object.metadata.userId,
      courseId: event.data.object.metadata.courseId,
      amount: event.data.object.amount / 100,
      currency: event.data.object.currency.toUpperCase(),
      paymentMethod: "stripe",
      transactionId: event.data.object.id,
      timestamp: event.created,
    };
  }

  return null;
}

/**
 * Parse Razorpay webhook payload
 */
function parseRazorpayWebhook(body: any): PaymentWebhookPayload | null {
  const event = body;

  if (event.event === "payment.authorized" || event.event === "payment.captured") {
    return {
      event: "payment.success",
      orderId: event.payload.payment.entity.notes.orderId,
      userId: event.payload.payment.entity.notes.userId,
      courseId: event.payload.payment.entity.notes.courseId,
      amount: event.payload.payment.entity.amount / 100, // Convert from paise
      currency: event.payload.payment.entity.currency,
      paymentMethod: "razorpay",
      transactionId: event.payload.payment.entity.id,
      timestamp: event.payload.payment.entity.created_at,
    };
  } else if (event.event === "payment.failed") {
    return {
      event: "payment.failed",
      orderId: event.payload.payment.entity.notes.orderId,
      userId: event.payload.payment.entity.notes.userId,
      courseId: event.payload.payment.entity.notes.courseId,
      amount: event.payload.payment.entity.amount / 100,
      currency: event.payload.payment.entity.currency,
      paymentMethod: "razorpay",
      transactionId: event.payload.payment.entity.id,
      timestamp: event.payload.payment.entity.created_at,
    };
  } else if (event.event === "refund.created") {
    return {
      event: "payment.refunded",
      orderId: event.payload.refund.entity.notes.orderId,
      userId: event.payload.refund.entity.notes.userId,
      courseId: event.payload.refund.entity.notes.courseId,
      amount: event.payload.refund.entity.amount / 100,
      currency: event.payload.refund.entity.currency,
      paymentMethod: "razorpay",
      transactionId: event.payload.refund.entity.id,
      timestamp: event.payload.refund.entity.created_at,
    };
  }

  return null;
}
