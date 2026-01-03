import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email Us",
      content: "support@ecotrack.com",
      link: "mailto:support@ecotrack.com"
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Visit Us",
      content: "123 Green Street, Eco City, EC 12345",
      link: "#"
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, name: "Facebook", link: "#" },
    { icon: <FaTwitter />, name: "Twitter", link: "#" },
    { icon: <FaInstagram />, name: "Instagram", link: "#" },
    { icon: <FaLinkedin />, name: "LinkedIn", link: "#" }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-gradient-to-r from-green-900 to-green-700' : 'bg-gradient-to-r from-green-600 to-green-500'} text-white py-20`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
              Have questions or feedback? We'd love to hear from you. Our team is here to help!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.link}
              className={`${isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center block`}
            >
              <div className={`${isDark ? 'text-green-400' : 'text-green-600'} mb-4 flex justify-center`}>
                {info.icon}
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {info.title}
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {info.content}
              </p>
            </a>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-8 rounded-xl shadow-lg`}>
            <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-green-500 transition`}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-green-500 transition`}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-green-500 transition`}
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none`}
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className={`w-full ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white py-4 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl`}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="space-y-8">
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-8 rounded-xl shadow-lg`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Business Hours
              </h3>
              <div className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-8 rounded-xl shadow-lg`}>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Follow Us
              </h3>
              <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Stay connected with us on social media for updates, tips, and community highlights.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className={`${isDark ? 'bg-gray-700 hover:bg-green-600' : 'bg-gray-100 hover:bg-green-600'} w-12 h-12 rounded-lg flex items-center justify-center text-xl transition hover:text-white`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className={`${isDark ? 'bg-gradient-to-br from-green-900 to-green-700' : 'bg-gradient-to-br from-green-600 to-green-500'} p-8 rounded-xl shadow-lg text-white`}>
              <h3 className="text-2xl font-bold mb-4">
                Need Immediate Help?
              </h3>
              <p className="mb-6 opacity-90">
                Check out our Help Center for instant answers to common questions.
              </p>
              <a
                href="/help"
                className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Visit Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;