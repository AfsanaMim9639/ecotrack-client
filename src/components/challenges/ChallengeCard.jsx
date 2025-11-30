

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';  
import { FaUsers, FaClock, FaTrophy } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

const ChallengeCard = ({ challenge }) => {  
  const navigate = useNavigate();
  const { currentUser } = useAuth();  
  const [isJoining, setIsJoining] = useState(false);

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };

  const categoryColors = {
    'Energy Conservation': 'bg-blue-500',
    'Water Conservation': 'bg-cyan-500',
    'Waste Reduction': 'bg-orange-500',
    'Sustainable Transport': 'bg-purple-500',
    'Green Living': 'bg-green-500',
    'Sustainable Living': 'bg-emerald-500',
    Other: 'bg-gray-500'
  };

  const handleJoinChallenge = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // ✅ Debug log
    console.log('🔍 Current User:', currentUser);
    console.log('🔍 Challenge:', challenge);

    // Check if user is logged in
    if (!currentUser) {
      console.log('❌ No user logged in');
      toast.error('Please login to join challenges');
      navigate('/login', { state: { from: '/challenges' } });
      return;
    }

    // Validate challenge data
    if (!challenge || !challenge._id) {
      console.log('❌ Invalid challenge data');
      toast.error('Invalid challenge data');
      return;
    }

    setIsJoining(true);

    try {
      const joinData = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userName: currentUser.displayName || currentUser.email?.split('@')[0] || 'EcoWarrior',
        challengeId: challenge._id
      };

      

      // Join challenge API call
      const response = await api.post('/user-challenges/join', joinData);

      
      if (response.data.success) {
        toast.success('🎉 Successfully joined the challenge!');
        
        // Navigate to My Activities page
        setTimeout(() => {
          navigate('/my-activities');
        }, 1000);
      } else {
        toast.error(response.data.message || 'Failed to join challenge');
      }

    } catch (error) {
      console.error('❌ Error joining challenge:', error);
      console.error('❌ Error response:', error.response?.data);
      
      // Detailed error handling
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 400) {
        toast.error('You may have already joined this challenge');
      } else if (error.response?.status === 404) {
        toast.error('Challenge not found');
      } else if (error.message) {
        toast.error(error.message);
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
          src={challenge.imageUrl || 'https://via.placeholder.com/400x300?text=Challenge'}
          alt={challenge.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Challenge';
          }}
        />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-sm font-semibold ${
          categoryColors[challenge.category] || categoryColors.Other
        }`}>
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
            <span>{challenge.duration || 30} days</span>
          </div>
          {challenge.points && (
            <div className="flex items-center gap-1">
              <FaTrophy className="text-yellow-600" />
              <span>{challenge.points} pts</span>
            </div>
          )}
        </div>

        {/* Difficulty & Buttons */}
        <div className="flex items-center justify-between gap-2">
          {challenge.difficulty && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              difficultyColors[challenge.difficulty] || difficultyColors.Easy
            }`}>
              {challenge.difficulty}
            </span>
          )}
          
          <div className="flex gap-2 ml-auto">
            <Link
              to={`/challenges/${challenge._id}`}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700 transition"
            >
              Details
            </Link>
            
            <button
              onClick={handleJoinChallenge}
              disabled={isJoining}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                isJoining
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

