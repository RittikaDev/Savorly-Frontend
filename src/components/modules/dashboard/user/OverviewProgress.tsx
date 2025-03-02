"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export const description = "A bar chart with custom labels for Orders";

// Updated chart configuration for each booking type
const chartConfig = {
  total: {
    label: "Total Orders",
    color: "hsl(var(--chart-1))",
  },
  pending: {
    label: "Pending Orders",
    color: "hsl(var(--chart-2))",
  },
  delivered: {
    label: "Delivered Orders",
    color: "hsl(var(--chart-3))",
  },
  shipped: {
    label: "Canceled Orders",
    color: "hsl(var(--chart-4))",
  },
  canceled: {
    label: "Canceled Orders",
    color: "hsl(var(--chart-5))",
  },
  processing: {
    label: "In Processing",
    color: "#ca8a04",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

interface IProps {
  total: number;
  pending: number;
  delivered: number;
  cancelled: number;
  progress: number;
}

const OverviewProgress = ({
  total,
  pending,
  delivered,
  cancelled,
  progress,
}: IProps) => {
  // Updated chart data for Orders
  const chartData = [
    { bookingType: "Total", count: total, fill: "#3b82f6" },
    { bookingType: "Pending", count: pending, fill: "#eab308" },
    { bookingType: "delivered", count: delivered, fill: "#166534" },
    { bookingType: "Cancelled", count: cancelled, fill: "#16a34a" },
    { bookingType: "progress", count: progress, fill: "#991b1b" },
  ];
  return (
    <Card>
      <CardContent className="pt-4 ">
        <ResponsiveContainer width={"100%"} height={500}>
          <ChartContainer config={chartConfig}>
            <BarChart
              className="p-0"
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{ right: 16 }}
              barSize={40}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="bookingType"
                type="category"
                tickLine={false}
                tickMargin={0}
                axisLine={false}
                tickFormatter={(value) => value}
                hide
              />
              <XAxis dataKey="count" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              {/* Different bars for each booking type with custom labels */}
              <Bar dataKey="count" layout="vertical" radius={4}>
                <LabelList
                  dataKey="bookingType"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label]"
                  fontSize={12}
                />
                <LabelList
                  dataKey="count"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OverviewProgress;
