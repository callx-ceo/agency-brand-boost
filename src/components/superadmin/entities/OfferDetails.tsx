
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OfferDetailsProps {
  offerId: string;
  onBackToDashboard: () => void;
  onBackToOffers: () => void;
  onSwitchToStatistics: () => void;
}

const OfferDetails = ({ offerId, onBackToDashboard, onBackToOffers, onSwitchToStatistics }: OfferDetailsProps) => {
  // Mock data for the selected offer
  const offerData = {
    id: offerId,
    name: "Insurex - Search",
    type: "Bundle",
    category: "Final Expense Bundle",
    status: "active",
    wholeOffer: "Internal",
    displayName: "Insurex",
    advertiser: "Insurex Insurance Services",
    bundleCategory: "Final Expense Bundle",
    startDate: "May 21, 2025",
    expirationDate: "",
    priceType: "Static",
    concurrencyCap: "10 calls",
    dailyBudget: "",
    repeatDays: "30 days",
    destinationNumber: "+1 555 555 5555",
    payout: "$0.00",
    durationType: "Connect Duration",
    callDuration: "30 Seconds",
    ivrType: "Robo",
    ivrSetting: "On",
    transferPrompt: "Off",
    hoursOfOperation: "UTC-08:00 Pacific Standard Time",
    region: "Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, District Of Columbia, Federated States of Micronesia, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virgin Islands, Virginia, Washington, West Virginia, Wisconsin, Wyoming"
  };

  const timeSlots = [
    "Mon 06:30 - 20:00",
    "Tue 06:30 - 20:00", 
    "Wed 06:30 - 20:00",
    "Thu 06:30 - 20:00",
    "Fri 06:30 - 20:00",
    "Sat 06:30 - 20:00"
  ];

  // Mock statistics data
  const statisticsData = {
    callsToday: 0,
    callsMTD: 1964,
    revenueToday: 0,
    revenueMTD: 100500,
    conversionRateMTD: 85.28,
    avgRevenuePerCall: 51.17
  };

  // Mock publishers data
  const publishersData = [
    {
      id: "1",
      name: "Premier Marketing Solutions",
      status: "active",
      callsToday: 0,
      callsMTD: 1256,
      revenueToday: 0,
      revenueMTD: 64312,
      conversionRate: 89.2,
      avgRevenue: 51.20
    },
    {
      id: "2", 
      name: "Digital Lead Network",
      status: "active",
      callsToday: 0,
      callsMTD: 708,
      revenueToday: 0,
      revenueMTD: 36188,
      conversionRate: 81.4,
      avgRevenue: 51.13
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBackToOffers}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{offerData.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-green-100 text-green-800">
                {offerData.status.charAt(0).toUpperCase() + offerData.status.slice(1)}
              </Badge>
              <Badge variant="outline">{offerData.type}</Badge>
              <span className="text-gray-600">{offerData.category}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="statistics" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="statistics">Offer Statistics</TabsTrigger>
          <TabsTrigger value="details">Offer Details</TabsTrigger>
        </TabsList>

        <TabsContent value="statistics" className="space-y-6">
          {/* Statistics KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{statisticsData.callsToday}</div>
                  <div className="text-sm text-gray-600">Calls Today</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{statisticsData.callsMTD.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Calls MTD</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">${statisticsData.revenueMTD.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Revenue MTD</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{statisticsData.conversionRateMTD}%</div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Publishers Table */}
          <Card>
            <CardHeader>
              <CardTitle>Publishers Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Publisher Name</th>
                      <th className="text-center p-2">Status</th>
                      <th className="text-center p-2">Calls Today</th>
                      <th className="text-center p-2">Calls MTD</th>
                      <th className="text-center p-2">Revenue Today</th>
                      <th className="text-center p-2">Revenue MTD</th>
                      <th className="text-center p-2">Conv. Rate</th>
                      <th className="text-center p-2">Avg Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {publishersData.map((publisher) => (
                      <tr key={publisher.id} className="border-b">
                        <td className="p-2 font-medium">{publisher.name}</td>
                        <td className="p-2 text-center">
                          <Badge className="bg-green-100 text-green-800">
                            {publisher.status.charAt(0).toUpperCase() + publisher.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="p-2 text-center">{publisher.callsToday}</td>
                        <td className="p-2 text-center">{publisher.callsMTD.toLocaleString()}</td>
                        <td className="p-2 text-center">${publisher.revenueToday.toFixed(2)}</td>
                        <td className="p-2 text-center">${publisher.revenueMTD.toLocaleString()}</td>
                        <td className="p-2 text-center">{publisher.conversionRate}%</td>
                        <td className="p-2 text-center">${publisher.avgRevenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          {/* Offer Details Form */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="offerName">Offer Name</Label>
                    <Input id="offerName" value={offerData.name} readOnly className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="wholeOffer">Whole Offer</Label>
                    <Input id="wholeOffer" value={offerData.wholeOffer} readOnly className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input id="displayName" value={offerData.displayName} readOnly className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="advertiser">Advertiser</Label>
                    <Input id="advertiser" value={offerData.advertiser} readOnly className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="offerType">Offer Type</Label>
                    <Input id="offerType" value={offerData.type} readOnly className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="bundleCategory">Bundle Category</Label>
                    <Input id="bundleCategory" value={offerData.bundleCategory} readOnly className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Input id="status" value={offerData.status} readOnly className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" value={offerData.startDate} readOnly className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="expirationDate">Expiration Date</Label>
                    <Input id="expirationDate" value={offerData.expirationDate} placeholder="Not set" readOnly className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="priceType">Price Type</Label>
                    <Input id="priceType" value={offerData.priceType} readOnly className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="concurrencyCap">Concurrency Cap</Label>
                    <Input id="concurrencyCap" value={offerData.concurrencyCap} readOnly className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="dailyBudget">Daily Budget</Label>
                    <Input id="dailyBudget" value={offerData.dailyBudget} placeholder="Not set" readOnly className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="repeatDays">Repeat Days</Label>
                    <Input id="repeatDays" value={offerData.repeatDays} readOnly className="bg-gray-50" />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="destinationNumber">Destination Number</Label>
                    <div className="flex gap-2">
                      <Input id="destinationNumber" value="Phone Number" readOnly className="bg-gray-50" />
                      <div className="text-right min-w-[80px] py-2">
                        <span className="text-sm">Payout</span>
                        <div className="font-medium">{offerData.payout}</div>
                      </div>
                    </div>
                    <Input value={offerData.destinationNumber} readOnly className="bg-gray-50 mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="durationType">Duration Type</Label>
                    <Input id="durationType" value={offerData.durationType} readOnly className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="callDuration">Call Duration</Label>
                    <Input id="callDuration" value={offerData.callDuration} readOnly className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="ivrType">IVR Type</Label>
                    <Input id="ivrType" value={offerData.ivrType} readOnly className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="ivrSetting">IVR Setting</Label>
                    <div className="flex items-center gap-4">
                      <Input id="ivrSetting" value={offerData.ivrSetting} readOnly className="bg-gray-50" />
                      <button className="text-blue-600 hover:underline text-sm">Listen to IVR</button>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="findQuote" />
                        <Label htmlFor="findQuote" className="text-sm">Find Quote</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="customerService" />
                        <Label htmlFor="customerService" className="text-sm">Customer Service</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="transferPrompt">Transfer Prompt</Label>
                    <Input id="transferPrompt" value={offerData.transferPrompt} readOnly className="bg-gray-50" />
                  </div>

                  <div>
                    <Label htmlFor="hoursOfOperation">Hours of Operation</Label>
                    <Input id="hoursOfOperation" value={offerData.hoursOfOperation} readOnly className="bg-gray-50" />
                    <div className="mt-2 space-y-1">
                      {timeSlots.map((slot, index) => (
                        <div key={index} className="text-sm text-gray-600">{slot}</div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="region">Region</Label>
                    <textarea 
                      id="region" 
                      value={offerData.region} 
                      readOnly 
                      className="w-full h-24 p-2 text-sm border rounded-md bg-gray-50 resize-none"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OfferDetails;
