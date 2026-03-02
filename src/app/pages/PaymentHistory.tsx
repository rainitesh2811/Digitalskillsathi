import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { supabase } from "@/supabaseclient";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface Order {
  id: string;
  user_id: string;
  course_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_status: string;
  payment_method: string;
  transaction_id: string | null;
  created_at: string;
  updated_at: string;
}

interface CourseInfo {
  [key: string]: string;
}

export function PaymentHistory() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [courseInfo, setCourseInfo] = useState<CourseInfo>({});
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Local course list to map course IDs to titles
  const courseMap: CourseInfo = {
    "1": "Advanced Basic AI",
    "2": "Basic AI",
    "3": "Canva Fundamentals",
    "4": "Canva Advanced",
    "5": "Web Development",
    "6": "Wordpress",
    "7": "Digital Marketing Basics",
    "8": "Digital Marketing Advanced",
  };

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          console.error("Error getting user:", userError);
          return;
        }

        setUserEmail(user.email || null);

        // Fetch orders for the user
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching orders:", error);
          setOrders([]);
          return;
        }

        setOrders(data || []);
        setCourseInfo(courseMap);
      } catch (error) {
        console.error("Error loading payment history:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method.toLowerCase()) {
      case "stripe":
        return "Stripe";
      case "razorpay":
        return "Razorpay";
      default:
        return method;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading payment history…</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="gap-2 text-gray-600 hover:text-gray-900 px-0 hover:bg-transparent"
            onClick={() => {
              window.history.pushState({}, "", "/");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Payment History</h1>
          {userEmail && (
            <p className="text-gray-600 mt-2">
              Logged in as <span className="font-medium">{userEmail}</span>
            </p>
          )}
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600 mb-4">No payment history found.</p>
            <Button
              onClick={() => {
                window.history.pushState({}, "", "/");
                window.dispatchEvent(new PopStateEvent("popstate"));
              }}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Explore Courses
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
                  {/* Course Name */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Course</p>
                    <p className="font-semibold text-gray-900">
                      {courseInfo[String(order.course_id)] || `Course ${order.course_id}`}
                    </p>
                  </div>

                  {/* Amount */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Amount</p>
                    <p className="font-semibold text-gray-900">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.payment_status)}`}>
                      {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                    </span>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                    <p className="font-semibold text-gray-900">
                      {getPaymentMethodLabel(order.payment_method)}
                    </p>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date</p>
                    <p className="font-semibold text-gray-900 text-sm">
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                </div>

                {/* Transaction ID (if available) */}
                {order.transaction_id && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-gray-500">
                      Transaction ID: <span className="font-mono text-gray-700">{order.transaction_id}</span>
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
