import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaClock, FaTrophy } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

const ChallengeCard = ({ challenge, currentUser }) => {
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState(false);

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };

  const categoryColors = {
    Energy: 'bg-blue-500',
    Water: 'bg-cyan-500',
    Waste: 'bg-orange-500',
    Transportation: 'bg-purple-500',
    Food: 'bg-green-500',
    Other: 'bg-gray-500'
  };

  const handleJoinChallenge = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in
    if (!currentUser) {
      toast.error('Please login to join challenges');
      navigate('/login');
      return;
    }

    setIsJoining(true);

    try {
      // Join challenge API call
      await api.post('/user-challenges/join', {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userName: currentUser.displayName || currentUser.email.split('@')[0],
        challengeId: challenge._id
      });

      toast.success('🎉 Successfully joined the challenge!');
      
      // Navigate to My Activities page after a short delay
      setTimeout(() => {
        navigate('/my-activities');
      }, 1000);

    } catch (error) {
      console.error('Error joining challenge:', error);
      
      if (error.response?.status === 400) {
        toast.error(error.response.data.message || 'You have already joined this challenge');
      } else {
        toast.error('Failed to join challenge. Please try again.');
      }
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={challenge.imageUrl}
          alt={challenge.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Challenge';
          }}
        />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-sm font-semibold ${categoryColors[challenge.category] || categoryColors.Other}`}>
          {challenge.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {challenge.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {challenge.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <FaUsers className="text-green-600" />
            <span>{challenge.participants || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="text-blue-600" />
            <span>{challenge.duration} days</span>
          </div>
          <div className="flex items-center gap-1">
            <FaTrophy className="text-yellow-600" />
            <span>{challenge.points} pts</span>
          </div>
        </div>

        {/* Difficulty & Buttons */}
        <div className="flex items-center justify-between gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[challenge.difficulty]}`}>
            {challenge.difficulty}
          </span>
          
          <div className="flex gap-2">
            <Link
              to={`/challenges/${challenge._id}`}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700 transition"
            >
              Details
            </Link>
            
            <button
              onClick={handleJoinChallenge}
              disabled={isJoining || challenge.status === 'Completed'}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                challenge.status === 'Completed'
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : isJoining
                  ? 'bg-green-400 text-white cursor-wait'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isJoining ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Joining...
                </span>
              ) : challenge.status === 'Completed' ? (
                'Completed'
              ) : (
                'Join'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;