
import { cn } from "@/lib/utils";

interface PropertyTypeTabsProps {
  activeTab: 'buy' | 'rent';
  setActiveTab: (tab: 'buy' | 'rent') => void;
}

const PropertyTypeTabs = ({ activeTab, setActiveTab }: PropertyTypeTabsProps) => {
  return (
    <div className="inline-flex bg-white/10 backdrop-blur-md rounded-full p-1 shadow-lg">
      <button
        onClick={() => setActiveTab('buy')}
        className={cn(
          "px-8 py-3 rounded-full text-white font-medium transition-all",
          activeTab === 'buy' 
            ? "bg-amber-500 shadow-md" 
            : "hover:bg-white/10"
        )}
      >
        Buy
      </button>
      
      <button
        onClick={() => setActiveTab('rent')}
        className={cn(
          "px-8 py-3 rounded-full text-white font-medium transition-all",
          activeTab === 'rent' 
            ? "bg-amber-500 shadow-md" 
            : "hover:bg-white/10"
        )}
      >
        Rent
      </button>
    </div>
  );
};

export default PropertyTypeTabs;
