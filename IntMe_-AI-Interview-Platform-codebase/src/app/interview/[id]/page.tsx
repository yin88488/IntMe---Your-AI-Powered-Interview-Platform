"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, CheckCircle2, Eye, MessageSquare, Video, Minimize2, Maximize2, X, AlertTriangle, TrendingUp, Clock, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

// Pre-computed agent classes
const agentStyles = {
  "tech-blue": {
    cardClass: "bg-black/90 border-[var(--tech-blue)]/30 hover:border-[var(--tech-blue)]/60",
    bgGradient: "absolute inset-0 bg-gradient-to-br from-[var(--tech-blue)]/30 to-transparent animate-pulse-glow",
    bgOverlay: "absolute inset-0 bg-gradient-to-t from-[var(--tech-blue)]/20 to-transparent",
    iconBg: "w-10 h-10 rounded-lg bg-[var(--tech-blue)]/20 flex items-center justify-center",
    iconClass: "w-5 h-5 text-[var(--tech-blue)]",
    badge: "bg-[var(--tech-blue)]/20 text-[var(--tech-blue)] border-[var(--tech-blue)]/30",
    textColor: "text-[var(--tech-blue)]",
    scoreColor: "text-2xl font-bold text-[var(--tech-blue)]",
    progressBar: "h-full bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)]"
  },
  "tech-cyan": {
    cardClass: "bg-black/90 border-[var(--tech-cyan)]/30 hover:border-[var(--tech-cyan)]/60",
    bgGradient: "absolute inset-0 bg-gradient-to-br from-[var(--tech-cyan)]/30 to-transparent animate-pulse-glow",
    bgOverlay: "absolute inset-0 bg-gradient-to-t from-[var(--tech-cyan)]/20 to-transparent",
    iconBg: "w-10 h-10 rounded-lg bg-[var(--tech-cyan)]/20 flex items-center justify-center",
    iconClass: "w-5 h-5 text-[var(--tech-cyan)]",
    badge: "bg-[var(--tech-cyan)]/20 text-[var(--tech-cyan)] border-[var(--tech-cyan)]/30",
    textColor: "text-[var(--tech-cyan)]",
    scoreColor: "text-2xl font-bold text-[var(--tech-cyan)]",
    progressBar: "h-full bg-gradient-to-r from-[var(--tech-cyan)] to-[var(--tech-blue)]"
  },
  "tech-red": {
    cardClass: "bg-black/90 border-[var(--tech-red)]/30 hover:border-[var(--tech-red)]/60",
    bgGradient: "absolute inset-0 bg-gradient-to-br from-[var(--tech-red)]/30 to-transparent animate-pulse-glow",
    bgOverlay: "absolute inset-0 bg-gradient-to-t from-[var(--tech-red)]/20 to-transparent",
    iconBg: "w-10 h-10 rounded-lg bg-[var(--tech-red)]/20 flex items-center justify-center",
    iconClass: "w-5 h-5 text-[var(--tech-red)]",
    badge: "bg-[var(--tech-red)]/20 text-[var(--tech-red)] border-[var(--tech-red)]/30",
    textColor: "text-[var(--tech-red)]",
    scoreColor: "text-2xl font-bold text-[var(--tech-red)]",
    progressBar: "h-full bg-gradient-to-r from-[var(--tech-red)] to-[var(--tech-cyan)]"
  },
  "tech-green": {
    cardClass: "bg-black/90 border-[var(--tech-green)]/30 hover:border-[var(--tech-green)]/60",
    bgGradient: "absolute inset-0 bg-gradient-to-br from-[var(--tech-green)]/30 to-transparent animate-pulse-glow",
    bgOverlay: "absolute inset-0 bg-gradient-to-t from-[var(--tech-green)]/20 to-transparent",
    iconBg: "w-10 h-10 rounded-lg bg-[var(--tech-green)]/20 flex items-center justify-center",
    iconClass: "w-5 h-5 text-[var(--tech-green)]",
    badge: "bg-[var(--tech-green)]/20 text-[var(--tech-green)] border-[var(--tech-green)]/30",
    textColor: "text-[var(--tech-green)]",
    scoreColor: "text-2xl font-bold text-[var(--tech-green)]",
    progressBar: "h-full bg-gradient-to-r from-[var(--tech-green)] to-[var(--tech-cyan)]"
  }
};

export default function InterviewPage() {
  const params = useParams();
  const router = useRouter();
  const candidateId = params.id;
  
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeAgent, setActiveAgent] = useState<number | null>(null);
  const [consistencyScore, setConsistencyScore] = useState(0);
  const [emotionLevel, setEmotionLevel] = useState(50);
  const [questionCount, setQuestionCount] = useState(0);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [svgPath, setSvgPath] = useState("M 150 300 Q 400 200 650 300");

  // Calculate SVG path based on container size
  useEffect(() => {
    const updatePath = () => {
      if (videoContainerRef.current) {
        const { width, height } = videoContainerRef.current.getBoundingClientRect();
        const startX = width * 0.2;
        const endX = width * 0.8;
        const y = height * 0.5;
        const controlY = height * 0.4;
        setSvgPath(`M ${startX} ${y} Q ${width / 2} ${controlY} ${endX} ${y}`);
      }
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, [isMinimized]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setConsistencyScore(prev => Math.min(100, prev + Math.random() * 5));
      setEmotionLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 10)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleEndInterview = () => {
    // Navigate to summary page
    router.push(`/interview/${candidateId}/summary?programId=1`);
  };

  const agents = [
    {
      id: 1,
      title: "CV Consistency",
      icon: CheckCircle2,
      color: "tech-blue" as const,
      position: "top-left",
      data: {
        score: consistencyScore.toFixed(1),
        status: consistencyScore > 80 ? "High" : consistencyScore > 60 ? "Medium" : "Low",
        verified: 5,
        pending: 3
      }
    },
    {
      id: 2,
      title: "Interview Guidance",
      icon: Lightbulb,
      color: "tech-cyan" as const,
      position: "top-right",
      data: {
        suggested: 12,
        asked: questionCount,
        priority: "Technical Skills"
      }
    },
    {
      id: 3,
      title: "Behavior Monitor",
      icon: Eye,
      color: "tech-red" as const,
      position: "bottom-left",
      data: {
        integrity: "No Issues Detected",
        emotion: emotionLevel.toFixed(0),
        alerts: 0
      }
    },
    {
      id: 4,
      title: "Content Summary",
      icon: MessageSquare,
      color: "tech-green" as const,
      position: "bottom-right",
      data: {
        transcribed: "4,523 words",
        segments: 18,
        keyPoints: 7
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[var(--tech-blue)]/5 to-black overflow-hidden">
      {/* Top Bar */}
      <div className="bg-black/50 backdrop-blur-md border-b border-white/10 px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-xl font-bold text-white truncate">Interview: Alice Johnson</h1>
              <p className="text-xs sm:text-sm text-gray-400 truncate">PhD Candidate - MIT CS</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="flex items-center gap-1 sm:gap-2 text-white">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--tech-red)] animate-pulse" />
              <span className="text-xs sm:text-sm font-mono">45:23</span>
            </div>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-[var(--tech-red)] to-red-600 text-white hover:from-red-600 hover:to-[var(--tech-red)] border-none text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3"
              onClick={handleEndInterview}
            >
              End
            </Button>
          </div>
        </div>
      </div>

      {/* Main Interview Area */}
      <div className="relative h-[calc(100vh-80px)]">
        {/* Central Video Area */}
        <motion.div
          layout
          className={`absolute inset-0 ${
            isMinimized 
              ? 'lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-96 lg:h-64 m-2 sm:m-4' 
              : 'm-2 sm:m-4 lg:m-6'
          } transition-all duration-500`}
        >
          <Card className="w-full h-full bg-black/80 border-white/10 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--tech-blue)]/20 to-[var(--tech-cyan)]/20" />
            
            {/* Video Placeholder */}
            <div ref={videoContainerRef} className="relative w-full h-full flex items-center justify-center">
              {/* Animated Interview Simulation */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Interviewer (Left) */}
                <motion.div
                  className="absolute left-[8%] sm:left-[12%] top-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="relative flex flex-col items-center gap-2 sm:gap-3">
                    {/* Interviewer Avatar with Glow */}
                    <motion.div
                      className="relative w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] flex items-center justify-center ring-2 sm:ring-4 ring-[var(--tech-blue)]/30"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(99, 102, 241, 0.4)",
                          "0 0 40px rgba(99, 102, 241, 0.6)",
                          "0 0 20px rgba(99, 102, 241, 0.4)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-xl sm:text-3xl lg:text-4xl font-bold text-white">AI</span>
                    </motion.div>
                    
                    {/* Speaking Indicator */}
                    <motion.div
                      className="flex gap-0.5 sm:gap-1"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1 sm:w-2 h-4 sm:h-6 lg:h-8 bg-[var(--tech-cyan)] rounded-full"
                          animate={{
                            height: ["8px", "20px", "8px"],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </motion.div>
                    
                    {/* Label */}
                    <Badge className="bg-[var(--tech-blue)]/20 text-[var(--tech-blue)] border-[var(--tech-blue)]/30 text-xs whitespace-nowrap">
                      Interviewer
                    </Badge>
                  </div>
                </motion.div>

                {/* Candidate (Right) */}
                <motion.div
                  className="absolute right-[8%] sm:right-[12%] top-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="relative flex flex-col items-center gap-2 sm:gap-3">
                    {/* Candidate Avatar with Glow */}
                    <motion.div
                      className="relative w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-[var(--tech-green)] to-[var(--tech-cyan)] flex items-center justify-center ring-2 sm:ring-4 ring-[var(--tech-green)]/30"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(34, 197, 94, 0.4)",
                          "0 0 40px rgba(34, 197, 94, 0.6)",
                          "0 0 20px rgba(34, 197, 94, 0.4)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      <span className="text-xl sm:text-3xl lg:text-4xl font-bold text-white">AJ</span>
                    </motion.div>
                    
                    {/* Speaking Indicator */}
                    <motion.div
                      className="flex gap-0.5 sm:gap-1"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1 sm:w-2 h-4 sm:h-6 lg:h-8 bg-[var(--tech-green)] rounded-full"
                          animate={{
                            height: ["8px", "18px", "8px"],
                          }}
                          transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            delay: i * 0.15 + 1
                          }}
                        />
                      ))}
                    </motion.div>
                    
                    {/* Label */}
                    <Badge className="bg-[var(--tech-green)]/20 text-[var(--tech-green)] border-[var(--tech-green)]/30 text-xs whitespace-nowrap">
                      Candidate
                    </Badge>
                  </div>
                </motion.div>

                {/* Connection Wave Animation - Now responsive */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <motion.path
                    d={svgPath}
                    fill="none"
                    stroke="var(--tech-cyan)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: [0.3, 0.7, 0.3],
                      strokeDashoffset: [0, -20]
                    }}
                    transition={{ 
                      pathLength: { duration: 2 },
                      opacity: { duration: 2, repeat: Infinity },
                      strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
                    }}
                  />
                </svg>

                {/* Center Status */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                >
                  <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-lg px-3 sm:px-6 py-2 sm:py-3 text-center">
                    <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                      <motion.div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--tech-red)]"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-xs sm:text-sm font-mono text-white whitespace-nowrap">Interview in Progress</span>
                    </div>
                    <p className="text-xs text-gray-400 hidden sm:block">AI Agents Monitoring</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/10 text-white hover:bg-white/20 h-7 sm:h-8"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" /> : <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4" />}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* AI Agent Visualizations - Only on large screens */}
        <AnimatePresence>
          {isMinimized && agents.map((agent, idx) => {
            const positions = {
              "top-left": "left-2 sm:left-4 lg:left-8 top-2 sm:top-4 lg:top-8",
              "top-right": "right-2 sm:right-4 lg:right-8 top-2 sm:top-4 lg:top-8",
              "bottom-left": "left-2 sm:left-4 lg:left-8 bottom-2 sm:bottom-4 lg:bottom-8",
              "bottom-right": "right-2 sm:right-4 lg:right-8 bottom-2 sm:bottom-4 lg:bottom-8"
            };

            const styles = agentStyles[agent.color];
            
            // Responsive sizes: smaller on mobile, larger on desktop
            const agentSize = agent.id === 2 
              ? "w-[160px] sm:w-[220px] lg:w-[280px] h-[180px] sm:h-[280px] lg:h-[280px]" 
              : agent.id === 4 
              ? "w-[160px] sm:w-[220px] lg:w-[280px] h-[200px] sm:h-[320px] lg:h-[300px]" 
              : "w-[160px] sm:w-[220px] lg:w-[280px] h-auto";

            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ 
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`absolute ${positions[agent.position]} ${agentSize}`}
              >
                <Card 
                  className={`${styles.cardClass} overflow-hidden cursor-pointer transition-all h-full`}
                  onClick={() => setActiveAgent(activeAgent === agent.id ? null : agent.id)}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 opacity-20">
                    <motion.div
                      className={styles.bgGradient}
                      animate={{ 
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                      className={styles.bgOverlay}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative p-2 sm:p-4 lg:p-6 h-full flex flex-col">
                    <motion.div 
                      className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 min-w-0 flex-1">
                        <motion.div 
                          className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg bg-[var(--tech-blue)]/20 flex items-center justify-center flex-shrink-0"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <agent.icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[var(--tech-blue)]" />
                        </motion.div>
                        <h3 className="text-[10px] sm:text-xs lg:text-sm font-semibold text-white break-words leading-tight">{agent.title}</h3>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex-shrink-0 ml-1"
                      >
                        <Badge className={`${styles.badge} text-[10px] px-1 py-0.5`}>
                          Active
                        </Badge>
                      </motion.div>
                    </motion.div>

                    {/* Agent-specific Data Visualization */}
                    {agent.id === 1 && (
                      <motion.div 
                        className="space-y-1.5 sm:space-y-2 lg:space-y-3 flex-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">Score</span>
                          <motion.span 
                            className="text-base sm:text-xl lg:text-2xl font-bold text-[var(--tech-blue)]"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {agent.data.score}%
                          </motion.span>
                        </div>
                        <div className="h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={styles.progressBar}
                            initial={{ width: 0 }}
                            animate={{ width: `${agent.data.score}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-1 sm:gap-1.5 lg:gap-2 mt-2">
                          <motion.div 
                            className="bg-white/5 rounded-lg p-1 sm:p-1.5 lg:p-2"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                          >
                            <div className="text-xs text-gray-400">Verified</div>
                            <motion.div 
                              className="text-sm sm:text-base lg:text-lg font-bold text-[var(--tech-green)]"
                              animate={{ scale: [1, 1.15, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              {agent.data.verified}
                            </motion.div>
                          </motion.div>
                          <motion.div 
                            className="bg-white/5 rounded-lg p-1 sm:p-1.5 lg:p-2"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                          >
                            <div className="text-xs text-gray-400">Pending</div>
                            <div className="text-sm sm:text-base lg:text-lg font-bold text-yellow-500">{agent.data.pending}</div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {agent.id === 2 && (
                      <div className="space-y-1 sm:space-y-1.5 lg:space-y-2 flex-1 flex flex-col overflow-hidden">
                        <div className="space-y-1 sm:space-y-1.5 flex-1 overflow-y-auto">
                          {["Technical depth in ML projects", "Leadership experience details"].map((q, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.15 }}
                              whileHover={{ scale: 1.02, x: 5 }}
                              className="bg-white/5 rounded-lg p-1 sm:p-1.5 lg:p-2 flex items-start gap-1 sm:gap-1.5 lg:gap-2"
                            >
                              <motion.div 
                                className="w-4 h-4 sm:w-5 sm:h-5 rounded flex items-center justify-center bg-[var(--tech-cyan)]/20 text-xs font-bold text-[var(--tech-cyan)] flex-shrink-0"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                {i + 1}
                              </motion.div>
                              <div className="flex-1 text-xs text-gray-300 line-clamp-2">{q}</div>
                            </motion.div>
                          ))}
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
                          <Button size="sm" className="w-full bg-[var(--tech-cyan)]/20 text-[var(--tech-cyan)] hover:bg-[var(--tech-cyan)]/30 text-xs h-6 sm:h-7 lg:h-8">
                            View All
                          </Button>
                        </motion.div>
                      </div>
                    )}

                    {agent.id === 3 && (
                      <motion.div 
                        className="space-y-1.5 sm:space-y-2 lg:space-y-3 flex-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <motion.div 
                          className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 bg-[var(--tech-green)]/10 rounded-lg p-1.5 sm:p-2 lg:p-3 border border-[var(--tech-green)]/20"
                          animate={{ 
                            borderColor: ["rgba(34, 197, 94, 0.2)", "rgba(34, 197, 94, 0.5)", "rgba(34, 197, 94, 0.2)"]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="flex-shrink-0"
                          >
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[var(--tech-green)]" />
                          </motion.div>
                          <span className="text-xs sm:text-sm text-[var(--tech-green)] font-medium truncate">No Issues</span>
                        </motion.div>
                        
                        <div>
                          <div className="flex justify-between text-xs mb-1 sm:mb-1.5 lg:mb-2">
                            <span className="text-gray-400">Emotion</span>
                            <span className="text-white">{agent.data.emotion}%</span>
                          </div>
                          <div className="h-12 sm:h-16 lg:h-20 bg-white/5 rounded-lg relative overflow-hidden">
                            <svg className="w-full h-full" viewBox="0 0 100 20">
                              <motion.path
                                d={`M 0,${20 - emotionLevel / 5} ${Array.from({ length: 50 }, (_, i) => {
                                  const x = i * 2;
                                  const y = 20 - (emotionLevel + Math.sin(i * 0.5) * 10) / 5;
                                  return `L ${x},${Math.max(0, Math.min(20, y))}`;
                                }).join(' ')}`}
                                fill="none"
                                stroke="var(--tech-red)"
                                strokeWidth="2"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 2 }}
                              />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {agent.id === 4 && (
                      <motion.div 
                        className="space-y-1 sm:space-y-1.5 lg:space-y-2 flex-1 flex flex-col overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="grid grid-cols-3 gap-1 sm:gap-1.5 lg:gap-2">
                          {[
                            { label: "Words", value: "4.5K", color: "tech-green" },
                            { label: "Topics", value: "18", color: "tech-cyan" },
                            { label: "Points", value: "7", color: "tech-blue" }
                          ].map((stat, i) => (
                            <motion.div 
                              key={i}
                              className="bg-white/5 rounded-lg p-1 sm:p-1.5 lg:p-2 text-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.1, type: "spring" }}
                              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                            >
                              <div className="text-xs text-gray-400 truncate">{stat.label}</div>
                              <motion.div 
                                className={`text-xs sm:text-sm lg:text-base font-bold text-[var(--${stat.color})]`}
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                              >
                                {stat.value}
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                        
                        <motion.div 
                          className="bg-white/5 rounded-lg p-1 sm:p-1.5 lg:p-2 overflow-y-auto flex-1"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <p className="text-xs text-gray-300 leading-relaxed line-clamp-3 sm:line-clamp-4 lg:line-clamp-none">
                            Discussed deep learning experience with TensorFlow and PyTorch. 
                            Highlighted transformer architectures research and distributed training systems.
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>

                  {/* Scanning Animation */}
                  <motion.div
                    className={`absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--${agent.color})] to-transparent`}
                    animate={{ top: ['-2px', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Corner Glow Effect */}
                  <motion.div
                    className={`absolute top-0 right-0 w-10 sm:w-16 lg:w-20 h-10 sm:h-16 lg:h-20 bg-[var(--${agent.color})]/20 blur-2xl`}
                    animate={{ 
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}