import { useEffect, useState } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { FaLeaf, FaUsers, FaTrophy, FaCalendarAlt } from 'react-icons/fa';

const Home = () => {
  const [stats, setStats] = useState(null);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchChallenges();
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
      setChallenges(response.data.data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
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
    <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
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
      <span className="text-yellow-600 font-semibold">{challenge.points} points</span>
    </div>
  </Link>
);

const FeatureCard = ({ title, description, icon }) => (
  <div className="text-center">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;