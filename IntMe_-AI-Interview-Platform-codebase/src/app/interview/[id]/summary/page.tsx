"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Clock,
  Brain,
  Eye,
  MessageSquare,
  Lightbulb,
  Download,
  Mail,
  ChevronLeft,
  Award,
  Target
} from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function InterviewSummaryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const candidateId = params.id;
  const programId = searchParams.get("programId") || "1";

  // Mock candidate data
  const candidatesData: Record<string, any> = {
    "1": {
      name: "Alex Thompson",
      email: "alex.thompson@email.com",
      university: "MIT",
      degree: "Master's in CS",
      gpa: "3.95",
      photo: "AT",
      scores: {
        overall: 92,
        technical: 94,
        communication: 90,
        research: 95,
        leadership: 88,
        innovation: 91,
        consistency: 95,
        behavior: 88
      }
    },
    "2": {
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      university: "Stanford University",
      degree: "BS in Computer Science",
      gpa: "3.98",
      photo: "MG",
      scores: {
        overall: 95,
        technical: 96,
        communication: 94,
        research: 97,
        leadership: 92,
        innovation: 95,
        consistency: 93,
        behavior: 96
      }
    }
  };

  const candidate = candidatesData[candidateId as string] || candidatesData["1"];

  // Interview summary data
  const summaryData = {
    duration: "45:23",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    totalQuestions: 15,
    topicsDiscussed: 8
  };

  // Detailed evaluation
  const evaluations = [
    {
      icon: Brain,
      title: "CV Consistency",
      score: candidate.scores.consistency,
      color: "tech-blue",
      highlights: [
        { item: "Machine Learning Experience", status: "verified", confidence: 95 },
        { item: "Published Papers (5 papers)", status: "verified", confidence: 98 },
        { item: "Google ML Pipeline Project", status: "verified", confidence: 92 }
      ],
      summary: "All major CV highlights were thoroughly verified during the interview. Candidate provided specific details and examples that strongly support their claimed experience."
    },
    {
      icon: Lightbulb,
      title: "Technical Performance",
      score: candidate.scores.technical,
      color: "tech-cyan",
      highlights: [
        { item: "Deep Learning Frameworks", status: "excellent", confidence: 96 },
        { item: "Algorithm Design", status: "excellent", confidence: 94 },
        { item: "System Architecture", status: "good", confidence: 90 }
      ],
      summary: "Demonstrated strong technical depth with clear understanding of ML algorithms, efficient implementation strategies, and scalable system design."
    },
    {
      icon: Eye,
      title: "Behavior & Integrity",
      score: candidate.scores.behavior,
      color: "tech-red",
      highlights: [
        { item: "Eye Contact", status: "natural", confidence: 92 },
        { item: "Speech Pattern", status: "consistent", confidence: 88 },
        { item: "Stress Level", status: "normal", confidence: 85 }
      ],
      summary: "No integrity issues detected. Candidate maintained natural eye contact, consistent speech patterns, and appropriate stress levels throughout the interview.",
      integrityFlag: "passed"
    },
    {
      icon: MessageSquare,
      title: "Communication & Content",
      score: candidate.scores.communication,
      color: "tech-green",
      highlights: [
        { item: "Clarity of Expression", status: "excellent", confidence: 95 },
        { item: "Logical Structure (STAR)", status: "excellent", confidence: 92 },
        { item: "Technical Communication", status: "excellent", confidence: 94 }
      ],
      summary: "Excellent communication skills with clear articulation of complex technical concepts. Used STAR method effectively for behavioral questions."
    }
  ];

  // Key insights
  const keyInsights = [
    {
      icon: Award,
      title: "Top Strengths",
      items: [
        "Exceptional research background with 5 published papers",
        "Strong practical experience from Google ML pipeline project",
        "Clear technical communication and depth of knowledge",
        "Well-structured responses using STAR methodology"
      ]
    },
    {
      icon: Target,
      title: "Areas to Explore",
      items: [
        "Leadership experience in larger team settings",
        "Experience with cloud deployment at scale",
        "Cross-functional collaboration examples"
      ]
    }
  ];

  // Comparison with other candidates
  const comparisonData = {
    averageScore: 85,
    rank: 2,
    total: 5,
    percentile: 92
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-[var(--tech-green)]";
    if (score >= 80) return "text-[var(--tech-cyan)]";
    if (score >= 70) return "text-[var(--tech-blue)]";
    return "text-[var(--tech-red)]";
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      verified: "bg-[var(--tech-green)]/10 text-[var(--tech-green)] border-[var(--tech-green)]/30",
      excellent: "bg-[var(--tech-blue)]/10 text-[var(--tech-blue)] border-[var(--tech-blue)]/30",
      good: "bg-[var(--tech-cyan)]/10 text-[var(--tech-cyan)] border-[var(--tech-cyan)]/30",
      natural: "bg-[var(--tech-green)]/10 text-[var(--tech-green)] border-[var(--tech-green)]/30",
      consistent: "bg-[var(--tech-cyan)]/10 text-[var(--tech-cyan)] border-[var(--tech-cyan)]/30",
      normal: "bg-[var(--tech-blue)]/10 text-[var(--tech-blue)] border-[var(--tech-blue)]/30",
      passed: "bg-[var(--tech-green)]/10 text-[var(--tech-green)] border-[var(--tech-green)]/30"
    };
    return styles[status] || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-md bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] bg-clip-text text-transparent">
                IntMe!
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3">
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Export</span>
              </Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Send</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <Link href={`/program/${programId}`}>
          <Button variant="ghost" className="mb-3 sm:mb-4 text-sm h-8 sm:h-9">
            <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" />
            Back
          </Button>
        </Link>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Interview Summary</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Complete evaluation report for {candidate.name}</p>
        </motion.div>

        {/* Candidate Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 sm:p-6 mb-6 sm:mb-8 bg-gradient-to-br from-card to-secondary/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
                {candidate.photo}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">{candidate.name}</h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                  <span className="truncate">{candidate.email}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="truncate">{candidate.university}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="truncate">{candidate.degree}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="whitespace-nowrap">GPA: {candidate.gpa}</span>
                </div>
              </div>
              <div className="text-center sm:text-right flex-shrink-0">
                <div className="text-xs sm:text-sm text-muted-foreground mb-1">Overall Score</div>
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${getScoreColor(candidate.scores.overall)}`}>
                  {candidate.scores.overall}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Interview Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-6">
              <div className="text-center">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--tech-blue)] mx-auto mb-2" />
                <div className="text-xs text-muted-foreground mb-1">Duration</div>
                <div className="text-sm sm:text-base font-semibold">{summaryData.duration}</div>
              </div>
              <div className="text-center">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--tech-cyan)] mx-auto mb-2" />
                <div className="text-xs text-muted-foreground mb-1">Questions</div>
                <div className="text-sm sm:text-base font-semibold">{summaryData.totalQuestions}</div>
              </div>
              <div className="text-center">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--tech-purple)] mx-auto mb-2" />
                <div className="text-xs text-muted-foreground mb-1">Topics</div>
                <div className="text-sm sm:text-base font-semibold">{summaryData.topicsDiscussed}</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--tech-green)] mx-auto mb-2" />
                <div className="text-xs text-muted-foreground mb-1">Rank</div>
                <div className="text-sm sm:text-base font-semibold">{comparisonData.rank} / {comparisonData.total}</div>
              </div>
              <div className="text-center">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-xs text-muted-foreground mb-1">Percentile</div>
                <div className="text-sm sm:text-base font-semibold">{comparisonData.percentile}th</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Detailed Evaluations */}
        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          {evaluations.map((evaluation, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
            >
              <Card className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[var(--${evaluation.color})]/10 flex items-center justify-center flex-shrink-0`}>
                    <evaluation.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-[var(--${evaluation.color})]`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                      <h3 className="text-lg sm:text-xl font-semibold">{evaluation.title}</h3>
                      <div className="flex items-center gap-2 sm:gap-3">
                        {evaluation.integrityFlag && (
                          <Badge className={`${getStatusBadge(evaluation.integrityFlag)} text-xs`}>
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            No Issues
                          </Badge>
                        )}
                        <span className={`text-2xl sm:text-3xl font-bold ${getScoreColor(evaluation.score)}`}>
                          {evaluation.score}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{evaluation.summary}</p>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {evaluation.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="bg-secondary/30 rounded-lg p-2 sm:p-3">
                          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
                            <span className="font-medium text-xs sm:text-sm">{highlight.item}</span>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <Badge className={`${getStatusBadge(highlight.status)} text-xs whitespace-nowrap`}>
                                {highlight.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {highlight.confidence}% confidence
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {keyInsights.map((insight, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
            >
              <Card className="p-4 sm:p-6 h-full">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <insight.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--tech-blue)]" />
                  <h3 className="text-base sm:text-lg font-semibold">{insight.title}</h3>
                </div>
                <ul className="space-y-2">
                  {insight.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2 text-xs sm:text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--tech-green)] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison with Cohort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Performance vs Cohort Average</h3>
            <div className="space-y-3 sm:space-y-4">
              {Object.entries(candidate.scores).filter(([key]) => key !== "overall").map(([key, score], idx) => {
                const avgScore = comparisonData.averageScore;
                const diff = score - avgScore;
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="capitalize font-medium text-sm sm:text-base">{key}</span>
                      <div className="flex items-center gap-2 sm:gap-4">
                        <span className={`font-bold text-base sm:text-lg ${getScoreColor(score)}`}>{score}</span>
                        <span className={`text-xs sm:text-sm ${diff >= 0 ? "text-[var(--tech-green)]" : "text-[var(--tech-red)]"}`}>
                          {diff >= 0 ? "+" : ""}{diff} vs avg
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden relative">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                      />
                      <div 
                        className="absolute top-0 h-full w-0.5 bg-yellow-500"
                        style={{ left: `${avgScore}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center"
        >
          <Link href={`/candidate/${candidateId}?programId=${programId}`}>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm sm:text-base">
              View Full Profile
            </Button>
          </Link>
          <Link href={"/analytics?programId=" + programId}>
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white text-sm sm:text-base">
              Compare All Candidates
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}