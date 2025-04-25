
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import OurVision from "@/components/OurVision";
import Testimonials from "@/components/Testimonials";

const About = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      
      <div className="bg-estate-800 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">About Us</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Discover the story behind Elite Real Estate's commitment to excellence.
            </p>
          </div>
        </div>
      </div>
      
      <AboutUs />
      
      <div className="py-16 bg-estate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display text-estate-800 mb-6">Our Mission</h2>
              <p className="text-estate-600 mb-6">
                At Elite Real Estate, we're dedicated to providing unparalleled service and expertise in the luxury real estate market. Our mission is to connect exceptional people with exceptional properties.
              </p>
              <p className="text-estate-600 mb-6">
                We believe that buying or selling a home is more than just a transaction—it's a significant life event. Our team of dedicated professionals is committed to making this process seamless and rewarding.
              </p>
              <Button className="bg-estate-800 hover:bg-estate-700 mt-4">
                Learn More
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1618221312573-7c25979d34fc" 
                alt="Our team" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
                <p className="text-estate-800 font-semibold">
                  "We don't just sell homes; we help clients find where they truly belong."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <OurVision />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default About;
