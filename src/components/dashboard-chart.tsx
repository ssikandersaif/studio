
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useLanguage } from "@/contexts/language-context"

const chartData = [
  { year: "2020", rice: 120.4, wheat: 107.8, maize: 30.2 },
  { year: "2021", rice: 124.3, wheat: 109.5, maize: 31.6 },
  { year: "2022", rice: 129.4, wheat: 106.8, maize: 33.7 },
  { year: "2023", rice: 135.5, wheat: 112.7, maize: 35.9 },
  { year: "2024", rice: 138.0, wheat: 114.0, maize: 36.5 },
]

const chartConfig = {
  yield: {
    label: "Yield (Million Tonnes)",
  },
  rice: {
    label: "Rice",
    color: "hsl(var(--chart-1))",
  },
  wheat: {
    label: "Wheat",
    color: "hsl(var(--chart-2))",
  },
  maize: {
    label: "Maize",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function DashboardChart() {
  const { t } = useLanguage();

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <BarChart 
        accessibilityLayer 
        data={chartData}
        margin={{
            top: 5,
            right: 10,
            left: -10,
            bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 4)}
        />
        <YAxis 
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            label={{ value: t({en: "Yield (MT)", hi: "उपज (MT)", ml: "വിളവ് (MT)", ta: "விளைச்சல் (MT)", te: "దిగుబడి (MT)", kn: "ಇಳುವರಿ (MT)", bn: "ফলন (MT)", mr: "उत्पन्न (MT)", gu: "ઉપજ (MT)", pa: "ਝਾੜ (MT)"}), angle: -90, position: 'insideLeft', offset:10 }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="rice" fill="var(--color-rice)" radius={4} />
        <Bar dataKey="wheat" fill="var(--color-wheat)" radius={4} />
        <Bar dataKey="maize" fill="var(--color-maize)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
