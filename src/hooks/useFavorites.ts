
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from './useAuth';
import { toast } from './use-toast';
import { supabase } from '@/lib/supabase';

export const useFavorites = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's favorites
  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*, properties(*)')
        .eq('user_id', user.id);
      
      if (error) throw error;
      setFavorites(data || []);
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
  }, [user]);

  // Load favorites when user changes
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites, user]);

  const checkFavorite = useCallback(async (propertyId: string) => {
    if (!user) return false;
    
    try {
      const { data } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .eq('property_id', propertyId)
        .single();
      
      return !!data;
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }, [user]);

  const toggleFavorite = useCallback(async (propertyId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save favorites",
        variant: "destructive",
      });
      return { success: false };
    }

    setIsLoading(true);
    
    try {
      const isFavorite = await checkFavorite(propertyId);
      
      if (isFavorite) {
        // Remove from favorites
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('property_id', propertyId);
        
        toast({
          title: "Removed from Favorites",
          description: "Property has been removed from your favorites",
        });
      } else {
        // Add to favorites
        await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            property_id: propertyId,
            created_at: new Date().toISOString(),
          });
        
        toast({
          title: "Added to Favorites",
          description: "Property has been added to your favorites",
        });
      }
      
      // Refresh favorites
      fetchFavorites();
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return { success: false };
    }
  }, [user, checkFavorite, fetchFavorites]);

  return { checkFavorite, toggleFavorite, isLoading, favorites, loading };
};
