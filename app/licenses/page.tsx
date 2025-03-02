import LicenseList from '@/components/license-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LicensesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Casino Licensing Authorities</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive information about gambling regulatory bodies, their requirements, player protections, and reputation.
        </p>
      </div>
      
      <Tabs defaultValue="all" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Ratings</TabsTrigger>
          <TabsTrigger value="excellent">Excellent</TabsTrigger>
          <TabsTrigger value="good">Good</TabsTrigger>
          <TabsTrigger value="average">Average</TabsTrigger>
          <TabsTrigger value="poor">Poor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <LicenseList />
        </TabsContent>
        
        <TabsContent value="excellent" className="mt-6">
          <LicenseList ratingFilter="excellent" />
        </TabsContent>
        
        <TabsContent value="good" className="mt-6">
          <LicenseList ratingFilter="good" />
        </TabsContent>
        
        <TabsContent value="average" className="mt-6">
          <LicenseList ratingFilter="average" />
        </TabsContent>
        
        <TabsContent value="poor" className="mt-6">
          <LicenseList ratingFilter="poor" />
        </TabsContent>
      </Tabs>
    </div>
  );
}