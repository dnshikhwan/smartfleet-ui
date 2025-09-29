import DashboardLayout from "@/components/dashboard-layout";
import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/vehicles/edit/$vehicleId")({
  component: EditVehiclePage,
});

type EditVehicleInput = {
  plate_number: string;
  type: "van" | "truck";
  capacity: number;
  status: "available" | "in_use" | "maintenance";
};

async function getVehicleDetails(vehicleId: string) {
  const res = await fetch(`http://localhost:3000/vehicles/${vehicleId}`);
  return res.json();
}

// edit vehicle function
async function editVehicle(
  vehicleId: string,
  input: Partial<EditVehicleInput>
) {
  const res = await fetch(`http://localhost:3000/vehicles/${vehicleId}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) console.log("Error updating vehicle");

  return res.json();
}

function EditVehiclePage() {
  const { history } = useRouter();
  const { register, handleSubmit, control, reset } =
    useForm<EditVehicleInput>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { vehicleId } = Route.useParams();

  const { data: vehicleData, isLoading } = useQuery({
    queryKey: ["vehicle-detail", vehicleId],
    queryFn: () => getVehicleDetails(vehicleId),
  });

  useEffect(() => {
    if (vehicleData && !isLoading) {
      reset(vehicleData);
    }
  }, [vehicleData, reset, isLoading]);

  const mutation = useMutation({
    mutationFn: ({
      vehicleId,
      input,
    }: {
      vehicleId: string;
      input: Partial<EditVehicleInput>;
    }) => editVehicle(vehicleId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vehicles"],
      });
      queryClient.invalidateQueries({
        queryKey: ["vehicle-detail", vehicleId],
      });
      toast.success("Vehicles succesfully updated");
      navigate({ to: "/dashboard/vehicles" });
      reset();
    },
  });

  const onSubmit = (data: Partial<EditVehicleInput>) => {
    mutation.mutate({
      vehicleId,
      input: data,
    });
  };

  if (!vehicleData || isLoading) return <Loading />;

  return (
    <DashboardLayout>
      <div className="w-full xl:flex xl:justify-center">
        <div className="space-y-8 w-full xl:max-w-2xl">
          <div className="w-full flex items-center gap-4">
            <Button onClick={() => history.back()} variant={"outline"}>
              <ChevronLeftIcon />
            </Button>
            <h2 className="scroll-m-20 text-2xl font-bold tracking-tight first:mt-0">
              Edit Vehicle
            </h2>
            <div className="ml-auto hidden md:flex space-x-4">
              <Button variant={"secondary"}>Save Draft</Button>
              <Button onClick={handleSubmit(onSubmit)}>Save</Button>
            </div>
          </div>
          <div className="w-full space-y-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Vehicle Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-3">
                    <Label>Plate Number</Label>
                    <Input
                      id="plate_number"
                      type="text"
                      {...register("plate_number", { required: true })}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      required
                      {...register("capacity", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Type</Label>
                    <Controller
                      name={"type"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          key={field.value}
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="truck">Truck</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Status</Label>
                    <Controller
                      name={"status"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          key={field.value}
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a vehicle status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="in_use">In Use</SelectItem>
                            <SelectItem value="maintenance">
                              Maintenance
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
            <div className="flex justify-end md:hidden space-x-4">
              <Button variant={"secondary"}>Save Draft</Button>
              <Button onClick={handleSubmit(onSubmit)}>Save</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
