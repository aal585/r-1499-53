
import { Home, Building } from "lucide-react";

interface PropertyTypeTabsProps {
  activeTab: 'buy' | 'rent';
  setActiveTab: (tab: 'buy' | 'rent') => void;
}

const PropertyTypeTabs = ({ activeTab, setActiveTab }: PropertyTypeTabsProps) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-lg inline-flex">
        <button 
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeTab === 'buy' 
              ? 'bg-amber-500 text-white shadow-md transform scale-105' 
              : 'text-white/90 hover:bg-white/10'
          }`}
          onClick={() => setActiveTab('buy')}
        >
          <span className="flex items-center gap-1">
            <Home className="w-4 h-4" />
            Buy
          </span>
        </button>
        <button 
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeTab === 'rent' 
              ? 'bg-amber-500 text-white shadow-md transform scale-105' 
              : 'text-white/90 hover:bg-white/10'
          }`}
          onClick={() => setActiveTab('rent')}
        >
          <span className="flex items-center gap-1">
            <Building className="w-4 h-4" />
            Rent
          </span>
        </button>
      </div>
    </div>
  );
};

export default PropertyTypeTabs;
