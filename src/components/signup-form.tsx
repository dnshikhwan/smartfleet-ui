import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type SignUpField = {
  name: string;
  email: string;
  password: string;
};

async function signUpUser(credentials: SignUpField) {
  const res = await fetch("http://localhost:3000/auth/signup", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error);
  }

  return res.json();
}

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register, reset, handleSubmit } = useForm<SignUpField>();

  const mutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      toast.success("Sign up successful");
    },
    onError: (error: Error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });

  const onSubmit = (data: SignUpField) => {
    mutation.mutate(data);
    reset();
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register your new account</CardTitle>
          <CardDescription>Enter your details below to sign up</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  {...register("name", { required: true })}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email", { required: true })}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password", { required: true })}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
