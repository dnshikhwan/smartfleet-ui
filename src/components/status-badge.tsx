import { Badge } from "./ui/badge";

enum VehicleStatus {
    AVAILABLE = "available",
    IN_USE = "in_use",
    MAINTENANCE = "maintenance",
}

type StatusBadgeProps = {
    status: string;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    if (status === VehicleStatus.AVAILABLE)
        return <Badge className="bg-green-800 text-white">Available</Badge>;
    if (status === VehicleStatus.IN_USE)
        return <Badge variant={"destructive"}>In Use</Badge>;
    return <Badge className="bg-yellow-700 text-white">Maintenance</Badge>;
}
