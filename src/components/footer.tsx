"use client";

import Link from "next/link";
import { Sprout, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "./ui/button";

const socialIcons = [
  { name: "Facebook", icon: "fab fa-facebook-f", href: "#" },
  { name: "Twitter", icon: "fab fa-twitter", href: "#" },
  { name: "Instagram", icon: "fab fa-instagram", href: "#" },
  { name: "LinkedIn", icon: "fab fa-linkedin-in", href: "#" },
];

export function Footer() {
  const { t } = useLanguage();

  const links = {
    about: t({ en: "About Us", hi: "हमारे बारे में" }),
    features: t({ en: "Features", hi: "विशेषताएँ" }),
    contact: t({ en: "Contact", hi: "संपर्क करें" }),
    faq: t({ en: "FAQ", hi: "सामान्य प्रश्न" }),
    terms: t({ en: "Terms of Service", hi: "सेवा की शर्तें" }),
    privacy: t({ en: "Privacy Policy", hi: "गोपनीयता नीति" }),
  };

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 sm:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary font-headline">
                Krishi Mitra
              </h1>
            </div>
            <p className="text-sm">
              {t({
                en: "Empowering Indian farmers with AI-driven insights and real-time data.",
                hi: "एआई-संचालित अंतर्दृष्टि और वास्तविक समय डेटा के साथ भारतीय किसानों को सशक्त बनाना।",
              })}
            </p>
             <div className="mt-4 flex space-x-2">
              {socialIcons.map((social) => (
                <Link key={social.name} href={social.href} passHref>
                   <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <i className={social.icon}></i>
                    <span className="sr-only">{social.name}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold uppercase tracking-wider mb-4 text-sm">
              {t({ en: "Quick Links", hi: "त्वरित लिंक" })}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">{links.about}</Link></li>
              <li><Link href="/#features" className="hover:text-primary transition-colors">{links.features}</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">{links.contact}</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">{links.faq}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold uppercase tracking-wider mb-4 text-sm">
              {t({ en: "Legal", hi: "कानूनी" })}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-primary transition-colors">{links.terms}</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">{links.privacy}</Link></li>
            </ul>
          </div>

          <div>
             <h3 className="font-semibold uppercase tracking-wider mb-4 text-sm">
              {t({ en: "Contact Us", hi: "हमसे संपर्क करें" })}
            </h3>
            <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary shrink-0"/>
                    <span>+91 12345 67890</span>
                </li>
                 <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary shrink-0"/>
                    <span>contact@krishimitra.app</span>
                </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Krishi Mitra.{" "}
            {t({ en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।" })}
          </p>
        </div>
      </div>
    </footer>
  );
}
