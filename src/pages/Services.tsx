import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCategories from '@/components/ServiceCategories';
import FeaturedProviders from '@/components/FeaturedProviders';
import FeaturedServices from '@/components/services/FeaturedServices';
import ServiceHighlights from '@/components/services/ServiceHighlights';
import ServiceCompare from '@/components/services/ServiceCompare';
import { ServiceFilters } from '@/components/services/ServiceFilter';
import { ServiceProvider } from '@/components/services/ServiceCard';
import ServicesHeader from '@/components/services/ServicesHeader';
import ServicesContent from '@/components/services/ServicesContent';
import ServicesSidebar from '@/components/services/ServicesSidebar';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero with gradient background */}
      <ServicesHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
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
            <ServicesContent 
              providers={serviceProviders}
              searchTerm={searchTerm}
              filters={filters}
              setFilters={setFilters}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            
            {/* Right column - Booking form */}
            <ServicesSidebar />
          </div>
        </div>
      </section>

      <FeaturedProviders />
      <Footer />
    </div>
  );
};

export default Services;
