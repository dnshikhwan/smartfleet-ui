import DashboardLayout from "@/components/dashboard-layout";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Sparkles, ArrowRight, Zap, Settings } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/vehicles/create/")({
  component: CreateVehiclePage,
});

function CreateVehiclePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div className="relative  flex items-center justify-center p-6 overflow-hidden">
        <div className="relative w-full max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Manual Creation Card */}
            <Card
              className="relative p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group overflow-hidden"
              onMouseEnter={() => setHoveredCard("manual")}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() =>
                navigate({ to: "/dashboard/vehicles/create/manual" })
              }
            >
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Pencil className="w-7 h-7 text-foreground" />
                </div>

                <h2 className="text-2xl font-bold mb-4">Create Manually</h2>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Add vehicles manually with full control over their details.
                  Perfect when you need to register a few vehicles or test the
                  system setup.
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Settings className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      Enter vehicle information step by step
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Settings className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      Useful for testing or adding one-off vehicles
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Settings className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      Complete flexibility — no automation involved
                    </span>
                  </li>
                </ul>

                <Button
                  className="w-full group/btn bg-secondary hover:bg-secondary/80 text-foreground"
                  size="lg"
                  onClick={() =>
                    navigate({ to: "/dashboard/vehicles/create/manual" })
                  }
                >
                  Add
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>

            {/* AI Creation Card */}
            <Card
              className="relative p-8 bg-card border-border hover:border-teal-400/50 transition-all duration-300 cursor-pointer group overflow-hidden"
              onMouseEnter={() => setHoveredCard("ai")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-teal-500/25 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-7 h-7 text-green-300" />
                </div>

                <h2 className="text-2xl font-bold mb-4">Use AI</h2>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Let AI handle the heavy lifting and speed up vehicle
                  registration. Automatically extract details, get smart
                  suggestions, and minimize manual input.
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      Auto-fill vehicle details from documents or images
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      Get AI-powered recommendations for missing fields
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">
                      Save time by reducing repetitive data entry
                    </span>
                  </li>
                </ul>

                <Button
                  className="w-full group/btn bg-teal-600 hover:bg-teal/90 text-accent-foreground"
                  size="lg"
                >
                  Add with AI
                  <Sparkles className="w-4 h-4 ml-2 group-hover/btn:scale-110 transition-transform" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
