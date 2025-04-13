
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  index: number;
  isVisible: boolean;
  hoveredStat: number | null;
  setHoveredStat: (index: number | null) => void;
}

const StatCard = ({ 
  label, 
  value, 
  index, 
  isVisible, 
  hoveredStat, 
  setHoveredStat 
}: StatCardProps) => {
  return (
    <div 
      className={cn(
        "text-center p-3 sm:p-4 backdrop-blur-md bg-white/5 rounded-xl border border-white/10",
        "hover:bg-white/10 transition-all duration-300 transform",
        hoveredStat === index ? "translate-y-[-6px] bg-white/15 border-white/20" : "hover:translate-y-[-4px]" 
      )}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${600 + index * 150}ms`,
        transitionProperty: 'all',
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onMouseEnter={() => setHoveredStat(index)}
      onMouseLeave={() => setHoveredStat(null)}
    >
      <p className="text-xl sm:text-2xl md:text-3xl font-display text-white mb-1">{value}</p>
      <p className="text-xs sm:text-sm text-white/70">{label}</p>
    </div>
  );
};

export default StatCard;
