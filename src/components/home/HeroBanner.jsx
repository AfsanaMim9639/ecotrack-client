import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const HeroBanner = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .from(buttonRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative bg-gradient-to-r from-green-500 to-teal-600 text-white py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 ref={titleRef} className="text-5xl md:text-6xl font-bold mb-6">
          Take the Green Challenge 🌱
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl mb-8 text-green-50">
          Join thousands of eco-warriors making a difference, one challenge at a time
        </p>
        <div ref={buttonRef}>
          <Link
            to="/challenges"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Explore Challenges
          </Link>
        </div>
      </div>
      
      {/* Animated background circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white opacity-10 rounded-full animate-pulse delay-1000"></div>
    </div>
  );
};

export default HeroBanner;