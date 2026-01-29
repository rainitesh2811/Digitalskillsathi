import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";

export function TermsOfService() {
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
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Terms of Service</h1>
<section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900"> Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              This website and associated services are operated by Digital Skill Sathi. Throughout this document, the terms “we”, “us”, and “our” refer to Digital Skill Sathi.
Digital Skill Sathi provides access to educational content, tools, and services through its website and related platforms, subject to your acceptance of the terms, conditions, policies, and notices stated herein.
By accessing the website, enrolling in any course, or using any service offered by the Platform, you acknowledge that you are engaging with our services and agree to be bound by these Terms & Conditions, including any additional policies referenced or made available on the Platform.
These Terms apply to all users of the Platform, including but not limited to visitors, registered users, enrolled learners, and contributors. If you do not agree with these Terms, you must not access or use the Platform or its services.
Digital Skill Sathi reserves the right to modify, update, or replace any part of these Terms by publishing changes on the website. Continued use of the Platform constitutes acceptance of such changes.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">SECTION 1 – ELIGIBILITY & ONLINE USE</h2>
            <p className="text-gray-700 leading-relaxed">
              By agreeing to these Terms, you confirm that you are legally eligible to use the Platform under applicable Indian laws. Users below the age of majority may access the Platform only under parental or guardian supervision.
You agree not to use the Platform or its content for any unlawful, unauthorized, or prohibited purpose, including violation of intellectual property or cybersecurity laws.
Any violation of these Terms may result in immediate suspension or termination of access.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">SECTION 2 – GENERAL CONDITIONS</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Digital Skill Sathi reserves the right to refuse service to any user at its sole discretion.
User-generated content (excluding payment information) may be transmitted across networks to enable platform functionality. Payment-related data is always processed through encrypted and secure channels.
Users shall not copy, reproduce, distribute, resell, or exploit any part of the Platform or its services without prior written permission.
Headings are provided for reference only and do not affect interpretation of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">SECTION 3 – INFORMATION ACCURACY</h2>
            <p className="text-gray-700 leading-relaxed">
              Content provided on the Platform is for general educational purposes only. While reasonable efforts are made to maintain accuracy, completeness and timeliness are not guaranteed.
Users are advised to independently evaluate information before relying upon it. The Platform may modify content at any time without obligation to update previously published material.

            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">SECTION 4 – SERVICE & PRICE MODIFICATIONS</h2>
            <p className="text-gray-700 leading-relaxed">
              Course pricing, availability, and features are subject to change without prior notice.
Digital Skill Sathi reserves the right to modify, suspend, or discontinue any service or content, temporarily or permanently, without liability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">SECTION 5 – COURSES & SERVICES</h2>
            <p className="text-gray-700 leading-relaxed">
              Courses are delivered online and may include recorded videos, live sessions, downloadable materials, and assessments.
Course descriptions, access terms, and availability may change at the discretion of the Platform. Digital Skill Sathi does not guarantee that course content will meet individual expectations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">SECTION 6 – BILLING & ACCOUNT INFORMATION</h2>
            <p className="text-gray-700 leading-relaxed">
              The Platform may refuse or cancel any order in cases of suspected misuse, duplication, or policy violation.
Users agree to provide accurate and updated billing and account information. Failure to do so may result in transaction issues or service interruption.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">SECTION 7 – OPTIONAL & THIRD-PARTY TOOLS</h2>
            <p className="text-gray-700 leading-relaxed">
              The Platform may provide access to third-party tools or services on an “as is” basis without warranties or endorsements.
Digital Skill Sathi does not control or assume responsibility for third-party tools, and use of such services is entirely at the user’s risk.

            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">SECTION 8 – USER CONDUCT & ACADEMIC INTEGRITY</h2>
            <p className="text-gray-700 leading-relaxed">
              Users must maintain ethical conduct during learning activities.
Unfair practices such as plagiarism, copying assignments, or cheating may result in corrective actions, including denial of certification, additional evaluations, or permanent account suspension.

            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">SECTION 9 – PERSONAL INFORMATION</h2>
            <p className="text-gray-700 leading-relaxed">
              Collection and use of personal information are governed by the Platform’s Privacy Policy.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">SECTION 10 – CONTACT US</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:<br />
              <strong>Email:</strong> support@digitalskillsathi.com<br />
              <strong>Address:</strong> 4/185 Virat Khand, Gomti Nagar, Lucknow- 226010
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
