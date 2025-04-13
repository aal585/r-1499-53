
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCategories from '@/components/ServiceCategories';
import ServiceBookingForm from '@/components/ServiceBookingForm';
import FeaturedProviders from '@/components/FeaturedProviders';
import { Search, MapPin, Filter, Clock, Star, Calendar, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

const serviceProviders = [
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
  },
];

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredProviders = serviceProviders.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero */}
      <div className="bg-estate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display mb-4">Professional Home Services</h1>
            <p className="text-estate-200 text-lg mb-8">
              Find trusted professionals for all your home service needs.
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-estate-400" />
              </div>
              <Input
                type="text"
                placeholder="Search for services or providers..."
                className="pl-10 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-md focus:border-white focus:ring-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                className="absolute inset-y-2 right-2 bg-white text-estate-800 hover:bg-estate-100"
                onClick={() => {/* Handle search */}}
              >
                Search
              </Button>
            </div>
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
      
      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left column - Service providers */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                <h2 className="text-xl font-semibold text-estate-800 mb-4">Available Service Providers</h2>
                
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
                    <TabsTrigger value="available-today">Available Today</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-6">
                    {filteredProviders.map((provider) => (
                      <div 
                        key={provider.id}
                        className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 cursor-pointer"
                        onClick={() => navigate(`/providers/${provider.id}`)}
                      >
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-lg overflow-hidden">
                            <img 
                              src={provider.image} 
                              alt={provider.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center mb-1">
                            <h3 className="text-lg font-semibold text-estate-800 mr-2">{provider.name}</h3>
                            {provider.availableToday && (
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                Available Today
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-estate-600 text-sm mb-2">
                            <MapPin className="w-3.5 h-3.5 mr-1" />
                            <span>{provider.location}</span>
                            <span className="mx-2">•</span>
                            <span className="font-medium text-estate-700">{provider.category}</span>
                            <span className="mx-2">•</span>
                            <div className="flex items-center">
                              <Star className="w-3.5 h-3.5 text-yellow-500 fill-current mr-1" />
                              <span>{provider.rating}</span>
                              <span className="text-estate-500 ml-1">({provider.reviews})</span>
                            </div>
                          </div>
                          <p className="text-estate-600 text-sm mb-3">{provider.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {provider.services.map((service) => (
                              <span 
                                key={service} 
                                className="text-xs bg-estate-50 text-estate-700 rounded-full px-2 py-1"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex-shrink-0 flex flex-col justify-between items-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-estate-700 border-estate-200 hover:bg-estate-50"
                          >
                            <Calendar className="w-4 h-4 mr-1" />
                            Book
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-estate-600 hover:text-estate-800"
                          >
                            View Profile <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="top-rated" className="space-y-6">
                    {filteredProviders
                      .filter(provider => provider.rating >= 4.8)
                      .map((provider) => (
                        // Same provider card component as above
                        <div 
                          key={provider.id}
                          className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 cursor-pointer"
                          onClick={() => navigate(`/providers/${provider.id}`)}
                        >
                          {/* Content same as above */}
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-lg overflow-hidden">
                              <img 
                                src={provider.image} 
                                alt={provider.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center mb-1">
                              <h3 className="text-lg font-semibold text-estate-800 mr-2">{provider.name}</h3>
                              {provider.availableToday && (
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                  Available Today
                                </span>
                              )}
                            </div>
                            <div className="flex items-center text-estate-600 text-sm mb-2">
                              <MapPin className="w-3.5 h-3.5 mr-1" />
                              <span>{provider.location}</span>
                              <span className="mx-2">•</span>
                              <span className="font-medium text-estate-700">{provider.category}</span>
                              <span className="mx-2">•</span>
                              <div className="flex items-center">
                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-current mr-1" />
                                <span>{provider.rating}</span>
                                <span className="text-estate-500 ml-1">({provider.reviews})</span>
                              </div>
                            </div>
                            <p className="text-estate-600 text-sm mb-3">{provider.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {provider.services.map((service) => (
                                <span 
                                  key={service} 
                                  className="text-xs bg-estate-50 text-estate-700 rounded-full px-2 py-1"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex-shrink-0 flex flex-col justify-between items-end">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-estate-700 border-estate-200 hover:bg-estate-50"
                            >
                              <Calendar className="w-4 h-4 mr-1" />
                              Book
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-estate-600 hover:text-estate-800"
                            >
                              View Profile <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                  
                  <TabsContent value="available-today" className="space-y-6">
                    {filteredProviders
                      .filter(provider => provider.availableToday)
                      .map((provider) => (
                        // Same provider card component as above
                        <div 
                          key={provider.id}
                          className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 cursor-pointer"
                          onClick={() => navigate(`/providers/${provider.id}`)}
                        >
                          {/* Content same as above */}
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-lg overflow-hidden">
                              <img 
                                src={provider.image} 
                                alt={provider.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center mb-1">
                              <h3 className="text-lg font-semibold text-estate-800 mr-2">{provider.name}</h3>
                              {provider.availableToday && (
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                  Available Today
                                </span>
                              )}
                            </div>
                            <div className="flex items-center text-estate-600 text-sm mb-2">
                              <MapPin className="w-3.5 h-3.5 mr-1" />
                              <span>{provider.location}</span>
                              <span className="mx-2">•</span>
                              <span className="font-medium text-estate-700">{provider.category}</span>
                              <span className="mx-2">•</span>
                              <div className="flex items-center">
                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-current mr-1" />
                                <span>{provider.rating}</span>
                                <span className="text-estate-500 ml-1">({provider.reviews})</span>
                              </div>
                            </div>
                            <p className="text-estate-600 text-sm mb-3">{provider.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {provider.services.map((service) => (
                                <span 
                                  key={service} 
                                  className="text-xs bg-estate-50 text-estate-700 rounded-full px-2 py-1"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex-shrink-0 flex flex-col justify-between items-end">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-estate-700 border-estate-200 hover:bg-estate-50"
                            >
                              <Calendar className="w-4 h-4 mr-1" />
                              Book
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-estate-600 hover:text-estate-800"
                            >
                              View Profile <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Right column - Booking form */}
            <div className="w-full lg:w-1/3">
              <ServiceBookingForm />
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
