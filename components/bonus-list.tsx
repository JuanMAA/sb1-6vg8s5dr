"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Gift, Percent, Coins, Zap, Copy, Check, Shield, Star } from "lucide-react";
import { getBonuses } from "@/lib/api";

type Bonus = {
  id: number;
  name: string;
  description: string;
  bonus_code: string | null;
  wagering_requirement: number | null;
  min_deposit: number | null;
  valid_until: string | null;
  bonus_type: string;
  is_exclusive: boolean;
  casino_id: number;
  casinos: {
    id: number;
    name: string;
    logo_url: string;
    website_url: string;
    rating: number;
  };
};

type BonusListProps = {
  type?: string;
  limit?: number;
};

export default function BonusList({ type = "all", limit }: BonusListProps) {
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    async function loadBonuses() {
      try {
        setLoading(true);
        const data = await getBonuses(type);
        
        if (limit) {
          setBonuses(data.slice(0, limit));
        } else {
          setBonuses(data);
        }
      } catch (err) {
        console.error("Error loading bonuses:", err);
        setError("Failed to load bonuses. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    loadBonuses();
  }, [type, limit]);

  // Copy bonus code to clipboard
  const copyBonusCode = (code: string) => {
    if (!code) return;
    
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (loading) {
    return <div className="text-center py-8">Loading bonuses...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (bonuses.length === 0) {
    return <div className="text-center py-8">No bonuses found for this selection.</div>;
  }

  // Get icon based on bonus type
  const getBonusIcon = (bonusType: string) => {
    switch (bonusType) {
      case "welcome":
        return <Gift className="h-4 w-4" />;
      case "no-deposit":
        return <Coins className="h-4 w-4" />;
      case "free-bets":
      case "free-spins":
        return <Zap className="h-4 w-4" />;
      case "cashback":
        return <Percent className="h-4 w-4" />;
      default:
        return <Gift className="h-4 w-4" />;
    }
  };

  // Get badge class based on bonus type
  const getBonusBadgeClass = (bonusType: string) => {
    switch (bonusType) {
      case "welcome":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "no-deposit":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "free-bets":
      case "free-spins":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100";
      case "cashback":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      default:
        return "";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bonuses.map((bonus) => (
        <Card key={bonus.id} className="overflow-hidden border modern-card animate-fade-in">
          <CardHeader className="pb-2 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{bonus.casinos.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < Math.floor(bonus.casinos.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                      />
                    ))}
                  </div>
                  Rating: {bonus.casinos.rating}/5
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {bonus.is_exclusive && (
                  <Badge variant="outline" className="bg-primary text-white">
                    Exclusivo
                  </Badge>
                )}
                <Badge variant="outline" className={getBonusBadgeClass(bonus.bonus_type)}>
                  {bonus.bonus_type === "welcome" ? "Bienvenida" : 
                   bonus.bonus_type === "no-deposit" ? "Sin Depósito" :
                   bonus.bonus_type === "free-bets" ? "Apuestas Gratis" :
                   bonus.bonus_type === "free-spins" ? "Giros Gratis" : "Devolución"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pb-2">
            <div className="relative w-full h-20 mb-4">
              <Image 
                src={bonus.casinos.logo_url}
                alt={bonus.casinos.name}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            
            <div className="bg-primary/10 p-3 rounded-md mb-4">
              <p className="text-center font-semibold">{bonus.description}</p>
            </div>
            
            {bonus.bonus_code && (
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm">
                  <span className="text-muted-foreground">Código de Bono:</span>
                </div>
                <div className="flex items-center">
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono mr-2">
                    {bonus.bonus_code}
                  </code>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => copyBonusCode(bonus.bonus_code || "")}
                    className="h-8 w-8"
                  >
                    {copiedCode === bonus.bonus_code ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Requisito de Apuesta:</p>
                <p className="font-medium">{bonus.wagering_requirement ? `${bonus.wagering_requirement}x` : "N/A"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Depósito Mínimo:</p>
                <p className="font-medium">{bonus.min_deposit ? `${bonus.min_deposit}€` : "Ninguno"}</p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button asChild className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Link href={bonus.casinos.website_url} target="_blank" rel="noopener noreferrer">
                Reclamar Bono <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}