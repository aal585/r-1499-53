
import { useState } from 'react';
import { Star, MapPin, Clock, Heart, ArrowRight, Calendar, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type ServiceProvider = {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  availableToday: boolean;
  description: string;
  services: string[];
  verified?: boolean;
  price?: string;
};

type ServiceCardProps = {
  provider: ServiceProvider;
};

export default function ServiceCard({ provider }: ServiceCardProps) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      className="bg-white rounded-xl soft-shadow hover-lift border border-gray-100 overflow-hidden cursor-pointer animate-fadeIn"
      onClick={() => navigate(`/providers/${provider.id}`)}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/4 lg:w-1/5">
          <div className="relative w-full h-24 sm:h-full min-h-24">
            <img 
              src={provider.image} 
              alt={provider.name} 
              className="w-full h-full object-cover"
            />
            <button 
              className={`absolute top-2 right-2 p-1.5 rounded-full ${
                isFavorite 
                  ? 'bg-white/90 text-red-500' 
                  : 'bg-white/70 text-gray-500 hover:text-red-500'
              }`}
              onClick={handleFavoriteClick}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            {provider.verified && (
              <div className="absolute bottom-2 left-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-white/80 p-1 rounded-full">
                        <BadgeCheck className="w-4 h-4 text-accent-blue" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Verified Provider</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-estate-800">{provider.name}</h3>
              <div className="flex items-center gap-1 text-sm text-estate-600 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{provider.location}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-amber-500 fill-current mr-1" />
                <span className="font-medium text-estate-800">{provider.rating}</span>
                <span className="text-estate-500 ml-1 text-sm">({provider.reviews})</span>
              </div>
              {provider.price && (
                <div className="text-vibrant-blue font-medium mt-1">
                  {provider.price}
                </div>
              )}
            </div>
          </div>

          <div className="mt-2">
            <Badge className="bg-estate-50 hover:bg-estate-100 text-estate-700 border-0">
              {provider.category}
            </Badge>
            {provider.availableToday && (
              <Badge className="ml-2 bg-green-50 hover:bg-green-100 text-green-700 border-0">
                <Clock className="w-3 h-3 mr-1" />
                Available Today
              </Badge>
            )}
          </div>

          <p className="text-estate-600 text-sm mt-3 line-clamp-2">
            {provider.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {provider.services.slice(0, 3).map((service) => (
              <span 
                key={service} 
                className="text-xs bg-pastel-blue text-estate-700 rounded-full px-2 py-1"
              >
                {service}
              </span>
            ))}
            {provider.services.length > 3 && (
              <span className="text-xs text-estate-500 rounded-full px-2 py-1">
                +{provider.services.length - 3} more
              </span>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-estate-700 border-estate-200 hover:bg-estate-50"
              onClick={(e) => {
                e.stopPropagation();
                // Handle booking logic
              }}
            >
              <Calendar className="w-4 h-4 mr-1" />
              Book Now
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-estate-600 hover:text-estate-800"
            >
              View Profile <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
