
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroBackground from "./hero/HeroBackground";
import HeroContent from "./hero/HeroContent";
import StatsSection from "./hero/StatsSection";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'buy' | 'rent'>('buy');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate(`/properties?type=${activeTab === 'buy' ? 'sale' : 'rent'}`);
  };

  const propertyTypes = [
    { name: "Apartments", count: 320, icon: "🏢" },
    { name: "Houses", count: 158, icon: "🏡" },
    { name: "Villas", count: 76, icon: "🏘️" },
    { name: "Condos", count: 112, icon: "🏙️" },
    { name: "Penthouses", count: 45, icon: "🏨" }
  ];

  return (
    <HeroBackground isVisible={isVisible}>
      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center items-center">
        <HeroContent 
          isVisible={isVisible}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          propertyTypes={propertyTypes}
          handleGetStarted={handleGetStarted}
        />
        <StatsSection isVisible={isVisible} />
      </div>
    </HeroBackground>
  );
};

export default Hero;
