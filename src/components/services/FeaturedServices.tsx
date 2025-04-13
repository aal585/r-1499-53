
import { useState } from 'react';
import { ArrowRight, Star, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FeaturedService = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  highlights: string[];
  rating: number;
  price: string;
  availableToday: boolean;
};

const featuredServices: FeaturedService[] = [
  {
    id: "home-cleaning",
    title: "Premium Home Cleaning",
    description: "Professional cleaning services with eco-friendly products and detailed attention to your home's needs.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&q=75&fit=crop&w=600",
    category: "Cleaning",
    highlights: ["Eco-friendly products", "Deep cleaning", "Same-day service"],
    rating: 4.9,
    price: "From $120",
    availableToday: true
  },
  {
    id: "home-renovation",
    title: "Home Renovation",
    description: "Transform your living space with our premium renovation services. From kitchen to bathroom remodeling.",
    image: "https://images.unsplash.com/photo-1604709178681-82325c04f8bd?auto=format&q=75&fit=crop&w=600",
    category: "Renovation",
    highlights: ["Free consultation", "Custom designs", "Warranty included"],
    rating: 4.8,
    price: "Custom quote",
    availableToday: false
  },
  {
    id: "smart-home",
    title: "Smart Home Installation",
    description: "Turn your home into a smart living space with professional installation of the latest smart home technology.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&q=75&fit=crop&w=600",
    category: "Technology",
    highlights: ["Latest tech", "Full integration", "Remote support"],
    rating: 4.7,
    price: "From $250",
    availableToday: true
  }
];

export default function FeaturedServices() {
  const navigate = useNavigate();
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <section className="py-16 bg-gradient-to-r from-estate-50 to-pastel-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-3">Featured Services</h2>
          <p className="text-estate-600 max-w-2xl mx-auto">
            Discover our most popular services trusted by thousands of homeowners
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <Card 
              key={service.id}
              className={`overflow-hidden border-0 soft-shadow hover-lift transition-all duration-300 opacity-0 animate-fadeIn ${
                hoveredService === service.id ? 'ring-2 ring-accent-blue ring-offset-2' : ''
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              onClick={() => navigate(`/services/${service.id}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                />
                <div className="absolute top-0 left-0 w-full p-3 flex justify-between">
                  <Badge variant="estate" className="animate-fadeIn animation-delay-300">
                    {service.category}
                  </Badge>
                  {service.availableToday && (
                    <Badge className="bg-green-100 text-green-800 animate-fadeIn animation-delay-400">
                      <Clock className="w-3 h-3 mr-1" />
                      Available Today
                    </Badge>
                  )}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-estate-800">{service.title}</CardTitle>
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span className="text-sm font-medium">{service.rating}</span>
                  </div>
                </div>
                <CardDescription className="text-estate-600">{service.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  {service.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center text-sm text-estate-700">
                      <CheckCircle className="w-4 h-4 text-accent-emerald mr-2" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between items-center border-t pt-4">
                <div className="font-semibold text-vibrant-blue">
                  {service.price}
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-estate-700 group">
                  View details 
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            className="px-6 py-2 bg-vibrant-purple hover:bg-purple-700 text-white"
            onClick={() => navigate('/services/all')}
          >
            View All Services
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
