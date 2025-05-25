
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const mockPublishers = [
  { id: "01607", name: "HealthQuotes, LLC", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 71 },
  { id: "01525", name: "Business Insurance (Google Tr", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 100 },
  { id: "01584", name: "Palo Media Group", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 72.86 },
  { id: "01589", name: "ZUCriminals", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 76.04 },
  { id: "00475", name: "Click On Call LLC", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 71 },
  { id: "00660", name: "Outsourced Solutions", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 70 },
  { id: "01525", name: "PerformanceBuy LLC", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 76 },
  { id: "00703", name: "Google & HealthInsureLeads.com", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 100 },
  { id: "01509", name: "Scale Up Media Agency Inc", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 64.62 },
  { id: "04400", name: "Gold Mine Leads", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 64.62 },
  { id: "04491", name: "LeadIn Capture LLC", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 70 },
  { id: "00900", name: "Starpoint Media Group", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 76.93 },
  { id: "04571", name: "Ainsure Media", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 61.54 },
  { id: "04863", name: "Lumineers", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 61.54 },
  { id: "04859", name: "Evad Impact", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 72.30 },
  { id: "00178", name: "Bing", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 70 },
  { id: "04564", name: "Be Best Digital", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 70 },
  { id: "00202", name: "Everquote", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 80 },
  { id: "00285", name: "Insurance Esquire", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 80 },
  { id: "04449", name: "SIThority LLC", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 80 },
  { id: "00547", name: "Facebook", leadsAccess: true, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 50 },
  { id: "00007", name: "BuyerFlow", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 81 },
  { id: "01565", name: "SkyAgency Ltd", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 80 },
  { id: "00470", name: "Bayonettab LLC", leadsAccess: false, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 70 },
  { id: "00628", name: "Google & HealthInsureLeads.com", leadsAccess: true, recordingAccess: false, salesReportAccess: false, callerIdAccess: false, payoutPercent: 100 }
];

const ManagePublishersTab = () => {
  const [publishers, setPublishers] = useState(mockPublishers);

  const handleCheckboxChange = (publisherId: string, field: string, checked: boolean) => {
    setPublishers(prev => prev.map(publisher => 
      publisher.id === publisherId 
        ? { ...publisher, [field]: checked }
        : publisher
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Publishers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Publisher Name</TableHead>
                <TableHead>Publisher ID</TableHead>
                <TableHead>Leads Access</TableHead>
                <TableHead>Recording Access</TableHead>
                <TableHead>Sales Report Access</TableHead>
                <TableHead>Caller ID Access</TableHead>
                <TableHead>Payout %</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publishers.map((publisher) => (
                <TableRow key={publisher.id}>
                  <TableCell className="font-medium text-blue-600 cursor-pointer">
                    {publisher.name}
                  </TableCell>
                  <TableCell>{publisher.id}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={publisher.leadsAccess}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange(publisher.id, 'leadsAccess', checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={publisher.recordingAccess}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange(publisher.id, 'recordingAccess', checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={publisher.salesReportAccess}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange(publisher.id, 'salesReportAccess', checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={publisher.callerIdAccess}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange(publisher.id, 'callerIdAccess', checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>{publisher.payoutPercent}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagePublishersTab;
