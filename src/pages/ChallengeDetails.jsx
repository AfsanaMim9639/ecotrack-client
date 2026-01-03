import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import challengeService from '../services/challengeService';
import userChallengeService from '../services/userChallengeService';
import userService from '../services/userService';
import ShareButtons from '../components/common/ShareButtons';
import { generateShareText } from '../utils/socialShare';
import toast from 'react-hot-toast';
import { FaUsers, FaClock, FaTrophy, FaCalendarAlt, FaCheckCircle, FaEdit, FaTrash } from 'react-icons/fa';

const ChallengeDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [checkingJoinStatus, setCheckingJoinStatus] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    duration: '',
    points: '',
    target: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchChallenge();
    if (currentUser) {
      checkIfAlreadyJoined();
      checkAdminStatus();
    } else {
      setCheckingJoinStatus(false);
    }
  }, [id, currentUser]);

  const fetchChallenge = async () => {
    try {
      const response = await challengeService.getChallengeById(id);
      setChallenge(response.data);
      setFormData({
        title: response.data.title,
        description: response.data.description,
        category: response.data.category,
        difficulty: response.data.difficulty,
        duration: response.data.duration,
        points: response.data.points || 100,
        target: response.data.target || '',
        imageUrl: response.data.imageUrl
      });
    } catch (error) {
      console.error('Error fetching challenge:', error);
      toast.error('Failed to load challenge');
    } finally {
      setLoading(false);
    }
  };

  const checkAdminStatus = async () => {
    try {
      const response = await userService.getUserProfile();
      console.log('User profile data:', response.data);
      setIsAdmin(response.data?.role === 'admin');
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const checkIfAlreadyJoined = async () => {
    try {
      const response = await userChallengeService.getUserChallenges('active,completed');
      const joined = response.data.some(uc => uc.challengeId._id === id || uc.challengeId === id);
      setAlreadyJoined(joined);
    } catch (error) {
      console.error('Error checking join status:', error);
    } finally {
      setCheckingJoinStatus(false);
    }
  };

  const handleJoin = async () => {
    if (!currentUser) {
      toast.error('Please login to join challenges');
      navigate('/login');
      return;
    }

    if (alreadyJoined) {
      toast.error('You have already joined this challenge');
      navigate('/my-activities');
      return;
    }

    setJoining(true);
    try {
      await userChallengeService.joinChallenge(id);
      toast.success('Successfully joined challenge! 🎉');
      setAlreadyJoined(true);
      setTimeout(() => {
        navigate('/my-activities');
      }, 1000);
    } catch (error) {
      console.error('Error joining challenge:', error);
      
      if (error.message && error.message.includes('already joined')) {
        toast.error('You have already joined this challenge');
        setAlreadyJoined(true);
        setTimeout(() => {
          navigate('/my-activities');
        }, 1500);
      } else {
        toast.error(error.message || 'Failed to join challenge');
      }
    } finally {
      setJoining(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await challengeService.updateChallenge(id, formData);
      toast.success('Challenge updated successfully! ✅');
      setIsEditing(false);
      fetchChallenge();
    } catch (error) {
      console.error('Error updating challenge:', error);
      toast.error(error.response?.data?.message || 'Failed to update challenge');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this challenge? This action cannot be undone.')) {
      return;
    }

    try {
      await challengeService.deleteChallenge(id);
      toast.success('Challenge deleted successfully! 🗑️');
      setTimeout(() => {
        navigate('/challenges');
      }, 1000);
    } catch (error) {
      console.error('Error deleting challenge:', error);
      toast.error(error.response?.data?.message || 'Failed to delete challenge');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDark ? 'border-green-400' : 'border-green-600'}`}></div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Challenge not found</p>
      </div>
    );
  }

  const challengeUrl = `${window.location.origin}/challenges/${id}`;
  const shareText = generateShareText.challenge(challenge.title);

  const difficultyColors = {
    Easy: isDark ? 'bg-green-900/30 text-green-300 border border-green-700' : 'bg-green-100 text-green-800',
    Medium: isDark ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700' : 'bg-yellow-100 text-yellow-800',
    Hard: isDark ? 'bg-red-900/30 text-red-300 border border-red-700' : 'bg-red-100 text-red-800'
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/challenges')}
          className={`mb-6 ${isDark ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'} font-semibold flex items-center gap-2`}
        >
          ← Back to Challenges
        </button>

        {/* Admin Controls */}
        {isAdmin && !isEditing && (
          <div className={`mb-6 flex gap-3 ${isDark ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border p-4 rounded-lg`}>
            <button
              onClick={() => setIsEditing(true)}
              className={`flex items-center gap-2 ${isDark ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-lg font-semibold transition`}
            >
              <FaEdit /> Edit Challenge
            </button>
            <button
              onClick={handleDelete}
              className={`flex items-center gap-2 ${isDark ? 'bg-red-700 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'} text-white px-4 py-2 rounded-lg font-semibold transition`}
            >
              <FaTrash /> Delete Challenge
            </button>
          </div>
        )}

        {/* Edit Form */}
        {isEditing ? (
          <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-lg p-8 mb-6`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'} mb-6`}>Edit Challenge</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full px-4 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    required
                  >
                    <option value="Zero Waste">Zero Waste</option>
                    <option value="Energy Saving">Energy Saving</option>
                    <option value="Sustainable Living">Sustainable Living</option>
                    <option value="Water Conservation">Water Conservation</option>
                    <option value="Green Transport">Green Transport</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Difficulty</label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    required
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Duration (days)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Points</label>
                  <input
                    type="number"
                    name="points"
                    value={formData.points}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Target (optional)</label>
                <input
                  type="text"
                  name="target"
                  value={formData.target}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  placeholder="e.g., Reduce plastic waste by 50%"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${isDark ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className={`flex-1 ${isDark ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white py-3 rounded-lg font-semibold transition`}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={`flex-1 ${isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-500 hover:bg-gray-600'} text-white py-3 rounded-lg font-semibold transition`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Challenge Image */}
            <div className="rounded-lg overflow-hidden shadow-lg mb-6">
              <img
                src={challenge.imageUrl}
                alt={challenge.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400';
                }}
              />
            </div>

            {/* Challenge Info */}
            <div className={`${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-lg p-8`}>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`inline-block ${isDark ? 'bg-green-900/30 text-green-300 border border-green-700' : 'bg-green-100 text-green-800'} px-3 py-1 rounded-full text-sm font-semibold`}>
                    {challenge.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${difficultyColors[challenge.difficulty]}`}>
                    {challenge.difficulty}
                  </span>
                  {challenge.status && (
                    <span className={`px-3 py-1 ${isDark ? 'bg-purple-900/30 text-purple-300 border border-purple-700' : 'bg-purple-100 text-purple-800'} rounded-full text-sm font-semibold`}>
                      {challenge.status}
                    </span>
                  )}
                </div>
                
                <h1 className={`text-4xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'} mb-4`}>
                  {challenge.title}
                </h1>
                
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg mb-4`}>
                  {challenge.description}
                </p>

                {challenge.target && (
                  <div className={`${isDark ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-500'} border-l-4 p-4 mb-4`}>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong className={`${isDark ? 'text-green-400' : 'text-green-700'}`}>Target:</strong> {challenge.target}
                    </p>
                  </div>
                )}
              </div>

              {/* Share Section */}
              <div className={`mb-6 pb-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-3`}>
                  Share This Challenge
                </h3>
                <ShareButtons
                  text={shareText}
                  url={challengeUrl}
                  title={challenge.title}
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className={`${isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50'} p-4 rounded-lg text-center`}>
                  <FaUsers className={`text-2xl ${isDark ? 'text-blue-400' : 'text-blue-600'} mx-auto mb-2`} />
                  <div className={`text-2xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{challenge.participants || 0}</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Participants</div>
                </div>
                <div className={`${isDark ? 'bg-green-900/20 border border-green-800' : 'bg-green-50'} p-4 rounded-lg text-center`}>
                  <FaClock className={`text-2xl ${isDark ? 'text-green-400' : 'text-green-600'} mx-auto mb-2`} />
                  <div className={`text-2xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{challenge.duration}</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Days</div>
                </div>
                <div className={`${isDark ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50'} p-4 rounded-lg text-center`}>
                  <FaTrophy className={`text-2xl ${isDark ? 'text-yellow-400' : 'text-yellow-600'} mx-auto mb-2`} />
                  <div className={`text-2xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{challenge.points || 100}</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Points</div>
                </div>
                <div className={`${isDark ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50'} p-4 rounded-lg text-center`}>
                  <FaCalendarAlt className={`text-2xl ${isDark ? 'text-purple-400' : 'text-purple-600'} mx-auto mb-2`} />
                  <div className={`text-2xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{challenge.difficulty}</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Level</div>
                </div>
              </div>

              {/* Join Button */}
              <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-6`}>
                {!currentUser ? (
                  <div className="text-center">
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Please login to join this challenge</p>
                    <button
                      onClick={() => navigate('/login')}
                      className={`${isDark ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white px-8 py-3 rounded-lg font-semibold transition`}
                    >
                      Login to Join
                    </button>
                  </div>
                ) : checkingJoinStatus ? (
                  <div className="text-center py-4">
                    <div className={`inline-block animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-green-400' : 'border-green-600'}`}></div>
                  </div>
                ) : alreadyJoined ? (
                  <div className="text-center">
                    <div className={`${isDark ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border rounded-lg p-6`}>
                      <FaCheckCircle className={`text-4xl ${isDark ? 'text-green-400' : 'text-green-600'} mx-auto mb-3`} />
                      <p className={`text-lg font-semibold ${isDark ? 'text-green-300' : 'text-green-800'} mb-2`}>
                        You've already joined this challenge!
                      </p>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                        Continue tracking your progress in My Activities
                      </p>
                      <button
                        onClick={() => navigate('/my-activities')}
                        className={`${isDark ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'} text-white px-6 py-3 rounded-lg font-semibold transition`}
                      >
                        View My Activities
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleJoin}
                    disabled={joining || challenge.status === 'Completed'}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                      challenge.status === 'Completed'
                        ? isDark ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : joining
                        ? isDark ? 'bg-green-500 text-white cursor-wait' : 'bg-green-400 text-white cursor-wait'
                        : isDark ? 'bg-green-700 hover:bg-green-600 text-white shadow-lg hover:shadow-xl' : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {joining ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Joining...
                      </span>
                    ) : challenge.status === 'Completed' ? (
                      'Challenge Completed'
                    ) : (
                      'Join This Challenge 🌱'
                    )}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetails;