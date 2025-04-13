
import { 
  Wrench, 
  Zap, 
  Droplets, 
  Sofa, 
  PaintBucket, 
  Home, 
  PaintRoller, 
  KeyRound, 
  ShieldCheck 
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Home Maintenance",
    description: "General repairs and maintenance services for your home.",
    icon: Wrench,
    link: "/services/maintenance",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Electricity",
    description: "Electrical installations, repairs, and upgrades.",
    icon: Zap,
    link: "/services/electricity",
    color: "bg-amber-50 text-amber-600"
  },
  {
    title: "Plumbing",
    description: "Plumbing repairs, installations, and emergency services.",
    icon: Droplets,
    link: "/services/plumbing",
    color: "bg-cyan-50 text-cyan-600"
  },
  {
    title: "Furniture",
    description: "Quality furniture for every room in your home.",
    icon: Sofa,
    link: "/furniture",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "Interior Design",
    description: "Professional interior design and decoration services.",
    icon: PaintRoller,
    link: "/services/interior-design",
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Painting",
    description: "Interior and exterior painting services.",
    icon: PaintBucket,
    link: "/services/painting",
    color: "bg-pink-50 text-pink-600"
  },
  {
    title: "Real Estate",
    description: "Find your dream home with our real estate services.",
    icon: Home,
    link: "/properties",
    color: "bg-estate-50 text-estate-600"
  },
  {
    title: "Property Management",
    description: "Comprehensive property management solutions.",
    icon: KeyRound,
    link: "/services/property-management",
    color: "bg-orange-50 text-orange-600"
  },
  {
    title: "Home Security",
    description: "Security systems and solutions for your peace of mind.",
    icon: ShieldCheck,
    link: "/services/security",
    color: "bg-red-50 text-red-600"
  }
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-4">All Your Home Needs in One Place</h2>
          <p className="text-lg text-estate-600">Discover our comprehensive range of home services, from maintenance to furniture.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Link 
              to={service.link} 
              key={service.title}
              className="opacity-0 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="service-card h-full group">
                <div className={`service-icon ${service.color} p-4 inline-flex rounded-2xl`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-estate-800 mb-2 group-hover:text-estate-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-estate-600">
                  {service.description}
                </p>
                <div className="absolute bottom-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-estate-500 text-sm font-medium">Learn more →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
