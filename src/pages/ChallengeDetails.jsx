import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import challengeService from '../services/challengeService';
import userChallengeService from '../services/userChallengeService';
import toast from 'react-hot-toast';
import { FaUsers, FaClock, FaTrophy, FaCalendarAlt } from 'react-icons/fa';

const ChallengeDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    fetchChallenge();
  }, [id]);

  const fetchChallenge = async () => {
    try {
      const response = await challengeService.getChallengeById(id);
      setChallenge(response.data);
    } catch (error) {
      console.error('Error fetching challenge:', error);
      toast.error('Failed to load challenge');
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!currentUser) {
      toast.error('Please login to join challenges');
      navigate('/login');
      return;
    }

    setJoining(true);
    try {
      await userChallengeService.joinChallenge(id);
      toast.success('Successfully joined challenge! 🎉');
      navigate('/my-activities');
    } catch (error) {
      console.error('Error joining challenge:', error);
      toast.error(error.message || 'Failed to join challenge');
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Challenge not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Challenge Image */}
        <div className="rounded-lg overflow-hidden shadow-lg mb-6">
          <img
            src={challenge.imageUrl}
            alt={challenge.title}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Challenge Info */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {challenge.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {challenge.title}
            </h1>
            <p className="text-gray-600 text-lg">
              {challenge.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <FaUsers className="text-2xl text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{challenge.participants}</div>
              <div className="text-sm text-gray-600">Participants</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <FaClock className="text-2xl text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{challenge.duration}</div>
              <div className="text-sm text-gray-600">Days</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <FaTrophy className="text-2xl text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{challenge.points}</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <FaCalendarAlt className="text-2xl text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{challenge.difficulty}</div>
              <div className="text-sm text-gray-600">Level</div>
            </div>
          </div>

          {/* Join Button */}
          <button
            onClick={handleJoin}
            disabled={joining}
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition"
          >
            {joining ? 'Joining...' : 'Join This Challenge 🌱'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;