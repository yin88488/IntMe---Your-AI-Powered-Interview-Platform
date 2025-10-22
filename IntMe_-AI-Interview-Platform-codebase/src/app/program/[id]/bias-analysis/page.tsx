"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  ChevronLeft,
  Download,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Eye,
  MessageSquare,
  Users,
  BarChart3,
  Info
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface BiasInsight {
  id: string;
  category: string;
  tendency: string;
  strength: "high" | "moderate" | "low";
  description: string;
  evidence: Array<{
    candidate: string;
    score: number;
    excerpt: string;
    timestamp: string;
  }>;
  recommendation: string;
}

export default function BiasAnalysisPage() {
  const params = useParams();
  const programId = params.id;
  
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  // Mock bias analysis data
  const biasInsights: BiasInsight[] = [
    {
      id: "1",
      category: "Educational Background",
      tendency: "Slight preference for candidates from top-tier universities",
      strength: "moderate",
      description: "Analysis shows a pattern where candidates from highly-ranked institutions (MIT, Stanford, Cambridge) received consistently higher scores across multiple evaluation criteria, even when technical performance was similar.",
      evidence: [
        {
          candidate: "Sarah Chen (MIT)",
          score: 96,
          excerpt: "Interviewer comment: 'Very impressive background from MIT. Strong fundamentals as expected from top-tier education.'",
          timestamp: "Interview #1, 15:23"
        },
        {
          candidate: "Olivia Zhang (Oxford)",
          score: 92,
          excerpt: "Interviewer comment: 'Oxford background shows excellent academic rigor. Clear systematic thinking.'",
          timestamp: "Interview #7, 22:45"
        },
        {
          candidate: "Benjamin Park (KAIST)",
          score: 79,
          excerpt: "Interviewer comment: 'Solid technical skills, though background is less familiar to me.'",
          timestamp: "Interview #16, 18:30"
        }
      ],
      recommendation: "Consider evaluating candidates primarily on demonstrated skills and project outcomes rather than institutional prestige. Ensure equal probing depth across all candidates."
    },
    {
      id: "2",
      category: "Communication Style",
      tendency: "Higher ratings for candidates with structured STAR-method responses",
      strength: "high",
      description: "Candidates who used the STAR (Situation, Task, Action, Result) framework consistently received higher communication scores, even when content depth was comparable to less-structured responses.",
      evidence: [
        {
          candidate: "David Thompson",
          score: 94,
          excerpt: "Interviewer note: 'Excellent structure in responses. Each answer clearly outlined situation, approach, and outcomes.'",
          timestamp: "Interview #6, 12:15"
        },
        {
          candidate: "Emma Lee",
          score: 87,
          excerpt: "Interviewer note: 'Good technical knowledge but responses could be more organized. Sometimes jumped between topics.'",
          timestamp: "Interview #9, 19:40"
        }
      ],
      recommendation: "While structured communication is valuable, ensure technical depth and creativity are weighted appropriately. Some innovative thinkers may have less linear communication patterns."
    },
    {
      id: "3",
      category: "Research Publication Impact",
      tendency: "Strong emphasis on publication venue prestige",
      strength: "high",
      description: "Research experience was evaluated with significant weight on publication venue (e.g., ICML, NeurIPS) rather than the novelty or practical impact of the research itself.",
      evidence: [
        {
          candidate: "Sarah Chen",
          score: 96,
          excerpt: "Interviewer comment: 'Published in ICML - that's top-tier. Research quality speaks for itself.'",
          timestamp: "Interview #1, 25:10"
        },
        {
          candidate: "Alexander Wang",
          score: 74,
          excerpt: "Interviewer comment: 'Research looks interesting but not published in major conferences I'm familiar with.'",
          timestamp: "Interview #10, 21:30"
        }
      ],
      recommendation: "Consider the research contribution itself, methodology rigor, and potential impact. Emerging researchers may have valuable work in specialized or regional venues."
    },
    {
      id: "4",
      category: "Technical Depth vs. Breadth",
      tendency: "Preference for deep specialization over broad skill sets",
      strength: "moderate",
      description: "Pattern shows higher technical scores for candidates with deep expertise in specific areas (e.g., deep learning) compared to those with broader but less specialized technical backgrounds.",
      evidence: [
        {
          candidate: "Emily Wang",
          score: 91,
          excerpt: "Interviewer note: 'Deep expertise in ML pipelines. Really knows the ins and outs of model optimization.'",
          timestamp: "Interview #3, 16:50"
        },
        {
          candidate: "Lucas Brown",
          score: 82,
          excerpt: "Interviewer note: 'Knows a lot of different technologies but not sure about depth in any particular area.'",
          timestamp: "Interview #8, 14:20"
        }
      ],
      recommendation: "Balance depth and breadth based on program needs. Some roles benefit from versatility and ability to work across domains."
    },
    {
      id: "5",
      category: "Response Confidence Level",
      tendency: "Higher scores for confident delivery even with similar content quality",
      strength: "low",
      description: "Subtle pattern where candidates who expressed higher confidence in their responses received marginally better scores, independent of technical accuracy.",
      evidence: [
        {
          candidate: "Isabella Garcia",
          score: 95,
          excerpt: "Interviewer note: 'Very confident in technical decisions. Speaks with authority about design choices.'",
          timestamp: "Interview #11, 20:15"
        },
        {
          candidate: "Ethan Liu",
          score: 84,
          excerpt: "Interviewer note: 'Technically solid but seemed uncertain when explaining some decisions.'",
          timestamp: "Interview #14, 17:45"
        }
      ],
      recommendation: "Distinguish between genuine confidence from experience and communication style. Some excellent candidates may be more thoughtful/cautious in their expression."
    }
  ];

  const getStrengthColor = (strength: string) => {
    const colors = {
      high: "text-[var(--tech-red)]",
      moderate: "text-yellow-600",
      low: "text-[var(--tech-cyan)]"
    };
    return colors[strength as keyof typeof colors];
  };

  const getStrengthBadge = (strength: string) => {
    const badges = {
      high: "bg-[var(--tech-red)]/10 text-[var(--tech-red)] border-[var(--tech-red)]/30",
      moderate: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
      low: "bg-[var(--tech-cyan)]/10 text-[var(--tech-cyan)] border-[var(--tech-cyan)]/30"
    };
    return badges[strength as keyof typeof badges];
  };

  const handleExport = () => {
    // Generate report content
    const reportContent = `
INTERVIEWER BIAS ANALYSIS REPORT
Program: Computer Science Master's 2025
Generated: ${new Date().toLocaleDateString()}

===========================================
STATISTICAL INSIGHTS
===========================================

This report provides insights into potential evaluation patterns to support fair and consistent candidate assessment. These patterns are identified through AI analysis of interview data and are presented for reflection and continuous improvement.

${biasInsights.map((insight, idx) => `
${idx + 1}. ${insight.category}
   Observed Tendency: ${insight.tendency}
   Pattern Strength: ${insight.strength.toUpperCase()}
   
   Analysis:
   ${insight.description}
   
   Supporting Evidence:
   ${insight.evidence.map(e => `   - ${e.candidate} (Score: ${e.score})\n     "${e.excerpt}"\n     Context: ${e.timestamp}`).join('\n   ')}
   
   Recommendation:
   ${insight.recommendation}
`).join('\n')}

===========================================
DISCLAIMER
===========================================

This analysis is provided as a tool for self-reflection and improvement. The identified patterns are statistical observations and do not imply intentional bias. All interviewers naturally develop evaluation preferences based on their experience and expertise. 

The goal is to:
1. Increase awareness of unconscious patterns
2. Promote consistent evaluation across all candidates
3. Ensure diverse talent is recognized and valued
4. Support evidence-based decision making

Continue your excellent work in candidate evaluation while remaining mindful of these insights.
`;

    // Create and download file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bias-analysis-program-${programId}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--tech-blue)]/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-[var(--tech-cyan)]/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-md bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 sm:h-14 lg:h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] bg-clip-text text-transparent">
                InvMe!
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10">
        {/* Back Button */}
        <Link href={`/program/${programId}`}>
          <Button variant="ghost" className="mb-3 sm:mb-4 h-8 sm:h-9 text-xs sm:text-sm">
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Back to Program</span>
            <span className="xs:hidden">Back</span>
          </Button>
        </Link>

        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Evaluation Pattern Analysis
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
                AI-generated insights to support fair and consistent candidate evaluation
              </p>
            </div>
            <Button 
              onClick={handleExport} 
              className="bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white h-8 sm:h-9 lg:h-10 text-xs sm:text-sm shrink-0"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Export Report</span>
              <span className="xs:hidden">Export</span>
            </Button>
          </div>

          {/* Disclaimer Card */}
          <Card className="p-4 sm:p-6 bg-gradient-to-br from-[var(--tech-blue)]/5 to-[var(--tech-cyan)]/5 border-[var(--tech-blue)]/20">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--tech-blue)]/10 flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-blue)]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">About This Analysis</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  This report identifies statistical patterns in your evaluation data to promote awareness and consistency. 
                  These insights are provided as a tool for reflection and continuous improvement, not as criticism. 
                  All interviewers naturally develop preferences based on experience—awareness helps ensure fair assessment across diverse candidates.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--tech-blue)]/10 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-blue)]" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">16</div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  Candidates Analyzed
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--tech-cyan)]/10 flex items-center justify-center shrink-0">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-cyan)]" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">{biasInsights.length}</div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  Patterns Identified
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--tech-red)]/10 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-red)]" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">
                  {biasInsights.filter(i => i.strength === "high").length}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  High Strength
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">
                  {biasInsights.filter(i => i.strength === "moderate").length}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  Moderate Strength
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Insights List */}
        <div className="space-y-4 sm:space-y-6">
          {biasInsights.map((insight, idx) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div 
                  className="p-4 sm:p-6 cursor-pointer hover:bg-secondary/30 transition-colors"
                  onClick={() => setSelectedInsight(selectedInsight === insight.id ? null : insight.id)}
                >
                  <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 mb-2">
                        <Badge className={`${getStrengthBadge(insight.strength)} text-xs shrink-0`}>
                          {insight.strength.toUpperCase()}
                        </Badge>
                        <h3 className="text-base sm:text-lg lg:text-xl font-semibold truncate">
                          {insight.category}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                        {insight.tendency}
                      </p>
                      <p className="text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {insight.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 h-8 w-8 sm:h-9 sm:w-9 p-0"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>

                  {selectedInsight === insight.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border"
                    >
                      {/* Evidence Section */}
                      <div className="mb-4 sm:mb-6">
                        <h4 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                          <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--tech-blue)]" />
                          Supporting Evidence
                        </h4>
                        <div className="space-y-3">
                          {insight.evidence.map((evidence, eIdx) => (
                            <Card key={eIdx} className="p-3 sm:p-4 bg-secondary/30">
                              <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-2 sm:gap-3 mb-2">
                                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] flex items-center justify-center text-white text-xs sm:text-sm font-bold shrink-0">
                                    {evidence.candidate.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="font-medium text-xs sm:text-sm truncate">
                                      {evidence.candidate}
                                    </div>
                                    <div className="text-xs text-muted-foreground truncate">
                                      {evidence.timestamp}
                                    </div>
                                  </div>
                                </div>
                                <Badge variant="outline" className="text-xs shrink-0 self-start xs:self-auto">
                                  Score: {evidence.score}
                                </Badge>
                              </div>
                              <div className="bg-background/50 rounded p-2 sm:p-3 text-xs sm:text-sm italic">
                                "{evidence.excerpt}"
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Recommendation */}
                      <div className="bg-gradient-to-br from-[var(--tech-green)]/5 to-[var(--tech-cyan)]/5 rounded-lg p-3 sm:p-4 border border-[var(--tech-green)]/20">
                        <h4 className="font-semibold mb-2 flex items-center gap-2 text-[var(--tech-green)] text-sm sm:text-base">
                          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                          Recommendation
                        </h4>
                        <p className="text-xs sm:text-sm leading-relaxed">
                          {insight.recommendation}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <Card className="mt-6 sm:mt-8 p-4 sm:p-6 bg-secondary/20">
          <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
            This analysis is continuously updated as more interview data becomes available. 
            Regular review of these patterns helps maintain high standards of fair and objective evaluation. 
            For questions or concerns about this report, please contact the program administrator.
          </p>
        </Card>
      </div>
    </div>
  );
}