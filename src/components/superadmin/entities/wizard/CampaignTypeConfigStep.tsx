import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, Plus, Pause, Ban } from "lucide-react";
import { CampaignFormData } from "../types/campaignTypes";

interface CampaignTypeConfigStepProps {
  formData: CampaignFormData;
  updateFormData: (updates: Partial<CampaignFormData>) => void;
}

export const CampaignTypeConfigStep = ({ formData, updateFormData }: CampaignTypeConfigStepProps) => {
  const addIVRFilter = () => {
    const newFilter = {
      id: `filter_${Date.now()}`,
      name: ""
    };
    updateFormData({
      ivrFilters: [...(formData.ivrFilters || []), newFilter]
    });
  };

  const removeIVRFilter = (filterId: string) => {
    updateFormData({
      ivrFilters: formData.ivrFilters?.filter(f => f.id !== filterId) || []
    });
  };

  const updateIVRFilter = (filterId: string, name: string) => {
    updateFormData({
      ivrFilters: formData.ivrFilters?.map(f => 
        f.id === filterId ? { ...f, name } : f
      ) || []
    });
  };

  const updateOffer = (offerId: string, updates: any) => {
    updateFormData({
      destinationOffers: formData.destinationOffers?.map(offer =>
        offer.id === offerId ? { ...offer, ...updates } : offer
      ) || []
    });
  };

  return (
    <div className="space-y-6">
      {/* Campaign Type */}
      <Card>
        <CardHeader>
          <CardTitle>1. Campaign Type</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.campaignType || "bundle"}
            onValueChange={(value: "bundle" | "single") => updateFormData({ campaignType: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bundle" id="bundle" />
              <Label htmlFor="bundle" className="font-normal cursor-pointer">Bundle</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Category & IVR Filters */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Category</Label>
            <Input
              value={formData.category || ""}
              onChange={(e) => updateFormData({ category: e.target.value })}
              placeholder="e.g., Final Expense - Social - Now IVR"
              className="mt-1"
            />
          </div>

          <div>
            <Label>IVR Filter</Label>
            <div className="space-y-2 mt-2">
              {formData.ivrFilters?.map((filter) => (
                <div key={filter.id} className="flex gap-2">
                  <Input
                    value={filter.name}
                    onChange={(e) => updateIVRFilter(filter.id, e.target.value)}
                    placeholder="Enter filter name"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeIVRFilter(filter.id)}
                    className="text-destructive"
                  >
                    <X className="h-4 w-4" />
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addIVRFilter}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                ADD FILTER
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Information */}
      <Card>
        <CardHeader>
          <CardTitle>2. Campaign Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Campaign Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              placeholder="Enter campaign name"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Campaign Description</Label>
            <Textarea
              value={formData.description || ""}
              onChange={(e) => updateFormData({ description: e.target.value })}
              placeholder="Enter campaign description"
              className="mt-1"
              rows={3}
            />
          </div>

          {/* Destination Offer Table */}
          <div>
            <Label className="mb-2 block">Destination Offer:</Label>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Offer Name</TableHead>
                    <TableHead>Advertiser Name</TableHead>
                    <TableHead className="w-24">Weight</TableHead>
                    <TableHead>IVR (On/Off)</TableHead>
                    <TableHead>IVR Filter(s)</TableHead>
                    <TableHead>Destination Payout</TableHead>
                    <TableHead>Connect Duration</TableHead>
                    <TableHead>Publisher Payout</TableHead>
                    <TableHead>EPC</TableHead>
                    <TableHead>Pause</TableHead>
                    <TableHead>Suspend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.destinationOffers?.map((offer) => (
                    <TableRow key={offer.id}>
                      <TableCell>{offer.offerName}</TableCell>
                      <TableCell>{offer.advertiserName}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={offer.weight}
                          onChange={(e) => updateOffer(offer.id, { weight: parseInt(e.target.value) || 0 })}
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>{offer.ivrEnabled ? "On" : "Off"}</TableCell>
                      <TableCell>{offer.ivrFilter}</TableCell>
                      <TableCell>${offer.destinationPayout.toFixed(2)}</TableCell>
                      <TableCell>{offer.connectDuration}</TableCell>
                      <TableCell>${offer.publisherPayout.toFixed(2)}</TableCell>
                      <TableCell>${offer.epc.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateOffer(offer.id, { isPaused: !offer.isPaused })}
                          className={offer.isPaused ? "text-primary" : "text-muted-foreground"}
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateOffer(offer.id, { isSuspended: !offer.isSuspended })}
                          className={offer.isSuspended ? "text-destructive" : "text-muted-foreground"}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Calls Distribution */}
          <div className="space-y-4">
            <Label>Calls Distribution</Label>
            <div className="space-y-2">
              <Slider
                value={[formData.callDistributionValue || 70]}
                onValueChange={(value) => updateFormData({ callDistributionValue: value[0] })}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <div>
                  <div className="font-medium">Weighted Distribution</div>
                  <div className="text-muted-foreground">{formData.callDistributionValue || 70} % of calls</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Yield</div>
                  <div className="text-muted-foreground">0 % of calls</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">Round Rubin</div>
                  <div className="text-muted-foreground">{100 - (formData.callDistributionValue || 70)} % of calls</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
