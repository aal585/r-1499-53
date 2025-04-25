
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
  // Start with the base query
  let query = supabase.from('properties').select('*');
  
  // Apply filters one by one
  if (searchQuery) {
    query = query.or(`location.ilike.%${searchQuery}%,title.ilike.%${searchQuery}%`);
  }

  if (propertyType !== "all") {
    query = query.eq('type', propertyType);
  }

  if (priceRange) {
    query = query.gte('price', priceRange[0]);
    query = query.lte('price', priceRange[1]);
  }

  if (bedrooms && bedrooms !== "any") {
    if (bedrooms === "5+") {
      query = query.gte('bedrooms', 5);
    } else {
      query = query.eq('bedrooms', parseInt(bedrooms));
    }
  }

  if (bathrooms && bathrooms !== "any") {
    if (bathrooms === "4+") {
      query = query.gte('bathrooms', 4);
    } else {
      query = query.eq('bathrooms', parseInt(bathrooms));
    }
  }

  if (minArea) {
    query = query.gte('area', minArea);
  }

  if (maxArea) {
    query = query.lte('area', maxArea);
  }

  // Apply sorting at the end
  switch (sortBy) {
    case "price-low":
      query = query.order('price', { ascending: true });
      break;
    case "price-high":
      query = query.order('price', { ascending: false });
      break;
    case "newest":
      query = query.order('created_at', { ascending: false });
      break;
    case "oldest":
      query = query.order('created_at', { ascending: true });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  // Execute and return the query
  const result = await query;
  return result;
};
