import { Card, CardContent } from "@/components/ui/card";
import { Package, Route, BarChart3, Zap, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "3D Load Optimization",
    description:
      "Advanced algorithms calculate the optimal arrangement of cargo, maximizing space utilization and ensuring load stability.",
  },
  {
    icon: Route,
    title: "Smart Route Planning",
    description:
      "AI-powered routing engine finds the most efficient paths considering traffic, distance, and delivery windows.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Comprehensive dashboards provide insights into fleet performance, fuel consumption, and delivery metrics.",
  },
  {
    icon: Zap,
    title: "Instant Calculations",
    description:
      "Get optimization results in seconds, not hours. Our high-performance engine handles complex scenarios effortlessly.",
  },
  {
    icon: Shield,
    title: "Load Safety Checks",
    description:
      "Automated weight distribution analysis ensures compliance with safety regulations and prevents overloading.",
  },
  {
    icon: Clock,
    title: "Time Window Management",
    description:
      "Optimize routes while respecting delivery time constraints and driver working hours.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto relative">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Modern Logistics
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Everything you need to streamline your logistics operations and
            maximize efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/50 hover:border-primary/50 transition-all duration-300 group bg-card/50 backdrop-blur-sm hover:shadow-[0_0_30px_rgba(59,130,245,0.2)]"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(59,130,245,0.3)] group-hover:shadow-[0_0_30px_rgba(59,130,245,0.5)]">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
