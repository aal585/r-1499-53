
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import OurVision from "@/components/OurVision";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  HandshakeIcon, 
  Calendar, 
  HomeIcon, 
  BarChart, 
  Award, 
  Users, 
  Clock,
  Wrench,
  Sofa,
  PaintBucket,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const teamMembers = [
  {
    name: "Jennifer Anderson",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&q=75&fit=crop&w=600",
    bio: "With over 20 years of experience in luxury real estate, Jennifer founded Elite Real Estate to elevate the standard of property services."
  },
  {
    name: "Michael Johnson",
    role: "Head of Properties",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&q=75&fit=crop&w=600",
    bio: "Michael leads our property division with expertise in market analysis and property valuation, ensuring our clients find the perfect homes."
  },
  {
    name: "Sarah Williams",
    role: "Director of Services",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&q=75&fit=crop&w=600",
    bio: "Sarah oversees our comprehensive service offerings, from home maintenance to interior design, with a focus on quality and client satisfaction."
  },
  {
    name: "David Chen",
    role: "Lead Interior Designer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&q=75&fit=crop&w=600",
    bio: "Award-winning designer David brings creative vision and practical solutions to help clients transform their spaces into beautiful homes."
  }
];

const timeline = [
  {
    year: "2010",
    title: "Elite Real Estate Founded",
    description: "Started as a boutique real estate agency with a focus on luxury properties."
  },
  {
    year: "2013",
    title: "Home Services Division",
    description: "Expanded to offer property maintenance and renovation services to our clients."
  },
  {
    year: "2016",
    title: "Interior Design & Furniture",
    description: "Launched our interior design services and exclusive furniture collections."
  },
  {
    year: "2019",
    title: "Digital Transformation",
    description: "Implemented cutting-edge technology to enhance client experience and property services."
  },
  {
    year: "2022",
    title: "Sustainable Initiatives",
    description: "Committed to eco-friendly practices across all our business operations."
  },
  {
    year: "2025",
    title: "Looking Forward",
    description: "Continuing to innovate and expand our services to meet evolving client needs."
  }
];

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero */}
      <div className="bg-estate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display mb-4">About Elite Real Estate</h1>
            <p className="text-estate-200 text-lg mb-8">
              Your comprehensive solution for all your real estate and home service needs.
            </p>
          </div>
        </div>
      </div>
      
      <AboutUs />
      
      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-4">Our Core Values</h2>
            <p className="text-estate-600 max-w-3xl mx-auto">
              These principles guide everything we do as we strive to provide exceptional service and value to our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Heart,
                title: "Client-Centered Approach",
                description: "We place our clients' needs at the heart of everything we do, ensuring personalized service and attention to detail."
              },
              {
                icon: HandshakeIcon,
                title: "Integrity & Transparency",
                description: "We operate with honesty and transparency, building trust through ethical business practices and clear communication."
              },
              {
                icon: Award,
                title: "Excellence & Quality",
                description: "We pursue excellence in all our services, maintaining the highest standards of quality in properties and home services."
              }
            ].map((value, index) => (
              <div key={index} className="flex flex-col items-center text-center opacity-0 animate-fadeIn" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="w-16 h-16 rounded-full bg-estate-50 flex items-center justify-center mb-4">
                  <value.icon className="w-8 h-8 text-estate-700" />
                </div>
                <h3 className="text-xl font-semibold text-estate-800 mb-3">{value.title}</h3>
                <p className="text-estate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-4">Comprehensive Services</h2>
            <p className="text-estate-600 max-w-3xl mx-auto">
              From finding your dream home to maintaining it, we offer end-to-end solutions for all your property needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: HomeIcon,
                title: "Real Estate Services",
                description: "Expert guidance in buying, selling, and renting properties with personalized support throughout the process.",
                link: "/properties"
              },
              {
                icon: Wrench,
                title: "Home Maintenance",
                description: "Professional maintenance services including plumbing, electrical work, repairs, and regular upkeep.",
                link: "/services/maintenance"
              },
              {
                icon: Sofa,
                title: "Furniture & Decor",
                description: "Quality furniture pieces and decor items to transform your house into a stylish and comfortable home.",
                link: "/furniture"
              },
              {
                icon: PaintBucket,
                title: "Interior Design",
                description: "Creative design solutions tailored to your preferences, lifestyle, and budget for a space you'll love.",
                link: "/services/interior-design"
              },
              {
                icon: ShieldCheck,
                title: "Property Management",
                description: "Comprehensive property management services for homeowners and investors with rental properties.",
                link: "/services/property-management"
              },
              {
                icon: Calendar,
                title: "Consultation Services",
                description: "Expert advice on real estate investments, home improvements, and property development.",
                link: "/consultation"
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer opacity-0 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(service.link)}
              >
                <div className="w-12 h-12 rounded-full bg-estate-50 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-estate-700" />
                </div>
                <h3 className="text-xl font-semibold text-estate-800 mb-2">{service.title}</h3>
                <p className="text-estate-600 mb-4">{service.description}</p>
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto text-estate-700 hover:text-estate-900 hover:bg-transparent"
                >
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-4">Meet Our Team</h2>
            <p className="text-estate-600 max-w-3xl mx-auto">
              Our experienced professionals are dedicated to providing exceptional service and expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow opacity-0 animate-fadeIn"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-estate-800">{member.name}</h3>
                  <p className="text-estate-500 text-sm mb-3">{member.role}</p>
                  <p className="text-estate-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Company Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-4">Our Journey</h2>
            <p className="text-estate-600 max-w-3xl mx-auto">
              The evolution of Elite Real Estate from a boutique agency to a comprehensive home services provider.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-estate-200"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center opacity-0 animate-fadeIn ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-estate-500 z-10"></div>
                  
                  {/* Content box */}
                  <div className={`w-5/12 bg-white p-5 rounded-xl shadow-sm border border-gray-100 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                    <div className="font-display text-2xl text-estate-800 mb-1">{item.year}</div>
                    <h3 className="text-lg font-semibold text-estate-800 mb-2">{item.title}</h3>
                    <p className="text-estate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-estate-800 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: HomeIcon,
                value: "5,000+",
                label: "Properties Sold"
              },
              {
                icon: Users,
                value: "10,000+",
                label: "Satisfied Clients"
              },
              {
                icon: BarChart,
                value: "15+",
                label: "Years Experience"
              },
              {
                icon: Clock,
                value: "24/7",
                label: "Client Support"
              }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center opacity-0 animate-fadeIn"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl md:text-4xl font-display mb-2">{stat.value}</div>
                <p className="text-estate-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <OurVision />
      
      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-display text-estate-800 mb-4">Ready to Work With Us?</h2>
          <p className="text-estate-600 mb-8">
            Whether you're looking for your dream home, quality furniture, or professional services, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-estate-800 hover:bg-estate-700 text-white"
              size="lg"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </Button>
            <Button 
              variant="outline" 
              className="border-estate-300 text-estate-800 hover:bg-estate-50"
              size="lg"
              onClick={() => navigate("/services")}
            >
              Explore Services
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
