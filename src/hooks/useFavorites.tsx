
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { toast } from "./use-toast";

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from local storage when user changes
  useEffect(() => {
    if (user) {
      const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        setFavorites([]);
      }
    } else {
      setFavorites([]);
    }
  }, [user]);

  // Save favorites to local storage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

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

    try {
      if (favorites.includes(propertyId)) {
        // Remove from favorites
        setFavorites(favorites.filter((id) => id !== propertyId));
        toast({
          title: "Property removed from favorites",
        });
      } else {
        // Add to favorites
        setFavorites([...favorites, propertyId]);
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
    }
  };

  return {
    favorites,
    checkFavorite,
    toggleFavorite,
  };
};
