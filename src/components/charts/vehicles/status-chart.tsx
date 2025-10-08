import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQueryClient } from "@tanstack/react-query";

const chartConfig = {
  total: {
    label: "Vehicles",
  },
  available: {
    label: "Available",
    color: "var(--chart-1)",
  },
  in_use: {
    label: "In Use",
    color: "var(--chart-2)",
  },
  maintenance: {
    label: "Maintenance",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

type VehicleData = {
  count: number;
};

export function VehicleStatusChart() {
  const queryClient = useQueryClient();
  const availableVehicle: VehicleData | undefined = queryClient.getQueryData([
    "total-available-vehicles",
  ]);

  const inUseVehicle: VehicleData | undefined = queryClient.getQueryData([
    "total-in-use-vehicles",
  ]);

  const maintenanceVehicle: VehicleData | undefined = queryClient.getQueryData([
    "total-maintenance-vehicles",
  ]);

  const chartData = [
    {
      status: "available",
      total: Number(availableVehicle?.count),
      fill: "var(--color-available)",
    },
    {
      status: "in_use",
      total: Number(inUseVehicle?.count),
      fill: "var(--color-in_use)",
    },
    {
      status: "maintenance",
      total: Number(maintenanceVehicle?.count),
      fill: "var(--color-maintenance)",
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Vehicle Status</CardTitle>
        <CardDescription>Current Vehicle Status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="total" label nameKey="status" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing status of vehicles
        </div>
      </CardFooter>
    </Card>
  );
}
