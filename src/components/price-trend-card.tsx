"use client"

import Link from "next/link"
import * as React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { mockCropPrices } from "@/lib/data"
import { useLanguage } from "@/contexts/language-context"
import { DollarSign, ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"

const chartData = mockCropPrices
  .filter(p => ['Tomato', 'Onion', 'Potato'].includes(p.name))
  .slice(0, 7) // Take a small sample
  .map(p => ({ ...p, date: p.date.substring(5) })) // Format date for chart
  .reverse();

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
}

export function PriceTrendCard() {
    const { t } = useLanguage();
    const [isClient, setIsClient] = React.useState(false)
    
    React.useEffect(() => {
        setIsClient(true)
    }, [])

    const tomatoPrice = mockCropPrices.find(p => p.name === 'Tomato')?.modalPrice.toLocaleString('en-IN') || 'N/A';

    return (
        <Link href="/market-prices" className="block group">
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
                 <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-primary/10 text-primary"><DollarSign size={24} /></div>
                        <div>
                            <CardTitle className="font-headline">{t({ en: "Market Prices", ml: "വിപണി വിലകൾ", hi: "बाजार मूल्य", ta: "சந்தை விலைகள்", te: "మార్కెట్ ధరలు", kn: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು", bn: "বাজারদর", mr: "बाजारभाव", gu: "બજારભાવ", pa: "ਬਾਜ਼ਾਰ ਦੀਆਂ ਕੀਮਤਾਂ" })}</CardTitle>
                            {isClient ? (
                                <CardDescription>{t({en: `Tomato today: ₹${tomatoPrice}/Quintal`, hi: `आज टमाटर: ₹${tomatoPrice}/क्विंटल`, ml: `തക്കാളി ഇന്ന്: ₹${tomatoPrice}/ക്വിന്റൽ`, ta: `தக்காளி இன்று: ₹${tomatoPrice}/ குவிண்டால்`, te: `టమోటా ఈరోజు: ₹${tomatoPrice}/క్వింటాల్`, kn: `ಟೊಮೇಟೊ ಇಂದು: ₹${tomatoPrice}/ಕ್ವಿಂಟಲ್`, bn: `টমেটো আজ: ₹${tomatoPrice}/কুইন্টাল`, mr: `टोमॅटो आज: ₹${tomatoPrice}/क्विंटल`, gu: `ટામેટા આજે: ₹${tomatoPrice}/ક્વિન્ટલ`, pa: `ਟਮਾਟਰ ਅੱਜ: ₹${tomatoPrice}/ਕੁਇੰਟਲ`})}</CardDescription>
                            ) : (
                                <Skeleton className="h-4 w-48 mt-1" />
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 -mt-4">
                    <ChartContainer config={chartConfig} className="h-24 w-full">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                         <XAxis dataKey="name" hide />
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                        />
                        <defs>
                            <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                offset="5%"
                                stopColor="var(--color-price)"
                                stopOpacity={0.8}
                                />
                                <stop
                                offset="95%"
                                stopColor="var(--color-price)"
                                stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                        dataKey="modalPrice"
                        type="natural"
                        fill="url(#fillPrice)"
                        stroke="var(--color-price)"
                        stackId="a"
                        />
                    </AreaChart>
                    </ChartContainer>
                </CardContent>
                 <CardFooter>
                    <Button variant="link" className="p-0 h-auto">{t({en: "View All Prices", hi: "सभी कीमतें देखें", ml: "എല്ലാ വിലകളും കാണുക", ta: "அனைத்து விலைகளையும் காண்க", te: "అన్ని ధరలను చూడండి", kn: "ಎಲ್ಲಾ ಬೆಲೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ", bn: "সব দাম দেখুন", mr: "सर्व किंमती पहा", gu: "બધી કિંમતો જુઓ", pa: "ਸਾਰੀਆਂ ਕੀਮਤਾਂ ਦੇਖੋ"})}<ArrowRight className="ml-2 h-4 w-4" /></Button>
                </CardFooter>
            </Card>
        </Link>
    )
}
