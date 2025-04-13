
import { useState } from 'react';
import { Check, X, Info, Scale, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { type ServiceProvider } from './ServiceCard';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ServiceCompareProps = {
  providers: ServiceProvider[];
};

export default function ServiceCompare({ providers }: ServiceCompareProps) {
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);

  const handleToggleProvider = (id: string) => {
    if (selectedProviders.includes(id)) {
      setSelectedProviders(prev => prev.filter(p => p !== id));
    } else {
      if (selectedProviders.length < 3) {
        setSelectedProviders(prev => [...prev, id]);
      }
    }
  };

  const selectedProviderData = providers.filter(p => selectedProviders.includes(p.id));

  const isCompareDisabled = selectedProviders.length < 2;

  return (
    <div className="mb-8">
      <div className="bg-estate-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Scale className="w-5 h-5 text-estate-700 mr-2" />
            <h3 className="font-semibold text-estate-800">Compare Service Providers</h3>
          </div>
          <Drawer>
            <DrawerTrigger asChild>
              <Button 
                disabled={isCompareDisabled} 
                size="sm"
                className={isCompareDisabled ? "opacity-60" : ""}
              >
                Compare {selectedProviders.length > 0 ? `(${selectedProviders.length})` : ""}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="glass-effect">
              <DrawerHeader>
                <DrawerTitle>Service Provider Comparison</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Features</TableHead>
                      {selectedProviderData.map(provider => (
                        <TableHead key={provider.id} className="text-center">
                          <div className="font-semibold text-estate-800">{provider.name}</div>
                          <div className="flex items-center justify-center mt-1">
                            <Badge className="bg-estate-50 text-estate-700 border-0">
                              {provider.category}
                            </Badge>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Rating</TableCell>
                      {selectedProviderData.map(provider => (
                        <TableCell key={provider.id} className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="font-medium text-estate-800 mr-1">{provider.rating}</span>
                            <span className="text-estate-500 text-sm">({provider.reviews})</span>
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Location</TableCell>
                      {selectedProviderData.map(provider => (
                        <TableCell key={provider.id} className="text-center">
                          {provider.location}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Available Today</TableCell>
                      {selectedProviderData.map(provider => (
                        <TableCell key={provider.id} className="text-center">
                          {provider.availableToday ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Verified</TableCell>
                      {selectedProviderData.map(provider => (
                        <TableCell key={provider.id} className="text-center">
                          {provider.verified ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Services</TableCell>
                      {selectedProviderData.map(provider => (
                        <TableCell key={provider.id} className="text-center">
                          <div className="flex flex-wrap justify-center gap-1">
                            {provider.services.slice(0, 2).map(service => (
                              <Badge key={service} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                            {provider.services.length > 2 && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge variant="outline" className="text-xs cursor-help">
                                      +{provider.services.length - 2} more
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="text-xs">
                                      {provider.services.slice(2).join(', ')}
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="p-4 border-t flex justify-end">
                <DrawerClose asChild>
                  <Button>Close</Button>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {providers.slice(0, 4).map(provider => (
            <div 
              key={provider.id}
              onClick={() => handleToggleProvider(provider.id)}
              className={`
                p-3 rounded-lg border cursor-pointer hover-lift transition-all
                ${selectedProviders.includes(provider.id) 
                  ? 'border-accent-blue bg-accent-blue/5' 
                  : 'border-gray-200 bg-white'}
              `}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                  <img 
                    src={provider.image} 
                    alt={provider.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-estate-800 text-sm">{provider.name}</div>
                  <div className="text-xs text-estate-600">{provider.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-xs text-estate-600 flex items-center">
            <Info className="w-4 h-4 mr-1" />
            Select up to 3 providers to compare
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-estate-600"
            onClick={() => setSelectedProviders([])}
          >
            Clear selection
          </Button>
        </div>
      </div>
    </div>
  );
}
