"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Shield, Check, AlertTriangle, Globe, FileText } from "lucide-react";
import { getLicenses } from "@/lib/api";

type License = {
  id: number;
  name: string;
  country: string;
  established_year: number;
  website_url: string;
  rating: string;
  trust_score: number;
  description: string;
  application_process: string | null;
  annual_fees: string | null;
  license_requirements: Array<{
    id: number;
    requirement: string;
  }>;
  license_player_protections: Array<{
    id: number;
    protection: string;
  }>;
  license_pros_cons: Array<{
    id: number;
    content: string;
    is_pro: boolean;
  }>;
};

type LicenseListProps = {
  limit?: number;
  ratingFilter?: string;
};

export default function LicenseList({ limit, ratingFilter }: LicenseListProps) {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLicenses() {
      try {
        setLoading(true);
        let data = await getLicenses();
        
        if (ratingFilter && ratingFilter !== "all") {
          data = data.filter(license => license.rating.toLowerCase() === ratingFilter.toLowerCase());
        }
        
        if (limit) {
          data = data.slice(0, limit);
        }
        
        setLicenses(data);
      } catch (err) {
        console.error("Error loading licenses:", err);
        setError("Failed to load licenses. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    loadLicenses();
  }, [limit, ratingFilter]);

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

  if (loading) {
    return <div className="text-center py-8">Loading licenses...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (licenses.length === 0) {
    return <div className="text-center py-8">No licenses found for this selection.</div>;
  }

  return (
    <div className="space-y-6">
      {licenses.map((license) => (
        <Card key={license.id} className="modern-card animate-fade-in">
          <CardHeader className="modern-card-header">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <CardTitle className="text-xl flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  {license.name}
                </CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Globe className="mr-1 h-4 w-4" />
                  {license.country} • Established {license.established_year}
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getRatingBadgeClass(license.rating)}>
                  {license.rating}
                </Badge>
                <div className="text-sm font-medium">
                  Trust Score: <span className="text-primary">{license.trust_score}/10</span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="modern-card-content">
            <p className="mb-4">{license.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center text-primary">
                  <FileText className="mr-2 h-5 w-5" />
                  Licensing Requirements
                </h3>
                <ul className="space-y-2">
                  {license.license_requirements.map((req) => (
                    <li key={req.id} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>{req.requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center text-primary">
                  <Shield className="mr-2 h-5 w-5" />
                  Player Protections
                </h3>
                <ul className="space-y-2">
                  {license.license_player_protections.map((protection) => (
                    <li key={protection.id} className="flex items-start">
                      {license.rating === "Poor" ? (
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                      ) : (
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      )}
                      <span>{protection.protection}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-semibold mb-2 text-green-600">Pros</h3>
                <ul className="space-y-1">
                  {license.license_pros_cons
                    .filter(item => item.is_pro)
                    .map((pro) => (
                      <li key={pro.id} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>{pro.content}</span>
                      </li>
                    ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2 text-red-600">Cons</h3>
                <ul className="space-y-1">
                  {license.license_pros_cons
                    .filter(item => !item.is_pro)
                    .map((con) => (
                      <li key={con.id} className="flex items-start text-sm">
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                        <span>{con.content}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="modern-card-footer">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href={license.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Official Website
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}