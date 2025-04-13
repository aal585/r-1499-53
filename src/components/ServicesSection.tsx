
import { 
  Wrench, 
  Zap, 
  Droplets, 
  Sofa, 
  PaintBucket, 
  Home, 
  PaintRoller, 
  KeyRound, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const services = [
  {
    title: "Home Maintenance",
    description: "General repairs and maintenance services for your home.",
    icon: Wrench,
    link: "/services/maintenance",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    hoverColor: "group-hover:bg-blue-100 group-hover:text-blue-700 group-hover:border-blue-200",
    gradient: "from-blue-500/5 to-blue-500/20"
  },
  {
    title: "Electricity",
    description: "Electrical installations, repairs, and upgrades.",
    icon: Zap,
    link: "/services/electricity",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    hoverColor: "group-hover:bg-amber-100 group-hover:text-amber-700 group-hover:border-amber-200",
    gradient: "from-amber-500/5 to-amber-500/20"
  },
  {
    title: "Plumbing",
    description: "Plumbing repairs, installations, and emergency services.",
    icon: Droplets,
    link: "/services/plumbing",
    color: "bg-cyan-50 text-cyan-600 border-cyan-100",
    hoverColor: "group-hover:bg-cyan-100 group-hover:text-cyan-700 group-hover:border-cyan-200",
    gradient: "from-cyan-500/5 to-cyan-500/20"
  },
  {
    title: "Furniture",
    description: "Quality furniture for every room in your home.",
    icon: Sofa,
    link: "/furniture",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    hoverColor: "group-hover:bg-emerald-100 group-hover:text-emerald-700 group-hover:border-emerald-200",
    gradient: "from-emerald-500/5 to-emerald-500/20"
  },
  {
    title: "Interior Design",
    description: "Professional interior design and decoration services.",
    icon: PaintRoller,
    link: "/services/interior-design",
    color: "bg-purple-50 text-purple-600 border-purple-100",
    hoverColor: "group-hover:bg-purple-100 group-hover:text-purple-700 group-hover:border-purple-200",
    gradient: "from-purple-500/5 to-purple-500/20"
  },
  {
    title: "Painting",
    description: "Interior and exterior painting services.",
    icon: PaintBucket,
    link: "/services/painting",
    color: "bg-pink-50 text-pink-600 border-pink-100",
    hoverColor: "group-hover:bg-pink-100 group-hover:text-pink-700 group-hover:border-pink-200",
    gradient: "from-pink-500/5 to-pink-500/20"
  },
  {
    title: "Real Estate",
    description: "Find your dream home with our real estate services.",
    icon: Home,
    link: "/properties",
    color: "bg-estate-50 text-estate-600 border-estate-100",
    hoverColor: "group-hover:bg-estate-100 group-hover:text-estate-700 group-hover:border-estate-200",
    gradient: "from-estate-500/5 to-estate-500/20"
  },
  {
    title: "Property Management",
    description: "Comprehensive property management solutions.",
    icon: KeyRound,
    link: "/services/property-management",
    color: "bg-orange-50 text-orange-600 border-orange-100",
    hoverColor: "group-hover:bg-orange-100 group-hover:text-orange-700 group-hover:border-orange-200",
    gradient: "from-orange-500/5 to-orange-500/20"
  },
  {
    title: "Home Security",
    description: "Security systems and solutions for your peace of mind.",
    icon: ShieldCheck,
    link: "/services/security",
    color: "bg-red-50 text-red-600 border-red-100",
    hoverColor: "group-hover:bg-red-100 group-hover:text-red-700 group-hover:border-red-200",
    gradient: "from-red-500/5 to-red-500/20"
  }
];

const ServicesSection = () => {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById("services-section");
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="services-section" className="py-20 bg-gray-50">
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
              className={cn(
                "opacity-0",
                isInView ? "animate-fadeIn" : ""
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="group h-full relative bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`service-icon ${service.color} ${service.hoverColor} p-4 inline-flex rounded-2xl border transition-colors duration-300`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-estate-800 mt-4 mb-2 group-hover:text-estate-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-estate-600 mb-4">
                    {service.description}
                  </p>
                  <div className="inline-flex items-center text-estate-500 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
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
