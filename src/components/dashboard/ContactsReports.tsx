
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, Filter, Edit, FileText, Building2, ChevronDown, ChevronRight } from "lucide-react";
import DateRangeSelector from "./DateRangeSelector";
import AddContactModal from "./AddContactModal";

// Enhanced mock data with agency information
const initialContactsData = [
  { 
    name: "Carl Stewart", 
    phone: "(707) 416-7929", 
    email: "carl.stewart@email.com",
    dateCreated: "05/23/25, 05:00 PM", 
    stage: "Pending", 
    disposition: "Pending",
    agency: "Elite Insurance Group",
    agencyId: "agency-001",
    agent: "Sarah Johnson",
    leadSource: "Google Ads",
    value: "$2,500",
    lastContact: "05/23/25, 05:00 PM",
    notes: "Interested in final expense insurance for spouse"
  },
  { 
    name: "Unknown Contact", 
    phone: "(860) 776-6398", 
    email: "contact1@email.com",
    dateCreated: "05/23/25, 04:56 PM", 
    stage: "Refund", 
    disposition: "Benefits",
    agency: "Premier Call Solutions",
    agencyId: "agency-002",
    agent: "Mike Wilson",
    leadSource: "Facebook",
    value: "$1,800",
    lastContact: "05/23/25, 04:56 PM",
    notes: "Customer requested refund due to benefits confusion"
  },
  { 
    name: "Unknown Contact", 
    phone: "(580) 471-9294", 
    email: "contact2@email.com",
    dateCreated: "05/23/25, 04:49 PM", 
    stage: "Refund", 
    disposition: "No one on phone",
    agency: "Elite Insurance Group",
    agencyId: "agency-001",
    agent: "Jennifer Davis",
    leadSource: "Direct Mail",
    value: "$0",
    lastContact: "05/23/25, 04:49 PM",
    notes: "Multiple call attempts, no response"
  },
  { 
    name: "Robert Martinez", 
    phone: "(510) 575-6657", 
    email: "robert.martinez@email.com",
    dateCreated: "05/23/25, 04:41 PM", 
    stage: "Application Submitted", 
    disposition: "Application Submitted",
    agency: "Elite Insurance Group",
    agencyId: "agency-001",
    agent: "Sarah Johnson",
    leadSource: "Referral",
    value: "$3,200",
    lastContact: "05/23/25, 04:41 PM",
    notes: "Application submitted for $50k term life policy"
  },
  { 
    name: "Linda Thompson", 
    phone: "(970) 702-3189", 
    email: "linda.thompson@email.com",
    dateCreated: "05/23/25, 04:18 PM", 
    stage: "Refund", 
    disposition: "Already Insured",
    agency: "Premier Call Solutions",
    agencyId: "agency-002",
    agent: "Mike Wilson",
    leadSource: "Google Ads",
    value: "$0",
    lastContact: "05/23/25, 04:18 PM",
    notes: "Customer already has adequate coverage"
  },
  { 
    name: "William Garcia", 
    phone: "(216) 289-6326", 
    email: "william.garcia@email.com",
    dateCreated: "05/23/25, 04:08 PM", 
    stage: "Pending", 
    disposition: "Pending",
    agency: "Elite Insurance Group",
    agencyId: "agency-001",
    agent: "Jennifer Davis",
    leadSource: "Website",
    value: "$2,100",
    lastContact: "05/23/25, 04:08 PM",
    notes: "Follow-up scheduled for next week"
  },
  { 
    name: "Maria Rodriguez", 
    phone: "(973) 389-6142", 
    email: "maria.rodriguez@email.com",
    dateCreated: "05/23/25, 04:07 PM", 
    stage: "Refund", 
    disposition: "No one on phone",
    agency: "Premier Call Solutions",
    agencyId: "agency-002",
    agent: "Tom Anderson",
    leadSource: "Social Media",
    value: "$0",
    lastContact: "05/23/25, 04:07 PM",
    notes: "Unable to reach after 3 attempts"
  },
  { 
    name: "Robert Bustos", 
    phone: "(760) 590-7711", 
    email: "robert.bustos@email.com",
    dateCreated: "05/23/25, 04:07 PM", 
    stage: "Refund", 
    disposition: "Benefits",
    agency: "Elite Insurance Group",
    agencyId: "agency-001",
    agent: "Sarah Johnson",
    leadSource: "Phone Call",
    value: "$1,500",
    lastContact: "05/23/25, 04:07 PM",
    notes: "Refund processed due to benefit misunderstanding"
  },
  { 
    name: "Cynthia Vethers", 
    phone: "(843) 879-1453", 
    email: "cynthia.vethers@email.com",
    dateCreated: "05/23/25, 04:02 PM", 
    stage: "Pending", 
    disposition: "Pending",
    agency: "Premier Call Solutions",
    agencyId: "agency-002",
    agent: "Mike Wilson",
    leadSource: "Email Campaign",
    value: "$2,800",
    lastContact: "05/23/25, 04:02 PM",
    notes: "Interested in whole life policy"
  },
  { 
    name: "David Chen", 
    phone: "(956) 432-2475", 
    email: "david.chen@email.com",
    dateCreated: "05/23/25, 04:01 PM", 
    stage: "Qualified", 
    disposition: "Interested",
    agency: "Elite Insurance Group",
    agencyId: "agency-001",
    agent: "Jennifer Davis",
    leadSource: "Partner Referral",
    value: "$4,500",
    lastContact: "05/23/25, 04:01 PM",
    notes: "High-value prospect, needs family coverage"
  },
];

const ContactsReports = () => {
  const [contactsData, setContactsData] = useState(initialContactsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("all");
  const [selectedDisposition, setSelectedDisposition] = useState("all");
  const [selectedAgency, setSelectedAgency] = useState("all");
  const [expandedContact, setExpandedContact] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date()
  });

  const handleContactAdded = (newContact: any) => {
    setContactsData(prev => [newContact, ...prev]);
  };

  const filteredData = contactsData.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.includes(searchTerm) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === "all" || contact.stage === selectedStage;
    const matchesDisposition = selectedDisposition === "all" || contact.disposition === selectedDisposition;
    const matchesAgency = selectedAgency === "all" || contact.agency === selectedAgency;
    
    return matchesSearch && matchesStage && matchesDisposition && matchesAgency;
  });

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Refund": return "bg-red-100 text-red-800";
      case "Application Submitted": return "bg-green-100 text-green-800";
      case "No Sale": return "bg-gray-100 text-gray-800";
      case "Qualified": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const toggleExpanded = (contactId: string) => {
    setExpandedContact(expandedContact === contactId ? null : contactId);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedStage("all");
    setSelectedDisposition("all");
    setSelectedAgency("all");
  };

  // Get unique agencies for filter
  const uniqueAgencies = [...new Set(contactsData.map(contact => contact.agency))];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Global Contacts ({filteredData.length} of {contactsData.length})</CardTitle>
          <div className="flex gap-2">
            <AddContactModal onContactAdded={handleContactAdded} />
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="flex gap-4 items-center flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DateRangeSelector
            value={dateRange}
            onChange={setDateRange}
          />
          <Select value={selectedAgency} onValueChange={setSelectedAgency}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Agency..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agencies</SelectItem>
              {uniqueAgencies.map((agency) => (
                <SelectItem key={agency} value={agency}>{agency}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStage} onValueChange={setSelectedStage}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Stage..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Refund">Refund</SelectItem>
              <SelectItem value="Application Submitted">Application Submitted</SelectItem>
              <SelectItem value="No Sale">No Sale</SelectItem>
              <SelectItem value="Qualified">Qualified</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDisposition} onValueChange={setSelectedDisposition}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Disposition..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dispositions</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Benefits">Benefits</SelectItem>
              <SelectItem value="No one on phone">No one on phone</SelectItem>
              <SelectItem value="Application Submitted">Application Submitted</SelectItem>
              <SelectItem value="Already Insured">Already Insured</SelectItem>
              <SelectItem value="Interested">Interested</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Table Headers */}
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
            <div className="col-span-2">Contact</div>
            <div>Phone</div>
            <div>Agency</div>
            <div>Agent</div>
            <div>Stage</div>
            <div>Disposition</div>
            <div>Value</div>
            <div>Lead Source</div>
            <div>Last Contact</div>
            <div>Actions</div>
          </div>

          {/* Table Rows */}
          {filteredData.map((contact, index) => (
            <div key={`${contact.phone}-${index}`} className="space-y-2">
              <div 
                className="grid grid-cols-12 gap-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
                onClick={(e) => {
                  if (!(e.target as HTMLElement).closest('.action-buttons')) {
                    toggleExpanded(`${contact.phone}-${index}`);
                  }
                }}
              >
                <div className="col-span-2 flex items-center gap-2">
                  {expandedContact === `${contact.phone}-${index}` ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <div>
                    <div className="font-medium text-blue-600">{contact.name}</div>
                    <div className="text-xs text-gray-500">{contact.email}</div>
                  </div>
                </div>
                <div className="text-sm">{contact.phone}</div>
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-blue-600 font-medium">{contact.agency}</span>
                </div>
                <div className="text-sm">{contact.agent}</div>
                <div>
                  <Badge className={getStageColor(contact.stage)} variant="secondary">
                    {contact.stage}
                  </Badge>
                </div>
                <div className="text-sm">{contact.disposition}</div>
                <div className="font-medium text-green-600">{contact.value}</div>
                <div className="text-sm">{contact.leadSource}</div>
                <div className="text-xs text-gray-500">{contact.lastContact}</div>
                <div className="action-buttons flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <FileText className="w-4 h-4 text-orange-500" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="w-4 h-4 text-blue-500" />
                  </Button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedContact === `${contact.phone}-${index}` && (
                <div className="ml-6 p-4 bg-gray-50 rounded-lg space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Contact Details */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-medium">Name:</span> {contact.name}</div>
                        <div><span className="font-medium">Phone:</span> {contact.phone}</div>
                        <div><span className="font-medium">Email:</span> {contact.email}</div>
                        <div><span className="font-medium">Created:</span> {contact.dateCreated}</div>
                        <div><span className="font-medium">Last Contact:</span> {contact.lastContact}</div>
                      </div>
                    </div>

                    {/* Agency & Agent Details */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">Assignment</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Agency:</span> 
                          <Building2 className="w-4 h-4 text-gray-500" />
                          <span className="text-blue-600 font-medium">{contact.agency}</span>
                        </div>
                        <div><span className="font-medium">Agent:</span> {contact.agent}</div>
                        <div><span className="font-medium">Lead Source:</span> {contact.leadSource}</div>
                        <div><span className="font-medium">Potential Value:</span> <span className="text-green-600 font-medium">{contact.value}</span></div>
                      </div>
                    </div>

                    {/* Status & Notes */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">Status & Notes</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Stage:</span> 
                          <Badge className={`ml-2 ${getStageColor(contact.stage)}`} variant="secondary">
                            {contact.stage}
                          </Badge>
                        </div>
                        <div><span className="font-medium">Disposition:</span> {contact.disposition}</div>
                        <div className="mt-3">
                          <span className="font-medium">Notes:</span>
                          <div className="bg-white p-2 rounded border text-sm mt-1">
                            {contact.notes}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactsReports;
