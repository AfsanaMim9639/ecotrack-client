import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Globe, Heart, DollarSign, Users, Rocket, Baby, Check } from 'lucide-react';

const WhyGoGreenSection = () => {
  const { isDark } = useTheme();
  
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Forest Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop)',
        }}
      >
        {/* Dark Overlay - Adaptive for Dark Mode */}
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-green-950/95 via-emerald-950/90 to-green-900/95' : 'bg-gradient-to-br from-green-900/90 via-emerald-900/85 to-green-800/90'}`}></div>
      </div>

      {/* Animated Floating Leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="leaf leaf-1">🍃</div>
        <div className="leaf leaf-2">🍃</div>
        <div className="leaf leaf-3">🍃</div>
        <div className="leaf leaf-4">🍃</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
            Why Choose Sustainable Living?
          </h2>
          <p className={`text-xl ${isDark ? 'text-green-100' : 'text-green-50'} max-w-2xl mx-auto`}>
            Small changes today create lasting impact tomorrow
          </p>
        </div>

        {/* Grid with equal height cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {/* Environmental Benefits */}
          <ModernBenefitCard
            icon={<Globe className="w-8 h-8" />}
            title="Environmental Impact"
            benefits={[
              "Reduce carbon footprint by up to 70%",
              "Conserve natural resources for future generations",
              "Protect wildlife and biodiversity"
            ]}
            gradient="from-emerald-500 to-green-600"
            isDark={isDark}
          />

          {/* Health Benefits */}
          <ModernBenefitCard
            icon={<Heart className="w-8 h-8" />}
            title="Health & Wellness"
            benefits={[
              "Breathe cleaner air, live healthier",
              "Access to organic, chemical-free foods",
              "Reduced exposure to harmful toxins"
            ]}
            gradient="from-green-500 to-teal-600"
            isDark={isDark}
          />

          {/* Financial Benefits */}
          <ModernBenefitCard
            icon={<DollarSign className="w-8 h-8" />}
            title="Save Money"
            benefits={[
              "Lower energy and water bills",
              "Less waste means less spending",
              "Long-term savings on quality products"
            ]}
            gradient="from-teal-500 to-emerald-600"
            isDark={isDark}
          />

          {/* Community Impact */}
          <ModernBenefitCard
            icon={<Users className="w-8 h-8" />}
            title="Community Connection"
            benefits={[
              "Support local farmers and businesses",
              "Build stronger neighborhood bonds",
              "Inspire others to join the movement"
            ]}
            gradient="from-green-600 to-lime-600"
            isDark={isDark}
          />

          {/* Innovation & Growth */}
          <ModernBenefitCard
            icon={<Rocket className="w-8 h-8" />}
            title="Innovation & Growth"
            benefits={[
              "Drive green technology advancement",
              "Create sustainable job opportunities",
              "Foster creative problem-solving"
            ]}
            gradient="from-emerald-600 to-green-700"
            isDark={isDark}
          />

          {/* Future Generation */}
          <ModernBenefitCard
            icon={<Baby className="w-8 h-8" />}
            title="Legacy & Future"
            benefits={[
              "Leave a livable planet for children",
              "Set an example for next generation",
              "Create lasting positive change"
            ]}
            gradient="from-lime-600 to-green-600"
            isDark={isDark}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-20px) translateX(10px) rotate(180deg);
            opacity: 1;
          }
        }
        
        .leaf {
          position: absolute;
          font-size: 2rem;
          animation: float 6s ease-in-out infinite;
        }
        
        .leaf-1 {
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .leaf-2 {
          top: 20%;
          right: 15%;
          animation-delay: 2s;
        }
        
        .leaf-3 {
          bottom: 30%;
          left: 20%;
          animation-delay: 4s;
        }
        
        .leaf-4 {
          bottom: 20%;
          right: 10%;
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
};

const ModernBenefitCard = ({ icon, title, benefits, gradient, isDark }) => {
  return (
    <div className="group relative h-full">
      {/* Glassmorphism Card - Full height with flexbox */}
      <div className={`relative ${isDark ? 'bg-white/5' : 'bg-white/10'} backdrop-blur-lg rounded-2xl p-8 border ${isDark ? 'border-white/10' : 'border-white/20'} shadow-2xl ${isDark ? 'hover:shadow-green-400/20' : 'hover:shadow-green-500/20'} transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full flex flex-col`}>
        {/* Gradient Accent Bar */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient} rounded-t-2xl`}></div>
        
        {/* Icon with gradient background */}
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300 text-white flex-shrink-0`}>
          {icon}
        </div>
        
        <h3 className={`text-2xl font-bold mb-5 text-white ${isDark ? 'group-hover:text-green-400' : 'group-hover:text-green-300'} transition-colors duration-300 flex-shrink-0`}>
          {title}
        </h3>
        
        {/* Benefits list - takes remaining space */}
        <ul className="space-y-3 flex-grow">
          {benefits.map((benefit, index) => (
            <li 
              key={index} 
              className="flex items-start group/item hover:translate-x-2 transition-transform duration-300"
            >
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br ${gradient} mr-3 mt-0.5 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300`}>
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </span>
              <span className={`${isDark ? 'text-green-100 group-hover/item:text-white' : 'text-green-50 group-hover/item:text-white'} leading-relaxed transition-colors duration-300`}>
                {benefit}
              </span>
            </li>
          ))}
        </ul>

        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 ${isDark ? 'group-hover:opacity-15' : 'group-hover:opacity-10'} rounded-2xl transition-opacity duration-500 pointer-events-none`}></div>
      </div>
    </div>
  );
};

export default WhyGoGreenSection;