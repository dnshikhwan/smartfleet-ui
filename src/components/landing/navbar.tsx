"use client";

import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Moon, Sun, Menu } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-gradient-start to-gradient-end rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
              OptiTruck
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              onClick={() => navigate({ to: "/auth/signup" })}
              className="hidden md:inline-flex bg-gradient-to-r from-gradient-start to-gradient-end text-white hover:opacity-90"
            >
              Get Started
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            <a
              href="#features"
              className="block text-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="block text-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <Button className="w-full bg-gradient-to-r from-gradient-start to-gradient-end text-white">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
