// ============================================
// FILE: src/pages/MyActivities.jsx (REPLACE COMPLETE FILE)
// ============================================

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import userChallengeService from '../services/userChallengeService';
import toast from 'react-hot-toast';
import { FaClock, FaCheckCircle, FaCalendarAlt, FaTrophy } from 'react-icons/fa';

const MyActivities = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('active');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    fetchActivities();
  }, [filter, currentUser]);

  const fetchActivities = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      console.log('🔍 Fetching activities for user:', currentUser.uid);
      console.log('📊 Filter:', filter);
      
      // Pass userId and status
      const response = await userChallengeService.getUserChallenges(
        currentUser.uid,
        filter !== 'all' ? filter : null
      );
      
      console.log('✅ Activities response:', response);
      
      if (response.success && response.data) {
        setActivities(response.data);
        console.log('📝 Activities set:', response.data.length);
      } else {
        setActivities([]);
      }
    } catch (error) {
      console.error('❌ Error fetching activities:', error);
      toast.error(error.message || 'Failed to load activities');
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProgress = async (activityId) => {
    const progressInput = prompt('Enter progress percentage (0-100):');
    
    if (progressInput === null) return;
    
    const progressPercentage = parseInt(progressInput);
    
    if (isNaN(progressPercentage) || progressPercentage < 0 || progressPercentage > 100) {
      toast.error('Please enter a valid number between 0 and 100');
      return;
    }
    
    try {
      await userChallengeService.updateProgress(
        activityId,
        currentUser.uid,
        { progressPercentage }
      );
      toast.success('Progress updated! 🎉');
      fetchActivities();
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error(error.message || 'Failed to update progress');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Please login to view your activities</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          My Activities 🌱
        </h1>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-8">
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
            onClick={() => setFilter('active')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filter === 'active'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              filter === 'completed'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Debug Info (Remove after testing) */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Debug Info:</h3>
          <p className="text-sm text-blue-700">User ID: {currentUser.uid}</p>
          <p className="text-sm text-blue-700">Filter: {filter}</p>
          <p className="text-sm text-blue-700">Activities Count: {activities.length}</p>
        </div>

        {/* Activities List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="text-gray-600 mt-4">Loading activities...</p>
          </div>
        ) : activities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((activity) => (
              <ActivityCard
                key={activity._id}
                activity={activity}
                onUpdate={handleUpdateProgress}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FaTrophy className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">
              No {filter === 'completed' ? 'completed' : filter === 'active' ? 'active' : ''} activities found
            </p>
            <p className="text-gray-500 mb-4">
              Join a challenge to get started!
            </p>
            <button
              onClick={() => navigate('/challenges')}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Browse Challenges
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ActivityCard = ({ activity, onUpdate }) => {
  const challenge = activity.challengeId;
  
  // Status colors - match schema enum values
  const statusColors = {
    'active': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'abandoned': 'bg-gray-100 text-gray-800',
    // Legacy support
    'Not Started': 'bg-gray-100 text-gray-800',
    'Ongoing': 'bg-blue-100 text-blue-800',
    'Finished': 'bg-green-100 text-green-800'
  };

  const statusLabels = {
    'active': 'Active',
    'completed': 'Completed',
    'abandoned': 'Abandoned'
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-800 flex-1 line-clamp-1">
          {challenge?.title || activity.challengeTitle || 'Challenge'}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          statusColors[activity.status] || 'bg-gray-100 text-gray-800'
        } ml-2`}>
          {statusLabels[activity.status] || activity.status}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {challenge?.description || 'Keep going! 💪'}
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{activity.progressPercentage || 0}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${activity.progressPercentage || 0}%` }}
          ></div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <FaClock className="text-blue-600" />
          <span>{challenge?.duration || 30} days</span>
        </div>
        <div className="flex items-center gap-1">
          <FaCalendarAlt className="text-purple-600" />
          <span className="text-xs">
            Joined: {new Date(activity.joinedDate || activity.joinDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Action Button */}
      {activity.status === 'active' && (
        <button
          onClick={() => onUpdate(activity._id)}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
        >
          <FaCheckCircle />
          Update Progress
        </button>
      )}
      
      {activity.status === 'completed' && (
        <div className="text-center py-2 bg-green-50 text-green-700 font-semibold rounded-lg">
          ✅ Completed on {new Date(activity.completedDate).toLocaleDateString()}
        </div>
      )}

      {activity.status === 'abandoned' && (
        <div className="text-center py-2 bg-gray-50 text-gray-600 rounded-lg">
          Abandoned
        </div>
      )}
    </div>
  );
};

export default MyActivities;

