// src/components/events/EventCard.jsx
import { FaClock, FaMapMarkerAlt, FaUsers, FaTrophy, FaTree, FaRecycle, FaSeedling, FaLeaf, FaCalendarAlt, FaLightbulb, FaLaptop, FaGlobeAmericas, FaWater } from 'react-icons/fa';

const EventCard = ({ event }) => {
  // Safety check - if no event data, return null
  if (!event) return null;

  const getLocationIcon = (type) => {
    const icons = {
      Online: <FaLaptop className="text-blue-600" />,
      Physical: <FaMapMarkerAlt className="text-red-600" />,
      Hybrid: <FaGlobeAmericas className="text-purple-600" />
    };
    return icons[type] || <FaMapMarkerAlt className="text-gray-600" />;
  };

  // Function to get image based on title keywords
  const getImageFromTitle = (title, category) => {
    if (!title) return getCategoryImage(category);
    
    const lowerTitle = title.toLowerCase();
    
    // Check title keywords first
    if (lowerTitle.includes('tree') || lowerTitle.includes('plant') || lowerTitle.includes('forest')) {
      return 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop';
    }
    if (lowerTitle.includes('beach') || lowerTitle.includes('ocean') || lowerTitle.includes('cleanup')) {
      return 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop';
    }
    if (lowerTitle.includes('garden') || lowerTitle.includes('vegetable') || lowerTitle.includes('farming')) {
      return 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop';
    }
    if (lowerTitle.includes('recycle') || lowerTitle.includes('waste') || lowerTitle.includes('trash')) {
      return 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop';
    }
    if (lowerTitle.includes('workshop') || lowerTitle.includes('training') || lowerTitle.includes('seminar')) {
      return 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop';
    }
    if (lowerTitle.includes('awareness') || lowerTitle.includes('campaign') || lowerTitle.includes('education')) {
      return 'https://images.unsplash.com/photo-1501901609772-df0848060b33?w=800&auto=format&fit=crop';
    }
    if (lowerTitle.includes('water') || lowerTitle.includes('river') || lowerTitle.includes('lake')) {
      return 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop';
    }
    if (lowerTitle.includes('solar') || lowerTitle.includes('energy') || lowerTitle.includes('renewable')) {
      return 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop';
    }
    if (lowerTitle.includes('wildlife') || lowerTitle.includes('animal') || lowerTitle.includes('bird')) {
      return 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&auto=format&fit=crop';
    }
    if (lowerTitle.includes('plastic') || lowerTitle.includes('pollution')) {
      return 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&auto=format&fit=crop';
    }
    if (lowerTitle.includes('compost') || lowerTitle.includes('organic')) {
      return 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop';
    }
    if (lowerTitle.includes('bike') || lowerTitle.includes('cycling') || lowerTitle.includes('bicycle')) {
      return 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop';
    }
    if (lowerTitle.includes('climate') || lowerTitle.includes('earth') || lowerTitle.includes('global')) {
      return 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop';
    }
    
    // Fallback to category-based images
    return getCategoryImage(category);
  };

  const getCategoryImage = (category) => {
    const categoryImages = {
      'Tree Planting': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop',
      'Beach Cleanup': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop',
      'Community Garden': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop',
      'Recycling Drive': 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop',
      'Workshop': 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop',
      'Awareness Campaign': 'https://images.unsplash.com/photo-1501901609772-df0848060b33?w=800&auto=format&fit=crop',
      'Environmental': 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop',
      'Event': 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&auto=format&fit=crop'
    };
    return categoryImages[category] || categoryImages.Event;
  };

  const getCategoryConfig = (category) => {
    const configs = {
      'Tree Planting': { 
        gradient: 'from-green-500 to-emerald-600',
        icon: <FaTree className="text-white" />
      },
      'Beach Cleanup': { 
        gradient: 'from-cyan-500 to-blue-600',
        icon: <FaWater className="text-white" />
      },
      'Community Garden': { 
        gradient: 'from-lime-500 to-green-600',
        icon: <FaSeedling className="text-white" />
      },
      'Recycling Drive': { 
        gradient: 'from-orange-500 to-red-600',
        icon: <FaRecycle className="text-white" />
      },
      'Workshop': { 
        gradient: 'from-purple-500 to-indigo-600',
        icon: <FaUsers className="text-white" />
      },
      'Awareness Campaign': { 
        gradient: 'from-yellow-500 to-orange-600',
        icon: <FaLightbulb className="text-white" />
      },
      'Environmental': { 
        gradient: 'from-teal-500 to-cyan-600',
        icon: <FaLeaf className="text-white" />
      },
      'Event': { 
        gradient: 'from-emerald-500 to-green-600',
        icon: <FaCalendarAlt className="text-white" />
      }
    };
    return configs[category] || configs.Event;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBA';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (error) {
      return 'Date TBA';
    }
  };

  const categoryConfig = getCategoryConfig(event.category || 'Event');
  const eventImage = getImageFromTitle(event.title, event.category);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0 bg-gray-100">
        <img 
          src={eventImage}
          alt={event.title || 'Event'}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x400/10b981/ffffff?text=Event';
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {event.featured && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1.5 bg-yellow-400 text-yellow-900 rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm flex items-center gap-1">
              <FaTrophy className="w-3 h-3" />
              Featured
            </span>
          </div>
        )}

        <div className={`absolute top-3 right-3 z-10 px-3 py-1.5 rounded-lg bg-gradient-to-r ${categoryConfig.gradient} text-white text-xs font-bold shadow-lg backdrop-blur-sm flex items-center gap-1`}>
          {categoryConfig.icon}
          <span>{event.category || 'Event'}</span>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-green-600 transition-colors">
          {event.title || 'Untitled Event'}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
          {event.description || 'No description available'}
        </p>

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

        {event.location && (
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-4">
            {typeof event.location === 'string' ? (
              <>
                <FaMapMarkerAlt className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span className="font-medium truncate">{event.location}</span>
              </>
            ) : (
              <>
                {getLocationIcon(event.location?.type)}
                <span className="font-medium">{event.location?.type || 'Location TBA'}</span>
              </>
            )}
          </div>
        )}

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

      <div className={`h-1 bg-gradient-to-r ${categoryConfig.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
    </div>
  );
};

export default EventCard;