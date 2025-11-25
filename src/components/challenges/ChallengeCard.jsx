import { Link } from 'react-router-dom';
import { FaUsers, FaClock, FaTrophy } from 'react-icons/fa';

const ChallengeCard = ({ challenge }) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={challenge.imageUrl}
          alt={challenge.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
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

        {/* Difficulty & Button */}
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[challenge.difficulty]}`}>
            {challenge.difficulty}
          </span>
          <Link
            to={`/challenges/${challenge._id}`}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;