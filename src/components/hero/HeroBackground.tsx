
import { useEffect, useState } from "react";

interface HeroBackgroundProps {
  isVisible: boolean;
  children: React.ReactNode;
}

const HeroBackground = ({ isVisible, children }: HeroBackgroundProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    // Track scroll for parallax effect
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate parallax effect based on scroll position
  const parallaxValue = scrollPosition * 0.12;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 will-change-transform"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
          transform: isVisible 
            ? `scale(1.05) translateY(-${parallaxValue}px)` 
            : "scale(1.1) translateY(20px)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />
      </div>
      
      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-estate-800/20 to-transparent opacity-40 pointer-events-none"></div>
      
      {/* Light rays effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,215,128,0.1),_transparent_70%)] pointer-events-none"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {children}
    </div>
  );
};

export default HeroBackground;
