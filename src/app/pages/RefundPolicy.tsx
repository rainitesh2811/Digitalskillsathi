import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";

export function RefundPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <button
          onClick={() => {
            window.history.pushState({}, "", "/");
            window.dispatchEvent(new PopStateEvent("popstate"));
          }}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-8"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Home
        </button>

        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Refund & Exchange Policy
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              This Refund and Cancellation Policy governs all purchases made on the Digital Skill Sathi platform and must be read in conjunction with the Terms & Conditions and Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. REFUND POLICY</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Digital Skill Sathi follows a strict no-refund policy for all courses, programs, and services, except in cases where a user has enrolled under a limited-time <strong>“100% Feesback Offer”</strong>.
            </p>
            
            <h3 className="text-xl font-semibold mb-2 text-gray-800">1.1 Feesback Offer Eligibility</h3>
            <p className="text-gray-700 mb-2">Refunds shall be considered only for users who:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Enrolled under the officially declared 100% Feesback Offer (valid from 14th February 2026 onwards).</li>
              <li>Have <strong>genuinely completed the full course</strong>, including all mandatory lessons, assignments, and projects.</li>
            </ul>
            <p className="text-sm bg-gray-50 p-3 border-l-4 border-orange-500 text-gray-600 italic">
              Outside of the above offer, no refund shall be applicable due to dissatisfaction, lack of time, change of interest, or inability to continue.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">1.2 Partial Refund (Exceptional Circumstances)</h3>
            <p className="text-gray-700 mb-2">In rare cases where the administrative team verifies a genuine and unavoidable reason for being unable to continue, the Company may process a partial refund of <strong>up to 60%</strong>.</p>
            <p className="text-gray-700">The remaining 40% is non-refundable to cover:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Applicable taxes</li>
              <li>Operational expenses</li>
              <li>Payment gateway and transaction charges</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. EXCHANGE POLICY</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              “Exchange” refers to the replacement of one course with another available on the Platform.
            </p>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">2.1 Exchange Eligibility</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>The request is raised <strong>before accessing or consuming</strong> any course content.</li>
              <li>Exchange requests must be raised within <strong>7 days</strong> from the date of enrollment.</li>
              <li>The course has not been started, viewed, or downloaded in any form.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3. REFUND PROCESS</h2>
            <p className="text-gray-700 mb-4">To initiate a request (Feesback Offer only):</p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Submit a request via the <strong>Email</strong> available on the Contact us page.</li>
              <li>A representative will contact you on your registered mobile number.</li>
              <li>Any attempt to falsely represent completion or manipulate progress will result in immediate rejection and <strong>permanent account suspension</strong>.</li>
            </ol>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">4. MODE OF REFUND</h2>
            <p className="text-gray-700 leading-relaxed">
              Approved refunds shall be credited only to the <strong>original payment source</strong> used at the time of enrollment. We are not responsible for delays caused by banks or payment gateways (typically 5-10 business days).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">5. FINAL AUTHORITY</h2>
            <p className="text-gray-700 leading-relaxed">
              Digital Skill Sathi reserves the absolute right to approve or reject any refund/exchange request and modify offers without prior notice. 
              <strong> All decisions made by the Company shall be final and binding.</strong>
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Contact Support</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>Email:</strong> support@digitalskillsathi.com<br />
              <strong>Phone:</strong> +91 9546429362<br />
              <strong>Address:</strong> 4/185 Virat Khand, Gomti Nagar, Lucknow- 226010
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}