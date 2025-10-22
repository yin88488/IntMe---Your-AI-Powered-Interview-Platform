"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Brain, Play, ArrowLeft, CheckCircle2, Eye, MessageSquare, Lightbulb, BarChart3, Users, Shield } from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
  const features = [
    {
      icon: CheckCircle2,
      title: "CV Consistency Verification",
      desc: "Real-time verification of candidate claims against resume",
      demo: "Live confidence scoring and highlight validation",
      color: "tech-blue"
    },
    {
      icon: Lightbulb,
      title: "AI Interview Guidance",
      desc: "Smart question suggestions based on rubric and CV",
      demo: "Dynamic question prioritization and adaptive optimization",
      color: "tech-cyan"
    },
    {
      icon: Eye,
      title: "Behavior & Integrity Monitor",
      desc: "Emotion tracking, stress analysis, and cheating detection",
      demo: "Real-time behavioral analytics with warning system",
      color: "tech-red"
    },
    {
      icon: MessageSquare,
      title: "Content Summary Agent",
      desc: "Automatic transcription and timestamped summaries",
      demo: "Searchable interview content with jump-to-video",
      color: "tech-green"
    },
    {
      icon: BarChart3,
      title: "3D Analytics Dashboard",
      desc: "Advanced performance visualization with contour plots",
      demo: "Interactive candidate comparison and ranking",
      color: "tech-purple"
    },
    {
      icon: Shield,
      title: "Fairness Monitoring",
      desc: "Bias detection and rubric calibration system",
      demo: "Statistical analysis of evaluation patterns",
      color: "tech-cyan"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-md bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] bg-clip-text text-transparent">
                IntMe!
              </span>
            </Link>
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[var(--tech-blue)]/10 text-[var(--tech-blue)] border-[var(--tech-blue)]/20">
            Platform Demo
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--tech-blue)] via-[var(--tech-cyan)] to-[var(--tech-purple)] bg-clip-text text-transparent">
            Experience the Future of Interviews
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            See how IntMe transforms the entire interview lifecycle with AI-powered intelligence, 
            from initial screening to final evaluation
          </p>
          
          {/* Video Demo Placeholder */}
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-black to-[var(--tech-blue)]/10 border-[var(--tech-blue)]/20">
            <div className="aspect-video bg-gradient-to-br from-[var(--tech-blue)]/20 to-[var(--tech-cyan)]/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] flex items-center justify-center cursor-pointer"
                >
                  <Play className="w-10 h-10 text-white ml-1" />
                </motion.div>
                <p className="text-white text-lg font-semibold">Watch Full Platform Demo</p>
                <p className="text-white/60 text-sm mt-2">5:30 minutes</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const iconBgClass = `w-14 h-14 rounded-xl bg-[var(--${feature.color})]/10 flex items-center justify-center mb-4`;
              const iconClass = `w-7 h-7 text-[var(--${feature.color})]`;
              const badgeClass = `bg-[var(--${feature.color})]/10 text-[var(--${feature.color})] border-[var(--${feature.color})]/20`;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all">
                    <div className={iconBgClass}>
                      <feature.icon className={iconClass} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{feature.desc}</p>
                    <Badge className={badgeClass}>
                      {feature.demo}
                    </Badge>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Process Flow */}
        <Card className="p-12 bg-gradient-to-br from-secondary/50 to-background mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">End-to-End Interview Process</h2>
          <div className="space-y-8">
            {[
              {
                step: 1,
                title: "Application & Intake",
                desc: "Candidates submit CV and materials through unified portal",
                features: ["Automatic de-duplication", "Virus scanning", "Secure storage"]
              },
              {
                step: 2,
                title: "AI Pre-Screening",
                desc: "Intelligent CV parsing and ranking based on program rubric",
                features: ["GPA normalization", "Achievement scoring", "Question generation"]
              },
              {
                step: 3,
                title: "Smart Scheduling",
                desc: "Automated outreach and interview coordination",
                features: ["Calendar integration", "Zoom link generation", "Reminder system"]
              },
              {
                step: 4,
                title: "Live Interview",
                desc: "Four AI agents monitoring and assisting in real-time",
                features: ["CV verification", "Behavior tracking", "Content transcription"]
              },
              {
                step: 5,
                title: "Post-Interview Analytics",
                desc: "3D visualizations and comprehensive candidate comparison",
                features: ["Performance metrics", "Bias analysis", "Fairness reports"]
              }
            ].map((process, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] flex items-center justify-center text-white font-bold text-lg">
                    {process.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                  <p className="text-muted-foreground mb-3">{process.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {process.features.map((f, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Time Saved", value: "75%", icon: CheckCircle2 },
            { label: "Accuracy Improvement", value: "40%", icon: BarChart3 },
            { label: "Bias Reduction", value: "65%", icon: Shield },
            { label: "User Satisfaction", value: "95%", icon: Users }
          ].map((stat, i) => {
            const cardClass = "p-6 bg-gradient-to-br from-card to-[var(--tech-blue)]/5 border-[var(--tech-blue)]/20";
            const iconClass = "w-8 h-8 text-[var(--tech-blue)]";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={cardClass}>
                  <stat.icon className={iconClass + " mb-4"} />
                  <div className="text-4xl font-bold text-[var(--tech-blue)] mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <Card className="p-12 text-center bg-gradient-to-r from-[var(--tech-blue)]/5 to-[var(--tech-cyan)]/5 border-[var(--tech-blue)]/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your interview process with AI-powered intelligence
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white">
                Try Live Demo
              </Button>
            </Link>
            <Link href="/apply">
              <Button size="lg" variant="outline">
                Apply as Candidate
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <footer className="py-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 IntMe! All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}