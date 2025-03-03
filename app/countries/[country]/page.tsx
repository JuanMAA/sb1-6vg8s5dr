
import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CasinoList from "@/components/casino-list";
import BonusList from "@/components/bonus-list";
import { getCountries, getCountryByCode } from "@/lib/api";

export default async function CountryPage() {
  const params = useParams();
  const countryCode = params.country as string;
  
  const [country, setCountry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCountry() {
      try {
        setLoading(true);
        const data = await getCountryByCode(countryCode);
        
        if (!data) {
          notFound();
        }
        
        setCountry(data);
      } catch (err) {
        console.error(`Error loading country with code ${countryCode}:`, err);
        setError("Failed to load country information. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    loadCountry();
  }, [countryCode]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading country information...</div>;
  }

  if (error || !country) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error || "Country not found"}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <span className="text-5xl mr-4">{country.flag_emoji}</span>
        <div>
          <h1 className="text-4xl font-bold">{country.name}</h1>
          <p className="text-muted-foreground">Online Casino Legal Information</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Legal Status Overview</CardTitle>
              <CardDescription>Current legal framework for online casinos in {country.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Legal Status</h3>
                  <Badge className={
                    country.legal_status.includes("Legal") ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : 
                    country.legal_status.includes("Partially") ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" : 
                    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                  }>
                    {country.legal_status}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Regulatory Body</h3>
                  <p>{country.regulatory_body || "Not specified"}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Legal Gambling Age</h3>
                  <p>{country.legal_age || "Not specified"}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Taxation</h3>
                  <p>{country.tax_info || "Not specified"}</p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-semibold mb-4">Detailed Legal Information</h3>
                <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: country.legal_info || "No detailed information available." }} />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Popular Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Information not available in the database. Please update the country data.</p>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Restricted Games</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Information not available in the database. Please update the country data.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Licensed Operators</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Information not available in the database. Please update the country data.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs defaultValue="casinos" className="w-full mb-12">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="casinos">Top Casinos in {country.name}</TabsTrigger>
          <TabsTrigger value="bonuses">Best Bonuses in {country.name}</TabsTrigger>
        </TabsList>
        <TabsContent value="casinos" className="mt-6">
          <CasinoList countryCode={country.code} />
        </TabsContent>
        <TabsContent value="bonuses" className="mt-6">
          <BonusList />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export async function generateStaticParams() {
  const countries = await getCountries();

  return countries.map(country => ({
    country: country.code
  }));
}