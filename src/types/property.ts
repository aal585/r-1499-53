
export interface Property {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  type?: 'sale' | 'rent';
  description?: string;
  features?: string[];
  images?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}
