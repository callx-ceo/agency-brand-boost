
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const mockAdvertisers = [
  { id: "0543", name: "Internet Insurance Services", recordingAccess: false },
  { id: "0542", name: "SUN Arthur", recordingAccess: true },
  { id: "0538", name: "Elite One Financial", recordingAccess: false },
  { id: "0536", name: "Senior Solutions Insurance", recordingAccess: false },
  { id: "0534", name: "BG Corp", recordingAccess: false },
  { id: "0517", name: "Unlimited Investors Group", recordingAccess: false },
  { id: "0448", name: "Alta Pacto Inc", recordingAccess: false },
  { id: "0442", name: "Albert Einstein", recordingAccess: false },
  { id: "0538", name: "24 Hour Insurance", recordingAccess: false },
];

const ManageAdvertisersTab = () => {
  const [advertisers, setAdvertisers] = useState(mockAdvertisers);

  const handleCheckboxChange = (advertiserId: string, checked: boolean) => {
    setAdvertisers(prev => prev.map(advertiser => 
      advertiser.id === advertiserId 
        ? { ...advertiser, recordingAccess: checked }
        : advertiser
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Advertisers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Advertiser Name</TableHead>
                <TableHead>Advertiser ID</TableHead>
                <TableHead>Recording Access</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advertisers.map((advertiser) => (
                <TableRow key={advertiser.id}>
                  <TableCell className="font-medium text-blue-600 cursor-pointer">
                    {advertiser.name}
                  </TableCell>
                  <TableCell>{advertiser.id}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={advertiser.recordingAccess}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange(advertiser.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
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

export default ManageAdvertisersTab;
