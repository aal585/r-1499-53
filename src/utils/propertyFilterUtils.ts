
import { PropertyType } from "@/types/property";
import { allProperties } from "@/data/properties";

export const filterLocalProperties = (
  properties: typeof allProperties,
  searchQuery: string,
  priceRange: [number, number],
  bedrooms: string,
  bathrooms: string,
  minArea: number | null,
  maxArea: number | null,
  propertyType: PropertyType
) => {
  let filtered = [...properties];

  if (searchQuery) {
    filtered = filtered.filter(property => 
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  filtered = filtered.filter(property => {
    const numericPrice = parseInt(property.price.replace(/[^0-9]/g, ''));
    return numericPrice >= priceRange[0] && numericPrice <= priceRange[1];
  });

  if (bedrooms && bedrooms !== "any") {
    filtered = filtered.filter(property => 
      bedrooms === "5+" 
        ? property.bedrooms >= 5
        : property.bedrooms === parseInt(bedrooms)
    );
  }

  if (bathrooms && bathrooms !== "any") {
    filtered = filtered.filter(property => 
      bathrooms === "4+" 
        ? property.bathrooms >= 4
        : property.bathrooms === parseInt(bathrooms)
    );
  }

  if (minArea) {
    filtered = filtered.filter(property => property.area >= minArea);
  }

  if (maxArea) {
    filtered = filtered.filter(property => property.area <= maxArea);
  }

  if (propertyType !== "all") {
    filtered = filtered.filter(property => property.type === propertyType);
  }

  return filtered;
};

export const sortProperties = (properties: typeof allProperties, sortBy: string) => {
  const sorted = [...properties];
  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceA - priceB;
      });
    case "price-high":
      return sorted.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceB - priceA;
      });
    case "newest":
    case "oldest":
      // For actual data from Supabase, this would sort by created_at
      return sorted;
    default:
      return sorted;
  }
};
