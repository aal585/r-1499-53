
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicesHeader from '@/components/services/ServicesHeader';
import ServicesContent from '@/components/services/ServicesContent';
import ServicesSidebar from '@/components/services/ServicesSidebar';
import FeaturedServices from '@/components/services/FeaturedServices';
import { ServiceProvider } from '@/components/services/ServiceCard';

export interface ServiceFilters {
  categories: string[];
  availability: string[];
  ratings: string[];
  sortBy: string;
}

// Complete service providers data
const serviceProviders: ServiceProvider[] = [
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
    name: 'Smart Home Tech Solutions',
    category: 'Technology',
    rating: 4.7,
    reviews: 203,
    location: 'Tech District',
    price: 'From $250/installation',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&q=75&fit=crop&w=300',
    services: ['Smart Home Setup', 'Security Systems', 'Home Automation'],
    availableToday: true,
    verified: true,
    experience: '6 years',
    description: 'Turn your home into a smart living space with cutting-edge technology.'
  },
  {
    id: '4',
    name: 'GreenThumb Landscaping',
    category: 'Landscaping',
    rating: 4.6,
    reviews: 124,
    location: 'Suburban Area',
    price: 'From $80/hour',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&q=75&fit=crop&w=300',
    services: ['Garden Design', 'Lawn Maintenance', 'Tree Services'],
    availableToday: true,
    verified: true,
    experience: '10 years',
    description: 'Professional landscaping services to create your dream outdoor space.'
  },
  {
    id: '5',
    name: 'Fix-It-Fast Repairs',
    category: 'Repair',
    rating: 4.5,
    reviews: 267,
    location: 'Multiple Locations',
    price: 'From $60/hour',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&q=75&fit=crop&w=300',
    services: ['Plumbing', 'Electrical', 'HVAC', 'General Repairs'],
    availableToday: true,
    verified: true,
    experience: '15 years',
    description: 'Quick and reliable repair services for all your home maintenance needs.'
  },
  {
    id: '6',
    name: 'Secure Guard Services',
    category: 'Security',
    rating: 4.8,
    reviews: 92,
    location: 'Metropolitan Area',
    price: 'From $200/month',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&q=75&fit=crop&w=300',
    services: ['Home Security', '24/7 Monitoring', 'Camera Installation'],
    availableToday: false,
    verified: true,
    experience: '20 years',
    description: 'Comprehensive security solutions to protect your home and family.'
  }
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="pt-16">
        <ServicesHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <FeaturedServices />
        
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            <ServicesContent 
              providers={serviceProviders}
              searchTerm={searchTerm}
              filters={filters}
              setFilters={setFilters}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <ServicesSidebar />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Services;
