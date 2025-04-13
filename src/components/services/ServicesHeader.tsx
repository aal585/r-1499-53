
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type ServicesHeaderProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export default function ServicesHeader({ searchTerm, setSearchTerm }: ServicesHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-estate-800 via-vibrant-purple to-estate-700 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-display mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Professional Home Services
          </motion.h1>
          <motion.p 
            className="text-estate-200 text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find trusted professionals for all your home service needs.
          </motion.p>
          
          <motion.div 
            className="relative max-w-2xl mx-auto glass-effect rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/70" />
            </div>
            <Input
              type="text"
              placeholder="Search for services or providers..."
              className="pl-10 py-6 bg-transparent border-white/40 text-white placeholder:text-white/70 rounded-lg focus-visible:ring-white/70"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button 
              className="absolute inset-y-2 right-2 bg-white text-estate-800 hover:bg-estate-100"
              onClick={() => {/* Handle search */}}
            >
              Search
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
