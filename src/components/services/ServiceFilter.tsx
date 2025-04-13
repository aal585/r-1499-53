
import { useState } from 'react';
import { Filter, Clock, MapPin, Star, BadgeCheck, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type FilterOption = {
  id: string;
  label: string;
}

const serviceCategories: FilterOption[] = [
  { id: "maintenance", label: "Maintenance" },
  { id: "electrical", label: "Electrical" },
  { id: "plumbing", label: "Plumbing" },
  { id: "painting", label: "Painting" },
  { id: "furniture", label: "Furniture" },
  { id: "moving", label: "Moving" },
  { id: "security", label: "Security" },
  { id: "inspection", label: "Inspection" },
  { id: "landscaping", label: "Landscaping" },
];

const availabilityOptions: FilterOption[] = [
  { id: "today", label: "Available Today" },
  { id: "tomorrow", label: "Available Tomorrow" },
  { id: "weekend", label: "Available This Weekend" },
];

const ratingOptions: FilterOption[] = [
  { id: "4plus", label: "4+ Stars" },
  { id: "4.5plus", label: "4.5+ Stars" },
  { id: "5stars", label: "5 Stars Only" },
];

type ServiceFilterProps = {
  onFilterChange: (filters: ServiceFilters) => void;
}

export type ServiceFilters = {
  categories: string[];
  availability: string[];
  ratings: string[];
  sortBy: string;
}

const sortOptions = [
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

export default function ServiceFilter({ onFilterChange }: ServiceFilterProps) {
  const [filters, setFilters] = useState<ServiceFilters>({
    categories: [],
    availability: [],
    ratings: [],
    sortBy: "rating",
  });

  const handleCategoryChange = (id: string, checked: boolean) => {
    setFilters(prev => {
      const newCategories = checked 
        ? [...prev.categories, id] 
        : prev.categories.filter(cat => cat !== id);
      
      const newFilters = { ...prev, categories: newCategories };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleAvailabilityChange = (id: string, checked: boolean) => {
    setFilters(prev => {
      const newAvailability = checked 
        ? [...prev.availability, id] 
        : prev.availability.filter(a => a !== id);
      
      const newFilters = { ...prev, availability: newAvailability };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleRatingChange = (id: string, checked: boolean) => {
    setFilters(prev => {
      const newRatings = checked 
        ? [...prev.ratings, id] 
        : prev.ratings.filter(r => r !== id);
      
      const newFilters = { ...prev, ratings: newRatings };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleSortChange = (value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, sortBy: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const activeFilterCount = 
    filters.categories.length + 
    filters.availability.length + 
    filters.ratings.length;

  return (
    <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex gap-2">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="border-estate-200 text-estate-700 hover:bg-estate-50">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 text-xs bg-estate-100 text-estate-700 rounded-full px-2 py-0.5">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </DrawerTrigger>
          <DrawerContent className="glass-effect max-h-[85vh] overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle>Filter Services</DrawerTitle>
            </DrawerHeader>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-medium mb-3 text-estate-800">Service Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {serviceCategories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category.id}`} 
                        checked={filters.categories.includes(category.id)}
                        onCheckedChange={(checked) => 
                          handleCategoryChange(category.id, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-normal text-estate-700"
                      >
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3 text-estate-800">Availability</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availabilityOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`availability-${option.id}`} 
                        checked={filters.availability.includes(option.id)}
                        onCheckedChange={(checked) => 
                          handleAvailabilityChange(option.id, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={`availability-${option.id}`}
                        className="text-sm font-normal text-estate-700"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3 text-estate-800">Rating</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {ratingOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`rating-${option.id}`} 
                        checked={filters.ratings.includes(option.id)}
                        onCheckedChange={(checked) => 
                          handleRatingChange(option.id, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={`rating-${option.id}`}
                        className="text-sm font-normal text-estate-700 flex items-center"
                      >
                        {option.label}
                        <Star className="h-3 w-3 ml-1 fill-amber-400 text-amber-400" />
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <Button 
                variant="outline" 
                className="border-estate-200"
                onClick={() => {
                  setFilters({
                    categories: [],
                    availability: [],
                    ratings: [],
                    sortBy: "rating",
                  });
                  onFilterChange({
                    categories: [],
                    availability: [],
                    ratings: [],
                    sortBy: "rating",
                  });
                }}
              >
                Reset Filters
              </Button>
              <DrawerClose asChild>
                <Button>Apply Filters</Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
        
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="border-estate-200 text-estate-700 hover:bg-estate-50">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort by: {sortOptions.find(opt => opt.value === filters.sortBy)?.label || "Highest Rated"}
            </Button>
          </DrawerTrigger>
          <DrawerContent className="glass-effect">
            <DrawerHeader>
              <DrawerTitle>Sort Services</DrawerTitle>
            </DrawerHeader>
            <div className="p-6 space-y-4">
              {sortOptions.map((option) => (
                <div 
                  key={option.value}
                  className={`p-3 rounded-lg cursor-pointer hover-lift ${
                    filters.sortBy === option.value 
                      ? 'bg-estate-50 border border-estate-200' 
                      : 'border border-transparent'
                  }`}
                  onClick={() => handleSortChange(option.value)}
                >
                  <div className="font-medium text-estate-800">{option.label}</div>
                </div>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-estate-200 text-estate-700 hover:bg-estate-50 hidden md:flex"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Near Me
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-estate-200 text-estate-700 hover:bg-estate-50 hidden md:flex"
        >
          <Clock className="h-4 w-4 mr-2" />
          Available Now
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-estate-200 text-estate-700 hover:bg-estate-50 hidden md:flex"
        >
          <BadgeCheck className="h-4 w-4 mr-2" />
          Verified Only
        </Button>
      </div>
    </div>
  );
}
