import { DataTable } from "@/components/ui/data-table";
import { userColumns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/loading";

async function getUserData() {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/users", {
        headers: { Authorization: `Bearer ${token}` },
    });

    return res.json();
}

export default function UserTable() {
    const { data, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: getUserData,
    });

    if (isLoading) return <Loading />;

    return (
        <div className="w-full">
            <DataTable columns={userColumns} data={data} filterColumn="name" />
        </div>
    );
}
