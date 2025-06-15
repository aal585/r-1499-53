
import { Menu, LogIn, LogOut, UserCircle, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  // Determine if this is the home page (for styling)
  const isHomePage = location.pathname === "/";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const serviceCategories = [
    { name: "Home Maintenance", path: "/services/maintenance" },
    { name: "Electrical", path: "/services/electrical" },
    { name: "Plumbing", path: "/services/plumbing" },
    { name: "Painting", path: "/services/painting" },
    { name: "Cleaning", path: "/services/cleaning" },
    { name: "Moving", path: "/services/moving" },
    { name: "Security", path: "/services/security" },
    { name: "Landscaping", path: "/services/landscaping" },
  ];

  return (
    <nav className={`${isHomePage ? 'absolute' : ''} w-full z-50 ${!isHomePage ? 'bg-estate-800 py-4' : ''}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="text-3xl font-display text-white tracking-wide hover:opacity-90 transition-opacity">Elite Real Estate</Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/properties" className="text-white hover:text-white/80 transition-colors font-medium">Properties</Link>
            
            {/* Services Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:text-white/80 hover:bg-white/10 data-[active]:bg-white/10 data-[state=open]:bg-white/10">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg min-w-[300px] z-50">
                    <div className="grid grid-cols-2 gap-2 p-4">
                      <div className="col-span-2 mb-2">
                        <NavigationMenuLink asChild>
                          <Link 
                            to="/services" 
                            className="block px-3 py-2 text-estate-800 hover:bg-estate-50 rounded-md font-medium transition-colors"
                          >
                            All Services
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      {serviceCategories.map((category) => (
                        <NavigationMenuLink key={category.name} asChild>
                          <Link 
                            to={category.path}
                            className="block px-3 py-2 text-estate-600 hover:bg-estate-50 hover:text-estate-800 rounded-md text-sm transition-colors"
                          >
                            {category.name}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/furniture" className="text-white hover:text-white/80 transition-colors font-medium">Furniture</Link>
            <Link to="/contact" className="text-white hover:text-white/80 transition-colors font-medium">Contact</Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full overflow-hidden bg-white/10 hover:bg-white/20">
                    <UserCircle className="h-5 w-5 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg z-50">
                  <DropdownMenuLabel>
                    <div className="font-normal text-sm text-gray-500">Signed in as</div>
                    <div className="font-medium truncate">{user?.user_metadata?.name || user?.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <UserCircle className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  onClick={() => navigate("/login")}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button 
                  variant="outline" 
                  className="text-black border-white bg-white hover:bg-white/90 font-semibold shadow-md"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white">
                <div className="flex flex-col space-y-6 mt-12">
                  <Link to="/properties" className="text-lg font-medium text-estate-800">Properties</Link>
                  
                  {/* Mobile Services Dropdown */}
                  <div className="space-y-2">
                    <Link to="/services" className="text-lg font-medium text-estate-800 block">All Services</Link>
                    <div className="ml-4 space-y-2">
                      {serviceCategories.slice(0, 6).map((category) => (
                        <Link 
                          key={category.name}
                          to={category.path} 
                          className="block text-sm text-estate-600 hover:text-estate-800"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <Link to="/furniture" className="text-lg font-medium text-estate-800">Furniture</Link>
                  <Link to="/contact" className="text-lg font-medium text-estate-800">Contact</Link>
                  
                  {user ? (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="px-1">
                        <div className="text-sm text-gray-500">Signed in as</div>
                        <div className="font-medium truncate">{user?.user_metadata?.name || user?.email}</div>
                      </div>
                      <Button 
                        className="w-full bg-estate-800 hover:bg-estate-700 text-white font-semibold shadow-md"
                        onClick={() => navigate("/dashboard")}
                      >
                        <UserCircle className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full border-estate-800 text-estate-800 hover:bg-estate-50"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 pt-4 border-t">
                      <Button 
                        variant="outline"
                        className="w-full border-estate-800 text-estate-800 hover:bg-estate-50"
                        onClick={() => navigate("/login")}
                      >
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                      <Button 
                        className="w-full bg-estate-800 hover:bg-estate-700 text-white font-semibold shadow-md"
                        onClick={() => navigate("/register")}
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
