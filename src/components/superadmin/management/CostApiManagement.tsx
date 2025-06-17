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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CostApiManagementProps {
  onBackToDashboard: () => void;
}

// Enhanced mock data for transcription transactions
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
  },
  {
    id: "txn_004",
    callId: "call_12348",
    timestamp: "2024-01-15 14:22:33",
    duration: "3.5 min",
    status: "success",
    cost: 0.070,
    provider: "Deepgram",
    audioLength: "210 seconds",
    wordCount: 315
  },
  {
    id: "txn_005",
    callId: "call_12349",
    timestamp: "2024-01-15 14:20:11",
    duration: "1.8 min",
    status: "failed",
    cost: 0.00,
    provider: "Deepgram",
    audioLength: "108 seconds",
    error: "Connection timeout"
  },
  {
    id: "txn_006",
    callId: "call_12350",
    timestamp: "2024-01-15 14:18:45",
    duration: "5.3 min",
    status: "success",
    cost: 0.106,
    provider: "Deepgram",
    audioLength: "318 seconds",
    wordCount: 534
  },
  {
    id: "txn_007",
    callId: "call_12351",
    timestamp: "2024-01-15 14:15:22",
    duration: "2.9 min",
    status: "success",
    cost: 0.058,
    provider: "Deepgram",
    audioLength: "174 seconds",
    wordCount: 298
  },
  {
    id: "txn_008",
    callId: "call_12352",
    timestamp: "2024-01-15 14:12:18",
    duration: "4.7 min",
    status: "failed",
    cost: 0.00,
    provider: "Deepgram",
    audioLength: "282 seconds",
    error: "API rate limit exceeded"
  },
  {
    id: "txn_009",
    callId: "call_12353",
    timestamp: "2024-01-15 14:10:05",
    duration: "3.1 min",
    status: "success",
    cost: 0.062,
    provider: "Deepgram",
    audioLength: "186 seconds",
    wordCount: 289
  },
  {
    id: "txn_010",
    callId: "call_12354",
    timestamp: "2024-01-15 14:08:33",
    duration: "7.2 min",
    status: "success",
    cost: 0.144,
    provider: "Deepgram",
    audioLength: "432 seconds",
    wordCount: 756
  }
];

// Enhanced mock data for AI analysis transactions
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
    timestamp: "2024-01-15 14:23:15",
    status: "failed",
    cost: 0.00,
    provider: "Google Gemini",
    error: "Rate limit exceeded"
  },
  {
    id: "ai_004",
    callId: "call_12350",
    timestamp: "2024-01-15 14:19:30",
    status: "success",
    cost: 0.053,
    provider: "Google Gemini",
    inputTokens: 1534,
    outputTokens: 421,
    analysisType: "Full Analysis"
  },
  {
    id: "ai_005",
    callId: "call_12351",
    timestamp: "2024-01-15 14:16:45",
    status: "success",
    cost: 0.038,
    provider: "Google Gemini",
    inputTokens: 1098,
    outputTokens: 298,
    analysisType: "Quick Analysis"
  },
  {
    id: "ai_006",
    callId: "call_12353",
    timestamp: "2024-01-15 14:11:20",
    status: "success",
    cost: 0.041,
    provider: "Google Gemini",
    inputTokens: 1189,
    outputTokens: 325,
    analysisType: "Full Analysis"
  },
  {
    id: "ai_007",
    callId: "call_12354",
    timestamp: "2024-01-15 14:09:45",
    status: "success",
    cost: 0.078,
    provider: "Google Gemini",
    inputTokens: 2156,
    outputTokens: 634,
    analysisType: "Full Analysis"
  },
  {
    id: "ai_008",
    callId: "call_12355",
    timestamp: "2024-01-15 14:07:12",
    status: "failed",
    cost: 0.00,
    provider: "Google Gemini",
    error: "Invalid request format"
  },
  {
    id: "ai_009",
    callId: "call_12356",
    timestamp: "2024-01-15 14:05:33",
    status: "success",
    cost: 0.049,
    provider: "Google Gemini",
    inputTokens: 1423,
    outputTokens: 387,
    analysisType: "Full Analysis"
  },
  {
    id: "ai_010",
    callId: "call_12357",
    timestamp: "2024-01-15 14:03:18",
    status: "failed",
    cost: 0.00,
    provider: "Google Gemini",
    error: "Model temporarily unavailable"
  }
];

const CostApiManagement = ({ onBackToDashboard }: CostApiManagementProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");
  const [typeFilter, setTypeFilter] = useState("all");

  const totalTranscriptionCost = mockTranscriptionTransactions
    .filter(t => t.status === "success")
    .reduce((sum, t) => sum + t.cost, 0);

  const totalAnalysisCost = mockAnalysisTransactions
    .filter(t => t.status === "success")
    .reduce((sum, t) => sum + t.cost, 0);

  const transcriptionFailures = mockTranscriptionTransactions.filter(t => t.status === "failed").length;
  const analysisFailures = mockAnalysisTransactions.filter(t => t.status === "failed").length;

  const totalTransactions = mockTranscriptionTransactions.length + mockAnalysisTransactions.length;
  const successfulTransactions = mockTranscriptionTransactions.filter(t => t.status === "success").length + 
                                mockAnalysisTransactions.filter(t => t.status === "success").length;

  // Combine all transactions for the unified view
  const allTransactions = [
    ...mockTranscriptionTransactions.map(txn => ({
      ...txn,
      type: 'transcription' as const,
      provider: txn.provider,
      details: `${txn.duration} • ${txn.wordCount || 0} words`
    })),
    ...mockAnalysisTransactions.map(txn => ({
      ...txn,
      type: 'analysis' as const,
      provider: txn.provider,
      details: `${txn.inputTokens || 0} in • ${txn.outputTokens || 0} out tokens`
    }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Combine all failed transactions for the unified failures view
  const allFailedTransactions = [
    ...mockTranscriptionTransactions
      .filter(t => t.status === "failed")
      .map(txn => ({
        ...txn,
        type: 'transcription' as const,
        provider: txn.provider,
        details: `${txn.duration} • ${txn.audioLength}`
      })),
    ...mockAnalysisTransactions
      .filter(t => t.status === "failed")
      .map(txn => ({
        ...txn,
        type: 'analysis' as const,
        provider: txn.provider,
        details: `${txn.inputTokens || 0} in • ${txn.outputTokens || 0} out tokens`
      }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Filter all transactions
  const filteredAllTransactions = allTransactions.filter(txn => {
    const matchesSearch = searchTerm === "" || txn.callId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter;
    const matchesType = typeFilter === "all" || txn.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    if (status === "success") {
      return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Success</Badge>;
    }
    return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
  };

  // Filter transactions based on search and status
  const filteredTranscriptionTransactions = mockTranscriptionTransactions.filter(txn => {
    const matchesSearch = searchTerm === "" || txn.callId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredAnalysisTransactions = mockAnalysisTransactions.filter(txn => {
    const matchesSearch = searchTerm === "" || txn.callId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getTypeBadge = (type: string) => {
    if (type === 'transcription') {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700">Transcription</Badge>;
    }
    return <Badge variant="outline" className="bg-purple-50 text-purple-700">AI Analysis</Badge>;
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="all-transactions">All Transactions</TabsTrigger>
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
                <p className="text-xs text-green-600 mt-2">Today • {mockTranscriptionTransactions.filter(t => t.status === "success").length} successful</p>
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
                <p className="text-xs text-green-600 mt-2">Today • {mockAnalysisTransactions.filter(t => t.status === "success").length} successful</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">API Failures</p>
                    <p className="text-2xl font-bold">{transcriptionFailures + analysisFailures}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-xs text-red-600 mt-2">Transcription: {transcriptionFailures} • AI: {analysisFailures}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold">{((successfulTransactions / totalTransactions) * 100).toFixed(1)}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">{successfulTransactions} of {totalTransactions} transactions</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Daily Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Deepgram Transcription</span>
                    <span className="font-semibold">${totalTranscriptionCost.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Google Gemini Analysis</span>
                    <span className="font-semibold">${totalAnalysisCost.toFixed(3)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total Daily Cost</span>
                      <span>${(totalTranscriptionCost + totalAnalysisCost).toFixed(3)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[...mockTranscriptionTransactions, ...mockAnalysisTransactions]
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .slice(0, 5)
                    .map((txn, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <div>
                          <span className="font-mono text-xs">{txn.callId}</span>
                          <span className="text-gray-500 ml-2">
                            {'provider' in txn ? 'Transcription' : 'AI Analysis'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(txn.status)}
                          <span className="font-semibold">${txn.cost.toFixed(3)}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="all-transactions" className="space-y-6">
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Search by Call ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="transcription">Transcription</SelectItem>
                <SelectItem value="analysis">AI Analysis</SelectItem>
              </SelectContent>
            </Select>
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
              <CardTitle>All Transactions ({filteredAllTransactions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Call ID</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAllTransactions.map((txn) => (
                    <TableRow key={`${txn.type}-${txn.id}`}>
                      <TableCell>{getTypeBadge(txn.type)}</TableCell>
                      <TableCell className="font-mono text-xs">{txn.id}</TableCell>
                      <TableCell className="font-mono text-xs">{txn.callId}</TableCell>
                      <TableCell>{txn.timestamp}</TableCell>
                      <TableCell>{getStatusBadge(txn.status)}</TableCell>
                      <TableCell>${txn.cost.toFixed(3)}</TableCell>
                      <TableCell>{txn.provider}</TableCell>
                      <TableCell className="text-sm text-gray-600">{txn.details}</TableCell>
                      <TableCell className="text-red-600 text-xs">{txn.error || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
              <CardTitle>Transcription Transactions ({filteredTranscriptionTransactions.length})</CardTitle>
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
                    {filteredTranscriptionTransactions.map((txn) => (
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
              <CardTitle>AI Analysis Transactions ({filteredAnalysisTransactions.length})</CardTitle>
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
                    {filteredAnalysisTransactions.map((txn) => (
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <XCircle className="w-5 h-5" />
                All API Failures ({allFailedTransactions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Call ID</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allFailedTransactions.map((txn) => (
                    <TableRow key={`${txn.type}-${txn.id}`}>
                      <TableCell>{getTypeBadge(txn.type)}</TableCell>
                      <TableCell className="font-mono text-xs">{txn.id}</TableCell>
                      <TableCell className="font-mono text-xs">{txn.callId}</TableCell>
                      <TableCell>{txn.timestamp}</TableCell>
                      <TableCell>{txn.provider}</TableCell>
                      <TableCell className="text-sm text-gray-600">{txn.details}</TableCell>
                      <TableCell className="text-red-600 text-sm">{txn.error}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Failure Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-red-50 rounded">
                  <p className="text-2xl font-bold text-red-600">{transcriptionFailures + analysisFailures}</p>
                  <p className="text-sm text-gray-600">Total Failures Today</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded">
                  <p className="text-2xl font-bold text-blue-600">{((successfulTransactions / totalTransactions) * 100).toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded">
                  <p className="text-2xl font-bold text-green-600">${(totalTranscriptionCost + totalAnalysisCost).toFixed(3)}</p>
                  <p className="text-sm text-gray-600">Total Cost Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CostApiManagement;
