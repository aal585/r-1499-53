
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyTypeProps {
  propertyType: {
    name: string;
    count: number;
    icon: string;
  };
}

const PropertyTypeDropdown = ({ propertyType }: PropertyTypeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/properties?type=${propertyType.name.toLowerCase()}`);
  };
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <button className="w-full py-2 group transition-colors duration-300">
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl">{propertyType.icon}</span>
          <span className="text-sm font-medium group-hover:text-amber-200 transition-colors">
            {propertyType.name}
          </span>
          <div className="flex items-center text-xs text-white/70">
            <span>{propertyType.count}</span>
            <ChevronDown 
              className={cn(
                "ml-1 w-3 h-3 transition-transform duration-300",
                isHovered ? "rotate-180" : "rotate-0"
              )} 
            />
          </div>
        </div>
      </button>
      
      {isHovered && (
        <div className="absolute top-full left-0 right-0 mt-2 py-2 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl border border-white/10 opacity-0 animate-fadeIn" style={{ animationDuration: '200ms', animationFillMode: 'forwards' }}>
          <div className="text-xs text-white/80 px-3 py-1 hover:bg-white/10 transition-colors cursor-pointer">
            New York
          </div>
          <div className="text-xs text-white/80 px-3 py-1 hover:bg-white/10 transition-colors cursor-pointer">
            Los Angeles
          </div>
          <div className="text-xs text-white/80 px-3 py-1 hover:bg-white/10 transition-colors cursor-pointer">
            Miami
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyTypeDropdown;
