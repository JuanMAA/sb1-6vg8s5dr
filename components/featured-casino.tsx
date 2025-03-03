"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Check, ExternalLink, Shield } from "lucide-react";
import { getFeaturedCasino } from "@/lib/api";

type FeaturedCasinoProps = {
  countryCode?: string;
  casino: any;
  t: any;
};

export default function FeaturedCasino({ countryCode, casino, t }: FeaturedCasinoProps) {
  const [currentMonth] = useState("Mayo 2025");

  if (!casino) {
    return (
      <Card className="border shadow-md overflow-hidden h-full">
        <CardContent className="p-6 flex items-center justify-center">
          <p className="text-red-500">{casino || "No featured casino available."}</p>
        </CardContent>
      </Card>
    );
  }

  const features = [
    { condition: casino.has_mobile_app, label: t.features.mobileApp },
    { condition: casino.has_live_streaming, label: t.features.liveStreaming },
    { condition: casino.has_cash_out, label: t.features.cashOut },
    { condition: casino.has_live_betting, label: t.features.liveBetting }
  ];

  return (
    <Card className="border shadow-md overflow-hidden h-full">
      <CardHeader className="pb-2 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2 bg-blue-100 text-primary text-xs">{t.by} {process.env.NEXT_PUBLIC_SITE_NAME}</Badge>
            <CardTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{casino.name}</CardTitle>
            <CardDescription className="line-clamp-2 pb-8">{casino.description}</CardDescription>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(casino.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              />
            ))}
            <span className="ml-1 text-sm">{casino.rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="relative w-full h-20 mb-4">
          <Image
            src={casino.logo_url}
            alt={casino.name}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-3 rounded-md mb-4" hidden>
          <p className="text-center font-semibold">Bono de Bienvenida Disponible</p>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-sm mb-2">Características:</h4>
          <div className="grid grid-cols-2 gap-2">
            {features.map((feature, index) => feature.condition && (
              <div key={index} className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button asChild className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
          <Link href={casino.website_url} target="_blank" rel="noopener noreferrer">
            {t.visitSite} <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
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
