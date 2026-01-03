import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import challengeService from '../services/challengeService';
import ChallengeCard from '../components/challenges/ChallengeCard';
import toast from 'react-hot-toast';
import { FaSearch, FaFilter, FaLeaf, FaPlus, FaCalendar, FaUsers } from 'react-icons/fa';

const Challenges = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    startDate: '',
    endDate: '',
    minParticipants: '',
    maxParticipants: '',
    difficulty: '',
    status: ''
  });

  useEffect(() => {
    fetchChallenges();
  }, [filters]);

  const fetchChallenges = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await challengeService.getAllChallenges(filters);
      setChallenges(response.data);
    } catch (error) {
      let errorMessage = 'Failed to load challenges';
      
      if (error.isNetworkError) {
        errorMessage = 'Cannot connect to server. Please check your internet connection.';
      } else if (error.status === 404) {
        errorMessage = 'API endpoint not found. Please check server configuration.';
      } else if (error.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      startDate: '',
      endDate: '',
      minParticipants: '',
      maxParticipants: '',
      difficulty: '',
      status: ''
    });
  };

  const categories = [
    'All', 
    'Energy Conservation', 
    'Water Conservation', 
    'Waste Reduction', 
    'Sustainable Transport', 
    'Green Living', 
    'Food & Agriculture'
  ];

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const statuses = ['All', 'Active', 'Upcoming', 'Completed'];

  const activeFilterCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <div className={`min-h-screen relative overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50'}`}>
      {/* Animated Background */}
      {!isDark && (
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      )}

      {isDark && (
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-900/30 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-900/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-900/30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FaLeaf className={`absolute top-1/4 left-1/4 ${isDark ? 'text-green-700' : 'text-green-300'} text-4xl animate-float opacity-30`} style={{ animationDelay: '0s' }} />
        <FaLeaf className={`absolute top-1/3 right-1/3 ${isDark ? 'text-green-600' : 'text-green-400'} text-3xl animate-float opacity-40`} style={{ animationDelay: '2s' }} />
        <FaLeaf className={`absolute bottom-1/4 left-1/3 ${isDark ? 'text-green-700' : 'text-green-300'} text-5xl animate-float opacity-25`} style={{ animationDelay: '4s' }} />
        <FaLeaf className={`absolute top-1/2 right-1/4 ${isDark ? 'text-green-600' : 'text-green-400'} text-3xl animate-float opacity-35`} style={{ animationDelay: '3s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              <span className={`bg-gradient-to-r ${isDark ? 'from-green-400 via-blue-400 to-purple-400' : 'from-green-600 via-blue-600 to-purple-600'} bg-clip-text text-transparent`}>
                Explore Challenges
              </span>
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Join eco-friendly challenges and make a positive impact on our planet 
            </p>
          </div>

          {/* Filters Card */}
          <div className={`${isDark ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'} backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border`}>
            {/* Basic Filters */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Category Filter */}
              <div>
                <label className={`flex items-center text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                  <FaFilter className={`mr-2 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value === 'All' ? '' : e.target.value })}
                  className={`w-full px-4 py-3 border-2 ${isDark ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-200 bg-white/50'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all backdrop-blur-sm`}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Search Filter */}
              <div>
                <label className={`flex items-center text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                  <FaSearch className={`mr-2 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    placeholder="Search challenges..."
                    className={`w-full px-4 py-3 pl-11 border-2 ${isDark ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400' : 'border-gray-200 bg-white/50 placeholder-gray-400'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all backdrop-blur-sm`}
                  />
                  <FaSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
              </div>

              {/* Advanced Filters Toggle */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3 opacity-0 pointer-events-none">
                  Action
                </label>
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className={`w-full h-[50px] flex items-center justify-center gap-2 ${isDark ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'} border-2 rounded-xl transition-all font-semibold`}
                >
                  <FaFilter />
                  <span>Advanced Filters</span>
                  {activeFilterCount > 2 && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      {activeFilterCount - 2}
                    </span>
                  )}
                </button>
              </div>

              {/* Add Challenge Button */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3 opacity-0 pointer-events-none">
                  Action
                </label>
                {user && user.role === 'admin' ? (
                  <Link 
                    to="/challenges/add"
                    className="w-full h-[50px] flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-semibold"
                  >
                    <FaPlus />
                    <span>Create Challenge</span>
                  </Link>
                ) : (
                  <div className={`w-full h-[50px] flex items-center justify-center ${isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} rounded-xl text-sm`}>
                    Admin Only
                  </div>
                )}
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className={`mt-6 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} grid grid-cols-1 md:grid-cols-3 gap-6`}>
                {/* Date Range */}
                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <div>
                    <label className={`flex items-center text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                      <FaCalendar className={`mr-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                      className={`w-full px-4 py-3 border-2 ${isDark ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-200 bg-white/50'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                    />
                  </div>
                  <div>
                    <label className={`flex items-center text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                      <FaCalendar className={`mr-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                      End Date
                    </label>
                    <input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                      className={`w-full px-4 py-3 border-2 ${isDark ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-200 bg-white/50'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                    />
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <label className={`flex items-center text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                    <FaFilter className={`mr-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                    Difficulty
                  </label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => setFilters({ ...filters, difficulty: e.target.value === 'All' ? '' : e.target.value })}
                    className={`w-full px-4 py-3 border-2 ${isDark ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-200 bg-white/50'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                  >
                    {difficulties.map((diff) => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>

                {/* Participants Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`flex items-center text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                      <FaUsers className={`mr-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                      Min Participants
                    </label>
                    <input
                      type="number"
                      value={filters.minParticipants}
                      onChange={(e) => setFilters({ ...filters, minParticipants: e.target.value })}
                      placeholder="0"
                      min="0"
                      className={`w-full px-4 py-3 border-2 ${isDark ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-500' : 'border-gray-200 bg-white/50 placeholder-gray-400'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                    />
                  </div>
                  <div>
                    <label className={`flex items-center text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                      <FaUsers className={`mr-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                      Max Participants
                    </label>
                    <input
                      type="number"
                      value={filters.maxParticipants}
                      onChange={(e) => setFilters({ ...filters, maxParticipants: e.target.value })}
                      placeholder="999"
                      min="0"
                      className={`w-full px-4 py-3 border-2 ${isDark ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-500' : 'border-gray-200 bg-white/50 placeholder-gray-400'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className={`flex items-center text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                    <FaFilter className={`mr-2 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value === 'All' ? '' : e.target.value })}
                    className={`w-full px-4 py-3 border-2 ${isDark ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-200 bg-white/50'} rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                  >
                    {statuses.map((stat) => (
                      <option key={stat} value={stat}>{stat}</option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className={`w-full px-4 py-3 ${isDark ? 'bg-red-900/50 text-red-300 hover:bg-red-900/70' : 'bg-red-100 text-red-700 hover:bg-red-200'} rounded-xl transition-all font-semibold`}
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}

            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {filters.category && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full ${isDark ? 'bg-green-900/40 text-green-300' : 'bg-green-100 text-green-800'} text-sm font-medium`}>
                    Category: {filters.category}
                    <button onClick={() => setFilters({ ...filters, category: '' })} className={`ml-2 ${isDark ? 'hover:text-green-200' : 'hover:text-green-600'}`}>×</button>
                  </span>
                )}
                {filters.search && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full ${isDark ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-100 text-blue-800'} text-sm font-medium`}>
                    Search: "{filters.search}"
                    <button onClick={() => setFilters({ ...filters, search: '' })} className={`ml-2 ${isDark ? 'hover:text-blue-200' : 'hover:text-blue-600'}`}>×</button>
                  </span>
                )}
                {filters.difficulty && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full ${isDark ? 'bg-purple-900/40 text-purple-300' : 'bg-purple-100 text-purple-800'} text-sm font-medium`}>
                    Difficulty: {filters.difficulty}
                    <button onClick={() => setFilters({ ...filters, difficulty: '' })} className={`ml-2 ${isDark ? 'hover:text-purple-200' : 'hover:text-purple-600'}`}>×</button>
                  </span>
                )}
                {/* Other filter badges with dark mode... */}
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className={`${isDark ? 'bg-red-900/30 border-red-800' : 'bg-red-50/80 border-red-200'} backdrop-blur-lg border-2 rounded-2xl p-6 mb-8 shadow-lg`}>
              <h3 className={`${isDark ? 'text-red-300' : 'text-red-800'} font-bold mb-2 flex items-center`}>
                <span className="text-2xl mr-2">⚠️</span>
                Error Loading Challenges
              </h3>
              <p className={`${isDark ? 'text-red-400' : 'text-red-700'} mb-4`}>{error}</p>
              <button
                onClick={fetchChallenges}
                className={`${isDark ? 'bg-red-700 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'} text-white px-6 py-2 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Challenge Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block">
                <div className="relative">
                  <div className={`w-20 h-20 border-4 ${isDark ? 'border-green-800' : 'border-green-200'} rounded-full`}></div>
                  <div className={`w-20 h-20 border-4 ${isDark ? 'border-green-400' : 'border-green-600'} rounded-full animate-spin border-t-transparent absolute top-0 left-0`}></div>
                </div>
              </div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-6 text-lg font-medium`}>Loading amazing challenges...</p>
            </div>
          ) : challenges.length > 0 ? (
            <>
              <div className="mb-6 text-center">
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
                  Found <span className={`${isDark ? 'text-green-400' : 'text-green-600'} font-bold`}>{challenges.length}</span> challenges
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {challenges.map((challenge) => (
                  <ChallengeCard key={challenge._id} challenge={challenge} />
                ))}
              </div>
            </>
          ) : (
            <div className={`text-center py-20 ${isDark ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-lg rounded-2xl shadow-xl`}>
              <div className="text-6xl mb-4">🔍</div>
              <p className={`${isDark ? 'text-gray-200' : 'text-gray-700'} text-xl font-semibold mb-2`}>No challenges found</p>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Try adjusting your filters or search terms</p>
              <button
                onClick={clearFilters}
                className={`mt-6 ${isDark ? 'bg-green-600 hover:bg-green-500' : 'bg-green-600 hover:bg-green-700'} text-white px-6 py-3 rounded-lg transition-all shadow-md`}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Challenges;