import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon, PlusIcon } from "lucide-react";

export const Route = createFileRoute("/dashboard/packages/")({
    component: PackagePage,
});

function PackagePage() {
    return (
        <DashboardLayout>
            <div className="h-12 w-full flex items-center justify-between">
                <h2 className="scroll-m-20 text-2xl font-bold tracking-tight first:mt-0">
                    Packages
                </h2>
                <div className="flex gap-2">
                    <Button>
                        <PlusIcon />
                        Add package
                    </Button>
                    <Button>
                        <DownloadIcon />
                        Export
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
