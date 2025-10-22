"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

interface TourStep {
  target: string;
  title: string;
  description: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
}

interface TourConfig {
  [key: string]: TourStep[];
}

const tourSteps: Record<string, TourStep[]> = {
  "/": [
    {
      target: "hero",
      title: "Welcome to InvMe! 🎉",
      description: "Your AI-powered interview platform. Let's take a quick tour to get you started!",
      position: "center"
    },
    {
      target: "agents",
      title: "Four AI Agents",
      description: "Our platform uses four specialized AI agents to assist throughout the interview process: CV Consistency, Interview Guidance, Behavior Monitor, and Content Summary.",
      position: "top"
    },
    {
      target: "features",
      title: "Complete Interview Lifecycle",
      description: "From application screening to final analytics, manage your entire interview program in one place.",
      position: "top"
    }
  ],
  "/dashboard": [
    {
      target: "programs",
      title: "Your Programs",
      description: "View all your interview programs here. Click on any program to see candidates and manage interviews.",
      position: "center"
    }
  ],
  "/program/[id]": [
    {
      target: "candidates-list",
      title: "Candidates Overview",
      description: "Candidates are organized by status: pending (needs review), scheduled, interviewed, or rejected.",
      position: "top"
    },
    {
      target: "filters",
      title: "Filter & Sort",
      description: "Use filters to find specific candidates quickly. Sort by AI score, status, or other criteria.",
      position: "top"
    }
  ]
};

export default function OnboardingTour() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get steps for current page
  const getCurrentSteps = (): TourStep[] => {
    // Check for dynamic routes
    if (pathname.startsWith("/program/") && pathname !== "/program") {
      return tourSteps["/program/[id]"] || [];
    }
    if (pathname.startsWith("/candidate/")) {
      return tourSteps["/candidate/[id]"] || [];
    }
    if (pathname.startsWith("/interview/")) {
      return tourSteps["/interview/[id]"] || [];
    }
    return tourSteps[pathname] || [];
  };

  const steps = getCurrentSteps();

  useEffect(() => {
    // Check if user has seen tour for this specific page
    const tourCompleted = localStorage.getItem("onboarding-tour-completed");
    const pageKey = `onboarding-seen-${pathname}`;
    const pageViewed = sessionStorage.getItem(pageKey);
    
    // Show tour if: tour not completed globally AND this page not viewed in current session AND has steps
    if (!tourCompleted && !pageViewed && steps.length > 0) {
      // Small delay for better UX
      setTimeout(() => {
        setIsActive(true);
        setCurrentStep(0);
      }, 500);
      
      // Mark this page as viewed in current session
      sessionStorage.setItem(pageKey, "true");
    }
  }, [pathname, steps.length]);

  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        completeTour();
      }
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const completeTour = () => {
    localStorage.setItem("onboarding-tour-completed", "true");
    setIsActive(false);
  };

  const skipTour = () => {
    completeTour();
  };

  if (!isActive || steps.length === 0) {
    return null;
  }

  const currentStepData = steps[currentStep];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Tour Card - Always centered */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="fixed z-[9999] max-w-md left-1/2 top-1/2"
          style={{
            transform: "translate(-50%, -50%)"
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-6 bg-gradient-to-br from-background to-secondary/50 border-[var(--tech-cyan)]/30 shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--tech-cyan)]/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[var(--tech-blue)]/10 rounded-full blur-2xl" />

            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 rounded-full"
              onClick={skipTour}
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Content */}
            <div className="relative">
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold mb-2">{currentStepData.title}</h3>
              <p className="text-muted-foreground mb-6">{currentStepData.description}</p>

              {/* Progress indicator */}
              <div className="flex items-center gap-2 mb-6">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      index === currentStep
                        ? "bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)]"
                        : index < currentStep
                        ? "bg-[var(--tech-cyan)]/50"
                        : "bg-border"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </div>
                <div className="flex gap-2">
                  {currentStep > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePrevious}
                      disabled={isTransitioning}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Back
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white"
                    onClick={handleNext}
                    disabled={isTransitioning}
                  >
                    {currentStep < steps.length - 1 ? (
                      <>
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </>
                    ) : (
                      "Finish"
                    )}
                  </Button>
                </div>
              </div>

              {/* Skip option */}
              <button
                onClick={skipTour}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-4 block w-full text-center"
              >
                Skip tour
              </button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </>
  );
}