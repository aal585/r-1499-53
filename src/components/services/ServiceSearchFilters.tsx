
import { useState } from 'react';
import { Search, MapPin, Star, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ServiceSearchFiltersProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onLocationChange: (location: string) => void;
  onCategoryChange: (category: string) => void;
  onRatingChange: (rating: string) => void;
  onClearFilters: () => void;
};

export default function ServiceSearchFilters({
  searchTerm,
  setSearchTerm,
  onLocationChange,
  onCategoryChange,
  onRatingChange,
  onClearFilters
}: ServiceSearchFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  const categories = [
    'Cleaning', 'Renovation', 'Technology', 'Landscaping', 
    'Repair', 'Security', 'Plumbing', 'Electrical'
  ];
  
  const locations = [
    'Downtown Area', 'City Center', 'Tech District', 
    'Suburban Area', 'Metropolitan Area', 'Multiple Locations'
  ];

  const addFilter = (type: string, value: string) => {
    const filterLabel = `${type}: ${value}`;
    if (!selectedFilters.includes(filterLabel)) {
      setSelectedFilters([...selectedFilters, filterLabel]);
    }
  };

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter(f => f !== filter));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search services..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select onValueChange={(value) => {
          onLocationChange(value);
          addFilter('Location', value);
        }}>
          <SelectTrigger>
            <MapPin className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Category</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        onCategoryChange(category);
                        addFilter('Category', category);
                      }}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Minimum Rating</h4>
                <div className="flex gap-2">
                  {['4.0+', '4.5+', '4.8+'].map((rating) => (
                    <Button
                      key={rating}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        onRatingChange(rating);
                        addFilter('Rating', rating);
                      }}
                    >
                      <Star className="w-3 h-3 mr-1" />
                      {rating}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-estate-600">Active filters:</span>
          {selectedFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => removeFilter(filter)}
            >
              {filter} ×
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedFilters([]);
              onClearFilters();
            }}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
