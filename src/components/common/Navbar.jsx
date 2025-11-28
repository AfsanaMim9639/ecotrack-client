import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaLeaf, FaUser, FaSignOutAlt, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

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

  // Get user initials for avatar
  const getUserInitials = () => {
    if (currentUser?.name) {
      return currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return currentUser?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Animated Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-green-600 group">
            <div className="relative">
              <FaLeaf className="transform group-hover:rotate-12 transition-transform duration-300 group-hover:scale-110" />
              {/* Animated particles */}
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></span>
              <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <span className="relative group-hover:text-green-700 transition-colors">
              EcoTrack
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition font-medium">
              Home
            </Link>
            <Link to="/challenges" className="text-gray-700 hover:text-green-600 transition font-medium">
              Challenges
            </Link>
            <Link to="/leaderboard" className="text-gray-700 hover:text-green-600 transition font-medium">
              Leaderboard
            </Link>
            {currentUser && (
              <Link to="/my-activities" className="text-gray-700 hover:text-green-600 transition font-medium">
                My Activities
              </Link>
            )}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-lg transition"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    {getUserInitials()}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-gray-800">
                      {currentUser.name || 'User'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {currentUser.email}
                    </div>
                  </div>
                  <FaChevronDown className={`text-gray-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setProfileDropdownOpen(false)}
                    ></div>
                    
                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-20 animate-fadeIn">
                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition text-gray-700"
                      >
                        <FaUser className="text-green-600" />
                        <span className="font-medium">Profile</span>
                      </Link>
                      <Link
                        to="/my-activities"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition text-gray-700"
                      >
                        <FaLeaf className="text-green-600" />
                        <span className="font-medium">My Activities</span>
                      </Link>
                      <hr className="my-2 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition text-red-600 w-full text-left"
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
                  className="text-gray-700 hover:text-green-600 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition shadow-md hover:shadow-lg font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-green-600 transition text-2xl"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4 animate-slideDown">
            <div className="flex flex-col gap-3">
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-3 rounded-lg transition font-medium"
              >
                Home
              </Link>
              <Link 
                to="/challenges" 
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-3 rounded-lg transition font-medium"
              >
                Challenges
              </Link>
              <Link 
                to="/leaderboard" 
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-3 rounded-lg transition font-medium"
              >
                Leaderboard
              </Link>

              {currentUser ? (
                <>
                  <Link 
                    to="/my-activities" 
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-3 rounded-lg transition font-medium"
                  >
                    My Activities
                  </Link>
                  <Link 
                    to="/profile" 
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-3 rounded-lg transition font-medium"
                  >
                    Profile
                  </Link>
                  
                  <div className="mt-2 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-3 px-4 py-2 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        {getUserInitials()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">
                          {currentUser.name || 'User'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {currentUser.email}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition w-full font-medium"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-2 pt-3 border-t border-gray-200">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-3 rounded-lg transition text-center font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition text-center font-medium shadow-md"
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