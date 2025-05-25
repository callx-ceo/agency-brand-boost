
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, Filter, Edit, FileText } from "lucide-react";

// Mock data based on the screenshot
const mockContactsData = [
  { name: "Carl Stewart", phone: "(707) 416-7929", dateCreated: "05/23/25, 05:00 PM", stage: "Pending", disposition: "Pending" },
  { name: "Unknown Contact", phone: "(860) 776-6398", dateCreated: "05/23/25, 04:56 PM", stage: "Refund", disposition: "Benefits" },
  { name: "Unknown Contact", phone: "(580) 471-9294", dateCreated: "05/23/25, 04:49 PM", stage: "Refund", disposition: "No one on phone" },
  { name: "Unknown Contact", phone: "(510) 575-6657", dateCreated: "05/23/25, 04:41 PM", stage: "Application Submitted", disposition: "Application Submitted" },
  { name: "Unknown Contact", phone: "(970) 702-3189", dateCreated: "05/23/25, 04:18 PM", stage: "Refund", disposition: "Already Insured" },
  { name: "Unknown Contact", phone: "(216) 289-6326", dateCreated: "05/23/25, 04:08 PM", stage: "Pending", disposition: "Pending" },
  { name: "Unknown Contact", phone: "(973) 389-6142", dateCreated: "05/23/25, 04:07 PM", stage: "Refund", disposition: "No one on phone" },
  { name: "Robert Bustos", phone: "(760) 590-7711", dateCreated: "05/23/25, 04:07 PM", stage: "Refund", disposition: "Benefits" },
  { name: "Cynthia Vethers", phone: "(843) 879-1453", dateCreated: "05/23/25, 04:02 PM", stage: "Pending", disposition: "Pending" },
  { name: "Unknown Contact", phone: "(956) 432-2475", dateCreated: "05/23/25, 04:01 PM", stage: "N/A", disposition: "N/A" },
  { name: "Unknown Contact", phone: "(760) 898-0367", dateCreated: "05/23/25, 03:57 PM", stage: "Refund", disposition: "Call Dropped" },
  { name: "Abraham Ortego-Sanchez", phone: "(415) 524-5498", dateCreated: "05/23/25, 03:52 PM", stage: "No Sale", disposition: "Not Qualified" },
  { name: "Unknown Contact", phone: "(772) 678-6362", dateCreated: "05/23/25, 03:47 PM", stage: "Refund", disposition: "Hang Up" },
  { name: "Unknown Contact", phone: "(609) 517-6152", dateCreated: "05/23/25, 03:28 PM", stage: "Refund", disposition: "Customer Service" },
  { name: "Linda Henderson", phone: "(704) 303-4153", dateCreated: "05/23/25, 03:23 PM", stage: "No Sale", disposition: "Rate Too High" },
  { name: "Unknown Contact", phone: "(662) 836-6551", dateCreated: "05/23/25, 03:15 PM", stage: "No Sale", disposition: "Customer Service" },
  { name: "Unknown Contact", phone: "(831) 664-6461", dateCreated: "05/23/25, 03:04 PM", stage: "Refund", disposition: "Language Barrier" },
  { name: "Unknown Contact", phone: "(404) 399-0355", dateCreated: "05/23/25, 02:58 PM", stage: "Pending", disposition: "Pending" },
  { name: "Gary Anders", phone: "(432) 266-0721", dateCreated: "05/23/25, 02:44 PM", stage: "Pending", disposition: "Pending" },
  { name: "James Chua-luan", phone: "(806) 773-9836", dateCreated: "05/23/25, 02:43 PM", stage: "Application Submitted", disposition: "Application Submitted" },
];

const ContactsReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [selectedDisposition, setSelectedDisposition] = useState("");

  const filteredData = mockContactsData.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.includes(searchTerm);
    const matchesStage = !selectedStage || contact.stage === selectedStage;
    const matchesDisposition = !selectedDisposition || contact.disposition === selectedDisposition;
    
    return matchesSearch && matchesStage && matchesDisposition;
  });

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Refund": return "bg-red-100 text-red-800";
      case "Application Submitted": return "bg-green-100 text-green-800";
      case "No Sale": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Contacts</CardTitle>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="flex gap-4 items-center flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Name or Phone Number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Input type="date" placeholder="Created Date..." className="w-auto" />
          <Select value={selectedStage} onValueChange={setSelectedStage}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Stage..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Stages</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Refund">Refund</SelectItem>
              <SelectItem value="Application Submitted">Application Submitted</SelectItem>
              <SelectItem value="No Sale">No Sale</SelectItem>
              <SelectItem value="N/A">N/A</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDisposition} onValueChange={setSelectedDisposition}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Disposition..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Dispositions</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Benefits">Benefits</SelectItem>
              <SelectItem value="No one on phone">No one on phone</SelectItem>
              <SelectItem value="Application Submitted">Application Submitted</SelectItem>
              <SelectItem value="Already Insured">Already Insured</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Disposition</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((contact, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-blue-600">{contact.name}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.dateCreated}</TableCell>
                  <TableCell>
                    <Badge className={getStageColor(contact.stage)} variant="secondary">
                      {contact.stage}
                    </Badge>
                  </TableCell>
                  <TableCell>{contact.disposition}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <FileText className="w-4 h-4 text-orange-500" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4 text-blue-500" />
                      </Button>
                    </div>
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

export default ContactsReports;
