import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockCropPrices } from "@/lib/data";
import { format } from "date-fns";

export default function MarketPricesPage() {
  const prices = mockCropPrices;
  const lastUpdated = format(new Date(), "MMMM d, yyyy");

  return (
    <>
      <Header
        title="Market Prices"
        description="Real-time prices from eNAM and local mandis."
      />
      <main className="flex-1 p-4 sm:px-8 sm:py-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Commodity Prices</CardTitle>
            <CardDescription>Last updated: {lastUpdated}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commodity</TableHead>
                  <TableHead>Mandi</TableHead>
                  <TableHead className="text-right">Min Price (₹/Quintal)</TableHead>
                  <TableHead className="text-right">Max Price (₹/Quintal)</TableHead>
                  <TableHead className="text-right">Modal Price (₹/Quintal)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prices.map((price) => (
                  <TableRow key={price.id}>
                    <TableCell>
                      <div className="font-medium">{price.name}</div>
                      <div className="text-sm text-muted-foreground">{price.variety}</div>
                    </TableCell>
                    <TableCell>{price.mandi}</TableCell>
                    <TableCell className="text-right text-red-600 dark:text-red-400">{price.minPrice.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-right text-green-600 dark:text-green-400">{price.maxPrice.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-right font-bold text-primary">{price.modalPrice.toLocaleString('en-IN')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
