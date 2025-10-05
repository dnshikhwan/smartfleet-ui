import { VehicleStatusChart } from "@/components/charts/vehicles/status-chart";
import DashboardLayout from "@/components/dashboard-layout";
import { Loading } from "@/components/loading";
import {
  AvailableVehicleStatsCard,
  InUseVehicleStatsCard,
  MaintenanceVehicleStatsCard,
  TotalVehicleStatsCard,
} from "@/components/stats-card";
import VehicleTable from "@/components/tables/vehicles/vehicle-table";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DownloadIcon, PlusIcon } from "lucide-react";

export const Route = createFileRoute("/dashboard/vehicles/")({
  component: VehiclePage,
});

async function getTotalVehicles() {
  const res = await fetch("http://localhost:3000/vehicles/total");
  return res.json();
}

async function getTotalAvailableVehicles() {
  const res = await fetch(
    "http://localhost:3000/vehicles/total?status=available"
  );
  return res.json();
}

async function getTotalInUseVehicles() {
  const res = await fetch("http://localhost:3000/vehicles/total?status=in_use");
  return res.json();
}

async function getMaintenanceVehicles() {
  const res = await fetch(
    "http://localhost:3000/vehicles/total?status=maintenance"
  );
  return res.json();
}

function VehiclePage() {
  const { data: total_vehicles, isLoading } = useQuery({
    queryKey: ["total-vehicles"],
    queryFn: getTotalVehicles,
  });

  const { data: total_available_vehicles } = useQuery({
    queryKey: ["total-available-vehicles"],
    queryFn: getTotalAvailableVehicles,
  });

  const { data: total_in_use_vehicles } = useQuery({
    queryKey: ["total-in-use-vehicles"],
    queryFn: getTotalInUseVehicles,
  });

  const { data: total_maintenance_vehicles } = useQuery({
    queryKey: ["total-maintenance-vehicles"],
    queryFn: getMaintenanceVehicles,
  });

  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  return (
    <DashboardLayout>
      <div className="h-12 w-full flex items-center justify-between">
        <h2 className="scroll-m-20 text-2xl font-bold tracking-tight first:mt-0">
          Vehicles
        </h2>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate({ to: "/dashboard/vehicles/create" })}
          >
            <PlusIcon />
            Add vehicle
          </Button>
          <Button>
            <DownloadIcon />
            Export
          </Button>
        </div>
      </div>
      <div className="w-full grid lg:grid-cols-4 gap-4 ">
        <TotalVehicleStatsCard
          value={total_vehicles?.count}
          trend={{ value: "+12.5%", isPositive: true }}
        />
        <AvailableVehicleStatsCard
          value={total_available_vehicles?.count}
          trend={{ value: "+12.5%", isPositive: true }}
        />
        <InUseVehicleStatsCard
          value={total_in_use_vehicles?.count}
          trend={{ value: "+12.5%", isPositive: true }}
        />
        <MaintenanceVehicleStatsCard
          value={total_maintenance_vehicles?.count}
          trend={{ value: "+12.5%", isPositive: true }}
        />
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        <VehicleStatusChart />
      </div>
      <div className="w-full">
        <VehicleTable />
      </div>
    </DashboardLayout>
  );
}
