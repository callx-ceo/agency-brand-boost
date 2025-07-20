import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Eye, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Building2,
  Users
} from "lucide-react";
import CallSummary from "../../shared/CallSummary";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  agency: string;
  status: string;
  totalCalls: number;
  lastContact: string;
  lifetimeValue: string;
  stage: string;
}

interface CustomerDetails extends Customer {
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
  address: string;
  city: string;
  state: string;
  occupation: string;
  income: string;
}

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  // Mock customer data
  const customers: Customer[] = [
    {
      id: "1",
      name: "Janet Cooper",
      phone: "(229) 555-0199",
      email: "janet.cooper@email.com",
      agency: "Premier Insurance Group",
      status: "Active",
      totalCalls: 5,
      lastContact: "2024-01-15",
      lifetimeValue: "$15,000",
      stage: "Policy Holder"
    },
    {
      id: "2",
      name: "Robert Wilson",
      phone: "(555) 123-4567",
      email: "robert.wilson@email.com",
      agency: "Guardian Financial",
      status: "Prospect",
      totalCalls: 2,
      lastContact: "2024-01-14",
      lifetimeValue: "$0",
      stage: "Qualified Lead"
    },
    {
      id: "3",
      name: "Maria Rodriguez",
      phone: "(555) 987-6543",
      email: "maria.rodriguez@email.com",
      agency: "Secure Life Partners",
      status: "Active",
      totalCalls: 8,
      lastContact: "2024-01-13",
      lifetimeValue: "$25,000",
      stage: "Policy Holder"
    },
    {
      id: "4",
      name: "David Chen",
      phone: "(555) 456-7890",
      email: "david.chen@email.com",
      agency: "Premier Insurance Group",
      status: "Inactive",
      totalCalls: 3,
      lastContact: "2023-12-20",
      lifetimeValue: "$8,000",
      stage: "Lapsed"
    }
  ];

  const getCustomerDetails = (customerId: string): CustomerDetails => {
    const customer = customers.find(c => c.id === customerId);
    if (!customer) return null as any;

    const [firstName, lastName] = customer.name.split(' ');
    
    return {
      ...customer,
      firstName,
      lastName,
      gender: "Female",
      zipCode: "31201",
      dob: "1965-03-15",
      weight: "140 lbs",
      height: "5'6\"",
      faceValue: "$50,000",
      tobaccoUser: "No",
      anyDiseases: "None",
      bankAccount: "****1234",
      address: "123 Main Street",
      city: "Macon",
      state: "GA",
      occupation: "Teacher",
      income: "$45,000"
    };
  };

  const handleCustomerClick = (customerId: string) => {
    const customerDetails = getCustomerDetails(customerId);
    setSelectedCustomer(customerDetails);
    setIsModalOpen(true);
    setActiveTab("details");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Prospect": return "bg-blue-100 text-blue-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Policy Holder": return "bg-green-100 text-green-800";
      case "Qualified Lead": return "bg-yellow-100 text-yellow-800";
      case "Lapsed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAgency = selectedAgency === "all" || customer.agency === selectedAgency;
    const matchesStatus = selectedStatus === "all" || customer.status === selectedStatus;
    
    return matchesSearch && matchesAgency && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customer Management</h1>
          <p className="text-muted-foreground">Manage customer records and call summaries</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search customers by name, phone, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedAgency} onValueChange={setSelectedAgency}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filter by Agency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agencies</SelectItem>
                <SelectItem value="Premier Insurance Group">Premier Insurance Group</SelectItem>
                <SelectItem value="Guardian Financial">Guardian Financial</SelectItem>
                <SelectItem value="Secure Life Partners">Secure Life Partners</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Prospect">Prospect</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Customers ({filteredCustomers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {customer.agency}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{customer.lifetimeValue}</div>
                    <div className="text-xs text-muted-foreground">{customer.totalCalls} calls</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge className={getStatusColor(customer.status)} variant="secondary">
                      {customer.status}
                    </Badge>
                    <Badge className={getStageColor(customer.stage)} variant="secondary">
                      {customer.stage}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCustomerClick(customer.id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Customer Details - {selectedCustomer?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedCustomer && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Customer Details</TabsTrigger>
                <TabsTrigger value="summary">Call Summary</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Full Name</span>
                      <div>{selectedCustomer.name}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Phone</span>
                      <div>{selectedCustomer.phone}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Email</span>
                      <div>{selectedCustomer.email}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Gender</span>
                      <div>{selectedCustomer.gender}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Date of Birth</span>
                      <div>{selectedCustomer.dob}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Address</span>
                      <div>{selectedCustomer.address}, {selectedCustomer.city}, {selectedCustomer.state} {selectedCustomer.zipCode}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Occupation</span>
                      <div>{selectedCustomer.occupation}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Annual Income</span>
                      <div>{selectedCustomer.income}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Agency</span>
                      <div>{selectedCustomer.agency}</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Policy Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Policy Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Status</span>
                      <Badge className={getStatusColor(selectedCustomer.status)} variant="secondary">
                        {selectedCustomer.status}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Stage</span>
                      <Badge className={getStageColor(selectedCustomer.stage)} variant="secondary">
                        {selectedCustomer.stage}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Face Value</span>
                      <div>{selectedCustomer.faceValue}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Lifetime Value</span>
                      <div>{selectedCustomer.lifetimeValue}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Total Calls</span>
                      <div>{selectedCustomer.totalCalls}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Last Contact</span>
                      <div>{selectedCustomer.lastContact}</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="summary" className="space-y-6">
                <CallSummary 
                  contactId={selectedCustomer.id}
                  onSave={(data) => {
                    console.log("Saving call summary for customer:", selectedCustomer.id, data);
                    // Here you would typically save to your backend
                  }}
                />
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerManagement;