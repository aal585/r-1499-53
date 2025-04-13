
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import FeaturedProviders from "@/components/FeaturedProviders";
import FurnitureShowcase from "@/components/FurnitureShowcase";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Home, Sofa, Wrench, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Quick Access Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { 
                title: "Find Properties", 
                description: "Discover your dream home",
                icon: Home,
                color: "bg-estate-50 text-estate-600",
                action: () => navigate("/properties")
              },
              { 
                title: "Shop Furniture", 
                description: "Quality pieces for your home",
                icon: Sofa,
                color: "bg-amber-50 text-amber-600",
                action: () => navigate("/furniture")
              },
              { 
                title: "Book Services", 
                description: "Professional home services",
                icon: Wrench,
                color: "bg-emerald-50 text-emerald-600",
                action: () => navigate("/services")
              },
              { 
                title: "Connect with Experts", 
                description: "Get expert advice",
                icon: Users,
                color: "bg-purple-50 text-purple-600",
                action: () => navigate("/providers")
              },
            ].map((item, index) => (
              <div 
                key={index}
                className="border border-gray-100 rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer opacity-0 animate-fadeIn"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={item.action}
              >
                <div className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-estate-800 mb-1">{item.title}</h3>
                <p className="text-estate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <ServicesSection />
      
      {/* Service Booking CTA */}
      <section className="py-20 bg-estate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-amber to-estate-950"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display mb-4">Need Help With Your Home?</h2>
            <p className="text-estate-200 text-lg mb-8">
              Book one of our professional services today and let our experts handle everything for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-estate-800 hover:bg-estate-100"
                size="lg"
                onClick={() => navigate("/services")}
              >
                Book a Service
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                size="lg"
                onClick={() => navigate("/consultation")}
              >
                Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <FurnitureShowcase />
      <FeaturedProviders />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
