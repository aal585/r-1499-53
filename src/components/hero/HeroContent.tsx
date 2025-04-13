
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SearchBar from "@/components/SearchBar";
import PropertyTypeTabs from "./PropertyTypeTabs";
import PropertyTypeDropdown from "./PropertyTypeDropdown";
import { useNavigate } from "react-router-dom";

interface HeroContentProps {
  isVisible: boolean;
  activeTab: 'buy' | 'rent';
  setActiveTab: (tab: 'buy' | 'rent') => void;
  propertyTypes: Array<{
    name: string;
    count: number;
    icon: string;
  }>;
  handleGetStarted: () => void;
}

const HeroContent = ({ isVisible, activeTab, setActiveTab, propertyTypes, handleGetStarted }: HeroContentProps) => {
  return (
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
        <span className="text-gradient bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 drop-shadow-lg inline-block animate-pulse">
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
        <PropertyTypeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Property types dropdown */}
        <PropertyTypeDropdown propertyTypes={propertyTypes} activeTab={activeTab} />
        
        {/* Search bar */}
        <div className="backdrop-blur-md bg-white/10 p-2 rounded-2xl border border-white/20 shadow-lg transform transition-all duration-700 hover:border-white/30 hover:bg-white/15 hover:shadow-xl focus-within:scale-[1.02]">
          <SearchBar />
        </div>
        
        {/* Call to action button */}
        <Button 
          className="mt-8 bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/20 hover:shadow-xl animate-pulse"
          onClick={handleGetStarted}
        >
          <span className="flex items-center gap-2 text-lg">
            Explore {activeTab === 'buy' ? 'Properties' : 'Rentals'}
            <ArrowRight className="w-5 h-5" />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default HeroContent;
