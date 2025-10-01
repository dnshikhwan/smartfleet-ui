import DashboardLayout from "@/components/dashboard-layout";
import { Loading } from "@/components/loading";
import { TotalUsersStatsCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DownloadIcon, PlusIcon } from "lucide-react";

export const Route = createFileRoute("/dashboard/users/")({
  component: UsersPage,
});

// get total user
async function getTotalUser() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3000/users/total", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

function UsersPage() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryFn: getTotalUser,
    queryKey: ["total-user"],
  });

  if (isLoading) return <Loading />;

  return (
    <DashboardLayout>
      <div className="h-12 w-full flex items-center justify-between">
        <h2 className="scroll-m-20 text-2xl font-bold tracking-tight first:mt-0">
          Users
        </h2>
        <div className="flex gap-2">
          <Button onClick={() => navigate({ to: "/dashboard/users/create" })}>
            <PlusIcon />
            Add user
          </Button>
          <Button>
            <DownloadIcon />
            Export
          </Button>
        </div>
      </div>
      <div className="w-full grid lg:grid-cols-4 gap-4 ">
        <TotalUsersStatsCard
          value={data?.count}
          trend={{ value: "+12.5%", isPositive: true }}
        />
      </div>
    </DashboardLayout>
  );
}
