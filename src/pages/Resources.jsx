import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaBook, FaVideo, FaFileAlt, FaDownload, FaSearch, FaLeaf, FaRecycle, FaLightbulb, FaWater, FaTree, FaGlobeAmericas } from 'react-icons/fa';

const Resources = () => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', icon: <FaBook /> },
    { id: 'recycling', name: 'Recycling', icon: <FaRecycle /> },
    { id: 'energy', name: 'Energy', icon: <FaLightbulb /> },
    { id: 'water', name: 'Water', icon: <FaWater /> },
    { id: 'planting', name: 'Tree Planting', icon: <FaTree /> },
    { id: 'sustainability', name: 'Sustainability', icon: <FaGlobeAmericas /> },
  ];

  const resources = [
    {
      id: 1,
      title: "Complete Guide to Home Recycling",
      description: "Learn how to effectively recycle materials at home, reduce waste, and make a positive environmental impact.",
      type: "Guide",
      category: "recycling",
      icon: <FaFileAlt />,
      color: "blue",
      downloads: 2453,
      duration: "15 min read"
    },
    {
      id: 2,
      title: "Energy Conservation Best Practices",
      description: "Discover practical tips to reduce your energy consumption and lower your carbon footprint at home and work.",
      type: "E-Book",
      category: "energy",
      icon: <FaBook />,
      color: "yellow",
      downloads: 1876,
      duration: "45 min read"
    },
    {
      id: 3,
      title: "Water Conservation Techniques",
      description: "Master water-saving strategies that help preserve this precious resource while reducing your utility bills.",
      type: "Video",
      category: "water",
      icon: <FaVideo />,
      color: "cyan",
      downloads: 3201,
      duration: "22 min"
    },
    {
      id: 4,
      title: "Urban Tree Planting Handbook",
      description: "Everything you need to know about planting and caring for trees in urban environments.",
      type: "Guide",
      category: "planting",
      icon: <FaFileAlt />,
      color: "green",
      downloads: 1642,
      duration: "30 min read"
    },
    {
      id: 5,
      title: "Sustainable Living 101",
      description: "A comprehensive introduction to sustainable living practices that anyone can implement today.",
      type: "E-Book",
      category: "sustainability",
      icon: <FaBook />,
      color: "emerald",
      downloads: 4523,
      duration: "1 hour read"
    },
    {
      id: 6,
      title: "Zero Waste Lifestyle Guide",
      description: "Step-by-step instructions for transitioning to a zero-waste lifestyle and reducing your environmental impact.",
      type: "Guide",
      category: "recycling",
      icon: <FaFileAlt />,
      color: "blue",
      downloads: 2891,
      duration: "25 min read"
    },
    {
      id: 7,
      title: "Renewable Energy at Home",
      description: "Explore options for implementing renewable energy solutions in your home, from solar to wind power.",
      type: "Video",
      category: "energy",
      icon: <FaVideo />,
      color: "yellow",
      downloads: 2156,
      duration: "35 min"
    },
    {
      id: 8,
      title: "Composting Made Easy",
      description: "Learn the basics of composting and turn your organic waste into valuable nutrients for your garden.",
      type: "Guide",
      category: "sustainability",
      icon: <FaFileAlt />,
      color: "emerald",
      downloads: 1987,
      duration: "12 min read"
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = [
    { label: "Total Resources", value: "150+" },
    { label: "Video Tutorials", value: "45" },
    { label: "Downloaded", value: "25K+" },
    { label: "Active Users", value: "12K+" },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-gradient-to-r from-green-900 to-green-700' : 'bg-gradient-to-r from-green-600 to-green-500'} text-white py-20`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Resource Library</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90 mb-8">
              Access our comprehensive collection of guides, videos, and tools to enhance your sustainable living journey
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <FaSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'} text-xl`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search resources..."
                  className={`w-full pl-12 pr-4 py-4 rounded-lg ${isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-white/50 text-lg`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg text-center`}
            >
              <div className={`text-3xl font-bold mb-1 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
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
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                  activeCategory === category.id
                    ? isDark
                      ? 'bg-green-600 text-white'
                      : 'bg-green-600 text-white'
                    : isDark
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
            >
              <div className={`bg-gradient-to-br from-${resource.color}-500 to-${resource.color}-600 p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl opacity-80">
                    {resource.icon}
                  </div>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                    {resource.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{resource.title}</h3>
              </div>
              
              <div className="p-6">
                <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {resource.duration}
                    </span>
                    <span className={`flex items-center gap-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      <FaDownload className="text-xs" />
                      {resource.downloads}
                    </span>
                  </div>
                </div>
                
                <button className={`w-full ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-600 hover:bg-green-700'} text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 group-hover:gap-3`}>
                  <FaDownload />
                  Download Resource
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <FaSearch className="text-6xl mb-4 mx-auto opacity-50" />
            <p className="text-xl">No resources found matching your search.</p>
          </div>
        )}

        {/* Featured Section */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 mt-12`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Featured Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-green-50'} border-l-4 ${isDark ? 'border-green-500' : 'border-green-600'}`}>
              <div className="flex items-start gap-4">
                <div className={`text-3xl ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  <FaLeaf />
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Beginner's Guide Pack
                  </h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Perfect starter bundle for those new to sustainable living. Includes essential guides and checklists.
                  </p>
                  <button className={`${isDark ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'} font-semibold flex items-center gap-2`}>
                    Download Pack <FaDownload />
                  </button>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-blue-50'} border-l-4 ${isDark ? 'border-blue-500' : 'border-blue-600'}`}>
              <div className="flex items-start gap-4">
                <div className={`text-3xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  <FaVideo />
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Video Course Series
                  </h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Comprehensive video series covering all aspects of eco-friendly living. 20+ hours of content.
                  </p>
                  <button className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-semibold flex items-center gap-2`}>
                    View Courses <FaVideo />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`${isDark ? 'bg-gradient-to-br from-green-900 to-green-700' : 'bg-gradient-to-br from-green-600 to-green-500'} rounded-2xl p-8 text-white text-center mt-12`}>
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-lg mb-6 opacity-90">
            Request new resources or suggest topics you'd like us to cover
          </p>
          <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
            Submit a Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resources;