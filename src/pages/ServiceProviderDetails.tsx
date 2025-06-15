
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Calendar, Phone, Mail, Shield, Award, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ServiceProvider } from '@/components/services/ServiceCard';

// Mock data - in a real app, this would come from an API
const mockProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Premium Home Cleaning Co.',
    category: 'Cleaning',
    rating: 4.9,
    reviews: 156,
    location: 'Downtown Area',
    price: 'From $120/service',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&q=75&fit=crop&w=600',
    services: ['Deep Cleaning', 'Regular Maintenance', 'Move-in/Move-out', 'Window Cleaning', 'Carpet Cleaning'],
    availableToday: true,
    verified: true,
    experience: '8 years',
    description: 'Professional cleaning services with eco-friendly products and attention to detail. We ensure your home is spotless and healthy for your family.'
  }
];

const ServiceProviderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const foundProvider = mockProviders.find(p => p.id === id);
    setProvider(foundProvider || null);
  }, [id]);

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-estate-800 mb-4">Provider Not Found</h1>
          <Button onClick={() => navigate('/services')}>Back to Services</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/services')}
            className="mb-6 text-estate-600 hover:text-estate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <img 
                        src={provider.image} 
                        alt={provider.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="md:w-2/3">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h1 className="text-2xl font-bold text-estate-800 mb-2">{provider.name}</h1>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-estate-100 text-estate-700">{provider.category}</Badge>
                            {provider.verified && (
                              <Badge className="bg-green-100 text-green-700">
                                <Shield className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-estate-600">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {provider.location}
                            </div>
                            <div className="flex items-center">
                              <Award className="w-4 h-4 mr-1" />
                              {provider.experience} experience
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-amber-500 fill-current mr-1" />
                          <span className="font-bold text-estate-800">{provider.rating}</span>
                          <span className="text-estate-500 ml-1">({provider.reviews} reviews)</span>
                        </div>
                        {provider.availableToday && (
                          <Badge className="bg-green-50 text-green-700">
                            <Clock className="w-3 h-3 mr-1" />
                            Available Today
                          </Badge>
                        )}
                      </div>

                      <p className="text-estate-600 mb-4">{provider.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {provider.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>About {provider.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-estate-600 mb-4">{provider.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          <span>Licensed & Insured</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          <span>Background Checked</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          <span>Satisfaction Guaranteed</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          <span>Free Estimates</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="services">
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {provider.services.map((service) => (
                          <div key={service} className="flex items-center justify-between p-4 border rounded-lg">
                            <span className="font-medium">{service}</span>
                            <Button size="sm">Book Now</Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews">
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((review) => (
                          <div key={review} className="border-b pb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-amber-500 fill-current" />
                                ))}
                              </div>
                              <span className="font-medium">John D.</span>
                              <span className="text-sm text-estate-500">2 weeks ago</span>
                            </div>
                            <p className="text-estate-600">
                              Excellent service! Professional, punctual, and thorough. 
                              Would definitely recommend and use again.
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Book This Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-vibrant-blue mb-2">{provider.price}</div>
                    <p className="text-sm text-estate-600">Professional service pricing</p>
                  </div>
                  
                  <Button className="w-full bg-vibrant-blue hover:bg-blue-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Response Time</h4>
                    <p className="text-sm text-estate-600">Usually responds within 2 hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServiceProviderDetails;
