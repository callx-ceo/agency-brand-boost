
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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
      <div className="border-b">
        <div className="flex gap-8">
          <button 
            onClick={onSwitchToStatistics}
            className="pb-2 text-gray-600 hover:text-blue-600"
          >
            OFFER STATISTICS
          </button>
          <button className="pb-2 text-blue-600 border-b-2 border-blue-600 font-medium">
            OFFER DETAILS
          </button>
        </div>
      </div>

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
    </div>
  );
};

export default OfferDetails;
