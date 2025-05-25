import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Eye, Edit, Pause, Play } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Offer {
  id: string;
  name: string;
  type: string;
  category: string;
  callsToday: number;
  callsMTD: number;
  revenueToday: number;
  revenueMTD: number;
  conversionRateMTD: number;
  avgRevenuePerCall: number;
  status: "active" | "paused" | "pending";
}

interface OfferManagementProps {
  onBackToDashboard: () => void;
  onViewOfferStatistics: (offerId: string) => void;
}

const mockOffers: Offer[] = [
  {
    id: "1",
    name: "Insurex - Search",
    type: "Bundle",
    category: "Final Expense Bundle",
    callsToday: 0,
    callsMTD: 1964,
    revenueToday: 0,
    revenueMTD: 100500,
    conversionRateMTD: 85.28,
    avgRevenuePerCall: 51.17,
    status: "active"
  },
  {
    id: "2",
    name: "HPI - Medicare - 2",
    type: "Bundle",
    category: "Medicare Bundle",
    callsToday: 0,
    callsMTD: 2668,
    revenueToday: 0,
    revenueMTD: 82280,
    conversionRateMTD: 56.07,
    avgRevenuePerCall: 30.84,
    status: "active"
  },
  {
    id: "3",
    name: "Auto Insurance-Ever-Ringmax",
    type: "Bundle",
    category: "Auto Bundle - Private",
    callsToday: 0,
    callsMTD: 2642,
    revenueToday: 0,
    revenueMTD: 59712,
    conversionRateMTD: 94.17,
    avgRevenuePerCall: 22.60,
    status: "active"
  },
  {
    id: "4",
    name: "Insurex - Social",
    type: "Bundle",
    category: "Final Expense - Social - Now IVR",
    callsToday: 0,
    callsMTD: 1168,
    revenueToday: 0,
    revenueMTD: 54225,
    conversionRateMTD: 61.90,
    avgRevenuePerCall: 46.43,
    status: "active"
  },
  {
    id: "5",
    name: "Family First (Sam)",
    type: "Bundle",
    category: "Final Expense Bundle",
    callsToday: 0,
    callsMTD: 1143,
    revenueToday: 0,
    revenueMTD: 38430,
    conversionRateMTD: 48.03,
    avgRevenuePerCall: 33.62,
    status: "active"
  },
  {
    id: "6",
    name: "Family First (Sam) - No IVR",
    type: "Bundle",
    category: "Final Expense - Social - Now IVR",
    callsToday: 0,
    callsMTD: 805,
    revenueToday: 0,
    revenueMTD: 30870,
    conversionRateMTD: 54.78,
    avgRevenuePerCall: 38.35,
    status: "active"
  },
  {
    id: "7",
    name: "DL-Home Insurance-OS",
    type: "Bundle",
    category: "Home Insurance OS",
    callsToday: 0,
    callsMTD: 390,
    revenueToday: 0,
    revenueMTD: 11880,
    conversionRateMTD: 55.38,
    avgRevenuePerCall: 30.46,
    status: "active"
  },
  {
    id: "8",
    name: "DL-OS-Revshare",
    type: "Bundle",
    category: "Auto Bundle - Private",
    callsToday: 0,
    callsMTD: 1164,
    revenueToday: 0,
    revenueMTD: 11154,
    conversionRateMTD: 43.55,
    avgRevenuePerCall: 9.58,
    status: "active"
  }
];

const OfferManagement = ({ onBackToDashboard, onViewOfferStatistics }: OfferManagementProps) => {
  const [offers, setOffers] = useState<Offer[]>(mockOffers);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleOfferStatus = (offerId: string) => {
    setOffers(offers.map(offer => 
      offer.id === offerId 
        ? { ...offer, status: offer.status === "active" ? "paused" : "active" }
        : offer
    ));
  };

  const filteredOffers = offers.filter(offer =>
    offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Offer Management</h1>
          <p className="text-gray-600">Manage offers across all campaigns and publishers</p>
        </div>
        <div className="flex gap-2">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Offer
          </Button>
          <Button variant="outline" onClick={onBackToDashboard}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{offers.length}</div>
              <div className="text-sm text-gray-600">Total Offers</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {offers.filter(o => o.status === "active").length}
              </div>
              <div className="text-sm text-gray-600">Active Offers</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {offers.reduce((sum, o) => sum + o.callsMTD, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Calls MTD</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                ${offers.reduce((sum, o) => sum + o.revenueMTD, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Revenue MTD</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Offers</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search offers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    Offer Name
                  </div>
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Calls Today</TableHead>
                <TableHead>Calls MTD</TableHead>
                <TableHead>Revenue Today</TableHead>
                <TableHead>Revenue MTD</TableHead>
                <TableHead>Conv. Rate MTD</TableHead>
                <TableHead>Avg. Revenue/Call</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <button
                        onClick={() => onViewOfferStatistics(offer.id)}
                        className="font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        {offer.name}
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>{offer.type}</TableCell>
                  <TableCell>{offer.category}</TableCell>
                  <TableCell className="text-center">{offer.callsToday}</TableCell>
                  <TableCell className="text-center">{offer.callsMTD.toLocaleString()}</TableCell>
                  <TableCell className="text-center">${offer.revenueToday.toFixed(2)}</TableCell>
                  <TableCell className="text-center">${offer.revenueMTD.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{offer.conversionRateMTD}%</TableCell>
                  <TableCell className="text-center">${offer.avgRevenuePerCall}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(offer.status)}>
                      {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleOfferStatus(offer.id)}
                      >
                        {offer.status === "active" ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
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

export default OfferManagement;
