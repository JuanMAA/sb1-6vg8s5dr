"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink, Info, Shield } from "lucide-react";
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
};

export default function CasinoList({ countryCode = "global", limit }: CasinoListProps) {
  const [casinos, setCasinos] = useState<Casino[]>([]);
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
        
        if (limit) {
          data = data.slice(0, limit);
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
  }, [countryCode, limit]);

  if (loading) {
    return <div className="text-center py-8">Loading casinos...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (casinos.length === 0) {
    return <div className="text-center py-8">No casinos found for this selection.</div>;
  }

  return (
    <div className="space-y-4">
      {casinos.map((casino, index) => (
        <Card key={casino.id} className="overflow-hidden border card-hover">
          <CardContent className="p-0">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-1 flex items-center justify-center p-4 bg-secondary/50 font-bold text-2xl">
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
                <h3 className="font-semibold text-lg mb-1">{casino.name}</h3>
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
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href={casino.website_url} target="_blank" rel="noopener noreferrer">
                    Visitar Sitio <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}