
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Download, Search, Filter } from "lucide-react";

// Mock real-time call data based on the screenshot
const mockRealtimeData = [
  {
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
    aiScore: "85%"
  },
  {
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
    aiScore: "62%"
  },
  {
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
    aiScore: "74%"
  },
  {
    dateTime: "5/2/25 15:38",
    callRecordId: "930E8BC7-58CC-455A-8F23-CF348A776FAE",
    callerId: "323-528-8012",
    promoNumber: "866-407-1963",
    callType: "Inbound",
    publisherName: "Google 8 (vhn@excite.co)",
    campaignName: "Final Expense Bundle",
    type: "Bundled",
    forwarded: "Yes",
    ageSelectedOfferName: "Inspire - Search",
    offerName: "Inspire - Search",
    aiScore: "52%"
  },
  {
    dateTime: "5/2/25 15:33",
    callRecordId: "D7733418-49F5-4668-9CC6-765931D4AA8A",
    callerId: "559-874-7622",
    promoNumber: "888-603-7484",
    callType: "Inbound",
    publisherName: "Google 9 (rag@nowbereads.com)",
    campaignName: "Final Expense Bundle",
    type: "Bundled",
    forwarded: "Yes",
    ageSelectedOfferName: "Inspire - Search",
    offerName: "Inspire - Search",
    aiScore: "93%"
  },
  {
    dateTime: "5/2/25 15:18",
    callRecordId: "CC497960-FEC2-4808-AAA7-4F1D9299628",
    callerId: "457-893-7236",
    promoNumber: "888-694-2487",
    callType: "Inbound",
    publisherName: "RingMax Ltd",
    campaignName: "Final Expense Bundle",
    type: "Bundled",
    forwarded: "Yes",
    ageSelectedOfferName: "Inspire - Search",
    offerName: "Inspire - Search",
    aiScore: "76%"
  },
  {
    dateTime: "5/2/25 15:08",
    callRecordId: "8842858-F8C2-498E-8901-A475C86436A",
    callerId: "904-546-2990",
    promoNumber: "844-774-6220",
    callType: "Inbound",
    publisherName: "Insure Insurance (Rouge 5)",
    campaignName: "Final Expense Bundle",
    type: "Bundled",
    forwarded: "Yes",
    ageSelectedOfferName: "Inspire - Search",
    offerName: "Inspire - Search",
    aiScore: "68%"
  },
  {
    dateTime: "5/2/25 15:07",
    callRecordId: "EF75C4FC-948D-4FE1-848B-1D480D21C0E",
    callerId: "757-846-7707",
    promoNumber: "888-603-7484",
    callType: "Inbound",
    publisherName: "Google 9 (rag@nowbereads.com)",
    campaignName: "Final Expense Bundle",
    type: "Bundled",
    forwarded: "Yes",
    ageSelectedOfferName: "Inspire - Search",
    offerName: "Inspire - Search",
    aiScore: "82%"
  }
];

const RealtimeReport = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = mockRealtimeData.filter(call => 
    call.callerId.includes(searchTerm) ||
    call.publisherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.campaignName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: string) => {
    const numScore = parseInt(score.replace('%', ''));
    if (numScore >= 80) return "text-green-600";
    if (numScore >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 max-w-md"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Date/Time</TableHead>
                <TableHead className="font-semibold">Call Record ID</TableHead>
                <TableHead className="font-semibold">Caller ID</TableHead>
                <TableHead className="font-semibold">Promo Number</TableHead>
                <TableHead className="font-semibold">Call Type</TableHead>
                <TableHead className="font-semibold">Publisher Name</TableHead>
                <TableHead className="font-semibold">Campaign Name</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Forwarded</TableHead>
                <TableHead className="font-semibold">Age Selected Offer Name</TableHead>
                <TableHead className="font-semibold">Offer Name</TableHead>
                <TableHead className="font-semibold">AI Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((call, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{call.dateTime}</TableCell>
                  <TableCell className="font-mono text-sm">{call.callRecordId}</TableCell>
                  <TableCell>{call.callerId}</TableCell>
                  <TableCell>{call.promoNumber}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {call.callType}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={call.publisherName}>
                    {call.publisherName}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={call.campaignName}>
                    {call.campaignName}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{call.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {call.forwarded}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate" title={call.ageSelectedOfferName}>
                    {call.ageSelectedOfferName}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate" title={call.offerName}>
                    {call.offerName}
                  </TableCell>
                  <TableCell className={`font-semibold ${getScoreColor(call.aiScore)}`}>
                    {call.aiScore}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealtimeReport;
