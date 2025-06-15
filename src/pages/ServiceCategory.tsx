
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard, { ServiceProvider } from '@/components/services/ServiceCard';
import ServiceSearchFilters from '@/components/services/ServiceSearchFilters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Star, MapPin } from 'lucide-react';

const ServiceCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);

  // Mock data - would come from API in real app
  const allProviders: ServiceProvider[] = [
    {
      id: '1',
      name: 'Premium Home Cleaning Co.',
      category: 'Cleaning',
      rating: 4.9,
      reviews: 156,
      location: 'Downtown Area',
      price: 'From $120/service',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&q=75&fit=crop&w=300',
      services: ['Deep Cleaning', 'Regular Maintenance', 'Move-in/Move-out'],
      availableToday: true,
      verified: true,
      experience: '8 years',
      description: 'Professional cleaning services with eco-friendly products and attention to detail.'
    },
    {
      id: '2',
      name: 'Elite Renovation Services',
      category: 'Renovation',
      rating: 4.8,
      reviews: 89,
      location: 'City Center',
      price: 'Custom quotes',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&q=75&fit=crop&w=300',
      services: ['Kitchen Remodeling', 'Bathroom Renovation', 'Home Extensions'],
      availableToday: false,
      verified: true,
      experience: '12 years',
      description: 'Transform your space with our premium renovation and remodeling services.'
    },
    {
      id: '3',
      name: 'QuickFix Plumbing',
      category: 'Plumbing',
      rating: 4.7,
      reviews: 203,
      location: 'Multiple Locations',
      price: 'From $85/hour',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&q=75&fit=crop&w=300',
      services: ['Emergency Repairs', 'Pipe Installation', 'Drain Cleaning'],
      availableToday: true,
      verified: true,
      experience: '10 years',
      description: 'Fast and reliable plumbing services available 24/7 for emergencies.'
    }
  ];

  useEffect(() => {
    const categoryProviders = allProviders.filter(provider => 
      category ? provider.category.toLowerCase() === category.toLowerCase() : true
    );
    
    const filtered = categoryProviders.filter(provider =>
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setFilteredProviders(filtered);
  }, [category, searchTerm]);

  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Services';
  const totalProviders = filteredProviders.length;
  const averageRating = filteredProviders.length > 0 
    ? (filteredProviders.reduce((sum, p) => sum + p.rating, 0) / filteredProviders.length).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="pt-16">
        {/* Category Header */}
        <div className="bg-gradient-to-r from-estate-800 to-estate-600 text-white py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 mb-4"
              onClick={() => navigate('/services')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Services
            </Button>
            
            <h1 className="text-4xl md:text-5xl font-display mb-4">
              {categoryName} Services
            </h1>
            <p className="text-lg md:text-xl text-estate-200 mb-8 max-w-3xl">
              Find verified professionals for all your {categoryName.toLowerCase()} needs. 
              Quality service providers ready to help you today.
            </p>
            
            {/* Category Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Users className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{totalProviders}</div>
                <div className="text-estate-200 text-sm">Service Providers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Star className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{averageRating}</div>
                <div className="text-estate-200 text-sm">Average Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <MapPin className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">5+</div>
                <div className="text-estate-200 text-sm">Service Areas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <ServiceSearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onLocationChange={() => {}}
            onCategoryChange={() => {}}
            onRatingChange={() => {}}
            onClearFilters={() => setSearchTerm('')}
          />

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge variant="secondary" className="bg-estate-100 text-estate-800">
              {categoryName}
            </Badge>
            <Badge variant="outline">Available Today</Badge>
            <Badge variant="outline">Top Rated</Badge>
            <Badge variant="outline">Verified Providers</Badge>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {filteredProviders.length > 0 ? (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-estate-800">
                    {totalProviders} {categoryName} Providers Found
                  </h2>
                  <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option>Sort by Rating</option>
                    <option>Sort by Price</option>
                    <option>Sort by Distance</option>
                  </select>
                </div>
                
                {filteredProviders.map((provider, index) => (
                  <div key={provider.id} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                    <ServiceCard provider={provider} />
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-estate-800 mb-4">
                    No {categoryName} providers found
                  </h3>
                  <p className="text-estate-600 mb-6">
                    Try adjusting your search terms or browse all services.
                  </p>
                  <Button onClick={() => navigate('/services')}>
                    Browse All Services
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServiceCategory;
