import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      <div className="container mx-auto relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-balance leading-tight">
            Optimize Your{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,245,0.5)]">
              Truck Loading
            </span>{" "}
            & Routing
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Revolutionary AI-powered platform that maximizes cargo space
            utilization and finds the most efficient delivery routes, saving
            time and reducing costs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 text-base px-8 shadow-[0_0_30px_rgba(59,130,245,0.4)] hover:shadow-[0_0_40px_rgba(59,130,245,0.6)] transition-all"
              onClick={() => navigate({ to: "/auth/signup" })}
            >
              Start Optimizing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 bg-transparent border-primary/30 hover:bg-primary/5"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,245,0.4)]">
                40%
              </div>
              <div className="text-sm text-muted-foreground">Space Saved</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,245,0.4)]">
                30%
              </div>
              <div className="text-sm text-muted-foreground">Faster Routes</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,245,0.4)]">
                25%
              </div>
              <div className="text-sm text-muted-foreground">
                Cost Reduction
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,245,0.4)]">
                99%
              </div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
