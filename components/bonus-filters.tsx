"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X, ChevronDown, Star } from "lucide-react";

type BonusFiltersProps = {
  type: string;
  casinosData: any;
};

export default function BonusFilters({ type, casinosData }: BonusFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Filter states
  const [minWagering, setMinWagering] = useState(0);
  const [maxWagering, setMaxWagering] = useState(50);
  const [minDeposit, setMinDeposit] = useState(0);
  const [maxDeposit, setMaxDeposit] = useState(100);
  const [exclusive, setExclusive] = useState(false);
  const [selectedCasinos, setSelectedCasinos] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Load filters from URL on component mount
  useEffect(() => {
    const wageringMin = searchParams.get('wageringMin');
    const wageringMax = searchParams.get('wageringMax');
    const depositMin = searchParams.get('depositMin');
    const depositMax = searchParams.get('depositMax');
    const isExclusive = searchParams.get('exclusive');
    const casinoIds = searchParams.get('casinos');

    if (wageringMin) setMinWagering(parseInt(wageringMin));
    if (wageringMax) setMaxWagering(parseInt(wageringMax));
    if (depositMin) setMinDeposit(parseInt(depositMin));
    if (depositMax) setMaxDeposit(parseInt(depositMax));
    if (isExclusive === 'true') setExclusive(true);
    if (casinoIds) setSelectedCasinos(casinoIds.split(','));

    updateActiveFilters();
  }, [searchParams]);

  // Update active filters based on current state
  const updateActiveFilters = () => {
    const filters = [];

    if (minWagering > 0) filters.push(`Requisito mínimo: ${minWagering}x`);
    if (maxWagering < 50) filters.push(`Requisito máximo: ${maxWagering}x`);
    if (minDeposit > 0) filters.push(`Depósito mínimo: ${minDeposit}€`);
    if (maxDeposit < 100) filters.push(`Depósito máximo: ${maxDeposit}€`);
    if (exclusive) filters.push('Bonos Exclusivos');
    if (selectedCasinos.length > 0) {
      filters.push(`Casinos: ${selectedCasinos.length} seleccionados`);
    }

    setActiveFilters(filters);
  };

  // Apply filters
  const applyFilters = () => {
    updateActiveFilters();

    // Create new URLSearchParams object
    const params = new URLSearchParams(searchParams);

    // Always maintain the type parameter
    params.set('type', type);

    // Set or remove filter parameters
    if (minWagering > 0) {
      params.set('wageringMin', minWagering.toString());
    } else {
      params.delete('wageringMin');
    }

    if (maxWagering < 50) {
      params.set('wageringMax', maxWagering.toString());
    } else {
      params.delete('wageringMax');
    }

    if (minDeposit > 0) {
      params.set('depositMin', minDeposit.toString());
    } else {
      params.delete('depositMin');
    }

    if (maxDeposit < 100) {
      params.set('depositMax', maxDeposit.toString());
    } else {
      params.delete('depositMax');
    }

    if (exclusive) {
      params.set('exclusive', 'true');
    } else {
      params.delete('exclusive');
    }

    if (selectedCasinos.length > 0) {
      params.set('casinos', selectedCasinos.join(','));
    } else {
      params.delete('casinos');
    }

    // Update URL with filters
    router.push(`${pathname}?${params.toString()}`);

    // Close filter on mobile
    setIsFilterOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setMinWagering(0);
    setMaxWagering(50);
    setMinDeposit(0);
    setMaxDeposit(100);
    setExclusive(false);
    setSelectedCasinos([]);

    // Create new URLSearchParams with only the type parameter
    const params = new URLSearchParams();
    params.set('type', type);

    // Update URL with only the type parameter
    router.push(`${pathname}?${params.toString()}`);

    // Update active filters
    setActiveFilters([]);
  };

  // Remove a specific filter
  const removeFilter = (filter: string) => {
    if (filter.startsWith('Requisito mínimo')) {
      setMinWagering(0);
    } else if (filter.startsWith('Requisito máximo')) {
      setMaxWagering(50);
    } else if (filter.startsWith('Depósito mínimo')) {
      setMinDeposit(0);
    } else if (filter.startsWith('Depósito máximo')) {
      setMaxDeposit(100);
    } else if (filter === 'Bonos Exclusivos') {
      setExclusive(false);
    } else if (filter.startsWith('Casinos:')) {
      setSelectedCasinos([]);
    }

    // Re-apply remaining filters
    setTimeout(() => applyFilters(), 0);
  };

  // Toggle casino selection
  const toggleCasino = (id: string) => {
    setSelectedCasinos(prev =>
      prev.includes(id)
        ? prev.filter(casinoId => casinoId !== id)
        : [...prev, id]
    );
  };

  // Get bonus-type specific filters
  const getBonusTypeFilters = () => {
    switch (type) {
      case 'welcome':
        return (
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="flex items-center gap-1 py-1.5 px-3 cursor-pointer hover:bg-secondary">
              <Checkbox id="first-deposit" checked={true} className="mr-1" />
              <label htmlFor="first-deposit" className="text-sm cursor-pointer">Primer Depósito</label>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1.5 px-3 cursor-pointer hover:bg-secondary">
              <Checkbox id="sports" checked={true} className="mr-1" />
              <label htmlFor="sports" className="text-sm cursor-pointer">Deportes</label>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1.5 px-3 cursor-pointer hover:bg-secondary">
              <Checkbox id="casino" checked={true} className="mr-1" />
              <label htmlFor="casino" className="text-sm cursor-pointer">Casino</label>
            </Badge>
          </div>
        );
      case 'no-deposit':
        return (
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="flex items-center gap-1 py-1.5 px-3 cursor-pointer hover:bg-secondary">
              <Checkbox id="free-spins" checked={true} className="mr-1" />
              <label htmlFor="free-spins" className="text-sm cursor-pointer">Giros Gratis</label>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1.5 px-3 cursor-pointer hover:bg-secondary">
              <Checkbox id="free-credits" checked={true} className="mr-1" />
              <label htmlFor="free-credits" className="text-sm cursor-pointer">Créditos Gratis</label>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1.5 px-3 cursor-pointer hover:bg-secondary">
              <Checkbox id="no-verification" checked={false} className="mr-1" />
              <label htmlFor="no-verification" className="text-sm cursor-pointer">Sin Verificación</label>
            </Badge>
          </div>
        );
      case 'free-bets':
        return (
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="flex items-center gap-1 py-1.5 px-3 cursor-pointer hover:bg-secondary">
              <Checkbox id="risk-free" checked={true} className="mr-1" />
              <label htmlFor="risk-free" className="text-sm cursor-pointer">Sin Riesgo</label>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1.5 px-3 cursor-pointer hover:bg-secondary">
              <Checkbox id="matched-bets" checked={true} className="mr-1" />
              <label htmlFor="matched-bets" className="text-sm cursor-pointer">Apuestas Igualadas</label>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1.5 px-3 cursor-pointer hover:bg-secondary">
              <Checkbox id="specific-events" checked={false} className="mr-1" />
              <label htmlFor="specific-events" className="text-sm cursor-pointer">Eventos Específicos</label>
            </Badge>
          </div>
        );
      case 'cashback':
        return (
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="flex items-center gap-1 py-1.5 px-3 cursor-pointer hover:bg-secondary">
              <Checkbox id="weekly" checked={true} className="mr-1" />
              <label htmlFor="weekly" className="text-sm cursor-pointer">Semanal</label>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1.5 px-3 cursor-pointer hover:bg-secondary">
              <Checkbox id="monthly" checked={true} className="mr-1" />
              <label htmlFor="monthly" className="text-sm cursor-pointer">Mensual</label>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1.5 px-3 cursor-pointer hover:bg-secondary">
              <Checkbox id="net-losses" checked={true} className="mr-1" />
              <label htmlFor="net-losses" className="text-sm cursor-pointer">Pérdidas Netas</label>
            </Badge>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-6">
      {/* Filter Toggle Button */}
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="h-4 w-4" />
          Filtros
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
              Limpiar
            </Button>
          </div>
        )}
      </div>

      {/* Compact Filter Panel */}
      {isFilterOpen && (
        <Card className="border shadow-sm mb-4 animate-fade-in">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div>
                {/* Wagering Requirements */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Requisito de Apuesta</h3>
                    <div className="text-xs text-muted-foreground">
                      {minWagering}x - {maxWagering}x
                    </div>
                  </div>
                  <Slider
                    value={[minWagering, maxWagering]}
                    min={0}
                    max={50}
                    step={1}
                    onValueChange={(value) => {
                      setMinWagering(value[0]);
                      setMaxWagering(value[1]);
                    }}
                  />
                </div>

                {/* Minimum Deposit */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Depósito Mínimo</h3>
                    <div className="text-xs text-muted-foreground">
                      €{minDeposit} - €{maxDeposit}
                    </div>
                  </div>
                  <Slider
                    value={[minDeposit, maxDeposit]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => {
                      setMinDeposit(value[0]);
                      setMaxDeposit(value[1]);
                    }}
                  />
                </div>

                {/* Exclusive Offers */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="exclusive-only"
                      checked={exclusive}
                      onCheckedChange={(checked) => setExclusive(checked === true)}
                    />
                    <label htmlFor="exclusive-only" className="text-sm font-medium">
                      Solo Bonos Exclusivos
                    </label>
                  </div>
                </div>

                {/* Bonus Type Specific Filters */}
                {type !== 'all' && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Filtros Específicos</h3>
                    {getBonusTypeFilters()}
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div>
                {/* Casinos */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Casinos</h3>
                  <div className="grid grid-cols-2 gap-2 max-h-[180px] overflow-y-auto pr-2">
                    {casinosData?.map((casino: any) => (
                      <div key={casino.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`casino-${casino.id}`}
                          checked={selectedCasinos.includes(casino.id.toString())}
                          onCheckedChange={() => toggleCasino(casino.id.toString())}
                        />
                        <label htmlFor={`casino-${casino.id}`} className="text-sm font-medium flex items-center">
                          {casino.name}
                          <span className="ml-1 flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-2 w-2 ${i < Math.floor(casino.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                              />
                            ))}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Restablecer
              </Button>
              <Button size="sm" onClick={applyFilters} className="bg-primary hover:bg-primary/90">
                Aplicar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}