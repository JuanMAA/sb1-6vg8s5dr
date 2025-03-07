"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X, ChevronDown, Star } from "lucide-react";

export default function CasinoFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Filter states
  const [minRating, setMinRating] = useState(0);
  const [hasApp, setHasApp] = useState(false);
  const [hasLiveStreaming, setHasLiveStreaming] = useState(false);
  const [hasCashOut, setHasCashOut] = useState(false);
  const [hasLiveBetting, setHasLiveBetting] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Load filters from URL on component mount
  useEffect(() => {
    const ratingMin = searchParams.get('minRating');
    const appFilter = searchParams.get('hasApp');
    const streamingFilter = searchParams.get('hasLiveStreaming');
    const cashOutFilter = searchParams.get('hasCashOut');
    const liveBettingFilter = searchParams.get('hasLiveBetting');
    
    if (ratingMin) setMinRating(parseFloat(ratingMin));
    if (appFilter === 'true') setHasApp(true);
    if (streamingFilter === 'true') setHasLiveStreaming(true);
    if (cashOutFilter === 'true') setHasCashOut(true);
    if (liveBettingFilter === 'true') setHasLiveBetting(true);
    
    updateActiveFilters();
  }, [searchParams]);
  
  // Update active filters based on current state
  const updateActiveFilters = () => {
    const filters = [];
    
    if (minRating > 0) filters.push(`Rating mínimo: ${minRating}`);
    if (hasApp) filters.push('App Móvil');
    if (hasLiveStreaming) filters.push('Streaming en Vivo');
    if (hasCashOut) filters.push('Cash Out');
    if (hasLiveBetting) filters.push('Apuestas en Vivo');
    
    setActiveFilters(filters);
  };
  
  // Apply filters
  const applyFilters = () => {
    updateActiveFilters();
    
    // Create new URLSearchParams object
    const params = new URLSearchParams();
    
    // Set or remove filter parameters
    if (minRating > 0) {
      params.set('minRating', minRating.toString());
    }
    
    if (hasApp) {
      params.set('hasApp', 'true');
    }
    
    if (hasLiveStreaming) {
      params.set('hasLiveStreaming', 'true');
    }
    
    if (hasCashOut) {
      params.set('hasCashOut', 'true');
    }
    
    if (hasLiveBetting) {
      params.set('hasLiveBetting', 'true');
    }
    
    // Update URL with filters
    router.push(`${pathname}?${params.toString()}`);
    
    // Close filter on mobile
    setIsFilterOpen(false);
  };
  
  // Reset filters
  const resetFilters = () => {
    setMinRating(0);
    setHasApp(false);
    setHasLiveStreaming(false);
    setHasCashOut(false);
    setHasLiveBetting(false);
    setActiveFilters([]);
    
    // Reset URL
    router.push(pathname);
  };
  
  // Remove a specific filter
  const removeFilter = (filter: string) => {
    if (filter.startsWith('Rating mínimo')) {
      setMinRating(0);
    } else if (filter === 'App Móvil') {
      setHasApp(false);
    } else if (filter === 'Streaming en Vivo') {
      setHasLiveStreaming(false);
    } else if (filter === 'Cash Out') {
      setHasCashOut(false);
    } else if (filter === 'Apuestas en Vivo') {
      setHasLiveBetting(false);
    }
    
    // Re-apply remaining filters
    setTimeout(() => applyFilters(), 0);
  };
  
  return (
    <div className="mb-6">
      {/* Filter Toggle Button */}
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="h-4 w-4" />
          Filtros
          {activeFilters.length > 0 && (
            <Badge variant="secondary" className="ml-1">{activeFilters.length}</Badge>
          )}
          <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
        </Button>
        
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            {activeFilters.map((filter, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="flex items-center gap-1 py-1"
              >
                {filter}
                <button 
                  onClick={() => removeFilter(filter)}
                  className="ml-1 rounded-full hover:bg-muted p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="text-muted-foreground text-xs"
            >
              Limpiar
            </Button>
          </div>
        )}
      </div>
      
      {/* Compact Filter Panel */}
      {isFilterOpen && (
        <Card className="border shadow-sm mb-4 animate-fade-in">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div>
                {/* Minimum Rating */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Rating Mínimo</h3>
                    <div className="flex items-center text-xs text-muted-foreground">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < Math.floor(minRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                        />
                      ))}
                      <span className="ml-1">{minRating}</span>
                    </div>
                  </div>
                  <Slider
                    value={[minRating]}
                    min={0}
                    max={5}
                    step={0.1}
                    onValueChange={(value) => {
                      setMinRating(value[0]);
                    }}
                  />
                </div>
              </div>
              
              {/* Right Column */}
              <div>
                {/* Features */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Características</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="has-app" 
                        checked={hasApp}
                        onCheckedChange={(checked) => setHasApp(checked === true)}
                      />
                      <label htmlFor="has-app" className="text-sm">
                        App Móvil
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="has-streaming" 
                        checked={hasLiveStreaming}
                        onCheckedChange={(checked) => setHasLiveStreaming(checked === true)}
                      />
                      <label htmlFor="has-streaming" className="text-sm">
                        Streaming en Vivo
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="has-cashout" 
                        checked={hasCashOut}
                        onCheckedChange={(checked) => setHasCashOut(checked === true)}
                      />
                      <label htmlFor="has-cashout" className="text-sm">
                        Cash Out
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="has-livebetting" 
                        checked={hasLiveBetting}
                        onCheckedChange={(checked) => setHasLiveBetting(checked === true)}
                      />
                      <label htmlFor="has-livebetting" className="text-sm">
                        Apuestas en Vivo
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Restablecer
              </Button>
              <Button size="sm" onClick={applyFilters} className="bg-primary hover:bg-primary/90">
                Aplicar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}