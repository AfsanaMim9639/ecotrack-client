
import { useEffect, useState } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { FaLeaf, FaUsers, FaTrophy, FaCalendarAlt, FaHeart, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Home = () => {
  const [stats, setStats] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [tips, setTips] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchChallenges();
    fetchTips();
    fetchEvents();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/stats/live');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchChallenges = async () => {
    try {
      const response = await api.get('/challenges?limit=6');
      setChallenges(response.data.data || []);
    } catch (error) {
      console.error('Error fetching challenges:', error);
      setChallenges([]);
    }
  };

  const fetchTips = async () => {
    try {
      // ✅ Fixed: Remove featured filter, just get latest tips
      console.log('🔍 Fetching tips...');
      const response = await api.get('/tips?limit=6');
      
      console.log('✅ Tips response:', response.data);
      
      if (response.data.success && response.data.data) {
        setTips(response.data.data);
        console.log('📝 Tips set:', response.data.data.length);
      } else {
        setTips([]);
        console.log('⚠️ No tips data found');
      }
    } catch (error) {
      console.error('❌ Error fetching tips:', error);
      setTips([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events/upcoming?limit=6');
      setEvents(response.data.data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroBanner />

      {/* Live Statistics */}
      {stats && (
        <div className="max-w-6xl mx-auto px-6 -mt-16 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              icon={<FaLeaf className="text-3xl text-green-600" />}
              value={stats.activeChallenges}
              label="Active Challenges"
            />
            <StatCard
              icon={<FaUsers className="text-3xl text-blue-600" />}
              value={stats.totalParticipants}
              label="Total Participants"
            />
            <StatCard
              icon={<FaTrophy className="text-3xl text-yellow-600" />}
              value={stats.completedChallenges}
              label="Completed"
            />
            <StatCard
              icon={<FaCalendarAlt className="text-3xl text-purple-600" />}
              value={stats.upcomingEvents}
              label="Upcoming Events"
            />
          </div>
        </div>
      )}

      {/* Featured Challenges */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Challenges
        </h2>
        {challenges.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {challenges.map((challenge) => (
                <ChallengePreview key={challenge._id} challenge={challenge} />
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/challenges"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                View All Challenges
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No challenges available
          </div>
        )}
      </div>

      {/* Green Living Tips Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              💡 Green Living Tips
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple daily actions to make a big environmental impact
            </p>
          </div>

          {/* Debug Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm">
            <strong>Debug:</strong> Tips Count: {tips.length} | Loading: {loading ? 'Yes' : 'No'}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="ml-4 text-gray-600">Loading tips...</p>
            </div>
          ) : tips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip) => (
                <TipCard key={tip._id} tip={tip} />  
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 text-lg mb-2">No tips available yet</p>
              <p className="text-gray-500 text-sm">Check back soon for eco-friendly tips!</p>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              📅 Upcoming Events
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join community events and make a difference together
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />  
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No upcoming events
            </div>
          )}
        </div>
      </div>

      {/* Why Go Green Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Go Green? 🌍
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Make an Impact"
              description="Every small action counts towards a healthier planet"
              icon="🌱"
            />
            <FeatureCard
              title="Join a Community"
              description="Connect with like-minded eco-warriors worldwide"
              icon="👥"
            />
            <FeatureCard
              title="Track Progress"
              description="Monitor your environmental impact and earn rewards"
              icon="📊"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, value, label }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
    <div className="flex justify-center mb-3">{icon}</div>
    <div className="text-3xl font-bold text-gray-800 mb-1">{value || 0}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

const ChallengePreview = ({ challenge }) => (
  <Link
    to={`/challenges/${challenge._id}`}
    className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-5 transform hover:-translate-y-1 duration-300"
  >
    <h3 className="font-bold text-lg mb-2 text-gray-800">{challenge.title}</h3>
    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{challenge.description}</p>
    <div className="flex items-center justify-between text-sm">
      <span className="text-green-600 font-semibold">{challenge.duration} days</span>
      <span className="text-yellow-600 font-semibold">{challenge.points || 0} points</span>
    </div>
  </Link>
);

const TipCard = ({ tip }) => {
  const getImpactColor = (impact) => {
    const colors = {
      Low: 'text-yellow-600 bg-yellow-50',
      Medium: 'text-orange-600 bg-orange-50',
      High: 'text-green-600 bg-green-50'
    };
    return colors[impact] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer group">
      {/* Icon & Category */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-4xl">{tip.icon || '💡'}</span>
        <span className="text-xs font-semibold text-gray-500 uppercase">
          {tip.category || 'General'}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
        {tip.title}
      </h3>

      {/* Description or Content */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {tip.description || tip.content || 'No description available'}
      </p>

      {/* Impact Badge & Likes */}
      <div className="flex items-center justify-between">
        {tip.impactLevel && (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getImpactColor(tip.impactLevel)}`}>
            {tip.impactLevel} Impact
          </span>
        )}
        
        <div className="flex items-center gap-2 text-gray-500">
          <FaHeart className="w-4 h-4" />
          <span className="text-sm">{tip.likes || tip.upvotes || 0}</span>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event }) => {
  const getLocationIcon = (type) => {
    const icons = {
      Online: '💻',
      Physical: '📍',
      Hybrid: '🌐'
    };
    return icons[type] || '📍';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
      {/* Event Image */}
      <div className="relative h-48 bg-gradient-to-br from-green-400 to-blue-500 overflow-hidden">
        {event.imageUrl ? (
          <img 
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Event';
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-6xl">🌱</span>
          </div>
        )}
        
        {event.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className="p-5">
        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold mb-3">
          {event.category || 'Event'}
        </span>

        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
          {event.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <FaClock className="w-4 h-4" />
          <span>{new Date(event.eventDate || event.date).toLocaleDateString()}</span>
          {event.eventTime && (
            <>
              <span className="mx-1">•</span>
              <span>{event.eventTime}</span>
            </>
          )}
        </div>

        {event.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <FaMapMarkerAlt className="w-4 h-4" />
            <span>
              {typeof event.location === 'string' 
                ? event.location 
                : `${getLocationIcon(event.location.type)} ${event.location.type}`
              }
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm">
            <span className="text-gray-600">Registered:</span>
            <span className="font-semibold text-gray-800 ml-1">
              {event.registeredCount || event.currentParticipants || 0}/{event.capacity || event.maxParticipants || 0}
            </span>
          </div>
          {event.points && (
            <div className="text-sm font-semibold text-green-600">
              +{event.points} pts
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => (
  <div className="text-center">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;


