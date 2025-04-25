
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
    const queryResult = await supabase
      .from('favorites')
      .select('*, properties(*)') 
      .eq('user_id', userId);
    
    return { data: queryResult.data || [], error: queryResult.error };
  } catch (err: any) {
    console.error('Error fetching favorites:', err);
    return { data: [], error: err.message };
  }
};

// Add a property to favorites
export const addFavorite = async (userId: string, propertyId: string) => {
  try {
    // Check if already favorited to prevent duplicates
    const checkQuery = supabase
      .from('favorites')
      .select('id');
    
    const checkResult = await checkQuery
      .eq('user_id', userId)
      .eq('property_id', propertyId);
    
    if (checkResult.error) throw checkResult.error;
    
    const existingFavorite = checkResult.data && checkResult.data[0];
    
    if (existingFavorite) {
      return { success: true, data: existingFavorite, error: null, alreadyExists: true };
    }
    
    const insertQuery = supabase
      .from('favorites')
      .insert({ user_id: userId, property_id: propertyId })
      .select()
      .single();
    
    const insertResult = await insertQuery;
    
    if (insertResult.error) throw insertResult.error;
    
    toast({
      title: 'Property Saved',
      description: 'This property has been added to your favorites',
    });
    
    return { success: true, data: insertResult.data, error: null, alreadyExists: false };
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
    const deleteQuery = supabase
      .from('favorites')
      .delete();
    
    const deleteResult = await deleteQuery
      .eq('user_id', userId)
      .eq('property_id', propertyId);
    
    if (deleteResult.error) throw deleteResult.error;
    
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
    const checkQuery = supabase
      .from('favorites')
      .select('id');
    
    const result = await checkQuery
      .eq('user_id', userId)
      .eq('property_id', propertyId);
    
    if (result.error && result.error.code !== 'PGRST116') throw result.error; // PGRST116 is the "no rows returned" error
    
    return { isFavorite: !!result.data && result.data.length > 0, error: null };
  } catch (err: any) {
    console.error('Error checking favorite status:', err);
    return { isFavorite: false, error: err.message };
  }
};
