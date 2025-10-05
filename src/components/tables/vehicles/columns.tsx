import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import {
  EyeIcon,
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
  TruckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export type Vehicle = {
  id: string;
  name: string;
  plate_number: string;
  type: "truck" | "van";
  cargoLength: number;
  cargoWidth: number;
  cargoHeight: number;
  maxWeight: number;
  volume: number;
  fuelType: "diesel" | "petrol";
  status: "available" | "in_use" | "maintenance";
};

export const vehicleColumns = (
  handleDelete: (id: string) => void
): ColumnDef<Vehicle>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "plate_number",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Plate Number <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "volume",
    header: () => {
      return (
        <div>
          Volume (m<sup>3</sup>)
        </div>
      );
    },
    cell: ({ row }) => {
      const length: number = row.original.cargoLength;
      const height: number = row.original.cargoHeight;
      const width: number = row.original.cargoWidth;
      const volume: number = length * height * width;
      return <div>{volume}</div>;
    },
  },
  { accessorKey: "maxWeight", header: "Max Weight (kg)" },
  {
    accessorKey: "fuelType",
    header: "Fuel Type",
    cell: ({ row }) => {
      const value: string = row.getValue("fuelType");
      const firstLetter = value.charAt(0).toUpperCase();
      const remaining = value.substring(1);
      return <div>{firstLetter + remaining}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const value: string = row.getValue("type");
      const firstLetter = value.charAt(0).toUpperCase();
      const remaining = value.substring(1);
      return <div>{firstLetter + remaining}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value: string = row.getValue("status");
      if (value === "available")
        return <Badge className="bg-green-800 text-white">Available</Badge>;
      if (value === "in_use")
        return <Badge variant={"destructive"}>In Use</Badge>;
      return <Badge className="bg-yellow-700 text-white">Maintenance</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const vehicle = row.original;
      const navigate = useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem>
              <TruckIcon /> Assign Driver
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  to: "/dashboard/vehicles/edit/$vehicleId",
                  params: { vehicleId: vehicle.id },
                })
              }
            >
              <PencilIcon /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(vehicle.id)}>
              <TrashIcon /> Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  to: "/dashboard/vehicles/$vehicleId",
                  params: { vehicleId: vehicle.id },
                })
              }
            >
              <EyeIcon />
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
