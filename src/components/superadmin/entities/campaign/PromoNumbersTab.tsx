
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, X } from "lucide-react";

const PromoNumbersTab = () => {
  const promoNumbers = [
    {
      number: "888-603-7464",
      publisher: "Google 8 (healthinsuranceleads.com)",
      type: "Inbound",
      description: "Burial Insurer Quotes",
      businessName: "Burial Insurer Quotes",
      totalCalls: "51,864",
      callsMTD: "5,196",
      callsToday: "2",
      convRate: "0%",
      introGreeting: "Off",
      status: "Active"
    },
    {
      number: "855-393-7037",
      publisher: "RingMATI LLC",
      type: "Inbound",
      description: "FEI",
      businessName: "-",
      totalCalls: "22,686",
      callsMTD: "1,551",
      callsToday: "1",
      convRate: "0%",
      introGreeting: "Off",
      status: "Active"
    },
    {
      number: "866-407-1963",
      publisher: "Google 8 (healthinsuranceleads.com)",
      type: "Inbound",
      description: "search",
      businessName: "Senior Life Insurers",
      totalCalls: "12,370",
      callsMTD: "1,453",
      callsToday: "0",
      convRate: "0%",
      introGreeting: "Off",
      status: "Active"
    },
    {
      number: "888-978-7154",
      publisher: "Infinity LLC",
      type: "Inbound",
      description: "Final Expense",
      businessName: "N/A",
      totalCalls: "5,405",
      callsMTD: "0",
      callsToday: "0",
      convRate: "0%",
      introGreeting: "Off",
      status: "Active"
    },
    {
      number: "888-689-2497",
      publisher: "RingMATI LLC",
      type: "Inbound",
      description: "RU",
      businessName: "N/A",
      totalCalls: "3,960",
      callsMTD: "124",
      callsToday: "0",
      convRate: "0%",
      introGreeting: "Off",
      status: "Active"
    },
    {
      number: "877-702-0771",
      publisher: "RingMATI LLC",
      type: "Inbound",
      description: "207",
      businessName: "N/A",
      totalCalls: "3,484",
      callsMTD: "0",
      callsToday: "0",
      convRate: "0%",
      introGreeting: "Off",
      status: "Active"
    },
    {
      number: "888-625-8194",
      publisher: "Anomaly Squared",
      type: "Inbound",
      description: "Lifeguide",
      businessName: "BurialInsuranceQuotes",
      totalCalls: "3,804",
      callsMTD: "459",
      callsToday: "0",
      convRate: "0%",
      introGreeting: "Off",
      status: "Active"
    },
    {
      number: "855-638-3817",
      publisher: "RingMATI LLC",
      type: "Inbound",
      description: "LP",
      businessName: "N/A",
      totalCalls: "3,520",
      callsMTD: "178",
      callsToday: "0",
      convRate: "0%",
      introGreeting: "Off",
      status: "Active"
    },
    {
      number: "844-774-4293",
      publisher: "Insure Insurance (Google Tel",
      type: "Inbound",
      description: "Search",
      businessName: "LifeInsuranceQuotes.com",
      totalCalls: "3,477",
      callsMTD: "1,363",
      callsToday: "0",
      convRate: "0%",
      introGreeting: "Off",
      status: "Active"
    },
    {
      number: "855-386-5470",
      publisher: "Zhan Feng",
      type: "Inbound",
      description: "Senior Policy Quotes",
      businessName: "N/A",
      totalCalls: "2,968",
      callsMTD: "131",
      callsToday: "0",
      convRate: "0%",
      introGreeting: "Off",
      status: "Active"
    },
    {
      number: "877-843-8821",
      publisher: "Facebook",
      type: "Outbound",
      description: "Promo Number for outbound",
      businessName: "-",
      totalCalls: "1,928",
      callsMTD: "0",
      callsToday: "0",
      convRate: "0%",
      introGreeting: "Off",
      status: "Active"
    },
    {
      number: "888-659-8832",
      publisher: "Google 8 (healthinsuranceleads.com)",
      type: "Outbound",
      description: "Promo Number for outbound",
      businessName: "-",
      totalCalls: "1,388",
      callsMTD: "0",
      callsToday: "0",
      convRate: "0%",
      introGreeting: "Off",
      status: "Active"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Promo Numbers</h2>
          <Button variant="outline" size="sm" className="bg-black text-white hover:bg-gray-800">
            + ADD PROMO NUMBER
          </Button>
        </div>
      </div>

      {/* Promo Numbers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Promo Numbers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Promo Number</TableHead>
                <TableHead>Publisher Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead className="bg-gray-100">Total Calls</TableHead>
                <TableHead>Calls MTD</TableHead>
                <TableHead>Calls Today</TableHead>
                <TableHead>Conv. Rate</TableHead>
                <TableHead>Intro Greeting</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promoNumbers.map((promo, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{promo.number}</TableCell>
                  <TableCell>{promo.publisher}</TableCell>
                  <TableCell>
                    <Badge variant={promo.type === "Inbound" ? "default" : "secondary"}>
                      {promo.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{promo.description}</TableCell>
                  <TableCell>{promo.businessName}</TableCell>
                  <TableCell className="bg-gray-50 font-medium">{promo.totalCalls}</TableCell>
                  <TableCell>{promo.callsMTD}</TableCell>
                  <TableCell>{promo.callsToday}</TableCell>
                  <TableCell>{promo.convRate}</TableCell>
                  <TableCell>{promo.introGreeting}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">
                      {promo.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                        <X className="h-4 w-4" />
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

export default PromoNumbersTab;
