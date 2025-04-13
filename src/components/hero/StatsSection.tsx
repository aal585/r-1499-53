
import { useState } from "react";
import StatCard from "./StatCard";

interface StatsSectionProps {
  isVisible: boolean;
}

const StatsSection = ({ isVisible }: StatsSectionProps) => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  
  const stats = [
    { label: "Properties", value: "1,500+" },
    { label: "Happy Clients", value: "800+" },
    { label: "Cities", value: "50+" }
  ];
  
  return (
    <div className="absolute bottom-12 left-0 right-0">
      <div className="flex justify-center px-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 w-full max-w-3xl">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              label={stat.label}
              value={stat.value}
              index={index}
              isVisible={isVisible}
              hoveredStat={hoveredStat}
              setHoveredStat={setHoveredStat}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
