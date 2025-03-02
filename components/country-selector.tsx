"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Globe } from "lucide-react";
import { getCountries } from "@/lib/api";

type Country = {
  id: number;
  name: string;
  code: string;
  flag_emoji: string;
};

const translations = {
  en: {
    title: "Select Your Country",
    description: "Choose your country to see specific betting information, regulations, and top-rated bookmakers available in your region.",
    searchPlaceholder: "Search for your country...",
    noResults: "No countries found matching"
  },
  es: {
    title: "Selecciona tu País",
    description: "Elige tu país para ver información específica sobre apuestas, regulaciones y casas de apuestas mejor calificadas disponibles en tu región.",
    searchPlaceholder: "Buscar tu país...",
    noResults: "No se encontraron países que coincidan con"
  },
  fr: {
    title: "Sélectionnez Votre Pays",
    description: "Choisissez votre pays pour voir les informations spécifiques sur les paris, les réglementations et les meilleurs bookmakers disponibles dans votre région.",
    searchPlaceholder: "Rechercher votre pays...",
    noResults: "Aucun pays trouvé correspondant à"
  },
  de: {
    title: "Wählen Sie Ihr Land",
    description: "Wählen Sie Ihr Land, um spezifische Wettinformationen, Vorschriften und die am besten bewerteten Buchmacher in Ihrer Region zu sehen.",
    searchPlaceholder: "Suchen Sie nach Ihrem Land...",
    noResults: "Keine Länder gefunden, die übereinstimmen mit"
  }
};

export default function CountrySelector() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [animateCards, setAnimateCards] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get language from localStorage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && ['en', 'es', 'fr', 'de'].includes(savedLanguage)) {
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
  
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-4">Loading countries...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="container">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>
        
        <div className="max-w-md mx-auto mb-8 relative animate-fade-in">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder={t.searchPlaceholder}
            className="pl-10 border-2 focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Card className="border shadow-sm animate-slide-up">
          <CardContent className="p-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredCountries.map((country, index) => (
                  <Link 
                    key={country.id}
                    href={`/countries/${country.code}`}
                    className={`country-card flex items-center p-4 rounded-md hover:bg-primary/10 transition-colors card-hover ${animateCards ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-3xl mr-3">{country.flag_emoji}</span>
                    <span className="font-medium">{country.name}</span>
                  </Link>
                ))}
                
                {filteredCountries.length === 0 && (
                  <div className="col-span-full text-center py-8 text-muted-foreground animate-fade-in">
                    {t.noResults} "{searchTerm}"
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}