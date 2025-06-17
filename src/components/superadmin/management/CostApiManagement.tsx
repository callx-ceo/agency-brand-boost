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
  RefreshCw,
  Filter,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import CostApiDateRangeSelector from "./CostApiDateRangeSelector";

interface CostApiManagementProps {
  onBackToDashboard: () => void;
}

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

// Get today's date and create timestamps throughout the day
const today = new Date();
const formatToday = (hour: number, minute: number) => {
  const date = new Date(today);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

// Enhanced mock data for transcription transactions with today's dates
const mockTranscriptionTransactions = [
  {
    id: "txn_001",
    callId: "call_12345",
    timestamp: formatToday(14, 30),
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
    timestamp: formatToday(14, 28),
    duration: "2.1 min",
    status: "failed",
    cost: 0.00,
    provider: "Deepgram",
    audioLength: "126 seconds",
    error: "Audio quality too poor",
    failureDetails: "SNR: -12dB, Background noise detected"
  },
  {
    id: "txn_003",
    callId: "call_12347", 
    timestamp: formatToday(14, 25),
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
    timestamp: formatToday(14, 22),
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
    timestamp: formatToday(14, 20),
    duration: "1.8 min",
    status: "failed",
    cost: 0.00,
    provider: "Deepgram",
    audioLength: "108 seconds",
    error: "Connection timeout",
    failureDetails: "Timeout after 30s, Retry attempts: 3"
  }
];

// Enhanced mock data for AI analysis transactions with today's dates
const mockAnalysisTransactions = [
  {
    id: "ai_001",
    callId: "call_12345",
    timestamp: formatToday(14, 31),
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
    timestamp: formatToday(14, 26),
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
    timestamp: formatToday(14, 23),
    status: "failed",
    cost: 0.00,
    provider: "Google Gemini",
    error: "Rate limit exceeded",
    failureDetails: "Daily quota exceeded, Reset: 00:00 UTC"
  },
  {
    id: "ai_004",
    callId: "call_12350",
    timestamp: formatToday(14, 19),
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
    timestamp: formatToday(14, 16),
    status: "success",
    cost: 0.038,
    provider: "Google Gemini",
    inputTokens: 1098,
    outputTokens: 298,
    analysisType: "Quick Analysis"
  }
];

const CostApiManagement = ({ onBackToDashboard }: CostApiManagementProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [providerFilter, setProviderFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date()
  });
  const [showOverviewFilters, setShowOverviewFilters] = useState(false);

  // Debug logging
  console.log("CostApiManagement - Mock data loaded:", {
    transcriptionCount: mockTranscriptionTransactions.length,
    analysisCount: mockAnalysisTransactions.length,
    activeTab,
    dateRange,
    filters: { searchTerm, statusFilter, typeFilter, providerFilter }
  });

  // Filter transactions based on date range for overview
  const getFilteredOverviewData = () => {
    const filterByDate = (transactions: any[]) => {
      if (!showOverviewFilters) return transactions;
      
      return transactions.filter(txn => {
        const txnDate = new Date(txn.timestamp);
        const matchesDateRange = (!dateRange.from || txnDate >= dateRange.from) && 
                                (!dateRange.to || txnDate <= dateRange.to);
        return matchesDateRange;
      });
    };

    const filteredTranscription = filterByDate(mockTranscriptionTransactions);
    const filteredAnalysis = filterByDate(mockAnalysisTransactions);

    return { filteredTranscription, filteredAnalysis };
  };

  const { filteredTranscription, filteredAnalysis } = getFilteredOverviewData();

  const totalTranscriptionCost = filteredTranscription
    .filter(t => t.status === "success")
    .reduce((sum, t) => sum + t.cost, 0);

  const totalAnalysisCost = filteredAnalysis
    .filter(t => t.status === "success")
    .reduce((sum, t) => sum + t.cost, 0);

  const transcriptionFailures = filteredTranscription.filter(t => t.status === "failed").length;
  const analysisFailures = filteredAnalysis.filter(t => t.status === "failed").length;

  const totalTransactions = filteredTranscription.length + filteredAnalysis.length;
  const successfulTransactions = filteredTranscription.filter(t => t.status === "success").length + 
                                filteredAnalysis.filter(t => t.status === "success").length;

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
        details: txn.failureDetails || `Audio: ${txn.audioLength}, Format issues detected`
      })),
    ...mockAnalysisTransactions
      .filter(t => t.status === "failed")
      .map(txn => ({
        ...txn,
        type: 'analysis' as const,
        provider: txn.provider,
        details: txn.failureDetails || `Request validation failed`
      }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const getStatusBadge = (status: string) => {
    if (status === "success") {
      return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Success</Badge>;
    }
    return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
  };

  const getTypeBadge = (type: string) => {
    if (type === 'transcription') {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700">Transcription</Badge>;
    }
    return <Badge variant="outline" className="bg-purple-50 text-purple-700">AI Analysis</Badge>;
  };

  // Enhanced filtering function - simplified for debugging
  const filterTransactions = (transactions: any[]) => {
    console.log("Filtering transactions:", {
      inputCount: transactions.length,
      searchTerm,
      statusFilter,
      typeFilter,
      providerFilter
    });

    const filtered = transactions.filter(txn => {
      const matchesSearch = searchTerm === "" || 
        txn.callId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || txn.status === statusFilter;
      const matchesType = typeFilter === "all" || txn.type === typeFilter;
      const matchesProvider = providerFilter === "all" || txn.provider === providerFilter;
      
      return matchesSearch && matchesStatus && matchesType && matchesProvider;
    });

    console.log("Filtered result:", { outputCount: filtered.length });
    return filtered;
  };

  // Apply filters to all transaction types
  const filteredAllTransactions = filterTransactions(allTransactions);
  const filteredTranscriptionTransactions = filterTransactions(mockTranscriptionTransactions);
  const filteredAnalysisTransactions = filterTransactions(mockAnalysisTransactions);
  const filteredFailedTransactions = filterTransactions(allFailedTransactions);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
    setProviderFilter("all");
    setDateRange({ from: new Date(), to: new Date() });
  };

  const FiltersSection = ({ showTypeFilter = false }: { showTypeFilter?: boolean }) => (
    <div className="flex flex-wrap gap-4 items-center p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filters:</span>
      </div>
      
      <Input
        placeholder="Search by Call ID or Transaction ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      
      <CostApiDateRangeSelector
        value={dateRange}
        onChange={setDateRange}
      />
      
      {showTypeFilter && (
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
      )}
      
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
      
      <Select value={providerFilter} onValueChange={setProviderFilter}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Provider" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Providers</SelectItem>
          <SelectItem value="Deepgram">Deepgram</SelectItem>
          <SelectItem value="Google Gemini">Google Gemini</SelectItem>
        </SelectContent>
      </Select>
      
      <Button variant="outline" size="sm" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );

  const OverviewDateFilter = () => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowOverviewFilters(!showOverviewFilters)}
            className="text-sm"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Date Range Filter
            {showOverviewFilters ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </Button>
          {showOverviewFilters && (
            <Badge variant="secondary" className="text-xs">
              {dateRange.from && dateRange.to 
                ? `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`
                : "Today"
              }
            </Badge>
          )}
        </div>
        {showOverviewFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setDateRange({ from: new Date(), to: new Date() });
              setShowOverviewFilters(false);
            }}
          >
            Reset to Today
          </Button>
        )}
      </div>
      
      {showOverviewFilters && (
        <div className="p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center gap-4">
            <CostApiDateRangeSelector
              value={dateRange}
              onChange={setDateRange}
            />
            <span className="text-sm text-gray-600">
              Showing data for selected date range
            </span>
          </div>
        </div>
      )}
    </div>
  );

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
          <OverviewDateFilter />

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
                <p className="text-xs text-green-600 mt-2">
                  {showOverviewFilters ? 'Selected Period' : 'Today'} • {filteredTranscription.filter(t => t.status === "success").length} successful
                </p>
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
                <p className="text-xs text-green-600 mt-2">
                  {showOverviewFilters ? 'Selected Period' : 'Today'} • {filteredAnalysis.filter(t => t.status === "success").length} successful
                </p>
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
                    <p className="text-2xl font-bold">{totalTransactions > 0 ? ((successfulTransactions / totalTransactions) * 100).toFixed(1) : '0.0'}%</p>
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
                  {showOverviewFilters ? 'Period' : 'Daily'} Cost Breakdown
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
                      <span>Total {showOverviewFilters ? 'Period' : 'Daily'} Cost</span>
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
                  {[...filteredTranscription, ...filteredAnalysis]
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
          <FiltersSection showTypeFilter={true} />

          <Card>
            <CardHeader>
              <CardTitle>All Transactions ({filteredAllTransactions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredAllTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No transactions found matching the current filters.</p>
                  <Button variant="outline" size="sm" onClick={clearFilters} className="mt-2">
                    Clear Filters
                  </Button>
                </div>
              ) : (
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transcription" className="space-y-6">
          <FiltersSection />

          <Card>
            <CardHeader>
              <CardTitle>Transcription Transactions ({filteredTranscriptionTransactions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredTranscriptionTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No transcription transactions found matching the current filters.</p>
                  <Button variant="outline" size="sm" onClick={clearFilters} className="mt-2">
                    Clear Filters
                  </Button>
                </div>
              ) : (
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <FiltersSection />

          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Transactions ({filteredAnalysisTransactions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredAnalysisTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No AI analysis transactions found matching the current filters.</p>
                  <Button variant="outline" size="sm" onClick={clearFilters} className="mt-2">
                    Clear Filters
                  </Button>
                </div>
              ) : (
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="failures" className="space-y-6">
          <FiltersSection showTypeFilter={true} />

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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <XCircle className="w-5 h-5" />
                All API Failures ({filteredFailedTransactions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredFailedTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No failed transactions found matching the current filters.</p>
                  <Button variant="outline" size="sm" onClick={clearFilters} className="mt-2">
                    Clear Filters
                  </Button>
                </div>
              ) : (
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
                    {filteredFailedTransactions.map((txn) => (
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
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CostApiManagement;
