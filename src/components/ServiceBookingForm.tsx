
import { useState } from "react";
import { 
  CalendarIcon, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  MessageSquare 
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./ui/select";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

const services = [
  "Home Maintenance",
  "Electrical Services",
  "Plumbing",
  "Interior Design",
  "Painting",
  "Furniture Assembly",
  "Cleaning Services",
  "Home Security Installation"
];

const timeSlots = [
  "09:00 AM - 12:00 PM",
  "12:00 PM - 03:00 PM",
  "03:00 PM - 06:00 PM"
];

const ServiceBookingForm = () => {
  const [date, setDate] = useState<Date>();
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate submission
    setTimeout(() => {
      setBookingSubmitted(true);
      toast({
        title: "Booking Request Submitted",
        description: "We'll contact you shortly to confirm your appointment.",
      });
    }, 1000);
  };
  
  if (bookingSubmitted) {
    return (
      <div className="text-center py-10 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-estate-800 mb-2">Booking Request Received</h3>
        <p className="text-estate-600 mb-6 max-w-md mx-auto">
          Thank you for your booking request. A service representative will contact you shortly to confirm your appointment details.
        </p>
        <Button 
          variant="outline" 
          className="border-estate-300 text-estate-700 hover:bg-estate-50"
          onClick={() => setBookingSubmitted(false)}
        >
          Book Another Service
        </Button>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold text-estate-800 mb-5">Book a Service</h3>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-estate-700 mb-1" htmlFor="service">
            Service Type
          </label>
          <Select required>
            <SelectTrigger id="service" className="w-full">
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              {services.map(service => (
                <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-estate-700 mb-1">
              Preferred Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-estate-200",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-estate-700 mb-1" htmlFor="time">
              Preferred Time
            </label>
            <Select required>
              <SelectTrigger id="time" className="w-full">
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map(slot => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-estate-700 mb-1" htmlFor="address">
            Service Address
          </label>
          <div className="flex">
            <div className="relative flex-grow">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-estate-400 h-4 w-4" />
              <Input 
                id="address"
                placeholder="Enter your address"
                className="pl-10 border-estate-200"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-estate-700 mb-1" htmlFor="name">
              Your Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-estate-400 h-4 w-4" />
              <Input 
                id="name"
                placeholder="Enter your name"
                className="pl-10 border-estate-200"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-estate-700 mb-1" htmlFor="phone">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-estate-400 h-4 w-4" />
              <Input 
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="pl-10 border-estate-200"
                required
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-estate-700 mb-1" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-estate-400 h-4 w-4" />
            <Input 
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10 border-estate-200"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-estate-700 mb-1" htmlFor="notes">
            Service Notes
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-estate-400 h-4 w-4" />
            <Textarea 
              id="notes"
              placeholder="Describe what you need help with"
              className="pl-10 border-estate-200 min-h-[100px]"
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-estate-800 hover:bg-estate-700 text-white">
          Book Service
        </Button>
      </form>
    </div>
  );
};

export default ServiceBookingForm;
