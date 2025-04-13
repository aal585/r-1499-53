
import { MapPin, Bed, Bath, Square, Home, Tag } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  id?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  type?: 'sale' | 'rent';
  delay?: number;
}

const PropertyCard = ({ 
  image, 
  title, 
  location, 
  price, 
  id = "1",
  bedrooms,
  bathrooms,
  area,
  type = 'sale',
  delay = 0
}: PropertyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const displayPrice = type === 'rent' ? `${price}/month` : price;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Link to={`/property/${id}`}>
      <Card 
        className={cn(
          "overflow-hidden group cursor-pointer transition-all duration-700 border border-estate-200 hover:border-amber-300/50 bg-white h-full transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          isHovered ? "shadow-xl -translate-y-2" : "shadow-sm"
        )}
        style={{ transitionDelay: `${delay}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0 h-full flex flex-col">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={image}
              alt={title}
              className={cn(
                "object-cover w-full h-full transition-transform duration-700",
                isHovered ? "scale-110" : "scale-100"
              )}
            />
            <div 
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-500",
                isHovered ? "opacity-100" : "opacity-0"
              )} 
            />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-estate-800 px-3 py-1.5 text-sm font-medium rounded-md shadow-md">
              {displayPrice}
            </div>
            <div className={cn(
              "absolute top-3 left-3 backdrop-blur-sm text-white px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-1 shadow-md transition-all duration-300",
              type === 'sale' ? 'bg-blue-500/90' : 'bg-green-500/90',
              isHovered ? "translate-y-0 opacity-100" : "translate-y-0 opacity-100"
            )}>
              {type === 'sale' ? <Tag className="w-4 h-4" /> : <Home className="w-4 h-4" />}
              {type === 'sale' ? 'For Sale' : 'For Rent'}
            </div>
            
            {/* Add favorite button */}
            <div className={cn(
              "absolute bottom-3 right-3 transition-all duration-500",
              isHovered ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
            )}>
              <FavoriteButton 
                propertyId={id} 
                variant="outline" 
                size="sm"
                className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-md"
                showText={false}
              />
            </div>
          </div>
          <div className="p-5 flex-grow flex flex-col bg-white">
            <h3 className={cn(
              "text-lg font-medium line-clamp-1 transition-colors duration-300",
              isHovered ? "text-amber-700" : "text-estate-800"
            )}>
              {title}
            </h3>
            <div className="flex items-center mt-2 text-estate-500">
              <MapPin className={cn(
                "w-4 h-4 mr-1 flex-shrink-0 transition-colors duration-300",
                isHovered ? "text-amber-500" : "text-estate-500"
              )} />
              <span className="text-sm line-clamp-1">{location}</span>
            </div>
            
            {(bedrooms !== undefined || bathrooms !== undefined || area !== undefined) && (
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 text-estate-600">
                {bedrooms !== undefined && (
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    <span className="text-xs">{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                  </div>
                )}
                
                {bathrooms !== undefined && (
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    <span className="text-xs">{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                  </div>
                )}
                
                {area !== undefined && (
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    <span className="text-xs">{area.toLocaleString()} sq ft</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
