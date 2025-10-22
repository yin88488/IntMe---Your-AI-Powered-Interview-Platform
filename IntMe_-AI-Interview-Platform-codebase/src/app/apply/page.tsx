"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Brain, Upload, FileText, CheckCircle2, ArrowLeft, Mail, User, GraduationCap, Phone, MapPin, Link as LinkIcon, PartyPopper } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [projectLink, setProjectLink] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map(f => f.name);
      setUploadedFiles([...uploadedFiles, ...files]);
    }
  };

  const handleSubmit = () => {
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-md bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => router.push("/")} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] bg-clip-text text-transparent">
                InvMe
              </span>
            </button>
            <Button variant="ghost" onClick={() => router.push("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        {step !== 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Apply for Program</h1>
            <p className="text-xl text-muted-foreground">
              Submit your application and materials for AI-powered screening
            </p>
          </motion.div>
        )}

        {/* Progress Steps */}
        {step !== 4 && (
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4">
              {[
                { num: 0, label: "Project Link" },
                { num: 1, label: "Personal Info" },
                { num: 2, label: "Upload Materials" },
                { num: 3, label: "Review & Submit" }
              ].map((s, idx) => (
                <div key={s.num} className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= s.num ? "bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white" : "bg-secondary text-muted-foreground"
                    }`}>
                      {s.num + 1}
                    </div>
                    <span className="text-sm mt-2 text-center">{s.label}</span>
                  </div>
                  {idx < 3 && (
                    <div className={`w-16 h-1 rounded-full ${step > s.num ? "bg-[var(--tech-blue)]" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 0: Project Link */}
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Program Information</h2>
              <div className="space-y-6">
                <div>
                  <Label className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    Program/Project Link
                  </Label>
                  <Input 
                    placeholder="https://example.com/program/xyz" 
                    className="mt-2"
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Enter the link to the program or project you're applying for
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={() => setStep(1)}
                  className="bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white"
                  disabled={!projectLink}
                >
                  Continue
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    <Input placeholder="John Doe" className="mt-2" />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    <Input type="email" placeholder="john@example.com" className="mt-2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Input placeholder="+1 (555) 000-0000" className="mt-2" />
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </Label>
                    <Input placeholder="City, State/Country" className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Current Education
                  </Label>
                  <Input placeholder="e.g., PhD Candidate at MIT" className="mt-2" />
                </div>

                <div>
                  <Label>Tell us about yourself</Label>
                  <Textarea 
                    placeholder="Brief introduction about your background, interests, and goals..."
                    className="mt-2"
                    rows={4}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(2)}
                  className="bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white"
                >
                  Continue
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Upload Materials */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Upload Application Materials</h2>
              
              {/* Upload Area */}
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-[var(--tech-blue)] transition-colors cursor-pointer">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Upload your documents</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    CV, Cover Letter, Research Portfolio, Recommendation Letters
                  </p>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                </label>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Uploaded Files ({uploadedFiles.length})</h3>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[var(--tech-green)]" />
                        <span className="flex-1 text-sm">{file}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  className="bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white"
                >
                  Continue
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Review Your Application</h2>
              
              <div className="space-y-6">
                <Card className="p-6 bg-secondary/20">
                  <h3 className="font-semibold mb-4">Program Link</h3>
                  <div className="space-y-2 text-sm">
                    <p className="break-all">{projectLink || "Not provided"}</p>
                  </div>
                </Card>

                <Card className="p-6 bg-secondary/20">
                  <h3 className="font-semibold mb-4">Personal Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> John Doe</p>
                    <p><strong>Email:</strong> john@example.com</p>
                    <p><strong>Phone:</strong> +1 (555) 000-0000</p>
                  </div>
                </Card>

                <Card className="p-6 bg-secondary/20">
                  <h3 className="font-semibold mb-4">Uploaded Materials ({uploadedFiles.length})</h3>
                  <div className="space-y-1 text-sm">
                    {uploadedFiles.map((file, i) => (
                      <p key={i}>• {file}</p>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-r from-[var(--tech-blue)]/5 to-[var(--tech-cyan)]/5 border-[var(--tech-blue)]/20">
                  <div className="flex items-start gap-3">
                    <Brain className="w-6 h-6 text-[var(--tech-blue)] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">AI Pre-Screening Process</h3>
                      <p className="text-sm text-muted-foreground">
                        After submission, our AI system will analyze your CV and materials to generate a comprehensive summary 
                        and tailored interview questions. You'll be notified of the next steps within 24-48 hours.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white"
                >
                  Submit Application
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className="p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[var(--tech-green)] to-[var(--tech-cyan)] rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="w-12 h-12 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
                  Application Submitted! <PartyPopper className="w-8 h-8 text-[var(--tech-cyan)]" />
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Your application has been successfully submitted
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-[var(--tech-blue)]/5 to-[var(--tech-cyan)]/5 rounded-lg p-6 mb-8"
              >
                <div className="flex items-start gap-3 text-left">
                  <Brain className="w-6 h-6 text-[var(--tech-blue)] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">What happens next?</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Our AI agents will analyze your CV and materials</li>
                      <li>• A comprehensive summary and interview questions will be generated</li>
                      <li>• You'll receive an email notification within 24-48 hours</li>
                      <li>• If selected, we'll send you interview scheduling options</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4 justify-center"
              >
                <Button variant="outline" onClick={() => router.push("/")}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
                <Button 
                  onClick={() => {
                    setStep(0);
                    setProjectLink("");
                    setUploadedFiles([]);
                  }}
                  className="bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white"
                >
                  Submit Another Application
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}