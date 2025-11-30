import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import userChallengeService from '../services/userChallengeService';
import toast from 'react-hot-toast';
import { 
  FaArrowLeft, 
  FaClock, 
  FaCalendarAlt, 
  FaTrophy, 
  FaChartLine,
  FaHistory,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    fetchActivityDetails();
  }, [id, currentUser]);

  const fetchActivityDetails = async () => {
    try {
      setLoading(true);
      const response = await userChallengeService.getUserChallengeById(id, currentUser.uid);
      
      if (response.success && response.data) {
        setActivity(response.data);
      } else {
        toast.error('Activity not found');
        navigate('/my-activities');
      }
    } catch (error) {
      console.error('Fetch activity error:', error);
      toast.error(error.message || 'Failed to load activity details');
      navigate('/my-activities');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="text-gray-600 mt-4">Loading activity details...</p>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Activity not found</p>
          <button
            onClick={() => navigate('/my-activities')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Back to Activities
          </button>
        </div>
      </div>
    );
  }

  const challenge = activity.challengeId;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/my-activities')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition"
        >
          <FaArrowLeft />
          <span>Back to Activities</span>
        </button>

        {/* Activity Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {challenge?.title || activity.challengeTitle}
              </h1>
              <p className="text-gray-600">
                {challenge?.description || 'Keep up the great work!'}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              activity.status === 'completed' 
                ? 'bg-green-100 text-green-800'
                : activity.status === 'active'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span className="font-semibold">Overall Progress</span>
              <span className="font-bold text-green-600">{activity.progressPercentage || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${activity.progressPercentage || 0}%` }}
              ></div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <FaClock />
                <span className="text-sm font-semibold">Duration</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {challenge?.duration || 30} days
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <FaCalendarAlt />
                <span className="text-sm font-semibold">Joined</span>
              </div>
              <p className="text-sm font-bold text-gray-800">
                {new Date(activity.joinedDate).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <FaTrophy />
                <span className="text-sm font-semibold">Points</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {activity.pointsEarned || 0}
              </p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-orange-600 mb-2">
                <FaChartLine />
                <span className="text-sm font-semibold">Impact</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {activity.totalImpact || 0}
              </p>
            </div>
          </div>

          {activity.status === 'completed' && activity.completedDate && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold text-center">
                ✅ Completed on {new Date(activity.completedDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {/* Progress History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <FaHistory className="text-blue-600 text-xl" />
            <h2 className="text-2xl font-bold text-gray-800">Progress History</h2>
          </div>

          {activity.progressHistory && activity.progressHistory.length > 0 ? (
            <div className="space-y-4">
              {activity.progressHistory
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((entry, index) => (
                  <ProgressHistoryCard key={index} entry={entry} />
                ))}
            </div>
          ) : activity.progress && activity.progress.length > 0 ? (
            <div className="space-y-4">
              {activity.progress
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((entry, index) => (
                  <ProgressCard key={index} entry={entry} />
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaHistory className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No progress history yet</p>
              <p className="text-gray-500 text-sm mt-2">
                Start tracking your progress to see your journey!
              </p>
            </div>
          )}
        </div>

        {/* Progress Updates */}
        {activity.progressUpdates && activity.progressUpdates.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <div className="flex items-center gap-2 mb-6">
              <FaCheckCircle className="text-green-600 text-xl" />
              <h2 className="text-2xl font-bold text-gray-800">Progress Updates</h2>
            </div>

            <div className="space-y-4">
              {activity.progressUpdates
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((update, index) => (
                  <UpdateCard key={index} update={update} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Progress History Card Component
const ProgressHistoryCard = ({ entry }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-500">
              {new Date(entry.date).toLocaleDateString()} at {new Date(entry.date).toLocaleTimeString()}
            </span>
            {entry.status && (
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                entry.status === 'completed' 
                  ? 'bg-green-100 text-green-800'
                  : entry.status === 'in-progress'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {entry.status}
              </span>
            )}
          </div>
          {entry.notes && (
            <p className="text-gray-700 mb-2">{entry.notes}</p>
          )}
          <div className="flex items-center gap-4 text-sm">
            {entry.percentage !== undefined && (
              <span className="text-green-600 font-semibold">
                Progress: {entry.percentage}%
              </span>
            )}
            {entry.impactValue && (
              <span className="text-blue-600 font-semibold">
                Impact: {entry.impactValue}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Legacy Progress Card Component
const ProgressCard = ({ entry }) => {
  const statusIcons = {
    'completed': <FaCheckCircle className="text-green-600" />,
    'in-progress': <FaClock className="text-blue-600" />,
    'missed': <FaTimesCircle className="text-red-600" />
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex items-start gap-3">
        <div className="text-2xl mt-1">
          {statusIcons[entry.status] || statusIcons['in-progress']}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-500">
              {new Date(entry.date).toLocaleDateString()}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${
              entry.status === 'completed' 
                ? 'bg-green-100 text-green-800'
                : entry.status === 'in-progress'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {entry.status}
            </span>
          </div>
          {entry.description && (
            <p className="text-gray-700">{entry.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Progress Update Card Component
const UpdateCard = ({ update }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-gray-500">
          {new Date(update.date).toLocaleDateString()} at {new Date(update.date).toLocaleTimeString()}
        </span>
      </div>
      <p className="text-gray-700 mb-2">{update.description}</p>
      {update.proofImage && (
        <div className="mt-3">
          <img
            src={update.proofImage}
            alt="Progress proof"
            className="rounded-lg max-h-64 object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ActivityDetail;