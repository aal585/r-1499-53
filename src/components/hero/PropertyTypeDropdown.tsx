
import { ChevronDown } from "lucide-react";
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
  return (
    <div className="mb-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:text-white data-[state=open]:bg-white/20">
              <span className="flex items-center gap-1.5">
                Property Type
                <ChevronDown className="h-4 w-4 opacity-70" />
              </span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid grid-cols-2 gap-3 p-4 w-[400px] bg-white rounded-xl shadow-xl">
                {propertyTypes.map((type, i) => (
                  <a
                    key={type.name}
                    href={`/properties?type=${activeTab === 'buy' ? 'sale' : 'rent'}&property=${type.name.toLowerCase()}`}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-estate-50 transition-colors group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-estate-100 text-estate-800 group-hover:bg-estate-200">
                      <span className="text-lg">{type.icon}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-estate-800">{type.name}</div>
                      <div className="text-xs text-estate-500">{type.count} listings</div>
                    </div>
                  </a>
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
