
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ServiceRequestForm() {
  const [formData, setFormData] = useState({
    serviceType: '',
    title: '',
    description: '',
    location: '',
    budget: '',
    urgency: '',
    preferredDate: '',
    contactName: '',
    phone: '',
    email: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceCategories = [
    'Cleaning', 'Renovation', 'Plumbing', 'Electrical', 'Landscaping',
    'Painting', 'Security', 'Moving', 'Technology', 'Other'
  ];

  const urgencyOptions = [
    { value: 'urgent', label: 'Urgent (Within 24 hours)', color: 'bg-red-100 text-red-800' },
    { value: 'soon', label: 'Soon (Within a week)', color: 'bg-amber-100 text-amber-800' },
    { value: 'flexible', label: 'Flexible (No rush)', color: 'bg-green-100 text-green-800' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.serviceType || !formData.title || !formData.description || !formData.contactName) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      toast.success('Service request submitted successfully!');
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-estate-800 mb-2">Request Submitted!</h3>
          <p className="text-estate-600 mb-6">
            We've received your service request and will connect you with qualified providers within 24 hours.
          </p>
          <div className="bg-estate-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-estate-800 mb-2">What happens next?</h4>
            <ul className="text-left text-estate-600 space-y-1">
              <li>• We'll review your request and match you with suitable providers</li>
              <li>• You'll receive quotes from interested professionals</li>
              <li>• Choose the best provider for your needs</li>
              <li>• Schedule and complete your service</li>
            </ul>
          </div>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-estate-800">Request a Custom Service</CardTitle>
        <CardDescription>
          Can't find what you're looking for? Tell us what you need and we'll connect you with the right professionals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type */}
          <div>
            <Label htmlFor="serviceType">Service Category *</Label>
            <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service category" />
              </SelectTrigger>
              <SelectContent>
                {serviceCategories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">Service Title *</Label>
            <Input
              id="title"
              placeholder="Brief description of what you need"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide details about the work needed, materials, timeline, etc."
              className="min-h-24"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
            />
          </div>

          {/* Location and Budget Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="location"
                  placeholder="City, neighborhood"
                  className="pl-10"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="budget">Budget Range</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="budget"
                  placeholder="e.g., $500-1000"
                  className="pl-10"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Urgency */}
          <div>
            <Label>Urgency Level</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              {urgencyOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`p-3 border rounded-lg text-left transition-all ${
                    formData.urgency === option.value
                      ? 'border-estate-500 bg-estate-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleInputChange('urgency', option.value)}
                >
                  <Badge className={option.color} variant="secondary">
                    <Clock className="w-3 h-3 mr-1" />
                    {option.label}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Date */}
          <div>
            <Label htmlFor="preferredDate">Preferred Start Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="preferredDate"
                type="date"
                className="pl-10"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e.target.value)}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-estate-800 mb-4">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Full Name *</Label>
                <Input
                  id="contactName"
                  placeholder="Your full name"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-vibrant-blue hover:bg-blue-700">
            Submit Service Request
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
