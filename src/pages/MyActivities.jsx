import { useState, useEffect } from 'react';
import userChallengeService from '../services/userChallengeService';
import toast from 'react-hot-toast';
import { FaTrophy, FaClock, FaCheckCircle } from 'react-icons/fa';

const MyActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('active');

  useEffect(() => {
    fetchActivities();
  }, [filter]);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await userChallengeService.getUserChallenges(filter);
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast.error('Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProgress = async (activityId) => {
    try {
      await userChallengeService.updateProgress(activityId, {
        status: 'completed',
        note: 'Daily progress updated'
      });
      toast.success('Progress updated! 🎉');
      fetchActivities();
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          My Activities 🌱
        </h1>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-8">
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
            <p className="text-gray-600 text-lg">
              No {filter} activities found
            </p>
            {filter === 'active' && (
              <p className="text-gray-500 mt-2">
                Join a challenge to get started!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ActivityCard = ({ activity, onUpdate }) => {
  const challenge = activity.challengeId;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {challenge?.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        {challenge?.description}
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{activity.progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${activity.progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <FaClock className="text-blue-600" />
          <span>{challenge?.duration} days</span>
        </div>
        <div className="flex items-center gap-1">
          <FaTrophy className="text-yellow-600" />
          <span>{activity.pointsEarned || challenge?.points} pts</span>
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
          ✅ Completed
        </div>
      )}
    </div>
  );
};

export default MyActivities;