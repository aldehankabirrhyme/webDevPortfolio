import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Privacy Policy & Legal Information
      </h1>

      <div className="space-y-2 mb-8">
        <p>
          <strong>Website:</strong>{" "}
          <a
            href="https://www.aldehankabir.com"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            aldehankabir.com
          </a>
        </p>
        <p>
          <strong>Facebook:</strong>{" "}
          <a
            href="https://www.facebook.com/webstudiobyrhyme/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aldehan Kabir - MERN Web Developer
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
        <p>
          <strong>Address:</strong> Sector 11, Road 9, House 27, Uttora, Dhaka
          1200, Bangladesh
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p>
          Welcome to <strong>aldehankabir.com</strong>. This Privacy Policy
          explains how we collect, use, and protect information provided by
          users visiting this website. By using this website, you agree to the
          terms outlined below.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">
          2. Information Collection
        </h2>
        <p>We may collect the following information:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, or other contact details submitted voluntarily through
            contact forms.
          </li>
          <li>
            <strong>Non-Personal Information:</strong> Browser type, IP address,
            pages visited, and time spent on the website.
          </li>
        </ul>
        <p>
          We do <strong>not sell, trade, or rent</strong> your personal
          information to third parties.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">
          3. Use of Information
        </h2>
        <p>Collected information is used for:</p>
        <ul className="list-disc ml-6">
          <li>Responding to inquiries or messages.</li>
          <li>Providing updates about services and portfolio projects.</li>
          <li>Improving the website and user experience.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Cookies</h2>
        <p>
          This website may use cookies to enhance user experience. Cookies are
          small files stored on your device that help analyze website traffic
          and understand user behavior. You can choose to disable cookies in
          your browser settings.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">
          5. Third-Party Services
        </h2>
        <p>Our website may contain links to third-party sites, including:</p>
        <ul className="list-disc ml-6">
          <li>
            <a
              href="https://www.facebook.com/webstudiobyrhyme/"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/yourprofile"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://github.com/yourgithub"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
        </ul>
        <p>
          We are <strong>not responsible</strong> for the privacy practices of
          these third-party websites. We encourage you to review their privacy
          policies.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Security</h2>
        <p>
          We implement reasonable technical and organizational measures to
          protect your information from unauthorized access, disclosure, or
          misuse. However, no system is 100% secure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">
          7. Legal Disclaimer
        </h2>
        <ul className="list-disc ml-6">
          <li>
            All content on this website is for informational purposes only.
          </li>
          <li>
            MD Aldehan Kabir Rhyme is not liable for any direct or indirect
            damages arising from the use of this website.
          </li>
          <li>
            All portfolio projects and code samples are intellectual property of
            the owner unless explicitly stated otherwise.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">8. Governing Law</h2>
        <p>
          This Privacy Policy and website operations are governed by the laws of{" "}
          <strong>Bangladesh</strong>. Any disputes will be subject to the
          jurisdiction of courts in Dhaka, Bangladesh.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mt-6 mb-2">
          9. Contact Information
        </h2>
        <p>For questions or concerns regarding privacy, legal issues, or this website, contact:</p>
        <ul className="list-disc ml-6">
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
          <li>
            <strong>Address:</strong> Sector 11, Road 9, House 27, Uttora, Dhaka
            1200, Bangladesh
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
