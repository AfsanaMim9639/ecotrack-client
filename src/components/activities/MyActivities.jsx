import { useState, useEffect } from 'react';
import { userChallengeService } from '../services/userChallengeService';
import { toast } from 'react-hot-toast';
import { FaTrophy, FaFire, FaCheckCircle, FaClock } from 'react-icons/fa';

const MyActivities = ({ currentUser }) => {
  const [challenges, setChallenges] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, Active, Completed

  useEffect(() => {
    if (currentUser) {
      fetchUserChallenges();
      fetchUserStats();
    }
  }, [currentUser, filter]);

  const fetchUserChallenges = async () => {
    try {
      const statusFilter = filter === 'all' ? null : filter;
      const response = await userChallengeService.getUserChallenges(
        currentUser.uid,
        statusFilter
      );
      setChallenges(response.data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
      toast.error('Failed to load your activities');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await userChallengeService.getUserStats(currentUser.uid);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600">You need to login to view your activities</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Activities 🎯</h1>

        {/* Stats Dashboard */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<FaFire className="text-orange-600" />}
              value={stats.totalChallenges}
              label="Total Challenges"
              color="orange"
            />
            <StatCard
              icon={<FaClock className="text-blue-600" />}
              value={stats.activeChallenges}
              label="Active"
              color="blue"
            />
            <StatCard
              icon={<FaCheckCircle className="text-green-600" />}
              value={stats.completedChallenges}
              label="Completed"
              color="green"
            />
            <StatCard
              icon={<FaTrophy className="text-yellow-600" />}
              value={stats.totalPoints}
              label="Total Points"
              color="yellow"
            />
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filter === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('Active')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filter === 'Active'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('Completed')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filter === 'Completed'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Challenges List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : challenges.length > 0 ? (
          <div className="space-y-6">
            {challenges.map((challenge) => (
              <ProgressCard
                key={challenge._id}
                userChallenge={challenge}
                onUpdate={fetchUserChallenges}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">No challenges found</p>
            <p className="text-gray-500 mt-2">Join a challenge to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, value, label, color }) => {
  const colors = {
    orange: 'bg-orange-50',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    yellow: 'bg-yellow-50'
  };

  return (
    <div className={`${colors[color]} rounded-lg shadow p-6`}>
      <div className="flex items-center gap-4">
        <div className="text-4xl">{icon}</div>
        <div>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  );
};

const ProgressCard = ({ userChallenge, onUpdate }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [progressValue, setProgressValue] = useState(userChallenge.progressPercentage);
  const [updateDescription, setUpdateDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getProgressColor = (percentage) => {
    if (percentage < 25) return 'bg-red-500';
    if (percentage < 50) return 'bg-orange-500';
    if (percentage < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusBadge = (status) => {
    const styles = {
      Active: 'bg-blue-100 text-blue-800',
      Completed: 'bg-green-100 text-green-800',
      Failed: 'bg-red-100 text-red-800',
      Abandoned: 'bg-gray-100 text-gray-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const handleProgressUpdate = async () => {
    if (!updateDescription.trim()) {
      toast.error('Please add a description');
      return;
    }

    setIsSubmitting(true);
    try {
      await userChallengeService.updateProgress(userChallenge._id, progressValue);
      await userChallengeService.addProgressUpdate(userChallenge._id, {
        description: updateDescription
      });

      toast.success('Progress updated successfully!');
      setShowUpdateForm(false);
      setUpdateDescription('');
      onUpdate();
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          {userChallenge.challengeTitle}
        </h3>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(userChallenge.status)}`}>
          {userChallenge.status}
        </span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-sm">
          <p className="text-gray-600">Category</p>
          <p className="font-semibold text-gray-800">{userChallenge.challengeCategory}</p>
        </div>
        <div className="text-sm">
          <p className="text-gray-600">Points</p>
          <p className="font-semibold text-green-600">{userChallenge.challengePoints} pts</p>
        </div>
        <div className="text-sm">
          <p className="text-gray-600">Started</p>
          <p className="font-semibold text-gray-800">
            {new Date(userChallenge.startDate).toLocaleDateString()}
          </p>
        </div>
        <div className="text-sm">
          <p className="text-gray-600">Last Updated</p>
          <p className="font-semibold text-gray-800">
            {new Date(userChallenge.lastUpdated).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-lg font-bold text-gray-800">
            {userChallenge.progressPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className={`h-full ${getProgressColor(userChallenge.progressPercentage)} transition-all duration-500`}
            style={{ width: `${userChallenge.progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">{userChallenge.totalUpdates || 0}</p>
          <p className="text-xs text-gray-600">Updates</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">{userChallenge.daysActive || 0}</p>
          <p className="text-xs text-gray-600">Days Active</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{userChallenge.pointsEarned || 0}</p>
          <p className="text-xs text-gray-600">Points Earned</p>
        </div>
      </div>

      {/* Update Progress Button */}
      {userChallenge.status === 'Active' && (
        <>
          {!showUpdateForm ? (
            <button
              onClick={() => setShowUpdateForm(true)}
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              📊 Update Progress
            </button>
          ) : (
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-800 mb-3">Update Your Progress</h4>

              {/* Progress Slider */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Progress: {progressValue}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressValue}
                  onChange={(e) => setProgressValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What did you accomplish?
                </label>
                <textarea
                  value={updateDescription}
                  onChange={(e) => setUpdateDescription(e.target.value)}
                  rows="3"
                  placeholder="Describe your progress..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleProgressUpdate}
                  disabled={isSubmitting}
                  className="flex-1 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Saving...' : 'Save Progress'}
                </button>
                <button
                  onClick={() => {
                    setShowUpdateForm(false);
                    setProgressValue(userChallenge.progressPercentage);
                    setUpdateDescription('');
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Progress History */}
      {userChallenge.progressUpdates && userChallenge.progressUpdates.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h4 className="font-semibold text-gray-800 mb-3">Recent Updates</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {userChallenge.progressUpdates.slice(-5).reverse().map((update, index) => (
              <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{update.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(update.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyActivities;