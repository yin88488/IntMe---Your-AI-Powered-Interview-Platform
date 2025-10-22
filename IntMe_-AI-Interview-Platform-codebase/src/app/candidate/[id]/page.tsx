"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Brain, FileText, Calendar, Mail, Phone, MapPin, GraduationCap, Briefcase, Award, Star, CheckCircle2, Clock, ArrowLeft, Download, MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

// Expanded unified candidate database - 16 candidates from different regions
const candidatesData = {
  "1": {
    name: "Alex Thompson",
    avatar: "https://i.pravatar.cc/150?img=1",
    email: "alex.thompson@email.com",
    phone: "+1 (555) 123-4567",
    location: "Cambridge, MA, USA",
    degree: "Master's in CS",
    school: "Massachusetts Institute of Technology",
    major: "Computer Science - Machine Learning",
    gpa: "3.95 / 4.0",
    status: "interviewed",
    summary: {
      highlights: [
        "3+ years of research experience in machine learning",
        "Published 5 papers in ML conferences",
        "Led development of efficient ML pipelines at Google",
        "Strong background in distributed systems",
        "Teaching assistant for ML courses (2 semesters)"
      ],
      experience: [
        {
          title: "ML Research Assistant",
          company: "MIT CSAIL",
          period: "2022 - Present",
          description: "Leading research on efficient machine learning systems"
        },
        {
          title: "Software Engineer Intern",
          company: "Google",
          period: "Summer 2023",
          description: "Developed ML infrastructure for production systems"
        }
      ],
      skills: ["PyTorch", "TensorFlow", "Python", "Distributed Systems", "Cloud Computing"]
    }
  },
  "2": {
    name: "Maria Garcia",
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "maria.garcia@email.com",
    phone: "+1 (650) 234-5678",
    location: "Palo Alto, CA, USA",
    degree: "BS in Computer Science",
    school: "Stanford University",
    major: "Computer Science - Systems",
    gpa: "3.98 / 4.0",
    status: "scheduled",
    summary: {
      highlights: [
        "Exceptional academic record with highest honors",
        "Published 2 papers in systems conferences",
        "Strong algorithms and data structures background",
        "Contributed to major open-source projects",
        "Winner of ACM programming competition"
      ],
      experience: [
        {
          title: "Undergraduate Researcher",
          company: "Stanford Systems Lab",
          period: "2023 - Present",
          description: "Research on distributed database systems"
        },
        {
          title: "Software Engineering Intern",
          company: "Meta",
          period: "Summer 2023",
          description: "Worked on infrastructure optimization"
        }
      ],
      skills: ["C++", "Go", "Systems Programming", "Databases", "Algorithms"]
    }
  },
  "3": {
    name: "James Chen",
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "james.chen@email.com",
    phone: "+1 (510) 345-6789",
    location: "Berkeley, CA, USA",
    degree: "Master's in AI",
    school: "UC Berkeley",
    major: "Artificial Intelligence",
    gpa: "3.91 / 4.0",
    status: "pending",
    summary: {
      highlights: [
        "Research experience in reinforcement learning",
        "Contributed to PyTorch and TensorFlow frameworks",
        "Strong coding and algorithm skills",
        "Experience with robotics and control systems",
        "Published 3 papers in AI conferences"
      ],
      experience: [
        {
          title: "Graduate Research Assistant",
          company: "UC Berkeley AI Lab",
          period: "2023 - Present",
          description: "Research on deep reinforcement learning"
        },
        {
          title: "AI Research Intern",
          company: "OpenAI",
          period: "Summer 2023",
          description: "Worked on large language model training"
        }
      ],
      skills: ["Python", "PyTorch", "Reinforcement Learning", "Robotics", "Deep Learning"]
    }
  },
  "4": {
    name: "David Kim",
    avatar: "https://i.pravatar.cc/150?img=8",
    email: "david.kim@email.com",
    phone: "+1 (607) 456-7890",
    location: "Ithaca, NY, USA",
    degree: "Master's in ML",
    school: "Cornell University",
    major: "Machine Learning - Computer Vision",
    gpa: "3.96 / 4.0",
    status: "interviewed",
    summary: {
      highlights: [
        "Strong quantitative and mathematical background",
        "Experience with deep learning and computer vision",
        "Industry internships at Meta and Microsoft",
        "Published 4 papers in vision conferences",
        "Winner of Kaggle competitions"
      ],
      experience: [
        {
          title: "Research Assistant",
          company: "Cornell Vision Lab",
          period: "2022 - Present",
          description: "Research on efficient vision transformers"
        },
        {
          title: "Computer Vision Intern",
          company: "Meta Reality Labs",
          period: "Summer 2023",
          description: "Developed AR/VR computer vision systems"
        }
      ],
      skills: ["Python", "Computer Vision", "Deep Learning", "PyTorch", "C++"]
    }
  },
  "5": {
    name: "Emily Zhang",
    avatar: "https://i.pravatar.cc/150?img=9",
    email: "emily.zhang@email.com",
    phone: "+1 (412) 567-8901",
    location: "Pittsburgh, PA, USA",
    degree: "Master's in CS",
    school: "Carnegie Mellon University",
    major: "Computer Science - NLP",
    gpa: "3.93 / 4.0",
    status: "scheduled",
    summary: {
      highlights: [
        "Specialized in natural language processing",
        "Published 6 papers in NLP conferences",
        "Experience with large language models",
        "Contributed to Hugging Face transformers",
        "Strong software engineering background"
      ],
      experience: [
        {
          title: "Graduate Researcher",
          company: "CMU Language Technologies Institute",
          period: "2022 - Present",
          description: "Research on multilingual language models"
        },
        {
          title: "NLP Research Intern",
          company: "Google Research",
          period: "Summer 2023",
          description: "Worked on language understanding systems"
        }
      ],
      skills: ["Python", "NLP", "Transformers", "PyTorch", "LLMs"]
    }
  },
  "6": {
    name: "Sophie Anderson",
    avatar: "https://i.pravatar.cc/150?img=10",
    email: "sophie.anderson@email.com",
    phone: "+44 1223 456789",
    location: "Cambridge, UK",
    degree: "Master's in CS",
    school: "University of Cambridge",
    major: "Computer Science - AI",
    gpa: "First Class Honours",
    status: "interviewed",
    summary: {
      highlights: [
        "Distinguished graduate from Cambridge",
        "Research in explainable AI",
        "Published 4 papers in top-tier conferences",
        "Experience with probabilistic programming",
        "Scholarship recipient"
      ],
      experience: [
        {
          title: "Research Assistant",
          company: "Cambridge AI Lab",
          period: "2022 - Present",
          description: "Research on interpretable machine learning"
        },
        {
          title: "ML Research Intern",
          company: "DeepMind",
          period: "Summer 2023",
          description: "Worked on AI safety and alignment"
        }
      ],
      skills: ["Python", "Probabilistic ML", "JAX", "Bayesian Methods", "Ethics in AI"]
    }
  },
  "7": {
    name: "Lucas Mueller",
    avatar: "https://i.pravatar.cc/150?img=13",
    email: "lucas.mueller@email.com",
    phone: "+41 44 632 1234",
    location: "Zurich, Switzerland",
    degree: "Master's in CS",
    school: "ETH Zurich",
    major: "Computer Science - Robotics",
    gpa: "5.8 / 6.0",
    status: "pending",
    summary: {
      highlights: [
        "Top student at ETH Zurich",
        "Research in autonomous systems",
        "Published 3 papers in robotics conferences",
        "Experience with sensor fusion",
        "Competition winner in robot navigation"
      ],
      experience: [
        {
          title: "Research Assistant",
          company: "ETH Robotics Lab",
          period: "2023 - Present",
          description: "Research on autonomous navigation"
        },
        {
          title: "Robotics Engineer Intern",
          company: "ABB Robotics",
          period: "Summer 2023",
          description: "Developed control algorithms for industrial robots"
        }
      ],
      skills: ["C++", "ROS", "Computer Vision", "Control Theory", "SLAM"]
    }
  },
  "8": {
    name: "Yuki Tanaka",
    avatar: "https://i.pravatar.cc/150?img=14",
    email: "yuki.tanaka@email.com",
    phone: "+81 3 5841 1234",
    location: "Tokyo, Japan",
    degree: "Master's in CS",
    school: "University of Tokyo",
    major: "Computer Science - HCI",
    gpa: "3.9 / 4.0",
    status: "scheduled",
    summary: {
      highlights: [
        "Excellence in human-computer interaction",
        "Published 5 papers in CHI and UIST",
        "Experience with AR/VR interfaces",
        "Strong design and prototyping skills",
        "Award-winning thesis project"
      ],
      experience: [
        {
          title: "Graduate Researcher",
          company: "University of Tokyo HCI Lab",
          period: "2022 - Present",
          description: "Research on intuitive AR interfaces"
        },
        {
          title: "UX Research Intern",
          company: "Sony Research",
          period: "Summer 2023",
          description: "Designed novel interaction paradigms"
        }
      ],
      skills: ["Unity", "C#", "Python", "UI/UX Design", "AR/VR"]
    }
  },
  "9": {
    name: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?img=16",
    email: "priya.sharma@email.com",
    phone: "+65 6516 1234",
    location: "Singapore",
    degree: "Master's in CS",
    school: "National University of Singapore",
    major: "Computer Science - Data Science",
    gpa: "4.8 / 5.0",
    status: "interviewed",
    summary: {
      highlights: [
        "Expertise in data science and analytics",
        "Published 4 papers in data mining conferences",
        "Experience with large-scale data processing",
        "Strong statistical modeling background",
        "Industry project collaborations"
      ],
      experience: [
        {
          title: "Research Assistant",
          company: "NUS Data Science Lab",
          period: "2022 - Present",
          description: "Research on scalable machine learning"
        },
        {
          title: "Data Scientist Intern",
          company: "Grab",
          period: "Summer 2023",
          description: "Built recommendation systems"
        }
      ],
      skills: ["Python", "R", "Spark", "SQL", "Statistics"]
    }
  },
  "10": {
    name: "Mohammed Al-Rahman",
    avatar: "https://i.pravatar.cc/150?img=17",
    email: "mohammed.alrahman@email.com",
    phone: "+44 1865 123456",
    location: "Oxford, UK",
    degree: "Master's in CS",
    school: "University of Oxford",
    major: "Computer Science - Security",
    gpa: "Distinction",
    status: "pending",
    summary: {
      highlights: [
        "Specialized in cybersecurity and cryptography",
        "Published 3 papers in security conferences",
        "Experience with blockchain technology",
        "Strong mathematical background",
        "CTF competition champion"
      ],
      experience: [
        {
          title: "Security Researcher",
          company: "Oxford Security Lab",
          period: "2023 - Present",
          description: "Research on post-quantum cryptography"
        },
        {
          title: "Security Engineer Intern",
          company: "Amazon Web Services",
          period: "Summer 2023",
          description: "Worked on cloud security infrastructure"
        }
      ],
      skills: ["Cryptography", "Python", "Blockchain", "Network Security", "C"]
    }
  },
  "11": {
    name: "Isabella Costa",
    avatar: "https://i.pravatar.cc/150?img=20",
    email: "isabella.costa@email.com",
    phone: "+1 (609) 234-5678",
    location: "Princeton, NJ, USA",
    degree: "Master's in CS",
    school: "Princeton University",
    major: "Computer Science - Theory",
    gpa: "3.97 / 4.0",
    status: "scheduled",
    summary: {
      highlights: [
        "Strong theoretical computer science background",
        "Published 3 papers in STOC and FOCS",
        "Excellence in algorithms and complexity",
        "Winner of math olympiad",
        "Teaching assistant for algorithms course"
      ],
      experience: [
        {
          title: "Graduate Researcher",
          company: "Princeton Theory Group",
          period: "2022 - Present",
          description: "Research on approximation algorithms"
        },
        {
          title: "Research Intern",
          company: "Microsoft Research",
          period: "Summer 2023",
          description: "Worked on algorithmic fairness"
        }
      ],
      skills: ["Algorithms", "Python", "C++", "Mathematical Optimization", "Graph Theory"]
    }
  },
  "12": {
    name: "Wei Chen",
    avatar: "https://i.pravatar.cc/150?img=33",
    email: "wei.chen@email.com",
    phone: "+86 10 6275 1234",
    location: "Beijing, China",
    degree: "Master's in CS",
    school: "Tsinghua University",
    major: "Computer Science - Systems",
    gpa: "92 / 100",
    status: "interviewed",
    summary: {
      highlights: [
        "Top graduate from Tsinghua University",
        "Research in distributed systems",
        "Published 5 papers in systems conferences",
        "Experience with cloud computing",
        "Open-source contributor"
      ],
      experience: [
        {
          title: "Research Assistant",
          company: "Tsinghua Systems Lab",
          period: "2022 - Present",
          description: "Research on distributed consensus"
        },
        {
          title: "Systems Engineer Intern",
          company: "ByteDance",
          period: "Summer 2023",
          description: "Worked on large-scale storage systems"
        }
      ],
      skills: ["Go", "C++", "Distributed Systems", "Kubernetes", "Cloud Computing"]
    }
  },
  "13": {
    name: "Anna Kowalski",
    avatar: "https://i.pravatar.cc/150?img=24",
    email: "anna.kowalski@email.com",
    phone: "+44 20 7594 1234",
    location: "London, UK",
    degree: "Master's in CS",
    school: "Imperial College London",
    major: "Computer Science - AI",
    gpa: "First Class Honours",
    status: "pending",
    summary: {
      highlights: [
        "Distinguished student at Imperial College",
        "Research in generative AI",
        "Published 4 papers in AI conferences",
        "Experience with GANs and diffusion models",
        "Art and technology intersection"
      ],
      experience: [
        {
          title: "Graduate Researcher",
          company: "Imperial AI Lab",
          period: "2023 - Present",
          description: "Research on controllable generation"
        },
        {
          title: "ML Research Intern",
          company: "Stability AI",
          period: "Summer 2023",
          description: "Worked on image generation models"
        }
      ],
      skills: ["Python", "PyTorch", "GANs", "Diffusion Models", "Computer Vision"]
    }
  },
  "14": {
    name: "Jinho Park",
    avatar: "https://i.pravatar.cc/150?img=33",
    email: "jinho.park@email.com",
    phone: "+82 42 350 1234",
    location: "Daejeon, South Korea",
    degree: "Master's in CS",
    school: "KAIST",
    major: "Computer Science - Mobile Computing",
    gpa: "4.2 / 4.3",
    status: "scheduled",
    summary: {
      highlights: [
        "Excellence in mobile and edge computing",
        "Published 4 papers in mobile systems conferences",
        "Experience with IoT and 5G",
        "Strong systems programming skills",
        "Patent holder"
      ],
      experience: [
        {
          title: "Research Assistant",
          company: "KAIST Mobile Systems Lab",
          period: "2022 - Present",
          description: "Research on edge AI optimization"
        },
        {
          title: "Mobile Engineer Intern",
          company: "Samsung Research",
          period: "Summer 2023",
          description: "Developed on-device ML frameworks"
        }
      ],
      skills: ["Android", "Kotlin", "C++", "Edge Computing", "TensorFlow Lite"]
    }
  },
  "15": {
    name: "Olivia Brown",
    avatar: "https://i.pravatar.cc/150?img=45",
    email: "olivia.brown@email.com",
    phone: "+1 (617) 456-7890",
    location: "Cambridge, MA, USA",
    degree: "Master's in CS",
    school: "Harvard University",
    major: "Computer Science - Computational Biology",
    gpa: "3.94 / 4.0",
    status: "interviewed",
    summary: {
      highlights: [
        "Interdisciplinary expertise in CS and biology",
        "Published 5 papers in bioinformatics journals",
        "Experience with genomic data analysis",
        "Strong statistical and ML background",
        "Collaboration with medical researchers"
      ],
      experience: [
        {
          title: "Graduate Researcher",
          company: "Harvard Biomedical Informatics",
          period: "2022 - Present",
          description: "Research on protein structure prediction"
        },
        {
          title: "Computational Biology Intern",
          company: "Moderna",
          period: "Summer 2023",
          description: "Worked on mRNA design optimization"
        }
      ],
      skills: ["Python", "R", "Bioinformatics", "Machine Learning", "Statistics"]
    }
  },
  "16": {
    name: "Daniel Martinez",
    avatar: "https://i.pravatar.cc/150?img=51",
    email: "daniel.martinez@email.com",
    phone: "+1 (212) 789-0123",
    location: "New York, NY, USA",
    degree: "Master's in CS",
    school: "Columbia University",
    major: "Computer Science - Networks",
    gpa: "3.92 / 4.0",
    status: "pending",
    summary: {
      highlights: [
        "Expertise in networking and communications",
        "Published 3 papers in networking conferences",
        "Experience with SDN and NFV",
        "Strong protocol design skills",
        "Industry collaboration projects"
      ],
      experience: [
        {
          title: "Research Assistant",
          company: "Columbia Networking Lab",
          period: "2023 - Present",
          description: "Research on programmable networks"
        },
        {
          title: "Network Engineer Intern",
          company: "Cisco Systems",
          period: "Summer 2023",
          description: "Worked on SDN controller development"
        }
      ],
      skills: ["Python", "C", "Network Programming", "SDN", "Protocol Design"]
    }
  }
};

export default function CandidateDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const candidateId = params.id as string;
  const programId = searchParams.get("programId") || "1";
  const returnStatus = searchParams.get("status") || "all";
  const candidate = candidatesData[candidateId as keyof typeof candidatesData];

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Candidate Not Found</h2>
          <p className="text-muted-foreground mb-6">The candidate you're looking for doesn't exist.</p>
          <Link href={`/program/${programId}?status=${returnStatus}`}>
            <Button>Back to Program</Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Calculate total candidates and rank
  const totalCandidates = Object.keys(candidatesData).length;
  const interviewedCandidates = Object.values(candidatesData).filter(c => c.status === "interviewed");
  
  // Calculate rank based on a scoring system (for interviewed candidates)
  const calculateScore = (cand: typeof candidate) => {
    // Simple scoring based on highlights, experience, and skills
    const highlightsScore = cand.summary.highlights.length * 10;
    const experienceScore = cand.summary.experience.length * 15;
    const skillsScore = cand.summary.skills.length * 5;
    return highlightsScore + experienceScore + skillsScore;
  };
  
  const currentScore = calculateScore(candidate);
  const allScores = Object.values(candidatesData).map(c => ({
    id: Object.keys(candidatesData).find(key => candidatesData[key as keyof typeof candidatesData] === c),
    score: calculateScore(c)
  })).sort((a, b) => b.score - a.score);
  
  const currentRank = allScores.findIndex(s => s.id === candidateId) + 1;

  const aiQuestions = [
    `Can you tell us more about your experience at ${candidate.summary.experience[0].company}?`,
    `How has your work in ${candidate.major} influenced your research direction?`,
    `What challenges did you face in your most recent project?`,
    "Describe your approach to problem-solving in research",
    "What are your thoughts on current trends in your field?",
    "How do you ensure reproducibility in your work?",
    "Tell us about a time when an experiment or project failed",
    "What's your vision for your future research?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Navigation - responsive height */}
      <nav className="border-b border-border/50 backdrop-blur-md bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] bg-clip-text text-transparent">
                IntMe
              </span>
            </Link>
            <Link href={`/program/${programId}?status=${returnStatus}`}>
              <Button variant="ghost" className="text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4">
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Back to Program</span>
                <span className="xs:hidden">Back</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Sidebar - Candidate Info */}
          <div className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-4 sm:p-6">
                <div className="text-center mb-4 sm:mb-6">
                  <Avatar className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto mb-3 sm:mb-4 border-2 sm:border-4 border-[var(--tech-blue)]">
                    <AvatarImage src={candidate.avatar} />
                    <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 break-words px-2">{candidate.name}</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 px-2 line-clamp-2">{candidate.major}</p>
                  <Badge className="bg-[var(--tech-green)]/10 text-[var(--tech-green)] border-[var(--tech-green)]/20 text-xs sm:text-sm">
                    <Calendar className="w-3 h-3 mr-1" />
                    {candidate.status === "interview" ? "Interview Scheduled" : candidate.status === "scheduled" ? "Interview Upcoming" : "Pending Review"}
                  </Badge>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground truncate">{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground truncate">{candidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground truncate">{candidate.location}</span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-blue)] flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="font-semibold text-sm sm:text-base break-words">{candidate.degree}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{candidate.school}</div>
                        <Badge variant="secondary" className="mt-1 text-xs">GPA: {candidate.gpa}</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 space-y-2">
                  {/* Show Schedule Interview button for pending candidates */}
                  {candidate.status === "pending" && (
                    <Link href={`/candidate/${candidateId}/schedule?programId=${programId}`}>
                      <Button className="w-full bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white text-xs sm:text-sm h-9 sm:h-10">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Schedule Interview
                      </Button>
                    </Link>
                  )}
                  {/* Show Start Interview button for scheduled candidates */}
                  {(candidate.status === "scheduled" || candidate.status === "interview") && (
                    <Link href={`/interview/${candidateId}`}>
                      <Button className="w-full bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white text-xs sm:text-sm h-9 sm:h-10">
                        <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Start Interview
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" className="w-full text-xs sm:text-sm h-9 sm:h-10">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Download CV
                  </Button>
                </div>
              </Card>

              {/* AI Rating */}
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-[var(--tech-blue)]/5 to-[var(--tech-cyan)]/5 border-[var(--tech-blue)]/20">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[var(--tech-blue)]/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-blue)]" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base">AI Assessment</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-muted-foreground truncate mr-2">Research Quality</span>
                    <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-[var(--tech-blue)] text-[var(--tech-blue)]" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-muted-foreground truncate mr-2">Academic Excellence</span>
                    <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-[var(--tech-blue)] text-[var(--tech-blue)]" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-muted-foreground truncate mr-2">Practical Experience</span>
                    <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i <= 4 ? 'fill-[var(--tech-blue)] text-[var(--tech-blue)]' : 'text-muted'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
                  <TabsTrigger value="summary" className="text-xs sm:text-sm whitespace-nowrap">AI Summary</TabsTrigger>
                  {candidate.status === "interviewed" && (
                    <TabsTrigger value="performance" className="text-xs sm:text-sm whitespace-nowrap">Performance</TabsTrigger>
                  )}
                  <TabsTrigger value="questions" className="text-xs sm:text-sm whitespace-nowrap">Questions</TabsTrigger>
                  <TabsTrigger value="materials" className="text-xs sm:text-sm whitespace-nowrap">Materials</TabsTrigger>
                  <TabsTrigger value="timeline" className="text-xs sm:text-sm whitespace-nowrap">Timeline</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                  {/* Highlights */}
                  <Card className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-blue)]" />
                      Key Highlights
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {candidate.summary.highlights.map((highlight, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-secondary/30 rounded-lg"
                        >
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-green)] flex-shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm">{highlight}</p>
                        </motion.div>
                      ))}
                    </div>
                  </Card>

                  {/* Experience */}
                  <Card className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-cyan)]" />
                      Experience
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {candidate.summary.experience.map((exp, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="border-l-2 border-[var(--tech-cyan)] pl-3 sm:pl-4"
                        >
                          <div className="font-semibold text-sm sm:text-base break-words">{exp.title}</div>
                          <div className="text-xs sm:text-sm text-[var(--tech-cyan)] break-words">{exp.company}</div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">{exp.period}</div>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-2">{exp.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </Card>

                  {/* Skills */}
                  <Card className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">Technical Skills</h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {candidate.summary.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs sm:text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                {candidate.status === "interviewed" && (
                  <TabsContent value="performance" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                    <Card className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                        <div>
                          <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-blue)]" />
                            Performance Analytics
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">Interactive radar chart showing candidate performance</p>
                        </div>
                        <Link href={`/analytics?programId=${programId}`}>
                          <Button variant="outline" size="sm" className="text-xs sm:text-sm whitespace-nowrap">
                            Compare All
                          </Button>
                        </Link>
                      </div>

                      {/* 3D Radar Chart Container - responsive height */}
                      <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-black/80 to-[var(--tech-blue)]/10 rounded-xl overflow-hidden border border-[var(--tech-blue)]/20">
                        {/* Animated Background Grid */}
                        <div className="absolute inset-0">
                          <svg className="w-full h-full opacity-20">
                            {Array.from({ length: 20 }).map((_, i) => (
                              <motion.line
                                key={`h-${i}`}
                                x1="0"
                                y1={i * 20}
                                x2="100%"
                                y2={i * 20}
                                stroke="var(--tech-cyan)"
                                strokeWidth="0.5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: i * 0.05 }}
                              />
                            ))}
                            {Array.from({ length: 30 }).map((_, i) => (
                              <motion.line
                                key={`v-${i}`}
                                x1={i * 20}
                                y1="0"
                                x2={i * 20}
                                y2="100%"
                                stroke="var(--tech-cyan)"
                                strokeWidth="0.5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: i * 0.05 }}
                              />
                            ))}
                          </svg>
                        </div>

                        {/* 3D Radar Chart */}
                        <div className="relative w-full h-full flex items-center justify-center">
                          <svg viewBox="0 0 400 400" className="w-full h-full max-w-md">
                            {/* Background circles */}
                            {[100, 80, 60, 40, 20].map((r, i) => (
                              <motion.circle
                                key={r}
                                cx="200"
                                cy="200"
                                r={r}
                                fill="none"
                                stroke="var(--tech-blue)"
                                strokeOpacity={0.2 - i * 0.03}
                                strokeWidth="1"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                              />
                            ))}

                            {/* Radar lines */}
                            {[
                              { label: "Technical", angle: 0, value: 92 },
                              { label: "Communication", angle: 51.4, value: 88 },
                              { label: "Research", angle: 102.8, value: 95 },
                              { label: "Leadership", angle: 154.2, value: 85 },
                              { label: "Innovation", angle: 205.6, value: 90 },
                              { label: "Consistency", angle: 257, value: 94 },
                              { label: "Behavior", angle: 308.4, value: 87 }
                            ].map((dimension, i) => {
                              const angle = (dimension.angle * Math.PI) / 180;
                              const x = 200 + Math.cos(angle) * 120;
                              const y = 200 + Math.sin(angle) * 120;
                              const dataX = 200 + Math.cos(angle) * (dimension.value * 1.2);
                              const dataY = 200 + Math.sin(angle) * (dimension.value * 1.2);
                              
                              return (
                                <g key={dimension.label}>
                                  {/* Axis line */}
                                  <motion.line
                                    x1="200"
                                    y1="200"
                                    x2={x}
                                    y2={y}
                                    stroke="var(--tech-cyan)"
                                    strokeOpacity="0.3"
                                    strokeWidth="1"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                  />
                                  
                                  {/* Data point */}
                                  <motion.circle
                                    cx={dataX}
                                    cy={dataY}
                                    r="6"
                                    fill="var(--tech-blue)"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                                    className="drop-shadow-lg"
                                  />
                                  
                                  {/* Label */}
                                  <motion.text
                                    x={200 + Math.cos(angle) * 140}
                                    y={200 + Math.sin(angle) * 140}
                                    fill="white"
                                    fontSize="12"
                                    textAnchor="middle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 + i * 0.1 }}
                                    className="font-semibold"
                                  >
                                    {dimension.label}
                                  </motion.text>
                                  
                                  {/* Score */}
                                  <motion.text
                                    x={200 + Math.cos(angle) * 155}
                                    y={200 + Math.sin(angle) * 155}
                                    fill="var(--tech-cyan)"
                                    fontSize="10"
                                    textAnchor="middle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 + i * 0.1 }}
                                  >
                                    {dimension.value}
                                  </motion.text>
                                </g>
                              );
                            })}

                            {/* Data polygon */}
                            <motion.polygon
                              points={[
                                { angle: 0, value: 92 },
                                { angle: 51.4, value: 88 },
                                { angle: 102.8, value: 95 },
                                { angle: 154.2, value: 85 },
                                { angle: 205.6, value: 90 },
                                { angle: 257, value: 94 },
                                { angle: 308.4, value: 87 }
                              ]
                                .map(d => {
                                  const angle = (d.angle * Math.PI) / 180;
                                  const x = 200 + Math.cos(angle) * (d.value * 1.2);
                                  const y = 200 + Math.sin(angle) * (d.value * 1.2);
                                  return `${x},${y}`;
                                })
                                .join(" ")}
                              fill="var(--tech-blue)"
                              fillOpacity="0.3"
                              stroke="var(--tech-cyan)"
                              strokeWidth="2"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.8, delay: 0.5 }}
                            />

                            {/* Average comparison polygon */}
                            <motion.polygon
                              points={[
                                { angle: 0, value: 75 },
                                { angle: 51.4, value: 72 },
                                { angle: 102.8, value: 78 },
                                { angle: 154.2, value: 70 },
                                { angle: 205.6, value: 73 },
                                { angle: 257, value: 76 },
                                { angle: 308.4, value: 74 }
                              ]
                                .map(d => {
                                  const angle = (d.angle * Math.PI) / 180;
                                  const x = 200 + Math.cos(angle) * (d.value * 1.2);
                                  const y = 200 + Math.sin(angle) * (d.value * 1.2);
                                  return `${x},${y}`;
                                })
                                .join(" ")}
                              fill="none"
                              stroke="var(--tech-red)"
                              strokeWidth="2"
                              strokeDasharray="4"
                              strokeOpacity="0.5"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.8, delay: 0.7 }}
                            />
                          </svg>
                        </div>

                        {/* Legend - responsive */}
                        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-center gap-3 sm:gap-6">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[var(--tech-blue)]" />
                            <span className="text-[10px] sm:text-xs text-white">This Candidate</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="w-3 h-0.5 sm:w-4 sm:h-1 bg-[var(--tech-red)]" />
                            <span className="text-[10px] sm:text-xs text-white">Program Average</span>
                          </div>
                        </div>
                      </div>

                      {/* Performance Metrics Grid - responsive */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mt-4 sm:mt-6">
                        {[
                          { label: "Overall Score", value: "90.1", color: "tech-blue" },
                          { label: "vs Average", value: "+15.3%", color: "tech-green" },
                          { label: "Rank", value: `${currentRank} / ${totalCandidates}`, color: "tech-cyan" },
                          { label: "Percentile", value: `Top ${Math.round((currentRank / totalCandidates) * 100)}%`, color: "tech-purple" }
                        ].map((metric, i) => (
                          <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + i * 0.1 }}
                          >
                            <Card className={`p-3 sm:p-4 bg-gradient-to-br from-[var(--${metric.color})]/10 to-transparent border-[var(--${metric.color})]/20`}>
                              <div className="text-[10px] sm:text-xs text-muted-foreground mb-1 truncate">{metric.label}</div>
                              <div className={`text-lg sm:text-xl lg:text-2xl font-bold text-[var(--${metric.color})] truncate`}>{metric.value}</div>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </Card>
                  </TabsContent>
                )}

                <TabsContent value="questions" className="mt-4 sm:mt-6">
                  <Card className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[var(--tech-blue)]/10 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-blue)]" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg lg:text-xl font-semibold truncate">
                          {candidate.status === "interviewed" ? "Interview Q&A" : "AI-Generated Questions"}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                          {candidate.status === "interviewed" 
                            ? "Questions with candidate responses" 
                            : "Tailored based on CV analysis"}
                        </p>
                      </div>
                    </div>

                    {candidate.status === "interviewed" ? (
                      // Interviewed candidates: Show questions with answers
                      <div className="space-y-6">
                        {[
                          {
                            question: `Can you tell us more about your experience at ${candidate.summary.experience[0].company}?`,
                            answer: "Candidate discussed their role in developing ML infrastructure, emphasizing collaboration with cross-functional teams. Highlighted specific projects involving distributed systems and mentioned challenges in scaling production models. Strong technical depth demonstrated."
                          },
                          {
                            question: `How has your work in ${candidate.major} influenced your research direction?`,
                            answer: "Explained how coursework and research experiences shaped their interest in efficient machine learning systems. Drew connections between theoretical foundations and practical applications. Showed clear vision for future research goals."
                          },
                          {
                            question: "What challenges did you face in your most recent project?",
                            answer: "Described technical challenges with model optimization and deployment. Discussed trade-offs between accuracy and latency. Demonstrated problem-solving approach and ability to make informed engineering decisions under constraints."
                          },
                          {
                            question: "Describe your approach to problem-solving in research",
                            answer: "Outlined systematic methodology: literature review, hypothesis formation, experimentation, and iteration. Emphasized importance of reproducibility and collaboration. Mentioned specific tools and frameworks used in their research workflow."
                          }
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-secondary/20 rounded-lg p-5 border border-border"
                          >
                            <div className="flex gap-4 mb-4">
                              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--tech-blue)]/10 flex items-center justify-center text-sm font-bold text-[var(--tech-blue)]">
                                Q{i + 1}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium mb-3">{item.question}</p>
                                <div className="bg-[var(--tech-green)]/5 border border-[var(--tech-green)]/20 rounded-lg p-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <MessageSquare className="w-4 h-4 text-[var(--tech-green)]" />
                                    <span className="text-xs font-semibold text-[var(--tech-green)] uppercase">Answer Summary</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      // Non-interviewed candidates: Show suggested questions
                      <div className="space-y-4">
                        {aiQuestions.map((question, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex gap-4 p-4 bg-secondary/20 rounded-lg hover:bg-secondary/40 transition-colors"
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--tech-blue)]/10 flex items-center justify-center text-sm font-bold text-[var(--tech-blue)]">
                              {i + 1}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">{question}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </Card>
                </TabsContent>

                <TabsContent value="materials" className="mt-4 sm:mt-6">
                  <Card className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-purple)]" />
                      Uploaded Materials
                    </h3>
                    <div className="space-y-3">
                      {[`CV_${candidate.name.replace(' ', '_')}.pdf`, 'Research_Portfolio.pdf', 'Publications_List.pdf', 'Recommendation_Letter_1.pdf'].map((file, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg hover:bg-secondary/40 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-[var(--tech-blue)]" />
                            <span className="text-sm">{file}</span>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="timeline" className="mt-4 sm:mt-6">
                  <Card className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--tech-green)]" />
                      Application Timeline
                    </h3>
                    <div className="space-y-6">
                      {[
                        { date: '2024-01-15', event: 'Application Submitted', status: 'completed' },
                        { date: '2024-01-16', event: 'AI Pre-screening Completed', status: 'completed' },
                        ...(candidate.status !== "pending" ? [
                          { date: '2024-01-18', event: 'Interview Invitation Sent', status: 'completed' },
                          { date: '2024-01-22', event: 'Interview Scheduled', status: 'completed' },
                        ] : []),
                        ...(candidate.status === "interviewed" || candidate.status === "scheduled" ? [
                          { date: '2024-01-25 10:00 AM', event: 'Virtual Interview', status: candidate.status === "interviewed" ? 'completed' : 'upcoming' },
                        ] : [])
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-4"
                        >
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full ${item.status === 'completed' ? 'bg-[var(--tech-green)]' : 'bg-[var(--tech-blue)] animate-pulse'}`} />
                            {i < (candidate.status === "pending" ? 1 : candidate.status === "scheduled" || candidate.status === "interviewed" ? 4 : 3) && <div className="w-0.5 h-12 bg-border mt-2" />}
                          </div>
                          <div className="flex-1 pb-8">
                            <div className="text-sm text-muted-foreground">{item.date}</div>
                            <div className="font-medium">{item.event}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}