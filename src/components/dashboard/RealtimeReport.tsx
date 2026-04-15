
import React, { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search, Phone } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LiveCallModal from "./LiveCallModal";

// Mock data matching the reference screenshot layout
const mockRealtimeData = [
  { id: "rt-001", dateTime: "4/14/26 18:58", callRecordId: "EE21581B-D2EF-4C42-BB8B-104DEF5001F3", callerId: "314-599-0733", promoNumber: "833-824-4807", callType: "Inbound", publisherName: "Upforce Media", campaignName: "Final Expense-IVR-T2", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
  { id: "rt-002", dateTime: "4/14/26 18:43", callRecordId: "D58D2AE1-4DF6-416B-9462-45BC05B0AD39", callerId: "719-960-6351", promoNumber: "877-843-0572", callType: "Inbound", publisherName: "Facebook", campaignName: "Final Expense-IVR-T2", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-003", dateTime: "4/14/26 18:41", callRecordId: "9F17BDC2-F59C-47AF-B5E9-7E9593BD6FA8", callerId: "513-687-0373", promoNumber: "866-407-1963", callType: "Inbound", publisherName: "Google 8 (smrtti@callx.io)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Active", isPaid: false, isLive: true },
  { id: "rt-004", dateTime: "4/14/26 18:22", callRecordId: "80523014-E05D-42AF-A0A5-3E1147650103", callerId: "870-227-3662", promoNumber: "855-785-4362", callType: "Inbound", publisherName: "RingMax Ltd.", campaignName: "Home Insurance Bundle (Copy1)", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
  { id: "rt-005", dateTime: "4/14/26 18:22", callRecordId: "D1CA0E73-045F-4350-B68B-56D9CAF49FB6", callerId: "870-227-3662", promoNumber: "855-785-4362", callType: "Inbound", publisherName: "RingMax Ltd.", campaignName: "Home Insurance Bundle (Copy1)", type: "Bundled", forwarded: "Yes", status: "Active", isPaid: false, isLive: true },
  { id: "rt-006", dateTime: "4/14/26 18:19", callRecordId: "2438BCE7-1D2D-4C8E-A738-64E8691717OD", callerId: "518-588-8433", promoNumber: "877-385-4666", callType: "Inbound", publisherName: "Refer Blue Limited", campaignName: "Credit Repair Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
  { id: "rt-007", dateTime: "4/14/26 18:09", callRecordId: "BE7DF7E9-B84F-481F-B983-852A12FCE1CC", callerId: "919-437-9939", promoNumber: "844-774-4293", callType: "Inbound", publisherName: "Insurex Insurance (Google 1)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-008", dateTime: "4/14/26 17:26", callRecordId: "628ECEFB-672D-4F98-B720-42B68B094E0F", callerId: "302-452-0300", promoNumber: "877-224-3408", callType: "Inbound", publisherName: "Bing", campaignName: "Health Insurance Bundle - ACA", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
  { id: "rt-009", dateTime: "4/14/26 17:18", callRecordId: "02BC0062-6B1E-47B4-4C29-8A1B99155832", callerId: "415-360-7203", promoNumber: "877-843-0572", callType: "Inbound", publisherName: "Facebook", campaignName: "Final Expense-IVR-T2", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-010", dateTime: "4/14/26 17:10", callRecordId: "A986B06A-6186-43FC-B82A-3DA863EA19B0", callerId: "678-201-3169", promoNumber: "855-785-4362", callType: "Inbound", publisherName: "RingMax Ltd.", campaignName: "Home Insurance Bundle (Copy1)", type: "Bundled", forwarded: "Yes", status: "Active", isPaid: true, isLive: true },
  { id: "rt-011", dateTime: "4/14/26 17:09", callRecordId: "FA6D00D5-CA29-414F-950E-BF69CF2F9D94", callerId: "678-201-3169", promoNumber: "855-785-4362", callType: "Inbound", publisherName: "RingMax Ltd.", campaignName: "Home Insurance Bundle (Copy1)", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-012", dateTime: "4/14/26 17:08", callRecordId: "A6A6283A-13DB-4CBA-9ED8-C10C94FF4A62", callerId: "818-848-5578", promoNumber: "888-718-9483", callType: "Inbound", publisherName: "Zhan Feng", campaignName: "Auto Bundle - Private 2", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
  { id: "rt-013", dateTime: "4/14/26 16:55", callRecordId: "D54D24DC-8E3B-4983-ABF5-87AD00C2AEF", callerId: "678-201-3169", promoNumber: "855-785-4362", callType: "Inbound", publisherName: "RingMax Ltd.", campaignName: "Home Insurance Bundle (Copy1)", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
  { id: "rt-014", dateTime: "4/14/26 16:44", callRecordId: "80D7ED3D-4A81-43D3-96AF-106AD5495D22", callerId: "314-359-4102", promoNumber: "866-407-1963", callType: "Inbound", publisherName: "Google 8 (smrtti@callx.io)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-015", dateTime: "4/14/26 16:42", callRecordId: "06CA46D9-6F4D-4DFC-A4AC-B0D6985418S4", callerId: "314-359-4102", promoNumber: "866-407-1963", callType: "Inbound", publisherName: "Google 8 (smrtti@callx.io)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
  { id: "rt-016", dateTime: "4/14/26 16:40", callRecordId: "C725FF42-66BF-4FF3-848D-2CFD268FC53F", callerId: "314-359-4102", promoNumber: "866-407-1963", callType: "Inbound", publisherName: "Google 8 (smrtti@callx.io)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: true, isLive: false },
  { id: "rt-017", dateTime: "4/14/26 16:40", callRecordId: "C9D210F2-A9F8-4687-A143-F0601f195C12", callerId: "337-247-8022", promoNumber: "866-407-1963", callType: "Inbound", publisherName: "Google 8 (smrtti@callx.io)", campaignName: "Final Expense Bundle", type: "Bundled", forwarded: "Yes", status: "Completed", isPaid: false, isLive: false },
];

const ITEMS_PER_PAGE = 15;

const RealtimeReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCallForLive, setSelectedCallForLive] = useState<any>(null);
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);

  // Column filters
  const [filterCallType, setFilterCallType] = useState("all");
  const [filterPublisher, setFilterPublisher] = useState("all");
  const [filterCampaign, setFilterCampaign] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterCallerId, setFilterCallerId] = useState("");
  const [filterPromoNumber, setFilterPromoNumber] = useState("");

  const uniquePublishers = useMemo(() => [...new Set(mockRealtimeData.map(c => c.publisherName))], []);
  const uniqueCampaigns = useMemo(() => [...new Set(mockRealtimeData.map(c => c.campaignName))], []);
  const uniqueTypes = useMemo(() => [...new Set(mockRealtimeData.map(c => c.type))], []);

  const filteredData = useMemo(() => {
    return mockRealtimeData.filter(call => {
      const matchesSearch = !searchTerm || 
        call.callerId.includes(searchTerm) ||
        call.publisherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.callRecordId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCallType = filterCallType === "all" || call.callType === filterCallType;
      const matchesPublisher = filterPublisher === "all" || call.publisherName === filterPublisher;
      const matchesCampaign = filterCampaign === "all" || call.campaignName === filterCampaign;
      const matchesType = filterType === "all" || call.type === filterType;
      const matchesCaller = !filterCallerId || call.callerId.includes(filterCallerId);
      const matchesPromo = !filterPromoNumber || call.promoNumber.includes(filterPromoNumber);
      return matchesSearch && matchesCallType && matchesPublisher && matchesCampaign && matchesType && matchesCaller && matchesPromo;
    });
  }, [searchTerm, filterCallType, filterPublisher, filterCampaign, filterType, filterCallerId, filterPromoNumber]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const getRowClassName = (call: typeof mockRealtimeData[0]) => {
    if (call.isLive) return "bg-green-50 hover:bg-green-100 border-l-4 border-l-green-500";
    if (call.isPaid) return "bg-blue-50 hover:bg-blue-100 text-blue-700";
    return "hover:bg-muted/50";
  };

  const handleLiveMonitoring = (call: any) => {
    setSelectedCallForLive({
      id: call.id,
      contact: { name: "", phone: call.callerId },
      agent: "",
      duration: "",
      status: call.status,
      aiScore: 0,
      campaign: call.campaignName
    });
    setIsLiveModalOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Realtime List</h2>
          </div>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
            <Download className="w-4 h-4 mr-2" />
            EXPORT
          </Button>
        </div>

        {/* Title + Search */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Realtime Calls (Total: {filteredData.length})</h3>
          <div className="relative w-64">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
            const page = Math.max(1, Math.min(currentPage - 1, totalPages - 2)) + i;
            if (page > totalPages) return null;
            return (
              <Button key={page} variant={page === currentPage ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)}
                className={page === currentPage ? "bg-blue-500 text-white" : ""}>
                {page}
              </Button>
            );
          })}
          {totalPages > 3 && <span className="px-2 text-muted-foreground">...</span>}
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Last</Button>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-blue-200 border border-blue-400" />
            <span className="text-muted-foreground">Paid Calls</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-200 border border-green-500" />
            <span className="text-muted-foreground">Live Calls</span>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="text-blue-600 font-semibold min-w-[140px]">Date/Time</TableHead>
                <TableHead className="min-w-[280px]">Call Record ID</TableHead>
                <TableHead className="min-w-[120px]">Caller ID</TableHead>
                <TableHead className="min-w-[120px]">Promo Number</TableHead>
                <TableHead className="min-w-[100px]">Call Type</TableHead>
                <TableHead className="min-w-[200px]">Publisher Name</TableHead>
                <TableHead className="min-w-[220px]">Campaign Name</TableHead>
                <TableHead className="min-w-[100px]">Type</TableHead>
                <TableHead className="min-w-[80px]">Forwarded</TableHead>
              </TableRow>
              {/* Filter row */}
              <TableRow className="bg-muted/10">
                <TableHead>
                  <Select value="all" onValueChange={() => {}}>
                    <SelectTrigger className="h-7 text-xs"><SelectValue placeholder="All" /></SelectTrigger>
                    <SelectContent><SelectItem value="all">All</SelectItem></SelectContent>
                  </Select>
                </TableHead>
                <TableHead></TableHead>
                <TableHead>
                  <Input className="h-7 text-xs" placeholder="" value={filterCallerId} onChange={e => { setFilterCallerId(e.target.value); setCurrentPage(1); }} />
                </TableHead>
                <TableHead>
                  <Input className="h-7 text-xs" placeholder="" value={filterPromoNumber} onChange={e => { setFilterPromoNumber(e.target.value); setCurrentPage(1); }} />
                </TableHead>
                <TableHead>
                  <Select value={filterCallType} onValueChange={v => { setFilterCallType(v); setCurrentPage(1); }}>
                    <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="Inbound">Inbound</SelectItem>
                      <SelectItem value="Outbound">Outbound</SelectItem>
                    </SelectContent>
                  </Select>
                </TableHead>
                <TableHead>
                  <Select value={filterPublisher} onValueChange={v => { setFilterPublisher(v); setCurrentPage(1); }}>
                    <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {uniquePublishers.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </TableHead>
                <TableHead>
                  <Select value={filterCampaign} onValueChange={v => { setFilterCampaign(v); setCurrentPage(1); }}>
                    <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {uniqueCampaigns.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </TableHead>
                <TableHead>
                  <Select value={filterType} onValueChange={v => { setFilterType(v); setCurrentPage(1); }}>
                    <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {uniqueTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </TableHead>
                <TableHead>
                  <Select value="all" onValueChange={() => {}}>
                    <SelectTrigger className="h-7 text-xs"><SelectValue placeholder="All" /></SelectTrigger>
                    <SelectContent><SelectItem value="all">All</SelectItem></SelectContent>
                  </Select>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((call) => (
                <TableRow 
                  key={call.id} 
                  className={`cursor-pointer text-sm ${getRowClassName(call)}`}
                  onClick={() => call.isLive && handleLiveMonitoring(call)}
                >
                  <TableCell className="font-medium text-xs">{call.dateTime}</TableCell>
                  <TableCell className="text-xs font-mono">{call.callRecordId}</TableCell>
                  <TableCell className="text-xs">{call.callerId}</TableCell>
                  <TableCell className="text-xs">{call.promoNumber}</TableCell>
                  <TableCell className="text-xs">{call.callType}</TableCell>
                  <TableCell className="text-xs">{call.publisherName}</TableCell>
                  <TableCell className="text-xs">{call.campaignName}</TableCell>
                  <TableCell className="text-xs">{call.type}</TableCell>
                  <TableCell className="text-xs">{call.forwarded}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedCallForLive && (
        <LiveCallModal
          isOpen={isLiveModalOpen}
          onClose={() => { setIsLiveModalOpen(false); setSelectedCallForLive(null); }}
          callData={selectedCallForLive}
        />
      )}
    </>
  );
};

export default RealtimeReport;
