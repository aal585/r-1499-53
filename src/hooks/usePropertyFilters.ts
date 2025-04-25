
import { useState, useEffect } from "react";
import { PropertyType } from "@/types/property";
import { allProperties } from "@/data/properties";
import { filterLocalProperties, sortProperties } from "@/utils/propertyFilterUtils";
import { buildPropertyQuery } from "@/utils/propertyQueryBuilder";

export const usePropertyFilters = (initialSearch: string, initialType: PropertyType) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [propertyType, setPropertyType] = useState<PropertyType>(initialType);
  const [priceRange, setPriceRange] = useState<[number, number]>([1000000, 8000000]);
  const [bedrooms, setBedrooms] = useState<string>("any");
  const [bathrooms, setBathrooms] = useState<string>("any");
  const [minArea, setMinArea] = useState<number | null>(null);
  const [maxArea, setMaxArea] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filteredProperties, setFilteredProperties] = useState<any[]>(allProperties);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchFromSupabase = async () => {
      try {
        const result = await buildPropertyQuery(
          searchQuery,
          propertyType,
          priceRange,
          bedrooms,
          bathrooms,
          minArea,
          maxArea,
          sortBy
        );
        
        if (result && !result.error && result.data) {
          setFilteredProperties(result.data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log("Supabase fetch error or not configured properly:", err);
      }
      
      // Fall back to local filtering
      const filteredLocal = filterLocalProperties(
        allProperties,
        searchQuery,
        priceRange,
        bedrooms,
        bathrooms,
        minArea,
        maxArea,
        propertyType
      );
      
      const sortedProperties = sortProperties(filteredLocal, sortBy);
      setFilteredProperties(sortedProperties);
      setLoading(false);
    };

    fetchFromSupabase();
  }, [searchQuery, priceRange, bedrooms, bathrooms, minArea, maxArea, propertyType, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange([1000000, 8000000]);
    setBedrooms("any");
    setBathrooms("any");
    setMinArea(null);
    setMaxArea(null);
    setPropertyType("all");
    setSortBy("newest");
  };

  return {
    searchQuery,
    setSearchQuery,
    propertyType,
    setPropertyType,
    priceRange,
    setPriceRange,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    minArea,
    setMinArea,
    maxArea,
    setMaxArea,
    sortBy,
    setSortBy,
    filteredProperties,
    resetFilters,
    loading,
  };
};
