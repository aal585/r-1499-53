
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string;
  description?: string;
  index: number;
  isVisible: boolean;
  hoveredStat: number | null;
  setHoveredStat: (index: number | null) => void;
  onCountComplete?: (index: number, value: string) => void;
  showTooltip?: boolean;
}

const StatCard = ({ 
  label, 
  value, 
  description,
  index, 
  isVisible, 
  hoveredStat, 
  setHoveredStat,
  onCountComplete,
  showTooltip = false
}: StatCardProps) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Extract the numeric part from the value (e.g., "1,500+" -> 1500)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  
  useEffect(() => {
    if (isVisible && !isAnimating) {
      const delay = 1000 + index * 200; // Stagger the animations
      
      const timer = setTimeout(() => {
        setIsAnimating(true);
        
        let startTime: number;
        let animationFrame: number;
        
        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          
          // Animation duration: 1.5 seconds
          const progress = Math.min(elapsed / 1500, 1);
          
          // Easing function for a more natural animation
          const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          
          const currentCount = Math.floor(easedProgress * numericValue);
          setCount(currentCount);
          
          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
          } else {
            if (onCountComplete) {
              onCountComplete(index, value);
            }
          }
        };
        
        animationFrame = requestAnimationFrame(animate);
        
        return () => {
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
          }
        };
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, numericValue, index, isAnimating, onCountComplete, value]);
  
  const displayValue = isAnimating 
    ? `${count.toLocaleString()}${value.includes('+') ? '+' : ''}`
    : value;
  
  return (
    <div 
      className={cn(
        "relative text-center p-3 sm:p-4 backdrop-blur-md bg-white/5 rounded-xl border border-white/10",
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
      <motion.p 
        className="text-xl sm:text-2xl md:text-3xl font-display text-white mb-1"
        initial={{ scale: 1 }}
        animate={{ 
          scale: hoveredStat === index ? [1, 1.1, 1.05] : 1 
        }}
        transition={{ duration: 0.5 }}
      >
        {displayValue}
      </motion.p>
      <p className="text-xs sm:text-sm text-white/70">{label}</p>
      
      {/* Tooltip */}
      {description && showTooltip && (
        <motion.div 
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg px-3 py-1.5 rounded-lg border border-white/20 text-xs text-white/90 whitespace-nowrap shadow-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: hoveredStat === index ? 1 : 0,
            y: hoveredStat === index ? 0 : 10
          }}
          transition={{ duration: 0.3 }}
        >
          {description}
          <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white/10 border-b border-r border-white/20 rotate-45"></div>
        </motion.div>
      )}
    </div>
  );
};

export default StatCard;
