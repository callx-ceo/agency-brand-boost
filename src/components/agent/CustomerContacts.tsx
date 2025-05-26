
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import ContactDetailsModal from "./ContactDetailsModal";

interface Contact {
  id: string;
  name: string;
  phone: string;
  dateCreated: string;
  stage: string;
  accountStatus: string;
}

interface ContactDetails {
  id: string;
  name: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  zipCode: string;
  dob: string;
  weight: string;
  height: string;
  faceValue: string;
  tobaccoUser: string;
  anyDiseases: string;
  bankAccount: string;
  calls: Array<{
    id: string;
    date: string;
    duration: string;
    type: "incoming" | "outgoing";
    status: "answered" | "missed" | "voicemail";
    notes?: string;
  }>;
}

const CustomerContacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("all");
  const [selectedDisposition, setSelectedDisposition] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<ContactDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock data matching the design
  const contacts: Contact[] = [
    {
      id: "1",
      name: "Janet Cooper",
      phone: "(229) 555-0199",
      dateCreated: "31/05/20, 14:20",
      stage: "31/05/20, 14:20",
      accountStatus: "Customer Service"
    },
    {
      id: "2", 
      name: "Esther Howard",
      phone: "(229) 555-0199",
      dateCreated: "31/05/20, 14:20",
      stage: "31/05/20, 14:20",
      accountStatus: "No one online"
    },
    {
      id: "3",
      name: "Jenny Wilson",
      phone: "(229) 555-0199", 
      dateCreated: "31/05/20, 14:20",
      stage: "31/05/20, 14:20",
      accountStatus: "Customer Service"
    },
    {
      id: "4",
      name: "Robert Fox",
      phone: "(229) 555-0199",
      dateCreated: "31/05/20, 14:20", 
      stage: "31/05/20, 14:20",
      accountStatus: "No one online"
    },
    {
      id: "5",
      name: "Jane Cooper",
      phone: "(229) 555-0199",
      dateCreated: "31/05/20, 14:20",
      stage: "31/05/20, 14:20", 
      accountStatus: "Customer Service"
    },
    {
      id: "6",
      name: "Robert Fox",
      phone: "(229) 555-0199",
      dateCreated: "31/05/20, 14:20",
      stage: "31/05/20, 14:20",
      accountStatus: "No one online"
    },
    {
      id: "7",
      name: "Jane Cooper", 
      phone: "(229) 555-0199",
      dateCreated: "31/05/20, 14:20",
      stage: "31/05/20, 14:20",
      accountStatus: "Customer Service"
    },
    {
      id: "8",
      name: "Robert Fox",
      phone: "(229) 555-0199",
      dateCreated: "31/05/20, 14:20",
      stage: "31/05/20, 14:20", 
      accountStatus: "No one online"
    },
    {
      id: "9",
      name: "Jane Cooper",
      phone: "(229) 555-0199",
      dateCreated: "31/05/20, 14:20",
      stage: "31/05/20, 14:20",
      accountStatus: "Customer Service"
    },
    {
      id: "10",
      name: "Robert Fox", 
      phone: "(229) 555-0199",
      dateCreated: "31/05/20, 14:20",
      stage: "31/05/20, 14:20",
      accountStatus: "No one online"
    }
  ];

  // Mock detailed contact data
  const getContactDetails = (contactId: string): ContactDetails => {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return null as any;

    const [firstName, lastName] = contact.name.split(' ');
    
    return {
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      firstName: firstName || "Benjamin",
      lastName: lastName || "Jayan",
      gender: "Male",
      zipCode: "9581",
      dob: "20/10/1996",
      weight: "78 Kg",
      height: `5'7"`,
      faceValue: "$5000",
      tobaccoUser: "Yes",
      anyDiseases: "No",
      bankAccount: "Yes",
      calls: [
        {
          id: "call-1",
          date: "29/10/2024, 11:37 AM",
          duration: "00:05 Min",
          type: "incoming",
          status: "answered",
          notes: "Customer interested in life insurance policy"
        },
        {
          id: "call-2", 
          date: "28/10/2024, 02:15 PM",
          duration: "26:50 Min",
          type: "outgoing",
          status: "answered",
          notes: "Completed application form discussion"
        },
        {
          id: "call-3",
          date: "27/10/2024, 09:30 AM", 
          duration: "00:00 Min",
          type: "incoming",
          status: "missed"
        },
        {
          id: "call-4",
          date: "26/10/2024, 04:22 PM",
          duration: "15:12 Min", 
          type: "outgoing",
          status: "answered",
          notes: "Follow-up call regarding premium options"
        }
      ]
    };
  };

  const handleContactClick = (contactId: string) => {
    const contactDetails = getContactDetails(contactId);
    setSelectedContact(contactDetails);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    return status === "Customer Service" 
      ? "text-blue-600" 
      : "text-red-600";
  };

  const getPhoneIcon = () => (
    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
      <div className="w-2 h-2 bg-white rounded-full"></div>
    </div>
  );

  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Customer Contacts</h2>
          <div className="text-sm text-gray-500">
            Start Date: 01/01/2023 - 01/02/2023
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="User name or phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedStage} onValueChange={setSelectedStage}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDisposition} onValueChange={setSelectedDisposition}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Disposition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dispositions</SelectItem>
              <SelectItem value="interested">Interested</SelectItem>
              <SelectItem value="not-interested">Not Interested</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-black text-white hover:bg-gray-800">
            Reset
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="space-y-1">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 py-3 text-sm font-medium text-gray-600 border-b">
            <div className="flex items-center gap-2">
              <span>Name</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Phone No</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Date Created</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Stage</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Account Status</span>
            </div>
          </div>

          {/* Table Rows */}
          {contacts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((contact) => (
            <div key={contact.id} className="grid grid-cols-5 gap-4 py-3 hover:bg-gray-50 border-b border-gray-100">
              <div 
                className="text-blue-600 font-medium cursor-pointer hover:underline"
                onClick={() => handleContactClick(contact.id)}
              >
                {contact.name}
              </div>
              <div className="flex items-center gap-2">
                {getPhoneIcon()}
                <span className="text-sm">{contact.phone}</span>
              </div>
              <div className="text-sm text-gray-600">
                {contact.dateCreated}
              </div>
              <div className="text-sm text-gray-600">
                {contact.stage}
              </div>
              <div className={`text-sm font-medium ${getStatusColor(contact.accountStatus)}`}>
                {contact.accountStatus}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Rows per page: 5
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              1-6 of 15
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Details Modal */}
      <ContactDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        contact={selectedContact}
      />
    </div>
  );
};

export default CustomerContacts;
