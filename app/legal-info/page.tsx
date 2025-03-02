import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CountrySelector from "@/components/country-selector";

export default function LegalInfoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Online Casino Legal Information</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive legal information about online gambling regulations, licensing requirements, and player protections across different countries.
        </p>
      </div>
      
      <Tabs defaultValue="by-country" className="w-full mb-12">
        <TabsList className="grid w-full grid-cols-3 bg-background/50 backdrop-blur-sm p-1">
          <TabsTrigger 
            value="by-country"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-accent/80 data-[state=active]:text-white"
          >
            By Country
          </TabsTrigger>
          <TabsTrigger 
            value="licensing"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-accent/80 data-[state=active]:text-white"
          >
            Licensing Authorities
          </TabsTrigger>
          <TabsTrigger 
            value="responsible"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-accent/80 data-[state=active]:text-white"
          >
            Responsible Gambling
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="by-country" className="mt-6">
          <CountrySelector />
        </TabsContent>
        
        <TabsContent value="licensing" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border animated-gradient-border card-hover">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">United Kingdom Gambling Commission (UKGC)</CardTitle>
                <CardDescription>One of the most respected regulatory bodies worldwide</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  The UKGC regulates commercial gambling in Great Britain, ensuring operators meet strict standards for fairness, transparency, and player protection.
                </p>
                <h4 className="font-semibold mb-2">Key Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Segregation of player funds</li>
                  <li>Strict age verification</li>
                  <li>Responsible gambling tools</li>
                  <li>Fair game testing</li>
                  <li>Anti-money laundering procedures</li>
                </ul>
                <Button asChild variant="outline" size="sm" className="border-2 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10">
                  <Link href="https://www.gamblingcommission.gov.uk/" target="_blank" rel="noopener noreferrer">
                    Official Website
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border animated-gradient-border card-hover">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Malta Gaming Authority (MGA)</CardTitle>
                <CardDescription>Major European regulatory body for online gambling</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  The MGA is one of the first jurisdictions to regulate online gambling and is known for its comprehensive regulatory framework.
                </p>
                <h4 className="font-semibold mb-2">Key Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Player fund protection</li>
                  <li>Game fairness certification</li>
                  <li>Anti-fraud measures</li>
                  <li>Responsible gambling policies</li>
                  <li>Regular compliance audits</li>
                </ul>
                <Button asChild variant="outline" size="sm" className="border-2 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10">
                  <Link href="https://www.mga.org.mt/" target="_blank" rel="noopener noreferrer">
                    Official Website
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border animated-gradient-border card-hover">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Gibraltar Regulatory Authority</CardTitle>
                <CardDescription>Respected jurisdiction for online gambling operators</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Gibraltar has established itself as a hub for online gambling companies with a robust regulatory framework.
                </p>
                <h4 className="font-semibold mb-2">Key Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Financial stability requirements</li>
                  <li>Technical standards compliance</li>
                  <li>Anti-money laundering procedures</li>
                  <li>Player protection measures</li>
                  <li>Regular auditing</li>
                </ul>
                <Button asChild variant="outline" size="sm" className="border-2 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10">
                  <Link href="https://www.gra.gi/" target="_blank" rel="noopener noreferrer">
                    Official Website
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border animated-gradient-border card-hover">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Alderney Gambling Control Commission</CardTitle>
                <CardDescription>Respected regulatory body with high standards</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  The Alderney commission is known for its stringent requirements and thorough vetting process for operators.
                </p>
                <h4 className="font-semibold mb-2">Key Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Strict due diligence on operators</li>
                  <li>Regular technical audits</li>
                  <li>Player fund protection</li>
                  <li>Game fairness certification</li>
                  <li>Responsible gambling measures</li>
                </ul>
                <Button asChild variant="outline" size="sm" className="border-2 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10">
                  <Link href="https://www.gamblingcontrol.org/" target="_blank" rel="noopener noreferrer">
                    Official Website
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border animated-gradient-border card-hover">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Kahnawake Gaming Commission</CardTitle>
                <CardDescription>One of the oldest online gambling regulators</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Established in 1996, the Kahnawake Gaming Commission has been regulating online gambling from the Mohawk Territory of Kahnawake in Canada.
                </p>
                <h4 className="font-semibold mb-2">Key Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Regular software testing</li>
                  <li>Player dispute resolution</li>
                  <li>Anti-money laundering procedures</li>
                  <li>Responsible gambling policies</li>
                  <li>Financial audits</li>
                </ul>
                <Button asChild variant="outline" size="sm" className="border-2 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10">
                  <Link href="https://www.gamingcommission.ca/" target="_blank" rel="noopener noreferrer">
                    Official Website
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border animated-gradient-border card-hover">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Curaçao eGaming</CardTitle>
                <CardDescription>Popular licensing jurisdiction for many operators</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Curaçao offers a more accessible licensing process, making it popular among smaller operators. However, regulatory oversight is generally considered less stringent than other jurisdictions.
                </p>
                <h4 className="font-semibold mb-2">Key Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Basic compliance checks</li>
                  <li>Technical standards</li>
                  <li>Anti-fraud measures</li>
                  <li>Regular reporting</li>
                </ul>
                <Badge className="mb-4 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                  Lower Regulatory Standards
                </Badge>
                <Button asChild variant="outline" size="sm" className="border-2 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10">
                  <Link href="https://www.curacao-egaming.com/" target="_blank" rel="noopener noreferrer">
                    Official Website
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="responsible" className="mt-6">
          <Card className="mb-8 border animated-gradient-border">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Responsible Gambling Guidelines</CardTitle>
              <CardDescription>Important information for safe and responsible gambling practices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  Responsible gambling means enjoying gambling as entertainment while being aware of the risks and making informed choices. Here are some important guidelines to follow:
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Set Limits</h3>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Decide how much money you can afford to lose before you start playing</li>
                  <li>Set time limits for your gambling sessions</li>
                  <li>Use deposit limits offered by online casinos</li>
                  <li>Never chase losses by betting more than you can afford</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Know the Games</h3>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Understand the rules and odds of the games you play</li>
                  <li>Remember that gambling outcomes are random</li>
                  <li>Accept that the house always has an edge</li>
                  <li>View gambling as entertainment, not as a way to make money</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Be Aware of Warning Signs</h3>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Gambling to escape problems or relieve feelings of helplessness, guilt, or depression</li>
                  <li>Lying to family members or others about how much you gamble</li>
                  <li>Borrowing money to gamble or pay gambling debts</li>
                  <li>Neglecting work, education, or family commitments due to gambling</li>
                  <li>Feeling irritable or restless when trying to cut down on gambling</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Use Available Tools</h3>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Self-exclusion programs allow you to block yourself from gambling sites</li>
                  <li>Reality checks remind you how long you've been playing</li>
                  <li>Take regular breaks from gambling</li>
                  <li>Use gambling blocking software on your devices</li>
                </ul>
                
                <h3 className="text-xl font-semibold mt-6 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Seek Help When Needed</h3>
                <p>If you're concerned about your gambling habits or those of someone close to you, help is available:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <Card className="border">
                    <CardHeader>
                      <CardTitle className="text-lg">International Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li><strong>Gamblers Anonymous:</strong> <a href="https://www.gamblersanonymous.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">www.gamblersanonymous.org</a></li>
                        <li><strong>GamCare:</strong> <a href="https://www.gamcare.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">www.gamcare.org.uk</a></li>
                        <li><strong>BeGambleAware:</strong> <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">www.begambleaware.org</a></li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardHeader>
                      <CardTitle className="text-lg">Self-Exclusion Programs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li><strong>GAMSTOP (UK):</strong> <a href="https://www.gamstop.co.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">www.gamstop.co.uk</a></li>
                        <li><strong>Spelpaus (Sweden):</strong> <a href="https://www.spelpaus.se" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">www.spelpaus.se</a></li>
                        <li><strong>ROFUS (Denmark):</strong> <a href="https://www.rofus.nu" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent">www.rofus.nu</a></li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Remember</h3>
            <p className="text-lg mb-6">Gambling should be fun and entertaining. If it stops being enjoyable, it's time to take a break.</p>
            <Button asChild className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Link href="/responsible-gambling">
                Learn More About Responsible Gambling
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}