import { useState, useEffect } from 'react';
import challengeService from '../services/challengeService';
import ChallengeCard from '../components/challenges/ChallengeCard';
import toast from 'react-hot-toast';
import { FaSearch, FaFilter, FaLeaf } from 'react-icons/fa';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    search: ''
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

  const categories = [
    'All', 
    'Energy Conservation', 
    'Water Conservation', 
    'Waste Reduction', 
    'Sustainable Transport', 
    'Green Living', 
    'Food & Agriculture'
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        {/* Animated Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Floating Leaves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FaLeaf className="absolute top-1/4 left-1/4 text-green-300 text-4xl animate-float opacity-30" style={{ animationDelay: '0s' }} />
          <FaLeaf className="absolute top-1/3 right-1/3 text-green-400 text-3xl animate-float opacity-40" style={{ animationDelay: '2s' }} />
          <FaLeaf className="absolute bottom-1/4 left-1/3 text-green-300 text-5xl animate-float opacity-25" style={{ animationDelay: '4s' }} />
          <FaLeaf className="absolute top-1/2 right-1/4 text-green-400 text-3xl animate-float opacity-35" style={{ animationDelay: '3s' }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Explore Challenges
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join eco-friendly challenges and make a positive impact on our planet 🌍
            </p>
          </div>

          {/* Filters Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Category Filter */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <FaFilter className="mr-2 text-green-600" />
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value === 'All' ? '' : e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Search Filter */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <FaSearch className="mr-2 text-green-600" />
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    placeholder="Search challenges..."
                    className="w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(filters.category || filters.search) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {filters.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                    {filters.category}
                    <button
                      onClick={() => setFilters({ ...filters, category: '' })}
                      className="ml-2 hover:text-green-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.search && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                    "{filters.search}"
                    <button
                      onClick={() => setFilters({ ...filters, search: '' })}
                      className="ml-2 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50/80 backdrop-blur-lg border-2 border-red-200 rounded-2xl p-6 mb-8 shadow-lg">
              <h3 className="text-red-800 font-bold mb-2 flex items-center">
                <span className="text-2xl mr-2">⚠️</span>
                Error Loading Challenges
              </h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={fetchChallenges}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
                  <div className="w-20 h-20 border-4 border-green-200 rounded-full"></div>
                  <div className="w-20 h-20 border-4 border-green-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
                </div>
              </div>
              <p className="text-gray-600 mt-6 text-lg font-medium">Loading amazing challenges...</p>
            </div>
          ) : challenges.length > 0 ? (
            <>
              <div className="mb-6 text-center">
                <p className="text-gray-600 font-medium">
                  Found <span className="text-green-600 font-bold">{challenges.length}</span> challenges
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {challenges.map((challenge) => (
                  <ChallengeCard key={challenge._id} challenge={challenge} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-700 text-xl font-semibold mb-2">No challenges found</p>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
              <button
                onClick={() => setFilters({ category: '', search: '' })}
                className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all shadow-md"
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