import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  FaLeaf, 
  FaUsers, 
  FaTrophy, 
  FaCalendarAlt,
  FaRecycle,
  FaWater,
  FaTree,
  FaCloudSun,
  FaChartLine
} from 'react-icons/fa';

const LiveStatistics = () => {
  const { isDark } = useTheme();
  const [stats] = useState({
    activeChallenges: 45,
    totalParticipants: 1250,
    completedChallenges: 320,
    upcomingEvents: 12,
    environmentalImpact: {
      co2Saved: 15420,
      plasticReduced: 8960,
      waterSaved: 45780,
      treesPlanted: 1580
    }
  });
  const [loading] = useState(false);

  if (loading) {
    return (
      <div className={`relative py-20 ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`${isDark ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-2xl p-6 animate-pulse`}>
                <div className={`h-12 w-12 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full mb-4`}></div>
                <div className={`h-8 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
                <div className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-2/3`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Forest Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop')`,
          }}
        ></div>
        
        {/* Dark Green Overlay - Adaptive for Dark Mode */}
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-green-950/95 via-emerald-950/90 to-teal-950/95' : 'bg-gradient-to-br from-green-900/85 via-emerald-900/80 to-teal-900/85'}`}></div>
        
        {/* Additional Pattern Overlay */}
        <div 
          className={`absolute inset-0 ${isDark ? 'opacity-5' : 'opacity-10'}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-10 left-10 w-32 h-32 ${isDark ? 'bg-green-400/15' : 'bg-green-400/10'} rounded-full blur-3xl animate-float`}></div>
          <div className={`absolute top-32 right-20 w-40 h-40 ${isDark ? 'bg-emerald-400/15' : 'bg-emerald-400/10'} rounded-full blur-3xl animate-float animation-delay-2000`}></div>
          <div className={`absolute bottom-20 left-1/4 w-36 h-36 ${isDark ? 'bg-teal-400/15' : 'bg-teal-400/10'} rounded-full blur-3xl animate-float animation-delay-4000`}></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 ${isDark ? 'bg-white/10 border-white/30' : 'bg-white/15 border-white/20'} backdrop-blur-md px-6 py-2 rounded-full mb-4 border`}>
            <div className={`w-2 h-2 ${isDark ? 'bg-green-400' : 'bg-green-300'} rounded-full animate-pulse`}></div>
            <span className="text-white font-semibold text-sm uppercase tracking-wider">
              Live Statistics
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
            Community Impact 
          </h2>
          <p className={`${isDark ? 'text-white/90' : 'text-white/95'} text-lg max-w-2xl mx-auto drop-shadow-md`}>
            Real-time data from our growing eco-warrior community
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <ModernStatCard
            icon={<FaLeaf className="text-4xl" />}
            value={stats.activeChallenges}
            label="Active Challenges"
            gradient="from-green-400 to-emerald-600"
            delay="0"
            isDark={isDark}
          />
          <ModernStatCard
            icon={<FaUsers className="text-4xl" />}
            value={stats.totalParticipants}
            label="Total Participants"
            gradient="from-blue-400 to-indigo-600"
            delay="100"
            isDark={isDark}
          />
          <ModernStatCard
            icon={<FaTrophy className="text-4xl" />}
            value={stats.completedChallenges}
            label="Completed"
            gradient="from-yellow-400 to-orange-600"
            delay="200"
            isDark={isDark}
          />
          <ModernStatCard
            icon={<FaCalendarAlt className="text-4xl" />}
            value={stats.upcomingEvents}
            label="Upcoming Events"
            gradient="from-purple-400 to-pink-600"
            delay="300"
            isDark={isDark}
          />
        </div>

        {/* Environmental Impact Cards */}
        <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white/10 border-white/20'} backdrop-blur-md rounded-3xl border p-8 shadow-2xl`}>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3 drop-shadow-lg">
              <FaChartLine className={`${isDark ? 'text-green-400' : 'text-green-300'}`} />
              Environmental Impact
            </h3>
            <p className="text-white/90 drop-shadow-md">Together, we're healing the planet</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ImpactCard
              icon={<FaCloudSun className="text-5xl" />}
              value={stats.environmentalImpact?.co2Saved || 0}
              unit="kg"
              label="CO₂ Saved"
              color={isDark ? 'text-orange-400' : 'text-orange-300'}
              isDark={isDark}
            />
            <ImpactCard
              icon={<FaRecycle className="text-5xl" />}
              value={stats.environmentalImpact?.plasticReduced || 0}
              unit="kg"
              label="Plastic Reduced"
              color={isDark ? 'text-blue-400' : 'text-blue-300'}
              isDark={isDark}
            />
            <ImpactCard
              icon={<FaWater className="text-5xl" />}
              value={stats.environmentalImpact?.waterSaved || 0}
              unit="L"
              label="Water Saved"
              color={isDark ? 'text-cyan-400' : 'text-cyan-300'}
              isDark={isDark}
            />
            <ImpactCard
              icon={<FaTree className="text-5xl" />}
              value={stats.environmentalImpact?.treesPlanted || 0}
              unit=""
              label="Trees Planted"
              color={isDark ? 'text-green-400' : 'text-green-300'}
              isDark={isDark}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }

        .animate-float {
          animation: float 8s infinite ease-in-out;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// Modern Stat Card Component - Dark Mode with isDark prop
const ModernStatCard = ({ icon, value, label, gradient, delay, isDark }) => {
  return (
    <div 
      className={`group relative ${isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-100'} backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden animate-fade-in-up border`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient Overlay on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 ${isDark ? 'group-hover:opacity-20' : 'group-hover:opacity-10'} transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        {/* Icon */}
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          {icon}
        </div>

        {/* Value */}
        <div className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${isDark ? 'group-hover:from-emerald-400 group-hover:to-teal-400' : 'group-hover:from-emerald-600 group-hover:to-teal-600'} transition-all duration-300`}>
          {value?.toLocaleString() || 0}
        </div>

        {/* Label */}
        <div className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'} uppercase tracking-wide`}>
          {label}
        </div>
      </div>

      {/* Decorative Corner */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent ${isDark ? 'to-gray-700/50' : 'to-gray-100/50'} rounded-bl-full`}></div>
    </div>
  );
};

// Impact Card Component - Dark Mode with isDark prop
const ImpactCard = ({ icon, value, unit, label, color, isDark }) => {
  return (
    <div className="text-center group cursor-pointer">
      <div className={`${color} mb-3 opacity-90 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300 drop-shadow-lg`}>
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-md">
        {value?.toLocaleString() || 0}
        <span className={`text-xl md:text-2xl ml-1 ${isDark ? 'text-white/80' : 'text-white/90'}`}>{unit}</span>
      </div>
      <div className={`text-sm font-semibold ${isDark ? 'text-white/90' : 'text-white/95'} uppercase tracking-wide drop-shadow-md`}>
        {label}
      </div>
      <div className={`mt-2 h-1 w-16 mx-auto ${isDark ? 'bg-white/20' : 'bg-white/30'} rounded-full group-hover:w-full transition-all duration-300`}></div>
    </div>
  );
};

export default LiveStatistics;