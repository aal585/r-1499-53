
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

export interface PropertyInsert extends Omit<Property, 'id'> {}

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

// Mock supabase client
export const supabase = {
  from: (table: string) => ({
    select: (columns: string = '*') => ({
      eq: (column: string, value: any) => ({
        single: () => mockSingleQuery(table, column, value),
        order: () => mockOrderedQuery(table, column, value),
        gte: () => mockRangeQuery(table),
        lte: () => mockRangeQuery(table),
      }),
      gte: (column: string, value: any) => ({
        lte: (column: string, value: any) => mockRangeQuery(table),
        order: () => mockOrderedQuery(table),
      }),
      lte: (column: string, value: any) => ({
        order: () => mockOrderedQuery(table),
      }),
      order: (column: string, { ascending = true } = {}) => mockOrderedQuery(table),
      or: (query: string) => ({
        eq: () => mockFilteredQuery(table),
        gte: () => mockRangeQuery(table),
        lte: () => mockRangeQuery(table),
        order: () => mockOrderedQuery(table),
      }),
    }),
    insert: (data: any) => ({
      select: () => ({ single: () => mockInsert(table, data) }),
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        select: () => ({ single: () => mockUpdate(table, column, value, data) }),
      }),
    }),
    delete: () => ({
      eq: (column: string, value: any) => mockDelete(table, column, value),
    }),
  }),
  storage: {
    from: (bucket: string) => ({
      upload: (path: string, file: File) => Promise.resolve({ data: { path }, error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: `https://mockcdn.com/${path}` } }),
    }),
  },
  channel: (name: string) => ({
    on: (event: string, config: any, callback: () => void) => ({ subscribe: () => ({ subscription: name }) }),
  }),
  removeChannel: (subscription: any) => {},
};

// Mock utility functions
const mockSingleQuery = (table: string, column: string, value: any) => {
  if (table === 'properties') {
    const property = properties.find(p => p[column as keyof Property] === value);
    return Promise.resolve({ data: property, error: property ? null : { message: 'Not found' } });
  }
  return Promise.resolve({ data: null, error: null });
};

const mockOrderedQuery = (table: string, column?: string, value?: any) => {
  if (table === 'properties') {
    return Promise.resolve({ data: [...properties], error: null });
  }
  return Promise.resolve({ data: [], error: null });
};

const mockRangeQuery = (table: string) => {
  if (table === 'properties') {
    return Promise.resolve({ data: [...properties], error: null });
  }
  return Promise.resolve({ data: [], error: null });
};

const mockFilteredQuery = (table: string) => {
  if (table === 'properties') {
    return Promise.resolve({ data: [...properties], error: null });
  }
  return Promise.resolve({ data: [], error: null });
};

const mockInsert = (table: string, data: any) => {
  if (table === 'properties') {
    const newProperty = { ...data, id: `${properties.length + 1}` };
    properties.push(newProperty as Property);
    return Promise.resolve({ data: newProperty, error: null });
  }
  return Promise.resolve({ data: { ...data, id: '123' }, error: null });
};

const mockUpdate = (table: string, column: string, value: any, data: any) => {
  if (table === 'properties') {
    const index = properties.findIndex(p => p[column as keyof Property] === value);
    if (index !== -1) {
      properties[index] = { ...properties[index], ...data };
      return Promise.resolve({ data: properties[index], error: null });
    }
  }
  return Promise.resolve({ data: null, error: { message: 'Not found' } });
};

const mockDelete = (table: string, column: string, value: any) => {
  if (table === 'properties') {
    const index = properties.findIndex(p => p[column as keyof Property] === value);
    if (index !== -1) {
      properties.splice(index, 1);
      return Promise.resolve({ error: null });
    }
  }
  return Promise.resolve({ error: null });
};

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

export const saveProperty = async (property: PropertyInsert): Promise<Property> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const newId = `${properties.length + 1}`;
  const newProperty = { ...property, id: newId };
  properties.push(newProperty);
  return newProperty;
};
