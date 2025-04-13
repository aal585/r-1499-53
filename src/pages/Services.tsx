import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCategories from '@/components/ServiceCategories';
import ServiceBookingForm from '@/components/ServiceBookingForm';
import FeaturedProviders from '@/components/FeaturedProviders';
import FeaturedServices from '@/components/services/FeaturedServices';
import ServiceHighlights from '@/components/services/ServiceHighlights';
import { Search, MapPin, Filter, Clock, Star, Calendar, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import ServiceFilter, { ServiceFilters } from '@/components/services/ServiceFilter';
import ServiceCard, { ServiceProvider } from '@/components/services/ServiceCard';
import ServiceCompare from '@/components/services/ServiceCompare';
import { motion } from 'framer-motion';

const serviceProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Johnson Electrical Services',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&q=75&fit=crop&w=120',
    category: 'Electrical',
    rating: 4.9,
    reviews: 120,
    location: 'Beverly Hills, CA',
    availableToday: true,
    description: 'Expert electrician with over 15 years of experience. Specializing in residential and commercial services.',
    services: ['Wiring', 'Lighting', 'Panel Upgrades', 'Troubleshooting'],
    verified: true,
    price: 'From $85/hr',
  },
  {
    id: '2',
    name: 'Professional Plumbing Co.',
    image: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?auto=format&q=75&fit=crop&w=120',
    category: 'Plumbing',
    rating: 4.7,
    reviews: 85,
    location: 'Santa Monica, CA',
    availableToday: false,
    description: 'Licensed plumbers providing quality service. Emergency services available 24/7.',
    services: ['Repairs', 'Installation', 'Drain Cleaning', 'Water Heaters'],
    verified: true,
    price: 'From $95/hr',
  },
  {
    id: '3',
    name: 'Master Home Painters',
    image: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&q=75&fit=crop&w=120',
    category: 'Painting',
    rating: 4.8,
    reviews: 92,
    location: 'Malibu, CA',
    availableToday: true,
    description: 'Professional painters delivering exceptional results. Interior and exterior painting services.',
    services: ['Interior', 'Exterior', 'Decorative', 'Cabinet Refinishing'],
    price: 'From $65/hr',
  },
  {
    id: '4',
    name: 'Reliable Home Maintenance',
    image: 'https://images.unsplash.com/photo-1567515004624-219c11d31f2e?auto=format&q=75&fit=crop&w=120',
    category: 'Maintenance',
    rating: 4.6,
    reviews: 78,
    location: 'Brentwood, CA',
    availableToday: true,
    description: 'Comprehensive home maintenance services. From repairs to improvements, we do it all.',
    services: ['Repairs', 'Installations', 'Carpentry', 'Handyman Services'],
    verified: true,
  },
  {
    id: '5',
    name: 'Green Landscape Design',
    image: 'https://images.unsplash.com/photo-1622818425825-3b63a3e0ac22?auto=format&q=75&fit=crop&w=120',
    category: 'Landscaping',
    rating: 4.9,
    reviews: 65,
    location: 'Pacific Palisades, CA',
    availableToday: false,
    description: 'Transform your outdoor space with our expert landscape design and maintenance services.',
    services: ['Design', 'Planting', 'Maintenance', 'Irrigation'],
    price: 'From $120/hr',
  },
  {
    id: '6',
    name: 'Security Solutions',
    image: 'https://images.unsplash.com/photo-1584941648665-effee21a2651?auto=format&q=75&fit=crop&w=120',
    category: 'Security',
    rating: 4.7,
    reviews: 56,
    location: 'Hollywood, CA',
    availableToday: true,
    description: 'Protect your home with state-of-the-art security systems and professional installation.',
    services: ['Alarms', 'Cameras', 'Smart Locks', 'Monitoring'],
    verified: true,
    price: 'Packages from $299',
  },
];

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ServiceFilters>({
    categories: [],
    availability: [],
    ratings: [],
    sortBy: 'rating',
  });
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>(serviceProviders);

  useEffect(() => {
    let filtered = serviceProviders.filter(provider => 
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
  }, [searchTerm, filters, activeTab]);

  const handleFilterChange = (newFilters: ServiceFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero with gradient background */}
      <div className="bg-gradient-to-r from-estate-800 via-vibrant-purple to-estate-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-display mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Professional Home Services
            </motion.h1>
            <motion.p 
              className="text-estate-200 text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Find trusted professionals for all your home service needs.
            </motion.p>
            
            <motion.div 
              className="relative max-w-2xl mx-auto glass-effect rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/70" />
              </div>
              <Input
                type="text"
                placeholder="Search for services or providers..."
                className="pl-10 py-6 bg-transparent border-white/40 text-white placeholder:text-white/70 rounded-lg focus-visible:ring-white/70"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                className="absolute inset-y-2 right-2 bg-white text-estate-800 hover:bg-estate-100"
                onClick={() => {/* Handle search */}}
              >
                Search
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Service Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display text-estate-800 mb-8 text-center">Browse Service Categories</h2>
          <ServiceCategories />
        </div>
      </section>
      
      {/* Featured Services Section */}
      <FeaturedServices />
      
      {/* Service Compare Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <ServiceCompare providers={serviceProviders} />
        </div>
      </section>
      
      {/* Service Highlights Section */}
      <ServiceHighlights />
      
      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left column - Service providers */}
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
                            setSearchTerm('');
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
                            setSearchTerm('');
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
                            setSearchTerm('');
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
            
            {/* Right column - Booking form */}
            <div className="w-full lg:w-1/3">
              <ServiceBookingForm />
              
              {/* Quick contact section */}
              <motion.div 
                className="bg-white p-6 rounded-xl soft-shadow border border-gray-100 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-estate-800 mb-3">Need Help?</h3>
                <p className="text-estate-600 text-sm mb-4">
                  Our service experts are ready to assist you in finding the perfect service provider for your needs.
                </p>
                <div className="flex flex-col space-y-3">
                  <Button className="w-full bg-accent-amber hover:bg-amber-600 group">
                    Call Us
                    <Phone className="w-4 h-4 ml-2 transition-transform group-hover:rotate-12" />
                  </Button>
                  <Button variant="outline" className="w-full group">
                    Send Message
                    <MessageSquare className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProviders />
      <Footer />
    </div>
  );
};

export default Services;
