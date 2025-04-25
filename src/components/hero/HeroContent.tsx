
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
      
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 tracking-tight">
        Find Your <span className="text-amber-300">Dream Home</span>
      </h1>
      
      <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto">
        Discover a curated collection of premium properties and exclusive listings tailored to your lifestyle.
      </p>
      
      <div className="mb-8">
        <PropertyTypeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <div className="mb-10">
        <SearchBar />
      </div>
      
      <div className="flex justify-center mb-16">
        <Button
          onClick={handleGetStarted}
          size="lg"
          className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-6 rounded-full text-lg shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <span>Get Started</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
      
      <div className="hidden md:grid grid-cols-5 gap-4 text-white max-w-3xl mx-auto">
        {propertyTypes.map((type, index) => (
          <PropertyTypeDropdown key={index} propertyType={type} />
        ))}
      </div>
    </div>
  );
};

export default HeroContent;
