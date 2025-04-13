
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const providers = [
  {
    id: "1",
    name: "Johnson Home Services",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&q=75&fit=crop&w=120",
    rating: 4.9,
    reviews: 156,
    services: ["Plumbing", "Electrical", "General Repairs"],
    description: "With over 15 years of experience, we provide reliable and professional home services."
  },
  {
    id: "2",
    name: "Elite Interior Design",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&q=75&fit=crop&w=120",
    rating: 4.8,
    reviews: 89,
    services: ["Interior Design", "Decoration", "Consultation"],
    description: "Transform your space with our award-winning interior design services."
  },
  {
    id: "3",
    name: "Smith Furniture Co.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&q=75&fit=crop&w=120",
    rating: 4.7,
    reviews: 112,
    services: ["Custom Furniture", "Installation", "Delivery"],
    description: "Quality custom furniture crafted for your unique space and style."
  },
  {
    id: "4",
    name: "Reliable Painters",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&q=75&fit=crop&w=120",
    rating: 4.6,
    reviews: 73,
    services: ["Interior Painting", "Exterior Painting", "Color Consultation"],
    description: "Professional painting services with attention to detail and quality finishes."
  }
];

const FeaturedProviders = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-2">Top-Rated Service Providers</h2>
            <p className="text-lg text-estate-600">Professional services from trusted experts in your area</p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0 border-estate-300 text-estate-700 hover:bg-estate-50"
            onClick={() => navigate("/services")}
          >
            View All Providers
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {providers.map((provider, index) => (
            <div 
              key={provider.id}
              className="border rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4 opacity-0 animate-fadeIn"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden">
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
                  <div className="flex items-center text-amber-500">
                    <Star className="fill-current w-4 h-4" />
                    <span className="text-sm font-medium ml-1">{provider.rating}</span>
                    <span className="text-xs text-estate-500 ml-1">({provider.reviews})</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {provider.services.map(service => (
                    <span key={service} className="text-xs bg-estate-50 text-estate-700 rounded-full px-2 py-1">
                      {service}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-estate-600 mb-3">{provider.description}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-estate-700 border-estate-200 hover:bg-estate-50"
                  onClick={() => navigate(`/providers/${provider.id}`)}
                >
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
