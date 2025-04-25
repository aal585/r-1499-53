import { useState, useEffect } from "react";
import { PropertyType } from "@/types/property";
import { allProperties } from "@/data/properties";
import { supabase } from "@/lib/supabase";

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
    let filtered = allProperties;
    setLoading(true);

    // Try to fetch from Supabase if it's available
    const fetchFromSupabase = async () => {
      try {
        let query = supabase.from('properties').select('*');
        
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
        
        // Handle sorting
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

        const result = await query;
        const { data, error } = result;
        
        if (!error && data) {
          setFilteredProperties(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log("Supabase fetch error or not configured properly:", err);
        // Fall back to local data if Supabase fails
      }
      filterLocalData();
    };

    const filterLocalData = () => {
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

      // Local sorting
      switch (sortBy) {
        case "price-low":
          filtered.sort((a, b) => {
            const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
            const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
            return priceA - priceB;
          });
          break;
        case "price-high":
          filtered.sort((a, b) => {
            const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
            const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
            return priceB - priceA;
          });
          break;
        case "newest":
          // For demo data, we don't have real timestamps
          // For actual data from Supabase, this would work with created_at
          break;
        case "oldest":
          // For demo data, we don't have real timestamps
          break;
      }
      
      setFilteredProperties(filtered);
      setLoading(false);
    };

    // Try Supabase first, fall back to local filtering
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
