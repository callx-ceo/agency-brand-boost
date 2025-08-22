import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Brain, Copy, Send, Volume2, Zap, TrendingUp, Shield } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface TranscriptEntry {
  id: string;
  speaker: 'agent' | 'customer';
  text: string;
  timestamp: string;
  confidence: number;
}

interface AIRebuttal {
  id: string;
  type: 'objection' | 'price' | 'trust' | 'urgency';
  trigger: string;
  suggestion: string;
  confidence: number;
  context: string;
}

// Mock real-time transcript data
const mockTranscriptEntries: TranscriptEntry[] = [
  {
    id: '1',
    speaker: 'agent',
    text: "Hi John, I'm calling about the life insurance quote you requested. We have some great options that could save you money.",
    timestamp: '10:23:45',
    confidence: 0.95
  },
  {
    id: '2',
    speaker: 'customer',
    text: "I'm really not interested. I already have insurance through my work.",
    timestamp: '10:23:52',
    confidence: 0.92
  },
  {
    id: '3',
    speaker: 'customer',
    text: "Plus these policies are always too expensive for what you get.",
    timestamp: '10:23:58',
    confidence: 0.89
  }
];

// Mock AI-generated rebuttals
const mockRebuttals: AIRebuttal[] = [
  {
    id: '1',
    type: 'objection',
    trigger: 'already have insurance through work',
    suggestion: "I understand you have coverage through work. Many people don't realize that employer coverage is often basic and may not transfer if you change jobs. Our policies can supplement what you have and stay with you regardless of employment changes.",
    confidence: 0.94,
    context: 'Work insurance objection'
  },
  {
    id: '2',
    type: 'price',
    trigger: 'too expensive',
    suggestion: "I hear that concern about cost. What's interesting is that many people spend more on their monthly coffee budget than quality life insurance. For someone your age, we're looking at less than $2 per day to protect your family's financial future.",
    confidence: 0.91,
    context: 'Price objection'
  },
  {
    id: '3',
    type: 'urgency',
    trigger: 'not interested',
    suggestion: "I completely understand. The good news is this call is just about education, not pressure. Can I ask - if something happened to you tomorrow, how would your family handle the mortgage and expenses?",
    confidence: 0.88,
    context: 'Interest objection'
  }
];

export const AIRebuttalPanel: React.FC = () => {
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [rebuttals, setRebuttals] = useState<AIRebuttal[]>([]);
  const [isListening, setIsListening] = useState(true);
  const { toast } = useToast();

  // Simulate real-time transcript updates
  useEffect(() => {
    if (!isListening) return;

    const interval = setInterval(() => {
      // Simulate new transcript entries
      if (transcript.length < mockTranscriptEntries.length) {
        const nextEntry = mockTranscriptEntries[transcript.length];
        setTranscript(prev => [...prev, nextEntry]);

        // Trigger AI analysis for customer speech
        if (nextEntry.speaker === 'customer') {
          setTimeout(() => {
            const relevantRebuttals = mockRebuttals.filter(rebuttal =>
              nextEntry.text.toLowerCase().includes(rebuttal.trigger.toLowerCase())
            );
            if (relevantRebuttals.length > 0) {
              setRebuttals(prev => [...prev, ...relevantRebuttals.slice(0, 2)]);
            }
          }, 1500); // Simulate AI processing delay
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [transcript.length, isListening]);

  const getTypeIcon = (type: AIRebuttal['type']) => {
    switch (type) {
      case 'objection': return <Shield className="h-4 w-4" />;
      case 'price': return <TrendingUp className="h-4 w-4" />;
      case 'trust': return <Shield className="h-4 w-4" />;
      case 'urgency': return <Zap className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: AIRebuttal['type']) => {
    switch (type) {
      case 'objection': return 'bg-red-100 text-red-800';
      case 'price': return 'bg-green-100 text-green-800';
      case 'trust': return 'bg-blue-100 text-blue-800';
      case 'urgency': return 'bg-orange-100 text-orange-800';
    }
  };

  const handleCopyRebuttal = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Rebuttal copied and ready to use",
      duration: 2000,
    });
  };

  const handleUseRebuttal = (rebuttal: AIRebuttal) => {
    toast({
      title: "Rebuttal suggested",
      description: "Use this response in your conversation",
      duration: 3000,
    });
    // In a real implementation, this might insert text into a script or provide audio cues
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">AI Sales Assistant</h3>
          <Badge variant={isListening ? "default" : "secondary"}>
            {isListening ? "Live" : "Paused"}
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsListening(!isListening)}
        >
          {isListening ? "Pause" : "Resume"}
        </Button>
      </div>

      {/* Live Transcript */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Volume2 className="h-4 w-4" />
            <span>Live Transcript</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-32">
            <div className="space-y-2">
              {transcript.map((entry) => (
                <div key={entry.id} className="flex space-x-2 text-sm">
                  <Badge 
                    variant={entry.speaker === 'agent' ? 'default' : 'outline'}
                    className="min-w-fit"
                  >
                    {entry.speaker === 'agent' ? 'You' : 'Customer'}
                  </Badge>
                  <span className="flex-1">{entry.text}</span>
                  <span className="text-xs text-muted-foreground">
                    {entry.timestamp}
                  </span>
                </div>
              ))}
              {transcript.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Listening for conversation...
                </p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* AI Rebuttals */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>Smart Rebuttals</span>
            {rebuttals.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {rebuttals.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {rebuttals.map((rebuttal, index) => (
                <div key={rebuttal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={getTypeColor(rebuttal.type)}>
                        {getTypeIcon(rebuttal.type)}
                        <span className="ml-1 capitalize">{rebuttal.type}</span>
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(rebuttal.confidence * 100)}% match
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Responding to: "{rebuttal.trigger}"
                    </p>
                    <p className="text-sm">{rebuttal.suggestion}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyRebuttal(rebuttal.suggestion)}
                      className="flex items-center space-x-1"
                    >
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleUseRebuttal(rebuttal)}
                      className="flex items-center space-x-1"
                    >
                      <Send className="h-3 w-3" />
                      <span>Use This</span>
                    </Button>
                  </div>
                  
                  {index < rebuttals.length - 1 && <Separator />}
                </div>
              ))}
              
              {rebuttals.length === 0 && (
                <div className="text-center py-8">
                  <Brain className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    AI is analyzing the conversation...
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Rebuttals will appear when objections are detected
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Call Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Objections Detected</p>
              <p className="font-semibold">{rebuttals.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Response Rate</p>
              <p className="font-semibold">85%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Talk Time</p>
              <p className="font-semibold">45%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Sentiment</p>
              <p className="font-semibold text-yellow-600">Neutral</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};