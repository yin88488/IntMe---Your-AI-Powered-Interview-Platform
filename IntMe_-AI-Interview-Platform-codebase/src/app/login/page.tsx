"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Brain, Lock, Mail, ArrowRight, Users, GraduationCap, Building2, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type UserType = "applicant" | "interviewer" | null;
type InterviewerRole = "admin" | "regular" | null;

export default function LoginPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>(null);
  const [interviewerRole, setInterviewerRole] = useState<InterviewerRole>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [programId, setProgramId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleApplicantLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      if (programId) {
        router.push(`/apply?programId=${programId}`);
      } else {
        router.push("/apply");
      }
    }, 1000);
  };

  const handleInterviewerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      // Store role in session/localStorage for demo
      if (interviewerRole) {
        localStorage.setItem("interviewerRole", interviewerRole);
      }
      router.push("/dashboard");
    }, 1000);
  };

  const handleSSOLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Default to regular role for SSO
      localStorage.setItem("interviewerRole", "regular");
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--tech-blue)]/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--tech-cyan)]/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-5xl">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] rounded-lg flex items-center justify-center">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] bg-clip-text text-transparent">
            IntMe!
          </span>
        </Link>

        <AnimatePresence mode="wait">
          {/* Step 1: Choose User Type */}
          {!userType && (
            <motion.div
              key="user-type"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <Card 
                className="p-8 cursor-pointer hover:shadow-xl transition-all hover:border-[var(--tech-blue)] group"
                onClick={() => setUserType("applicant")}
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[var(--tech-blue)]/10 to-[var(--tech-cyan)]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-10 h-10 text-[var(--tech-blue)]" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">I'm an Applicant</h2>
                  <p className="text-muted-foreground mb-4">
                    Apply for programs and submit your materials
                  </p>
                  <div className="space-y-2 text-sm text-left">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--tech-blue)]" />
                      Submit CV and application materials
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--tech-blue)]" />
                      Track application status
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--tech-blue)]" />
                      Schedule interviews
                    </div>
                  </div>
                </div>
              </Card>

              <Card 
                className="p-8 cursor-pointer hover:shadow-xl transition-all hover:border-[var(--tech-cyan)] group"
                onClick={() => setUserType("interviewer")}
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[var(--tech-cyan)]/10 to-[var(--tech-purple)]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-10 h-10 text-[var(--tech-cyan)]" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">I'm an Interviewer</h2>
                  <p className="text-muted-foreground mb-4">
                    Review candidates and manage interviews
                  </p>
                  <div className="space-y-2 text-sm text-left">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--tech-cyan)]" />
                      Review AI-screened candidates
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--tech-cyan)]" />
                      Conduct virtual interviews
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--tech-cyan)]" />
                      Access AI-powered insights
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Applicant Login */}
          {userType === "applicant" && (
            <motion.div
              key="applicant-login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="p-8 shadow-xl border-border/50 max-w-md mx-auto">
                <Button
                  variant="ghost"
                  onClick={() => setUserType(null)}
                  className="mb-4"
                >
                  ← Back
                </Button>

                <div className="mb-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[var(--tech-blue)]/10 to-[var(--tech-cyan)]/10 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-[var(--tech-blue)]" />
                  </div>
                  <h1 className="text-2xl font-bold mb-2">Applicant Portal</h1>
                  <p className="text-sm text-muted-foreground">
                    Enter your program information to continue
                  </p>
                </div>

                <form onSubmit={handleApplicantLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="programId">Program ID or Link</Label>
                    <Input
                      id="programId"
                      placeholder="e.g., CS-MS-2025 or full program URL"
                      value={programId}
                      onChange={(e) => setProgramId(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      You can find this in your invitation email
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="applicant-email">Email Address</Label>
                    <Input
                      id="applicant-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white hover:opacity-90 h-11"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : (
                      <>
                        Continue to Application
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Interviewer - Choose Role */}
          {userType === "interviewer" && !interviewerRole && (
            <motion.div
              key="interviewer-role"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <Button
                variant="ghost"
                onClick={() => setUserType(null)}
                className="mb-6"
              >
                ← Back
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card 
                  className="p-8 cursor-pointer hover:shadow-xl transition-all hover:border-[var(--tech-purple)] group"
                  onClick={() => setInterviewerRole("admin")}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[var(--tech-purple)]/10 to-[var(--tech-red)]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Shield className="w-10 h-10 text-[var(--tech-purple)]" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Program Administrator</h2>
                    <p className="text-muted-foreground mb-4">
                      Full access to program management
                    </p>
                    <div className="space-y-2 text-sm text-left">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--tech-purple)]" />
                        Manage multiple programs
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--tech-purple)]" />
                        Configure rubrics and criteria
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--tech-purple)]" />
                        Monitor all interviewers
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--tech-purple)]" />
                        Access analytics and reports
                      </div>
                    </div>
                  </div>
                </Card>

                <Card 
                  className="p-8 cursor-pointer hover:shadow-xl transition-all hover:border-[var(--tech-cyan)] group"
                  onClick={() => setInterviewerRole("regular")}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[var(--tech-cyan)]/10 to-[var(--tech-blue)]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Building2 className="w-10 h-10 text-[var(--tech-cyan)]" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Regular Interviewer</h2>
                    <p className="text-muted-foreground mb-4">
                      Review and interview candidates
                    </p>
                    <div className="space-y-2 text-sm text-left">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--tech-cyan)]" />
                        View assigned programs
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--tech-cyan)]" />
                        Review candidate materials
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--tech-cyan)]" />
                        Conduct interviews
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--tech-cyan)]" />
                        Submit evaluations
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Step 3: Interviewer Login */}
          {userType === "interviewer" && interviewerRole && (
            <motion.div
              key="interviewer-login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="p-8 shadow-xl border-border/50 max-w-md mx-auto">
                <Button
                  variant="ghost"
                  onClick={() => setInterviewerRole(null)}
                  className="mb-4"
                >
                  ← Back
                </Button>

                <div className="mb-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[var(--tech-cyan)]/10 to-[var(--tech-purple)]/10 rounded-full flex items-center justify-center">
                    {interviewerRole === "admin" ? (
                      <Shield className="w-8 h-8 text-[var(--tech-purple)]" />
                    ) : (
                      <Building2 className="w-8 h-8 text-[var(--tech-cyan)]" />
                    )}
                  </div>
                  <h1 className="text-2xl font-bold mb-2">
                    {interviewerRole === "admin" ? "Administrator" : "Interviewer"} Login
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Sign in with your institutional account
                  </p>
                </div>

                {/* SSO Options */}
                <div className="space-y-3 mb-6">
                  <Button 
                    variant="outline" 
                    className="w-full h-12"
                    onClick={() => handleSSOLogin("google")}
                    disabled={isLoading}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google SSO
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-12"
                    onClick={() => handleSSOLogin("microsoft")}
                    disabled={isLoading}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
                    </svg>
                    Sign in with Microsoft SSO
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                  </div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleInterviewerLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Institutional Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="interviewer@university.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[var(--tech-cyan)] to-[var(--tech-purple)] text-white hover:opacity-90 h-11"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Need help? <a href="#" className="text-[var(--tech-blue)] hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  );
}