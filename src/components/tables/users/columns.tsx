import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import type { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  lastLoginAt: Date;
  role: "admin" | "dispatcher" | "driver";
};

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");
      if (isActive) return <div>Active</div>;
      return <div>Inactive</div>;
    },
  },
  {
    accessorKey: "lastLoginAt",
    header: "Last Login",
    cell: ({ row }) => {
      const lastLoginAt: Date = row.getValue("lastLoginAt");
      if (lastLoginAt) {
        const result = formatDistanceToNow(lastLoginAt);
        return <div>{result} ago</div>;
      }
      return <div>...</div>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const value = row.getValue("role");
      if (value === "admin")
        return <Badge className="bg-green-600">Admin</Badge>;
      if (value === "dispatcher")
        return <Badge className="bg-yellow-600">Dispatcher</Badge>;
      return <Badge className="bg-indigo-600">Driver</Badge>;
    },
  },
];
