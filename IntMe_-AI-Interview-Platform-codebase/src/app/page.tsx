"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Brain, Shield, Sparkles, Target, Users, Video, BarChart3, CheckCircle2, ArrowRight, Zap, Eye, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Pre-computed agent classes
  const agents = [
    { 
      icon: CheckCircle2, 
      title: "CV Consistency", 
      desc: "Real-time verification",
      cardClass: "p-4 sm:p-6 bg-gradient-to-br from-card to-secondary/20 border-[var(--tech-blue)]/20 hover:border-[var(--tech-blue)]/50 transition-all duration-300",
      iconBgClass: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[var(--tech-blue)]/10 flex items-center justify-center mb-3 sm:mb-4",
      iconClass: "w-5 h-5 sm:w-6 sm:h-6 text-[var(--tech-blue)]"
    },
    { 
      icon: Brain, 
      title: "Interview Guidance", 
      desc: "Smart suggestions",
      cardClass: "p-4 sm:p-6 bg-gradient-to-br from-card to-secondary/20 border-[var(--tech-cyan)]/20 hover:border-[var(--tech-cyan)]/50 transition-all duration-300",
      iconBgClass: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[var(--tech-cyan)]/10 flex items-center justify-center mb-3 sm:mb-4",
      iconClass: "w-5 h-5 sm:w-6 sm:h-6 text-[var(--tech-cyan)]"
    },
    { 
      icon: Eye, 
      title: "Behavior Monitor", 
      desc: "Integrity tracking",
      cardClass: "p-4 sm:p-6 bg-gradient-to-br from-card to-secondary/20 border-[var(--tech-red)]/20 hover:border-[var(--tech-red)]/50 transition-all duration-300",
      iconBgClass: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[var(--tech-red)]/10 flex items-center justify-center mb-3 sm:mb-4",
      iconClass: "w-5 h-5 sm:w-6 sm:h-6 text-[var(--tech-red)]"
    },
    { 
      icon: MessageSquare, 
      title: "Content Summary", 
      desc: "AI transcription",
      cardClass: "p-4 sm:p-6 bg-gradient-to-br from-card to-secondary/20 border-[var(--tech-green)]/20 hover:border-[var(--tech-green)]/50 transition-all duration-300",
      iconBgClass: "w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[var(--tech-green)]/10 flex items-center justify-center mb-3 sm:mb-4",
      iconClass: "w-5 h-5 sm:w-6 sm:h-6 text-[var(--tech-green)]"
    }
  ];

  // Pre-computed feature classes
  const features = [
    {
      icon: Users,
      title: "Smart Screening",
      desc: "AI-powered CV parsing and ranking with intelligent pre-screening",
      iconBgClass: "w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[var(--tech-blue)]/10 flex items-center justify-center mb-4",
      iconClass: "w-6 h-6 sm:w-7 sm:h-7 text-[var(--tech-blue)]"
    },
    {
      icon: Video,
      title: "Live Interview Support",
      desc: "Four AI agents working in real-time during video interviews",
      iconBgClass: "w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[var(--tech-cyan)]/10 flex items-center justify-center mb-4",
      iconClass: "w-6 h-6 sm:w-7 sm:h-7 text-[var(--tech-cyan)]"
    },
    {
      icon: BarChart3,
      title: "3D Analytics",
      desc: "Advanced visualizations with contour plots and performance metrics",
      iconBgClass: "w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[var(--tech-purple)]/10 flex items-center justify-center mb-4",
      iconClass: "w-6 h-6 sm:w-7 sm:h-7 text-[var(--tech-purple)]"
    },
    {
      icon: Shield,
      title: "Fairness Monitoring",
      desc: "Bias detection and rubric calibration for equitable evaluation",
      iconBgClass: "w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[var(--tech-green)]/10 flex items-center justify-center mb-4",
      iconClass: "w-6 h-6 sm:w-7 sm:h-7 text-[var(--tech-green)]"
    },
    {
      icon: Target,
      title: "Integrity Tracking",
      desc: "Real-time cheating detection and behavioral analysis",
      iconBgClass: "w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[var(--tech-red)]/10 flex items-center justify-center mb-4",
      iconClass: "w-6 h-6 sm:w-7 sm:h-7 text-[var(--tech-red)]"
    },
    {
      icon: Sparkles,
      title: "Automated Workflow",
      desc: "Seamless scheduling, reminders, and candidate communication",
      iconBgClass: "w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[var(--tech-cyan)]/10 flex items-center justify-center mb-4",
      iconClass: "w-6 h-6 sm:w-7 sm:h-7 text-[var(--tech-cyan)]"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-md bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] rounded-lg flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] bg-clip-text text-transparent">
                IntMe
              </span>
            </motion.div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <Button 
                variant="ghost" 
                className="text-xs sm:text-sm px-2 sm:px-4"
                onClick={() => router.push("/apply")}
              >
                <span className="hidden xs:inline">Apply as </span>Candidate
              </Button>
              <Button 
                className="bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white hover:opacity-90 text-xs sm:text-sm px-3 sm:px-4"
                onClick={() => router.push("/dashboard")}
              >
                <span className="hidden xs:inline">Interviewer </span>Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-3 sm:mb-4 bg-[var(--tech-blue)]/10 text-[var(--tech-blue)] border-[var(--tech-blue)]/20 text-xs sm:text-sm">
                Powered by IBM Watsonx AI
              </Badge>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[var(--tech-blue)] via-[var(--tech-cyan)] to-[var(--tech-purple)] bg-clip-text text-transparent leading-tight px-2">
                AI-Powered Interview Platform
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                Transform your recruitment process with intelligent screening, real-time AI assistance, and comprehensive fairness monitoring
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white hover:opacity-90 text-base sm:text-lg px-6 sm:px-8 h-11 sm:h-12"
                  onClick={() => router.push("/dashboard")}
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-base sm:text-lg px-6 sm:px-8 h-11 sm:h-12"
                  onClick={() => router.push("/demo")}
                >
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Floating AI Agents Preview */}
          <motion.div 
            className="mt-12 sm:mt-16 lg:mt-20 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {agents.map((agent, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="h-full"
                >
                  <Card className={agent.cardClass + " h-full"}>
                    <div className={agent.iconBgClass}>
                      <agent.icon className={agent.iconClass} />
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">{agent.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{agent.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[var(--tech-blue)]/5 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[var(--tech-cyan)]/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Complete Interview Lifecycle</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">From application to final decision, powered by AI</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 sm:p-8 h-full hover:shadow-lg transition-shadow duration-300">
                  <div className={feature.iconBgClass}>
                    <feature.icon className={feature.iconClass} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] mb-4 sm:mb-6">
              <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 px-4">Ready to Transform Your Interviews?</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 px-4">
              Join leading educational institutions using AI-powered interview intelligence
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white hover:opacity-90 text-base sm:text-lg px-6 sm:px-8 h-11 sm:h-12"
              onClick={() => router.push("/dashboard")}
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm sm:text-base">
          <p>&copy; 2024 IntMe! All rights reserved. Powered by IBM Watsonx AI</p>
        </div>
      </footer>
    </div>
  );
}