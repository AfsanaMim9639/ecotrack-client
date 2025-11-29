import { Link } from 'react-router-dom';
import { FaLeaf, FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaHeart, FaShieldAlt, FaUniversalAccess } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-green-900/95 via-emerald-900/90 to-teal-900/95 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 animate-float-slow">
          <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-green-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-teal-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-28 h-28 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Animated Leaf Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 animate-float">
          <FaLeaf className="text-6xl text-white transform rotate-45" />
        </div>
        <div className="absolute top-40 right-1/3 animate-float-delayed">
          <FaLeaf className="text-5xl text-white transform -rotate-12" />
        </div>
        <div className="absolute bottom-32 left-1/2 animate-float-slow">
          <FaLeaf className="text-7xl text-white transform rotate-90" />
        </div>
        <div className="absolute bottom-20 right-1/4 animate-float">
          <FaLeaf className="text-4xl text-white transform -rotate-45" />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <FaLeaf className="animate-pulse text-green-300" />
              <span>EcoTrack</span>
            </div>
            <p className="text-green-50/90 text-sm leading-relaxed">
              Empowering individuals to make a positive environmental impact through sustainable challenges and community action.
            </p>
            <div className="flex items-center gap-2 text-green-100/80 text-sm">
              <FaHeart className="text-red-400 animate-pulse" />
              <span>Building a greener future together</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-green-50">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link 
                to="/about" 
                className="text-green-100/80 hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-green-300 rounded-full group-hover:w-2 transition-all"></span>
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-green-100/80 hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-green-300 rounded-full group-hover:w-2 transition-all"></span>
                Contact
              </Link>
              <Link 
                to="/challenges" 
                className="text-green-100/80 hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-green-300 rounded-full group-hover:w-2 transition-all"></span>
                Challenges
              </Link>
              <Link 
                to="/leaderboard" 
                className="text-green-100/80 hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-green-300 rounded-full group-hover:w-2 transition-all"></span>
                Leaderboard
              </Link>
            </div>
          </div>

          {/* Social Media & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-green-50">Connect With Us</h3>
            <p className="text-green-100/80 text-sm">
              Follow us on social media for daily eco-tips and updates!
            </p>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-800/60 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg border border-green-700/50"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-800/60 hover:bg-black rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg border border-green-700/50"
                aria-label="Follow us on X (Twitter)"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-800/60 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg border border-green-700/50"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-800/60 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg border border-green-700/50"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-800/60 hover:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg border border-green-700/50"
              >
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-700/50 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-green-100/70">
          <div className="flex items-center gap-2">
            <span>© {currentYear} EcoTrack.</span>
            <span>All rights reserved.</span>
          </div>

          {/* Accessibility & Privacy */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/privacy" 
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <FaShieldAlt className="text-xs" />
              <span>Privacy Policy</span>
            </Link>
            <span className="text-green-700/60">|</span>
            <Link 
              to="/accessibility" 
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <FaUniversalAccess className="text-xs" />
              <span>Accessibility</span>
            </Link>
            <span className="text-green-700/60">|</span>
            <Link 
              to="/terms" 
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Additional Accessibility Note */}
        <div className="mt-6 pt-6 border-t border-green-700/30 text-center">
          <p className="text-xs text-green-200/70 leading-relaxed max-w-3xl mx-auto">
            <FaUniversalAccess className="inline mr-1" />
            We're committed to making EcoTrack accessible to everyone. If you experience any accessibility issues, 
            please contact us at <a href="mailto:accessibility@ecotrack.com" className="underline hover:text-white">accessibility@ecotrack.com</a>
          </p>
        </div>
      </div>

      {/* Wave Animation at Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 animate-wave"></div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-30px) translateX(20px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(-5deg);
          }
        }

        @keyframes wave {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite 1s;
        }

        .animate-wave {
          background-size: 200% 200%;
          animation: wave 3s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;