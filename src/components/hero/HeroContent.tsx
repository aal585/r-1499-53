
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, ChevronDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PropertyTypeTabs from "./PropertyTypeTabs";
import PropertyTypeDropdown from "./PropertyTypeDropdown";

interface HeroContentProps {
  isVisible: boolean;
  activeTab: 'buy' | 'rent';
  setActiveTab: (tab: 'buy' | 'rent') => void;
  propertyTypes: Array<{ name: string; count: number; icon: string }>;
  handleGetStarted: () => void;
}

const HeroContent = ({ isVisible, activeTab, setActiveTab, propertyTypes, handleGetStarted }: HeroContentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (location) params.set("location", location);
    params.set("type", activeTab === 'buy' ? 'sale' : 'rent');
    navigate(`/properties?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="text-center text-white max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display mb-6 leading-tight">
          Find Your Perfect
          <span className="block bg-gradient-to-r from-accent-amber via-white to-accent-blue bg-clip-text text-transparent">
            Dream Home
          </span>
        </h1>
        <p className="text-lg md:text-xl text-estate-200 max-w-3xl mx-auto leading-relaxed">
          Discover exceptional properties, premium furniture, and professional home services
          all in one place. Your journey to the perfect lifestyle starts here.
        </p>
      </motion.div>

      {/* Quick Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        <Button 
          onClick={() => navigate('/properties')}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
        >
          Browse Properties
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <Button 
          onClick={() => navigate('/services')}
          className="bg-vibrant-purple hover:bg-purple-700"
        >
          Book Services
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <Button 
          onClick={() => navigate('/furniture')}
          className="bg-accent-amber hover:bg-amber-600 text-estate-800"
        >
          Shop Furniture
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>

      {/* Property Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20"
      >
        {/* Property Type Tabs */}
        <PropertyTypeTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Search Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search properties..."
              className="pl-10 bg-white/90 border-white/30 text-gray-800 placeholder:text-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Location"
              className="pl-10 bg-white/90 border-white/30 text-gray-800 placeholder:text-gray-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          
          <Button 
            onClick={handleSearch}
            className="bg-gradient-to-r from-vibrant-purple to-accent-blue hover:from-purple-700 hover:to-blue-600 text-white font-semibold"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Properties
          </Button>
        </div>

        {/* Property Type Dropdown */}
        <PropertyTypeDropdown propertyTypes={propertyTypes} />

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-6"
        >
          <Button
            onClick={handleGetStarted}
            className="bg-accent-amber hover:bg-amber-600 text-estate-800 font-semibold px-8 py-3"
          >
            Get Started Today
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroContent;
