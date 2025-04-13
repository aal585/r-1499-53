
import { Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import ServiceBookingForm from '@/components/ServiceBookingForm';

export default function ServicesSidebar() {
  return (
    <div className="w-full lg:w-1/3">
      <ServiceBookingForm />
      
      {/* Quick contact section */}
      <motion.div 
        className="bg-white p-6 rounded-xl soft-shadow border border-gray-100 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-estate-800 mb-3">Need Help?</h3>
        <p className="text-estate-600 text-sm mb-4">
          Our service experts are ready to assist you in finding the perfect service provider for your needs.
        </p>
        <div className="flex flex-col space-y-3">
          <Button className="w-full bg-accent-amber hover:bg-amber-600 group">
            Call Us
            <Phone className="w-4 h-4 ml-2 transition-transform group-hover:rotate-12" />
          </Button>
          <Button variant="outline" className="w-full group">
            Send Message
            <MessageSquare className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
