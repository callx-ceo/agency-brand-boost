
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Phone, 
  PhoneOff, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff,
  Play,
  Pause,
  Users,
  Clock
} from "lucide-react";

interface LiveCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  callData: {
    id: string;
    contact: {
      name: string;
      phone: string;
    };
    agent: string;
    duration: string;
    status: string;
    aiScore: number;
    campaign: string;
  };
}

const LiveCallModal: React.FC<LiveCallModalProps> = ({ isOpen, onClose, callData }) => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75);
  const [callDuration, setCallDuration] = useState("0:00");
  const [canJoinCall, setCanJoinCall] = useState(false);

  useEffect(() => {
    if (isOpen && isListening) {
      // Simulate real-time call duration updates
      const interval = setInterval(() => {
        const [minutes, seconds] = callData.duration.split(':').map(Number);
        const totalSeconds = minutes * 60 + seconds;
        const newTotalSeconds = totalSeconds + Math.floor(Math.random() * 5) + 1;
        const newMinutes = Math.floor(newTotalSeconds / 60);
        const newSeconds = newTotalSeconds % 60;
        setCallDuration(`${newMinutes}:${newSeconds.toString().padStart(2, '0')}`);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isOpen, isListening, callData.duration]);

  const handleStartListening = () => {
    console.log("Starting to listen to call:", callData.id);
    setIsListening(true);
    // TODO: Implement actual live call listening functionality
  };

  const handleStopListening = () => {
    console.log("Stopping call listening:", callData.id);
    setIsListening(false);
  };

  const handleJoinCall = () => {
    console.log("Joining call as participant:", callData.id);
    setCanJoinCall(false);
    // TODO: Implement call joining functionality
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-green-600" />
            Live Call Monitoring
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Call Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Call Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Contact:</span>
                  <div className="font-medium">{callData.contact.name}</div>
                  <div className="text-sm text-gray-500">{callData.contact.phone}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Agent:</span>
                  <div className="font-medium">{callData.agent}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Campaign:</span>
                  <div className="text-sm">{callData.campaign}</div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Duration:</span>
                  <div className="font-medium flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {isListening ? callDuration : callData.duration}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <Badge className="ml-2 bg-green-100 text-green-800">{callData.status}</Badge>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">AI Score:</span>
                  <span className="ml-2 font-semibold text-green-600">{callData.aiScore}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Listening Controls */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                Monitoring Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Listen/Stop Controls */}
              <div className="flex items-center gap-4">
                {!isListening ? (
                  <Button onClick={handleStartListening} className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Start Listening
                  </Button>
                ) : (
                  <Button 
                    onClick={handleStopListening} 
                    variant="destructive" 
                    className="flex items-center gap-2"
                  >
                    <Pause className="w-4 h-4" />
                    Stop Listening
                  </Button>
                )}

                {isListening && (
                  <Button 
                    onClick={handleJoinCall}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Join Call
                  </Button>
                )}
              </div>

              {/* Volume Controls */}
              {isListening && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-full"
                        disabled={isMuted}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12">{isMuted ? 0 : volume}%</span>
                  </div>
                </div>
              )}

              {/* Live Status Indicator */}
              {isListening && (
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 font-medium">Live monitoring active</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Real-time AI Insights */}
          {isListening && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Real-time Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Script Adherence</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Customer Engagement</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-800 mb-1">Current Topic:</div>
                  <div className="text-sm text-blue-700">Premium payment options discussion</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LiveCallModal;
