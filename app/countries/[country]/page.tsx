"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CasinoList from "@/components/casino-list";
import BonusList from "@/components/bonus-list";
import { getCountries, getCountryByCode } from "@/lib/api";

async function getCountryData(country: string): Promise<any> {
  try {
    const countryData = await getCountryByCode(country);
    if (!countryData) {
      console.error('Error fetching countryData:', countryData);
    }

    return { countryData };
  } catch (err) {
    console.error('Error:', err);
    return { countryData: null };
  }
}

export default async function CountryPage({
  params
}: {
  params: { country: string };
}) {
  const { countryData } = await getCountryData(params.country);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <span className="text-5xl mr-4">{countryData.flag_emoji}</span>
        <div>
          <h1 className="text-4xl font-bold">{countryData.name}</h1>
          <p className="text-muted-foreground">Online Casino Legal Information</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Legal Status Overview</CardTitle>
              <CardDescription>Current legal framework for online casinos in {countryData.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Legal Status</h3>
                  <Badge className={
                    countryData.legal_status.includes("Legal") ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : 
                    countryData.legal_status.includes("Partially") ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" : 
                    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                  }>
                    {countryData.legal_status}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Regulatory Body</h3>
                  <p>{countryData.regulatory_body || "Not specified"}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Legal Gambling Age</h3>
                  <p>{countryData.legal_age || "Not specified"}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Taxation</h3>
                  <p>{countryData.tax_info || "Not specified"}</p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-semibold mb-4">Detailed Legal Information</h3>
                <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: countryData.legal_info || "No detailed information available." }} />
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
          <TabsTrigger value="casinos">Top Casinos in {countryData.name}</TabsTrigger>
          <TabsTrigger value="bonuses">Best Bonuses in {countryData.name}</TabsTrigger>
        </TabsList>
        <TabsContent value="casinos" className="mt-6">
          <CasinoList countryCode={countryData.code} />
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