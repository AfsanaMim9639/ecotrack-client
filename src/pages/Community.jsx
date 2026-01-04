import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaHeart, FaComment, FaShare, FaLeaf, FaTree, FaRecycle, FaFire, FaUsers, FaTrophy, FaGlobeAmericas } from 'react-icons/fa';

const Community = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('feed');

  // Sample community data
  const communityStats = [
    { icon: <FaUsers className="text-2xl" />, label: "Active Members", value: "12,458" },
    { icon: <FaLeaf className="text-2xl" />, label: "Activities Today", value: "3,247" },
    { icon: <FaGlobeAmericas className="text-2xl" />, label: "Countries", value: "89" },
    { icon: <FaTrophy className="text-2xl" />, label: "Challenges Active", value: "24" },
  ];

  const activityFeed = [
    {
      user: { name: "Sarah Johnson", avatar: "SJ", level: "Eco Champion" },
      action: "planted 5 trees",
      impact: "Reduced 105 kg CO₂",
      time: "2 hours ago",
      likes: 45,
      comments: 12,
      icon: <FaTree className="text-green-500" />
    },
    {
      user: { name: "Michael Chen", avatar: "MC", level: "Green Warrior" },
      action: "recycled 25 plastic bottles",
      impact: "Saved 12.5 kg CO₂",
      time: "4 hours ago",
      likes: 32,
      comments: 8,
      icon: <FaRecycle className="text-blue-500" />
    },
    {
      user: { name: "Emma Williams", avatar: "EW", level: "Sustainability Hero" },
      action: "completed 30-day challenge",
      impact: "Total impact: 450 kg CO₂",
      time: "6 hours ago",
      likes: 89,
      comments: 23,
      icon: <FaFire className="text-orange-500" />
    },
    {
      user: { name: "David Martinez", avatar: "DM", level: "Eco Starter" },
      action: "reduced energy consumption",
      impact: "Saved 45 kWh",
      time: "8 hours ago",
      likes: 21,
      comments: 5,
      icon: <FaLeaf className="text-green-500" />
    },
  ];

  const topContributors = [
    { rank: 1, name: "Jessica Lee", points: "8,542", activities: 234 },
    { rank: 2, name: "Alex Thompson", points: "7,891", activities: 198 },
    { rank: 3, name: "Maria Garcia", points: "7,456", activities: 187 },
    { rank: 4, name: "James Wilson", points: "6,923", activities: 165 },
    { rank: 5, name: "Linda Brown", points: "6,547", activities: 152 },
  ];

  const trendingTopics = [
    { tag: "#PlasticFree", posts: 1243 },
    { tag: "#TreePlanting", posts: 987 },
    { tag: "#ZeroWaste", posts: 756 },
    { tag: "#Sustainability", posts: 654 },
    { tag: "#GreenLiving", posts: 543 },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-gradient-to-r from-green-900 to-green-700' : 'bg-gradient-to-r from-green-600 to-green-500'} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Community Hub</h1>
          <p className="text-xl opacity-90">
            Connect with eco-warriors worldwide and share your sustainable journey
          </p>
        </div>
      </div>

      {/* Community Stats */}
      <div className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {communityStats.map((stat, index) => (
            <div
              key={index}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg text-center`}
            >
              <div className={`${isDark ? 'text-green-400' : 'text-green-600'} mb-3 flex justify-center`}>
                {stat.icon}
              </div>
              <div className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
              activeTab === 'feed'
                ? isDark
                  ? 'bg-green-600 text-white'
                  : 'bg-green-600 text-white'
                : isDark
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Activity Feed
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
              activeTab === 'leaderboard'
                ? isDark
                  ? 'bg-green-600 text-white'
                  : 'bg-green-600 text-white'
                : isDark
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Top Contributors
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
              activeTab === 'trending'
                ? isDark
                  ? 'bg-green-600 text-white'
                  : 'bg-green-600 text-white'
                : isDark
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Trending Topics
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'feed' && (
              <div className="space-y-6">
                {activityFeed.map((activity, index) => (
                  <div
                    key={index}
                    className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg hover:shadow-xl transition`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${isDark ? 'from-green-500 to-green-700' : 'from-green-400 to-green-600'} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                        {activity.user.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {activity.user.name}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-700'}`}>
                            {activity.user.level}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          {activity.icon}
                          <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {activity.action}
                          </span>
                        </div>
                        <div className={`mb-4 p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-green-50'}`}>
                          <span className={`font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                            Impact: {activity.impact}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <button className={`flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-600'} transition`}>
                              <FaHeart />
                              <span>{activity.likes}</span>
                            </button>
                            <button className={`flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition`}>
                              <FaComment />
                              <span>{activity.comments}</span>
                            </button>
                            <button className={`flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-600'} transition`}>
                              <FaShare />
                            </button>
                          </div>
                          <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Top Contributors This Month
                </h2>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-lg ${
                        isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                      } transition`}
                    >
                      <div className={`text-2xl font-bold ${
                        contributor.rank === 1 ? 'text-yellow-500' :
                        contributor.rank === 2 ? 'text-gray-400' :
                        contributor.rank === 3 ? 'text-orange-600' :
                        isDark ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        #{contributor.rank}
                      </div>
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${isDark ? 'from-green-500 to-green-700' : 'from-green-400 to-green-600'} flex items-center justify-center text-white font-bold`}>
                        {contributor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {contributor.name}
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {contributor.activities} activities
                        </p>
                      </div>
                      <div className={`text-xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                        {contributor.points}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'trending' && (
              <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
                <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Trending Topics
                </h2>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        isDark ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                      } transition cursor-pointer`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`text-3xl font-bold ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className={`font-bold text-lg ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                            {topic.tag}
                          </h3>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {topic.posts} posts
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Your Community Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Rank</span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>#247</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Followers</span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>89</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Following</span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>124</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Posts</span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>67</span>
                </div>
              </div>
            </div>

            {/* Suggested Users */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Suggested to Follow
              </h3>
              <div className="space-y-4">
                {['John Doe', 'Jane Smith', 'Bob Wilson'].map((name, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${isDark ? 'from-green-500 to-green-700' : 'from-green-400 to-green-600'} flex items-center justify-center text-white font-bold text-sm`}>
                        {name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {name}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Eco Warrior
                        </div>
                      </div>
                    </div>
                    <button className={`px-4 py-1.5 rounded-lg text-sm font-medium ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white transition`}>
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;