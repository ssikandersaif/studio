"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { mockSchemes } from "@/lib/data";
import { GovernmentScheme } from "@/lib/types";
import { ExternalLink, HandHelping } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

const allStates = Array.from(new Set(mockSchemes.flatMap(s => s.eligibility.states.includes("All") ? ["Kerala", "Maharashtra", "Punjab", "Gujarat"] : s.eligibility.states)));
const allCrops = Array.from(new Set(mockSchemes.flatMap(s => s.eligibility.crops.includes("All") ? ["Paddy", "Wheat", "Tomato", "Onion", "Potato"] : s.eligibility.crops)));


export default function GovtSchemesPage() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [eligibleSchemes, setEligibleSchemes] = useState<GovernmentScheme[]>([]);
  const { t } = useLanguage();

  const handleCheckEligibility = () => {
    const schemes = mockSchemes.filter(scheme => {
      const stateMatch = scheme.eligibility.states.includes("All") || scheme.eligibility.states.includes(selectedState);
      const cropMatch = scheme.eligibility.crops.includes("All") || scheme.eligibility.crops.includes(selectedCrop);
      return stateMatch && cropMatch;
    });
    setEligibleSchemes(schemes);
  };

  return (
    <>
      <Header
        title={t({ en: "Government Schemes", ml: "സർക്കാർ പദ്ധതികൾ" })}
        description={t({ en: "Check your eligibility for beneficial schemes.", ml: "പ്രയോജനകരമായ പദ്ധതികൾക്ക് നിങ്ങളുടെ യോഗ്യത പരിശോധിക്കുക." })}
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>{t({ en: "Check Eligibility", ml: "യോഗ്യത പരിശോധിക്കുക" })}</CardTitle>
              <CardDescription>{t({ en: "Select your state and crop to find schemes.", ml: "പദ്ധതികൾ കണ്ടെത്താൻ നിങ്ങളുടെ സംസ്ഥാനവും വിളയും തിരഞ്ഞെടുക്കുക." })}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">{t({ en: "State", ml: "സംസ്ഥാനം" })}</label>
                <Select onValueChange={setSelectedState} value={selectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder={t({ en: "Select a state", ml: "ഒരു സംസ്ഥാനം തിരഞ്ഞെടുക്കുക" })} />
                  </SelectTrigger>
                  <SelectContent>
                    {allStates.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">{t({ en: "Crop", ml: "വിള" })}</label>
                <Select onValueChange={setSelectedCrop} value={selectedCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder={t({ en: "Select a crop", ml: "ഒരു വിള തിരഞ്ഞെടുക്കുക" })} />
                  </SelectTrigger>
                  <SelectContent>
                     {allCrops.map(crop => <SelectItem key={crop} value={crop}>{crop}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCheckEligibility} className="w-full" disabled={!selectedState || !selectedCrop}>
                {t({ en: "Find Schemes", ml: "പദ്ധതികൾ കണ്ടെത്തുക" })}
              </Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t({ en: "Eligible Schemes", ml: "യോഗ്യമായ പദ്ധതികൾ" })}</CardTitle>
            </CardHeader>
            <CardContent>
              {eligibleSchemes.length > 0 ? (
                <div className="space-y-4">
                  {eligibleSchemes.map(scheme => (
                    <div key={scheme.id} className="p-4 border rounded-lg bg-secondary/50">
                        <div className="flex justify-between items-start">
                           <h3 className="font-bold text-lg text-primary">{scheme.name}</h3>
                           <Link href={scheme.link} target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="sm"><ExternalLink className="mr-2 h-4 w-4"/>Learn More</Button>
                           </Link>
                        </div>
                      <p className="text-muted-foreground mt-1">{scheme.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                  <HandHelping className="w-16 h-16 mb-4"/>
                  <p>{t({ en: "Your eligible schemes will be shown here.", ml: "നിങ്ങളുടെ യോഗ്യമായ പദ്ധതികൾ ഇവിടെ കാണിക്കും." })}</p>
                  <p className="text-sm">{t({ en: "Please select a state and crop to get started.", ml: "ആരംഭിക്കുന്നതിന് ഒരു സംസ്ഥാനവും വിളവും തിരഞ്ഞെടുക്കുക." })}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
