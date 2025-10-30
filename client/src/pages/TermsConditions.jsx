import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Terms & Conditions</h1>

      <div className="space-y-4">
        <p>
          <strong>Website:</strong>{" "}
          <a
            href="https://www.aldehankabir.com"
            className="text-blue-600 hover:underline"
          >
            aldehankabir.com
          </a>
        </p>
        <p>
          <strong>Owner:</strong> MD Aldehan Kabir Rhyme
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:info@aldehankabir.com"
            className="text-blue-600 hover:underline"
          >
            info@aldehankabir.com
          </a>
        </p>
        <p>
          <strong>Phone:</strong> +880 186-870-0109
        </p>
      </div>

      <section className="mt-10 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">
            1. Acceptance of Terms
          </h2>
          <p>
            By using this website, you agree to comply with and be bound by
            these Terms & Conditions. If you do not agree, please do not use
            this site.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">
            2. Use of Website
          </h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>You may use the website only for lawful purposes.</li>
            <li>
              You agree not to misuse the website or interfere with its proper
              functioning.
            </li>
            <li>
              You will not attempt to gain unauthorized access to any part of
              the website or related systems.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">
            3. Intellectual Property
          </h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              All content, projects, code samples, designs, and materials on
              this website are the intellectual property of MD Aldehan Kabir
              Rhyme unless stated otherwise.
            </li>
            <li>
              You may not copy, reproduce, modify, or distribute any content
              without prior written permission.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">
            4. Limitation of Liability
          </h2>
          <p>
            The website owner is not responsible for any damages, losses, or
            issues arising from the use or inability to use the website. All
            content is provided "as is".
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">
            5. Third-Party Links
          </h2>
          <p>
            This website may include links to third-party websites (e.g.,
            LinkedIn, GitHub, Facebook). MD Aldehan Kabir Rhyme is not
            responsible for the content, privacy practices, or accuracy of these
            third-party sites.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">
            6. Termination
          </h2>
          <p>
            We reserve the right to terminate or restrict access to the website
            for any user who violates these Terms & Conditions, at our sole
            discretion.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">
            7. Governing Law
          </h2>
          <p>
            These Terms & Conditions are governed by the laws of{" "}
            <strong>Bangladesh</strong>. Any disputes arising will be subject to
            the jurisdiction of courts in Dhaka, Bangladesh.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-900">
            8. Contact Information
          </h2>
          <p>If you have any questions about these Terms & Conditions, you can contact:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@aldehankabir.com"
                className="text-blue-600 hover:underline"
              >
                info@aldehankabir.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong> +880 186-870-0109
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
