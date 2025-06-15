import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  ShoppingCart, 
  Share2, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  Plus,
  Minus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Furniture data (in a real app, this would come from an API)
const furnitureData = {
  "1": {
    id: "1",
    name: "Modern Sectional Sofa",
    category: "Living Room",
    price: 1299,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&q=75&fit=crop&w=800",
      "https://images.unsplash.com/photo-1586023492045-2b2d8e7e2d2e?auto=format&q=75&fit=crop&w=800",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&q=75&fit=crop&w=800"
    ],
    rating: 4.8,
    reviews: 65,
    onSale: false,
    description: "Contemporary design with plush cushions and durable fabric. This sectional sofa combines comfort with modern aesthetics, perfect for any living space.",
    features: ["Stain-resistant fabric", "Modular design", "Solid wood frame", "10-year warranty"],
    colors: ["Gray", "Blue", "Beige"],
    dimensions: "110\"W x 70\"D x 33\"H",
    specifications: {
      "Material": "Premium fabric upholstery",
      "Frame": "Solid hardwood construction",
      "Cushions": "High-density foam",
      "Weight": "180 lbs",
      "Assembly": "Minimal assembly required"
    }
  },
  "2": {
    id: "2",
    name: "Minimalist Coffee Table",
    category: "Living Room",
    price: 349,
    salePrice: 279,
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&q=75&fit=crop&w=800",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&q=75&fit=crop&w=800"
    ],
    rating: 4.6,
    reviews: 42,
    onSale: true,
    description: "Clean lines and premium materials make this coffee table a perfect centerpiece for your living room.",
    features: ["Tempered glass top", "Solid oak base", "Easy assembly", "Scratch-resistant"],
    colors: ["Natural", "Walnut", "White"],
    dimensions: "48\"W x 24\"D x 18\"H",
    specifications: {
      "Material": "Tempered glass and solid oak",
      "Weight": "65 lbs",
      "Assembly": "30 minutes assembly time",
      "Care": "Wipe clean with damp cloth"
    }
  },
  "3": {
    id: "3",
    name: "Ergonomic Office Chair",
    category: "Office",
    price: 599,
    salePrice: 449,
    images: [
      "https://images.unsplash.com/photo-1541558869434-2840d308329a?auto=format&q=75&fit=crop&w=800",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&q=75&fit=crop&w=800"
    ],
    rating: 4.9,
    reviews: 128,
    onSale: true,
    description: "Premium ergonomic design with lumbar support and breathable mesh back. Perfect for long work sessions.",
    features: ["Lumbar support", "Breathable mesh", "Height adjustable", "360° swivel"],
    colors: ["Black", "Gray", "White"],
    dimensions: "26\"W x 26\"D x 40-44\"H",
    specifications: {
      "Material": "Mesh and high-grade plastic",
      "Weight capacity": "300 lbs",
      "Wheels": "Smooth-rolling casters",
      "Warranty": "5-year manufacturer warranty"
    }
  },
  "4": {
    id: "4",
    name: "Rustic Dining Table",
    category: "Dining Room",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1449247613801-f8091ade433b?auto=format&q=75&fit=crop&w=800",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&q=75&fit=crop&w=800"
    ],
    rating: 4.7,
    reviews: 89,
    onSale: false,
    description: "Handcrafted from reclaimed wood with natural finish. Seats up to 6 people comfortably.",
    features: ["Reclaimed wood", "Natural finish", "Seats 6", "Handcrafted"],
    colors: ["Natural", "Dark Walnut"],
    dimensions: "72\"L x 36\"W x 30\"H",
    specifications: {
      "Material": "Reclaimed hardwood",
      "Finish": "Natural wood stain",
      "Weight": "120 lbs",
      "Care": "Regular wood polish recommended"
    }
  },
  "5": {
    id: "5",
    name: "Memory Foam Mattress",
    category: "Bedroom",
    price: 799,
    salePrice: 599,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&q=75&fit=crop&w=800",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&q=75&fit=crop&w=800"
    ],
    rating: 4.8,
    reviews: 156,
    onSale: true,
    description: "Premium memory foam with cooling gel technology. Medium-firm support for optimal comfort.",
    features: ["Cooling gel", "Memory foam", "Medium-firm", "10-year warranty"],
    colors: ["White"],
    dimensions: "60\"W x 80\"L x 12\"H (Queen)",
    specifications: {
      "Material": "Memory foam with gel infusion",
      "Firmness": "Medium-firm",
      "Thickness": "12 inches",
      "Trial": "100-night sleep trial"
    }
  },
  "6": {
    id: "6",
    name: "Modern Bookshelf",
    category: "Office",
    price: 399,
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0e501ba2fe8?auto=format&q=75&fit=crop&w=800",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&q=75&fit=crop&w=800"
    ],
    rating: 4.5,
    reviews: 73,
    onSale: false,
    description: "Sleek 5-shelf design with clean lines. Perfect for displaying books, decor, and storage.",
    features: ["5 shelves", "Modern design", "Easy assembly", "Versatile storage"],
    colors: ["White", "Black", "Walnut"],
    dimensions: "32\"W x 12\"D x 72\"H",
    specifications: {
      "Material": "Engineered wood",
      "Shelves": "5 adjustable shelves",
      "Weight capacity": "40 lbs per shelf",
      "Assembly": "Tools included"
    }
  }
};

const FurnitureDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const furniture = id ? furnitureData[id as keyof typeof furnitureData] : null;

  if (!furniture) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold text-estate-800 mb-4">Product Not Found</h1>
          <p className="text-estate-600 mb-8">The furniture item you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/furniture")}>
            Back to Furniture
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const currentPrice = furniture.onSale && furniture.salePrice ? furniture.salePrice : furniture.price;

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${furniture.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${furniture.name} has been added to your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-estate-600 mb-6">
          <button onClick={() => navigate("/furniture")} className="hover:text-estate-800">
            Furniture
          </button>
          <span>/</span>
          <span className="text-estate-800">{furniture.name}</span>
        </div>

        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/furniture")}
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Furniture
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-white shadow-sm">
              <img 
                src={furniture.images[selectedImage]} 
                alt={furniture.name}
                className="w-full h-full object-cover"
              />
            </div>
            {furniture.images.length > 1 && (
              <div className="flex space-x-2">
                {furniture.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-estate-700' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${furniture.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="estate" className="mb-2">{furniture.category}</Badge>
              <h1 className="text-3xl font-bold text-estate-800 mb-2">{furniture.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(furniture.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-estate-600">
                    {furniture.rating} ({furniture.reviews} reviews)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                {furniture.onSale && furniture.salePrice ? (
                  <>
                    <span className="text-3xl font-bold text-estate-800">${currentPrice}</span>
                    <span className="text-xl text-gray-500 line-through">${furniture.price}</span>
                    <Badge className="bg-red-500 text-white">SALE</Badge>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-estate-800">${currentPrice}</span>
                )}
              </div>
            </div>

            <p className="text-estate-600 leading-relaxed">{furniture.description}</p>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-medium text-estate-800 mb-3">Available Colors</h3>
              <div className="flex space-x-2">
                {furniture.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-md border transition-colors ${
                      selectedColor === color 
                        ? 'border-estate-700 bg-estate-50 text-estate-800' 
                        : 'border-gray-300 hover:border-estate-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-medium text-estate-800 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-estate-800 hover:bg-estate-700 text-white"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${(currentPrice * quantity).toLocaleString()}
              </Button>
              
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  onClick={handleAddToWishlist}
                  className="flex-1"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-estate-700" />
                <p className="text-sm font-medium">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-estate-700" />
                <p className="text-sm font-medium">Warranty</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 mx-auto mb-2 text-estate-700" />
                <p className="text-sm font-medium">30-Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="mt-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-estate-800 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {furniture.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-estate-700 rounded-full mr-3"></div>
                      <span className="text-estate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-estate-50 rounded-lg">
                  <p className="text-sm text-estate-700">
                    <strong>Dimensions:</strong> {furniture.dimensions}
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-estate-800 mb-4">Specifications</h3>
                <div className="space-y-4">
                  {Object.entries(furniture.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-estate-700">{key}</span>
                      <span className="text-estate-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-estate-800 mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="text-4xl font-bold text-estate-800">{furniture.rating}</div>
                    <div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.floor(furniture.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-sm text-estate-600">{furniture.reviews} reviews</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="ml-2 font-medium text-estate-800">Sarah Johnson</span>
                        </div>
                        <span className="text-sm text-estate-500">2 weeks ago</span>
                      </div>
                      <p className="text-estate-600">
                        "Absolutely love this furniture! The quality is exceptional and it looks exactly as pictured. Highly recommend!"
                      </p>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                            <Star className="w-4 h-4 text-gray-300" />
                          </div>
                          <span className="ml-2 font-medium text-estate-800">Mike Chen</span>
                        </div>
                        <span className="text-sm text-estate-500">1 month ago</span>
                      </div>
                      <p className="text-estate-600">
                        "Great furniture piece, very comfortable and well-made. Assembly was straightforward."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FurnitureDetail;
