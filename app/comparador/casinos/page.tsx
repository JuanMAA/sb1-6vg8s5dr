"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ExternalLink, Shield, Check, X, Info, Zap, Percent, DollarSign, Globe } from "lucide-react";
import { getCasinos } from "@/lib/api";

// Categories for comparison tabs
const comparisonCategories = [
  { id: "general", name: "General" },
  { id: "bonuses", name: "Bonos" },
  { id: "features", name: "Características" },
  { id: "payments", name: "Pagos" },
  { id: "security", name: "Seguridad" },
  { id: "support", name: "Soporte" }
];

export default function CasinoComparadorPage() {
  const [casinos, setCasinos] = useState<any[]>([]);
  const [selectedCasinos, setSelectedCasinos] = useState<number[]>([1, 2]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [animateComparison, setAnimateComparison] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load casinos from API
  useEffect(() => {
    async function loadCasinos() {
      try {
        setLoading(true);
        const data = await getCasinos();
        setCasinos(data);
        
        // Set initial selected casinos if available
        if (data.length >= 2) {
          setSelectedCasinos([data[0].id, data[1].id]);
        }
      } catch (err) {
        console.error("Error loading casinos:", err);
        setError("Failed to load casinos. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    loadCasinos();
  }, []);
  
  // Add animation after initial render
  useEffect(() => {
    setTimeout(() => {
      setAnimateComparison(true);
    }, 100);
  }, []);
  
  // Handle casino selection
  const handleCasinoSelection = (position: number, casinoId: number) => {
    const newSelection = [...selectedCasinos];
    newSelection[position] = casinoId;
    setSelectedCasinos(newSelection);
  };
  
  // Get selected casinos data
  const selectedCasinosData = selectedCasinos.map(id => 
    casinos.find(casino => casino.id === id)
  );
  
  // Check if a feature is available
  const hasFeature = (feature: boolean | undefined) => {
    return feature ? (
      <Check className="h-5 w-5 text-green-500" />
    ) : (
      <X className="h-5 w-5 text-red-500" />
    );
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading casinos...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;
  }

  if (casinos.length < 2) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Not enough casinos available for comparison. Please add more casinos to the database.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Comparador de Casinos
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compara las características, bonos, métodos de pago y más entre diferentes casas de apuestas para encontrar la que mejor se adapte a tus necesidades.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[0, 1].map((position) => (
          <Card key={position} className="border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Selecciona un Casino</CardTitle>
            </CardHeader>
            <CardContent>
              <Select 
                value={selectedCasinos[position].toString()} 
                onValueChange={(value) => handleCasinoSelection(position, parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un casino" />
                </SelectTrigger>
                <SelectContent>
                  {casinos.map(casino => (
                    <SelectItem key={casino.id} value={casino.id.toString()}>
                      {casino.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="general" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-6 mb-8">
          {comparisonCategories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-accent/80 data-[state=active]:text-white"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {/* General Information */}
        <TabsContent value="general" className={`space-y-4 ${animateComparison ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="grid grid-cols-2 gap-6">
            {selectedCasinosData.map((casino, index) => (
              <Card key={index} className="border">
                <CardContent className="p-6">
                  {casino && (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div className="relative w-32 h-16">
                          <Image 
                            src={casino.logo_url}
                            alt={casino.name}
                            fill
                            style={{ objectFit: "contain" }}
                          />
                        </div>
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
                      
                      <h3 className="text-xl font-bold mb-2">{casino.name}</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Establecido en:</p>
                          <p className="font-medium">{casino.established_year}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Descripción:</p>
                          <p className="text-sm">{casino.description}</p>
                        </div>
                        
                        <Button asChild className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                          <Link href={casino.website_url} target="_blank" rel="noopener noreferrer">
                            Visitar Sitio <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Features */}
        <TabsContent value="features" className={`space-y-4 ${animateComparison ? 'animate-fade-in' : 'opacity-0'}`}>
          <Card className="border">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 font-medium">Característica</div>
                {selectedCasinosData.map((casino, index) => (
                  <div key={index} className="col-span-1 font-medium text-center">
                    {casino?.name}
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="col-span-1">Aplicación móvil</div>
                  {selectedCasinosData.map((casino, index) => (
                    <div key={index} className="col-span-1 flex justify-center">
                      {casino && hasFeature(casino.has_mobile_app)}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="col-span-1">Transmisiones en vivo</div>
                  {selectedCasinosData.map((casino, index) => (
                    <div key={index} className="col-span-1 flex justify-center">
                      {casino && hasFeature(casino.has_live_streaming)}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="col-span-1">Cash Out</div>
                  {selectedCasinosData.map((casino, index) => (
                    <div key={index} className="col-span-1 flex justify-center">
                      {casino && hasFeature(casino.has_cash_out)}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="col-span-1">Apuestas en vivo</div>
                  {selectedCasinosData.map((casino, index) => (
                    <div key={index} className="col-span-1 flex justify-center">
                      {casino && hasFeature(casino.has_live_betting)}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payments */}
        <TabsContent value="payments" className={`space-y-4 ${animateComparison ? 'animate-fade-in' : 'opacity-0'}`}>
          <Card className="border">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 font-medium">Métodos de pago</div>
                {selectedCasinosData.map((casino, index) => (
                  <div key={index} className="col-span-1 font-medium text-center">
                    {casino?.name}
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="col-span-1">Depósito mínimo</div>
                  {selectedCasinosData.map((casino, index) => (
                    <div key={index} className="col-span-1 text-center">
                      {casino?.min_deposit ? `${casino.min_deposit}€` : "No especificado"}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="col-span-1">Tiempo de retiro</div>
                  {selectedCasinosData.map((casino, index) => (
                    <div key={index} className="col-span-1 text-center">
                      {casino?.withdrawal_time || "No especificado"}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Other tabs would follow the same pattern */}
        <TabsContent value="bonuses" className={`space-y-4 ${animateComparison ? 'animate-fade-in' : 'opacity-0'}`}>
          <Card className="border">
            <CardContent className="p-6 text-center">
              <p>Información de bonos no disponible en la base de datos. Por favor, actualice los datos de los casinos.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className={`space-y-4 ${animateComparison ? 'animate-fade-in' : 'opacity-0'}`}>
          <Card className="border">
            <CardContent className="p-6 text-center">
              <p>Información de seguridad no disponible en la base de datos. Por favor, actualice los datos de los casinos.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="support" className={`space-y-4 ${animateComparison ? 'animate-fade-in' : 'opacity-0'}`}>
          <Card className="border">
            <CardContent className="p-6 text-center">
              <p>Información de soporte no disponible en la base de datos. Por favor, actualice los datos de los casinos.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="text-center mt-8">
        <h2 className="text-xl font-bold mb-4">¿Cómo elegir el mejor casino para ti?</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
          Al comparar casinos, es importante considerar varios factores según tus preferencias personales. Algunos apostadores valoran más los bonos generosos, mientras que otros priorizan la variedad de mercados o la velocidad de los retiros.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg text-center">
            <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold">Bonos</h3>
            <p className="text-sm text-muted-foreground">Compara las ofertas de bienvenida y promociones</p>
          </div>
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold">Seguridad</h3>
            <p className="text-sm text-muted-foreground">Verifica licencias y medidas de protección</p>
          </div>
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg text-center">
            <Percent className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold">Cuotas</h3>
            <p className="text-sm text-muted-foreground">Busca las mejores cuotas para tus apuestas</p>
          </div>
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold">Pagos</h3>
            <p className="text-sm text-muted-foreground">Evalúa métodos de pago y tiempos de retiro</p>
          </div>
        </div>
      </div>
    </div>
  );
}