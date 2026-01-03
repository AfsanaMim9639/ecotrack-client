import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaShieldAlt, FaFileContract } from 'react-icons/fa';

const PrivacyTerms = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('privacy');

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-gradient-to-r from-green-900 to-green-700' : 'bg-gradient-to-r from-green-600 to-green-500'} text-white py-20`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Legal Information</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
              Your privacy and security are our top priorities
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-5xl mx-auto px-6 -mt-6">
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg ${
              activeTab === 'privacy'
                ? isDark
                  ? 'bg-gray-800 text-green-400'
                  : 'bg-white text-green-600'
                : isDark
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-750'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <FaShieldAlt />
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg ${
              activeTab === 'terms'
                ? isDark
                  ? 'bg-gray-800 text-green-400'
                  : 'bg-white text-green-600'
                : isDark
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-750'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <FaFileContract />
            Terms of Service
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 md:p-12`}>
          {activeTab === 'privacy' ? (
            <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-8`}>
              <div>
                <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Privacy Policy
                </h2>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                  Last Updated: January 1, 2024
                </p>
              </div>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  1. Information We Collect
                </h3>
                <p className="mb-4">
                  At EcoTrack, we collect information to provide you with the best possible experience:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account Information:</strong> Name, email address, and profile details you provide during registration</li>
                  <li><strong>Activity Data:</strong> Information about your eco-friendly activities, challenges, and environmental impact</li>
                  <li><strong>Usage Data:</strong> How you interact with our platform, including pages visited and features used</li>
                  <li><strong>Device Information:</strong> Browser type, IP address, and device identifiers for security purposes</li>
                </ul>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  2. How We Use Your Information
                </h3>
                <p className="mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and maintain our services</li>
                  <li>Calculate and display your environmental impact</li>
                  <li>Enable participation in challenges and community features</li>
                  <li>Send you important updates and notifications</li>
                  <li>Improve our platform and develop new features</li>
                  <li>Ensure security and prevent fraud</li>
                </ul>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  3. Information Sharing
                </h3>
                <p className="mb-4">
                  We respect your privacy and do not sell your personal information. We may share your information only in these circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
                  <li><strong>Public Profile Data:</strong> Username and activities you choose to make public</li>
                  <li><strong>Service Providers:</strong> Trusted partners who help us operate our platform</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                </ul>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  4. Data Security
                </h3>
                <p>
                  We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  5. Your Rights and Choices
                </h3>
                <p className="mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and review your personal information</li>
                  <li>Update or correct your data</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Control your privacy settings</li>
                  <li>Request a copy of your data</li>
                </ul>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  6. Cookies and Tracking
                </h3>
                <p>
                  We use cookies and similar technologies to enhance your experience, analyze usage patterns, and remember your preferences. You can control cookie settings through your browser, though some features may not function properly if cookies are disabled.
                </p>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  7. Children's Privacy
                </h3>
                <p>
                  EcoTrack is not intended for children under 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.
                </p>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  8. Changes to This Policy
                </h3>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through our platform. Your continued use of EcoTrack after changes indicates acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  9. Contact Us
                </h3>
                <p>
                  If you have questions about this Privacy Policy or how we handle your data, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="font-medium">Email: privacy@ecotrack.com</p>
                  <p className="font-medium">Address: 123 Green Street, Eco City, EC 12345</p>
                </div>
              </section>
            </div>
          ) : (
            <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-8`}>
              <div>
                <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Terms of Service
                </h2>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                  Last Updated: January 1, 2024
                </p>
              </div>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  1. Acceptance of Terms
                </h3>
                <p>
                  By accessing and using EcoTrack, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
                </p>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  2. User Accounts
                </h3>
                <p className="mb-4">
                  To use certain features of EcoTrack, you must create an account:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You must be at least 13 years old to create an account</li>
                  <li>One person or entity may maintain only one account</li>
                  <li>You are responsible for all activities under your account</li>
                </ul>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  3. User Conduct
                </h3>
                <p className="mb-4">
                  You agree to use EcoTrack responsibly and not to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on others' intellectual property rights</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Post false or misleading information</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use automated systems to access the platform</li>
                  <li>Engage in any activity that disrupts the service</li>
                </ul>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  4. Content and Intellectual Property
                </h3>
                <p className="mb-4">
                  <strong>Your Content:</strong> You retain ownership of content you post, but grant us a license to use, display, and distribute it on our platform.
                </p>
                <p>
                  <strong>Our Content:</strong> All content, features, and functionality of EcoTrack are owned by us and protected by intellectual property laws. You may not copy, modify, or distribute our content without permission.
                </p>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  5. Environmental Impact Calculations
                </h3>
                <p>
                  While we strive for accuracy in our environmental impact calculations, these are estimates based on scientific research and may vary. We do not guarantee the absolute precision of these calculations and they should be used as general guidance.
                </p>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  6. Service Availability
                </h3>
                <p>
                  We strive to keep EcoTrack available 24/7, but we do not guarantee uninterrupted access. We may modify, suspend, or discontinue any part of the service at any time with or without notice.
                </p>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  7. Disclaimer of Warranties
                </h3>
                <p>
                  EcoTrack is provided "as is" without warranties of any kind. We do not warrant that the service will be error-free, secure, or meet your specific requirements.
                </p>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  8. Limitation of Liability
                </h3>
                <p>
                  To the maximum extent permitted by law, EcoTrack shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service.
                </p>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  9. Termination
                </h3>
                <p className="mb-4">
                  We reserve the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Suspend or terminate your account for violation of these terms</li>
                  <li>Remove content that violates our policies</li>
                  <li>Take legal action if necessary</li>
                </ul>
                <p className="mt-4">
                  You may terminate your account at any time through your account settings.
                </p>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  10. Changes to Terms
                </h3>
                <p>
                  We may modify these Terms of Service at any time. We will notify users of material changes. Continued use of EcoTrack after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  11. Governing Law
                </h3>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which EcoTrack operates, without regard to conflict of law provisions.
                </p>
              </section>

              <section>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  12. Contact Information
                </h3>
                <p>
                  For questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="font-medium">Email: legal@ecotrack.com</p>
                  <p className="font-medium">Address: 123 Green Street, Eco City, EC 12345</p>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivacyTerms;