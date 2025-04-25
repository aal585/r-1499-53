
// This is a mock file to simulate Supabase functionality

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'sale' | 'rent';
  images: string[];
  description: string;
  features: string[];
  user_id: string;
}

// Mock property data
const properties: Property[] = [
  {
    id: "1",
    title: "Forest Retreat",
    location: "Aspen, Colorado",
    price: 2450000,
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    type: 'sale',
    images: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&q=75&fit=crop&w=800",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&q=75&fit=crop&w=800",
      "https://images.unsplash.com/photo-1560185127-cc33f17d79c4?auto=format&q=75&fit=crop&w=800",
    ],
    description: "Nestled in the serene mountains of Aspen, this forest retreat offers luxury living in harmony with nature.",
    features: ["Mountain Views", "Fireplace", "Private Trail", "Home Office", "Wine Cellar"],
    user_id: "user123"
  },
  {
    id: "2",
    title: "Modern Villa",
    location: "Beverly Hills, CA",
    price: 5900000,
    bedrooms: 6,
    bathrooms: 7,
    area: 6500,
    type: 'sale',
    images: [
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&q=75&fit=crop&w=800",
      "https://images.unsplash.com/photo-1560185127-cc33f17d79c4?auto=format&q=75&fit=crop&w=800",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&q=75&fit=crop&w=800",
    ],
    description: "Experience the epitome of luxury in this architectural masterpiece in the heart of Beverly Hills.",
    features: ["Pool", "Home Theater", "Smart Home", "Spa", "4-Car Garage"],
    user_id: "user123"
  }
];

// Mock API functions
export const getProperties = async (): Promise<Property[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return properties;
};

export const getPropertyById = async (id: string): Promise<Property | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const property = properties.find((p) => p.id === id);
  return property || null;
};

export const getUserProperties = async (userId: string): Promise<Property[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600));
  return properties.filter((p) => p.user_id === userId);
};

export const saveProperty = async (property: Omit<Property, 'id'>): Promise<Property> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const newId = `${properties.length + 1}`;
  const newProperty = { ...property, id: newId };
  properties.push(newProperty);
  return newProperty;
};
