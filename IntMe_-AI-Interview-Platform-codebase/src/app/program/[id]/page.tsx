"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Search, 
  Filter,
  Download,
  Mail,
  Video,
  FileText,
  Calendar,
  TrendingUp,
  ChevronLeft,
  MoreHorizontal,
  Eye,
  Settings,
  FileBarChart
} from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";

export default function ProgramPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const programId = params.id;
  
  // Read status from URL, default to "all" if coming from dashboard, "pending" otherwise
  const urlStatus = searchParams.get("status");
  const [filterStatus, setFilterStatus] = useState<string>(urlStatus || "pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering for dates
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update filterStatus when URL changes
  useEffect(() => {
    if (urlStatus) {
      setFilterStatus(urlStatus);
    }
  }, [urlStatus]);

  // Update URL when filter changes
  const handleStatusChange = (newStatus: string) => {
    setFilterStatus(newStatus);
    router.push(`/program/${programId}?status=${newStatus}`, { scroll: false });
  };

  // Format date consistently
  const formatDate = (dateString: string) => {
    if (!isClient) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format GPA to xxx/total format
  const formatGPA = (gpa: string) => {
    // If already has "/" format, return as is
    if (gpa.includes('/')) {
      return gpa;
    }
    // If it's a text grade (First Class, Distinction, etc.), return as is
    if (isNaN(parseFloat(gpa))) {
      return gpa;
    }
    // If it's a number <= 4, assume it's 4.0 scale
    const numGpa = parseFloat(gpa);
    if (numGpa <= 4) {
      return `${gpa}/4.0`;
    }
    // Otherwise return as is
    return gpa;
  };

  // Mock program data
  const program = {
    id: programId,
    name: programId === "1" ? "Computer Science Master's 2025" : programId === "2" ? "Data Science Master's 2025" : "Software Engineering Intern Summer 2025",
    description: programId === "1" ? "Master's program in Computer Science with focus on AI and Machine Learning" : programId === "2" ? "Master's program specializing in Data Science and Analytics" : "Summer internship program for undergraduate students",
    coordinator: programId === "1" ? "Dr. Sarah Chen" : programId === "2" ? "Prof. Michael Wong" : "Dr. Emily Rodriguez",
    deadline: programId === "1" ? "2025-03-15" : programId === "2" ? "2025-04-01" : "2025-02-28",
  };

  // Mock data for demonstration
  const candidates = [
    { id: 1, name: "Alex Thompson", university: "MIT", major: "Computer Science", gpa: "3.95", status: "interviewed", aiScore: 95, location: "Cambridge, MA" },
    { id: 2, name: "Maria Garcia", university: "Stanford", major: "Computer Science", gpa: "3.98", status: "scheduled", aiScore: 92, location: "Palo Alto, CA" },
    { id: 3, name: "James Chen", university: "UC Berkeley", major: "Artificial Intelligence", gpa: "3.91", status: "pending", aiScore: 88, location: "Berkeley, CA" },
    { id: 4, name: "David Kim", university: "Cornell", major: "Machine Learning", gpa: "3.96", status: "interviewed", aiScore: 94, location: "Ithaca, NY" },
    { id: 6, name: "Sophie Anderson", university: "Cambridge", major: "Computer Science", gpa: "First Class", status: "interviewed", aiScore: 96, location: "Cambridge, UK" },
    { id: 7, name: "Lucas Mueller", university: "ETH Zurich", major: "Robotics", gpa: "5.8/6.0", status: "pending", aiScore: 89, location: "Zurich, CH" },
    { id: 8, name: "Yuki Tanaka", university: "U Tokyo", major: "Human-Computer Interaction", gpa: "3.9", status: "scheduled", aiScore: 91, location: "Tokyo, JP" },
    { id: 9, name: "Priya Sharma", university: "NUS", major: "Data Science", gpa: "4.8/5.0", status: "interviewed", aiScore: 93, location: "Singapore" },
    { id: 10, name: "Mohammed Al-Rahman", university: "Oxford", major: "Cybersecurity", gpa: "Distinction", status: "pending", aiScore: 90, location: "Oxford, UK" },
    { id: 11, name: "Isabella Costa", university: "Princeton", major: "Theoretical CS", gpa: "3.97", status: "scheduled", aiScore: 92, location: "Princeton, NJ" },
    { id: 12, name: "Wei Chen", university: "Tsinghua", major: "Distributed Systems", gpa: "92/100", status: "interviewed", aiScore: 94, location: "Beijing, CN" },
    { id: 13, name: "Anna Kowalski", university: "Imperial", major: "Generative AI", gpa: "First Class", status: "pending", aiScore: 87, location: "London, UK" },
    { id: 15, name: "Olivia Brown", university: "Harvard", major: "Computational Biology", gpa: "3.94", status: "interviewed", aiScore: 95, location: "Cambridge, MA" },
    { id: 16, name: "Daniel Martinez", university: "Columbia", major: "Computer Networks", gpa: "3.92", status: "pending", aiScore: 88, location: "New York, NY" },
  ];

  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
    scheduled: "bg-blue-500/10 text-blue-600 border-blue-500/30",
    interviewed: "bg-green-500/10 text-green-600 border-green-500/30",
    rejected: "bg-red-500/10 text-red-600 border-red-500/30"
  };

  const stats = {
    total: candidates.length,
    pending: candidates.filter(c => c.status === "pending").length,
    scheduled: candidates.filter(c => c.status === "scheduled").length,
    interviewed: candidates.filter(c => c.status === "interviewed").length,
    rejected: candidates.filter(c => c.status === "rejected").length,
  };

  // Filter candidates by program
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.university.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || candidate.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadgeClass = (status: string) => {
    const classes = {
      interviewed: "bg-[var(--tech-green)]/10 text-[var(--tech-green)] border-[var(--tech-green)]/30",
      scheduled: "bg-[var(--tech-blue)]/10 text-[var(--tech-blue)] border-[var(--tech-blue)]/30",
      pending: "bg-[var(--tech-purple)]/10 text-[var(--tech-purple)] border-[var(--tech-purple)]/30",
      rejected: "bg-[var(--tech-red)]/10 text-[var(--tech-red)] border-[var(--tech-red)]/30"
    };
    return classes[status as keyof typeof classes] || "";
  };

  const statusCounts = {
    all: candidates.length,
    interviewed: candidates.filter(c => c.status === "interviewed").length,
    scheduled: candidates.filter(c => c.status === "scheduled").length,
    pending: candidates.filter(c => c.status === "pending").length,
    rejected: candidates.filter(c => c.status === "rejected").length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-x-hidden">
      {/* Decorative circles - responsive sizes */}
      <div className="absolute top-20 right-10 sm:right-20 w-32 h-32 sm:w-64 sm:h-64 bg-[var(--tech-blue)]/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-40 left-5 sm:left-10 w-48 h-48 sm:w-96 sm:h-96 bg-[var(--tech-cyan)]/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-20 h-20 sm:w-32 sm:h-32 bg-[var(--tech-purple)]/10 rounded-full blur-2xl" />
      
      {/* Header - responsive */}
      <header className="border-b border-border/50 backdrop-blur-md bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2">
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

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 relative z-10">
        {/* Back Button - responsive */}
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-3 sm:mb-4 text-xs sm:text-sm h-8 sm:h-10">
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Back to Dashboard</span>
            <span className="xs:hidden">Back</span>
          </Button>
        </Link>

        {/* Program Header - responsive layout */}
        <div className="relative mb-4 sm:mb-8">
          {/* Decorative line - hide on mobile */}
          <div className="hidden sm:block absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--tech-blue)] via-[var(--tech-cyan)] to-[var(--tech-purple)] rounded-full" />
          
          <Card className="p-4 sm:p-6 relative overflow-hidden">
            {/* Decorative circles - adjusted for mobile */}
            <div className="absolute -top-5 -right-5 sm:-top-10 sm:-right-10 w-16 h-16 sm:w-32 sm:h-32 bg-[var(--tech-cyan)]/10 rounded-full" />
            <div className="absolute -bottom-3 right-10 sm:-bottom-5 sm:right-20 w-12 h-12 sm:w-20 sm:h-20 bg-[var(--tech-blue)]/10 rounded-full" />
            
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 relative z-10">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 break-words">{program.name}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2">{program.description}</p>
                <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 text-xs sm:text-sm">
                  <span className="flex items-center gap-2">
                    <span className="text-muted-foreground">Coordinator:</span>
                    <span className="font-medium truncate">{program.coordinator}</span>
                  </span>
                  <span className="hidden xs:block h-4 w-px bg-border" />
                  <span className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[var(--tech-blue)]/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--tech-blue)]" />
                    </div>
                    <span className="truncate">Deadline: {formatDate(program.deadline)}</span>
                  </span>
                </div>
              </div>
              
              {/* Action buttons - responsive grid */}
              <div className="grid grid-cols-2 sm:flex gap-2 sm:flex-shrink-0">
                <Link href={`/rubric-calibration?programId=${programId}`} className="col-span-2">
                  <Button className="w-full bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white text-xs sm:text-sm h-9 sm:h-10">
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Configure Rubric</span>
                    <span className="sm:hidden">Rubric</span>
                  </Button>
                </Link>
                <Link href={`/program/${programId}/bias-analysis`}>
                  <Button variant="outline" className="w-full text-xs sm:text-sm h-9 sm:h-10">
                    <FileBarChart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Bias Analysis</span>
                    <span className="sm:hidden">Bias</span>
                  </Button>
                </Link>
                <Button variant="outline" size="icon" className="rounded-full h-9 w-9 sm:h-10 sm:w-10">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-9 w-9 sm:h-10 sm:w-10">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Status Filter Tabs - responsive with proper text display */}
        <div className="relative mb-4 sm:mb-6">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent -z-10" />
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {Object.entries(statusCounts).map(([status, count]) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                onClick={() => handleStatusChange(status)}
                className={`flex-shrink-0 whitespace-nowrap text-xs sm:text-sm h-8 sm:h-10 px-2.5 sm:px-4 ${
                  filterStatus === status 
                    ? "bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white" 
                    : "bg-background"
                }`}
              >
                <span className="truncate">
                  {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Search Bar - responsive */}
        <div className="mb-4 sm:mb-6 flex gap-2 sm:gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 sm:pl-10 h-10 sm:h-12 text-xs sm:text-sm"
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex-shrink-0">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        {/* Candidates List - responsive cards */}
        <div className="space-y-3 sm:space-y-4">
          {filteredCandidates.map((candidate, index) => (
            <Card key={candidate.id} className="p-3 sm:p-6 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
              {/* Decorative elements - hide on mobile */}
              <div className="hidden sm:block absolute -right-16 -top-16 w-32 h-32 border-2 border-[var(--tech-blue)]/10 rounded-full" />
              <div className="hidden sm:block absolute -right-20 -top-20 w-40 h-40 border border-[var(--tech-cyan)]/5 rounded-full" />
              
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 relative z-10">
                {/* Avatar - responsive size */}
                <div className="flex items-center justify-between sm:block">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] flex items-center justify-center text-white text-base sm:text-xl font-bold flex-shrink-0 ring-2 sm:ring-4 ring-background">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {/* Status badge - show on mobile next to avatar */}
                  <Badge className={`sm:hidden ${getStatusBadgeClass(candidate.status)} text-xs`}>
                    {candidate.status}
                  </Badge>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3 gap-2">
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-xl font-semibold mb-1 truncate">{candidate.name}</h3>
                      <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 text-xs sm:text-sm text-muted-foreground">
                        <span className="truncate">{candidate.university}</span>
                        <span className="hidden xs:block w-1 h-1 rounded-full bg-muted-foreground flex-shrink-0" />
                        <span className="truncate">{candidate.major}</span>
                        <span className="hidden xs:block w-1 h-1 rounded-full bg-muted-foreground flex-shrink-0" />
                        <span className="truncate">GPA: {formatGPA(candidate.gpa)}</span>
                      </div>
                    </div>
                    {/* Status badge - hide on mobile, show on desktop */}
                    <Badge className={`hidden sm:flex ${getStatusBadgeClass(candidate.status)} flex-shrink-0`}>
                      {candidate.status}
                    </Badge>
                  </div>

                  {/* CV Summary - responsive */}
                  <div className="bg-secondary/30 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[var(--tech-blue)]/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--tech-blue)]" />
                      </div>
                      <span className="font-semibold text-xs sm:text-sm truncate">AI CV Summary</span>
                      <Badge variant="outline" className="ml-auto text-[10px] sm:text-xs flex-shrink-0">
                        AI: {candidate.aiScore}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">AI-Generated CV summary for {candidate.name} from {candidate.university} with GPA {formatGPA(candidate.gpa)} and AI Score {candidate.aiScore}.</p>
                  </div>

                  {/* Scores - responsive grid (2 cols on mobile, 3 on desktop) */}
                  {candidate.status === "interviewed" && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="bg-[var(--tech-blue)]/5 rounded-lg p-2 sm:p-3 border border-[var(--tech-blue)]/20">
                        <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">AI Score</div>
                        <div className="text-base sm:text-lg font-bold text-[var(--tech-blue)]">{candidate.aiScore}</div>
                      </div>
                      <div className="bg-[var(--tech-green)]/5 rounded-lg p-2 sm:p-3 border border-[var(--tech-green)]/20">
                        <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Consistency</div>
                        <div className="text-base sm:text-lg font-bold text-[var(--tech-green)]">85%</div>
                      </div>
                      <div className="bg-[var(--tech-cyan)]/5 rounded-lg p-2 sm:p-3 border border-[var(--tech-cyan)]/20 col-span-2 sm:col-span-1">
                        <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Behavior</div>
                        <div className="text-base sm:text-lg font-bold text-[var(--tech-cyan)]">88</div>
                      </div>
                    </div>
                  )}

                  {/* Interview Date - responsive */}
                  {candidate.status === "scheduled" && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm mb-3 sm:mb-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                      </div>
                      <span className="text-muted-foreground truncate">
                        Interview: {new Date().toLocaleString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  )}

                  {/* Actions - responsive layout */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <Link href={`/candidate/${candidate.id}?programId=${programId}&status=${filterStatus}`} className="flex-1 sm:flex-none">
                      <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm h-8 sm:h-9">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span className="hidden xs:inline">View Details</span>
                        <span className="xs:hidden">View</span>
                      </Button>
                    </Link>
                    {candidate.status === "scheduled" && (
                      <Link href={`/interview/${candidate.id}`} className="flex-1 sm:flex-none">
                        <Button size="sm" className="w-full bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white text-xs sm:text-sm h-8 sm:h-9">
                          <Video className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span className="hidden xs:inline">Start Interview</span>
                          <span className="xs:hidden">Start</span>
                        </Button>
                      </Link>
                    )}
                    {candidate.status === "interviewed" && (
                      <Link href={`/candidate/${candidate.id}?programId=${programId}&status=${filterStatus}`} className="flex-1 sm:flex-none">
                        <Button size="sm" variant="outline" className="w-full text-xs sm:text-sm h-8 sm:h-9">
                          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span className="hidden xs:inline">Analytics</span>
                          <span className="xs:hidden">Stats</span>
                        </Button>
                      </Link>
                    )}
                    {candidate.status === "pending" && (
                      <>
                        <Link href={`/candidate/${candidate.id}?programId=${programId}&status=${filterStatus}`} className="flex-1 sm:flex-none">
                          <Button size="sm" variant="outline" className="w-full text-xs sm:text-sm h-8 sm:h-9">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Schedule
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline" className="flex-1 sm:flex-none text-[var(--tech-red)] text-xs sm:text-sm h-8 sm:h-9">
                          Reject
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 sm:h-9 sm:w-9">
                      <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
              <Search className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground" />
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">No candidates found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}