import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import leaderboardService from '../services/leaderboardService';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import toast from 'react-hot-toast';
import { FaTrophy, FaFire, FaChartLine } from 'react-icons/fa';

const Leaderboard = () => {
  const { currentUser } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]); // ✅ Default empty array
  const [myRank, setMyRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('points');

  useEffect(() => {
    fetchLeaderboard();
    if (currentUser) {
      fetchMyRank();
    }
  }, [filterType, currentUser]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await leaderboardService.getLeaderboard(filterType, 50);
      // ✅ Fixed: Check if response.data exists and is array
      if (response && response.data && Array.isArray(response.data)) {
        setLeaderboard(response.data);
      } else {
        setLeaderboard([]); // Fallback to empty array
        console.warn('Invalid leaderboard data:', response);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLeaderboard([]); // ✅ Set empty array on error
      toast.error(error.message || 'Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRank = async () => {
    try {
      const response = await leaderboardService.getMyRank();
      setMyRank(response.data);
    } catch (error) {
      console.error('Error fetching rank:', error);
      // Don't show error if user profile doesn't exist yet
      if (error.status !== 404) {
        toast.error('Failed to load your rank');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <FaTrophy className="text-yellow-500" />
            Community Leaderboard
          </h1>
          <p className="text-gray-600">
            See how you rank among other eco-warriors!
          </p>
        </div>

        {/* My Rank Card */}
        {currentUser && myRank && (
          <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-lg p-6 mb-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{myRank.position || 0}</div>
                <div className="text-sm opacity-90">Your Rank</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{myRank.totalPoints || 0}</div>
                <div className="text-sm opacity-90">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{myRank.currentStreak || 0}🔥</div>
                <div className="text-sm opacity-90">Current Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{myRank.badges?.length || 0}🏅</div>
                <div className="text-sm opacity-90">Badges Earned</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="inline-block bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-semibold">{myRank.rank || 'Beginner'}</span> • 
                <span className="ml-2">Top {myRank.percentile || 0}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterType('points')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                filterType === 'points'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaTrophy />
              By Points
            </button>
            <button
              onClick={() => setFilterType('challenges')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                filterType === 'challenges'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaChartLine />
              By Challenges
            </button>
            <button
              onClick={() => setFilterType('streak')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                filterType === 'streak'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaFire />
              By Streak
            </button>
          </div>
        </div>

        {/* Leaderboard Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="text-gray-600 mt-4">Loading leaderboard...</p>
          </div>
        ) : leaderboard && leaderboard.length > 0 ? ( // ✅ Fixed: Added null check
          <LeaderboardTable
            leaderboard={leaderboard}
            currentUserId={currentUser?.uid}
          />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">No data available</p>
            <p className="text-gray-500 text-sm mt-2">Complete challenges to appear on the leaderboard!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
