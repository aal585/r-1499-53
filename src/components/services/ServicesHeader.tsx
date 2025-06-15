
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type ServicesHeaderProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export default function ServicesHeader({ searchTerm, setSearchTerm }: ServicesHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-estate-800 to-estate-600 text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-display mb-4">
          Professional Home Services
        </h1>
        <p className="text-lg md:text-xl text-estate-200 mb-8 max-w-2xl mx-auto">
          Connect with verified service providers for all your home needs. 
          From cleaning to renovation, find trusted professionals in your area.
        </p>
        
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for services, providers..."
                className="pl-10 py-6 bg-white/90 border-white/30 text-gray-800 placeholder:text-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              size="lg"
              className="px-8 bg-vibrant-blue hover:bg-blue-700"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex justify-center mt-4 text-sm text-estate-200">
            Popular searches: Cleaning • Plumbing • Electrical • Landscaping
          </div>
        </div>
      </div>
    </div>
  );
}
