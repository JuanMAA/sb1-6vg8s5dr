"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink, Info, Shield, Check } from "lucide-react";
import { getCasinos, getCasinosByCountry } from "@/lib/api";

type Casino = {
  id: number;
  name: string;
  slug: string;
  logo_url: string;
  rating: number;
  description: string;
  bonus?: string;
  website_url: string;
  min_deposit: number | null;
  withdrawal_time: string | null;
  has_mobile_app: boolean;
  has_live_streaming: boolean;
  has_cash_out: boolean;
  has_live_betting: boolean;
};

type CasinoListProps = {
  countryCode?: string;
  limit?: number;
  skip?: number;
  highlightFirst?: boolean;
  displayStyle?: 'standard' | 'featured' | 'compact';
};

export default function CasinoList({ 
  countryCode = "global", 
  limit, 
  skip = 0,
  highlightFirst = false,
  displayStyle = 'standard'
}: CasinoListProps) {
  const searchParams = useSearchParams();
  const [casinos, setCasinos] = useState<Casino[]>([]);
  const [filteredCasinos, setFilteredCasinos] = useState<Casino[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCasinos() {
      try {
        setLoading(true);
        let data;
        
        if (countryCode === "global") {
          data = await getCasinos();
        } else {
          data = await getCasinosByCountry(countryCode);
        }
        
        setCasinos(data);
      } catch (err) {
        console.error("Error loading casinos:", err);
        setError("Failed to load casinos. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    loadCasinos();
  }, [countryCode]);

  // Apply filters whenever casinos or search params change
  useEffect(() => {
    if (casinos.length === 0) return;
    
    let filtered = [...casinos];
    
    // Get filter values from URL
    const minRating = searchParams.get('minRating');
    const hasApp = searchParams.get('hasApp');
    const hasLiveStreaming = searchParams.get('hasLiveStreaming');
    const hasCashOut = searchParams.get('hasCashOut');
    const hasLiveBetting = searchParams.get('hasLiveBetting');
    
    // Apply rating filter
    if (minRating) {
      filtered = filtered.filter(casino => 
        casino.rating >= parseFloat(minRating)
      );
    }
    
    // Apply feature filters
    if (hasApp === 'true') {
      filtered = filtered.filter(casino => casino.has_mobile_app);
    }
    
    if (hasLiveStreaming === 'true') {
      filtered = filtered.filter(casino => casino.has_live_streaming);
    }
    
    if (hasCashOut === 'true') {
      filtered = filtered.filter(casino => casino.has_cash_out);
    }
    
    if (hasLiveBetting === 'true') {
      filtered = filtered.filter(casino => casino.has_live_betting);
    }
    
    // Apply skip and limit
    if (skip > 0) {
      filtered = filtered.slice(skip);
    }
    
    if (limit) {
      filtered = filtered.slice(0, limit);
    }
    
    setFilteredCasinos(filtered);
  }, [casinos, searchParams, skip, limit]);

  if (loading) {
    return <div className="text-center py-8">Cargando casinos...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (filteredCasinos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg mb-2">No se encontraron casinos para esta selección.</p>
        <p className="text-muted-foreground">Intenta ajustar tus filtros o seleccionar un país diferente.</p>
      </div>
    );
  }

  // Featured display style (large card for homepage featured casino)
  if (displayStyle === 'featured') {
    const casino = filteredCasinos[0];
    return (
      <Card className="border shadow-md overflow-hidden card-hover animated-gradient-border">
        <CardHeader className="pb-2 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex justify-between items-start">
            <Badge className="bg-primary text-white">Top #1</Badge>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < Math.floor(casino.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                />
              ))}
              <span className="ml-2 font-medium">{casino.rating}/5</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative w-full h-32 mb-4">
                <Image 
                  src={casino.logo_url}
                  alt={casino.name}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              
              <h3 className="text-xl font-bold text-center mb-2">{casino.name}</h3>
              
              <div className="flex flex-wrap gap-1 justify-center mb-4">
                {casino.has_mobile_app && <Badge variant="outline" className="text-xs">App Móvil</Badge>}
                {casino.has_live_streaming && <Badge variant="outline" className="text-xs">Streaming en Vivo</Badge>}
                {casino.has_cash_out && <Badge variant="outline" className="text-xs">Cash Out</Badge>}
                {casino.has_live_betting && <Badge variant="outline" className="text-xs">Apuestas en Vivo</Badge>}
              </div>
            </div>
            
            <div className="md:w-2/3">
              <p className="mb-4">{casino.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Depósito mínimo:</p>
                  <p className="font-medium">{casino.min_deposit ? `${casino.min_deposit}€` : "No especificado"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tiempo de retiro:</p>
                  <p className="font-medium">{casino.withdrawal_time || "No especificado"}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                  <Link href={casino.website_url} target="_blank" rel="noopener noreferrer">
                    Visitar Sitio <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href={`/casinos/${casino.slug}`}>
                    Ver Detalles <Info className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Compact display style (for homepage top 4 list)
  if (displayStyle === 'compact') {
    return (
      <div className="space-y-3">
        {filteredCasinos.map((casino, index) => (
          <Card key={casino.id} className="overflow-hidden border card-hover">
            <CardContent className="p-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center bg-secondary/20 rounded-full w-8 h-8 flex-shrink-0">
                  <span className="font-bold">{skip + index + 1}</span>
                </div>
                
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image 
                    src={casino.logo_url}
                    alt={casino.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{casino.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm">{casino.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-1">
                    {casino.has_mobile_app && <Badge variant="outline" className="text-xs py-0">App</Badge>}
                    {casino.has_live_streaming && <Badge variant="outline" className="text-xs py-0">Live</Badge>}
                  </div>
                </div>
                
                <Button asChild size="sm" className="flex-shrink-0">
                  <Link href={`/casinos/${casino.slug}`}>
                    Detalles
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Standard display style (for rankings page)
  return (
    <div className="space-y-4">
      {filteredCasinos.map((casino, index) => (
        <Card 
          key={casino.id} 
          className={`overflow-hidden border ${highlightFirst && index === 0 ? 'animated-gradient-border bg-gradient-to-r from-primary/5 to-accent/5' : 'card-hover'}`}
        >
          <CardContent className="p-0">
            <div className="grid grid-cols-12 gap-4">
              <div className={`col-span-12 sm:col-span-1 flex items-center justify-center p-4 ${highlightFirst && index === 0 ? 'bg-primary text-white' : 'bg-secondary/50'} font-bold text-2xl`}>
                #{index + 1}
              </div>
              
              <div className="col-span-12 sm:col-span-2 p-4 flex items-center justify-center">
                <div className="relative w-full h-20">
                  <Image 
                    src={casino.logo_url}
                    alt={casino.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
              
              <div className="col-span-12 sm:col-span-3 p-4">
                <h3 className={`font-semibold ${highlightFirst && index === 0 ? 'text-xl' : 'text-lg'} mb-1`}>{casino.name}</h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(casino.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm">{casino.rating}/5</span>
                </div>
                <Link href={`/casinos/${casino.slug}`} className="text-sm text-primary flex items-center hover:text-primary/80 transition-colors">
                  Leer Reseña <Info className="ml-1 h-3 w-3" />
                </Link>
              </div>
              
              <div className="col-span-12 sm:col-span-3 p-4">
                <p className="text-sm line-clamp-3">{casino.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {casino.has_mobile_app && <Badge variant="outline" className="text-xs bg-secondary/50">App Móvil</Badge>}
                  {casino.has_live_streaming && <Badge variant="outline" className="text-xs bg-secondary/50">Streaming en Vivo</Badge>}
                  {casino.has_cash_out && <Badge variant="outline" className="text-xs bg-secondary/50">Cash Out</Badge>}
                  {casino.has_live_betting && <Badge variant="outline" className="text-xs bg-secondary/50">Apuestas en Vivo</Badge>}
                </div>
              </div>
              
              <div className="col-span-12 sm:col-span-3 p-4 flex items-center justify-center">
                <div className="space-y-2 w-full">
                  <Button asChild className={`w-full ${highlightFirst && index === 0 ? 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90' : 'bg-primary hover:bg-primary/90'}`}>
                    <Link href={casino.website_url} target="_blank" rel="noopener noreferrer">
                      Visitar Sitio <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/casinos/${casino.slug}`}>
                      Ver Detalles <Info className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}