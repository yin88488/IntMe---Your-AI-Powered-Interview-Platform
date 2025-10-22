"use client";

import { useState, useEffect, Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  ChevronLeft,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Brain,
  ArrowRight,
  Save
} from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  weight: number;
}

interface CalibrationQuestion {
  id: string;
  criterion: string;
  scenario: string;
  options: Array<{
    id: string;
    description: string;
    alignment: number; // 0-100
  }>;
}

function RubricCalibrationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const programId = searchParams.get("programId") || "1";
  
  const [step, setStep] = useState<"setup" | "calibration" | "complete">("setup");
  const [rubrics, setRubrics] = useState<RubricCriterion[]>([
    { id: "1", name: "Technical Skills", description: "Depth of technical knowledge and problem-solving ability", weight: 30 },
    { id: "2", name: "Communication", description: "Clarity of expression and structured thinking", weight: 25 },
    { id: "3", name: "Research Experience", description: "Quality and depth of research background", weight: 25 },
    { id: "4", name: "Leadership", description: "Leadership potential and team collaboration", weight: 20 }
  ]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [calibrationAnswers, setCalibrationAnswers] = useState<Record<string, string>>({});
  const [alignmentScore, setAlignmentScore] = useState(0);

  // Generate calibration questions based on rubrics
  const calibrationQuestions: CalibrationQuestion[] = rubrics.map((rubric, idx) => ({
    id: `q${idx}`,
    criterion: rubric.name,
    scenario: getScenarioForCriterion(rubric.name),
    options: [
      { id: "a", description: getOptionA(rubric.name), alignment: 100 },
      { id: "b", description: getOptionB(rubric.name), alignment: 75 },
      { id: "c", description: getOptionC(rubric.name), alignment: 50 },
      { id: "d", description: getOptionD(rubric.name), alignment: 25 }
    ]
  }));

  const addRubric = () => {
    const newId = (rubrics.length + 1).toString();
    setRubrics([...rubrics, { 
      id: newId, 
      name: "", 
      description: "", 
      weight: 0 
    }]);
  };

  const updateRubric = (id: string, field: keyof RubricCriterion, value: string | number) => {
    setRubrics(rubrics.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const removeRubric = (id: string) => {
    setRubrics(rubrics.filter(r => r.id !== id));
  };

  const totalWeight = rubrics.reduce((sum, r) => sum + r.weight, 0);

  const handleCalibrationAnswer = (questionId: string, optionId: string) => {
    const question = calibrationQuestions.find(q => q.id === questionId);
    const option = question?.options.find(o => o.id === optionId);
    
    if (option) {
      setCalibrationAnswers({ ...calibrationAnswers, [questionId]: optionId });
      
      // Calculate alignment score
      const totalAlignment = Object.entries({ ...calibrationAnswers, [questionId]: optionId })
        .reduce((sum, [qId, oId]) => {
          const q = calibrationQuestions.find(cq => cq.id === qId);
          const opt = q?.options.find(o => o.id === oId);
          return sum + (opt?.alignment || 0);
        }, 0);
      
      setAlignmentScore(Math.round(totalAlignment / calibrationQuestions.length));
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < calibrationQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep("complete");
    }
  };

  const currentQuestion = calibrationQuestions[currentQuestionIndex];
  const selectedOption = calibrationAnswers[currentQuestion?.id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--tech-blue)]/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-[var(--tech-cyan)]/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-md bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] bg-clip-text text-transparent">
                InvMe!
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Back Button */}
        <Link href={`/program/${programId}`}>
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Program
          </Button>
        </Link>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {["Setup Rubric", "AI Calibration", "Complete"].map((label, idx) => (
              <div key={idx} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step === ["setup", "calibration", "complete"][idx] 
                    ? "bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white" 
                    : idx < ["setup", "calibration", "complete"].indexOf(step)
                    ? "bg-[var(--tech-green)] text-white"
                    : "bg-secondary text-muted-foreground"
                }`}>
                  {idx < ["setup", "calibration", "complete"].indexOf(step) ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
                <span className="ml-3 text-sm font-medium">{label}</span>
                {idx < 2 && <div className="w-16 h-0.5 bg-border ml-4" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Setup Rubric */}
        {step === "setup" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Configure Evaluation Rubric</h1>
                <p className="text-muted-foreground">Define the criteria and weights for evaluating candidates in this program.</p>
              </div>

              <div className="space-y-4 mb-6">
                {rubrics.map((rubric, idx) => (
                  <motion.div
                    key={rubric.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-secondary/30 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Criterion Name</label>
                            <Input
                              value={rubric.name}
                              onChange={(e) => updateRubric(rubric.id, "name", e.target.value)}
                              placeholder="e.g., Technical Skills"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Weight (%)</label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={rubric.weight}
                              onChange={(e) => updateRubric(rubric.id, "weight", parseInt(e.target.value) || 0)}
                              placeholder="0-100"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Description</label>
                          <Textarea
                            value={rubric.description}
                            onChange={(e) => updateRubric(rubric.id, "description", e.target.value)}
                            placeholder="Describe what this criterion evaluates..."
                            rows={2}
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRubric(rubric.id)}
                        className="text-[var(--tech-red)] hover:bg-[var(--tech-red)]/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-6">
                <Button variant="outline" onClick={addRubric}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Criterion
                </Button>
                <div className="text-sm">
                  <span className="text-muted-foreground">Total Weight: </span>
                  <span className={`font-bold ${totalWeight === 100 ? "text-[var(--tech-green)]" : "text-[var(--tech-red)]"}`}>
                    {totalWeight}%
                  </span>
                  {totalWeight !== 100 && (
                    <span className="text-[var(--tech-red)] ml-2">(Must equal 100%)</span>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Save as Draft</Button>
                <Button 
                  onClick={() => setStep("calibration")}
                  disabled={totalWeight !== 100 || rubrics.some(r => !r.name || !r.description)}
                  className="bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white"
                >
                  Continue to Calibration
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 2: AI Calibration */}
        {step === "calibration" && currentQuestion && (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Card className="p-8">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--tech-purple)] to-[var(--tech-blue)] flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">AI Calibration</h2>
                    <p className="text-sm text-muted-foreground">
                      Question {currentQuestionIndex + 1} of {calibrationQuestions.length}
                    </p>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / calibrationQuestions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="mb-8">
                <Badge className="mb-4 bg-[var(--tech-blue)]/10 text-[var(--tech-blue)] border-[var(--tech-blue)]/30">
                  {currentQuestion.criterion}
                </Badge>
                <h3 className="text-xl font-semibold mb-4">
                  Please rate the following candidate response for "{currentQuestion.criterion}":
                </h3>
                <Card className="p-6 bg-secondary/30 mb-6">
                  <p className="text-muted-foreground leading-relaxed">{currentQuestion.scenario}</p>
                </Card>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium mb-4">How well does this response align with your "{currentQuestion.criterion}" standard?</p>
                {currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => handleCalibrationAnswer(currentQuestion.id, option.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedOption === option.id
                        ? "border-[var(--tech-green)] bg-[var(--tech-green)]/10"
                        : "border-border hover:border-[var(--tech-blue)] hover:bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {option.alignment}% Alignment
                          </Badge>
                          {selectedOption === option.id && (
                            <CheckCircle2 className="w-5 h-5 text-[var(--tech-green)]" />
                          )}
                        </div>
                        <p className="text-sm">{option.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Navigation buttons - always visible */}
              <div className="mt-6 flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {selectedOption && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4 text-[var(--tech-cyan)]" />
                    AI calibrating standards...
                  </div>
                )}

                <Button 
                  onClick={handleNext}
                  className="bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white"
                >
                  {currentQuestionIndex < calibrationQuestions.length - 1 ? "Next Question" : "Complete Calibration"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Complete */}
        {step === "complete" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--tech-green)] to-[var(--tech-cyan)] flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-3xl font-bold mb-4">Calibration Complete!</h2>
              <p className="text-muted-foreground mb-8">
                Your rubric has been configured and AI has been calibrated to your evaluation standards.
              </p>

              <Card className="p-6 bg-gradient-to-br from-[var(--tech-blue)]/5 to-[var(--tech-cyan)]/5 mb-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Rubric Criteria</div>
                    <div className="text-3xl font-bold text-[var(--tech-blue)]">{rubrics.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">AI Alignment Score</div>
                    <div className="text-3xl font-bold text-[var(--tech-green)]">{alignmentScore}%</div>
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-3">Configured Rubric:</h3>
                {rubrics.map((rubric) => (
                  <div key={rubric.id} className="text-left bg-secondary/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{rubric.name}</span>
                      <Badge variant="outline">{rubric.weight}%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rubric.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-8 justify-center">
                <Button variant="outline" onClick={() => setStep("setup")}>
                  Edit Rubric
                </Button>
                <Link href={`/program/${programId}`}>
                  <Button className="bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save & Return to Program
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function RubricCalibrationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--tech-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading rubric calibration...</p>
        </div>
      </div>
    }>
      <RubricCalibrationContent />
    </Suspense>
  );
}

// Helper functions to generate scenarios and options
function getScenarioForCriterion(criterion: string): string {
  const scenarios: Record<string, string> = {
    "Technical Skills": "Candidate discusses implementing a distributed system: 'I used Kafka for message queuing and Redis for caching. The system handled 10k requests/sec with 99.9% uptime. I optimized the database queries using indexing and partitioning strategies.'",
    "Communication": "When asked about a challenging project, candidate responds: 'So there was this time at my internship where things got complicated. We had to do a lot of stuff with the code and it was hard but we managed to finish it eventually.'",
    "Research Experience": "Candidate describes their research: 'I published a paper on neural architecture search in ICML 2024. We developed a novel evolutionary algorithm that reduced search time by 40% while maintaining model accuracy. The work received best paper nomination.'",
    "Leadership": "Candidate shares a team experience: 'In my capstone project, I noticed our team was falling behind schedule. I organized daily standups, delegated tasks based on each member's strengths, and mediated conflicts. We delivered on time with all features implemented.'"
  };
  return scenarios[criterion] || "Generic candidate response about their experience.";
}

function getOptionA(criterion: string): string {
  const options: Record<string, string> = {
    "Technical Skills": "Excellent technical depth with specific technologies, metrics, and optimization strategies",
    "Communication": "Clear, structured response following STAR method with concrete details",
    "Research Experience": "High-impact publication with novel contributions and recognition",
    "Leadership": "Proactive leadership with clear strategies and measurable outcomes"
  };
  return options[criterion] || "Fully meets the criterion with strong evidence";
}

function getOptionB(criterion: string): string {
  const options: Record<string, string> = {
    "Technical Skills": "Good technical knowledge but lacks some specific implementation details",
    "Communication": "Adequate explanation but could be more structured and detailed",
    "Research Experience": "Solid research work but in less prominent venue or lacking impact metrics",
    "Leadership": "Shows leadership initiative but outcomes are less clearly defined"
  };
  return options[criterion] || "Mostly meets the criterion with minor gaps";
}

function getOptionC(criterion: string): string {
  const options: Record<string, string> = {
    "Technical Skills": "Basic technical understanding with limited depth in technologies used",
    "Communication": "Unclear structure and missing key details in the explanation",
    "Research Experience": "Limited research experience or unpublished work",
    "Leadership": "Some team involvement but no clear leadership role demonstrated"
  };
  return options[criterion] || "Partially meets the criterion";
}

function getOptionD(criterion: string): string {
  const options: Record<string, string> = {
    "Technical Skills": "Superficial technical knowledge without specific examples or depth",
    "Communication": "Vague and unstructured response lacking concrete information",
    "Research Experience": "Minimal or no research experience demonstrated",
    "Leadership": "No leadership experience or only followed others' directions"
  };
  return options[criterion] || "Does not meet the criterion";
}