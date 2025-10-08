import DashboardLayout from "@/components/dashboard-layout";
import { Loading } from "@/components/loading";
import StatusBadge from "@/components/status-badge";
import type { Vehicle } from "@/components/tables/vehicles/columns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Container, NotepadText } from "lucide-react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export const Route = createFileRoute("/dashboard/vehicles/$vehicleId")({
    component: VehicleDetailsPage,
});

async function getVehicleData(vehicleId: string): Promise<Vehicle> {
    const res = await fetch(`http://localhost:3000/vehicles/${vehicleId}`);
    return res.json();
}

function VehicleDetailsPage() {
    const { vehicleId } = Route.useParams();

    const { data: vehicleDetail, isLoading } = useQuery({
        queryKey: ["vehicle-detail", vehicleId],
        queryFn: () => getVehicleData(vehicleId),
    });

    const mountRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!mountRef.current) return;

        const containerWidth = mountRef.current.clientWidth;
        const containerHeight = mountRef.current.clientHeight;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);

        //   camera
        const camera = new THREE.PerspectiveCamera(
            45,
            containerWidth / containerHeight,
            0.1,
            1000
        );
        camera.position.set(10, 5, 5);

        //   renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerWidth, containerHeight);
        renderer.shadowMap.enabled = true;
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);

        // lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Grid helper to show ground plane
        const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0xcccccc);
        scene.add(gridHelper);

        // ground
        const groundGeometry = new THREE.PlaneGeometry(10, 10);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x808080,
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        scene.add(ground);

        // truck body
        const truckGroup = new THREE.Group();

        // truck floor
        const bedGeometry = new THREE.BoxGeometry(4, 0.1, 6);
        const bedMaterial = new THREE.MeshStandardMaterial({ color: 0x404040 });
        const bed = new THREE.Mesh(bedGeometry, bedMaterial);
        truckGroup.add(bed);

        // truck walls
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: 0x2196f3,
            transparent: true,
            opacity: 0.3,
        });

        const leftWall = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 3, 6),
            wallMaterial
        );
        leftWall.position.set(-1.95, 1.55, 0);
        truckGroup.add(leftWall);

        // Back wall
        const backWall = new THREE.Mesh(
            new THREE.BoxGeometry(3.81, 3, 0.1),
            wallMaterial
        );
        backWall.position.set(0, 1.55, -2.95);
        truckGroup.add(backWall);

        const rightWall = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 3, 6),
            wallMaterial
        );
        rightWall.position.set(1.95, 1.55, 0);
        truckGroup.add(rightWall);

        scene.add(truckGroup);

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize to keep canvas responsive
        const handleResize = () => {
            if (!mountRef.current) return;

            const newWidth = mountRef.current.clientWidth;
            const newHeight = mountRef.current.clientHeight;

            // Update camera aspect ratio
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();

            // Update renderer size
            renderer.setSize(newWidth, newHeight);
        };

        // Add resize listener
        window.addEventListener("resize", handleResize);

        const currentMount = mountRef.current;

        return () => {
            window.removeEventListener("resize", handleResize);
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }
            controls.dispose();
            renderer.dispose();
        };
    }, [isLoading]);

    if (isLoading) return <Loading />;

    return (
        <DashboardLayout>
            <div className="flex justify-between">
                <h2 className="scroll-m-20 text-2xl font-bold tracking-tight flex items-center gap-3 first:mt-0">
                    {vehicleDetail?.name}
                    <StatusBadge status={vehicleDetail?.status || ""} />
                </h2>
                <div className="space-x-2">
                    <Button variant={"outline"}>Schedule Maintenance</Button>
                    <Button>Edit Details</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="w-full grid gap-5">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <NotepadText className="w-5" /> Basic
                                Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                                <div className="flex justify-between">
                                    <div className="">Plate Number</div>
                                    <div>{vehicleDetail?.plate_number}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="">Type</div>
                                    <div>{vehicleDetail?.type}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="">Fuel Type</div>
                                    <div>{vehicleDetail?.fuelType}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Container className="w-5" /> Cargo
                                Specifications
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                                <div className="flex justify-between">
                                    <div className="">Length</div>
                                    <div>{vehicleDetail?.cargoLength} m</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="">Width</div>
                                    <div>{vehicleDetail?.cargoWidth} m</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="">Height</div>
                                    <div>{vehicleDetail?.cargoHeight} m</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="">Volume</div>
                                    <div>
                                        {vehicleDetail?.volume} m<sup>3</sup>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="">Max Weight</div>
                                    <div>{vehicleDetail?.maxWeight} kg</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Vehicle Container 3D Model</CardTitle>
                        <CardDescription>
                            Try to interact with the model
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div
                            ref={mountRef}
                            className="w-full h-[500px]  rounded-xl overflow-hidden"
                        />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
