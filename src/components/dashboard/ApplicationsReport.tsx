
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, ExternalLink } from "lucide-react";
import DateRangeSelector from "./DateRangeSelector";

// Mock data based on the screenshot
const mockApplicationsData = [
  {
    name: "Cathy Harrington",
    phone: "702-338-1420",
    submitDate: "05/23/2025",
    carrier: "Other",
    product: "Other",
    policyNo: "L0052560",
    state: "NV",
    effectiveDate: "05/23/2025",
    submittedAP: "$300.00/mo $3624.00/yr",
    agent: "Jordan Goo Elijah Kanoho",
    status: "Approved"
  },
  {
    name: "Danny Evans",
    phone: "336-247-9956",
    submitDate: "05/23/2025",
    carrier: "Corebridge",
    product: "Sivil",
    policyNo: "7250085750",
    state: "NC",
    effectiveDate: "06/03/2025",
    submittedAP: "$66.00/mo $792.00/yr",
    agent: "Garrett Garcia",
    status: "Approved"
  },
  {
    name: "James Chua-luan",
    phone: "806-773-9836",
    submitDate: "05/23/2025",
    carrier: "Aetna",
    product: "Accendo",
    policyNo: "ACC7044636",
    state: "TX",
    effectiveDate: "06/01/2025",
    submittedAP: "$173.73/mo $2084.76/yr",
    agent: "Elijah Kanoho",
    status: "Approved"
  },
  {
    name: "Patricia Babella",
    phone: "860-519-9560",
    submitDate: "05/23/2025",
    carrier: "Aflac",
    product: "Fex",
    policyNo: "na",
    state: "CT",
    effectiveDate: "06/01/2025",
    submittedAP: "$95.07/mo $1140.84/yr",
    agent: "Justin Skolrud Omarh Torio",
    status: "Underwriting"
  },
  {
    name: "Unknown Contact",
    phone: "915-346-7227",
    submitDate: "05/23/2025",
    carrier: "Mutual of Omaha",
    product: "Living Promise",
    policyNo: "BU5326400",
    state: "TX",
    effectiveDate: "06/04/2025",
    submittedAP: "$109.20/mo $1310.40/yr",
    agent: "Nicolas Aranguren Varga",
    status: "Approved"
  },
  {
    name: "Unknown Contact",
    phone: "915-346-7227",
    submitDate: "05/23/2025",
    carrier: "Mutual of Omaha",
    product: "Living Promise",
    policyNo: "BU5326407",
    state: "TX",
    effectiveDate: "06/04/2025",
    submittedAP: "$154.42/mo $1853.04/yr",
    agent: "Nicolas Aranguren Varga",
    status: "Approved"
  },
  {
    name: "Walter Simpson",
    phone: "323-674-4298",
    submitDate: "05/23/2025",
    carrier: "Corebridge",
    product: "Guaranteed Issue Whole Life",
    policyNo: "7250085665",
    state: "CA",
    effectiveDate: "06/26/2025",
    submittedAP: "$45.30/mo $543.60/yr",
    agent: "Anthony Ferguson",
    status: "Approved"
  },
  {
    name: "Roshawn James",
    phone: "559-577-5845",
    submitDate: "05/23/2025",
    carrier: "Illinois Mutual",
    product: "Fex",
    policyNo: "pending",
    state: "CA",
    effectiveDate: "05/28/2025",
    submittedAP: "$118.00/mo $1416.00/yr",
    agent: "Shalik Stripathane Samir Palavia",
    status: "Underwriting"
  },
  {
    name: "Roshawn James",
    phone: "559-577-5845",
    submitDate: "05/23/2025",
    carrier: "Americo",
    product: "Eagle Select",
    policyNo: "AM02495487",
    state: "CA",
    effectiveDate: "05/28/2025",
    submittedAP: "$142.95/mo $1715.40/yr",
    agent: "Shalik Stripathane Samir Palavia",
    status: "Approved"
  }
];

const ApplicationsReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCarrier, setSelectedCarrier] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date()
  });

  const filteredData = mockApplicationsData.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.phone.includes(searchTerm);
    const matchesCarrier = selectedCarrier === "all" || app.carrier === selectedCarrier;
    const matchesProduct = selectedProduct === "all" || app.product === selectedProduct;
    const matchesStatus = selectedStatus === "all" || app.status === selectedStatus;
    const matchesAgent = selectedAgent === "all" || app.agent.includes(selectedAgent);
    
    return matchesSearch && matchesCarrier && matchesProduct && matchesStatus && matchesAgent;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Underwriting": return "bg-yellow-100 text-yellow-800";
      case "Pending": return "bg-blue-100 text-blue-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCarrier("all");
    setSelectedProduct("all");
    setSelectedStatus("all");
    setSelectedAgent("all");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            Applications
          </CardTitle>
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
          
          <Select value={selectedCarrier} onValueChange={setSelectedCarrier}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Carrier..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Carriers</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
              <SelectItem value="Corebridge">Corebridge</SelectItem>
              <SelectItem value="Aetna">Aetna</SelectItem>
              <SelectItem value="Aflac">Aflac</SelectItem>
              <SelectItem value="Mutual of Omaha">Mutual of Omaha</SelectItem>
              <SelectItem value="Illinois Mutual">Illinois Mutual</SelectItem>
              <SelectItem value="Americo">Americo</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Products..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
              <SelectItem value="Sivil">Sivil</SelectItem>
              <SelectItem value="Accendo">Accendo</SelectItem>
              <SelectItem value="Fex">Fex</SelectItem>
              <SelectItem value="Living Promise">Living Promise</SelectItem>
              <SelectItem value="Guaranteed Issue Whole Life">Guaranteed Issue Whole Life</SelectItem>
              <SelectItem value="Eagle Select">Eagle Select</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Status..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Underwriting">Underwriting</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Agent..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agents</SelectItem>
              <SelectItem value="Jordan Goo">Jordan Goo</SelectItem>
              <SelectItem value="Garrett Garcia">Garrett Garcia</SelectItem>
              <SelectItem value="Elijah Kanoho">Elijah Kanoho</SelectItem>
              <SelectItem value="Justin Skolrud">Justin Skolrud</SelectItem>
              <SelectItem value="Nicolas Aranguren">Nicolas Aranguren</SelectItem>
              <SelectItem value="Anthony Ferguson">Anthony Ferguson</SelectItem>
              <SelectItem value="Shalik Stripathane">Shalik Stripathane</SelectItem>
            </SelectContent>
          </Select>

          <DateRangeSelector
            value={dateRange}
            onChange={setDateRange}
          />

          <DateRangeSelector
            value={dateRange}
            onChange={setDateRange}
          />

          <Button variant="outline" size="sm" onClick={resetFilters}>
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
                <TableHead>Submit Date</TableHead>
                <TableHead>Carrier</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Policy No</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Submitted AP</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((app, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-blue-600">{app.name}</div>
                      <div className="text-sm text-gray-500">{app.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{app.submitDate}</TableCell>
                  <TableCell>{app.carrier}</TableCell>
                  <TableCell>{app.product}</TableCell>
                  <TableCell>
                    {app.policyNo !== "na" && app.policyNo !== "pending" ? (
                      <a href="#" className="text-blue-600 hover:underline">
                        {app.policyNo}
                      </a>
                    ) : (
                      <span className="text-gray-500">{app.policyNo}</span>
                    )}
                  </TableCell>
                  <TableCell>{app.state}</TableCell>
                  <TableCell>{app.effectiveDate}</TableCell>
                  <TableCell className="text-sm">
                    <div>{app.submittedAP.split(' ')[0]}</div>
                    <div className="text-gray-500">{app.submittedAP.split(' ')[1]}</div>
                  </TableCell>
                  <TableCell className="text-sm">{app.agent}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(app.status)} variant="secondary">
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4 text-blue-500" />
                    </Button>
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

export default ApplicationsReport;
