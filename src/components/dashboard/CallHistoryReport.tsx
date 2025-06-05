import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Phone, Download, ChevronDown, ChevronRight, Headphones, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DateRangeSelector from "./DateRangeSelector";

// Updated mock data with Contact Name, From/To numbers, and other requested fields
const mockCallHistoryData = [
  {
    id: "call-001",
    contactName: "Robert Martinez",
    from: "(772) 240-4457",
    to: "(855) 963-0365",
    connectDuration: "1:23",
    date: "May 21, 9:45 AM",
    agentName: "Flores, Juanita",
    callStatus: "Completed",
    source: "homeinbound8",
    aiScore: 85,
    aiBreakdown: {
      scriptAdherence: 90,
      customerHandling: 85,
      problemSolving: 80,
      overallScore: 85
    },
    keyTopics: ["Insurance coverage", "Premium quotes", "Policy options"],
    sentiment: "Positive",
    actionItems: [
      "Send quote via email",
      "Follow up in 3 days"
    ],
    summary: "Customer called inquiring about home insurance options for a new property purchase. The agent provided comprehensive information about coverage types, premium estimates, and available discounts. The customer was satisfied with the information and agreed to receive a detailed quote via email. The agent promised to follow up within 3 days. Overall, the conversation was productive and positive, with the customer showing strong interest in proceeding with a policy."
  },
  {
    id: "call-002", 
    contactName: "Linda Thompson",
    from: "(682) 323-1382",
    to: "(855) 963-0365",
    connectDuration: "1:11",
    date: "May 21, 10:12 AM",
    agentName: "Flores, Juanita",
    callStatus: "Disconnected",
    source: "homeinbound8",
    aiScore: 42,
    aiBreakdown: {
      scriptAdherence: 45,
      customerHandling: 40,
      problemSolving: 42,
      overallScore: 42
    },
    keyTopics: ["Insurance coverage", "Premium quotes"],
    sentiment: "Neutral",
    actionItems: [],
    summary: "Brief call regarding insurance options. Call was disconnected early."
  },
  {
    id: "call-003",
    contactName: "William Garcia",
    from: "(843) 805-9900",
    to: "(855) 495-8163",
    connectDuration: "23:25",
    date: "May 21, 10:30 AM",
    agentName: "Johnson, Mike",
    callStatus: "Completed",
    source: "autoinboundrevsharepad42",
    aiScore: 92,
    aiBreakdown: {
      scriptAdherence: 95,
      customerHandling: 90,
      problemSolving: 92,
      overallScore: 92
    },
    keyTopics: ["Auto insurance", "Policy renewal", "Discount options"],
    sentiment: "Positive",
    actionItems: [
      "Process policy renewal",
      "Apply multi-car discount"
    ],
    summary: "Excellent call handling for auto insurance policy renewal. Customer was very satisfied with service and pricing options."
  },
  {
    id: "call-004",
    contactName: "Sarah Johnson",
    from: "(555) 123-4567",
    to: "(855) 963-0365",
    connectDuration: "5:42",
    date: "May 21, 11:15 AM",
    agentName: "Davis, Jennifer",
    callStatus: "No Answer",
    source: "lifeinsurance",
    aiScore: 0,
    aiBreakdown: {
      scriptAdherence: 0,
      customerHandling: 0,
      problemSolving: 0,
      overallScore: 0
    },
    keyTopics: [],
    sentiment: "N/A",
    actionItems: ["Schedule callback"],
    summary: "Call attempt - no answer. Left voicemail requesting callback."
  },
  {
    id: "call-005",
    contactName: "David Chen",
    from: "(214) 567-8901",
    to: "(855) 495-8163",
    connectDuration: "8:33",
    date: "May 21, 2:20 PM",
    agentName: "Wilson, Amanda",
    callStatus: "Transferred",
    source: "homeinsurance",
    aiScore: 67,
    aiBreakdown: {
      scriptAdherence: 70,
      customerHandling: 65,
      problemSolving: 66,
      overallScore: 67
    },
    keyTopics: ["Complex claim", "Policy details"],
    sentiment: "Neutral",
    actionItems: ["Transfer to claims specialist"],
    summary: "Customer inquiry about complex claim required transfer to specialist department."
  }
];

const CallHistoryReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCall, setExpandedCall] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date()
  });

  const filteredCalls = mockCallHistoryData.filter(call => 
    call.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.from.includes(searchTerm) ||
    call.agentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Disconnected": return "bg-red-100 text-red-800";
      case "No Answer": return "bg-yellow-100 text-yellow-800";
      case "Transferred": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const toggleExpanded = (callId: string) => {
    setExpandedCall(expandedCall === callId ? null : callId);
  };

  const handleListenRecording = (callId: string) => {
    console.log("Listen to recording for call:", callId);
    // TODO: Implement recording playback
  };

  const handleDownloadRecording = (callId: string) => {
    console.log("Download recording for call:", callId);
    // TODO: Implement recording download
  };

  const handleViewContact = (callId: string) => {
    console.log("View contact for call:", callId);
    // TODO: Implement contact view
  };

  // Mock data for the expanded view sections
  const getExpandedData = (callId: string) => ({
    events: [
      {
        type: "Duplicate Call",
        timestamp: "Jun 05 06:20:49 AM",
        details: {
          connectedTargetId: "TA30eb1d826d4596954c4c9cf673a992",
          lastCallDate: "Jun 05 06:19:33 AM",
          lastInboundCallId: "RGB1FA9F640509951458A749F7C0BC363BE15EC0D15V30V601"
        }
      },
      {
        type: "Routing Plan",
        timestamp: "Jun 05 06:20:49 AM",
        details: {
          eligibleTargets: [
            { priority: 1, weight: 1, name: "Insurex - FEX - Social - IVR" }
          ]
        }
      },
      {
        type: "Target Dialed",
        timestamp: "Jun 05 06:20:49 AM",
        details: {
          cost: "$0.00",
          targetId: "TA30eb1d826d4596954c4c9cf673a992",
          targetName: "Insurex - FEX - Social - IVR",
          targetNumber: "+18888739523"
        }
      },
      {
        type: "No Answer",
        timestamp: "Jun 05 06:20:54 AM",
        details: {
          targetId: "TA30eb1d826d4596954c4c9cf673a992",
          targetName: "Insurex - FEX - Social - IVR"
        }
      },
      {
        type: "Completed",
        timestamp: "Jun 05 06:20:54 AM",
        details: {
          callLength: "00:00:04",
          completionTime: "Jun 05 06:20:54 AM"
        }
      }
    ],
    record: {
      callId: callId,
      duration: "00:00:04",
      recordingUrl: "#",
      quality: "HD"
    },
    tags: ["Insurance", "FEX", "Social", "IVR", "No Answer"],
    transcription: "Call initiated to Insurex FEX Social IVR line. No answer received after standard ring duration. Call terminated automatically.",
    aiSummary: "Attempted outbound call to insurance lead. Call routed through Insurex FEX Social IVR system but resulted in no answer. No customer contact established. Recommend follow-up attempt or alternative contact method."
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 mb-1">Time Online Today</div>
            <div className="text-2xl font-bold">00:00:40</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 mb-1">Calls</div>
            <div className="text-2xl font-bold">10</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 mb-1">Applications</div>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 mb-1">Close Rate</div>
            <div className="text-2xl font-bold">40%</div>
          </CardContent>
        </Card>
      </div>

      {/* Call History Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>History</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          <div className="flex gap-4 items-center flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Contact name, phone, or agent..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DateRangeSelector
              value={dateRange}
              onChange={setDateRange}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Table Headers */}
            <div className="grid grid-cols-9 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
              <div>Contact Name</div>
              <div>From Number</div>
              <div>To Number</div>
              <div>Connect Duration</div>
              <div>Date</div>
              <div>Agent Name</div>
              <div>Call Status</div>
              <div>AI Score</div>
              <div>Actions</div>
            </div>

            {/* Table Rows */}
            {filteredCalls.map((call) => (
              <div key={call.id} className="space-y-2">
                <div 
                  className="grid grid-cols-9 gap-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
                  onClick={(e) => {
                    // Only toggle expansion if not clicking on action buttons
                    if (!(e.target as HTMLElement).closest('.action-buttons')) {
                      toggleExpanded(call.id);
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    {expandedCall === call.id ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-600">{call.contactName}</span>
                  </div>
                  <div>{call.from}</div>
                  <div>{call.to}</div>
                  <div>{call.connectDuration}</div>
                  <div className="text-sm">{call.date}</div>
                  <div>{call.agentName}</div>
                  <div>
                    <Badge className={getStatusColor(call.callStatus)}>{call.callStatus}</Badge>
                  </div>
                  <div className={`font-semibold ${getScoreColor(call.aiScore)}`}>
                    {call.aiScore > 0 ? `${call.aiScore}%` : 'N/A'}
                  </div>
                  <div className="action-buttons flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleListenRecording(call.id);
                      }}
                      className="h-8 w-8 p-0"
                      title="Listen to recording"
                    >
                      <Headphones className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadRecording(call.id);
                      }}
                      className="h-8 w-8 p-0"
                      title="Download recording"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewContact(call.id);
                      }}
                      className="h-8 w-8 p-0"
                      title="View contact"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Expanded Contact Details */}
                {expandedCall === call.id && (
                  <div className="ml-6 bg-gray-50 rounded-lg border">
                    <Tabs defaultValue="events" className="w-full">
                      <TabsList className="w-full justify-start bg-transparent border-b rounded-none">
                        <TabsTrigger value="events">Events</TabsTrigger>
                        <TabsTrigger value="record">Record</TabsTrigger>
                        <TabsTrigger value="tags">Tags</TabsTrigger>
                        <TabsTrigger value="transcription">Transcription</TabsTrigger>
                        <TabsTrigger value="ai-summary">AI Summary</TabsTrigger>
                      </TabsList>

                      <div className="p-4">
                        <TabsContent value="events" className="mt-0">
                          <div className="space-y-3">
                            {getExpandedData(call.id).events.map((event, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 bg-white rounded border">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  event.type === "Duplicate Call" ? "bg-yellow-100 text-yellow-800" :
                                  event.type === "Routing Plan" ? "bg-blue-100 text-blue-800" :
                                  event.type === "Target Dialed" ? "bg-green-100 text-green-800" :
                                  event.type === "No Answer" ? "bg-red-100 text-red-800" :
                                  "bg-gray-100 text-gray-800"
                                }`}>
                                  {event.type === "Duplicate Call" ? "!" :
                                   event.type === "Routing Plan" ? "i" :
                                   event.type === "Target Dialed" ? "✓" :
                                   event.type === "No Answer" ? "!" :
                                   "✓"}
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start mb-1">
                                    <span className="font-medium">{event.type}</span>
                                    <span className="text-xs text-gray-500">{event.timestamp}</span>
                                  </div>
                                  <div className="text-sm text-gray-600 space-y-1">
                                    {Object.entries(event.details).map(([key, value]) => (
                                      <div key={key}>
                                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>{' '}
                                        {Array.isArray(value) ? (
                                          <div className="ml-4 mt-1">
                                            {value.map((item, idx) => (
                                              <div key={idx} className="text-xs">
                                                Priority: {item.priority}, Weight: {item.weight}, Name: {item.name}
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <span>{value}</span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="record" className="mt-0">
                          <div className="bg-white rounded border p-4">
                            <h4 className="font-medium mb-3">Call Recording Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Call ID:</span>
                                <span className="font-medium">{getExpandedData(call.id).record.callId}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Duration:</span>
                                <span className="font-medium">{getExpandedData(call.id).record.duration}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Quality:</span>
                                <span className="font-medium">{getExpandedData(call.id).record.quality}</span>
                              </div>
                              <div className="mt-4 flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Headphones className="w-4 h-4 mr-2" />
                                  Play Recording
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="tags" className="mt-0">
                          <div className="bg-white rounded border p-4">
                            <h4 className="font-medium mb-3">Call Tags</h4>
                            <div className="flex flex-wrap gap-2">
                              {getExpandedData(call.id).tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="transcription" className="mt-0">
                          <div className="bg-white rounded border p-4">
                            <h4 className="font-medium mb-3">Call Transcription</h4>
                            <div className="text-sm leading-relaxed text-gray-700">
                              {getExpandedData(call.id).transcription}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="ai-summary" className="mt-0">
                          <div className="bg-white rounded border p-4">
                            <h4 className="font-medium mb-3">AI Summary</h4>
                            <div className="text-sm leading-relaxed text-gray-700">
                              {getExpandedData(call.id).aiSummary}
                            </div>
                          </div>
                        </TabsContent>
                      </div>
                    </Tabs>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallHistoryReport;
