"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ExternalLink, Info, Shield, Award } from "lucide-react";

// Using only the first 3 casinos from each country to reduce content
const casinosByCountry = {
  global: [
    {
      id: 1,
      name: "Bet365",
      logo: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      rating: 4.8,
      bonus: "100% hasta 100€",
      features: ["30+ Deportes", "Pagos Rápidos", "Soporte 24/7"],
      website: "https://example.com/bet365",
      licenses: ["UKGC", "MGA", "DGOJ"],
      licenseNumber: "39563, MGA/CRP/543/2018, ESP/2011/02",
      userReviews: 1250,
      positiveRating: 94
    },
    {
      id: 2,
      name: "William Hill",
      logo: "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      rating: 4.7,
      bonus: "100€ en apuestas gratis",
      features: ["25+ Deportes", "Versión Móvil", "Programa VIP"],
      website: "https://example.com/william-hill",
      licenses: ["UKGC", "GRA"],
      licenseNumber: "000-039225 R-319373-001, RGL No.034",
      userReviews: 980,
      positiveRating: 92
    },
    {
      id: 3,
      name: "Bwin",
      logo: "https://images.unsplash.com/photo-1596731498067-8e0b6ff366b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      rating: 4.6,
      bonus: "50€ en apuestas gratis",
      features: ["20+ Deportes", "Pagos Crypto", "Apuestas en Vivo"],
      website: "https://example.com/bwin",
      licenses: ["MGA", "DGOJ"],
      licenseNumber: "MGA/CRP/108/2004, ESP/2008/03",
      userReviews: 850,
      positiveRating: 90
    }
  ],
  espana: [
    {
      id: 1,
      name: "Codere",
      logo: "https://images.unsplash.com/photo-1518893883800-45cd0954574b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      rating: 4.6,
      bonus: "Bono de bienvenida de hasta 200€",
      features: ["Licencia DGOJ", "Apuestas en Directo", "Pagos Rápidos"],
      website: "https://example.com/codere",
      licenses: ["DGOJ"],
      licenseNumber: "ESP/2012/12",
      userReviews: 680,
      positiveRating: 89
    },
    {
      id: 2,
      name: "Sportium",
      logo: "https://images.unsplash.com/photo-1529973625058-a665431328fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      rating: 4.5,
      bonus: "Bono de bienvenida de hasta 150€",
      features: ["Licencia DGOJ", "Apuestas en Directo", "App Móvil"],
      website: "https://example.com/sportium",
      licenses: ["DGOJ"],
      licenseNumber: "ESP/2012/08",
      userReviews: 520,
      positiveRating: 87
    },
    {
      id: 3,
      name: "Luckia",
      logo: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      rating: 4.4,
      bonus: "Bono de bienvenida de hasta 120€",
      features: ["Licencia DGOJ", "Apuestas en Directo", "Retiros Rápidos"],
      website: "https://example.com/luckia",
      licenses: ["DGOJ"],
      licenseNumber: "ESP/2012/15",
      userReviews: 490,
      positiveRating: 85
    }
  ],
  us: [
    {
      id: 1,
      name: "BetMGM",
      logo: "https://images.unsplash.com/photo-1518893883800-45cd0954574b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      rating: 4.7,
      bonus: "Risk-free bet up to $1,000",
      features: ["Licensed in Multiple States", "Live Betting", "Mobile App"],
      website: "https://example.com/betmgm",
      licenses: ["New Jersey DGE", "Pennsylvania PGCB", "Michigan MGCB"],
      licenseNumber: "NJIGP 15-001, PGCB-123, MGCB-CS-2020",
      userReviews: 870,
      positiveRating: 91
    },
    {
      id: 2,
      name: "FanDuel",
      logo: "https://images.unsplash.com/photo-1529973625058-a665431328fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      rating: 4.8,
      bonus: "$1,000 No Sweat First Bet",
      features: ["Licensed in Multiple States", "Same Game Parlays", "Mobile App"],
      website: "https://example.com/fanduel",
      licenses: ["New Jersey DGE", "Pennsylvania PGCB", "New York GC"],
      licenseNumber: "NJIGP 15-002, PGCB-124, NYGC-2022-01",
      userReviews: 1050,
      positiveRating: 93
    },
    {
      id: 3,
      name: "DraftKings",
      logo: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      rating: 4.7,
      bonus: "Up to $1,000 Deposit Bonus",
      features: ["Licensed in Multiple States", "Live Betting", "Mobile App"],
      website: "https://example.com/draftkings",
      licenses: ["New Jersey DGE", "Pennsylvania PGCB", "Colorado DOR"],
      licenseNumber: "NJIGP 15-003, PGCB-125, CDOR-2020-01",
      userReviews: 920,
      positiveRating: 90
    }
  ],
  uk: [
    {
      id: 1,
      name: "Ladbrokes",
      logo: "https://images.unsplash.com/photo-1529973625058-a665431328fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      rating: 4.7,
      bonus: "Apuesta 5£, recibe 20£ en apuestas gratis",
      features: ["Licencia UKGC", "Acepta PayPal", "Sin Requisitos de Apuesta"],
      website: "https://example.com/ladbrokes",
      licenses: ["UKGC"],
      licenseNumber: "000-001721-R-104169-029",
      userReviews: 890,
      positiveRating: 91
    },
    {
      id: 2,
      name: "Coral",
      logo: "https://images.unsplash.com/photo-1518893883800-45cd0954574b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      rating: 4.6,
      bonus: "Apuesta 5£, recibe 20£ en apuestas gratis",
      features: ["Licencia UKGC", "Apuestas en Directo", "App Móvil"],
      website: "https://example.com/coral",
      licenses: ["UKGC"],
      licenseNumber: "000-002150-R-104169-029",
      userReviews: 750,
      positiveRating: 89
    },
    {
      id: 3,
      name: "Paddy Power",
      logo: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      rating: 4.5,
      bonus: "Apuesta 10£, recibe 40£ en apuestas gratis",
      features: ["Licencia UKGC", "Apuestas en Directo", "Retiros Rápidos"],
      website: "https://example.com/paddy-power",
      licenses: ["UKGC"],
      licenseNumber: "000-039426-R-319332-001",
      userReviews: 820,
      positiveRating: 87
    }
  ],
  mexico: [
    {
      id: 1,
      name: "Caliente",
      logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      rating: 4.5,
      bonus: "Bono de bienvenida del 100% hasta $3,000 MXN",
      features: ["Moneda MXN", "Pagos con OXXO", "Soporte Mexicano"],
      website: "https://example.com/caliente",
      licenses: ["SEGOB"],
      licenseNumber: "DGJS/SCEVF/P-06/2005",
      userReviews: 680,
      positiveRating: 88
    },
    {
      id: 2,
      name: "Ganabet",
      logo: "https://images.unsplash.com/photo-1529973625058-a665431328fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      rating: 4.3,
      bonus: "Bono de bienvenida del 100% hasta $2,500 MXN",
      features: ["Moneda MXN", "Pagos con SPEI", "App Móvil"],
      website: "https://example.com/ganabet",
      licenses: ["SEGOB"],
      licenseNumber: "DGJS/SCEVF/P-03/2016",
      userReviews: 520,
      positiveRating: 84
    },
    {
      id: 3,
      name: "Strendus",
      logo: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=150&q=80",
      rating: 4.4,
      bonus: "Bono de bienvenida del 100% hasta $2,000 MXN",
      features: ["Moneda MXN", "Apuestas en Vivo", "Casino en Vivo"],
      website: "https://example.com/strendus",
      licenses: ["SEGOB"],
      licenseNumber: "DGJS/SCEVF/P-04/2018",
      userReviews: 590,
      positiveRating: 86
    }
  ]
};

const translations = {
  en: {
    title: "Top Ranked Betting Sites",
    description: "Our experts have reviewed hundreds of betting sites to bring you the best options available in your region.",
    welcomeBonus: "Welcome Bonus:",
    features: "Features:",
    readReview: "Read Review",
    visitSite: "Visit Site",
    viewAll: "View All",
    bettingSites: "Betting Sites",
    licensing: "Licensing:",
    licenseNumber: "License #:",
    userReviews: "User Reviews:",
    positiveRating: "Positive Rating:"
  },
  es: {
    title: "Casas de Apuestas Mejor Clasificadas",
    description: "Nuestros expertos han revisado cientos de casas de apuestas para ofrecerte las mejores opciones disponibles en tu región.",
    welcomeBonus: "Bono de Bienvenida:",
    features: "Características:",
    readReview: "Leer Reseña",
    visitSite: "Visitar Sitio",
    viewAll: "Ver Todas",
    bettingSites: "Casas de Apuestas",
    licensing: "Licencias:",
    licenseNumber: "Licencia #:",
    userReviews: "Reseñas de Usuarios:",
    positiveRating: "Valoración Positiva:"
  },
  fr: {
    title: "Sites de Paris les Mieux Classés",
    description: "Nos experts ont examiné des centaines de sites de paris pour vous proposer les meilleures options disponibles dans votre région.",
    welcomeBonus: "Bonus de Bienvenue:",
    features: "Caractéristiques:",
    readReview: "Lire l'Avis",
    visitSite: "Visiter le Site",
    viewAll: "Voir Tout",
    bettingSites: "Sites de Paris",
    licensing: "Licences:",
    licenseNumber: "Licence #:",
    userReviews: "Avis d'Utilisateurs:",
    positiveRating: "Évaluation Positive:"
  },
  de: {
    title: "Bestbewertete Wettanbieter",
    description: "Unsere Experten haben Hunderte von Wettanbietern bewertet, um Ihnen die besten Optionen in Ihrer Region zu präsentieren.",
    welcomeBonus: "Willkommensbonus:",
    features: "Funktionen:",
    readReview: "Bewertung Lesen",
    visitSite: "Website Besuchen",
    viewAll: "Alle Anzeigen",
    bettingSites: "Wettanbieter",
    licensing: "Lizenzen:",
    licenseNumber: "Lizenz #:",
    userReviews: "Benutzerbewertungen:",
    positiveRating: "Positive Bewertung:"
  }
};

export default function TopRankedCasinos() {
  const [selectedCountry, setSelectedCountry] = useState("global");
  const [currentLanguage, setCurrentLanguage] = useState("es");
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
  
  const countries = [
    { id: "global", name: "Global" },
    { id: "espana", name: "España" },
    { id: "us", name: "Estados Unidos" },
    { id: "uk", name: "Reino Unido" },
    { id: "mexico", name: "México" }
  ];

  return (
    <section className="py-12">
      <div className="container">
        <div className="text-center mb-6 animate-fade-in">
          <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            {t.description}
          </p>
        </div>
        
        <Tabs defaultValue="global" value={selectedCountry} onValueChange={setSelectedCountry} className="w-full animate-fade-in">
          <div className="flex justify-center mb-4 overflow-x-auto pb-2">
            <TabsList className="modern-tabs-list">
              {countries.map(country => (
                <TabsTrigger 
                  key={country.id} 
                  value={country.id}
                  className="modern-tabs-trigger"
                >
                  {country.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {Object.keys(casinosByCountry).filter(key => countries.some(c => c.id === key)).map(countryKey => (
            <TabsContent key={countryKey} value={countryKey} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {casinosByCountry[countryKey as keyof typeof casinosByCountry].map((casino, index) => (
                  <Card 
                    key={casino.id} 
                    className={`overflow-hidden border modern-card ${animateCards ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-primary mr-2" />
                          <span className="font-bold">#{index + 1}</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < Math.floor(casino.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                            />
                          ))}
                          <span className="ml-1 text-xs">{casino.rating}</span>
                        </div>
                      </div>
                      
                      <div className="relative w-full h-16 mb-3">
                        <Image 
                          src={casino.logo}
                          alt={casino.name}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      
                      <h3 className="font-semibold text-base mb-1">{casino.name}</h3>
                      
                      <div className="flex items-center mb-2">
                        <Shield className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-600 font-medium">{casino.licenses.join(", ")}</span>
                      </div>
                      
                      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-2 rounded-md mb-3">
                        <p className="text-sm font-medium text-center">{casino.bonus}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {casino.features.map((feature, i) => (
                          <Badge key={i} variant="outline" className="text-xs bg-secondary/50">{feature}</Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between">
                        <Button asChild variant="outline" size="sm" className="text-xs">
                          <Link href={`/casinos/${casino.name.toLowerCase().replace(/\s+/g, "-")}`}>
                            <Info className="mr-1 h-3 w-3" /> {t.readReview}
                          </Link>
                        </Button>
                        <Button asChild size="sm" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-xs">
                          <Link href={casino.website} target="_blank" rel="noopener noreferrer">
                            {t.visitSite} <ExternalLink className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-6 animate-fade-in">
                <Button asChild variant="outline" className="border-2 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10">
                  <Link href={`/rankings/${selectedCountry}`}>
                    {t.viewAll} {countries.find(c => c.id === selectedCountry)?.name} {t.bettingSites}
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