import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import api from '../../services/api';
import { FaChevronLeft, FaChevronRight, FaLeaf, FaClock, FaTrophy } from 'react-icons/fa';

const HeroBanner = () => {
  const [challenges, setChallenges] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);
  const slideRefs = useRef([]);

  useEffect(() => {
    fetchFeaturedChallenges();
  }, []);

  const fetchFeaturedChallenges = async () => {
    try {
      const response = await api.get('/challenges?featured=true&limit=5');
      setChallenges(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching challenges:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (challenges.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % challenges.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [challenges.length]);

  useEffect(() => {
    if (slideRefs.current[currentSlide]) {
      gsap.fromTo(
        slideRefs.current[currentSlide],
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
      );
    }
  }, [currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % challenges.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + challenges.length) % challenges.length);
  };

  if (loading) {
    return (
      <div className="relative bg-gradient-to-r from-green-500 to-teal-600 text-white py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  if (challenges.length === 0) {
    return (
      <div className="relative bg-gradient-to-r from-green-500 to-teal-600 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Take the Green Challenge 🌱
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-50">
            Join thousands of eco-warriors making a difference
          </p>
          <Link
            to="/challenges"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Explore Challenges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={heroRef} className="relative h-[60vh] md:h-[70vh] min-h-[450px] max-h-[800px] overflow-hidden">
      {/* Slides */}
      {challenges.map((challenge, index) => (
        <div
          key={challenge._id}
          ref={(el) => (slideRefs.current[index] = el)}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            {challenge.imageUrl ? (
              <img
                src={challenge.imageUrl}
                alt={challenge.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&h=600&fit=crop';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-teal-600"></div>
            )}
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-2xl">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 bg-green-500/90 backdrop-blur-sm px-4 py-2 rounded-full mb-4 animate-fadeInUp">
                  <FaLeaf className="text-white" />
                  <span className="text-white font-semibold text-sm uppercase tracking-wide">
                    {challenge.category || 'Featured Challenge'}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-fadeInUp animation-delay-200">
                  {challenge.title}
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed animate-fadeInUp animation-delay-400 line-clamp-2">
                  {challenge.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 mb-6 animate-fadeInUp animation-delay-600">
                  <div className="flex items-center gap-2 text-white">
                    <FaClock className="text-green-400" />
                    <span className="font-semibold">{challenge.duration} Days</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <FaTrophy className="text-yellow-400" />
                    <span className="font-semibold">{challenge.points} Points</span>
                  </div>
                  {challenge.participants && (
                    <div className="flex items-center gap-2 text-white">
                      <span>👥</span>
                      <span className="font-semibold">{challenge.participants} Joined</span>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  to={`/challenges/${challenge._id}`}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-bold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 animate-fadeInUp animation-delay-800"
                >
                  <span>View Challenge</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 right-10 w-32 h-32 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {challenges.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 group"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 group"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-xl group-hover:translate-x-1 transition-transform" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {challenges.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {challenges.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-12 h-3 bg-white'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Queue Preview Cards - Right Bottom */}
      {challenges.length > 1 && (
        <div className="hidden lg:block absolute bottom-6 right-6 z-30">
          <div className="flex gap-3">
            {challenges.map((challenge, index) => {
              // Show next 3 upcoming slides
              const nextSlides = [
                (currentSlide + 1) % challenges.length,
                (currentSlide + 2) % challenges.length,
                (currentSlide + 3) % challenges.length,
              ];
              
              if (!nextSlides.includes(index)) return null;

              return (
                <button
                  key={challenge._id}
                  onClick={() => goToSlide(index)}
                  className="group relative w-24 h-24 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/30 hover:border-white"
                  aria-label={`Go to ${challenge.title}`}
                >
                  {/* Card Image */}
                  {challenge.imageUrl ? (
                    <img
                      src={challenge.imageUrl}
                      alt={challenge.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-teal-500"></div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center px-2">
                        <div className="text-xs font-bold line-clamp-2">{challenge.title}</div>
                      </div>
                    </div>
                  </div>

                  {/* Play Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Scroll Indicator - Visual Hint to Next Section */}
      <div className="absolute bottom-20 md:bottom-16 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <button
          onClick={() => {
            const nextSection = heroRef.current?.nextElementSibling;
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors group cursor-pointer"
          aria-label="Scroll to next section"
        >
          <span className="text-sm font-medium tracking-wide uppercase hidden md:block">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2 group-hover:border-white transition-colors">
            <div className="w-1.5 h-3 bg-white/80 rounded-full animate-scroll-down"></div>
          </div>
          <svg 
            className="w-6 h-6 group-hover:translate-y-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

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

        @keyframes scrollDown {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(12px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-scroll-down {
          animation: scrollDown 1.5s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
          opacity: 0;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;