import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="flex gap-2">
        <Button onClick={() => navigate({ to: "/auth/login" })}>Login</Button>
        <Button onClick={() => navigate({ to: "/auth/signup" })}>
          Sign up
        </Button>
      </div>
    </div>
  );
}
