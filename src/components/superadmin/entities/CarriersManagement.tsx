
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Search, Plus, Edit, Eye, Phone, Mail, MapPin, Package } from "lucide-react";
import { toast } from "sonner";

interface CarriersManagementProps {
  onBackToDashboard: () => void;
}

const mockCarriers = [
  {
    id: 1,
    name: "MetLife",
    type: "Life Insurance",
    status: "active",
    contractDate: "2023-01-15",
    productsCount: 12,
    contactPerson: "Sarah Johnson",
    phone: "(555) 123-4567",
    email: "sarah.johnson@metlife.com",
    address: "New York, NY",
    rating: "A+",
    description: "Leading life insurance provider with comprehensive coverage options"
  },
  {
    id: 2,
    name: "Colonial Penn",
    type: "Final Expense",
    status: "active",
    contractDate: "2023-03-20",
    productsCount: 8,
    contactPerson: "Michael Chen",
    phone: "(555) 234-5678",
    email: "m.chen@colonialpenn.com",
    address: "Philadelphia, PA",
    rating: "A",
    description: "Specialized in final expense and guaranteed issue life insurance"
  },
  {
    id: 3,
    name: "Mutual of Omaha",
    type: "Medicare Supplement",
    status: "pending",
    contractDate: "2025-05-01",
    productsCount: 15,
    contactPerson: "Lisa Rodriguez",
    phone: "(555) 345-6789",
    email: "lisa.rodriguez@mutualofomaha.com",
    address: "Omaha, NE",
    rating: "A+",
    description: "Comprehensive Medicare supplement and health insurance solutions"
  },
  {
    id: 4,
    name: "Guardian Life",
    type: "Whole Life",
    status: "active",
    contractDate: "2022-11-10",
    productsCount: 20,
    contactPerson: "David Williams",
    phone: "(555) 456-7890",
    email: "david.williams@guardianlife.com",
    address: "New York, NY",
    rating: "A++",
    description: "Premium whole life and disability insurance products"
  }
];

const CarriersManagement = ({ onBackToDashboard }: CarriersManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCarrier, setSelectedCarrier] = useState<any>(null);

  const handleAddCarrier = () => {
    toast.success("Add carrier functionality would open here");
  };

  const handleEditCarrier = (carrierId: number) => {
    toast.info(`Edit carrier ${carrierId}`);
  };

  const handleViewCarrier = (carrier: any) => {
    setSelectedCarrier(carrier);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case "pending": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "inactive": return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRatingBadge = (rating: string) => {
    const colorMap: { [key: string]: string } = {
      "A++": "bg-green-100 text-green-800",
      "A+": "bg-green-100 text-green-700",
      "A": "bg-blue-100 text-blue-800",
      "B+": "bg-yellow-100 text-yellow-800",
      "B": "bg-orange-100 text-orange-800"
    };
    return <Badge variant="outline" className={colorMap[rating] || "bg-gray-100 text-gray-800"}>{rating}</Badge>;
  };

  const filteredCarriers = mockCarriers.filter(carrier =>
    carrier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carrier.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carrier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Carriers Management</h1>
          <p className="text-gray-600">Manage insurance carriers and partnership relationships</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddCarrier} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Carrier
          </Button>
          <Button variant="outline" onClick={onBackToDashboard}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Carriers ({filteredCarriers.length})
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search carriers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Carrier Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Contract Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCarriers.map((carrier) => (
                <TableRow key={carrier.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-blue-500" />
                        {carrier.name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {carrier.address}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{carrier.type}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{carrier.contactPerson}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {carrier.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {carrier.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4 text-gray-400" />
                      {carrier.productsCount} products
                    </div>
                  </TableCell>
                  <TableCell>{getRatingBadge(carrier.rating)}</TableCell>
                  <TableCell>{carrier.contractDate}</TableCell>
                  <TableCell>{getStatusBadge(carrier.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        title="View Details"
                        onClick={() => handleViewCarrier(carrier)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        title="Edit Carrier"
                        onClick={() => handleEditCarrier(carrier.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredCarriers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No carriers found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Carrier Details Modal */}
      {selectedCarrier && (
        <Card className="fixed inset-0 z-50 bg-white shadow-lg overflow-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Carrier Details - {selectedCarrier.name}</CardTitle>
              <Button variant="outline" onClick={() => setSelectedCarrier(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Carrier Information</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Name:</span> {selectedCarrier.name}</div>
                  <div><span className="font-medium">Type:</span> {selectedCarrier.type}</div>
                  <div><span className="font-medium">Rating:</span> {selectedCarrier.rating}</div>
                  <div><span className="font-medium">Products:</span> {selectedCarrier.productsCount}</div>
                  <div><span className="font-medium">Contract Date:</span> {selectedCarrier.contractDate}</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Contact Person:</span> {selectedCarrier.contactPerson}</div>
                  <div><span className="font-medium">Email:</span> {selectedCarrier.email}</div>
                  <div><span className="font-medium">Phone:</span> {selectedCarrier.phone}</div>
                  <div><span className="font-medium">Address:</span> {selectedCarrier.address}</div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm bg-gray-50 p-3 rounded">{selectedCarrier.description}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CarriersManagement;
