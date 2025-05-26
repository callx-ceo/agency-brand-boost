
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  phone: string;
  dateCreated: string;
  stage: string;
  accountStatus: string;
}

const CustomerContacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("all");
  const [selectedDisposition, setSelectedDisposition] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  
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

        {/* Search and Filters */}
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
              <div className="text-blue-600 font-medium">
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
    </div>
  );
};

export default CustomerContacts;
