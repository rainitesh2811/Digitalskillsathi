import { ChevronLeft } from "lucide-react";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <button
          onClick={() => {
            window.history.pushState({}, "", "/");
            window.dispatchEvent(new Event("navigate"));
          }}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-8"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Home
        </button>

        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Privacy Policy</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Digital Skill Sathi (hereinafter referred to as the “Platform”, “Company”, “we”, “us” or “our”) values the trust placed in it by its users and is committed to safeguarding personal information in accordance with applicable laws, industry standards, and reasonable business practices.
This Privacy Policy outlines the manner in which information is collected, processed, stored, used, and, where legally required, disclosed.
This policy governs the use of all services offered through the Digital Skill Sathi ecosystem, including but not limited to the website, learning management system (LMS), mobile platforms, online courses, live classes, recorded sessions, digital materials (PDFs), and associated communication channels such as WhatsApp or Telegram communities.

            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Personal Data: Personally identifiable information, such as your name, shipping address, email address, and telephone number</li>
              <li>Financial Data: Financial information, such as data related to your payment method</li>
              <li>Data From Third Parties: Information received from third parties regarding your use of our services</li>
              <li>Learning and Usage Information: To improve learning delivery and platform functionality, we may collect course progress, completion status, live class attendance, assignment submissions, activity logs, and general usage analytics.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Use of Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience.
              Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Create and manage your account</li>
              <li>Process your transactions and send related information</li>
              <li>Email you regarding your account or order</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site</li>
              <li>Generate a personal profile about you in order to better understand how our Site is used</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Disclosure of Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We may share information we have collected about you in certain situations:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
              <li>By Law or to Protect Rights</li>
              <li>Third-Party Service Providers</li>
              <li>Business Transfers</li>
              <li>By Your Consent</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Data Security Measures</h2>
            <p className="text-gray-700 leading-relaxed">
              Reasonable technical and organizational safeguards are implemented to protect user information, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
              <li>Secure server infrastructure</li>
              <li>SSL encryption protocols</li>
              <li>Restricted internal access controls</li>
              <li>While the Platform endeavors to protect personal data, users acknowledge that no method of transmission over the internet is entirely secure.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Security of Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We use administrative, technical, and physical security measures to help protect your personal information. While we
              have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our
              efforts, no security measures are perfect or impenetrable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions or comments about this Privacy Policy, please contact us at:<br />
              <strong>Email:</strong> support@digitalskillsathi.com<br />
              <strong>Address:</strong> 4/185 Virat Khand, Gomti Nagar, Lucknow- 226010
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
