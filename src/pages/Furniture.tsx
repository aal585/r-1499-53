
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal, Heart, ShoppingCart, ChevronsUpDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

const furnitureItems = [
  {
    id: "1",
    name: "Modern Sectional Sofa",
    category: "Living Room",
    price: 1299,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&q=75&fit=crop&w=600",
    rating: 4.8,
    reviews: 65,
    onSale: false,
    description: "Contemporary design with plush cushions and durable fabric.",
    features: ["Stain-resistant fabric", "Modular design", "Solid wood frame", "10-year warranty"],
    colors: ["Gray", "Blue", "Beige"],
    dimensions: "110\"W x 70\"D x 33\"H"
  },
  {
    id: "2",
    name: "Minimalist Coffee Table",
    category: "Living Room",
    price: 349,
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&q=75&fit=crop&w=600",
    rating: 4.6,
    reviews: 42,
    onSale: true,
    salePrice: 279,
    description: "Clean lines and premium materials make this coffee table a perfect centerpiece.",
    features: ["Tempered glass top", "Solid oak base", "Easy assembly", "Scratch-resistant"],
    colors: ["Natural", "Walnut", "White"],
    dimensions: "48\"W x 24\"D x 18\"H"
  },
  {
    id: "3",
    name: "Queen Platform Bed",
    category: "Bedroom",
    price: 899,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&q=75&fit=crop&w=600",
    rating: 4.9,
    reviews: 78,
    onSale: false,
    description: "Sleek platform bed with headboard storage and solid construction.",
    features: ["Built-in storage", "No box spring needed", "Upholstered headboard", "Easy assembly"],
    colors: ["Gray", "Navy", "Cream"],
    dimensions: "65\"W x 86\"D x 40\"H"
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    category: "Office",
    price: 299,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&q=75&fit=crop&w=600",
    rating: 4.7,
    reviews: 53,
    onSale: false,
    description: "Comfortable and adjustable office chair designed for long working hours.",
    features: ["Lumbar support", "Adjustable height", "360° swivel", "Breathable mesh"],
    colors: ["Black", "Gray", "Blue"],
    dimensions: "26\"W x 26\"D x 38-42\"H"
  },
  {
    id: "5",
    name: "Dining Table Set",
    category: "Dining",
    price: 1199,
    image: "https://images.unsplash.com/photo-1633439708703-68d72bec7ee4?auto=format&q=75&fit=crop&w=600",
    rating: 4.5,
    reviews: 34,
    onSale: true,
    salePrice: 999,
    description: "Modern dining set with table and six chairs in contemporary design.",
    features: ["Solid wood construction", "Comfortable upholstered chairs", "Extendable table", "Seats 6-8 people"],
    colors: ["Espresso", "White/Natural", "Black"],
    dimensions: "Table: 72\"L x 42\"W x 30\"H"
  },
  {
    id: "6",
    name: "Outdoor Patio Set",
    category: "Outdoor",
    price: 899,
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&q=75&fit=crop&w=600",
    rating: 4.4,
    reviews: 29,
    onSale: false,
    description: "Weather-resistant outdoor furniture set with comfortable cushions.",
    features: ["All-weather wicker", "Fade-resistant cushions", "Rust-proof frame", "Easy to clean"],
    colors: ["Brown/Beige", "Gray/White", "Black/Gray"],
    dimensions: "Sofa: 78\"W x 32\"D x 33\"H, Table: 40\"W x 20\"D x 18\"H"
  },
  {
    id: "7",
    name: "Bookshelf with Storage",
    category: "Living Room",
    price: 249,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&q=75&fit=crop&w=600",
    rating: 4.3,
    reviews: 42,
    onSale: false,
    description: "Versatile bookshelf with open and closed storage options.",
    features: ["Multiple compartments", "Adjustable shelves", "Solid construction", "Wall anchor included"],
    colors: ["White", "Black", "Oak"],
    dimensions: "36\"W x 12\"D x 72\"H"
  },
  {
    id: "8",
    name: "Modern Nightstand",
    category: "Bedroom",
    price: 179,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&q=75&fit=crop&w=600",
    rating: 4.6,
    reviews: 31,
    onSale: true,
    salePrice: 149,
    description: "Sleek nightstand with drawer and open shelf for bedroom storage.",
    features: ["Soft-close drawer", "USB charging port", "Compact design", "Easy assembly"],
    colors: ["White", "Walnut", "Gray"],
    dimensions: "20\"W x 16\"D x 24\"H"
  },
];

const categories = [
  "Living Room",
  "Bedroom",
  "Dining",
  "Office",
  "Outdoor",
  "Kitchen",
  "Bathroom"
];

const priceRanges = [
  { min: 0, max: 500, label: "Under $500" },
  { min: 500, max: 1000, label: "$500 - $1,000" },
  { min: 1000, max: 2000, label: "$1,000 - $2,000" },
  { min: 2000, max: Infinity, label: "$2,000+" }
];

const Furniture = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortOption, setSortOption] = useState("featured");
  const navigate = useNavigate();

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };

  const filteredFurniture = furnitureItems.filter(item => {
    // Filter by search term
    const matchesSearch = searchTerm === "" || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(item.category);
    
    // Filter by price
    const price = item.onSale ? item.salePrice! : item.price;
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortOption === "price-low") {
      const priceA = a.onSale ? a.salePrice! : a.price;
      const priceB = b.onSale ? b.salePrice! : b.price;
      return priceA - priceB;
    } else if (sortOption === "price-high") {
      const priceA = a.onSale ? a.salePrice! : a.price;
      const priceB = b.onSale ? b.salePrice! : b.price;
      return priceB - priceA;
    } else if (sortOption === "rating") {
      return b.rating - a.rating;
    }
    // Default: featured
    return 0;
  });

  // Filter component for desktop
  const FilterComponent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-estate-800 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <Checkbox 
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <label 
                htmlFor={`category-${category}`}
                className="ml-2 text-sm font-medium text-estate-700 cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-estate-800 mb-3">Price Range</h3>
        <div className="px-2">
          <Slider 
            defaultValue={priceRange} 
            max={3000} 
            step={50} 
            onValueChange={handlePriceChange}
            className="my-6"
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-estate-600">${priceRange[0]}</span>
          <span className="text-sm text-estate-600">${priceRange[1]}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-estate-800 mb-3">Special Offers</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <Checkbox id="on-sale" />
            <label 
              htmlFor="on-sale"
              className="ml-2 text-sm font-medium text-estate-700 cursor-pointer"
            >
              On Sale
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox id="free-shipping" />
            <label 
              htmlFor="free-shipping"
              className="ml-2 text-sm font-medium text-estate-700 cursor-pointer"
            >
              Free Shipping
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero */}
      <div className="bg-estate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display mb-4">Quality Home Furniture</h1>
            <p className="text-estate-200 text-lg mb-8">
              Discover stylish and functional furniture pieces for every room in your home.
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-estate-400" />
              </div>
              <Input
                type="text"
                placeholder="Search for furniture..."
                className="pl-10 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-md focus:border-white focus:ring-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                className="absolute inset-y-2 right-2 bg-white text-estate-800 hover:bg-estate-100"
                onClick={() => {/* Handle search */}}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-1/4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-semibold text-estate-800 mb-6">Filters</h2>
                <FilterComponent />
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="w-full lg:w-3/4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-xl font-semibold text-estate-800">
                    {filteredFurniture.length} {filteredFurniture.length === 1 ? "Product" : "Products"}
                  </h2>
                  
                  <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    {/* Mobile Filter Button */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="lg:hidden border-estate-200 text-estate-700"
                        >
                          <Filter className="w-4 h-4 mr-2" />
                          Filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader className="mb-6">
                          <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <FilterComponent />
                      </SheetContent>
                    </Sheet>
                    
                    {/* Sort Dropdown */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-estate-600">Sort:</span>
                      <select
                        className="text-sm border-estate-200 rounded-md"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                      >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Display Tabs */}
                <Tabs defaultValue="grid" className="mb-6">
                  <TabsList className="hidden sm:flex">
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="grid">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredFurniture.map((item, index) => (
                        <div 
                          key={item.id}
                          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 opacity-0 animate-fadeIn"
                          style={{ animationDelay: `${index * 100}ms` }}
                          onClick={() => navigate(`/furniture/${item.id}`)}
                        >
                          <div className="relative aspect-square overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                            {item.onSale && (
                              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                                SALE
                              </div>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="absolute top-3 right-3 bg-white/80 hover:bg-white text-estate-700 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                /* Handle wishlist */
                              }}
                            >
                              <Heart className="h-5 w-5" />
                            </Button>
                          </div>
                          <div className="p-4">
                            <div className="mb-1">
                              <span className="text-xs font-medium text-estate-500">{item.category}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-estate-800 mb-1 truncate">{item.name}</h3>
                            <div className="flex items-center mb-3">
                              <div className="flex items-center text-amber-500">
                                <span className="text-sm font-medium">★</span>
                                <span className="text-sm font-medium ml-1">{item.rating}</span>
                              </div>
                              <span className="text-xs text-estate-500 ml-1">({item.reviews})</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                {item.onSale ? (
                                  <div className="flex items-center">
                                    <span className="text-lg font-bold text-estate-800">${item.salePrice}</span>
                                    <span className="text-sm text-estate-500 line-through ml-2">${item.price}</span>
                                  </div>
                                ) : (
                                  <span className="text-lg font-bold text-estate-800">${item.price}</span>
                                )}
                              </div>
                              <Button 
                                size="sm" 
                                className="bg-estate-700 hover:bg-estate-800 text-white"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  /* Handle add to cart */
                                }}
                              >
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="list">
                    <div className="space-y-6">
                      {filteredFurniture.map((item, index) => (
                        <div 
                          key={item.id}
                          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col sm:flex-row opacity-0 animate-fadeIn"
                          style={{ animationDelay: `${index * 100}ms` }}
                          onClick={() => navigate(`/furniture/${item.id}`)}
                        >
                          <div className="relative sm:w-48 md:w-64">
                            <div className="aspect-square">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {item.onSale && (
                              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                                SALE
                              </div>
                            )}
                          </div>
                          <div className="p-4 flex-grow flex flex-col">
                            <div className="mb-1">
                              <span className="text-xs font-medium text-estate-500">{item.category}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-estate-800 mb-1">{item.name}</h3>
                            <div className="flex items-center mb-2">
                              <div className="flex items-center text-amber-500">
                                <span className="text-sm font-medium">★</span>
                                <span className="text-sm font-medium ml-1">{item.rating}</span>
                              </div>
                              <span className="text-xs text-estate-500 ml-1">({item.reviews})</span>
                            </div>
                            <p className="text-sm text-estate-600 mb-3 flex-grow">{item.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {item.features.slice(0, 3).map(feature => (
                                <span 
                                  key={feature} 
                                  className="text-xs bg-estate-50 text-estate-700 rounded-full px-2 py-1"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                            <div className="flex justify-between items-center mt-auto">
                              <div>
                                {item.onSale ? (
                                  <div className="flex items-center">
                                    <span className="text-lg font-bold text-estate-800">${item.salePrice}</span>
                                    <span className="text-sm text-estate-500 line-through ml-2">${item.price}</span>
                                  </div>
                                ) : (
                                  <span className="text-lg font-bold text-estate-800">${item.price}</span>
                                )}
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="border-estate-200 text-estate-700"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    /* Handle wishlist */
                                  }}
                                >
                                  <Heart className="w-4 h-4 mr-1" />
                                  Save
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="bg-estate-700 hover:bg-estate-800 text-white"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    /* Handle add to cart */
                                  }}
                                >
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display text-estate-800 mb-8">Shop by Room</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Living Room", "Bedroom", "Dining Room", "Office"].map((room, index) => (
              <div 
                key={room}
                className="relative rounded-xl overflow-hidden cursor-pointer group opacity-0 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  setSelectedCategories([room]);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="aspect-[4/3]">
                  <img 
                    src={`https://images.unsplash.com/photo-${index === 0 ? '1586023492045-2b2d8e7e2d2e' : 
                              index === 1 ? '1505693416388-ac5ce068fe85' : 
                              index === 2 ? '1615874959474-d609969a20ed' : 
                              '1524758631624-e2822e304c36'}`} 
                    alt={room}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-white text-xl font-semibold">{room}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Furniture;
