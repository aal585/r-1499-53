
import { cn } from "@/lib/utils";

interface StatsSectionProps {
  isVisible: boolean;
}

const StatsSection = ({ isVisible }: StatsSectionProps) => {
  const stats = [
    { value: "200+", label: "Luxury Properties" },
    { value: "10K+", label: "Happy Clients" },
    { value: "15+", label: "Years Experience" },
    { value: "25+", label: "Cities Covered" }
  ];

  return (
    <div className={cn(
      "absolute bottom-12 left-0 right-0 bg-white/10 backdrop-blur-md py-6 px-4 transition-all duration-1000 ease-out transform",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
    )}>
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center"
              style={{ 
                animationDelay: `${800 + index * 100}ms`,
                opacity: 0,
                animation: isVisible ? 'fadeIn 0.5s ease-out forwards' : 'none'
              }}
            >
              <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
