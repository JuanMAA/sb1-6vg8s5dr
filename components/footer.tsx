"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Target, Mail, Phone, BarChart2 } from "lucide-react";
import { useLanguage } from "./language-context";

export default function Footer() {

  const { t } = useLanguage();

  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-primary">
                {process.env.NEXT_PUBLIC_SITE_NAME}
              </span>
            </div>
            <p className="text-muted-foreground">
              {t.footer.about}
            </p>
            <div className="flex items-center mt-4 text-muted-foreground">
              <Mail className="h-4 w-4 mr-2" />
              <span>{t.footer.email}</span>
            </div>
            <div className="flex items-center mt-2 text-muted-foreground">
              <Phone className="h-4 w-4 mr-2" />
              <span>{t.footer.phone}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.home}
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.rankings}
                </Link>
              </li>
              <li>
                <Link href="/bonuses" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.bonuses}
                </Link>
              </li>
              <li>
                <Link href="/casino-of-the-month" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.casinoOfTheMonth}
                </Link>
              </li>
              <li>
                <Link href="/legal-info" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.legalInfo}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              {t.footer.comparators}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/comparador/casinos" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.casinoComparator}
                </Link>
              </li>
              <li>
                <Link href="/comparador/licencias" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.licenseComparator}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              {t.footer.legal}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.disclaimer}
                </Link>
              </li>
              <li>
                <Link href="/responsible-gambling" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.responsibleGambling}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SITE_NAME}. {t.footer.rights}
          </p>
          <p className="mt-2 text-sm">
            {t.footer.disclaimerText}
          </p>
        </div>
      </div>
    </footer>
  );
}