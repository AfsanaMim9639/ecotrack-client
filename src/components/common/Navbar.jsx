import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FaLeaf, FaUser, FaSignOutAlt, FaBars, FaTimes, FaChevronDown, FaSun, FaMoon, FaChartBar, FaUsers, FaBookOpen, FaHome, FaTrophy, FaTasks, FaInfoCircle, FaEnvelope, FaQuestionCircle, FaShieldAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  
  const [, forceUpdate] = useState({});
  
  useEffect(() => {
    forceUpdate({});
  }, [isDark]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      setProfileDropdownOpen(false);
      setMobileMenuOpen(false);
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const getUserInitials = () => {
    if (currentUser?.name) {
      return currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return currentUser?.email?.[0]?.toUpperCase() || 'U';
  };

  const navClasses = `${isDark ? 'bg-gray-800 shadow-gray-900/50' : 'bg-white shadow-md'} sticky top-0 z-50 transition-all duration-300`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Animated Logo */}
          <Link to="/" className={`flex items-center gap-2 text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'} group`}>
            <div className="relative">
              <FaLeaf className="transform group-hover:rotate-12 transition-transform duration-300 group-hover:scale-110" />
              <span className={`absolute -top-1 -right-1 w-2 h-2 ${isDark ? 'bg-green-500' : 'bg-green-400'} rounded-full animate-ping opacity-75`}></span>
              <span className={`absolute -bottom-1 -left-1 w-1.5 h-1.5 ${isDark ? 'bg-green-400' : 'bg-green-500'} rounded-full animate-pulse`}></span>
            </div>
            <span className={`relative ${isDark ? 'group-hover:text-green-300' : 'group-hover:text-green-700'} transition-colors`}>
              EcoTrack
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${isDark ? 'bg-green-400' : 'bg-green-600'} group-hover:w-full transition-all duration-300`}></span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`${isDark ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition font-medium`}>
              Home
            </Link>
            <Link to="/challenges" className={`${isDark ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition font-medium`}>
              Challenges
            </Link>
            <Link to="/leaderboard" className={`${isDark ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition font-medium`}>
              Leaderboard
            </Link>
            {currentUser && (
              <>
                <Link to="/my-activities" className={`${isDark ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition font-medium`}>
                  My Activities
                </Link>
                <Link to="/impact" className={`${isDark ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition font-medium`}>
                  Impact
                </Link>
                <Link to="/community" className={`${isDark ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition font-medium`}>
                  Community
                </Link>
              </>
            )}
            <Link to="/resources" className={`${isDark ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition font-medium`}>
              Resources
            </Link>
            
            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`${isDark ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition font-medium flex items-center gap-1`}
              >
                More
                <FaChevronDown className={`text-xs transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setMoreDropdownOpen(false)}
                  ></div>
                  
                  <div className={`absolute right-0 mt-2 w-48 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg shadow-xl border py-2 z-20 animate-fadeIn`}>
                    <Link
                      to="/about"
                      onClick={() => setMoreDropdownOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 ${isDark ? 'hover:bg-green-900/20 text-gray-300' : 'hover:bg-green-50 text-gray-700'} transition`}
                    >
                      <FaInfoCircle className={`${isDark ? 'text-green-400' : 'text-green-600'}`} />
                      <span className="font-medium">About</span>
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setMoreDropdownOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 ${isDark ? 'hover:bg-green-900/20 text-gray-300' : 'hover:bg-green-50 text-gray-700'} transition`}
                    >
                      <FaEnvelope className={`${isDark ? 'text-green-400' : 'text-green-600'}`} />
                      <span className="font-medium">Contact</span>
                    </Link>
                    <Link
                      to="/help"
                      onClick={() => setMoreDropdownOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 ${isDark ? 'hover:bg-green-900/20 text-gray-300' : 'hover:bg-green-50 text-gray-700'} transition`}
                    >
                      <FaQuestionCircle className={`${isDark ? 'text-green-400' : 'text-green-600'}`} />
                      <span className="font-medium">Help</span>
                    </Link>
                    <Link
                      to="/privacy"
                      onClick={() => setMoreDropdownOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 ${isDark ? 'hover:bg-green-900/20 text-gray-300' : 'hover:bg-green-50 text-gray-700'} transition`}
                    >
                      <FaShieldAlt className={`${isDark ? 'text-green-400' : 'text-green-600'}`} />
                      <span className="font-medium">Privacy</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Auth Section + Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className={`flex items-center gap-3 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} px-3 py-2 rounded-lg transition`}
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${isDark ? 'from-green-500 to-green-700' : 'from-green-400 to-green-600'} rounded-full flex items-center justify-center text-white font-bold shadow-md`}>
                    {getUserInitials()}
                  </div>
                  <div className="text-left">
                    <div className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {currentUser.name || 'User'}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {currentUser.email}
                    </div>
                  </div>
                  <FaChevronDown className={`${isDark ? 'text-gray-500' : 'text-gray-400'} transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setProfileDropdownOpen(false)}
                    ></div>
                    
                    <div className={`absolute right-0 mt-2 w-56 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg shadow-xl border py-2 z-20 animate-fadeIn`}>
                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 ${isDark ? 'hover:bg-green-900/20 text-gray-300' : 'hover:bg-green-50 text-gray-700'} transition`}
                      >
                        <FaUser className={`${isDark ? 'text-green-400' : 'text-green-600'}`} />
                        <span className="font-medium">Profile</span>
                      </Link>
                      <Link
                        to="/my-activities"
                        onClick={() => setProfileDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 ${isDark ? 'hover:bg-green-900/20 text-gray-300' : 'hover:bg-green-50 text-gray-700'} transition`}
                      >
                        <FaLeaf className={`${isDark ? 'text-green-400' : 'text-green-600'}`} />
                        <span className="font-medium">My Activities</span>
                      </Link>
                      <Link
                        to="/impact"
                        onClick={() => setProfileDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 ${isDark ? 'hover:bg-green-900/20 text-gray-300' : 'hover:bg-green-50 text-gray-700'} transition`}
                      >
                        <FaChartBar className={`${isDark ? 'text-green-400' : 'text-green-600'}`} />
                        <span className="font-medium">Impact Dashboard</span>
                      </Link>
                      <hr className={`my-2 ${isDark ? 'border-gray-700' : 'border-gray-100'}`} />
                      <button
                        onClick={handleLogout}
                        className={`flex items-center gap-3 px-4 py-3 ${isDark ? 'hover:bg-red-900/20 text-red-400' : 'hover:bg-red-50 text-red-600'} transition w-full text-left`}
                      >
                        <FaSignOutAlt />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`${isDark ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition font-medium`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`${isDark ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white px-5 py-2.5 rounded-lg transition shadow-md hover:shadow-lg font-medium`}
                >
                  Sign Up
                </Link>
              </>
            )}

            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 group`}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <FaSun className="w-5 h-5 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <FaMoon className="w-5 h-5 text-indigo-600 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden ${isDark ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'} transition text-2xl`}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-4 pb-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-4 animate-slideDown`}>
            <div className="flex flex-col gap-3">
              <button
                onClick={toggleTheme}
                className={`flex items-center justify-between px-4 py-3 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition font-medium`}
              >
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </span>
                {isDark ? (
                  <FaSun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <FaMoon className="w-5 h-5 text-indigo-600" />
                )}
              </button>

              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className={`${isDark ? 'text-gray-300 hover:text-green-400 hover:bg-gray-700' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'} px-4 py-3 rounded-lg transition font-medium flex items-center gap-2`}
              >
                <FaHome />
                Home
              </Link>
              <Link 
                to="/challenges" 
                onClick={closeMobileMenu}
                className={`${isDark ? 'text-gray-300 hover:text-green-400 hover:bg-gray-700' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'} px-4 py-3 rounded-lg transition font-medium flex items-center gap-2`}
              >
                <FaTrophy />
                Challenges
              </Link>
              <Link 
                to="/leaderboard" 
                onClick={closeMobileMenu}
                className={`${isDark ? 'text-gray-300 hover:text-green-400 hover:bg-gray-700' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'} px-4 py-3 rounded-lg transition font-medium flex items-center gap-2`}
              >
                <FaChartBar />
                Leaderboard
              </Link>
              <Link 
                to="/resources" 
                onClick={closeMobileMenu}
                className={`${isDark ? 'text-gray-300 hover:text-green-400 hover:bg-gray-700' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'} px-4 py-3 rounded-lg transition font-medium flex items-center gap-2`}
              >
                <FaBookOpen />
                Resources
              </Link>
              <Link 
                to="/about" 
                onClick={closeMobileMenu}
                className={`${isDark ? 'text-gray-300 hover:text-green-400 hover:bg-gray-700' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'} px-4 py-3 rounded-lg transition font-medium flex items-center gap-2`}
              >
                <FaInfoCircle />
                About
              </Link>
              <Link 
                to="/contact" 
                onClick={closeMobileMenu}
                className={`${isDark ? 'text-gray-300 hover:text-green-400 hover:bg-gray-700' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'} px-4 py-3 rounded-lg transition font-medium flex items-center gap-2`}
              >
                <FaEnvelope />
                Contact
              </Link>
              <Link 
                to="/help" 
                onClick={closeMobileMenu}
                className={`${isDark ? 'text-gray-300 hover:text-green-400 hover:bg-gray-700' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'} px-4 py-3 rounded-lg transition font-medium flex items-center gap-2`}
              >
                <FaQuestionCircle />
                Help
              </Link>

              {currentUser ? (
                <>
                  <Link 
                    to="/my-activities" 
                    onClick={closeMobileMenu}
                    className={`${isDark ? 'text-gray-300 hover:text-green-400 hover:bg-gray-700' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'} px-4 py-3 rounded-lg transition font-medium flex items-center gap-2`}
                  >
                    <FaTasks />
                    My Activities
                  </Link>
                  <Link 
                    to="/impact" 
                    onClick={closeMobileMenu}
                    className={`${isDark ? 'text-gray-300 hover:text-green-400 hover:bg-gray-700' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'} px-4 py-3 rounded-lg transition font-medium flex items-center gap-2`}
                  >
                    <FaChartBar />
                    Impact Dashboard
                  </Link>
                  <Link 
                    to="/community" 
                    onClick={closeMobileMenu}
                    className={`${isDark ? 'text-gray-300 hover:text-green-400 hover:bg-gray-700' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'} px-4 py-3 rounded-lg transition font-medium flex items-center gap-2`}
                  >
                    <FaUsers />
                    Community
                  </Link>
                  <Link 
                    to="/profile" 
                    onClick={closeMobileMenu}
                    className={`${isDark ? 'text-gray-300 hover:text-green-400 hover:bg-gray-700' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'} px-4 py-3 rounded-lg transition font-medium flex items-center gap-2`}
                  >
                    <FaUser />
                    Profile
                  </Link>
                  
                  <div className={`mt-2 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center gap-3 px-4 py-2 mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${isDark ? 'from-green-500 to-green-700' : 'from-green-400 to-green-600'} rounded-full flex items-center justify-center text-white font-bold`}>
                        {getUserInitials()}
                      </div>
                      <div>
                        <div className={`text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                          {currentUser.name || 'User'}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {currentUser.email}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className={`flex items-center gap-3 ${isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white px-4 py-3 rounded-lg transition w-full font-medium`}
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className={`flex flex-col gap-3 mt-2 pt-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className={`${isDark ? 'text-gray-300 hover:text-green-400 hover:bg-gray-700' : 'text-gray-700 hover:text-green-600 hover:bg-green-50'} px-4 py-3 rounded-lg transition text-center font-medium`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className={`${isDark ? 'bg-green-500 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white px-4 py-3 rounded-lg transition text-center font-medium shadow-md`}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;