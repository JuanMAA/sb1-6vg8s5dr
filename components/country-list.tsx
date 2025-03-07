"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

export default function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-4">Cargando países...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar país..."
          className="pl-10 border-2 focus:border-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <ScrollArea className="h-[300px] pr-4">
        <div className="grid grid-cols-2 gap-2">
          {filteredCountries.map((country) => (
            <Link 
              key={country.id}
              href={`/countries/${country.code}`}
              className="country-card flex items-center p-2 rounded-md hover:bg-primary/10 transition-colors card-hover animate-fade-in"
            >
              <span className="text-2xl mr-2">{country.flag_emoji}</span>
              <span className="font-medium text-sm">{country.name}</span>
            </Link>
          ))}
          
          {filteredCountries.length === 0 && (
            <div className="col-span-full text-center py-8 text-muted-foreground animate-fade-in">
              No se encontraron países que coincidan con "{searchTerm}"
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}