import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, User, Clock, MapPin, ChevronDown, Users } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import CallScript from "./CallScript";
import CallSummary from "./CallSummary";
import AgentCallStats from "./AgentCallStats";
import CustomerContacts from "./CustomerContacts";
import HangUpConfirmDialog from "./HangUpConfirmDialog";
import ClientInfoModal from "./ClientInfoModal";
import { AIRebuttalPanel } from "./AIRebuttalPanel";
import { useToast } from "@/hooks/use-toast";

const AgentDashboard = () => {
  const [isOnCall, setIsOnCall] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState("00:00:29");
  const [currentStep, setCurrentStep] = useState(1);
  const [activeView, setActiveView] = useState("script");
  const [showHangUpDialog, setShowHangUpDialog] = useState(false);
  const [showClientInfoModal, setShowClientInfoModal] = useState(false);
  const { toast } = useToast();

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
    status: "Sales Agent"
  };

  const sidebarItems = [
    { id: "script", icon: <div className="w-2 h-2 bg-white rounded-full"></div>, active: activeView === "script" },
    { id: "contacts", icon: <Users className="w-4 h-4 text-white" />, active: activeView === "contacts" },
    { id: "ai-assistant", icon: <div className="w-4 h-4 bg-white rounded text-xs flex items-center justify-center font-bold">AI</div>, active: activeView === "ai-assistant" },
    { id: "clock", icon: <Clock className="w-4 h-4 text-white" />, active: false },
    { id: "phone", icon: <Phone className="w-4 h-4 text-white" />, active: false }
  ];

  const handleHangUpClick = () => {
    setShowHangUpDialog(true);
  };

  const handleConfirmHangUp = () => {
    setIsOnCall(false);
    setShowHangUpDialog(false);
    console.log("Call ended");
  };

  const handleCancelHangUp = () => {
    setShowHangUpDialog(false);
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    // When reaching step 4 (call disposition), set to paused
    if (step === 4) {
      setIsPaused(true);
    } else {
      setIsPaused(false);
    }
  };

  const getCallStatus = () => {
    if (!isOnCall) return { text: "OFF CALL", bgColor: "bg-gray-500" };
    if (isPaused) return { text: "PAUSED", bgColor: "bg-yellow-500" };
    return { text: "ON CALL", bgColor: "bg-green-500" };
  };

  const callStatus = getCallStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold text-blue-600">CallX</div>
            <div className="flex items-center gap-8 text-sm">
              <div className={`flex items-center gap-2 ${callStatus.bgColor} text-white px-3 py-1 rounded`}>
                <span className="font-medium">{callDuration}</span>
                <span className="text-xs">{callStatus.text}</span>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Time Online Today</div>
                <div className="font-medium">{currentCall.timeOnline}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Calls</div>
                <div className="font-medium">{currentCall.calls}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Applications</div>
                <div className="font-medium">{currentCall.applications}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Close Rate %</div>
                <div className="font-medium">{currentCall.closeRate}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium">{agentInfo.name}</span>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">{agentInfo.status}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <div className="w-16 bg-gray-800 flex flex-col items-center py-4 gap-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-8 h-8 rounded flex items-center justify-center ${
                item.active ? "bg-green-500" : "bg-gray-600"
              }`}
            >
              {item.icon}
            </button>
          ))}
        </div>

        {activeView === "script" ? (
          <>
            {/* Customer Info Panel */}
            <div className="w-80 bg-white border-r p-6 relative">
              {/* Customer Details */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-5 h-5 text-blue-500" />
                  <span className="text-lg font-medium">{currentCall.customerName}</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
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
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                          step === currentStep
                            ? "bg-blue-500 text-white border-blue-500"
                            : step < currentStep
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-gray-200 text-gray-500 border-gray-200"
                        }`}
                      >
                        {step}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Step {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call Controls */}
              <div className="space-y-4">
                <div className="flex justify-center gap-4">
                  <Button
                    size="lg"
                    variant={isMuted ? "destructive" : "outline"}
                    className="w-12 h-12 rounded-full"
                    onClick={() => {
                      const newMutedState = !isMuted;
                      setIsMuted(newMutedState);
                      toast({
                        title: newMutedState ? "Call Muted" : "Call Unmuted",
                        description: newMutedState 
                          ? "Your microphone is now muted" 
                          : "Your microphone is now active",
                        duration: 2000,
                      });
                    }}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </Button>
                  <Button
                    size="lg"
                    variant="destructive"
                    className="w-16 h-16 rounded-full"
                    onClick={handleHangUpClick}
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
              </div>

              {/* Record Button */}
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span>Recording</span>
                </div>
              </div>

              {/* Toggle Switch - Lower Left Corner */}
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={isOnCall}
                    onCheckedChange={setIsOnCall}
                    className="data-[state=checked]:bg-green-500"
                  />
                  <span className="text-xs text-gray-600">Online</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex">
              {/* Script Section */}
              <div className="flex-1 p-6 bg-white">
                <CallScript currentStep={currentStep} onStepChange={handleStepChange} />
              </div>

              {/* Right Panel - Summary */}
              <div className="w-80 border-l bg-white">
                <CallSummary onClientInfoClick={() => setShowClientInfoModal(true)} />
              </div>
            </div>
          </>
        ) : activeView === "contacts" ? (
          /* Customer Contacts View */
          <div className="flex-1">
            <CustomerContacts />
          </div>
        ) : activeView === "ai-assistant" ? (
          /* AI Assistant View */
          <div className="flex-1 p-6 bg-white">
            <AIRebuttalPanel />
          </div>
        ) : (
          /* Placeholder for other views */
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-gray-500">View not implemented yet</div>
          </div>
        )}
      </div>

      {/* Hang Up Confirmation Dialog */}
      <HangUpConfirmDialog
        isOpen={showHangUpDialog}
        onClose={handleCancelHangUp}
        onConfirm={handleConfirmHangUp}
      />

      {/* Client Info Modal */}
      <ClientInfoModal
        isOpen={showClientInfoModal}
        onClose={() => setShowClientInfoModal(false)}
      />
    </div>
  );
};

export default AgentDashboard;
