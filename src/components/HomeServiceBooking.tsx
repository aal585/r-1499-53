
import { useState } from "react";
import ServiceBookingForm from "./ServiceBookingForm";
import ServiceCategories from "./ServiceCategories";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const HomeServiceBooking = () => {
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-4">
            Home Services & Maintenance
          </h2>
          <p className="text-lg text-estate-600">
            Professional services to maintain and enhance your property, all in one place.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs 
            defaultValue="categories" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="categories">Browse Services</TabsTrigger>
                <TabsTrigger value="book">Book a Service</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="categories" className="mt-0">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-estate-800 mb-6 text-center">
                  Select a Service Category
                </h3>
                <ServiceCategories />
                
                <div className="mt-10 text-center">
                  <Button 
                    onClick={() => setActiveTab("book")}
                    className="bg-estate-800 hover:bg-estate-700"
                  >
                    Book a Service Now
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="book" className="mt-0">
              <ServiceBookingForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default HomeServiceBooking;
