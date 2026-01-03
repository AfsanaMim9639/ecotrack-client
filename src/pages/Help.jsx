import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSearch, FaQuestionCircle, FaBook, FaVideo, FaHeadset, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Help = () => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    {
      icon: <FaQuestionCircle className="text-3xl" />,
      title: "Getting Started",
      description: "Learn the basics of EcoTrack",
      articles: 12
    },
    {
      icon: <FaBook className="text-3xl" />,
      title: "Activities & Tracking",
      description: "How to log and track your eco-activities",
      articles: 15
    },
    {
      icon: <FaVideo className="text-3xl" />,
      title: "Challenges",
      description: "Join and complete eco-challenges",
      articles: 8
    },
    {
      icon: <FaHeadset className="text-3xl" />,
      title: "Account & Settings",
      description: "Manage your profile and preferences",
      articles: 10
    }
  ];

  const faqs = [
    {
      question: "How do I log my first eco-activity?",
      answer: "To log your first activity, navigate to the 'My Activities' page and click the 'Log New Activity' button. Select the type of activity (recycling, planting trees, reducing energy, etc.), enter the details, and submit. You'll instantly see your impact calculated!"
    },
    {
      question: "How is my environmental impact calculated?",
      answer: "We use scientifically-backed formulas to calculate your impact. For example, recycling plastic saves approximately 0.5kg of CO₂ per kg recycled, and planting a tree absorbs about 21kg of CO₂ per year. All our calculations are based on peer-reviewed environmental research."
    },
    {
      question: "What are challenges and how do I participate?",
      answer: "Challenges are community-driven goals to encourage sustainable actions. Browse available challenges on the Challenges page, click 'Join Challenge', and start completing the required activities. Track your progress in real-time and compete with other participants!"
    },
    {
      question: "How does the leaderboard work?",
      answer: "The leaderboard ranks users based on their total environmental impact points. Points are earned by logging activities, completing challenges, and maintaining streaks. You can view weekly, monthly, or all-time rankings."
    },
    {
      question: "Can I edit or delete my logged activities?",
      answer: "Yes! Go to 'My Activities', find the activity you want to modify, and click the edit or delete icon. Note that deleting an activity will adjust your impact statistics accordingly."
    },
    {
      question: "Is EcoTrack free to use?",
      answer: "Yes, EcoTrack is completely free to use. We believe everyone should have access to tools that help them make a positive environmental impact. We may introduce premium features in the future, but core functionality will always remain free."
    },
    {
      question: "How can I connect with other eco-conscious users?",
      answer: "Visit the Community page to see recent activities from other users, join discussions, and share tips. You can also participate in group challenges and connect with people who share your environmental values."
    },
    {
      question: "What should I do if I find a bug or have a suggestion?",
      answer: "We love feedback! Use the Contact page to report bugs or share suggestions. You can also use the feedback button at the bottom of any page. We review all submissions and work on improvements regularly."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-gradient-to-r from-green-900 to-green-700' : 'bg-gradient-to-r from-green-600 to-green-500'} text-white py-20`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Help & Support</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90 mb-8">
              Find answers to your questions and learn how to make the most of EcoTrack
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <FaSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'} text-xl`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for help articles..."
                  className={`w-full pl-12 pr-4 py-4 rounded-lg ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-white/50 text-lg`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Browse by Category
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
            >
              <div className={`${isDark ? 'text-green-400' : 'text-green-600'} mb-4`}>
                {category.icon}
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {category.title}
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                {category.description}
              </p>
              <span className={`text-sm ${isDark ? 'text-green-400' : 'text-green-600'} font-medium`}>
                {category.articles} articles
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} py-16`}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-lg overflow-hidden transition-all duration-300`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className={`w-full px-6 py-4 flex items-center justify-between ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition text-left`}
                >
                  <span className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <FaChevronUp className={`${isDark ? 'text-green-400' : 'text-green-600'} text-xl flex-shrink-0 ml-4`} />
                  ) : (
                    <FaChevronDown className={`${isDark ? 'text-gray-500' : 'text-gray-400'} text-xl flex-shrink-0 ml-4`} />
                  )}
                </button>
                {openFaq === index && (
                  <div className={`px-6 py-4 border-t ${isDark ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-700'}`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className={`${isDark ? 'bg-gradient-to-br from-green-900 to-green-700' : 'bg-gradient-to-br from-green-600 to-green-500'} rounded-2xl p-12 text-white text-center`}>
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-xl mb-8 opacity-90">
            Can't find what you're looking for? Our support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition inline-block"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@ecotrack.com"
              className="bg-green-800 hover:bg-green-900 px-8 py-4 rounded-lg font-bold text-lg transition inline-block"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} py-12`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Documentation
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Detailed guides and tutorials
              </p>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Community Forum
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Connect with other users
              </p>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Video Tutorials
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Watch step-by-step guides
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;