
import { 
  Wrench, 
  Zap, 
  Droplets, 
  PaintBucket, 
  Sofa, 
  Truck, 
  ShieldCheck, 
  ClipboardList,
  Trees
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: "maintenance",
    name: "Maintenance",
    icon: Wrench,
    color: "bg-blue-500",
    description: "General home repairs and maintenance"
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: Zap,
    color: "bg-yellow-500",
    description: "Electrical installation and repairs"
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: Droplets,
    color: "bg-cyan-500",
    description: "Plumbing services and repairs"
  },
  {
    id: "painting",
    name: "Painting",
    icon: PaintBucket,
    color: "bg-purple-500",
    description: "Interior and exterior painting"
  },
  {
    id: "furniture",
    name: "Furniture",
    icon: Sofa,
    color: "bg-emerald-500",
    description: "Furniture delivery and assembly"
  },
  {
    id: "moving",
    name: "Moving",
    icon: Truck,
    color: "bg-orange-500",
    description: "Professional moving services"
  },
  {
    id: "security",
    name: "Security",
    icon: ShieldCheck,
    color: "bg-red-500",
    description: "Home security solutions"
  },
  {
    id: "inspection",
    name: "Inspection",
    icon: ClipboardList,
    color: "bg-indigo-500",
    description: "Property inspection services"
  },
  {
    id: "landscaping",
    name: "Landscaping",
    icon: Trees,
    color: "bg-green-500",
    description: "Professional landscape design"
  }
];

const ServiceCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (id: string) => {
    navigate(`/services/${id}`);
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
      {categories.map((category, index) => (
        <div 
          key={category.id}
          className="flex flex-col items-center justify-center cursor-pointer opacity-0 animate-fadeIn"
          style={{ animationDelay: `${index * 100}ms` }}
          onClick={() => handleCategoryClick(category.id)}
        >
          <div className={`w-16 h-16 rounded-full ${category.color} text-white flex items-center justify-center mb-2 transform transition-transform hover:scale-110`}>
            <category.icon className="w-8 h-8" />
          </div>
          <span className="text-sm font-medium text-estate-800 text-center">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ServiceCategories;
