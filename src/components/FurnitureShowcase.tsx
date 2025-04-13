
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  "All",
  "Living Room",
  "Bedroom",
  "Dining",
  "Office",
  "Outdoor"
];

const furnitureItems = [
  {
    id: "1",
    name: "Modern Sectional Sofa",
    category: "Living Room",
    price: "$1,299",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&q=75&fit=crop&w=600",
    rating: 4.8,
    reviews: 65
  },
  {
    id: "2",
    name: "Minimalist Coffee Table",
    category: "Living Room",
    price: "$349",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&q=75&fit=crop&w=600",
    rating: 4.6,
    reviews: 42
  },
  {
    id: "3",
    name: "Queen Platform Bed",
    category: "Bedroom",
    price: "$899",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&q=75&fit=crop&w=600",
    rating: 4.9,
    reviews: 78
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    category: "Office",
    price: "$299",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&q=75&fit=crop&w=600",
    rating: 4.7,
    reviews: 53
  },
  {
    id: "5",
    name: "Dining Table Set",
    category: "Dining",
    price: "$1,199",
    image: "https://images.unsplash.com/photo-1633439708703-68d72bec7ee4?auto=format&q=75&fit=crop&w=600",
    rating: 4.5,
    reviews: 34
  },
  {
    id: "6",
    name: "Outdoor Patio Set",
    category: "Outdoor",
    price: "$899",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&q=75&fit=crop&w=600",
    rating: 4.4,
    reviews: 29
  }
];

const FurnitureShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  
  const filteredItems = activeCategory === "All" 
    ? furnitureItems 
    : furnitureItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-4">Stylish Home Furniture</h2>
          <p className="text-lg text-estate-600 max-w-3xl mx-auto">
            Discover quality furniture pieces designed to transform your space.
          </p>
        </div>
        
        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${activeCategory === category 
                    ? 'bg-estate-700 text-white' 
                    : 'bg-white text-estate-700 hover:bg-estate-50'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow opacity-0 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-sm font-semibold text-estate-800">
                  {item.price}
                </div>
              </div>
              <div className="p-5">
                <div className="mb-2">
                  <span className="text-xs font-medium text-estate-500">{item.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-estate-800 mb-1">{item.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-estate-600">
                    ★ {item.rating} · {item.reviews} reviews
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-estate-700 hover:bg-estate-800 text-white"
                    onClick={() => navigate(`/furniture/${item.id}`)}
                  >
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            className="bg-estate-800 hover:bg-estate-700 text-white"
            onClick={() => navigate("/furniture")}
          >
            Browse All Furniture
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FurnitureShowcase;
