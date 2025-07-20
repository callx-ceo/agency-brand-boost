import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Phone, Download, ChevronDown, ChevronRight, Headphones, Eye, MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DateRangeSelector from "./DateRangeSelector";
import CallSummary from "../shared/CallSummary";

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
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [selectedCallForSummary, setSelectedCallForSummary] = useState<any>(null);
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

  const handleOpenSummary = (call: any) => {
    setSelectedCallForSummary(call);
    setSummaryModalOpen(true);
  };

  const handleCloseSummary = () => {
    setSummaryModalOpen(false);
    setSelectedCallForSummary(null);
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
      campaign: "Insurex - FEX - Youtube - NO IVR",
      publisher: "IX-YT",
      campaignId: "CA114f30b369194824806a0737ef1ea9d6",
      publisherId: "AF7477a67e704146ddbc0121af34154595",
      publisherSubId: "",
      inboundCallId: "RGBA02CC37FCFD86410A68FA9D3E6CC16081A11DE72V3S_501",
      callDate: "06/05/2025 06:20:49 AM",
      callerId: "+13195913134",
      dialedNumber: "+18339866644",
      numberId: "266391600000873772",
      numberPoolUsed: "Yes",
      numberPoolId: "NU59d91d4260534fd1b56a90bfd3484112",
      numberPool: "LifeInsurerQuotes- Youtube",
      timeToCall: "00:02:02",
      callCompleteTimestamp: "06/05/2025 06:20:54 AM",
      duration: "00:00:04",
      hangup: "Caller",
      duplicate: "Yes",
      previouslyConnected: "Yes",
      previouslyConnectedDate: "06/05/2025 06:10:32 AM"
    },
    tags: {
      user: {
        tel: "8888739523",
        subid4: "",
        subid2: "22529536537",
        creative: "750874797491",
        subid3: "c",
        locPhysicallMs: "9018561",
        locInterestMs: "9018561",
        network: "",
        placement: "",
        sourceid: "{sourceid}",
        cpid: "1af32b3-ba4b-4f49-aa25-9754a2ebe173",
        oid: "6a71bf33-4d8b-46c5-83db-9dd1ccd77479",
        httpsLifeinsurerquotes: "8447744293",
        gadSource: "2",
        clickid: "w8adqhnsm5ifjtbajtv1th2e"
      },
      integration: {
        googleClickId: "Cj0KCQjwgIXCBhDBARISAELC9ZhRcyShnkAR2_ytdxvHpDQVz50re41ia3XEvC81Bmkqf722AnkM9...",
        gbraid: "",
        wbraid: ""
      },
      display: {
        width: "900",
        height: "508",
        availWidth: "900",
        availHeight: "469",
        pixelDepth: "24",
        colorDepth: "24"
      },
      request: {
        referrer: "https://lifeinsurerquotes.com/lp/2/?tel=8888739523&subid4=&subid2=22529536537&creative=75..."
      }
    },
    transcription: `Agent: Thank you for calling InsureMax, this is Sarah speaking. How can I help you today?

Customer: Hi Sarah, I'm calling about getting a quote for home insurance. I just bought a new house and need coverage.

Agent: Congratulations on your new home! I'd be happy to help you with a home insurance quote. Can I start by getting your name and the address of the property you'd like to insure?

Customer: Sure, my name is Robert Martinez and the property is at 1247 Oak Street, Miami, Florida 33101.

Agent: Thank you, Mr. Martinez. And can you tell me a bit about the property? What's the approximate square footage and when was it built?

Customer: It's about 2,200 square feet, built in 1995. It's a single-family home with 3 bedrooms and 2 bathrooms.

Agent: Perfect. Do you know the estimated replacement cost or current market value of the home?

Customer: The market value is around $450,000. I'm not sure about replacement cost though.

Agent: That's fine, we can help calculate that. Do you have any special features like a pool, security system, or recent renovations?

Customer: Yes, there's a pool in the backyard and I just had the roof replaced last year. Also installed a new security system.

Agent: Excellent, those features can actually help with your premium. The new roof and security system may qualify you for discounts. What coverage amount are you looking for, and do you have any current insurance that we'd be replacing?

Customer: I'm looking for comprehensive coverage. I don't have current home insurance since I just bought the house, but I do have auto insurance with another company.

Agent: Great! Based on what you've told me, I can offer you a comprehensive home insurance policy starting at $1,850 annually. This includes dwelling coverage up to $450,000, personal property protection, liability coverage, and additional living expenses. With your security system and new roof, you'd qualify for a 15% discount, bringing it down to approximately $1,575 per year.

Customer: That sounds reasonable. What's the next step?

Agent: I can email you a detailed quote with all the coverage specifics. I'll also include information about bundling with auto insurance if you're interested, which could save you an additional 10-20%. What's the best email address to send this to?

Customer: You can send it to robert.martinez@email.com. And yes, I'd like to see the bundling options too.

Agent: Perfect! I'll send that over within the next hour. Is there anything else you'd like to know about the coverage or do you have any other questions?

Customer: No, I think that covers everything. Thank you for your help, Sarah.

Agent: You're very welcome, Mr. Martinez! You should receive the quote shortly, and feel free to call back if you have any questions. Have a great day!

Customer: Thank you, you too. Goodbye.

Agent: Goodbye!`,
    aiSummary: {
      overallScore: 85,
      analysis: `This was an excellent customer service interaction that demonstrates strong sales skills and customer relationship building. The agent (Sarah) effectively guided the customer through the insurance quoting process while maintaining a professional and helpful demeanor throughout the call.

**Key Strengths:**
• Professional greeting and clear identification
• Systematic information gathering approach
• Excellent product knowledge and explanation of coverage options
• Proactive identification of discount opportunities (security system, new roof)
• Effective upselling with bundling options
• Clear next steps and follow-up commitment
• Maintained customer engagement throughout the call

**Customer Interaction Quality:**
The customer (Robert Martinez) was cooperative and provided all necessary information promptly. The conversation flowed naturally with no resistance to the agent's questions or recommendations. The customer showed genuine interest in the product and appreciated the agent's explanations.

**Sales Performance:**
• Successfully positioned comprehensive coverage
• Identified and applied relevant discounts (15% reduction)
• Introduced additional product opportunities (auto bundling)
• Secured customer commitment for quote review
• Established clear follow-up timeline

**Areas for Improvement:**
• Could have asked about other insurance needs (life, umbrella)
• Missed opportunity to gather more contact information for future marketing
• Could have mentioned referral programs

**Compliance & Script Adherence:**
The agent followed proper procedures for information gathering and disclosure. All required elements for insurance quoting were covered appropriately.

**Outcome:**
Successful quote generation with high probability of conversion. Customer expressed satisfaction with the service and pricing. Follow-up email scheduled with additional bundling options.`,
      scores: {
        scriptAdherence: 90,
        customerHandling: 85,
        problemSolving: 80,
        productKnowledge: 88,
        salesEffectiveness: 87
      }
    }
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

      {/* Tabs for Call History and Call Summary */}
      <Tabs defaultValue="history" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="history">Call History</TabsTrigger>
          <TabsTrigger value="summary">Call Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-6">
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
                    <span className="font-medium">{call.contactName}</span>
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
                      onClick={() => handleListenRecording(call.id)}
                      title="Listen to Recording"
                      className="h-8 w-8 p-0"
                    >
                      <Headphones className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDownloadRecording(call.id)}
                      title="Download Recording"
                      className="h-8 w-8 p-0"
                    >
                      <Download className="w-4 h-4 text-green-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleViewContact(call.id)}
                      title="View Contact"
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="w-4 h-4 text-purple-500" />
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
                        <TabsTrigger value="call-summary">Call Summary</TabsTrigger>
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
                          <div className="bg-white rounded border">
                            <div className="p-4 space-y-4">
                              <h4 className="font-medium text-lg border-b pb-2">Call Record Details</h4>
                              
                              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Campaign:</span>
                                  <span className="font-medium text-right max-w-xs truncate">{getExpandedData(call.id).record.campaign}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Publisher:</span>
                                  <span className="font-medium">{getExpandedData(call.id).record.publisher}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Campaign ID:</span>
                                  <span className="font-medium text-right font-mono text-xs">{getExpandedData(call.id).record.campaignId}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Publisher ID:</span>
                                  <span className="font-medium text-right font-mono text-xs">{getExpandedData(call.id).record.publisherId}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Publisher Sub ID:</span>
                                  <span className="font-medium">{getExpandedData(call.id).record.publisherSubId || '-'}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Inbound Call ID:</span>
                                  <span className="font-medium text-right font-mono text-xs">{getExpandedData(call.id).record.inboundCallId}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Call Date:</span>
                                  <span className="font-medium">{getExpandedData(call.id).record.callDate}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Caller ID:</span>
                                  <span className="font-medium">{getExpandedData(call.id).record.callerId}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Dialed #:</span>
                                  <span className="font-medium">{getExpandedData(call.id).record.dialedNumber}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Number ID:</span>
                                  <span className="font-medium font-mono text-xs">{getExpandedData(call.id).record.numberId}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Number Pool Used:</span>
                                  <span className="font-medium">{getExpandedData(call.id).record.numberPoolUsed}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Number Pool ID:</span>
                                  <span className="font-medium text-right font-mono text-xs">{getExpandedData(call.id).record.numberPoolId}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Number Pool:</span>
                                  <span className="font-medium text-right">{getExpandedData(call.id).record.numberPool}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Time To Call:</span>
                                  <span className="font-medium">{getExpandedData(call.id).record.timeToCall}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Call Complete Timestamp:</span>
                                  <span className="font-medium">{getExpandedData(call.id).record.callCompleteTimestamp}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Duration:</span>
                                  <span className="font-medium">{getExpandedData(call.id).record.duration}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Hangup:</span>
                                  <span className="font-medium">{getExpandedData(call.id).record.hangup}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Duplicate:</span>
                                  <span className="font-medium">{getExpandedData(call.id).record.duplicate}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Previously Connected:</span>
                                  <span className="font-medium">{getExpandedData(call.id).record.previouslyConnected}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                  <span className="text-gray-600 font-medium">Previously Connected Date:</span>
                                  <span className="font-medium">{getExpandedData(call.id).record.previouslyConnectedDate}</span>
                                </div>
                              </div>
                              
                              <div className="mt-6 pt-4 border-t flex gap-2">
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
                            <h4 className="font-medium mb-4">Call Tags</h4>
                            <div className="space-y-6">
                              {/* User Section */}
                              <div>
                                <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                                  <span className="w-4 h-4 mr-2">👤</span>
                                  User
                                </h5>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Tel:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.user.tel}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Subid 4:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.user.subid4 || '-'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Subid 2:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.user.subid2}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Creative:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.user.creative}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Subid 3:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.user.subid3}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Loc Physical Ms:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.user.locPhysicallMs}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Loc Interest Ms:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.user.locInterestMs}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Network:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.user.network || '-'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Placement:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.user.placement || '-'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Sourceid:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.user.sourceid}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Cpid:</span>
                                    <span className="font-medium font-mono text-xs">{getExpandedData(call.id).tags.user.cpid}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Oid:</span>
                                    <span className="font-medium font-mono text-xs">{getExpandedData(call.id).tags.user.oid}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Https Lifeinsurerquotes:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.user.httpsLifeinsurerquotes}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Gad Source:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.user.gadSource}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Clickid:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.user.clickid}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Integration Section */}
                              <div>
                                <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                                  <span className="w-4 h-4 mr-2">🔗</span>
                                  Integration
                                </h5>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Google Click Id:</span>
                                    <span className="font-medium font-mono text-xs max-w-xs truncate">{getExpandedData(call.id).tags.integration.googleClickId}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Gbraid:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.integration.gbraid || '-'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Wbraid:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.integration.wbraid || '-'}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Display Section */}
                              <div>
                                <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                                  <span className="w-4 h-4 mr-2">📱</span>
                                  Display
                                </h5>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Width:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.display.width}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Height:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.display.height}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Avail Width:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.display.availWidth}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Avail Height:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.display.availHeight}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Pixel Depth:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.display.pixelDepth}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Color Depth:</span>
                                    <span className="font-medium">{getExpandedData(call.id).tags.display.colorDepth}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Request Section */}
                              <div>
                                <h5 className="font-medium text-gray-800 mb-3 flex items-center">
                                  <span className="w-4 h-4 mr-2">🌐</span>
                                  Request
                                </h5>
                                <div className="text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Referrer:</span>
                                    <span className="font-medium max-w-xs truncate">{getExpandedData(call.id).tags.request.referrer}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="transcription" className="mt-0">
                          <div className="bg-white rounded border p-4">
                            <h4 className="font-medium mb-3">Call Transcription</h4>
                            <div className="text-sm leading-relaxed text-gray-700 whitespace-pre-line max-h-96 overflow-y-auto border border-gray-200 rounded p-3">
                              {getExpandedData(call.id).transcription}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="ai-summary" className="mt-0">
                          <div className="bg-white rounded border p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium">AI Summary and Analysis</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Overall AI Score:</span>
                                <div className={`text-2xl font-bold px-3 py-1 rounded ${getScoreColor(getExpandedData(call.id).aiSummary.overallScore)}`}>
                                  {getExpandedData(call.id).aiSummary.overallScore}%
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              {/* Score Breakdown */}
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="text-center">
                                  <div className="text-lg font-semibold text-blue-600">{getExpandedData(call.id).aiSummary.scores.scriptAdherence}%</div>
                                  <div className="text-xs text-gray-600">Script Adherence</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-semibold text-green-600">{getExpandedData(call.id).aiSummary.scores.customerHandling}%</div>
                                  <div className="text-xs text-gray-600">Customer Handling</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-semibold text-purple-600">{getExpandedData(call.id).aiSummary.scores.problemSolving}%</div>
                                  <div className="text-xs text-gray-600">Problem Solving</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-semibold text-orange-600">{getExpandedData(call.id).aiSummary.scores.productKnowledge}%</div>
                                  <div className="text-xs text-gray-600">Product Knowledge</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-semibold text-indigo-600">{getExpandedData(call.id).aiSummary.scores.salesEffectiveness}%</div>
                                  <div className="text-xs text-gray-600">Sales Effectiveness</div>
                                </div>
                              </div>
                              
                              {/* Detailed Analysis */}
                              <div className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                                {getExpandedData(call.id).aiSummary.analysis}
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="call-summary" className="mt-0">
                          <CallSummary 
                            contactId={call.from}
                            onSave={(data) => {
                              console.log("Saving call summary for call:", call.id, data);
                            }}
                          />
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
    </TabsContent>

    <TabsContent value="summary" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Call Summary Management</CardTitle>
          <p className="text-gray-600">Click on any call in the Call History tab to expand it and access the Call Summary tab for detailed information.</p>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Call Summary Now Integrated</h3>
            <p className="text-gray-600 mb-4">
              Call Summary functionality is now available as a tab within each expanded call in the Call History section.
            </p>
            <p className="text-sm text-gray-500">
              To access: Go to Call History → Click any call to expand → Select "Call Summary" tab
            </p>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>

  {/* Remove the separate Call Summary Modal since it's now integrated */}
</div>
);
};

export default CallHistoryReport;
