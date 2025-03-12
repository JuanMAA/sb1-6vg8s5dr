import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Star,
    ExternalLink,
    Check,
    X,
    Shield,
    Calendar,
    Globe,
    CreditCard,
    Clock,
    Zap,
    DollarSign,
    Award,
    MessageCircle,
    Languages,
    Lock
} from "lucide-react";
import { getCasinoDetails, getCasinos } from "@/lib/api";
import { useLanguage } from "@/components/language-context";

async function getCasinoData(slug: string): Promise<any> {
    try {
        const casinoData = await getCasinoDetails(slug);
        if (!casinoData) {
            console.error('Error fetching getCasinoData:', casinoData);
        }
        return { casinoData };
    } catch (err) {
        return { casinoData: null };
    }
}

export default async function CasinoDetailPage({
    params
}: {
    params: { slug: string };
}) {
    const { casinoData } = await getCasinoData(params.slug);
    const { t } = useLanguage();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-1">
                    <Card className="border shadow-md overflow-hidden sticky top-20">
                        <CardHeader className="pb-2 bg-gradient-to-r from-primary/5 to-accent/5">
                            <div className="relative w-full h-32 mb-4">
                                <Image
                                    src={casinoData.logo_url}
                                    alt={casinoData.name}
                                    fill
                                    style={{ objectFit: "contain" }}
                                />
                            </div>

                            <div className="flex items-center justify-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.floor(casinoData.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                    />
                                ))}
                                <span className="ml-2 font-medium">{casinoData.rating}/5</span>
                            </div>

                            <div className="text-center">
                                <p className="text-sm font-medium">Establecido en {casinoData.established_year}</p>
                                {casinoData.monthly_visits && <p className="text-sm text-muted-foreground">{casinoData.monthly_visits.toLocaleString()} visitas mensuales</p>}
                                {casinoData.user_reviews_count && <p className="text-sm text-muted-foreground">{casinoData.user_reviews_count.toLocaleString()} reseñas de usuarios</p>}
                                {casinoData.positive_rating_percentage && <p className="text-sm text-green-600">{casinoData.positive_rating_percentage}% valoración positiva</p>}
                            </div>
                        </CardHeader>

                        <CardContent className="p-4">
                            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-3 rounded-lg mb-4">
                                <p className="text-center font-semibold">{t.featuredCasino.welcomeBonus}</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-sm mb-2">Características Principales:</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {casinoData.has_mobile_app && (
                                            <div className="flex items-center">
                                                <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-2">
                                                    <Check className="h-3 w-3 text-white" />
                                                </div>
                                                <span className="text-sm">{t.featuredCasino.features.mobileApp}</span>
                                            </div>
                                        )}
                                        {casinoData.has_live_streaming && (
                                            <div className="flex items-center">
                                                <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-2">
                                                    <Check className="h-3 w-3 text-white" />
                                                </div>
                                                <span className="text-sm">{t.featuredCasino.features.liveStreaming}</span>
                                            </div>
                                        )}
                                        {casinoData.has_cash_out && (
                                            <div className="flex items-center">
                                                <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-2">
                                                    <Check className="h-3 w-3 text-white" />
                                                </div>
                                                <span className="text-sm">{t.featuredCasino.features.cashOut}</span>
                                            </div>
                                        )}
                                        {casinoData.has_live_betting && (
                                            <div className="flex items-center">
                                                <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-2">
                                                    <Check className="h-3 w-3 text-white" />
                                                </div>
                                                <span className="text-sm">{t.featuredCasino.features.liveBetting}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-sm mb-2"> {t.global.paymentInformation}</h4>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-sm text-muted-foreground">{t.global.minimunDeposit}</p>
                                            <p className="font-medium">{casinoData.min_deposit ? `${casinoData.min_deposit}€` : "No especificado"}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">{t.global.withdrawalTime}</p>
                                            <p className="font-medium">{casinoData.withdrawal_time || "No especificado"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="p-4 pt-0">
                            <Button asChild className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                                <Link href={casinoData.website_url} target="_blank" rel="noopener noreferrer">
                                    {t.topRanked.visitSite} <ExternalLink className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2">{casinoData.name}</h1>
                        <p className="text-muted-foreground">{casinoData.description}</p>
                    </div>

                    <Tabs defaultValue="overview" className="w-full mb-8">
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="overview">Resumen</TabsTrigger>
                            <TabsTrigger value="bonuses">Bonos</TabsTrigger>
                            <TabsTrigger value="payment-methods">Métodos de Pago</TabsTrigger>
                            <TabsTrigger value="security">Seguridad</TabsTrigger>
                            <TabsTrigger value="support">Soporte</TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Award className="mr-2 h-5 w-5 text-primary" />
                                        Pros y Contras
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold mb-2 text-green-600">Pros</h3>
                                            <ul className="space-y-2">
                                                {casinoData.pros_cons
                                                    ?.filter((item: any) => item.is_pro)
                                                    .map((pro: any) => (
                                                        <li key={pro.id} className="flex items-start">
                                                            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                                            <span>{pro.content}</span>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold mb-2 text-red-600">Contras</h3>
                                            <ul className="space-y-2">
                                                {casinoData.pros_cons
                                                    ?.filter((item: any) => !item.is_pro)
                                                    .map((con: any) => (
                                                        <li key={con.id} className="flex items-start">
                                                            <X className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                                                            <span>{con.content}</span>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Shield className="mr-2 h-5 w-5 text-primary" />
                                        Licencias
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {casinoData.casino_licenses?.map((license: any) => (
                                            <div key={license.id} className="flex items-start">
                                                <Shield className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                                <div>
                                                    <p className="font-medium">{license.licenses.name}</p>
                                                    {license.license_number && (
                                                        <p className="text-sm text-muted-foreground">
                                                            Número de licencia: {license.license_number}
                                                        </p>
                                                    )}
                                                    {license.issue_date && (
                                                        <p className="text-sm text-muted-foreground">
                                                            Fecha de emisión: {new Date(license.issue_date).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Zap className="mr-2 h-5 w-5 text-primary" />
                                        Características
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {casinoData.casino_features?.map((feature: any) => (
                                            <div key={feature.id} className="flex items-center">
                                                <Check className="h-5 w-5 text-green-500 mr-2" />
                                                <span>{feature.features.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Globe className="mr-2 h-5 w-5 text-primary" />
                                        Información General
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold mb-2">Detalles del Casino</h3>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <Calendar className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium">Año de establecimiento</p>
                                                        <p className="text-sm text-muted-foreground">{casinoData.established_year}</p>
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <Globe className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium">Sitio web</p>
                                                        <a
                                                            href={casinoData.website_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-primary hover:underline"
                                                        >
                                                            {casinoData.website_url}
                                                        </a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold mb-2">Idiomas Soportados</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {casinoData.supported_languages?.map((lang: any) => (
                                                    <Badge key={lang.id} variant="outline">
                                                        {lang.language}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Bonuses Tab */}
                        <TabsContent value="bonuses" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Zap className="mr-2 h-5 w-5 text-primary" />
                                        Bonos Disponibles
                                    </CardTitle>
                                    <CardDescription>
                                        Descubre los bonos y promociones disponibles en {casinoData.name}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* This would be populated from the bonuses table */}
                                        <div className="p-4 border rounded-lg bg-gradient-to-r from-primary/5 to-accent/5">
                                            <h3 className="font-semibold mb-2">Bono de Bienvenida</h3>
                                            <p className="mb-2">Consulta el sitio web oficial para conocer el bono de bienvenida actual.</p>
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={casinoData.website_url} target="_blank" rel="noopener noreferrer">
                                                    Ver Bono <ExternalLink className="ml-2 h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Payment Methods Tab */}
                        <TabsContent value="payment-methods" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <CreditCard className="mr-2 h-5 w-5 text-primary" />
                                        Métodos de Pago
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold mb-2">Información de Depósitos</h3>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <DollarSign className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium">Depósito mínimo</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {casinoData.min_deposit ? `${casinoData.min_deposit}€` : "No especificado"}
                                                        </p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold mb-2">Información de Retiros</h3>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <Clock className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium">Tiempo de retiro</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {casinoData.withdrawal_time || "No especificado"}
                                                        </p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <Separator className="my-6" />

                                    <div>
                                        <h3 className="font-semibold mb-4">Métodos de Pago Aceptados</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {casinoData.casino_payment_methods?.map((method: any) => (
                                                <div key={method.id} className="flex items-center">
                                                    <CreditCard className="h-5 w-5 text-primary mr-2" />
                                                    <span>{method.payment_methods.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Security Tab */}
                        <TabsContent value="security" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Lock className="mr-2 h-5 w-5 text-primary" />
                                        Seguridad y Protección
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-semibold mb-2">Características de Seguridad</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {casinoData.casino_security_features?.map((feature: any) => (
                                                    <div key={feature.id} className="flex items-start">
                                                        <Shield className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                                        <div>
                                                            <p className="font-medium">{feature.security_features.name}</p>
                                                            {feature.security_features.description && (
                                                                <p className="text-sm text-muted-foreground">
                                                                    {feature.security_features.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <Separator />

                                        <div>
                                            <h3 className="font-semibold mb-2">Licencias y Regulación</h3>
                                            <div className="space-y-4">
                                                {casinoData.casino_licenses?.map((license: any) => (
                                                    <div key={license.id} className="flex items-start">
                                                        <Shield className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                                        <div>
                                                            <p className="font-medium">{license.licenses.name}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {license.licenses.country}
                                                            </p>
                                                            {license.license_number && (
                                                                <p className="text-sm text-muted-foreground">
                                                                    Número de licencia: {license.license_number}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Support Tab */}
                        <TabsContent value="support" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                                        Atención al Cliente
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-semibold mb-2">Canales de Soporte</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {casinoData.support_channels?.map((channel: any) => (
                                                    <div key={channel.id} className="flex items-center">
                                                        <MessageCircle className="h-5 w-5 text-primary mr-2" />
                                                        <span>{channel.channel}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <Separator />

                                        <div>
                                            <h3 className="font-semibold mb-2">Idiomas Soportados</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {casinoData.supported_languages?.map((lang: any) => (
                                                    <Badge key={lang.id} variant="outline" className="flex items-center">
                                                        <Languages className="h-3 w-3 mr-1" />
                                                        {lang.language}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Award className="mr-2 h-5 w-5 text-primary" />
                                Proveedores de Juegos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {casinoData.casino_game_providers?.map((provider: any) => (
                                    <Badge key={provider.id} variant="outline" className="py-2">
                                        {provider.game_providers.name}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const countries = await getCasinos();

    return countries.map(country => ({
        slug: country.slug
    }));
}