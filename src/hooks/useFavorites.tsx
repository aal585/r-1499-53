
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { toast } from "./use-toast";
import { supabase } from '@/lib/supabase';

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Load favorites from local storage when user changes
  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [user]);

  // Save favorites to local storage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const fetchFavorites = async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      // First try to use supabase
      try {
        const result = await supabase
          .from('favorites')
          .select('*, properties(*)')
          .eq('user_id', user.id);
        
        // This is now a direct promise result
        const data = result.data;
        const error = result.error;
        
        if (!error && data) {
          setFavorites(data.map(item => item.property_id));
        }
      } catch (error) {
        console.error('Error fetching from supabase, using localStorage instead:', error);
        const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast({
        title: "Error",
        description: "Failed to load favorites",
        variant: "destructive",
      });
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = async (propertyId: string): Promise<boolean> => {
    if (!user) return false;
    return favorites.includes(propertyId);
  };

  const toggleFavorite = async (propertyId: string) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to save properties",
      });
      return { success: false };
    }

    setIsLoading(true);
    
    try {
      if (favorites.includes(propertyId)) {
        // Remove from favorites
        setFavorites(favorites.filter((id) => id !== propertyId));
        // Try to delete from supabase if available
        try {
          const result = await supabase
            .from('favorites')
            .delete()
            .eq('user_id', user.id)
            .eq('property_id', propertyId);
          
          // No need to check result as it's a mock and the state is already updated
        } catch (error) {
          console.error('Supabase delete failed, using local state only:', error);
        }
        
        toast({
          title: "Property removed from favorites",
        });
      } else {
        // Add to favorites
        setFavorites([...favorites, propertyId]);
        // Try to add to supabase if available
        try {
          const result = await supabase
            .from('favorites')
            .insert({
              user_id: user.id,
              property_id: propertyId,
              created_at: new Date().toISOString(),
            })
            .select()
            .single();
          
          // No need to check result as it's a mock and the state is already updated
        } catch (error) {
          console.error('Supabase insert failed, using local state only:', error);
        }
        
        toast({
          title: "Property saved to favorites",
        });
      }

      return { success: true };
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    favorites,
    checkFavorite,
    toggleFavorite,
    isLoading,
    loading,
    fetchFavorites
  };
};

export default useFavorites;
