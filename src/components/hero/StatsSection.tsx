
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatCard from "./StatCard";

interface StatsSectionProps {
  isVisible: boolean;
}

const StatsSection = ({ isVisible }: StatsSectionProps) => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [animatedValues, setAnimatedValues] = useState<{ [key: number]: string }>({});
  const [showTooltips, setShowTooltips] = useState(false);
  
  const stats = [
    { label: "Properties", value: "1,500+", description: "Luxury properties worldwide" },
    { label: "Happy Clients", value: "800+", description: "Satisfied homeowners and renters" },
    { label: "Cities", value: "50+", description: "Major locations across the globe" }
  ];
  
  useEffect(() => {
    // Animate stats numbers sequentially after initial visibility
    if (isVisible) {
      const timer = setTimeout(() => setShowTooltips(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Function to handle animated count up
  const handleCountComplete = (index: number, value: string) => {
    setAnimatedValues(prev => ({ ...prev, [index]: value }));
  };
  
  return (
    <div className="absolute bottom-12 left-0 right-0">
      <div className="flex justify-center px-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 w-full max-w-3xl">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              label={stat.label}
              value={stat.value}
              description={stat.description}
              index={index}
              isVisible={isVisible}
              hoveredStat={hoveredStat}
              setHoveredStat={setHoveredStat}
              onCountComplete={handleCountComplete}
              showTooltip={showTooltips}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
