
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Eye, Edit, Pause, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import CreateOfferWizard from "../superadmin/entities/CreateOfferWizard";
import { OfferFormData } from "../superadmin/entities/types/offerTypes";

interface Offer {
  id: string;
  name: string;
  type: "internal" | "external";
  vertical: string;
  callsToday: number;
  callsMTD: number;
  revenueToday: number;
  revenueMTD: number;
  conversionRate: number;
  bidPrice: number;
  status: "active" | "paused" | "pending";
}

const mockAgencyOffers: Offer[] = [
  {
    id: "1",
    name: "Final Expense Inbound",
    type: "internal",
    vertical: "Final Expense",
    callsToday: 12,
    callsMTD: 347,
    revenueToday: 540,
    revenueMTD: 15615,
    conversionRate: 78.5,
    bidPrice: 45.00,
    status: "active"
  },
  {
    id: "2", 
    name: "Medicare External Campaign",
    type: "external",
    vertical: "Medicare",
    callsToday: 8,
    callsMTD: 198,
    revenueToday: 360,
    revenueMTD: 8910,
    conversionRate: 65.2,
    bidPrice: 45.00,
    status: "active"
  }
];

const AgencyOffersManagement = () => {
  const [offers, setOffers] = useState<Offer[]>(mockAgencyOffers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateWizard, setShowCreateWizard] = useState(false);

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

  const handleOfferCreated = (newOffer: OfferFormData) => {
    const offer: Offer = {
      id: newOffer.id || `offer_${Date.now()}`,
      name: newOffer.name,
      type: newOffer.type,
      vertical: newOffer.vertical,
      callsToday: 0,
      callsMTD: 0,
      revenueToday: 0,
      revenueMTD: 0,
      conversionRate: 0,
      bidPrice: newOffer.bidPrice,
      status: newOffer.activeImmediately ? "active" : "pending"
    };
    setOffers([...offers, offer]);
  };

  const filteredOffers = offers.filter(offer =>
    offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.vertical.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showCreateWizard) {
    return (
      <CreateOfferWizard
        onClose={() => setShowCreateWizard(false)}
        onOfferCreated={handleOfferCreated}
        userRole="agency_admin"
        currentUserId="current_agency_user"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Offers</h1>
          <p className="text-gray-600">Manage your agency's offers and campaigns</p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setShowCreateWizard(true)}
        >
          <Plus className="w-4 h-4" />
          Create New Offer
        </Button>
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
                {offers.reduce((sum, o) => sum + o.callsMTD, 0)}
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

      {/* Offers Table */}
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
                <TableHead>Offer Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Vertical</TableHead>
                <TableHead>Calls Today</TableHead>
                <TableHead>Calls MTD</TableHead>
                <TableHead>Revenue Today</TableHead>
                <TableHead>Revenue MTD</TableHead>
                <TableHead>Conv. Rate</TableHead>
                <TableHead>Bid Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">{offer.name}</TableCell>
                  <TableCell>
                    <Badge variant={offer.type === "internal" ? "default" : "secondary"}>
                      {offer.type === "internal" ? "Internal" : "External"}
                    </Badge>
                  </TableCell>
                  <TableCell>{offer.vertical}</TableCell>
                  <TableCell className="text-center">{offer.callsToday}</TableCell>
                  <TableCell className="text-center">{offer.callsMTD}</TableCell>
                  <TableCell className="text-center">${offer.revenueToday.toFixed(2)}</TableCell>
                  <TableCell className="text-center">${offer.revenueMTD.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{offer.conversionRate}%</TableCell>
                  <TableCell className="text-center">${offer.bidPrice}</TableCell>
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

export default AgencyOffersManagement;
