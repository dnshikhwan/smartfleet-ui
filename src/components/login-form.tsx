import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link, useNavigate } from "@tanstack/react-router";

type LoginInput = {
  email: string;
  password: string;
};

// login function
async function loginUser(credentials: LoginInput) {
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error("Failed to login user");

  return res.json();
}

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register, handleSubmit, reset } = useForm<LoginInput>();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // set jwt token to localstorage
      localStorage.setItem("token", data.accessToken);
      toast.success("Welcome back!");
      navigate({ to: "/dashboard/vehicles" });
    },
    onError: (error: Error) => {
      toast.error("Invalid email or password");
      console.log(error.message);
    },
  });

  const onSubmit = (data: LoginInput) => {
    mutation.mutate(data);
    reset();
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
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
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
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
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/auth/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
