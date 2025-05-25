import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Download, Search, Filter, ChevronDown, ChevronRight, Headphones, Eye, Phone, Radio } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import DateRangeSelector from "./DateRangeSelector";
import LiveCallModal from "./LiveCallModal";

// Enhanced mock real-time call data with detailed information
const mockRealtimeData = [
  {
    id: "rt-001",
    dateTime: "5/2/25 15:55",
    callRecordId: "5C3654BC-8D58-474C-B39F-D409F4C2945",
    callerId: "479-236-5208",
    promoNumber: "877-700-0622",
    callType: "Inbound",
    publisherName: "Google 9 (rag@nowbereads.com)",
    campaignName: "Final Expense - Social - No IVR",
    type: "Bundled",
    forwarded: "Yes",
    ageSelectedOfferName: "Family First (Sen) - No IVR",
    offerName: "Family First (Sen) - No IVR",
    aiScore: 85,
    duration: "2:15",
    agent: "Sarah Johnson",
    status: "Active",
    contact: {
      name: "Robert Martinez",
      email: "robert.martinez@email.com",
      address: "123 Oak St, Austin, TX 78701",
      age: 67,
      insurance: "Currently uninsured"
    },
    aiBreakdown: {
      scriptAdherence: 90,
      customerHandling: 85,
      problemSolving: 80,
      overallScore: 85
    },
    keyTopics: ["Final expense insurance", "Premium quotes", "Coverage options"],
    sentiment: "Positive",
    actionItems: [
      "Send quote via email",
      "Schedule follow-up call"
    ],
    summary: "Customer is actively discussing final expense insurance options. The agent is providing detailed information about coverage amounts and premium costs. Customer shows strong interest and is asking specific questions about beneficiaries and claim processes."
  },
  {
    id: "rt-002",
    dateTime: "5/2/25 15:51",
    callRecordId: "2446B ED2-63E3-45C4-B8AE-79EC4A70F244",
    callerId: "832-885-3122",
    promoNumber: "888-603-7484",
    callType: "Inbound",
    publisherName: "Google 9 (rag@nowbereads.com)",
    campaignName: "Final Expense Bundle",
    type: "Bundled",
    forwarded: "Yes",
    ageSelectedOfferName: "Inspire - Search",
    offerName: "Inspire - Search",
    aiScore: 62,
    duration: "1:45",
    agent: "Mike Wilson",
    status: "On Hold",
    contact: {
      name: "Linda Thompson",
      email: "linda.thompson@email.com",
      address: "456 Pine Ave, Dallas, TX 75201",
      age: 72,
      insurance: "Has existing policy"
    },
    aiBreakdown: {
      scriptAdherence: 65,
      customerHandling: 60,
      problemSolving: 62,
      overallScore: 62
    },
    keyTopics: ["Policy comparison", "Premium rates"],
    sentiment: "Neutral",
    actionItems: [
      "Provide competitor comparison"
    ],
    summary: "Customer is comparing our rates with existing policy. Currently on hold while agent researches competitor rates."
  },
  {
    id: "rt-003",
    dateTime: "5/2/25 15:50",
    callRecordId: "7C5D438E-04C8-4E85-953E-8B243E53A85F",
    callerId: "618-696-2020",
    promoNumber: "888-603-7484",
    callType: "Inbound",
    publisherName: "Google 9 (rag@nowbereads.com)",
    campaignName: "Final Expense Bundle",
    type: "Bundled",
    forwarded: "Yes",
    ageSelectedOfferName: "Inspire - Search",
    offerName: "Inspire - Search",
    aiScore: 74,
    duration: "3:20",
    agent: "Jennifer Davis",
    status: "Completed",
    contact: {
      name: "William Garcia",
      email: "william.garcia@email.com",
      address: "789 Maple Dr, Houston, TX 77001",
      age: 69,
      insurance: "Previously declined"
    },
    aiBreakdown: {
      scriptAdherence: 75,
      customerHandling: 74,
      problemSolving: 73,
      overallScore: 74
    },
    keyTopics: ["Health questions", "Application process", "Premium payment"],
    sentiment: "Positive",
    actionItems: [
      "Process application",
      "Send confirmation email"
    ],
    summary: "Successfully completed application process. Customer answered all health questions and agreed to monthly premium payments. Application submitted for underwriting review."
  }
];

const RealtimeReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCall, setExpandedCall] = useState<string | null>(null);
  const [selectedCallForLive, setSelectedCallForLive] = useState<any>(null);
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date()
  });

  const filteredData = mockRealtimeData.filter(call => 
    call.callerId.includes(searchTerm) ||
    call.publisherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "On Hold": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const toggleExpanded = (callId: string) => {
    setExpandedCall(expandedCall === callId ? null : callId);
  };

  const handleListenRecording = (callId: string) => {
    console.log("Listen to live call:", callId);
    // TODO: Implement live call listening
  };

  const handleLiveMonitoring = (call: any) => {
    console.log("Start live monitoring for call:", call.id);
    setSelectedCallForLive({
      id: call.id,
      contact: {
        name: call.contact.name,
        phone: call.callerId,
      },
      agent: call.agent,
      duration: call.duration,
      status: call.status,
      aiScore: call.aiScore,
      campaign: call.campaignName
    });
    setIsLiveModalOpen(true);
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
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Realtime Calls (Total: 1322)</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button size="sm">
                <Download className="w-4 h-4 mr-2" />
                EXPORT
              </Button>
            </div>
          </div>
          <div className="flex gap-4 items-center flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search..."
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
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
              <div className="col-span-2">Contact</div>
              <div>Caller ID</div>
              <div>Campaign</div>
              <div>Duration</div>
              <div>Agent</div>
              <div>Status</div>
              <div>AI Score</div>
              <div>Actions</div>
            </div>

            {/* Table Rows */}
            {filteredData.map((call) => (
              <div key={call.id} className="space-y-2">
                <div 
                  className="grid grid-cols-12 gap-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
                  onClick={(e) => {
                    // Only toggle expansion if not clicking on action buttons
                    if (!(e.target as HTMLElement).closest('.action-buttons')) {
                      toggleExpanded(call.id);
                    }
                  }}
                >
                  <div className="col-span-2 flex items-center gap-2">
                    {expandedCall === call.id ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    <Phone className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-600">{call.contact.name}</div>
                      <div className="text-xs text-gray-500">{call.dateTime}</div>
                    </div>
                  </div>
                  <div>{call.callerId}</div>
                  <div className="text-sm truncate" title={call.campaignName}>{call.campaignName}</div>
                  <div>{call.duration}</div>
                  <div className="text-sm">{call.agent}</div>
                  <div>
                    <Badge className={getStatusColor(call.status)}>{call.status}</Badge>
                  </div>
                  <div className={`font-semibold ${getScoreColor(call.aiScore)}`}>
                    {call.aiScore}%
                  </div>
                  <div className="action-buttons flex gap-1">
                    {call.status === "Active" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLiveMonitoring(call);
                        }}
                        className="h-8 w-8 p-0"
                        title="Live monitoring"
                      >
                        <Radio className="w-4 h-4 text-green-600" />
                      </Button>
                    )}
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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Call Details */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">Call Details</h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium">Call Record ID:</span> {call.callRecordId}</div>
                          <div><span className="font-medium">Promo Number:</span> {call.promoNumber}</div>
                          <div><span className="font-medium">Call Type:</span> {call.callType}</div>
                          <div><span className="font-medium">Publisher:</span> {call.publisherName}</div>
                          <div><span className="font-medium">Campaign:</span> {call.campaignName}</div>
                          <div><span className="font-medium">Type:</span> {call.type}</div>
                          <div><span className="font-medium">Forwarded:</span> {call.forwarded}</div>
                          <div><span className="font-medium">Duration:</span> {call.duration}</div>
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

                      {/* Contact Information */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">Contact Information</h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium">Name:</span> {call.contact.name}</div>
                          <div><span className="font-medium">Phone:</span> {call.callerId}</div>
                          <div><span className="font-medium">Email:</span> {call.contact.email}</div>
                          <div><span className="font-medium">Address:</span> {call.contact.address}</div>
                          <div><span className="font-medium">Age:</span> {call.contact.age}</div>
                          <div><span className="font-medium">Insurance Status:</span> {call.contact.insurance}</div>
                        </div>
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
                      <h4 className="font-semibold mb-2">Real-time AI Summary</h4>
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

      {/* Live Call Monitoring Modal */}
      {selectedCallForLive && (
        <LiveCallModal
          isOpen={isLiveModalOpen}
          onClose={() => {
            setIsLiveModalOpen(false);
            setSelectedCallForLive(null);
          }}
          callData={selectedCallForLive}
        />
      )}
    </>
  );
};

export default RealtimeReport;
