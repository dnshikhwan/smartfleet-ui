import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "../../ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/loading";
import { vehicleColumns } from "./columns";
import { toast } from "sonner";

async function getVehiclesData() {
  const res = await fetch("http://localhost:3000/vehicles");
  return res.json();
}

async function deleteVehicle(vehicleId: string) {
  const res = await fetch(`http://localhost:3000/vehicles/${vehicleId}`, {
    method: "DELETE",
  });

  if (!res.ok) console.log(await res.json());

  return res.json();
}

export default function VehicleTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehiclesData,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["total-vehicles"],
      });
      queryClient.invalidateQueries({
        queryKey: ["vehicles"],
      });
      queryClient.invalidateQueries({
        queryKey: ["total-maintenance-vehicles"],
      });
      queryClient.invalidateQueries({
        queryKey: ["total-available-vehicles"],
      });
      queryClient.invalidateQueries({
        queryKey: ["total-in-use-vehicles"],
      });
    },
    onError: () => {
      toast.error("Error deleting vehicle");
    },
  });

  const handleDelete = (vehicleId: string) => {
    mutation.mutate(vehicleId);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-full">
      <DataTable
        columns={vehicleColumns(handleDelete)}
        data={data}
        filterColumn="plate_number"
      />
    </div>
  );
}
