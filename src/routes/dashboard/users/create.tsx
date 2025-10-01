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
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { Controller } from "react-hook-form";

export const Route = createFileRoute("/dashboard/users/create")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <DashboardLayout>
            <div className="w-full xl:flex xl:justify-center">
                <div className="space-y-8 w-full xl:max-w-2xl">
                    <div className="w-full flex items-center gap-4">
                        <Button
                            onClick={() => history.back()}
                            variant={"outline"}
                        >
                            <ChevronLeftIcon />
                        </Button>
                        <h2 className="scroll-m-20 text-2xl font-bold tracking-tight first:mt-0">
                            Add User
                        </h2>
                        <div className="ml-auto hidden md:flex space-x-4">
                            <Button variant={"secondary"}>Save Draft</Button>
                            <Button>Create</Button>
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
                                        <Input type="text" id="name" required />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Input
                                            type="password"
                                            id="password"
                                            required
                                            autoComplete="new-password"
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label>Role</Label>
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a user role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">
                                                    Admin
                                                </SelectItem>
                                                <SelectItem value="dispatcher">
                                                    Dispatcher
                                                </SelectItem>
                                                <SelectItem value="driver">
                                                    Driver
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
