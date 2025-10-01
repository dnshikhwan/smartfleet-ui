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
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/users/create")({
  component: CreateUserPage,
});

type CreateUserInput = {
  name: string;
  password: string;
  email: string;
  role: "admin" | "dispatcher" | "driver";
};

// create user function
async function createUser(input: CreateUserInput) {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const errorMessage = await res.json();
    throw Error(errorMessage.message);
  }

  return res.json();
}

function CreateUserPage() {
  const { register, control, handleSubmit, reset } = useForm<CreateUserInput>();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User successfully created");
      navigate({ to: "/dashboard/users" });
      reset();
    },
    onError: (error: Error) => {
      const message = error.message;
      const firstLetter = message.charAt(0).toUpperCase();
      const remaining = message.substring(1);

      toast.error(firstLetter + remaining);
    },
  });

  const onSubmit = (data: CreateUserInput) => {
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
              Add User
            </h2>
            <div className="ml-auto hidden md:flex space-x-4">
              <Button variant={"secondary"}>Save Draft</Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                disabled={mutation.isPending}
              >
                Create
              </Button>
            </div>
          </div>
          <div className="w-full space-y-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>User Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      required
                      {...register("name", { required: true })}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      required
                      {...register("email", { required: true })}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      required
                      autoComplete="new-password"
                      {...register("password", { required: true })}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Role</Label>
                    <Controller
                      name={"role"}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a user role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="dispatcher">
                              Dispatcher
                            </SelectItem>
                            <SelectItem value="driver">Driver</SelectItem>
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
