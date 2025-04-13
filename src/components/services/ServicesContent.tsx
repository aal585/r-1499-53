
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceFilter, { ServiceFilters } from '@/components/services/ServiceFilter';
import ServiceCard, { ServiceProvider } from '@/components/services/ServiceCard';

type ServicesContentProps = {
  providers: ServiceProvider[];
  searchTerm: string;
  filters: ServiceFilters;
  setFilters: React.Dispatch<React.SetStateAction<ServiceFilters>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export default function ServicesContent({ 
  providers, 
  searchTerm, 
  filters, 
  setFilters,
  activeTab,
  setActiveTab
}: ServicesContentProps) {
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>(providers);

  useEffect(() => {
    let filtered = providers.filter(provider => 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (filters.categories.length > 0) {
      filtered = filtered.filter(provider => 
        filters.categories.includes(provider.category.toLowerCase())
      );
    }

    if (filters.availability.includes('today')) {
      filtered = filtered.filter(provider => provider.availableToday);
    }

    if (filters.ratings.length > 0) {
      filtered = filtered.filter(provider => {
        if (filters.ratings.includes('5stars') && provider.rating < 5) return false;
        if (filters.ratings.includes('4.5plus') && provider.rating < 4.5) return false;
        if (filters.ratings.includes('4plus') && provider.rating < 4) return false;
        return true;
      });
    }

    if (activeTab === 'top-rated') {
      filtered = filtered.filter(provider => provider.rating >= 4.8);
    } else if (activeTab === 'available-today') {
      filtered = filtered.filter(provider => provider.availableToday);
    }

    if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'price-low' || filters.sortBy === 'price-high') {
      const getPriceValue = (provider: ServiceProvider) => {
        const priceStr = provider.price || '';
        const match = priceStr.match(/\$(\d+)/);
        return match ? parseInt(match[1]) : 999;
      };
      
      if (filters.sortBy === 'price-low') {
        filtered.sort((a, b) => getPriceValue(a) - getPriceValue(b));
      } else {
        filtered.sort((a, b) => getPriceValue(b) - getPriceValue(a));
      }
    } else if (filters.sortBy === 'newest') {
      filtered.reverse();
    }

    setFilteredProviders(filtered);
  }, [searchTerm, filters, activeTab, providers]);

  const handleFilterChange = (newFilters: ServiceFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="w-full lg:w-2/3">
      <div className="bg-white p-6 rounded-xl soft-shadow border border-gray-100 mb-6">
        <h2 className="text-xl font-semibold text-estate-800 mb-6">Available Service Providers</h2>
        
        <ServiceFilter onFilterChange={handleFilterChange} />
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-estate-50">
            <TabsTrigger value="all" className="data-[state=active]:bg-white">All</TabsTrigger>
            <TabsTrigger value="top-rated" className="data-[state=active]:bg-white">Top Rated</TabsTrigger>
            <TabsTrigger value="available-today" className="data-[state=active]:bg-white">Available Today</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider, index) => (
                <div key={provider.id} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                  <ServiceCard provider={provider} />
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-estate-600">No service providers match your search criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setFilters({
                      categories: [],
                      availability: [],
                      ratings: [],
                      sortBy: 'rating',
                    });
                    setActiveTab('all');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="top-rated" className="space-y-6">
            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider, index) => (
                <div key={provider.id} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                  <ServiceCard provider={provider} />
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-estate-600">No top-rated service providers match your search criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setFilters({
                      categories: [],
                      availability: [],
                      ratings: [],
                      sortBy: 'rating',
                    });
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="available-today" className="space-y-6">
            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider, index) => (
                <div key={provider.id} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                  <ServiceCard provider={provider} />
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-estate-600">No service providers available today match your search criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setFilters({
                      categories: [],
                      availability: [],
                      ratings: [],
                      sortBy: 'rating',
                    });
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
