
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, User, Clock, MapPin } from "lucide-react";
import CallScript from "./CallScript";
import CallSummary from "./CallSummary";
import AgentCallStats from "./AgentCallStats";

const AgentDashboard = () => {
  const [isOnCall, setIsOnCall] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState("00:00:29");
  const [currentStep, setCurrentStep] = useState(1);

  // Mock call data
  const currentCall = {
    customerName: "Gohar Ayub",
    phone: "012345/8951",
    location: "Philadelphia, PA",
    timeOnline: "00:00:40",
    calls: "00",
    applications: "00",
    closeRate: "00"
  };

  const agentInfo = {
    name: "Brian",
    status: "ON CALL"
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold text-blue-600">CallX</div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">{callDuration}</span>
                <span className="text-gray-500">ON CALL</span>
              </div>
              <div>
                <span className="text-gray-500">Time Online Today</span>
                <div className="font-medium">{currentCall.timeOnline}</div>
              </div>
              <div>
                <span className="text-gray-500">Calls</span>
                <div className="font-medium">{currentCall.calls}</div>
              </div>
              <div>
                <span className="text-gray-500">Applications</span>
                <div className="font-medium">{currentCall.applications}</div>
              </div>
              <div>
                <span className="text-gray-500">Close Rate %</span>
                <div className="font-medium">{currentCall.closeRate}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium">{agentInfo.name}</span>
            <Badge variant="outline" className="bg-green-100 text-green-800">Sales Agent</Badge>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Call Interface */}
        <div className="w-96 bg-gray-900 text-white p-6">
          {/* Customer Info */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-blue-400" />
              <span className="text-lg font-medium">{currentCall.customerName}</span>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{currentCall.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{currentCall.location}</span>
              </div>
            </div>
          </div>

          {/* Call Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? "bg-blue-500 text-white"
                      : step === currentStep + 1
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-600 text-gray-400"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-gray-400">
              Step {currentStep}
            </div>
          </div>

          {/* Call Controls */}
          <div className="space-y-4">
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                variant={isMuted ? "destructive" : "outline"}
                className="w-12 h-12 rounded-full"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <Button
                size="lg"
                variant="destructive"
                className="w-16 h-16 rounded-full"
                onClick={() => setIsOnCall(!isOnCall)}
              >
                <PhoneOff className="w-6 h-6" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-12 h-12 rounded-full"
              >
                <Volume2 className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">Cancel</Button>
              <Button 
                className="flex-1"
                onClick={() => setCurrentStep(Math.min(currentStep + 1, 4))}
              >
                Next
              </Button>
            </div>
          </div>

          {/* Agent Stats */}
          <div className="mt-8">
            <AgentCallStats />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Script Section */}
          <div className="flex-1 p-6">
            <CallScript currentStep={currentStep} onStepChange={setCurrentStep} />
          </div>

          {/* Right Panel - Summary */}
          <div className="w-80 border-l bg-white">
            <CallSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
