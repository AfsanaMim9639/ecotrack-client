import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  FaCalendarAlt, 
  FaLaptop, 
  FaMapMarkerAlt, 
  FaGlobeAmericas,
  FaTree,
  FaWater,
  FaSeedling,
  FaRecycle,
  FaUsers,
  FaLightbulb,
  FaLeaf,
  FaClock,
  FaTrophy
} from 'react-icons/fa';

const UpcomingEventsSection = () => {
  const { isDark } = useTheme();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const mockEvents = [
        {
          _id: '1',
          title: 'Community Tree Planting Drive',
          description: 'Join us to plant 500 trees in the local park',
          category: 'Tree Planting',
          eventDate: '2025-12-15',
          eventTime: '9:00 AM',
          location: 'Central Park',
          capacity: 100,
          registeredCount: 45,
          points: 50,
          featured: true
        },
        {
          _id: '2',
          title: 'Beach Cleanup Campaign',
          description: 'Help us clean our beautiful beaches',
          category: 'Beach Cleanup',
          eventDate: '2025-12-20',
          eventTime: '7:00 AM',
          location: 'Cox\'s Bazar Beach',
          capacity: 80,
          registeredCount: 62,
          points: 40
        },
        {
          _id: '3',
          title: 'Urban Gardening Workshop',
          description: 'Learn sustainable gardening techniques',
          category: 'Community Garden',
          eventDate: '2025-12-22',
          eventTime: '2:00 PM',
          location: { type: 'Online' },
          capacity: 50,
          registeredCount: 30,
          points: 30
        },
        {
          _id: '4',
          title: 'Recycling Awareness Drive',
          description: 'Educational campaign on recycling best practices',
          category: 'Recycling Drive',
          eventDate: '2025-12-25',
          eventTime: '10:00 AM',
          location: 'Community Center',
          capacity: 150,
          registeredCount: 95,
          points: 35
        },
        {
          _id: '5',
          title: 'Climate Action Workshop',
          description: 'Interactive session on fighting climate change',
          category: 'Workshop',
          eventDate: '2025-12-28',
          eventTime: '3:00 PM',
          location: { type: 'Hybrid' },
          capacity: 60,
          registeredCount: 40,
          points: 45
        },
        {
          _id: '6',
          title: 'Water Conservation Campaign',
          description: 'Learn water saving techniques for homes',
          category: 'Awareness Campaign',
          eventDate: '2025-12-30',
          eventTime: '11:00 AM',
          location: 'City Hall',
          capacity: 120,
          registeredCount: 75,
          points: 40
        }
      ];
      
      setTimeout(() => {
        setEvents(mockEvents);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden py-20">
      {/* Animated Forest Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=2560&auto=format&fit=crop')`,
            animation: 'slowZoom 30s ease-in-out infinite alternate'
          }}
        ></div>
        
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-green-950/85 via-emerald-950/80 to-teal-950/85' : 'bg-gradient-to-br from-green-900/75 via-emerald-900/70 to-teal-900/75'}`}></div>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 left-10 w-40 h-40 ${isDark ? 'bg-green-400/25' : 'bg-green-400/20'} rounded-full blur-3xl animate-float-diagonal`}></div>
          <div className={`absolute bottom-32 right-20 w-48 h-48 ${isDark ? 'bg-emerald-300/25' : 'bg-emerald-300/20'} rounded-full blur-3xl animate-float-reverse animation-delay-2000`}></div>
          <div className={`absolute top-1/2 left-1/3 w-36 h-36 ${isDark ? 'bg-teal-300/25' : 'bg-teal-300/20'} rounded-full blur-3xl animate-float-diagonal animation-delay-4000`}></div>
          <div className={`absolute bottom-20 left-1/4 w-32 h-32 ${isDark ? 'bg-lime-300/25' : 'bg-lime-300/20'} rounded-full blur-3xl animate-float-reverse animation-delay-3000`}></div>
        </div>

        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${isDark ? 'opacity-20' : 'opacity-30'}`}>
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(134, 239, 172, 0.3) 50%, transparent 70%)',
              animation: 'wave 8s linear infinite',
              backgroundSize: '200% 200%'
            }}
          ></div>
        </div>

        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${isDark ? 'opacity-10' : 'opacity-15'}`}>
          <div className="absolute top-0 left-1/4 w-32 h-full bg-gradient-to-b from-white/40 via-transparent to-transparent transform -skew-x-12 animate-beam-slow"></div>
          <div className="absolute top-0 right-1/3 w-24 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent transform skew-x-12 animate-beam-slow animation-delay-3000"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-1/5 w-1 h-1 ${isDark ? 'bg-green-300' : 'bg-green-200'} rounded-full animate-twinkle`}></div>
          <div className={`absolute top-1/3 right-1/4 w-1 h-1 ${isDark ? 'bg-emerald-300' : 'bg-emerald-200'} rounded-full animate-twinkle animation-delay-1000`}></div>
          <div className={`absolute bottom-1/3 left-2/3 w-1 h-1 ${isDark ? 'bg-teal-300' : 'bg-teal-200'} rounded-full animate-twinkle animation-delay-2000`}></div>
          <div className={`absolute top-2/3 right-1/3 w-1 h-1 ${isDark ? 'bg-lime-300' : 'bg-lime-200'} rounded-full animate-twinkle animation-delay-3000`}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 ${isDark ? 'bg-white/10 border-white/30' : 'bg-white/15 border-white/20'} backdrop-blur-md px-6 py-2 rounded-full mb-4 border`}>
            <FaCalendarAlt className={`${isDark ? 'text-green-400' : 'text-green-300'}`} />
            <span className="text-white font-semibold text-sm uppercase tracking-wider">
              Community Events
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            📅 Upcoming Events
          </h2>
          <p className={`${isDark ? 'text-white/90' : 'text-white/95'} text-lg max-w-2xl mx-auto drop-shadow-lg`}>
            Join community events and make a difference together
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-white/30 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="ml-4 text-white font-medium text-lg">Loading events...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <EventCard 
                key={event._id || event.id || `event-${index}`} 
                event={event}
                index={index}
                isDark={isDark}
              />  
            ))}
          </div>
        ) : (
          <div className={`text-center py-16 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/10 border-white/20'} backdrop-blur-lg rounded-3xl shadow-2xl border`}>
            <div className="text-6xl mb-4">📅</div>
            <p className="text-white text-2xl font-semibold mb-2">No upcoming events</p>
            <p className={`${isDark ? 'text-white/70' : 'text-white/80'} text-lg`}>Check back soon for community events!</p>
          </div>
        )}
      </div>

      {/* Advanced CSS Animations */}
      <style>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }

        @keyframes float-diagonal {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(50px, -50px) scale(1.2);
            opacity: 0.6;
          }
        }

        @keyframes float-reverse {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.4;
          }
          33% {
            transform: translate(-40px, 30px) rotate(120deg);
            opacity: 0.7;
          }
          66% {
            transform: translate(20px, -40px) rotate(240deg);
            opacity: 0.5;
          }
        }

        @keyframes wave {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 200%; }
        }

        @keyframes beam-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .animate-float-diagonal {
          animation: float-diagonal 10s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 12s ease-in-out infinite;
        }

        .animate-beam-slow {
          animation: beam-slow 6s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

const EventCard = ({ event, index, isDark }) => {
  if (!event) return null;

  const IMAGES = [
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501901609772-df0848060b33?w=800&auto=format&fit=crop'
  ];

  const getLocationIcon = (type) => {
    const iconColor = isDark ? 'text-blue-400' : 'text-blue-600';
    const redColor = isDark ? 'text-red-400' : 'text-red-600';
    const purpleColor = isDark ? 'text-purple-400' : 'text-purple-600';
    const grayColor = isDark ? 'text-gray-400' : 'text-gray-600';
    
    const icons = {
      Online: <FaLaptop className={iconColor} />,
      Physical: <FaMapMarkerAlt className={redColor} />,
      Hybrid: <FaGlobeAmericas className={purpleColor} />
    };
    return icons[type] || <FaMapMarkerAlt className={grayColor} />;
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
  const eventImage = IMAGES[index % IMAGES.length];

  return (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col border`}>
      <div className={`relative h-48 overflow-hidden flex-shrink-0 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <img 
          src={eventImage}
          alt={event.title || 'Event'}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
        <h3 className={`text-lg font-bold ${isDark ? 'text-white group-hover:text-green-400' : 'text-gray-900 group-hover:text-green-600'} mb-2 line-clamp-2 min-h-[3rem] transition-colors`}>
          {event.title || 'Untitled Event'}
        </h3>

        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4 line-clamp-2 leading-relaxed flex-grow`}>
          {event.description || 'No description available'}
        </p>

        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          <FaClock className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'} flex-shrink-0`} />
          <span className="font-medium">{formatDate(event.eventDate || event.date)}</span>
          {event.eventTime && (
            <>
              <span className={`${isDark ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{event.eventTime}</span>
            </>
          )}
        </div>

        {event.location && (
          <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
            {typeof event.location === 'string' ? (
              <>
                <FaMapMarkerAlt className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-600'} flex-shrink-0`} />
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

        <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'} mt-auto`}>
          <div className="flex items-center gap-2">
            <FaUsers className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            <div className="text-sm">
              <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {event.registeredCount || event.currentParticipants || 0}
              </span>
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>/{event.capacity || event.maxParticipants || 0}</span>
            </div>
          </div>
          
          {event.points && (
            <div className={`flex items-center gap-1 ${isDark ? 'bg-green-900/30' : 'bg-green-50'} px-3 py-1.5 rounded-lg`}>
              <FaTrophy className={`w-3 h-3 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <span className={`text-sm font-bold ${isDark ? 'text-green-400' : 'text-green-700'}`}>+{event.points}</span>
            </div>
          )}
        </div>
      </div>

      <div className={`h-1 bg-gradient-to-r ${categoryConfig.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
    </div>
  );
};

export default UpcomingEventsSection;