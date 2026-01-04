import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FaLeaf, FaTree, FaRecycle, FaWater, FaBolt, FaTrophy, FaFire, FaChartLine, FaAward, FaCalendarAlt } from 'react-icons/fa';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Impact = () => {
  const { isDark } = useTheme();
  const { currentUser } = useAuth();

  // Sample data - replace with actual data from your backend
  const impactStats = [
    { icon: <FaLeaf className="text-3xl" />, label: "CO₂ Reduced", value: "850 kg", change: "+12%", color: "green" },
    { icon: <FaTree className="text-3xl" />, label: "Trees Planted", value: "45", change: "+5", color: "emerald" },
    { icon: <FaRecycle className="text-3xl" />, label: "Items Recycled", value: "230", change: "+18%", color: "blue" },
    { icon: <FaWater className="text-3xl" />, label: "Water Saved", value: "3,200 L", change: "+8%", color: "cyan" },
  ];

  const monthlyData = [
    { month: 'Jan', co2: 45, recycling: 20, energy: 30 },
    { month: 'Feb', co2: 52, recycling: 28, energy: 35 },
    { month: 'Mar', co2: 68, recycling: 35, energy: 42 },
    { month: 'Apr', co2: 75, recycling: 42, energy: 48 },
    { month: 'May', co2: 88, recycling: 55, energy: 58 },
    { month: 'Jun', co2: 105, recycling: 68, energy: 72 },
  ];

  const categoryData = [
    { name: 'Recycling', value: 35, color: '#3b82f6' },
    { name: 'Energy Saving', value: 28, color: '#10b981' },
    { name: 'Tree Planting', value: 20, color: '#22c55e' },
    { name: 'Water Conservation', value: 17, color: '#06b6d4' },
  ];

  const achievements = [
    { icon: <FaTrophy />, title: "Eco Warrior", description: "Completed 50 activities", date: "2 days ago" },
    { icon: <FaFire />, title: "30-Day Streak", description: "Logged activities for 30 days", date: "1 week ago" },
    { icon: <FaAward />, title: "Top 10 User", description: "Ranked in top 10 this month", date: "2 weeks ago" },
  ];

  const weeklyStreak = [
    { day: 'Mon', active: true },
    { day: 'Tue', active: true },
    { day: 'Wed', active: true },
    { day: 'Thu', active: true },
    { day: 'Fri', active: true },
    { day: 'Sat', active: false },
    { day: 'Sun', active: false },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-gradient-to-r from-green-900 to-green-700' : 'bg-gradient-to-r from-green-600 to-green-500'} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Impact Dashboard</h1>
              <p className="text-xl opacity-90">
                Track your environmental contributions and see the difference you're making
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold">127</div>
                <div className="text-sm opacity-80">Total Activities</div>
              </div>
              <div className={`w-px h-16 ${isDark ? 'bg-white/20' : 'bg-white/30'}`}></div>
              <div className="text-center">
                <div className="text-4xl font-bold">15</div>
                <div className="text-sm opacity-80">Day Streak</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactStats.map((stat, index) => (
            <div
              key={index}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className={`text-${stat.color}-500 mb-4`}>
                {stat.icon}
              </div>
              <div className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
              <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Monthly Progress Chart */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Monthly Impact Progress
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="month" stroke={isDark ? '#9ca3af' : '#6b7280'} />
                <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    color: isDark ? '#ffffff' : '#000000'
                  }}
                />
                <Area type="monotone" dataKey="co2" stroke="#10b981" fillOpacity={1} fill="url(#colorCo2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Activity Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Streak & Achievements */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Weekly Streak */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center gap-2 mb-6">
              <FaFire className="text-orange-500 text-2xl" />
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Weekly Streak
              </h3>
            </div>
            <div className="flex justify-between gap-2">
              {weeklyStreak.map((day, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      day.active
                        ? 'bg-green-500 text-white'
                        : isDark
                        ? 'bg-gray-700 text-gray-500'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <FaLeaf className="text-sm" />
                  </div>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className={`lg:col-span-2 ${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recent Achievements
            </h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}
                >
                  <div className="text-3xl text-yellow-500">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {achievement.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Bar Chart */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg mt-8`}>
          <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Activity Comparison
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="month" stroke={isDark ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',
                  border: 'none',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="co2" fill="#10b981" name="CO₂ Saved (kg)" />
              <Bar dataKey="recycling" fill="#3b82f6" name="Items Recycled" />
              <Bar dataKey="energy" fill="#f59e0b" name="Energy Saved (kWh)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Call to Action */}
        <div className={`${isDark ? 'bg-gradient-to-br from-green-900 to-green-700' : 'bg-gradient-to-br from-green-600 to-green-500'} rounded-2xl p-8 text-white text-center mt-12`}>
          <h2 className="text-3xl font-bold mb-4">Keep Up the Great Work!</h2>
          <p className="text-lg mb-6 opacity-90">
            Your efforts are making a real difference. Log more activities to increase your impact.
          </p>
          <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
            Log New Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Impact;