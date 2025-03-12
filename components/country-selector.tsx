"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, X, ChevronDown, Scale, Shield, Calendar } from "lucide-react";
import { getCountries } from "@/lib/api";

type Country = {
  id: number;
  name: string;
  code: string;
  flag_emoji: string;
  legal_status: string;
  regulatory_body: string | null;
  legal_age: string | null;
};

const translations = {
  en: {
    legalStatus: "Legal Status",
    regulatoryBody: "Regulatory Body",
    legalAge: "Legal Age",
    notSpecified: "Not specified",
    filters: "Filters",
    clear: "Clear",
    apply: "Apply Filters",
    reset: "Reset",
    status: {
      all: "All Statuses",
      legal: "Legal",
      partially: "Partially Legal",
      restricted: "Restricted"
    }
  },
  es: {
    legalStatus: "Estado Legal",
    regulatoryBody: "Organismo Regulador",
    legalAge: "Edad Legal",
    notSpecified: "No especificado",
    filters: "Filtros",
    clear: "Limpiar",
    apply: "Aplicar Filtros",
    reset: "Restablecer",
    status: {
      all: "Todos los Estados",
      legal: "Legal",
      partially: "Parcialmente Legal",
      restricted: "Restringido"
    }
  }
};

// Get status badge class based on legal status
const getStatusBadgeClass = (status: string) => {
  if (status.includes("Legal")) {
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
  } else if (status.includes("Partially")) {
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
  }
  return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
};

export default function CountrySelector() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [animateCards, setAnimateCards] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [hasRegulator, setHasRegulator] = useState(false);
  const [hasAgeLimit, setHasAgeLimit] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get language from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && ['en', 'es'].includes(savedLanguage)) {
        setCurrentLanguage(savedLanguage);
      }
    }
    
    // Add animation after initial render
    setTimeout(() => {
      setAnimateCards(true);
    }, 100);
  }, []);
  
  // Load countries from API
  useEffect(() => {
    async function loadCountries() {
      try {
        setLoading(true);
        const data = await getCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        console.error("Error loading countries:", err);
        setError("Failed to load countries. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    loadCountries();
  }, []);
  
  const t = translations[currentLanguage as keyof typeof translations];
  
  // Apply filters
  const applyFilters = () => {
    let filtered = [...countries];
    const filters = [];
    
    // Apply status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter(country => {
        if (selectedStatus === "legal") {
          return country.legal_status === "Legal";
        } else if (selectedStatus === "partially") {
          return country.legal_status.includes("Partially");
        } else if (selectedStatus === "restricted") {
          return country.legal_status === "Restricted";
        }
        return true;
      });
      filters.push(t.status[selectedStatus as keyof typeof t.status]);
    }
    
    // Apply regulator filter
    if (hasRegulator) {
      filtered = filtered.filter(country => country.regulatory_body !== null);
      filters.push(t.regulatoryBody);
    }
    
    // Apply age limit filter
    if (hasAgeLimit) {
      filtered = filtered.filter(country => country.legal_age !== null);
      filters.push(t.legalAge);
    }
    
    setFilteredCountries(filtered);
    setActiveFilters(filters);
    setIsFilterOpen(false);
  };
  
  // Reset filters
  const resetFilters = () => {
    setSelectedStatus("all");
    setHasRegulator(false);
    setHasAgeLimit(false);
    setFilteredCountries(countries);
    setActiveFilters([]);
  };
  
  // Remove a specific filter
  const removeFilter = (filter: string) => {
    if (Object.values(t.status).includes(filter)) {
      setSelectedStatus("all");
    } else if (filter === t.regulatoryBody) {
      setHasRegulator(false);
    } else if (filter === t.legalAge) {
      setHasAgeLimit(false);
    }
    
    setTimeout(() => applyFilters(), 0);
  };

  if (loading) {
    return <div className="text-center py-4">Cargando países...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

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
          {t.filters}
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
              {t.clear}
            </Button>
          </div>
        )}
      </div>
      
      {/* Filter Panel */}
      {isFilterOpen && (
        <Card className="border shadow-sm mb-4 animate-fade-in">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Legal Status */}
              <div>
                <h3 className="text-sm font-medium mb-2">{t.legalStatus}</h3>
                <Tabs defaultValue={selectedStatus} value={selectedStatus} onValueChange={setSelectedStatus}>
                  <TabsList className="grid w-full grid-cols-4">
                    {Object.entries(t.status).map(([key, value]) => (
                      <TabsTrigger key={key} value={key}>{value}</TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Additional Filters */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="has-regulator" 
                    checked={hasRegulator}
                    onCheckedChange={(checked) => setHasRegulator(checked === true)}
                  />
                  <label htmlFor="has-regulator" className="text-sm">
                    {t.regulatoryBody}
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="has-age-limit" 
                    checked={hasAgeLimit}
                    onCheckedChange={(checked) => setHasAgeLimit(checked === true)}
                  />
                  <label htmlFor="has-age-limit" className="text-sm">
                    {t.legalAge}
                  </label>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  {t.reset}
                </Button>
                <Button size="sm" onClick={applyFilters} className="bg-primary hover:bg-primary/90">
                  {t.apply}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Country Grid */}
      <Card className="border shadow-sm animate-slide-up">
        <CardContent className="p-4">
          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCountries.map((country, index) => (
                <Link 
                  key={country.id}
                  href={`/countries/${country.code}`}
                  className={`country-card block p-4 rounded-lg hover:bg-primary/10 transition-colors card-hover ${animateCards ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">{country.flag_emoji}</span>
                    <h3 className="font-semibold text-lg">{country.name}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Scale className="h-4 w-4 mr-1" />
                        {t.legalStatus}:
                      </span>
                      <Badge className={getStatusBadgeClass(country.legal_status)}>
                        {country.legal_status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Shield className="h-4 w-4 mr-1" />
                        {t.regulatoryBody}:
                      </span>
                      <span className="text-sm font-medium">
                        {country.regulatory_body || t.notSpecified}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {t.legalAge}:
                      </span>
                      <span className="text-sm font-medium">
                        {country.legal_age || t.notSpecified}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}