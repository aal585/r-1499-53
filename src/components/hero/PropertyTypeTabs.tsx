
import { Home, Building, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface PropertyTypeTabsProps {
  activeTab: 'buy' | 'rent';
  setActiveTab: (tab: 'buy' | 'rent') => void;
}

const PropertyTypeTabs = ({ activeTab, setActiveTab }: PropertyTypeTabsProps) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-lg inline-flex">
        <button 
          className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
            activeTab === 'buy' 
              ? 'text-white' 
              : 'text-white/90 hover:bg-white/10'
          }`}
          onClick={() => setActiveTab('buy')}
        >
          {activeTab === 'buy' && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
              layoutId="activeTabBackground"
              initial={false}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="flex items-center gap-1 relative z-10">
            <Home className="w-4 h-4" />
            Buy
            {activeTab === 'buy' && (
              <motion.span 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <ArrowRight className="w-3 h-3 ml-1" />
              </motion.span>
            )}
          </span>
        </button>
        <button 
          className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
            activeTab === 'rent' 
              ? 'text-white' 
              : 'text-white/90 hover:bg-white/10'
          }`}
          onClick={() => setActiveTab('rent')}
        >
          {activeTab === 'rent' && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
              layoutId="activeTabBackground"
              initial={false}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="flex items-center gap-1 relative z-10">
            <Building className="w-4 h-4" />
            Rent
            {activeTab === 'rent' && (
              <motion.span 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <ArrowRight className="w-3 h-3 ml-1" />
              </motion.span>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default PropertyTypeTabs;
