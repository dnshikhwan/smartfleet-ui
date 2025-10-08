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
  name: string;
  plate_number: string;
  type: string;
  cargoLength: number;
  cargoWidth: number;
  cargoHeight: number;
  maxWeight: number;
  fuelType: "diesel" | "petrol";
  status: "available" | "in_use" | "maintenance";
};

// create vehicle function
async function createVehicle(input: CreateVehicleInput) {
  const res = await fetch("http://localhost:3000/vehicles", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const errorMessage = await res.json();
    console.log(input);
    throw new Error(errorMessage.message);
  }

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
    onError: (error: Error) => {
      toast.error(error.message);
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
                <div className="space-y-4">
                  <div className="grid gap-3">
                    <Label>Name</Label>
                    <Input
                      id="name"
                      type="text"
                      {...register("name", { required: true })}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Plate Number</Label>
                    <Input
                      id="plate_number"
                      type="text"
                      {...register("plate_number", {
                        required: true,
                      })}
                      required
                    />
                  </div>
                  <div className="flex gap-5">
                    <div className="grid gap-3">
                      <Label>Vehicle Type</Label>
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
                    <div className="grid gap-3">
                      <Label>Fuel Type</Label>
                      <Controller
                        name={"fuelType"}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a fuel type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="diesel">Diesel</SelectItem>
                              <SelectItem value="petrol">Petrol</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label>Vehicle Status</Label>
                      <Controller
                        name={"status"}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a vehicle status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">
                                Available
                              </SelectItem>
                              <SelectItem value="in_use">In Use</SelectItem>
                              <SelectItem value="maintenance">
                                Maintenance
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Vehicle Dimensions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-5">
                    <div className="grid gap-3 w-full">
                      <Label>Cargo Length</Label>
                      <Input
                        id="cargoLength"
                        type="number"
                        required
                        className="w-full"
                        {...register("cargoLength", {
                          required: true,
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div className="grid gap-3 w-full">
                      <Label>Cargo Width</Label>
                      <Input
                        id="cargoWidth"
                        type="number"
                        required
                        className="w-full"
                        {...register("cargoWidth", {
                          required: true,
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-5">
                    <div className="grid gap-3 w-full">
                      <Label>Cargo Height</Label>
                      <Input
                        id="cargoHeight"
                        type="number"
                        required
                        className="w-full"
                        {...register("cargoHeight", {
                          required: true,
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div className="grid gap-3 w-full">
                      <Label>Max Weight</Label>
                      <Input
                        id="maxWeight"
                        type="number"
                        required
                        className="w-full"
                        {...register("maxWeight", {
                          required: true,
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                  </div>
                </div>
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
