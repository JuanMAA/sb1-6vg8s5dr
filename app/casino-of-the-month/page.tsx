"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Award, Check, ExternalLink, Shield, Globe, Info, Zap, Percent, DollarSign } from "lucide-react";
import { getFeaturedCasino } from "@/lib/api";

// Countries for tabs
const countries = [
  { id: "global", name: "Global", flag: "🌎" },
  { id: "espana", name: "España", flag: "🇪🇸" },
  { id: "us", name: "Estados Unidos", flag: "🇺🇸" },
  { id: "uk", name: "Reino Unido", flag: "🇬🇧" },
  { id: "mexico", name: "México", flag: "🇲🇽" }
];

export default function CasinoOfTheMonthPage() {
  const [selectedCountry, setSelectedCountry] = useState("global");
  const [currentMonth] = useState("Mayo 2025");
  const [casino, setCasino] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function loadFeaturedCasino() {
      try {
        setLoading(true);
        const data = await getFeaturedCasino(selectedCountry);
        setCasino(data);
      } catch (err) {
        console.error("Error loading featured casino:", err);
        setError("Failed to load featured casino. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    loadFeaturedCasino();
  }, [selectedCountry]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading casino of the month...</div>;
  }

  if (error || !casino) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error || "No featured casino available for this country."}</p>
        <p className="mt-4">Please try selecting a different country or check back later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Badge variant="outline" className="mb-2">Destacado</Badge>
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Casino del Mes: {currentMonth}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Cada mes seleccionamos una casa de apuestas destacada por país que sobresale en selección de mercados, bonos, seguridad y servicio al cliente.
        </p>
      </div>
      
      <Tabs defaultValue="global" value={selectedCountry} onValueChange={setSelectedCountry} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          {countries.map(country => (
            <TabsTrigger 
              key={country.id} 
              value={country.id}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-accent/80 data-[state=active]:text-white"
            >
              <span className="mr-2">{country.flag}</span> {country.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={selectedCountry}>
          <Card className="border shadow-md overflow-hidden">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1 p-6 flex flex-col items-center justify-center bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="relative w-full h-32 mb-4">
                  <Image 
                    src={casino.logo_url}
                    alt={casino.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(casino.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                    />
                  ))}
                  <span className="ml-2 font-medium">{casino.rating}/5</span>
                </div>
                
                <Award className="h-16 w-16 text-primary my-2" />
                
                <div className="mt-4 text-center">
                  <p className="text-sm font-medium">Establecido en {casino.established_year}</p>
                  {casino.monthly_visits && <p className="text-sm text-muted-foreground">{casino.monthly_visits} visitas mensuales</p>}
                  {casino.user_reviews_count && <p className="text-sm text-muted-foreground">{casino.user_reviews_count} reseñas de usuarios</p>}
                  {casino.positive_rating_percentage && <p className="text-sm text-green-600">{casino.positive_rating_percentage}% valoración positiva</p>}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">{casino.name}</CardTitle>
                  <CardDescription>{casino.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                    <h4 className="font-semibold mb-2">Bono de Bienvenida:</h4>
                    <p className="text-primary font-medium">Disponible en el sitio web</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Características Principales:</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {casino.has_mobile_app && (
                          <li className="flex items-center">
                            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-2">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm">App Móvil</span>
                          </li>
                        )}
                        {casino.has_live_streaming && (
                          <li className="flex items-center">
                            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-2">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm">Streaming en Vivo</span>
                          </li>
                        )}
                        {casino.has_cash_out && (
                          <li className="flex items-center">
                            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-2">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm">Cash Out</span>
                          </li>
                        )}
                        {casino.has_live_betting && (
                          <li className="flex items-center">
                            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-2">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm">Apuestas en Vivo</span>
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Información de Pagos:</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Depósito mínimo:</p>
                          <p className="font-medium">{casino.min_deposit ? `${casino.min_deposit}€` : "No especificado"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Tiempo de retiro:</p>
                          <p className="font-medium">{casino.withdrawal_time || "No especificado"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href={casino.website_url} target="_blank" rel="noopener noreferrer">
                      Visitar Sitio <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="border-2">
                    <Link href={`/casinos/${casino.slug}`}>
                      Leer Reseña Completa
                    </Link>
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
          
          <div className="mt-8 text-center">
            <h2 className="text-xl font-bold mb-4">¿Por qué elegimos {casino.name} como Casino del Mes?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
              Nuestro equipo de expertos evalúa cientos de casas de apuestas cada mes basándose en criterios estrictos como fiabilidad, bonos, variedad de mercados, atención al cliente, velocidad de pagos y seguridad. {casino.name} ha destacado en todas estas áreas, ofreciendo una experiencia excepcional para los apostadores.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Bonos</h3>
                <p className="text-sm text-muted-foreground">Promociones generosas y justas</p>
              </div>
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Seguridad</h3>
                <p className="text-sm text-muted-foreground">Protección de datos y fondos</p>
              </div>
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg text-center">
                <Percent className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Cuotas</h3>
                <p className="text-sm text-muted-foreground">Valores competitivos</p>
              </div>
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold">Pagos</h3>
                <p className="text-sm text-muted-foreground">Retiros rápidos y fiables</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Star component for ratings
function Star({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}