
import { supabase } from "@/lib/supabase";
import { PropertyType } from "@/types/property";

export const buildPropertyQuery = async (
  searchQuery: string,
  propertyType: PropertyType,
  priceRange: [number, number],
  bedrooms: string,
  bathrooms: string,
  minArea: number | null,
  maxArea: number | null,
  sortBy: string
) => {
  try {
    // Get the base query first
    const query = supabase.from('properties').select('*');
    const result = await query;
    
    if (result.error) {
      console.error("Error in base query:", result.error);
      return { data: [], error: result.error };
    }
    
    // Filter the data manually in JavaScript since we can't chain properly
    let filteredData = [...(result.data || [])];
    
    // Apply filters one by one
    if (searchQuery) {
      filteredData = filteredData.filter(property => 
        property.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (propertyType !== "all") {
      filteredData = filteredData.filter(property => property.type === propertyType);
    }

    if (priceRange) {
      filteredData = filteredData.filter(property => 
        property.price >= priceRange[0] && property.price <= priceRange[1]
      );
    }

    if (bedrooms && bedrooms !== "any") {
      if (bedrooms === "5+") {
        filteredData = filteredData.filter(property => property.bedrooms >= 5);
      } else {
        filteredData = filteredData.filter(property => property.bedrooms === parseInt(bedrooms));
      }
    }

    if (bathrooms && bathrooms !== "any") {
      if (bathrooms === "4+") {
        filteredData = filteredData.filter(property => property.bathrooms >= 4);
      } else {
        filteredData = filteredData.filter(property => property.bathrooms === parseInt(bathrooms));
      }
    }

    if (minArea) {
      filteredData = filteredData.filter(property => property.area >= minArea);
    }

    if (maxArea) {
      filteredData = filteredData.filter(property => property.area <= maxArea);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filteredData.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredData.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filteredData.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
          const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case "oldest":
        filteredData.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
          const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
          return dateA.getTime() - dateB.getTime();
        });
        break;
      default:
        // Default to newest
        filteredData.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
          const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
          return dateB.getTime() - dateA.getTime();
        });
    }

    return { data: filteredData, error: null };
  } catch (err) {
    console.error("Error in buildPropertyQuery:", err);
    return { data: [], error: err };
  }
};
