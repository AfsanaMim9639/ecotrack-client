import { useTheme } from '../context/ThemeContext';
import { FaLeaf, FaUsers, FaGlobeAmericas, FaHeart, FaRocket, FaShieldAlt } from 'react-icons/fa';

const About = () => {
  const { isDark } = useTheme();

  const values = [
    {
      icon: <FaLeaf className="text-4xl" />,
      title: "Sustainability First",
      description: "We believe in creating lasting positive impact on our environment through collective action."
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Community Driven",
      description: "Together we're stronger. Our platform brings people together to make a real difference."
    },
    {
      icon: <FaGlobeAmericas className="text-4xl" />,
      title: "Global Impact",
      description: "Local actions, global results. Every small step contributes to a healthier planet."
    },
    {
      icon: <FaHeart className="text-4xl" />,
      title: "Passion & Purpose",
      description: "We're driven by genuine care for the environment and future generations."
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "1M+", label: "Activities Logged" },
    { number: "500K+", label: "Trees Planted" },
    { number: "2M kg", label: "CO₂ Reduced" }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-gradient-to-r from-green-900 to-green-700' : 'bg-gradient-to-r from-green-600 to-green-500'} text-white py-20`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About EcoTrack</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
              Empowering individuals and communities to make sustainable choices and track their environmental impact, one action at a time.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaRocket className={`text-3xl ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Our Mission
              </h2>
            </div>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-4`}>
              At EcoTrack, we're on a mission to make sustainability accessible, engaging, and rewarding for everyone. We believe that when people can see the real impact of their actions, they're inspired to do more.
            </p>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              Our platform transforms everyday eco-friendly actions into measurable impact, creating a community of environmental champions who inspire and support each other.
            </p>
          </div>
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-8 rounded-2xl shadow-xl`}>
            <div className="flex items-center gap-3 mb-4">
              <FaShieldAlt className={`text-3xl ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Our Vision
              </h2>
            </div>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              We envision a world where sustainable living is the norm, not the exception. A world where every person understands their environmental footprint and has the tools to reduce it effectively.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} py-16`}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Our Impact So Far
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  {stat.number}
                </div>
                <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className={`${isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center`}
            >
              <div className={`${isDark ? 'text-green-400' : 'text-green-600'} mb-4 flex justify-center`}>
                {value.icon}
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {value.title}
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} py-16`}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className={`text-3xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Our Story
          </h2>
          <div className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed space-y-4`}>
            <p>
              EcoTrack was born from a simple observation: people want to help the environment, but often don't know where to start or how much impact they're making.
            </p>
            <p>
              Founded in 2023, we set out to create a platform that would make sustainable living accessible, measurable, and rewarding. We wanted to show people that their daily choices matter and that together, we can create real change.
            </p>
            <p>
              Today, EcoTrack has grown into a thriving community of environmentally conscious individuals who are proving that sustainability and everyday life can go hand in hand. Every recycled bottle, every tree planted, every sustainable choice is tracked, celebrated, and contributes to our collective impact.
            </p>
            <p className="font-semibold">
              Join us in our journey towards a more sustainable future. Because together, we're not just tracking impact—we're creating it.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`${isDark ? 'bg-gradient-to-r from-green-900 to-green-700' : 'bg-gradient-to-r from-green-600 to-green-500'} text-white py-16`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of others who are already making an impact
          </p>
          <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;