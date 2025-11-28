// ChallengePreview.jsx
import { Link } from 'react-router-dom';
import { FaUsers, FaClock, FaTrophy } from 'react-icons/fa';
import { useState } from 'react';

const ChallengePreview = ({ challenge }) => {
  const [imageError, setImageError] = useState(false);

  const categoryConfig = {
    'Energy Conservation': { 
      gradient: 'from-blue-500 to-blue-600',
      icon: '⚡',
      lightBg: 'bg-blue-50'
    },
    'Water Conservation': { 
      gradient: 'from-cyan-500 to-cyan-600',
      icon: '💧',
      lightBg: 'bg-cyan-50'
    },
    'Waste Reduction': { 
      gradient: 'from-orange-500 to-orange-600',
      icon: '♻️',
      lightBg: 'bg-orange-50'
    },
    'Sustainable Transport': { 
      gradient: 'from-purple-500 to-purple-600',
      icon: '🚴',
      lightBg: 'bg-purple-50'
    },
    'Green Living': { 
      gradient: 'from-green-500 to-green-600',
      icon: '🌿',
      lightBg: 'bg-green-50'
    },
    'Sustainable Living': { 
      gradient: 'from-emerald-500 to-emerald-600',
      icon: '🌍',
      lightBg: 'bg-emerald-50'
    },
    Other: { 
      gradient: 'from-gray-500 to-gray-600',
      icon: '🎯',
      lightBg: 'bg-gray-50'
    }
  };

  const categoryInfo = categoryConfig[challenge.category] || categoryConfig.Other;

  return (
    <Link to={`/challenges/${challenge._id}`}>
      <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          {!imageError && challenge.imageUrl ? (
            <img
              src={challenge.imageUrl}
              alt={challenge.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${categoryInfo.gradient} flex items-center justify-center`}>
              <span className="text-6xl">{categoryInfo.icon}</span>
            </div>
          )}
          
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Category Badge */}
          <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-gradient-to-r ${categoryInfo.gradient} text-white text-xs font-bold shadow-lg flex items-center gap-1.5`}>
            <span>{categoryInfo.icon}</span>
            <span>{challenge.category}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-green-600 transition-colors duration-300">
            {challenge.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {challenge.description}
          </p>

          {/* Metrics */}
          <div className="flex items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-1.5 text-gray-700">
              <FaUsers className="text-green-600" />
              <span className="font-semibold">{challenge.participants || 0}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-700">
              <FaClock className="text-blue-600" />
              <span className="font-semibold">{challenge.duration || 30}d</span>
            </div>
            {challenge.points && (
              <div className="flex items-center gap-1.5 text-gray-700">
                <FaTrophy className="text-yellow-600" />
                <span className="font-semibold">{challenge.points}pts</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Accent Bar */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryInfo.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
      </div>
    </Link>
  );
};

export default ChallengePreview;