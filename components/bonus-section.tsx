"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Gift, Percent, Coins, Zap, Copy, Check, Shield } from "lucide-react";

const bonusCategories = [
  { id: "welcome", name: "Bonos de Bienvenida", icon: <Gift className="h-4 w-4" /> },
  { id: "no-deposit", name: "Sin Depósito", icon: <Coins className="h-4 w-4" /> },
  { id: "free-bets", name: "Apuestas Gratis", icon: <Zap className="h-4 w-4" /> },
  { id: "cashback", name: "Devolución", icon: <Percent className="h-4 w-4" /> }
];

// Shortened version of the bonuses data
const bonusesByCategory = {
  welcome: [
    {
      id: 1,
      casino: "Bet365",
      logo: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      bonus: "100% hasta 100€ en tu primer depósito",
      code: "BET100",
      wagering: "5x",
      minDeposit: "10€",
      validUntil: "Permanente",
      website: "https://example.com/bet365",
      licenses: ["UKGC", "MGA", "DGOJ"],
      rating: 4.8,
      exclusive: true
    },
    {
      id: 2,
      casino: "William Hill",
      logo: "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      bonus: "100€ en apuestas gratis",
      code: "WH100",
      wagering: "3x",
      minDeposit: "10€",
      validUntil: "Permanente",
      website: "https://example.com/william-hill",
      licenses: ["UKGC", "GRA"],
      rating: 4.7,
      exclusive: false
    }
  ],
  "no-deposit": [
    {
      id: 1,
      casino: "Betfair",
      logo: "https://images.unsplash.com/photo-1613843539605-5f088cfa7701?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      bonus: "5€ sin depósito al registrarte",
      code: "BF5FREE",
      wagering: "10x",
      minDeposit: "Ninguno",
      validUntil: "31 de diciembre, 2025",
      website: "https://example.com/betfair",
      licenses: ["UKGC", "MGA"],
      rating: 4.5,
      exclusive: true
    }
  ],
  "free-bets": [
    {
      id: 1,
      casino: "Codere",
      logo: "https://images.unsplash.com/photo-1518893883800-45cd0954574b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      bonus: "20€ en apuestas gratis para LaLiga",
      code: "LALIGA20",
      wagering: "3x",
      minDeposit: "10€",
      validUntil: "Permanente",
      website: "https://example.com/codere",
      licenses: ["DGOJ"],
      rating: 4.6,
      exclusive: true
    }
  ],
  cashback: [
    {
      id: 1,
      casino: "Caliente",
      logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      bonus: "10% de devolución semanal hasta 50€",
      code: "CASHBACK10",
      wagering: "1x",
      minDeposit: "20€",
      validUntil: "Permanente",
      website: "https://example.com/caliente",
      licenses: ["SEGOB"],
      rating: 4.5,
      exclusive: false
    }
  ]
};

const translations = {
  en: {
    title: "Best Betting Bonuses",
    description: "Find the most generous betting bonuses and promotions currently available online.",
    viewAll: "View All",
    claimBonus: "Claim Bonus",
    wagering: "Wagering",
    minDeposit: "Min Deposit",
    validUntil: "Valid Until",
    bonusCode: "Bonus Code",
    exclusive: "Exclusive",
    rating: "Rating",
    licenses: "Licenses"
  },
  es: {
    title: "Mejores Bonos de Apuestas",
    description: "Encuentra los bonos y promociones de apuestas más generosos disponibles actualmente en línea.",
    viewAll: "Ver Todos",
    claimBonus: "Reclamar Bono",
    wagering: "Requisito de Apuesta",
    minDeposit: "Depósito Mínimo",
    validUntil: "Válido Hasta",
    bonusCode: "Código de Bono",
    exclusive: "Exclusivo",
    rating: "Valoración",
    licenses: "Licencias"
  },
  fr: {
    title: "Meilleurs Bonus de Paris",
    description: "Trouvez les bonus et promotions de paris les plus généreux actuellement disponibles en ligne.",
    viewAll: "Voir Tout",
    claimBonus: "Réclamer Bonus",
    wagering: "Exigence de Mise",
    minDeposit: "Dépôt Minimum",
    validUntil: "Valable Jusqu'à",
    bonusCode: "Code Bonus",
    exclusive: "Exclusif",
    rating: "Évaluation",
    licenses: "Licences"
  },
  de: {
    title: "Beste Wettboni",
    description: "Finden Sie die großzügigsten Wettboni und Promotionen, die derzeit online verfügbar sind.",
    viewAll: "Alle Anzeigen",
    claimBonus: "Bonus Beanspruchen",
    wagering: "Umsatzbedingung",
    minDeposit: "Mindesteinzahlung",
    validUntil: "Gültig Bis",
    bonusCode: "Bonuscode",
    exclusive: "Exklusiv",
    rating: "Bewertung",
    licenses: "Lizenzen"
  }
};

export default function BonusSection() {
  const [selectedCategory, setSelectedCategory] = useState("welcome");
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [animateCards, setAnimateCards] = useState(false);
  
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
  
  const t = translations[currentLanguage as keyof typeof translations];
  
  // Copy bonus code to clipboard
  const copyBonusCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-10 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="container">
        <div className="text-center mb-4 animate-fade-in">
          <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            {t.description}
          </p>
        </div>
        
        <Tabs defaultValue="welcome" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full animate-fade-in">
          <div className="flex justify-center mb-4 overflow-x-auto">
            <TabsList className="modern-tabs-list">
              {bonusCategories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id} 
                  className="modern-tabs-trigger flex items-center"
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {Object.keys(bonusesByCategory).map(categoryKey => (
            <TabsContent key={categoryKey} value={categoryKey} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {bonusesByCategory[categoryKey as keyof typeof bonusesByCategory].map((bonus, index) => (
                  <Card 
                    key={bonus.id} 
                    className={`overflow-hidden border modern-card ${animateCards ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="pb-2 bg-gradient-to-r from-primary/5 to-accent/5">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{bonus.casino}</CardTitle>
                        {bonus.exclusive && (
                          <Badge variant="outline" className="bg-primary text-white text-xs">
                            {t.exclusive}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-3">
                      <div className="relative w-full h-16 mb-2">
                        <Image 
                          src={bonus.logo}
                          alt={bonus.casino}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      
                      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-2 rounded-md mb-2">
                        <p className="text-center font-semibold text-sm">{bonus.bonus}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs">
                          <span className="text-muted-foreground">{t.bonusCode}:</span>
                        </div>
                        <div className="flex items-center">
                          <code className="bg-muted px-2 py-1 rounded text-xs font-mono mr-1">
                            {bonus.code}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => copyBonusCode(bonus.code)}
                            className="h-6 w-6"
                          >
                            {copiedCode === bonus.code ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-1 text-xs mb-2">
                        <div>
                          <p className="text-muted-foreground">{t.wagering}:</p>
                          <p className="font-medium">{bonus.wagering}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{t.minDeposit}:</p>
                          <p className="font-medium">{bonus.minDeposit}</p>
                        </div>
                      </div>
                      
                      <Button asChild className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-xs h-8">
                        <Link href={bonus.website} target="_blank" rel="noopener noreferrer">
                          {t.claimBonus} <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-4 animate-fade-in">
                <Button asChild variant="outline" className="border-2 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10">
                  <Link href={`/bonuses/${selectedCategory}`}>
                    {t.viewAll} {bonusCategories.find(c => c.id === selectedCategory)?.name}
                  </Link>
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}