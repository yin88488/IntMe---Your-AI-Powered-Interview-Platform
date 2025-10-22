"use client";

import { useState, Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  Download, 
  Mail, 
  Filter,
  ChevronLeft,
  GraduationCap,
  Sliders,
  Eye
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Candidates data with performance scores - updated with more varied scores (60-96 range)
const candidatesData = [
  { id: 1, name: "Sarah Chen", university: "MIT", location: "Cambridge, MA", technical: 96, communication: 92, consistency: 95, behavior: 94, overall: 94.3, research: 97, leadership: 91, innovation: 93 },
  { id: 2, name: "Michael Rodriguez", university: "Stanford", location: "Palo Alto, CA", technical: 88, communication: 90, consistency: 86, behavior: 89, overall: 88.3, research: 87, leadership: 92, innovation: 85 },
  { id: 3, name: "Emily Wang", university: "UC Berkeley", location: "Berkeley, CA", technical: 91, communication: 89, consistency: 92, behavior: 90, overall: 90.5, research: 93, leadership: 88, innovation: 91 },
  { id: 4, name: "James Kim", university: "Cornell", location: "Ithaca, NY", technical: 78, communication: 82, consistency: 80, behavior: 77, overall: 79.3, research: 76, leadership: 84, innovation: 79 },
  { id: 5, name: "Sophia Martinez", university: "CMU", location: "Pittsburgh, PA", technical: 85, communication: 83, consistency: 87, behavior: 86, overall: 85.3, research: 88, leadership: 84, innovation: 82 },
  { id: 6, name: "David Thompson", university: "Cambridge", location: "Cambridge, UK", technical: 94, communication: 93, consistency: 92, behavior: 91, overall: 92.5, research: 96, leadership: 93, innovation: 94 },
  { id: 7, name: "Olivia Zhang", university: "Oxford", location: "Oxford, UK", technical: 92, communication: 94, consistency: 91, behavior: 93, overall: 92.5, research: 95, leadership: 95, innovation: 90 },
  { id: 8, name: "Lucas Brown", university: "ETH Zurich", location: "Zurich, Switzerland", technical: 82, communication: 80, consistency: 84, behavior: 83, overall: 82.3, research: 81, leadership: 79, innovation: 85 },
  { id: 9, name: "Emma Lee", university: "NUS", location: "Singapore", technical: 87, communication: 86, consistency: 89, behavior: 85, overall: 86.8, research: 90, leadership: 85, innovation: 84 },
  { id: 10, name: "Alexander Wang", university: "Tokyo", location: "Tokyo, Japan", technical: 74, communication: 76, consistency: 72, behavior: 75, overall: 74.3, research: 71, leadership: 78, innovation: 73 },
  { id: 11, name: "Isabella Garcia", university: "Princeton", location: "Princeton, NJ", technical: 95, communication: 96, consistency: 94, behavior: 95, overall: 95, research: 98, leadership: 97, innovation: 96 },
  { id: 12, name: "Noah Patel", university: "Harvard", location: "Cambridge, MA", technical: 90, communication: 91, consistency: 89, behavior: 92, overall: 90.5, research: 92, leadership: 89, innovation: 88 },
  { id: 13, name: "Ava Johnson", university: "Columbia", location: "New York, NY", technical: 81, communication: 85, consistency: 79, behavior: 82, overall: 81.8, research: 80, leadership: 86, innovation: 83 },
  { id: 14, name: "Ethan Liu", university: "Tsinghua", location: "Beijing, China", technical: 84, communication: 81, consistency: 86, behavior: 83, overall: 83.5, research: 87, leadership: 80, innovation: 82 },
  { id: 15, name: "Mia Anderson", university: "Imperial College", location: "London, UK", technical: 67, communication: 70, consistency: 65, behavior: 68, overall: 67.5, research: 64, leadership: 72, innovation: 69 },
  { id: 16, name: "Benjamin Park", university: "KAIST", location: "Daejeon, South Korea", technical: 79, communication: 77, consistency: 81, behavior: 80, overall: 79.3, research: 82, leadership: 76, innovation: 78 }
];

function AnalyticsContent() {
  const searchParams = useSearchParams();
  const programId = searchParams.get("programId") || "1";
  
  const [xAxis, setXAxis] = useState("technical");
  const [yAxis, setYAxis] = useState("research");
  const [topPercent, setTopPercent] = useState("100");
  
  const dimensions = [
    { value: "technical", label: "Technical Skills" },
    { value: "communication", label: "Communication" },
    { value: "research", label: "Research Quality" },
    { value: "leadership", label: "Leadership" },
    { value: "innovation", label: "Innovation" },
    { value: "consistency", label: "CV Consistency" },
    { value: "behavior", label: "Behavior Score" }
  ];

  // Filter candidates based on top percent
  const filteredCandidates = candidatesData
    .sort((a, b) => b.overall - a.overall)
    .slice(0, Math.ceil(candidatesData.length * (parseInt(topPercent) / 100)));

  // Generate contour data
  const generateContourData = () => {
    const gridSize = 20;
    const data = [];
    
    for (let i = 0; i <= gridSize; i++) {
      for (let j = 0; j <= gridSize; j++) {
        const x = (i / gridSize) * 100;
        const y = (j / gridSize) * 100;
        
        // Calculate distance-based score from all candidates
        let score = 0;
        filteredCandidates.forEach(candidate => {
          const cx = candidate[xAxis as keyof typeof candidate] as number;
          const cy = candidate[yAxis as keyof typeof candidate] as number;
          const distance = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
          score += Math.max(0, 100 - distance) * 0.5;
        });
        
        data.push({ x, y, z: Math.min(100, score) });
      }
    }
    
    return data;
  };

  const contourData = generateContourData();

  // Get contour color based on score
  const getContourColor = (score: number) => {
    if (score > 80) return "var(--tech-green)";
    if (score > 60) return "var(--tech-cyan)";
    if (score > 40) return "var(--tech-blue)";
    if (score > 20) return "var(--tech-purple)";
    return "var(--tech-red)";
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <Link href={`/program/${programId}`}>
          <Button variant="ghost" className="mb-4 sm:mb-6 text-white hover:bg-white/10 h-8 sm:h-9">
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Back to Program
          </Button>
        </Link>

        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Candidate Comparison Analytics</h1>
          <p className="text-sm sm:text-base text-gray-400">3D visualization of candidate performance across multiple dimensions</p>
        </div>

        {/* Controls */}
        <Card className="p-4 sm:p-6 mb-6 sm:mb-8 bg-black/50 border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <label className="text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2 block">X-Axis Dimension</label>
              <Select value={xAxis} onValueChange={setXAxis}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-8 sm:h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dimensions.map(dim => (
                    <SelectItem key={dim.value} value={dim.value}>
                      {dim.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2 block">Y-Axis Dimension</label>
              <Select value={yAxis} onValueChange={setYAxis}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-8 sm:h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dimensions.map(dim => (
                    <SelectItem key={dim.value} value={dim.value}>
                      {dim.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2 block">Show Top Candidates</label>
              <Select value={topPercent} onValueChange={setTopPercent}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-8 sm:h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">Top 25%</SelectItem>
                  <SelectItem value="50">Top 50%</SelectItem>
                  <SelectItem value="75">Top 75%</SelectItem>
                  <SelectItem value="100">All Candidates</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button className="flex-1 bg-[var(--tech-blue)]/20 text-[var(--tech-cyan)] hover:bg-[var(--tech-blue)]/30 h-8 sm:h-9 text-xs sm:text-sm">
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Export
              </Button>
              <Button className="flex-1 bg-[var(--tech-green)]/20 text-[var(--tech-green)] hover:bg-[var(--tech-green)]/30 h-8 sm:h-9 text-xs sm:text-sm">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Email
              </Button>
            </div>
          </div>
        </Card>

        {/* 3D Contour Visualization */}
        <Card className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-black/90 to-[var(--tech-blue)]/10 border-[var(--tech-cyan)]/20 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)]"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--tech-cyan)]" />
                Performance Distribution Map
              </h2>
              <Badge className="bg-[var(--tech-cyan)]/20 text-[var(--tech-cyan)] border-[var(--tech-cyan)]/30 text-xs sm:text-sm">
                {filteredCandidates.length} Candidates
              </Badge>
            </div>

            {/* 3D Contour Chart */}
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-black/50 rounded-xl overflow-hidden border border-[var(--tech-blue)]/30">
              {/* Animated Grid Background */}
              <div className="absolute inset-0">
                <svg className="w-full h-full opacity-20">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.line
                      key={`h-${i}`}
                      x1="0"
                      y1={`${i * 5}%`}
                      x2="100%"
                      y2={`${i * 5}%`}
                      stroke="var(--tech-cyan)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: i * 0.02 }}
                    />
                  ))}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.line
                      key={`v-${i}`}
                      x1={`${i * 5}%`}
                      y1="0"
                      x2={`${i * 5}%`}
                      y2="100%"
                      stroke="var(--tech-cyan)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: i * 0.02 }}
                    />
                  ))}
                </svg>
              </div>

              {/* Contour Lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <radialGradient id="contourGradient1">
                    <stop offset="0%" stopColor="var(--tech-green)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="var(--tech-green)" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="contourGradient2">
                    <stop offset="0%" stopColor="var(--tech-cyan)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--tech-cyan)" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="contourGradient3">
                    <stop offset="0%" stopColor="var(--tech-blue)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--tech-blue)" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Contour Circles (heat map effect) */}
                {filteredCandidates.map((candidate, i) => {
                  const cx = candidate[xAxis as keyof typeof candidate] as number;
                  const cy = 100 - (candidate[yAxis as keyof typeof candidate] as number);
                  
                  return (
                    <g key={candidate.id}>
                      {[30, 20, 10].map((r, idx) => (
                        <motion.circle
                          key={idx}
                          cx={cx}
                          cy={cy}
                          r={r}
                          fill={`url(#contourGradient${idx + 1})`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.8, delay: i * 0.05 + idx * 0.1 }}
                        />
                      ))}
                    </g>
                  );
                })}

                {/* Axis Labels */}
                <text x="50" y="98" fill="white" fontSize="2.5" textAnchor="middle" opacity="0.7" className="hidden sm:block">
                  {dimensions.find(d => d.value === xAxis)?.label} →
                </text>
                <text x="2" y="50" fill="white" fontSize="2.5" textAnchor="start" opacity="0.7" transform="rotate(-90 2 50)" className="hidden sm:block">
                  ← {dimensions.find(d => d.value === yAxis)?.label}
                </text>
              </svg>

              {/* Candidate Markers with Photos */}
              <div className="absolute inset-0">
                {filteredCandidates.map((candidate, i) => {
                  const x = candidate[xAxis as keyof typeof candidate] as number;
                  const y = 100 - (candidate[yAxis as keyof typeof candidate] as number);
                  const initials = candidate.name.split(' ').map(n => n[0]).join('');
                  
                  return (
                    <motion.div
                      key={candidate.id}
                      className="absolute group cursor-pointer"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      whileHover={{ scale: 1.3, zIndex: 50 }}
                    >
                      {/* Glow Effect */}
                      <div className="absolute inset-0 -m-4 rounded-full bg-[var(--tech-cyan)]/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-[var(--tech-cyan)] overflow-hidden bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] shadow-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                          {initials}
                        </div>
                        
                        {/* Rank Badge */}
                        <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[var(--tech-blue)] border-2 border-black flex items-center justify-center text-[10px] sm:text-xs font-bold text-white">
                          {i + 1}
                        </div>
                      </div>

                      {/* Tooltip */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        <div className="bg-black/90 border border-[var(--tech-cyan)]/30 rounded-lg p-2.5 sm:p-3 min-w-[180px] sm:min-w-[200px] backdrop-blur-md">
                          <div className="font-semibold text-white text-sm mb-1">{candidate.name}</div>
                          <div className="text-xs text-gray-400 mb-2">{candidate.university}</div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">{dimensions.find(d => d.value === xAxis)?.label}:</span>
                              <span className="text-[var(--tech-cyan)] font-bold">
                                {candidate[xAxis as keyof typeof candidate]}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">{dimensions.find(d => d.value === yAxis)?.label}:</span>
                              <span className="text-[var(--tech-cyan)] font-bold">
                                {candidate[yAxis as keyof typeof candidate]}
                              </span>
                            </div>
                            <div className="flex justify-between text-xs pt-1 border-t border-white/10">
                              <span className="text-gray-400">Overall:</span>
                              <span className="text-[var(--tech-green)] font-bold">{candidate.overall}</span>
                            </div>
                          </div>
                          <Link href={`/candidate/${candidate.id}?programId=${programId}`}>
                            <Button size="sm" className="w-full mt-2 bg-[var(--tech-cyan)]/20 text-[var(--tech-cyan)] hover:bg-[var(--tech-cyan)]/30 text-xs h-6 sm:h-7">
                              <Eye className="w-3 h-3 mr-1" />
                              View Profile
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-black/80 border border-[var(--tech-cyan)]/30 rounded-lg p-2.5 sm:p-4 backdrop-blur-md">
                <div className="text-[10px] sm:text-xs text-gray-400 mb-1.5 sm:mb-2">Performance Zones</div>
                <div className="space-y-0.5 sm:space-y-1">
                  {[
                    { color: "tech-green", label: "Excellent (80-100)" },
                    { color: "tech-cyan", label: "Good (60-80)" },
                    { color: "tech-blue", label: "Average (40-60)" },
                    { color: "tech-purple", label: "Below Avg (20-40)" },
                  ].map((zone) => (
                    <div key={zone.color} className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                      <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[var(--${zone.color})]`} />
                      <span className="text-gray-300 whitespace-nowrap">{zone.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {filteredCandidates.slice(0, 3).map((candidate, i) => {
            const initials = candidate.name.split(' ').map(n => n[0]).join('');
            return (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-4 sm:p-6 bg-gradient-to-br from-black/80 to-[var(--tech-blue)]/10 border-[var(--tech-cyan)]/20">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border-2 border-[var(--tech-cyan)] bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] flex items-center justify-center text-white font-bold text-base sm:text-lg">
                        {initials}
                      </div>
                      <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[var(--tech-blue)] border-2 border-black flex items-center justify-center text-xs sm:text-sm font-bold text-white">
                        {i + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm sm:text-base truncate">{candidate.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-400 truncate">{candidate.university}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-bold text-[var(--tech-green)]">{candidate.overall}</div>
                      <div className="text-[10px] sm:text-xs text-gray-400">Overall</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/5 rounded p-2">
                      <div className="text-[10px] sm:text-xs text-gray-400 truncate">{dimensions.find(d => d.value === xAxis)?.label}</div>
                      <div className="text-base sm:text-lg font-bold text-[var(--tech-cyan)]">
                        {candidate[xAxis as keyof typeof candidate]}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded p-2">
                      <div className="text-[10px] sm:text-xs text-gray-400 truncate">{dimensions.find(d => d.value === yAxis)?.label}</div>
                      <div className="text-base sm:text-lg font-bold text-[var(--tech-cyan)]">
                        {candidate[yAxis as keyof typeof candidate]}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[var(--tech-blue)]/5 to-black">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] bg-clip-text text-transparent">
                IntMe
              </span>
            </Link>
          </div>
        </div>
      </header>

      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-white text-sm sm:text-base">Loading analytics...</div>
        </div>
      }>
        <AnalyticsContent />
      </Suspense>
    </div>
  );
}