
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import OurVision from "@/components/OurVision";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import FeaturedProviders from "@/components/FeaturedProviders";
import FurnitureShowcase from "@/components/FurnitureShowcase";
import HomeServiceBooking from "@/components/HomeServiceBooking";
import ServicesSection from "@/components/ServicesSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Featured Properties Section */}
      <section id="properties" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-2">Featured Properties</h2>
              <p className="text-lg text-estate-600">Discover our handpicked selection of premium properties</p>
            </div>
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0 border-estate-300 text-estate-700 hover:bg-estate-50"
              onClick={() => navigate("/properties")}
            >
              View All Properties
            </Button>
          </div>
          <PropertyGrid />
        </div>
      </section>
      
      {/* Complete Services Section */}
      <ServicesSection />
      
      {/* About Us */}
      <AboutUs />
      
      {/* Home Services */}
      <HomeServiceBooking />
      
      {/* Furniture Section */}
      <FurnitureShowcase />
      
      {/* Service Providers */}
      <FeaturedProviders />
      
      {/* Our Vision */}
      <OurVision />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
