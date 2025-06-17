
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Activity,
  TrendingUp,
  Calendar,
  Search,
  Download,
  RefreshCw
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CostApiManagementProps {
  onBackToDashboard: () => void;
}

// Mock data for transactions
const mockTranscriptionTransactions = [
  {
    id: "txn_001",
    callId: "call_12345",
    timestamp: "2024-01-15 14:30:25",
    duration: "4.2 min",
    status: "success",
    cost: 0.084,
    provider: "Deepgram",
    audioLength: "252 seconds",
    wordCount: 421
  },
  {
    id: "txn_002", 
    callId: "call_12346",
    timestamp: "2024-01-15 14:28:12",
    duration: "2.1 min",
    status: "failed",
    cost: 0.00,
    provider: "Deepgram",
    audioLength: "126 seconds",
    error: "Audio quality too poor"
  },
  {
    id: "txn_003",
    callId: "call_12347", 
    timestamp: "2024-01-15 14:25:45",
    duration: "6.8 min",
    status: "success",
    cost: 0.136,
    provider: "Deepgram",
    audioLength: "408 seconds",
    wordCount: 682
  }
];

const mockAnalysisTransactions = [
  {
    id: "ai_001",
    callId: "call_12345",
    timestamp: "2024-01-15 14:31:02",
    status: "success",
    cost: 0.045,
    provider: "Google Gemini",
    inputTokens: 1250,
    outputTokens: 380,
    analysisType: "Full Analysis"
  },
  {
    id: "ai_002",
    callId: "call_12347",
    timestamp: "2024-01-15 14:26:22",
    status: "success", 
    cost: 0.062,
    provider: "Google Gemini",
    inputTokens: 1680,
    outputTokens: 495,
    analysisType: "Full Analysis"
  },
  {
    id: "ai_003",
    callId: "call_12348",
    timestamp: "2024-01-15 14:22:15",
    status: "failed",
    cost: 0.00,
    provider: "Google Gemini",
    error: "Rate limit exceeded"
  }
];

const CostApiManagement = ({ onBackToDashboard }: CostApiManagementProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");

  const totalTranscriptionCost = mockTranscriptionTransactions
    .filter(t => t.status === "success")
    .reduce((sum, t) => sum + t.cost, 0);

  const totalAnalysisCost = mockAnalysisTransactions
    .filter(t => t.status === "success")
    .reduce((sum, t) => sum + t.cost, 0);

  const transcriptionFailures = mockTranscriptionTransactions.filter(t => t.status === "failed").length;
  const analysisFailures = mockAnalysisTransactions.filter(t => t.status === "failed").length;

  const getStatusBadge = (status: string) => {
    if (status === "success") {
      return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Success</Badge>;
    }
    return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Cost & API Management</h1>
          <p className="text-gray-600">Monitor transcription and AI analysis costs and API performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={onBackToDashboard}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transcription">Transcription</TabsTrigger>
          <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="failures">API Failures</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Transcription Cost</p>
                    <p className="text-2xl font-bold">${totalTranscriptionCost.toFixed(3)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">Today</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total AI Analysis Cost</p>
                    <p className="text-2xl font-bold">${totalAnalysisCost.toFixed(3)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">Today</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Transcription Failures</p>
                    <p className="text-2xl font-bold">{transcriptionFailures}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-xs text-red-600 mt-2">Needs attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">AI Analysis Failures</p>
                    <p className="text-2xl font-bold">{analysisFailures}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-orange-600 mt-2">Rate limits</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Cost Trends (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Activity className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Cost trend chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transcription" className="space-y-6">
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Search by Call ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transcription Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Transaction ID</th>
                      <th className="text-left p-3">Call ID</th>
                      <th className="text-left p-3">Timestamp</th>
                      <th className="text-left p-3">Duration</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Cost</th>
                      <th className="text-left p-3">Word Count</th>
                      <th className="text-left p-3">Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTranscriptionTransactions.map((txn) => (
                      <tr key={txn.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono text-xs">{txn.id}</td>
                        <td className="p-3 font-mono text-xs">{txn.callId}</td>
                        <td className="p-3">{txn.timestamp}</td>
                        <td className="p-3">{txn.duration}</td>
                        <td className="p-3">{getStatusBadge(txn.status)}</td>
                        <td className="p-3">${txn.cost.toFixed(3)}</td>
                        <td className="p-3">{txn.wordCount || "-"}</td>
                        <td className="p-3 text-red-600 text-xs">{txn.error || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Search by Call ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Transaction ID</th>
                      <th className="text-left p-3">Call ID</th>
                      <th className="text-left p-3">Timestamp</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Cost</th>
                      <th className="text-left p-3">Input Tokens</th>
                      <th className="text-left p-3">Output Tokens</th>
                      <th className="text-left p-3">Analysis Type</th>
                      <th className="text-left p-3">Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAnalysisTransactions.map((txn) => (
                      <tr key={txn.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono text-xs">{txn.id}</td>
                        <td className="p-3 font-mono text-xs">{txn.callId}</td>
                        <td className="p-3">{txn.timestamp}</td>
                        <td className="p-3">{getStatusBadge(txn.status)}</td>
                        <td className="p-3">${txn.cost.toFixed(3)}</td>
                        <td className="p-3">{txn.inputTokens || "-"}</td>
                        <td className="p-3">{txn.outputTokens || "-"}</td>
                        <td className="p-3">{txn.analysisType || "-"}</td>
                        <td className="p-3 text-red-600 text-xs">{txn.error || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="failures" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <XCircle className="w-5 h-5" />
                  Transcription Failures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTranscriptionTransactions
                    .filter(t => t.status === "failed")
                    .map((txn) => (
                      <div key={txn.id} className="p-3 bg-red-50 border border-red-200 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-mono text-xs">{txn.callId}</span>
                          <span className="text-xs text-gray-500">{txn.timestamp}</span>
                        </div>
                        <p className="text-sm text-red-700">{txn.error}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <AlertTriangle className="w-5 h-5" />
                  AI Analysis Failures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAnalysisTransactions
                    .filter(t => t.status === "failed")
                    .map((txn) => (
                      <div key={txn.id} className="p-3 bg-orange-50 border border-orange-200 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-mono text-xs">{txn.callId}</span>
                          <span className="text-xs text-gray-500">{txn.timestamp}</span>
                        </div>
                        <p className="text-sm text-orange-700">{txn.error}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CostApiManagement;
