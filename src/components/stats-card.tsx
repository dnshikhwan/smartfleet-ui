import type React from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Car, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  trend,
  icon,
  className,
}: StatsCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm stats-card-glow hover:border-border transition-all duration-300 hover:scale-[1.02]",
        className
      )}
    >
      <div className="absolute inset-0 stats-gradient" />
      <CardHeader className="relative space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {icon}
              </div>
            )}
            <CardDescription className="text-sm font-medium text-muted-foreground">
              {title}
            </CardDescription>
          </div>
          {trend && (
            <Badge
              variant="outline"
              className={cn(
                "gap-1 border-0 font-medium",
                trend.isPositive
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              )}
            >
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {trend.value}
            </Badge>
          )}
        </div>

        <div className="space-y-1">
          <CardTitle className="text-3xl font-bold tabular-nums tracking-tight text-balance">
            {value}
          </CardTitle>
          {description && (
            <p className="text-xs text-muted-foreground text-pretty">
              {description}
            </p>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}

export function TotalUsersStatsCard({
  value,
  trend,
  className,
}: {
  value: string | number;
  trend?: StatsCardProps["trend"];
  className?: string;
}) {
  return (
    <StatsCard
      title="Total Users"
      value={value}
      description="Total users in company"
      trend={trend}
      icon={<UserIcon className="h-5 w-5" />}
      className={className}
    />
  );
}

export function TotalVehicleStatsCard({
  value,
  trend,
  className,
}: {
  value: string | number;
  trend?: StatsCardProps["trend"];
  className?: string;
}) {
  return (
    <StatsCard
      title="Total Vehicles"
      value={value}
      description="Total vehicles in fleet"
      trend={trend}
      icon={<Car className="h-5 w-5" />}
      className={className}
    />
  );
}

export function AvailableVehicleStatsCard({
  value,
  trend,
  className,
}: {
  value: string | number;
  trend?: StatsCardProps["trend"];
  className?: string;
}) {
  return (
    <StatsCard
      title="Available Vehicles"
      value={value}
      description="Total available vehicles in fleet"
      trend={trend}
      icon={<Car className="h-5 w-5" />}
      className={className}
    />
  );
}

export function InUseVehicleStatsCard({
  value,
  trend,
  className,
}: {
  value: string | number;
  trend?: StatsCardProps["trend"];
  className?: string;
}) {
  return (
    <StatsCard
      title="In Use Vehicles"
      value={value}
      description="Total in use vehicles in fleet"
      trend={trend}
      icon={<Car className="h-5 w-5" />}
      className={className}
    />
  );
}

export function MaintenanceVehicleStatsCard({
  value,
  trend,
  className,
}: {
  value: string | number;
  trend?: StatsCardProps["trend"];
  className?: string;
}) {
  return (
    <StatsCard
      title="Vehicles In Maintenance"
      value={value}
      description="Total vehicles in maintenance in fleet"
      trend={trend}
      icon={<Car className="h-5 w-5" />}
      className={className}
    />
  );
}
