"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Info, Shield, Globe, Scale, FileText, AlertTriangle } from "lucide-react";
import { getLicenses } from "@/lib/api";

// Categories for comparison tabs
const comparisonCategories = [
  { id: "general", name: "General" },
  { id: "requirements", name: "Requisitos" },
  { id: "protection", name: "Protección" },
  { id: "process", name: "Proceso" },
  { id: "pros-cons", name: "Pros y Contras" }
];

// Get rating badge class
const getRatingBadgeClass = (rating: string) => {
  switch (rating) {
    case "Excellent": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
    case "Good": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
    case "Average": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
    case "Poor": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
    default: return "";
  }
};

export default function LicenseComparadorPage() {
  const [licenses, setLicenses] = useState<any[]>([]);
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>(["1", "2"]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [animateComparison, setAnimateComparison] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load licenses from API
  useEffect(() => {
    async function loadLicenses() {
      try {
        setLoading(true);
        const data = await getLicenses();
        setLicenses(data);
        
        // Set initial selected licenses if available
        if (data.length >= 2) {
          setSelectedLicenses([data[0].id.toString(), data[1].id.toString()]);
        }
      } catch (err) {
        console.error("Error loading licenses:", err);
        setError("Failed to load licenses. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    loadLicenses();
  }, []);
  
  // Add animation after initial render
  useEffect(() => {
    setTimeout(() => {
      setAnimateComparison(true);
    }, 100);
  }, []);
  
  // Handle license selection
  const handleLicenseSelection = (position: number, licenseId: string) => {
    const newSelection = [...selectedLicenses];
    newSelection[position] = licenseId;
    setSelectedLicenses(newSelection);
  };
  
  // Get selected licenses data
  const selectedLicensesData = selectedLicenses.map(id => 
    licenses.find(license => license.id.toString() === id)
  );

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading licenses...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;
  }

  if (licenses.length < 2) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Not enough licenses available for comparison. Please add more licenses to the database.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Comparador de Licencias
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compara las diferentes autoridades reguladoras de juego online, sus requisitos, protecciones al jugador y más para entender mejor la seguridad que ofrecen los casinos.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[0, 1].map((position) => (
          <Card key={position} className="border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Selecciona una Licencia</CardTitle>
            </CardHeader>
            <CardContent>
              <Select 
                value={selectedLicenses[position]} 
                onValueChange={(value) => handleLicenseSelection(position, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una licencia" />
                </SelectTrigger>
                <SelectContent>
                  {licenses.map(license => (
                    <SelectItem key={license.id} value={license.id.toString()}>
                      {license.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="general" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-5 mb-8">
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
          <Card className="border">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 font-medium">Información General</div>
                {selectedLicensesData.map((license, index) => (
                  <div key={index} className="col-span-1 font-medium text-center">
                    {license?.name}
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="col-span-1">País</div>
                  {selectedLicensesData.map((license, index) => (
                    <div key={index} className="col-span-1 text-center">
                      {license?.country}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="col-span-1">Establecida en</div>
                  {selectedLicensesData.map((license, index) => (
                    <div key={index} className="col-span-1 text-center">
                      {license?.established_year}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="col-span-1">Calificación</div>
                  {selectedLicensesData.map((license, index) => (
                    <div key={index} className="col-span-1 flex justify-center">
                      {license && (
                        <Badge className={getRatingBadgeClass(license.rating)}>
                          {license.rating}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="col-span-1">Puntuación de Confianza</div>
                  {selectedLicensesData.map((license, index) => (
                    <div key={index} className="col-span-1 text-center">
                      <span className="font-medium text-primary">{license?.trust_score}/10</span>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="col-span-1">Descripción</div>
                  {selectedLicensesData.map((license, index) => (
                    <div key={index} className="col-span-1 text-center text-sm">
                      {license?.description}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="col-span-1">Sitio Web</div>
                  {selectedLicensesData.map((license, index) => (
                    <div key={index} className="col-span-1 text-center">
                      {license && (
                        <Button asChild variant="link" size="sm" className="text-primary">
                          <Link href={license.website_url} target="_blank" rel="noopener noreferrer">
                            Visitar Sitio Oficial
                          </Link>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Requirements */}
        <TabsContent value="requirements" className={`space-y-4 ${animateComparison ? 'animate-fade-in' : 'opacity-0'}`}>
          <Card className="border">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 font-medium">Requisitos</div>
                {selectedLicensesData.map((license, index) => (
                  <div key={index} className="col-span-1 font-medium text-center">
                    {license?.name}
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="col-span-1">Requisitos para Licencia</div>
                  {selectedLicensesData.map((license, index) => (
                    <div key={index} className="col-span-1">
                      {license && license.license_requirements && (
                        <ul className="space-y-1 text-sm">
                          {license.license_requirements.map((req: any) => (
                            <li key={req.id} className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{req.requirement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="col-span-1">Tarifas Anuales</div>
                  {selectedLicensesData.map((license, index) => (
                    <div key={index} className="col-span-1 text-center">
                      {license?.annual_fees || "No especificado"}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Player Protection */}
        <TabsContent value="protection" className={`space-y-4 ${animateComparison ? 'animate-fade-in' : 'opacity-0'}`}>
          <Card className="border">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 font-medium">Protección al Jugador</div>
                {selectedLicensesData.map((license, index) => (
                  <div key={index} className="col-span-1 font-medium text-center">
                    {license?.name}
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="col-span-1">Medidas de Protección</div>
                  {selectedLicensesData.map((license, index) => (
                    <div key={index} className="col-span-1">
                      {license && license.license_player_protections && (
                        <ul className="space-y-1 text-sm">
                          {license.license_player_protections.map((protection: any) => (
                            <li key={protection.id} className="flex items-start">
                              {license.rating === "Poor" ? (
                                <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                              ) : (
                                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              )}
                              <span>{protection.protection}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Application Process */}
        <TabsContent value="process" className={`space-y-4 ${animateComparison ? 'animate-fade-in' : 'opacity-0'}`}>
          <Card className="border">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 font-medium">Proceso de Aplicación</div>
                {selectedLicensesData.map((license, index) => (
                  <div key={index} className="col-span-1 font-medium text-center">
                    {license?.name}
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="col-span-1">Pasos del Proceso</div>
                  {selectedLicensesData.map((license, index) => (
                    <div key={index} className="col-span-1">
                      {license && license.application_process && (
                        <ul className="space-y-1 text-sm">
                          {license.application_process?.map((step: any) => (
                            <li key={step.id} className="flex items-start">
                              <FileText className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span>{step.step}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Pros and Cons */}
        <TabsContent value="pros-cons" className={`space-y-4 ${animateComparison ? 'animate-fade-in' : 'opacity-0'}`}>
          <Card className="border">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 font-medium">Pros y Contras</div>
                {selectedLicensesData.map((license, index) => (
                  <div key={index} className="col-span-1 font-medium text-center">
                    {license?.name}
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-8">
                {/* Pros */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="col-span-1">Ventajas</div>
                  {selectedLicensesData.map((license, index) => (
                    <div key={index} className="col-span-1">
                      {license && license.pros && (
                        <ul className="space-y-1 text-sm">
                          {license.pros.map((pro: any) => (
                            <li key={pro.id} className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{pro.pro}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Cons */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="col-span-1">Desventajas</div>
                  {selectedLicensesData.map((license, index) => (
                    <div key={index} className="col-span-1">
                      {license && license.cons && (
                        <ul className="space-y-1 text-sm">
                          {license.cons.map((con: any) => (
                            <li key={con.id} className="flex items-start">
                              <X className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{con.con}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}