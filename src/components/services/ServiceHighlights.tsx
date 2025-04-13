
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Clock, 
  UserCheck, 
  BadgeCheck, 
  ThumbsUp, 
  Zap 
} from 'lucide-react';

const highlights = [
  {
    icon: ShieldCheck,
    title: "Insured & Bonded",
    description: "All our service providers are fully insured and bonded for your peace of mind."
  },
  {
    icon: Clock,
    title: "Same Day Services",
    description: "Many of our providers offer same-day service for urgent needs."
  },
  {
    icon: UserCheck,
    title: "Background Checked",
    description: "Every provider undergoes a thorough background check before joining our platform."
  },
  {
    icon: BadgeCheck,
    title: "Verified Reviews",
    description: "All reviews are from verified customers who used the service."
  },
  {
    icon: ThumbsUp,
    title: "Satisfaction Guarantee",
    description: "Not satisfied? We'll work to make it right or provide a refund."
  },
  {
    icon: Zap,
    title: "Fast Response",
    description: "Providers respond to inquiries within minutes, not hours or days."
  }
];

export default function ServiceHighlights() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-3">
            Why Choose Our Services
          </h2>
          <p className="text-estate-600 max-w-2xl mx-auto">
            We're committed to providing the highest quality home services with professionals you can trust
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl transition-all duration-300 opacity-0 animate-fadeIn"
              style={{ 
                animationDelay: `${index * 100}ms`,
                background: index % 2 === 0 ? 'linear-gradient(135deg, #f0f7ff 0%, #e0f0fe 100%)' : 'white',
                boxShadow: hoveredIndex === index ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`
                w-14 h-14 rounded-full flex items-center justify-center mb-4
                ${hoveredIndex === index ? 'bg-vibrant-purple text-white' : 'bg-estate-50 text-estate-700'}
                transition-all duration-300
              `}>
                <item.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-estate-800">{item.title}</h3>
              <p className="text-estate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
