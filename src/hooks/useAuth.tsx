
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

// Define the User type
interface User {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
  };
  phone?: string;
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the Auth provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication functions for demo purposes
  useEffect(() => {
    // Simulate checking for existing session
    const checkSession = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // For demo, we'll create a simulated user
      const mockUser: User = {
        id: "user123",
        email,
        user_metadata: {
          name: email.split('@')[0],
        },
      };

      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: "Invalid email or password" };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Create a simulated user
      const mockUser: User = {
        id: "user123",
        email,
        user_metadata: {
          name,
        },
      };

      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to create account" };
    }
  };

  const signOut = async () => {
    localStorage.removeItem("user");
    setUser(null);
    toast({
      title: "Signed out successfully",
    });
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!user) return { success: false, error: "Not authenticated" };
      
      const updatedUser = {
        ...user,
        ...data,
        user_metadata: {
          ...user.user_metadata,
          ...data.user_metadata,
        }
      };
      
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to update profile" };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
