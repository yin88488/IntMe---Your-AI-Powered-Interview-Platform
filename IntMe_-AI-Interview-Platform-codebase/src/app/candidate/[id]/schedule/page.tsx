"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Brain, Calendar, Mail, Phone, MapPin, Clock, ArrowLeft, Send, Video, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

// Same candidate data (simplified for now)
const candidatesData = {
  "3": {
    name: "James Chen",
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "james.chen@email.com",
    phone: "+1 (510) 345-6789",
    location: "Berkeley, CA, USA"
  },
  "7": {
    name: "Lucas Mueller",
    avatar: "https://i.pravatar.cc/150?img=13",
    email: "lucas.mueller@email.com",
    phone: "+41 44 632 1234",
    location: "Zurich, Switzerland"
  },
  "10": {
    name: "Mohammed Al-Rahman",
    avatar: "https://i.pravatar.cc/150?img=17",
    email: "mohammed.alrahman@email.com",
    phone: "+44 1865 123456",
    location: "Oxford, UK"
  },
  "13": {
    name: "Anna Kowalski",
    avatar: "https://i.pravatar.cc/150?img=24",
    email: "anna.kowalski@email.com",
    phone: "+44 20 7594 1234",
    location: "London, UK"
  },
  "16": {
    name: "Daniel Martinez",
    avatar: "https://i.pravatar.cc/150?img=51",
    email: "daniel.martinez@email.com",
    phone: "+1 (212) 789-0123",
    location: "New York, NY, USA"
  }
};

export default function ScheduleInterviewPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const candidateId = params.id as string;
  const programId = searchParams.get("programId") || "1";
  const candidate = candidatesData[candidateId as keyof typeof candidatesData];

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [emailSubject, setEmailSubject] = useState(`Interview Invitation - InvMe Program ${programId}`);
  const [emailBody, setEmailBody] = useState(`Dear ${candidate?.name || "Candidate"},

We are pleased to invite you to an interview for our program. Based on our review of your application, we believe you would be an excellent fit.

Interview Details:
- Format: Virtual (Zoom)
- Duration: 45 minutes
- Interviewer: Program Committee

Please confirm your availability for the proposed time slot. A calendar invitation and Zoom link will be sent upon confirmation.

We look forward to speaking with you!

Best regards,
InvMe Interview Team`);

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Candidate Not Found</h2>
          <Link href={`/program/${programId}`}>
            <Button>Back to Program</Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Calendar logic
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM"
  ];

  const handleSendInvitation = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time");
      return;
    }
    
    // In real app, this would call an API
    console.log("Sending invitation:", {
      candidate: candidate.name,
      email: candidate.email,
      date: selectedDate,
      time: selectedTime,
      subject: emailSubject,
      body: emailBody
    });

    alert(`Interview invitation sent to ${candidate.name}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-md bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)] bg-clip-text text-transparent">
                InvMe
              </span>
            </Link>
            <Link href={`/candidate/${candidateId}?programId=${programId}&status=pending`}>
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Candidate
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16 border-4 border-[var(--tech-blue)]">
                <AvatarImage src={candidate.avatar} />
                <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">Schedule Interview</h1>
                <p className="text-muted-foreground">
                  Candidate: <span className="font-semibold text-foreground">{candidate.name}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{candidate.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{candidate.location}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Calendar & Time Selection */}
            <div className="space-y-6">
              {/* Calendar */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[var(--tech-blue)]" />
                    Select Date
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={prevMonth}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold min-w-[140px] text-center">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <Button variant="ghost" size="sm" onClick={nextMonth}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="space-y-2">
                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-muted-foreground">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day}>{day}</div>
                    ))}
                  </div>

                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-2">
                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    
                    {/* Days of the month */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                      const isSelected = selectedDate?.toDateString() === date.toDateString();
                      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                      return (
                        <button
                          key={day}
                          onClick={() => !isPast && setSelectedDate(date)}
                          disabled={isPast}
                          className={`
                            aspect-square rounded-lg text-sm font-medium transition-all
                            ${isPast ? 'text-muted cursor-not-allowed opacity-30' : 'hover:bg-secondary'}
                            ${isSelected ? 'bg-gradient-to-br from-[var(--tech-blue)] to-[var(--tech-cyan)] text-white' : ''}
                            ${isWeekend && !isSelected && !isPast ? 'text-muted-foreground' : ''}
                          `}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedDate && (
                  <div className="mt-4 p-3 bg-[var(--tech-blue)]/5 rounded-lg border border-[var(--tech-blue)]/20">
                    <div className="text-sm font-semibold text-[var(--tech-blue)]">Selected Date:</div>
                    <div className="text-lg font-bold">
                      {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                )}
              </Card>

              {/* Time Selection */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[var(--tech-cyan)]" />
                  Select Time Slot
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        p-3 rounded-lg text-sm font-medium transition-all
                        ${selectedTime === time 
                          ? 'bg-gradient-to-br from-[var(--tech-cyan)] to-[var(--tech-blue)] text-white' 
                          : 'bg-secondary hover:bg-secondary/60'
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right: Email Composition */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[var(--tech-purple)]" />
                  Email Invitation
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient">To</Label>
                    <Input 
                      id="recipient"
                      value={`${candidate.name} <${candidate.email}>`}
                      disabled
                      className="bg-secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="body">Message</Label>
                    <Textarea 
                      id="body"
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      rows={14}
                      className="resize-none"
                    />
                  </div>

                  {/* Meeting Details Summary */}
                  {selectedDate && selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-gradient-to-br from-[var(--tech-green)]/10 to-transparent border border-[var(--tech-green)]/20 rounded-lg"
                    >
                      <div className="flex items-center gap-2 mb-2 text-[var(--tech-green)] font-semibold">
                        <Video className="w-4 h-4" />
                        Interview Details
                      </div>
                      <div className="space-y-1 text-sm">
                        <div><span className="font-semibold">Date:</span> {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        <div><span className="font-semibold">Time:</span> {selectedTime}</div>
                        <div><span className="font-semibold">Platform:</span> Zoom (link will be generated)</div>
                        <div><span className="font-semibold">Duration:</span> 45 minutes</div>
                      </div>
                    </motion.div>
                  )}

                  {/* Send Button */}
                  <Button 
                    onClick={handleSendInvitation}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full bg-gradient-to-r from-[var(--tech-purple)] to-[var(--tech-blue)] text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Interview Invitation
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}