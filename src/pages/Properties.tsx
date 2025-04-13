import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import { SearchForm } from "@/components/properties/SearchForm";
import { FilterSidebar } from "@/components/properties/FilterSidebar";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { useSearchParams } from "react-router-dom";
import { PropertyType } from "@/types/property";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialType = (searchParams.get("type") as PropertyType) || "all";
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const {
    searchQuery,
    setSearchQuery,
    propertyType,
    setPropertyType,
    priceRange,
    setPriceRange,
    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,
    minArea,
    setMinArea,
    maxArea,
    setMaxArea,
    sortBy,
    setSortBy,
    filteredProperties,
    resetFilters,
    loading
  } = usePropertyFilters(initialSearch, initialType);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      searchParams.set("search", searchQuery);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 lg:pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-3 mb-8">
            <h1 className="text-4xl md:text-5xl font-display text-estate-800 mb-2">
              Discover Your Perfect Property
            </h1>
            <p className="text-estate-500 text-lg max-w-2xl">
              Browse our exclusive collection of premium properties, carefully curated to match your lifestyle.
            </p>
          </div>
          
          <SearchForm 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleSearch={handleSearch}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            toggleMobileFilters={toggleMobileFilters}
          />
          
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <div className="lg:w-64 flex-shrink-0">
              <FilterSidebar 
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                bedrooms={bedrooms}
                setBedrooms={setBedrooms}
                bathrooms={bathrooms}
                setBathrooms={setBathrooms}
                minArea={minArea}
                setMinArea={setMinArea}
                maxArea={maxArea}
                setMaxArea={setMaxArea}
                propertyType={propertyType}
                setPropertyType={setPropertyType}
                resetFilters={resetFilters}
              />
            </div>
            
            <div className="flex-1">
              <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-estate-600 font-medium">
                    {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
                  </p>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
                      <SheetTrigger asChild className="lg:hidden">
                        <Button variant="outline" className="flex items-center gap-2">
                          <SlidersHorizontal className="w-4 h-4" />
                          Filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <div className="pt-6">
                          <FilterSidebar 
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            bedrooms={bedrooms}
                            setBedrooms={setBedrooms}
                            bathrooms={bathrooms}
                            setBathrooms={setBathrooms}
                            minArea={minArea}
                            setMinArea={setMinArea}
                            maxArea={maxArea}
                            setMaxArea={setMaxArea}
                            propertyType={propertyType}
                            setPropertyType={setPropertyType}
                            resetFilters={resetFilters}
                          />
                        </div>
                      </SheetContent>
                    </Sheet>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-[400px]"></div>
                  ))}
                </div>
              ) : filteredProperties.length > 0 ? (
                <PropertyGrid 
                  properties={filteredProperties} 
                  filterType={propertyType === "all" ? undefined : propertyType}
                  fromSupabase={true}
                />
              ) : (
                <div className="text-center py-16 bg-white rounded-lg border border-gray-100">
                  <h3 className="text-xl font-medium text-estate-800 mb-2">No properties found</h3>
                  <p className="text-estate-500">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Properties;
