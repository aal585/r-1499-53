
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

interface PropertyType {
  name: string;
  count: number;
  icon: string;
}

interface PropertyTypeDropdownProps {
  propertyTypes: PropertyType[];
  activeTab: 'buy' | 'rent';
}

const PropertyTypeDropdown = ({ propertyTypes, activeTab }: PropertyTypeDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-4">
      <NavigationMenu onValueChange={(value) => setIsOpen(value.length > 0)}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:text-white data-[state=open]:bg-white/20">
              <motion.span 
                className="flex items-center gap-1.5"
                animate={{ y: isOpen ? -2 : 0 }}
                transition={{ duration: 0.2 }}
              >
                Property Type
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </motion.div>
              </motion.span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid grid-cols-2 gap-3 p-4 w-[400px] bg-white/95 backdrop-blur-md rounded-xl shadow-xl">
                {propertyTypes.map((type, i) => (
                  <motion.a
                    key={type.name}
                    href={`/properties?type=${activeTab === 'buy' ? 'sale' : 'rent'}&property=${type.name.toLowerCase()}`}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-estate-50 transition-colors group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div 
                      className="flex h-10 w-10 items-center justify-center rounded-md bg-estate-100 text-estate-800 group-hover:bg-estate-200"
                      whileHover={{ 
                        rotate: [0, -10, 10, -5, 5, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      <span className="text-lg">{type.icon}</span>
                    </motion.div>
                    <div>
                      <div className="text-sm font-medium text-estate-800">{type.name}</div>
                      <div className="text-xs text-estate-500">{type.count} listings</div>
                    </div>
                    <motion.div 
                      className="ml-auto opacity-0 group-hover:opacity-100"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="bg-estate-800 text-white text-xs px-2 py-0.5 rounded">View</div>
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default PropertyTypeDropdown;
