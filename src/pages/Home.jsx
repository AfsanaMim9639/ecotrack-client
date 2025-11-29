
import { useEffect, useState } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import api from '../services/api';
import { Link } from 'react-router-dom';
//import { FaLeaf, FaUsers, FaTrophy, FaCalendarAlt, FaHeart, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import LiveStatistics from '../components/home/LiveStatistics';

import { FaHeart,FaTree,FaWater,FaUsers, FaCalendarAlt, FaUser, FaTrophy, FaMapMarkerAlt,FaClock, FaLeaf, FaBolt, FaTint, FaRecycle, FaBicycle, FaSeedling, FaUtensils, FaGlobeAmericas, FaLightbulb } from 'react-icons/fa';
import WhyGoGreenSection from './WhyGoGreenSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import UpcomingEventsSection from '../components/home/UpcomingEventsSection';



const Home = () => {
  
  const [challenges, setChallenges] = useState([]);
  const [tips, setTips] = useState([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetchChallenges();
    fetchTips();
    
  }, []);

  

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
      
      const response = await api.get('/tips?limit=6');
      
      
      if (response.data.success && response.data.data) {
        setTips(response.data.data);
        
      } else {
        setTips([]);
        
      }
    } catch (error) {
      console.error('❌ Error fetching tips:', error);
      setTips([]);
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroBanner />

      {/* Live Statistics */}
      <LiveStatistics />
      {/* Featured Challenges */}
     <div className="relative py-20 overflow-hidden">
  {/* Deep Green Forest Background */}
  <div className="absolute inset-0">
    {/* Forest Background Image */}
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2560&auto=format&fit=crop')`,
      }}
    ></div>
    
    {/* Deep Green Transparent Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-emerald-900/80 to-teal-900/85"></div>
    
    {/* Animated Floating Leaves/Particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-8 h-8 bg-green-300/20 rounded-full blur-xl animate-float-slow"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-emerald-300/15 rounded-full blur-xl animate-float-medium"></div>
      <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-teal-300/20 rounded-full blur-xl animate-float-slow animation-delay-2000"></div>
      <div className="absolute top-60 right-1/3 w-6 h-6 bg-green-200/25 rounded-full blur-lg animate-float-medium animation-delay-4000"></div>
      <div className="absolute bottom-40 right-1/4 w-14 h-14 bg-emerald-200/15 rounded-full blur-2xl animate-float-slow animation-delay-3000"></div>
    </div>

    {/* Subtle Light Rays */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <div className="absolute top-0 left-1/4 w-32 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent transform -skew-x-12"></div>
      <div className="absolute top-0 right-1/3 w-24 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform skew-x-12 animation-delay-2000"></div>
    </div>
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-6xl mx-auto px-6">
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-6 py-2 rounded-full mb-4 border border-white/20">
        <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
        <span className="text-white font-semibold text-sm uppercase tracking-wider">
          🌿 Take Action
        </span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
        Featured Challenges
      </h2>
      <p className="text-white/95 text-lg max-w-2xl mx-auto drop-shadow-lg">
        Join our community and make a real environmental impact
      </p>
    </div>

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
            className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <span>View All Challenges</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </>
    ) : (
      <div className="text-center py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 max-w-md mx-auto border border-white/20 shadow-2xl">
          <div className="text-6xl mb-4">🌱</div>
          <p className="text-white text-lg font-semibold">
            No challenges available
          </p>
        </div>
      </div>
    )}
  </div>

  {/* CSS Animations */}
  <style jsx="true">{`
    @keyframes float-slow {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        opacity: 0.3;
      }
      50% {
        transform: translate(30px, -50px) scale(1.2);
        opacity: 0.6;
      }
    }

    @keyframes float-medium {
      0%, 100% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0.4;
      }
      33% {
        transform: translate(40px, -30px) rotate(120deg);
        opacity: 0.7;
      }
      66% {
        transform: translate(-20px, -60px) rotate(240deg);
        opacity: 0.5;
      }
    }

    .animate-float-slow {
      animation: float-slow 8s ease-in-out infinite;
    }

    .animate-float-medium {
      animation: float-medium 6s ease-in-out infinite;
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

      
     {/* Green Living Tips Section */}
<div className="relative overflow-hidden py-20">
  {/* Deep Forest Background - Similar to LiveStatistics */}
  <div className="absolute inset-0">
    {/* Forest Background Image */}
    <div 
      className="absolute inset-0 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2560&auto=format&fit=crop')`,
      }}
    ></div>
    
    {/* Deep Green Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-emerald-900/80 to-teal-900/85"></div>
    
    {/* Animated Floating Particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-32 h-32 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-300/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-teal-300/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
    </div>

    {/* Subtle Light Rays */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <div className="absolute top-0 left-1/4 w-24 h-full bg-gradient-to-b from-white/30 via-transparent to-transparent transform -skew-x-12"></div>
      <div className="absolute top-0 right-1/3 w-20 h-full bg-gradient-to-b from-white/20 via-transparent to-transparent transform skew-x-12"></div>
    </div>
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-6xl mx-auto px-6">
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-6 py-2 rounded-full mb-4 border border-white/20">
        <FaLightbulb className="text-yellow-300" />
        <span className="text-white font-semibold text-sm uppercase tracking-wider">
          Green Living Tips
        </span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
        💡 Eco-Friendly Tips
      </h2>
      <p className="text-white/95 text-lg max-w-2xl mx-auto drop-shadow-lg">
        Simple daily actions to make a big environmental impact
      </p>
    </div>

    {loading ? (
      <div className="flex justify-center items-center py-12">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/30 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="ml-4 text-white font-medium text-lg">Loading tips...</p>
      </div>
    ) : tips.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <div
            key={tip._id}
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            <TipCard tip={tip} />
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-16 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20">
        <div className="text-6xl mb-4">💡</div>
        <p className="text-white text-2xl font-semibold mb-2">No tips available yet</p>
        <p className="text-white/80 text-lg">Check back soon for eco-friendly tips!</p>
      </div>
    )}
  </div>

  {/* Custom Animations */}
  <style>{`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animation-delay-2000 {
      animation-delay: 2s;
    }

    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `}</style>
</div>

{/* Upcoming Events Section */}
<UpcomingEventsSection />

      {/* Why Go Green Section */}
      <WhyGoGreenSection />

      {/*How It Work Section*/}
      <HowItWorksSection />
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
        {/* Image Section - MongoDB থেকে image */}
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
          {challenge.category && (
            <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-gradient-to-r ${categoryInfo.gradient} text-white text-xs font-bold shadow-lg flex items-center gap-1.5`}>
              <span>{categoryInfo.icon}</span>
              <span>{challenge.category}</span>
            </div>
          )}
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

          {/* Metrics - Duration & Points */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-gray-700">
              <FaClock className="text-blue-600" />
              <span className="font-semibold">{challenge.duration || 30} days</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-700">
              <FaTrophy className="text-yellow-600" />
              <span className="font-semibold">{challenge.points || 0} pts</span>
            </div>
          </div>
        </div>

        {/* Bottom Accent Bar */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryInfo.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
      </div>
    </Link>
  );
};


const TipCard = ({ tip }) => {
  const getImpactColor = (impact) => {
    const colors = {
      Low: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      Medium: 'text-orange-600 bg-orange-50 border-orange-200',
      High: 'text-green-600 bg-green-50 border-green-200'
    };
    return colors[impact] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Energy Conservation': <FaBolt className="text-blue-600" />,
      'Water Conservation': <FaTint className="text-cyan-600" />,
      'Waste Reduction': <FaRecycle className="text-orange-600" />,
      'Sustainable Transport': <FaBicycle className="text-purple-600" />,
      'Green Living': <FaLeaf className="text-green-600" />,
      'Food & Diet': <FaUtensils className="text-emerald-600" />,
      'Sustainable Living': <FaGlobeAmericas className="text-teal-600" />,
      General: <FaLightbulb className="text-yellow-600" />
    };
    return icons[category] || <FaLightbulb className="text-yellow-600" />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer group border border-gray-100 hover:border-green-200">
      {/* Header - Icon & Category */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Category Icon */}
          <div className="text-5xl group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl">
            {getCategoryIcon(tip.category)}
          </div>
          <div>
            {tip.category && (
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {tip.category}
              </span>
            )}
          </div>
        </div>
        
        {/* Impact Badge */}
        {tip.impactLevel && (
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getImpactColor(tip.impactLevel)}`}>
            {tip.impactLevel}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
        {tip.title}
      </h3>

      {/* Preview/Description */}
      <p className="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed">
        {tip.preview || tip.description || tip.content || 'No preview available'}
      </p>

      {/* Footer - Author, Date, Upvotes */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        {/* Author & Date */}
        <div className="flex items-center gap-3">
          {/* Author Avatar with Icon */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white shadow-md">
            <FaUser className="w-4 h-4" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">
              {tip.authorName || 'Anonymous'}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FaClock className="w-3 h-3" />
              <span>{tip.createdAt ? formatDate(tip.createdAt) : 'Recently'}</span>
            </div>
          </div>
        </div>

        {/* Upvotes */}
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg group-hover:bg-green-50 transition-colors">
          <FaHeart className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-bold text-gray-800">
            {tip.upvotes || tip.likes || 0}
          </span>
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"></div>
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


