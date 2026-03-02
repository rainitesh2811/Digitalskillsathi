// Example Backend Implementation (Node.js/Express)
// Save this as your backend API endpoint to handle payment processing

import crypto from "crypto";
import Razorpay from "razorpay";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// ============================================
// STRIPE ENDPOINTS
// ============================================

/**
 * POST /api/create-payment-intent
 * Create a Stripe payment intent
 */
export async function createPaymentIntent(req: any, res: any) {
  const { orderId, userId, courseId, amount, courseName } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "inr",
      metadata: {
        orderId,
        userId,
        courseId,
      },
      description: `Course Purchase: ${courseName}`,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
}

/**
 * POST /api/webhook/stripe
 * Handle Stripe webhook events
 */
export async function handleStripeWebhook(req: any, res: any) {
  const signature = req.headers["stripe-signature"];
  const body = req.rawBody; // Raw body, not parsed

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      // Handle successful payment (already handled by client-side webhook)
      console.log("Payment succeeded:", paymentIntent.id);
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object;
      console.log("Payment failed:", paymentIntent.id);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(400).json({ error: "Webhook signature verification failed" });
  }
}

// ============================================
// RAZORPAY ENDPOINTS
// ============================================

/**
 * POST /api/create-razorpay-order
 * Create a Razorpay order
 */
export async function createRazorpayOrder(req: any, res: any) {
  const { orderId, userId, courseId, amount, courseName, userEmail, userName } =
    req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount, // Already in paise
      currency: "INR",
      receipt: orderId,
      notes: {
        orderId,
        userId,
        courseId,
        courseName,
      },
    });

    res.json({
      razorpayOrderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Razorpay error:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
}

/**
 * POST /api/webhook/razorpay
 * Handle Razorpay webhook events
 */
export async function handleRazorpayWebhook(req: any, res: any) {
  const signature = req.headers["x-razorpay-signature"];
  const body = JSON.stringify(req.body);

  try {
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (generated_signature !== signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    const event = req.body;

    if (event.event === "payment.authorized" || event.event === "payment.captured") {
      console.log("Payment captured:", event.payload.payment.entity.id);
      // Handle successful payment
    } else if (event.event === "payment.failed") {
      console.log("Payment failed:", event.payload.payment.entity.id);
    } else if (event.event === "refund.created") {
      console.log("Refund created:", event.payload.refund.entity.id);
    }

    res.json({ status: "ok" });
  } catch (error) {
    console.error("Razorpay webhook error:", error);
    res.status(400).json({ error: "Webhook verification failed" });
  }
}

/**
 * POST /api/refund-payment
 * Process a refund for a failed or unwanted purchase
 */
export async function refundPayment(req: any, res: any) {
  const { orderId, transactionId, provider, amount } = req.body;

  try {
    if (provider === "stripe") {
      await stripe.refunds.create({
        payment_intent: transactionId,
      });
    } else if (provider === "razorpay") {
      await razorpay.payments.refund(transactionId, {
        amount: Math.round(amount * 100), // Convert to paise
      });
    }

    res.json({ success: true, message: "Refund processed" });
  } catch (error) {
    console.error("Refund error:", error);
    res.status(500).json({ error: "Failed to process refund" });
  }
}
