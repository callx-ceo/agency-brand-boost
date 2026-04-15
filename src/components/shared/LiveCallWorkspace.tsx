
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  PhoneOff,
  Mic,
  
  Headphones,
  Settings,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Star,
  TrendingUp,
  FileText,
  User,
  MapPin,
  Clock,
} from "lucide-react";

interface ScriptStep {
  id: number;
  title: string;
  content: string;
  fields: { label: string; type: string; placeholder?: string; halfWidth?: boolean }[];
}

const LiveCallWorkspace = () => {
  const [isLive, setIsLive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [callDuration] = useState("00:00:00");
  const [formData, setFormData] = useState<Record<string, string>>({});

  const scriptSteps: ScriptStep[] = [
    {
      id: 1,
      title: "Step 1 of 2",
      content:
        "Thank you for calling the insurance department on a recorded line, this is ______ speaking, are you calling for a life insurance or final expense policy?",
      fields: [
        { label: "Insurance Kind", type: "text" },
        { label: "First Name", type: "text", placeholder: "Enter text...", halfWidth: true },
        { label: "Last Name", type: "text", placeholder: "Enter text...", halfWidth: true },
        { label: "Weight", type: "text", halfWidth: true },
        { label: "height", type: "text", halfWidth: true },
        { label: "Zip Code", type: "text", placeholder: "Enter text...", halfWidth: true },
        { label: "State", type: "text", placeholder: "Enter text...", halfWidth: true },
        { label: "Date of birth", type: "text", placeholder: "Enter text..." },
      ],
    },
    {
      id: 2,
      title: "Step 2 of 2",
      content:
        "Now I need to ask you a few health questions to determine the best coverage options for you...",
      fields: [
        { label: "Health Conditions", type: "text", placeholder: "Enter text..." },
        { label: "Medications", type: "text", placeholder: "Enter text..." },
        { label: "Coverage Amount", type: "text", placeholder: "Enter amount...", halfWidth: true },
        { label: "Monthly Budget", type: "text", placeholder: "Enter amount...", halfWidth: true },
        { label: "Beneficiary Name", type: "text", placeholder: "Enter text..." },
        { label: "Beneficiary Relationship", type: "text", placeholder: "Enter text..." },
      ],
    },
  ];

  const currentScript = scriptSteps.find((s) => s.id === currentStep) || scriptSteps[0];
  const totalSteps = scriptSteps.length;

  const stats = [
    { label: "Online today", value: callDuration, icon: <Clock className="w-5 h-5 text-primary" /> },
    { label: "Calls", value: "0", change: "0%", icon: <Phone className="w-5 h-5 text-primary" /> },
    { label: "Applications", value: "0", change: "0%", icon: <FileText className="w-5 h-5 text-primary" /> },
    { label: "Close Rate", value: "0%", change: "0%", icon: <Star className="w-5 h-5 text-primary" /> },
  ];

  const handleFieldChange = (label: string, value: string) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-80px)]">
      {/* Top Control Bar */}
      <div className="flex items-center justify-between gap-4 mb-4">
        {/* Left: Status & Controls */}
        <div className="flex items-center gap-3 bg-[#2C3E50] text-white rounded-xl px-5 py-3">
          <div className="flex items-center gap-2">
            {isLive ? (
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            ) : (
              <PhoneOff className="w-5 h-5 text-gray-400" />
            )}
            <span className="font-bold text-sm">{isLive ? "LIVE" : "OFFLINE"}</span>
          </div>
          <Separator orientation="vertical" className="h-6 bg-white/20" />
          <div className="flex items-center gap-1 text-xs text-gray-300">
            <Mic className="w-3 h-3" />
            <span>Microphone Array (In...</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-300">
            <Headphones className="w-3 h-3" />
            <span>Headphones (Realtek...</span>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-8 w-8">
            <Settings className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2 ml-2">
            <Switch
              checked={isLive}
              onCheckedChange={setIsLive}
              className="data-[state=checked]:bg-green-500"
            />
            <span className="text-sm font-medium">Go Live</span>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="flex items-center gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">{stat.icon}</div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-lg">{stat.value}</span>
                  {stat.change && (
                    <span className="text-xs text-green-500 flex items-center">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content: Two columns */}
      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
        {/* Left Column: Script */}
        <div className="flex flex-col min-h-0">
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Script</CardTitle>
                <span className="text-sm text-muted-foreground">{currentScript.title}</span>
              </div>
              {/* Progress bar */}
              <div className="flex gap-1 mt-2">
                {scriptSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`h-1 flex-1 rounded-full ${
                      step.id <= currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-4 pb-2">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentScript.content}
              </p>
              <div className="space-y-4">
                {currentScript.fields.map((field, idx) => {
                  const isHalfWidth = field.halfWidth;
                  const nextField = currentScript.fields[idx + 1];
                  const prevField = idx > 0 ? currentScript.fields[idx - 1] : null;

                  // Skip if this is the second of a pair
                  if (isHalfWidth && prevField?.halfWidth && idx % 2 !== 0) {
                    // Check if the previous rendered field was also half-width
                    // Simple approach: render pairs
                  }

                  if (isHalfWidth) {
                    // Find the pair
                    const isFirst =
                      idx === 0 || !currentScript.fields[idx - 1]?.halfWidth;
                    if (!isFirst) return null;

                    return (
                      <div key={field.label} className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs font-semibold">{field.label}</Label>
                          <Input
                            placeholder={field.placeholder || ""}
                            value={formData[field.label] || ""}
                            onChange={(e) => handleFieldChange(field.label, e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        {nextField?.halfWidth && (
                          <div>
                            <Label className="text-xs font-semibold">{nextField.label}</Label>
                            <Input
                              placeholder={nextField.placeholder || ""}
                              value={formData[nextField.label] || ""}
                              onChange={(e) =>
                                handleFieldChange(nextField.label, e.target.value)
                              }
                              className="mt-1"
                            />
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={field.label}>
                      <Label className="text-xs font-semibold">{field.label}</Label>
                      <Input
                        placeholder={field.placeholder || ""}
                        value={formData[field.label] || ""}
                        onChange={(e) => handleFieldChange(field.label, e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
            {/* Navigation */}
            <div className="flex items-center justify-between px-6 py-3 border-t">
              <Button
                variant="ghost"
                size="sm"
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={currentStep === totalSteps}
                onClick={() => setCurrentStep((s) => Math.min(totalSteps, s + 1))}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Transcription + Summary/Client */}
        <div className="flex flex-col gap-4 min-h-0">
          {/* Live AI Transcription */}
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">Live AI transcription</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    Idle
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div className="bg-muted/30 border border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                <p className="font-medium text-sm">
                  Realtime transcriptions will start once the call audio is live.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  When final utterances arrive, they will be stored here for the rest of the call.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bottom: Summary + Client Info */}
          <div className="grid grid-cols-2 gap-4">
            {/* Summary */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Summary</CardTitle>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-sm mb-2">Subtitle</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh
                  euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                  minim sed diam nonummy nibh euismod tincidunt ut laoreet dolor.
                </p>
              </CardContent>
            </Card>

            {/* Client Info */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Client info</CardTitle>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-sm">Goher Ayub</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>01234567891</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Philadelphia, PA</span>
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gender:</span>
                    <span>-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Zip Code:</span>
                    <span>-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date Of Birth:</span>
                    <span>-</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCallWorkspace;
