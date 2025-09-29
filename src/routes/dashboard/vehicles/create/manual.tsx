import DashboardLayout from "@/components/dashboard-layout";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/vehicles/create/manual")({
  component: CreateVehicleManualPage,
});

type CreateVehicleInput = {
  plate_number: string;
  type: string;
  capacity: number;
};

// create vehicle function
async function createVehicle(input: CreateVehicleInput) {
  const res = await fetch("http://localhost:3000/vehicles", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) console.log("Error creating vehicle");

  return res.json();
}

function CreateVehicleManualPage() {
  const { history } = useRouter();
  const { register, handleSubmit, control, reset } =
    useForm<CreateVehicleInput>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["total-vehicles", "vehicles"],
      });
      toast.success("Vehicles succesfully created");
      navigate({ to: "/dashboard/vehicles" });
      reset();
    },
  });

  const onSubmit = (data: CreateVehicleInput) => {
    mutation.mutate(data);
  };

  return (
    <DashboardLayout>
      <div className="w-full xl:flex xl:justify-center">
        <div className="space-y-8 w-full xl:max-w-2xl">
          <div className="w-full flex items-center gap-4">
            <Button onClick={() => history.back()} variant={"outline"}>
              <ChevronLeftIcon />
            </Button>
            <h2 className="scroll-m-20 text-2xl font-bold tracking-tight first:mt-0">
              Add Vehicles
            </h2>
            <div className="ml-auto hidden md:flex space-x-4">
              <Button variant={"secondary"}>Save Draft</Button>
              <Button onClick={handleSubmit(onSubmit)}>Create</Button>
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
                          onValueChange={field.onChange}
                          value={field.value}
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
                </form>
              </CardContent>
            </Card>
            <div className="flex justify-end md:hidden space-x-4">
              <Button variant={"secondary"}>Save Draft</Button>
              <Button onClick={handleSubmit(onSubmit)}>Create</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
