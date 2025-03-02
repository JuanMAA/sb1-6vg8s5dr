import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Target, Mail, Phone, BarChart2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-primary">TuApuesta</span>
            </div>
            <p className="text-muted-foreground">
              Tu fuente confiable de información sobre apuestas deportivas y casinos online en todo el mundo.
            </p>
            <div className="flex items-center mt-4 text-muted-foreground">
              <Mail className="h-4 w-4 mr-2" />
              <span>contacto@tuapuesta.com</span>
            </div>
            <div className="flex items-center mt-2 text-muted-foreground">
              <Phone className="h-4 w-4 mr-2" />
              <span>+34 900 123 456</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="text-muted-foreground hover:text-primary transition-colors">
                  Clasificaciones
                </Link>
              </li>
              <li>
                <Link href="/bonuses" className="text-muted-foreground hover:text-primary transition-colors">
                  Mejores Bonos
                </Link>
              </li>
              <li>
                <Link href="/casino-of-the-month" className="text-muted-foreground hover:text-primary transition-colors">
                  Casino del Mes
                </Link>
              </li>
              <li>
                <Link href="/legal-info" className="text-muted-foreground hover:text-primary transition-colors">
                  Información Legal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Comparadores</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/comparador/casinos" className="text-muted-foreground hover:text-primary transition-colors">
                  Comparador de Casinos
                </Link>
              </li>
              <li>
                <Link href="/comparador/licencias" className="text-muted-foreground hover:text-primary transition-colors">
                  Comparador de Licencias
                </Link>
              </li>
            </ul>
            
            <h3 className="text-lg font-semibold mt-6 mb-4 text-primary">Países Principales</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/countries/espana" className="text-muted-foreground hover:text-primary transition-colors">
                  España
                </Link>
              </li>
              <li>
                <Link href="/countries/us" className="text-muted-foreground hover:text-primary transition-colors">
                  Estados Unidos
                </Link>
              </li>
              <li>
                <Link href="/countries/uk" className="text-muted-foreground hover:text-primary transition-colors">
                  Reino Unido
                </Link>
              </li>
              <li>
                <Link href="/countries/mexico" className="text-muted-foreground hover:text-primary transition-colors">
                  México
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors">
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link href="/responsible-gambling" className="text-muted-foreground hover:text-primary transition-colors">
                  Juego Responsable
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} TuApuesta. Todos los derechos reservados.
          </p>
          <p className="mt-2 text-sm">
            Este sitio web es solo para fines informativos. No promovemos ni fomentamos las apuestas.
            Por favor, apuesta de manera responsable y de acuerdo con las leyes y regulaciones locales.
          </p>
        </div>
      </div>
    </footer>
  );
}