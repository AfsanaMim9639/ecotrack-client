import React from 'react';
import { UserPlus, TrendingUp, Share2, ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Forest Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2560&auto=format&fit=crop)',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/92 via-emerald-900/88 to-teal-900/92"></div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="particle particle-1">✨</div>
        <div className="particle particle-2">🌿</div>
        <div className="particle particle-3">✨</div>
        <div className="particle particle-4">🌿</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
            How It Works
          </h2>
          <p className="text-xl text-green-50 max-w-2xl mx-auto">
            Get started in 3 simple steps and begin your sustainable journey today
          </p>
        </div>

        {/* Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Step 1 */}
          <StepCard
            stepNumber="01"
            icon={<UserPlus className="w-10 h-10" />}
            title="Join a Challenge"
            description="Choose from eco-friendly challenges that match your lifestyle and goals"
            gradient="from-emerald-500 to-green-600"
          />

          {/* Arrow */}
          <div className="hidden md:flex justify-center -mx-4">
            <ArrowRight className="w-12 h-12 text-green-300 animate-pulse" />
          </div>

          {/* Step 2 */}
          <StepCard
            stepNumber="02"
            icon={<TrendingUp className="w-10 h-10" />}
            title="Track Progress"
            description="Monitor your impact with real-time stats and earn rewards for milestones"
            gradient="from-green-500 to-teal-600"
          />

          {/* Arrow */}
          <div className="hidden md:flex justify-center -mx-4">
            <ArrowRight className="w-12 h-12 text-green-300 animate-pulse" />
          </div>

          {/* Step 3 */}
          <StepCard
            stepNumber="03"
            icon={<Share2 className="w-10 h-10" />}
            title="Share Tips"
            description="Connect with the community, share experiences, and inspire others"
            gradient="from-teal-500 to-emerald-600"
          />
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105">
            <span>Start Your Journey Today</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-30px) translateX(15px) rotate(180deg) scale(1.2);
            opacity: 1;
          }
        }
        
        .particle {
          position: absolute;
          font-size: 1.5rem;
          animation: float-particle 8s ease-in-out infinite;
        }
        
        .particle-1 {
          top: 15%;
          left: 8%;
          animation-delay: 0s;
        }
        
        .particle-2 {
          top: 25%;
          right: 12%;
          animation-delay: 2s;
        }
        
        .particle-3 {
          bottom: 25%;
          left: 15%;
          animation-delay: 4s;
        }
        
        .particle-4 {
          bottom: 15%;
          right: 8%;
          animation-delay: 6s;
        }
      `}</style>
    </div>
  );
};

const StepCard = ({ stepNumber, icon, title, description, gradient }) => {
  return (
    <div className="group relative">
      {/* Step Number Badge */}
      <div className="absolute -top-4 -left-4 z-10">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl border-4 border-white/20 group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-white font-bold text-xl">{stepNumber}</span>
        </div>
      </div>

      {/* Card */}
      <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 pt-10 border border-white/20 shadow-2xl hover:shadow-green-500/30 transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full">
        {/* Gradient Accent Bar */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient} rounded-t-2xl`}></div>
        
        {/* Icon Container */}
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-white`}>
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-300 transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-green-50 leading-relaxed text-lg">
          {description}
        </p>

        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500 pointer-events-none`}></div>
        
        {/* Corner Decoration */}
        <div className={`absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-br ${gradient} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-500`}></div>
      </div>
    </div>
  );
};

export default HowItWorksSection;