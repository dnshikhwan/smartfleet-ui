import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
  plate_number: string;
  type: "truck" | "van";
  capacity: number;
  status: "available" | "in_use" | "maintenance";
};

export const columns = (
  handleDelete: (id: string) => void
): ColumnDef<Vehicle>[] => [
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
    accessorKey: "capacity",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Capacity <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
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
            <DropdownMenuSeparator />
            <DropdownMenuItem>Assign Driver</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate({
                  to: "/dashboard/vehicles/edit/$vehicleId",
                  params: { vehicleId: vehicle.id },
                })
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(vehicle.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
