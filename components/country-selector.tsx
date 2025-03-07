"use client";

import { useState, useEffect, useCallback } from "react";
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && ['en', 'es', 'fr', 'de'].includes(savedLanguage)) {
        setCurrentLanguage(savedLanguage);
      }
    }
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  const loadCountries = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCountries();
      setCountries(data);
      setError(null);
    } catch (err) {
      console.error("Error loading countries:", err);
      setError("Failed to load countries. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  const t = translations[currentLanguage as keyof typeof translations];

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-4">
        <p>Cargando países...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="to-accent/5">
      <div className="container">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {t.title}
          </h2>
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
            aria-label={t.searchPlaceholder}
          />
        </div>

        <Card className="border shadow-sm border modern-card">
          <CardContent className="p-4">
            <ScrollArea>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredCountries.map((country, index) => (
                  <li key={country.id}>
                    <Link
                      href={`/countries/${country.code}`}
                      className={`flex items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-primary/5 card-hover ${animateCards ? "animate-fade-in" : "opacity-0"
                        }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="text-4xl mr-4">{country.flag_emoji}</span>
                      <span className="font-medium">{country.name}</span>
                    </Link>
                  </li>
                ))}

                {filteredCountries.length === 0 && (
                  <li className="col-span-full text-center py-8 text-muted-foreground animate-fade-in">
                    {t.noResults} "{searchTerm}"
                  </li>
                )}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}