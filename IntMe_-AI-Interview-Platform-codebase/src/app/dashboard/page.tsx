"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Users, 
  Clock, 
  CheckCircle2,
  Search,
  Settings,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  // Updated programs data - 14 candidates total distributed across 6 programs
  const programs = [
    {
      id: 1,
      name: "Computer Science Master's 2025",
      description: "Master's program in Computer Science with focus on AI and Machine Learning",
      coordinator: "Dr. Sarah Chen",
      deadline: "2025-03-15",
      totalApplicants: 14,
      interviewed: 6,
      pending: 5,
      rejected: 0,
      status: "active",
      type: "Master's"
    },
    {
      id: 2,
      name: "Data Science Master's 2025",
      description: "Master's program specializing in Data Science and Analytics",
      coordinator: "Prof. Michael Wong",
      deadline: "2025-04-01",
      totalApplicants: 14,
      interviewed: 6,
      pending: 5,
      rejected: 0,
      status: "active",
      type: "Master's"
    },
    {
      id: 3,
      name: "Software Engineering Master's 2025",
      description: "Master's program focusing on advanced software development and architecture",
      coordinator: "Dr. Jennifer Liu",
      deadline: "2025-03-20",
      totalApplicants: 14,
      interviewed: 6,
      pending: 5,
      rejected: 0,
      status: "active",
      type: "Master's"
    },
    {
      id: 4,
      name: "Artificial Intelligence Master's 2025",
      description: "Specialized Master's program in AI, Machine Learning, and Deep Learning",
      coordinator: "Prof. David Park",
      deadline: "2025-04-10",
      totalApplicants: 14,
      interviewed: 6,
      pending: 5,
      rejected: 0,
      status: "active",
      type: "Master's"
    },
    {
      id: 5,
      name: "Cybersecurity Master's 2025",
      description: "Master's program specializing in network security and cryptography",
      coordinator: "Dr. Amanda Foster",
      deadline: "2025-03-25",
      totalApplicants: 14,
      interviewed: 6,
      pending: 5,
      rejected: 0,
      status: "active",
      type: "Master's"
    },
    {
      id: 6,
      name: "Computer Science PhD 2025",
      description: "Doctoral program in Computer Science research with focus on advanced topics",
      coordinator: "Prof. Robert Martinez",
      deadline: "2025-02-15",
      totalApplicants: 14,
      interviewed: 6,
      pending: 5,
      rejected: 0,
      status: "active",
      type: "PhD"
    }
  ];

  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.coordinator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate totals
  const totalPrograms = programs.length;
  const totalApplicants = programs.reduce((sum, p) => sum + p.totalApplicants, 0);
  const totalInterviewed = programs.reduce((sum, p) => sum + p.interviewed, 0);
  const totalPending = programs.reduce((sum, p) => sum + p.pending, 0);

  const statsData = [
    { 
      label: "Active Programs", 
      value: totalPrograms, 
      icon: GraduationCap,
      cardClass: "p-4 sm:p-6 bg-gradient-to-br from-card to-[var(--tech-blue)]/5 border-[var(--tech-blue)]/20",
      iconClass: "w-6 h-6 sm:w-8 sm:h-8 text-[var(--tech-blue)]",
      trendClass: "w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-blue)]/50"
    },
    { 
      label: "Total Applicants", 
      value: totalApplicants, 
      icon: Users,
      cardClass: "p-4 sm:p-6 bg-gradient-to-br from-card to-[var(--tech-cyan)]/5 border-[var(--tech-cyan)]/20",
      iconClass: "w-6 h-6 sm:w-8 sm:h-8 text-[var(--tech-cyan)]",
      trendClass: "w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-cyan)]/50"
    },
    { 
      label: "Interviews Completed", 
      value: totalInterviewed, 
      icon: CheckCircle2,
      cardClass: "p-4 sm:p-6 bg-gradient-to-br from-card to-[var(--tech-green)]/5 border-[var(--tech-green)]/20",
      iconClass: "w-6 h-6 sm:w-8 sm:h-8 text-[var(--tech-green)]",
      trendClass: "w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-green)]/50"
    },
    { 
      label: "Pending Review", 
      value: totalPending, 
      icon: Clock,
      cardClass: "p-4 sm:p-6 bg-gradient-to-br from-card to-[var(--tech-purple)]/5 border-[var(--tech-purple)]/20",
      iconClass: "w-6 h-6 sm:w-8 sm:h-8 text-[var(--tech-purple)]",
      trendClass: "w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-purple)]/50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-md bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] bg-clip-text text-transparent">
                IntMe
              </span>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Settings className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden xs:inline">Settings</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Page Title */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">Interviewer Dashboard</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Manage your interview programs and track candidate progress</p>
        </div>

        {/* Stats Overview - 2x2 grid on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
          {statsData.map((stat, idx) => (
            <Card key={idx} className={stat.cardClass}>
              <div className="flex items-start justify-between mb-2 sm:mb-4">
                <stat.icon className={stat.iconClass} />
                <TrendingUp className={stat.trendClass} />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1">{stat.value}</div>
              <div className="text-[10px] sm:text-xs lg:text-sm text-muted-foreground leading-tight">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-4 sm:mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredPrograms.map((program) => {
            const interviewProgress = (program.interviewed / program.totalApplicants) * 100;
            
            return (
              <Card key={program.id} className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold break-words">{program.name}</h3>
                      <Badge variant="outline" className="text-[10px] sm:text-xs whitespace-nowrap">
                        {program.type}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">{program.description}</p>
                    <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 text-xs sm:text-sm text-muted-foreground">
                      <span className="truncate">👤 {program.coordinator}</span>
                      <span className="whitespace-nowrap">📅 {new Date(program.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge className="bg-[var(--tech-green)]/10 text-[var(--tech-green)] border-[var(--tech-green)]/30 text-[10px] sm:text-xs whitespace-nowrap">
                    {program.status}
                  </Badge>
                </div>

                {/* Stats - 2x2 grid on mobile, 4 columns on larger screens */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="text-center p-2 sm:p-3 bg-secondary/30 rounded-lg">
                    <div className="text-base sm:text-lg font-semibold">{program.totalApplicants}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Total</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-[var(--tech-green)]/5 rounded-lg">
                    <div className="text-base sm:text-lg font-semibold text-[var(--tech-green)]">{program.interviewed}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Done</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-[var(--tech-blue)]/5 rounded-lg">
                    <div className="text-base sm:text-lg font-semibold text-[var(--tech-blue)]">{program.pending}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Pending</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-[var(--tech-red)]/5 rounded-lg">
                    <div className="text-base sm:text-lg font-semibold text-[var(--tech-red)]">{program.rejected}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Rejected</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-center justify-between text-xs sm:text-sm mb-1.5 sm:mb-2">
                    <span className="text-muted-foreground">Interview Progress</span>
                    <span className="font-semibold">{Math.round(interviewProgress)}%</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] transition-all duration-500"
                      style={{ width: `${interviewProgress}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 sm:gap-3">
                  <Link href={`/program/${program.id}?status=all`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white hover:opacity-90 h-9 sm:h-10 text-xs sm:text-sm">
                      <span className="hidden xs:inline">View Candidates</span>
                      <span className="xs:hidden">View</span>
                      <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-sm sm:text-base text-muted-foreground">No programs found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}