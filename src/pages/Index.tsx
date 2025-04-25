
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import PropertyGrid from "@/components/PropertyGrid";
import FurnitureShowcase from "@/components/FurnitureShowcase";
import HomeServiceBooking from "@/components/HomeServiceBooking";
import FeaturedProviders from "@/components/FeaturedProviders";
import Testimonials from "@/components/Testimonials";
import AboutUs from "@/components/AboutUs";
import OurVision from "@/components/OurVision";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

const Index = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      
      <div id="properties" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-4">Featured Properties</h2>
            <p className="text-lg text-estate-600 max-w-3xl mx-auto">
              Discover our handpicked selection of premium properties
            </p>
          </div>
          <PropertyGrid />
        </div>
      </div>
      
      <ServicesSection />
      <FurnitureShowcase />
      <HomeServiceBooking />
      <FeaturedProviders />
      <Testimonials />
      <AboutUs />
      <OurVision />
      <Footer />
      
      <Button
        className={`fixed bottom-6 right-6 rounded-full h-12 w-12 bg-estate-800 text-white shadow-lg transition-all duration-300 flex items-center justify-center p-0 ${
          showScrollButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
        }`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Index;
