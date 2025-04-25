
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

// Type definition for a favorite
export interface Favorite {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
}

// Get all favorites for the current user
export const getUserFavorites = async (userId: string) => {
  try {
    const result = await supabase
      .from('favorites')
      .select('*, properties(*)') 
      .eq('user_id', userId);
    
    const { data, error } = result;
    
    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err: any) {
    console.error('Error fetching favorites:', err);
    return { data: [], error: err.message };
  }
};

// Add a property to favorites
export const addFavorite = async (userId: string, propertyId: string) => {
  try {
    // Check if already favorited to prevent duplicates
    const checkResult = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('property_id', propertyId);
    
    const existingFavorite = checkResult.data && checkResult.data[0];
    
    if (existingFavorite) {
      return { success: true, data: existingFavorite, error: null, alreadyExists: true };
    }
    
    const insertResult = await supabase
      .from('favorites')
      .insert({ user_id: userId, property_id: propertyId })
      .select()
      .single();
    
    const { data, error } = insertResult;
    
    if (error) throw error;
    
    toast({
      title: 'Property Saved',
      description: 'This property has been added to your favorites',
    });
    
    return { success: true, data, error: null, alreadyExists: false };
  } catch (err: any) {
    console.error('Error adding favorite:', err);
    toast({
      title: 'Error',
      description: 'Failed to save property to favorites',
      variant: 'destructive',
    });
    return { success: false, data: null, error: err.message, alreadyExists: false };
  }
};

// Remove a property from favorites
export const removeFavorite = async (userId: string, propertyId: string) => {
  try {
    const result = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('property_id', propertyId);
    
    const { error } = result;
    
    if (error) throw error;
    
    toast({
      title: 'Property Removed',
      description: 'This property has been removed from your favorites',
    });
    
    return { success: true, error: null };
  } catch (err: any) {
    console.error('Error removing favorite:', err);
    toast({
      title: 'Error',
      description: 'Failed to remove property from favorites',
      variant: 'destructive',
    });
    return { success: false, error: err.message };
  }
};

// Check if a property is favorited by the current user
export const isPropertyFavorite = async (userId: string, propertyId: string) => {
  try {
    const result = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('property_id', propertyId);
    
    const { data, error } = result;
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is the "no rows returned" error
    
    return { isFavorite: !!data && data.length > 0, error: null };
  } catch (err: any) {
    console.error('Error checking favorite status:', err);
    return { isFavorite: false, error: err.message };
  }
};
