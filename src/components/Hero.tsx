
import { MapPin, ArrowRight, Home, Building } from "lucide-react";
import SearchBar from "./SearchBar";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeTab, setActiveTab] = useState<'buy' | 'rent'>('buy');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Track scroll for parallax effect
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate parallax effect based on scroll position
  const parallaxValue = scrollPosition * 0.15;

  const handleGetStarted = () => {
    navigate(`/properties?type=${activeTab === 'buy' ? 'sale' : 'rent'}`);
  };

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
      
      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center items-center">
        <div className={cn(
          "max-w-4xl mx-auto text-center transition-all duration-1000 ease-out transform",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        )}>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 shadow-lg border border-white/10 hover:bg-white/15 transition-colors duration-300 transform hover:scale-105">
            <MapPin className="w-4 h-4 text-amber-200" />
            <span className="text-white/90 text-sm font-medium">Luxury Real Estate Solutions</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-white mb-6 leading-tight tracking-tight">
            Find Your Dream <br />
            <span className="text-gradient bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 drop-shadow-lg inline-block">
              Luxury Home
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover exceptional properties and sustainable living spaces curated for modern lifestyles.
          </p>
          
          <div className={cn(
            "max-w-2xl mx-auto transition-all duration-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Property type tabs */}
            <div className="flex justify-center mb-4">
              <div className="bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-lg inline-flex">
                <button 
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === 'buy' 
                      ? 'bg-amber-500 text-white shadow-md' 
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                  onClick={() => setActiveTab('buy')}
                >
                  <span className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    Buy
                  </span>
                </button>
                <button 
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === 'rent' 
                      ? 'bg-amber-500 text-white shadow-md' 
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                  onClick={() => setActiveTab('rent')}
                >
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    Rent
                  </span>
                </button>
              </div>
            </div>
            
            {/* Search bar */}
            <div className="backdrop-blur-md bg-white/10 p-2 rounded-2xl border border-white/20 shadow-lg transform transition-all duration-700 hover:border-white/30 hover:bg-white/15">
              <SearchBar />
            </div>
            
            {/* Call to action button */}
            <Button 
              className="mt-8 bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1"
              onClick={handleGetStarted}
            >
              <span className="flex items-center gap-2 text-lg">
                Explore {activeTab === 'buy' ? 'Properties' : 'Rentals'}
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-12 left-0 right-0">
          <div className="flex justify-center px-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 w-full max-w-3xl">
              {[
                { label: "Properties", value: "1,500+" },
                { label: "Happy Clients", value: "800+" },
                { label: "Cities", value: "50+" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "text-center p-3 sm:p-4 backdrop-blur-md bg-white/5 rounded-xl border border-white/10",
                    "hover:bg-white/10 transition-all duration-300 transform hover:translate-y-[-4px]"
                  )}
                  style={{ 
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${600 + index * 150}ms`,
                    transitionProperty: 'all',
                    transitionDuration: '700ms',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <p className="text-xl sm:text-2xl md:text-3xl font-display text-white mb-1">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-estate-800/20 to-transparent opacity-40 pointer-events-none"></div>
      
      {/* Light rays effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,215,128,0.1),_transparent_70%)] pointer-events-none"></div>
    </div>
  );
};

export default Hero;
