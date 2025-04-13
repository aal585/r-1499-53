import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Loader2, X, ArrowRight, History } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Sample locations for autocomplete suggestions
const popularLocations = [
  "Beverly Hills, CA",
  "Manhattan, NY",
  "Miami Beach, FL",
  "San Francisco, CA",
  "Chicago, IL",
  "Seattle, WA",
  "Austin, TX",
  "Boston, MA",
  "Las Vegas, NV",
  "Denver, CO"
];

const searchResultVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.2
    }
  }),
  exit: { opacity: 0, y: -5, transition: { duration: 0.2 } }
};

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Modern apartment in downtown",
    "Luxury villa with pool",
    "2-bedroom condo near park"
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = popularLocations.filter(
        location => location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
      }
      
      await new Promise(resolve => setTimeout(resolve, 800));
      navigate(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearching(false);
    }
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <motion.form 
        onSubmit={handleSearch} 
        className={cn(
          "flex gap-2 transition-all duration-300",
          isFocused ? "scale-[1.02]" : "scale-100"
        )}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative flex-grow group">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-200/70 w-5 h-5 transition-all duration-300 group-hover:text-amber-200" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search by location, property type..."
            className="pl-10 pr-10 py-6 w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-amber-200/50 focus:ring-amber-200/20 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              if (searchQuery.length > 1) {
                setShowSuggestions(suggestions.length > 0);
              }
            }}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          {searchQuery && (
            <motion.button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 90, 0] }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.2 }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </div>
        <Button 
          type="submit" 
          size="lg"
          className="px-8 bg-estate-800 hover:bg-amber-800 transition-colors duration-300 border border-amber-700/30 hover:border-amber-700"
          disabled={isSearching}
        >
          {isSearching ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </Button>
      </motion.form>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div 
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 p-2 backdrop-blur-md bg-white/20 border border-white/10 rounded-xl z-20 shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-xs text-white/60 px-3 py-1">Popular Locations</div>
            <div className="space-y-1 mt-1">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  className="w-full text-left px-3 py-2 rounded-lg text-white hover:bg-white/20 transition-colors flex items-center gap-2"
                  onClick={() => handleSuggestionClick(suggestion)}
                  type="button"
                  custom={index}
                  variants={searchResultVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-3 h-3 text-amber-200/80" />
                  <span className="truncate">{suggestion}</span>
                  <ArrowRight className="w-3 h-3 ml-auto text-white/40" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFocused && recentSearches.length > 0 && !showSuggestions && (
          <motion.div 
            className="absolute top-full left-0 right-0 mt-2 p-2 backdrop-blur-md bg-white/20 border border-white/10 rounded-xl z-10 shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-xs text-white/60 px-3 py-1 flex items-center">
              <History className="w-3 h-3 mr-1" /> Recent Searches
            </div>
            <div className="space-y-1 mt-1">
              {recentSearches.map((search, index) => (
                <motion.button
                  key={index}
                  className="w-full text-left px-3 py-2 rounded-lg text-white hover:bg-white/20 transition-colors flex items-center gap-2"
                  onClick={() => handleRecentSearchClick(search)}
                  type="button"
                  custom={index}
                  variants={searchResultVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Search className="w-3 h-3 text-white/60" />
                  <span className="truncate">{search}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
