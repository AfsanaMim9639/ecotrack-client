import { useState, useEffect } from 'react';
import { getAllChallenges } from '../services/challengeService';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const response = await getAllChallenges();
      
      if (response.success) {
        setChallenges(response.data || []);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching challenges:', err);
      setError('Failed to load challenges. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading challenges...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Active Challenges</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div 
            key={challenge._id} 
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">{challenge.title}</h2>
            <p className="text-gray-600 mb-4">{challenge.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                {challenge.category}
              </span>
              <span className="text-sm text-gray-500">
                {challenge.participants} participants
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;