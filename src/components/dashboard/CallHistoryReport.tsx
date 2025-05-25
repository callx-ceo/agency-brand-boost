
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Phone, Download, ChevronDown, ChevronRight, Headphones, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import DateRangeSelector from "./DateRangeSelector";

// Mock data based on the Call History image
const mockCallHistoryData = [
  {
    id: "call-001",
    contact: "HOMEINS",
    from: "(772) 240-4457",
    source: "homeinbound8",
    to: "(855) 963-0365",
    duration: "1:23",
    date: "May 21, 9:45 AM",
    agent: "Flores, Juanita",
    status: "Missed",
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
    contact: "HOMEINS",
    from: "(682) 323-1382",
    source: "homeinbound8",
    to: "(855) 963-0365", 
    duration: "1:11",
    date: "May 21, 10:12 AM",
    agent: "Flores, Juanita",
    status: "Missed",
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
    contact: "AUTOINS", 
    from: "(843) 805-9900",
    source: "autoinboundrevsharepad42",
    to: "(855) 495-8163",
    duration: "23:25",
    date: "May 21, 10:30 AM",
    agent: "Flores, Juanita",
    status: "Accepted",
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
    call.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.from.includes(searchTerm) ||
    call.agent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted": return "bg-green-100 text-green-800";
      case "Missed": return "bg-red-100 text-red-800";
      case "Qualified": return "bg-blue-100 text-blue-800";
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
                placeholder="User name or phone..."
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
            <div className="grid grid-cols-10 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
              <div>Contact</div>
              <div>From</div>
              <div>Source</div>
              <div>To</div>
              <div>Duration</div>
              <div>Date</div>
              <div>Agent</div>
              <div>Account Status</div>
              <div>AI Score</div>
              <div>Actions</div>
            </div>

            {/* Table Rows */}
            {filteredCalls.map((call) => (
              <div key={call.id} className="space-y-2">
                <div 
                  className="grid grid-cols-10 gap-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
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
                    <span className="font-medium text-blue-600">{call.contact}</span>
                  </div>
                  <div>{call.from}</div>
                  <div className="text-sm text-gray-600">{call.source}</div>
                  <div>{call.to}</div>
                  <div>{call.duration}</div>
                  <div className="text-sm">{call.date}</div>
                  <div>{call.agent}</div>
                  <div>
                    <Badge className={getStatusColor(call.status)}>{call.status}</Badge>
                  </div>
                  <div className={`font-semibold ${getScoreColor(call.aiScore)}`}>
                    {call.aiScore}%
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

                {/* Expanded Details */}
                {expandedCall === call.id && (
                  <div className="ml-6 p-4 bg-gray-50 rounded-lg space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Call Details */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">Call Details</h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium">Call ID:</span> {call.id}</div>
                          <div><span className="font-medium">Account:</span> {call.contact}</div>
                          <div><span className="font-medium">Number Dialed:</span> {call.to}</div>
                          <div><span className="font-medium">Caller Phone:</span> {call.from}</div>
                          <div><span className="font-medium">Campaign:</span> {call.source}</div>
                          <div><span className="font-medium">Duration:</span> {call.duration}</div>
                          <div><span className="font-medium">Status:</span> {call.status}</div>
                        </div>

                        <div className="mt-4">
                          <h5 className="font-medium mb-2">Key Topics</h5>
                          <div className="flex flex-wrap gap-2">
                            {call.keyTopics.map((topic, index) => (
                              <Badge key={index} variant="outline">{topic}</Badge>
                            ))}
                          </div>
                          <div className="mt-2">
                            <span className="font-medium">Sentiment: </span>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {call.sentiment}
                            </Badge>
                          </div>
                        </div>

                        {call.actionItems.length > 0 && (
                          <div>
                            <h5 className="font-medium mb-2">Action Items</h5>
                            <ul className="list-disc list-inside text-sm space-y-1">
                              {call.actionItems.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* AI Score Breakdown */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">AI Score Breakdown</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Script Adherence</span>
                              <span>{call.aiBreakdown.scriptAdherence}%</span>
                            </div>
                            <Progress value={call.aiBreakdown.scriptAdherence} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Customer Handling</span>
                              <span>{call.aiBreakdown.customerHandling}%</span>
                            </div>
                            <Progress value={call.aiBreakdown.customerHandling} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Problem Solving</span>
                              <span>{call.aiBreakdown.problemSolving}%</span>
                            </div>
                            <Progress value={call.aiBreakdown.problemSolving} className="h-2" />
                          </div>
                          <div className="border-t pt-2">
                            <div className="flex justify-between text-sm font-semibold">
                              <span>Overall Score</span>
                              <span className={getScoreColor(call.aiBreakdown.overallScore)}>
                                {call.aiBreakdown.overallScore}%
                              </span>
                            </div>
                            <Progress value={call.aiBreakdown.overallScore} className="h-3 mt-1" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Summary */}
                    <div>
                      <h4 className="font-semibold mb-2">AI Summary</h4>
                      <div className="bg-white p-3 rounded border text-sm leading-relaxed">
                        {call.summary}
                      </div>
                    </div>
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
