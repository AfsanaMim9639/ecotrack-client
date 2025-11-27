import { useState, useEffect } from 'react';
import challengeService from '../services/challengeService';
import ChallengeCard from '../components/challenges/ChallengeCard';
import toast from 'react-hot-toast';

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
    
    console.log('🔄 Fetching challenges with filters:', filters);
    console.log('🌐 API Base URL:', import.meta.env.VITE_API_BASE_URL);
    
    try {
      const response = await challengeService.getAllChallenges(filters);
      console.log('✅ Challenges received:', response.data.length);
      setChallenges(response.data);
    } catch (error) {
      console.error('❌ Error fetching challenges:', error);
      
      // Detailed error message
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

  const categories = ['All', 'Energy Conservation', 'Water Conservation', 'Waste Reduction', 'Sustainable Transport', 'Green Living', 'Food & Agriculture'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Explore Challenges 🌱
        </h1>

        {/* Debug Info - Remove in production */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>API URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'Not Set'}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value === 'All' ? '' : e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Search Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Search challenges..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="text-red-800 font-bold mb-2">⚠️ Error Loading Challenges</h3>
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchChallenges}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Challenge Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="text-gray-600 mt-4">Loading challenges...</p>
          </div>
        ) : challenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge._id} challenge={challenge} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">No challenges found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenges;