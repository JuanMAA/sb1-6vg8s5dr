"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ExternalLink, Shield, Check, AlertTriangle, Globe, FileText, Filter, X, ChevronDown } from "lucide-react";
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
  const [filteredLicenses, setFilteredLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [minTrustScore, setMinTrustScore] = useState(0);
  const [hasPlayerProtection, setHasPlayerProtection] = useState(false);
  const [hasAnnualFees, setHasAnnualFees] = useState(false);
  const [hasApplicationProcess, setHasApplicationProcess] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
        setFilteredLicenses(data);
      } catch (err) {
        console.error("Error loading licenses:", err);
        setError("Failed to load licenses. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    loadLicenses();
  }, [limit, ratingFilter]);

  // Apply filters
  const applyFilters = () => {
    let filtered = [...licenses];
    const filters = [];
    
    // Apply trust score filter
    if (minTrustScore > 0) {
      filtered = filtered.filter(license => license.trust_score >= minTrustScore);
      filters.push(`Trust Score: ${minTrustScore}+`);
    }
    
    // Apply player protection filter
    if (hasPlayerProtection) {
      filtered = filtered.filter(license => license.license_player_protections.length > 0);
      filters.push('Player Protection');
    }
    
    // Apply annual fees filter
    if (hasAnnualFees) {
      filtered = filtered.filter(license => license.annual_fees !== null);
      filters.push('Annual Fees Info');
    }
    
    // Apply application process filter
    if (hasApplicationProcess) {
      filtered = filtered.filter(license => license.application_process !== null);
      filters.push('Application Process');
    }
    
    setFilteredLicenses(filtered);
    setActiveFilters(filters);
    setIsFilterOpen(false);
  };
  
  // Reset filters
  const resetFilters = () => {
    setMinTrustScore(0);
    setHasPlayerProtection(false);
    setHasAnnualFees(false);
    setHasApplicationProcess(false);
    setFilteredLicenses(licenses);
    setActiveFilters([]);
  };
  
  // Remove a specific filter
  const removeFilter = (filter: string) => {
    if (filter.startsWith('Trust Score')) {
      setMinTrustScore(0);
    } else if (filter === 'Player Protection') {
      setHasPlayerProtection(false);
    } else if (filter === 'Annual Fees Info') {
      setHasAnnualFees(false);
    } else if (filter === 'Application Process') {
      setHasApplicationProcess(false);
    }
    
    setTimeout(() => applyFilters(), 0);
  };

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

  if (filteredLicenses.length === 0) {
    return <div className="text-center py-8">No licenses found for this selection.</div>;
  }

  return (
    <div>
      {/* Filter Toggle Button */}
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilters.length > 0 && (
            <Badge variant="secondary" className="ml-1">{activeFilters.length}</Badge>
          )}
          <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
        </Button>
        
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            {activeFilters.map((filter, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="flex items-center gap-1 py-1"
              >
                {filter}
                <button 
                  onClick={() => removeFilter(filter)}
                  className="ml-1 rounded-full hover:bg-muted p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="text-muted-foreground text-xs"
            >
              Clear
            </Button>
          </div>
        )}
      </div>
      
      {/* Filter Panel */}
      {isFilterOpen && (
        <Card className="border shadow-sm mb-4 animate-fade-in">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div>
                {/* Trust Score Slider */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Minimum Trust Score</h3>
                    <div className="text-xs text-muted-foreground">
                      {minTrustScore}/10
                    </div>
                  </div>
                  <Slider
                    value={[minTrustScore]}
                    min={0}
                    max={10}
                    step={1}
                    onValueChange={(value) => setMinTrustScore(value[0])}
                  />
                </div>
              </div>
              
              {/* Right Column */}
              <div>
                {/* Additional Filters */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="has-protection" 
                      checked={hasPlayerProtection}
                      onCheckedChange={(checked) => setHasPlayerProtection(checked === true)}
                    />
                    <label htmlFor="has-protection" className="text-sm">
                      Has Player Protection Measures
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="has-fees" 
                      checked={hasAnnualFees}
                      onCheckedChange={(checked) => setHasAnnualFees(checked === true)}
                    />
                    <label htmlFor="has-fees" className="text-sm">
                      Annual Fees Information Available
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="has-process" 
                      checked={hasApplicationProcess}
                      onCheckedChange={(checked) => setHasApplicationProcess(checked === true)}
                    />
                    <label htmlFor="has-process" className="text-sm">
                      Application Process Details Available
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Reset
              </Button>
              <Button size="sm" onClick={applyFilters} className="bg-primary hover:bg-primary/90">
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* License List */}
      <div className="space-y-6">
        {filteredLicenses.map((license) => (
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
    </div>
  );
}