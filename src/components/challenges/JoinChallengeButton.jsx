import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import userChallengeService from '../../services/userChallengeService';
import toast from 'react-hot-toast';

const JoinChallengeButton = ({ challengeId, onSuccess }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    // Check if user is logged in
    if (!currentUser) {
      toast.error('Please login to join challenges');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await userChallengeService.joinChallenge(challengeId);
      
      if (response.success) {
        toast.success(response.message || 'Successfully joined challenge!');
        
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess(response.data);
        }
        
        // Navigate to my activities
        navigate('/my-activities');
      }
    } catch (error) {
      console.error('Error joining challenge:', error);
      toast.error(error.message || 'Failed to join challenge');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleJoin}
      disabled={loading}
      className={`px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed ${
        loading ? 'opacity-50 cursor-wait' : ''
      }`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Joining...
        </span>
      ) : (
        'Join Challenge'
      )}
    </button>
  );
};

export default JoinChallengeButton;
