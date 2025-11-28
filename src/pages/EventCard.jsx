// src/components/events/EventCard.jsx
import { useState } from 'react';
import { 
  FaClock, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaTrophy, 
  FaTree, 
  FaRecycle, 
  FaSeedling, 
  FaLeaf, 
  FaCalendarAlt, 
  FaLightbulb, 
  FaLaptop, 
  FaGlobeAmericas 
} from 'react-icons/fa';

const EventCard = ({ event }) => {
  const [imageError, setImageError] = useState(false);

  const getLocationIcon = (type) => {
    const icons = {
      Online: <FaLaptop className="text-blue-600" />,
      Physical: <FaMapMarkerAlt className="text-red-600" />,
      Hybrid: <FaGlobeAmericas className="text-purple-600" />
    };
    return icons[type] || <FaMapMarkerAlt className="text-gray-600" />;
  };

  const getCategoryConfig = (category) => {
    const configs = {
      'Tree Planting': { 
        gradient: 'from-green-500 to-emerald-600',
        icon: <FaTree className="text-white" />,
        fallbackImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop'
      },
      'Beach Cleanup': { 
        gradient: 'from-cyan-500 to-blue-600',
        icon: <FaLeaf className="text-white" />,
        fallbackImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop'
      },
      'Community Garden': { 
        gradient: 'from-lime-500 to-green-600',
        icon: <FaSeedling className="text-white" />,
        fallbackImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop'
      },
      'Recycling Drive': { 
        gradient: 'from-orange-500 to-red-600',
        icon: <FaRecycle className="text-white" />,
        fallbackImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop'
      },
      'Workshop': { 
        gradient: 'from-purple-500 to-indigo-600',
        icon: <FaUsers className="text-white" />,
        fallbackImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop'
      },
      'Awareness Campaign': { 
        gradient: 'from-yellow-500 to-orange-600',
        icon: <FaLightbulb className="text-white" />,
        fallbackImage: 'https://images.unsplash.com/photo-1501901609772-df0848060b33?w=800&auto=format&fit=crop'
      },
      'Environmental': { 
        gradient: 'from-teal-500 to-cyan-600',
        icon: <FaLeaf className="text-white" />,
        fallbackImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop'
      },
      'Event': { 
        gradient: 'from-emerald-500 to-green-600',
        icon: <FaCalendarAlt className="text-white" />,
        fallbackImage: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&auto=format&fit=crop'
      }
    };
    return configs[category] || configs.Event;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const categoryConfig = getCategoryConfig(event.category);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col">
      {/* Event Image - Fixed Height */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {!imageError && event.imageUrl ? (
          <img 
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="relative w-full h-full">
            <img 
              src={categoryConfig.fallbackImage}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${categoryConfig.gradient} opacity-40`}></div>
          </div>
        )}
        
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Featured Badge */}
        {event.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1.5 bg-yellow-400 text-yellow-900 rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm flex items-center gap-1">
              <FaTrophy className="w-3 h-3" />
              Featured
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-gradient-to-r ${categoryConfig.gradient} text-white text-xs font-bold shadow-lg backdrop-blur-sm flex items-center gap-1`}>
          {categoryConfig.icon}
          <span>{event.category || 'Event'}</span>
        </div>
      </div>

      {/* Event Details - Flexible Height */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-green-600 transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
          {event.description}
        </p>

        {/* Date & Time */}
        <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
          <FaClock className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span className="font-medium">{formatDate(event.eventDate || event.date)}</span>
          {event.eventTime && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{event.eventTime}</span>
            </>
          )}
        </div>

        {/* Location */}
        {event.location && (
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
            {typeof event.location === 'string' ? (
              <>
                <FaMapMarkerAlt className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span className="font-medium truncate">{event.location}</span>
              </>
            ) : (
              <>
                {getLocationIcon(event.location.type)}
                <span className="font-medium">{event.location.type}</span>
              </>
            )}
          </div>
        )}

        {/* Footer - Registration & Points */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-2">
            <FaUsers className="w-4 h-4 text-green-600" />
            <div className="text-sm">
              <span className="font-bold text-gray-900">
                {event.registeredCount || event.currentParticipants || 0}
              </span>
              <span className="text-gray-500">/{event.capacity || event.maxParticipants || 0}</span>
            </div>
          </div>
          
          {event.points && (
            <div className="flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-lg">
              <FaTrophy className="w-3 h-3 text-yellow-600" />
              <span className="text-sm font-bold text-green-700">+{event.points}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className={`h-1 bg-gradient-to-r ${categoryConfig.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
    </div>
  );
};

export default EventCard;