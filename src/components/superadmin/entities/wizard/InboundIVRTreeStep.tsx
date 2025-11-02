import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Play, X, Plus } from "lucide-react";
import { CampaignFormData } from "../types/campaignTypes";

interface InboundIVRTreeStepProps {
  formData: CampaignFormData;
  updateFormData: (updates: Partial<CampaignFormData>) => void;
}

export const InboundIVRTreeStep = ({ formData, updateFormData }: InboundIVRTreeStepProps) => {
  const addIVRKey = () => {
    const newKey = {
      id: `key_${Date.now()}`,
      key: "",
      action: "forward_to_call_center",
      ivrFilter: "",
      playPromptFirst: false,
      promptText: ""
    };
    updateFormData({
      ivrKeys: [...(formData.ivrKeys || []), newKey]
    });
  };

  const removeIVRKey = (keyId: string) => {
    updateFormData({
      ivrKeys: formData.ivrKeys?.filter(k => k.id !== keyId) || []
    });
  };

  const updateIVRKey = (keyId: string, updates: any) => {
    updateFormData({
      ivrKeys: formData.ivrKeys?.map(k => 
        k.id === keyId ? { ...k, ...updates } : k
      ) || []
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>3. Inbound IVR Tree</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Start Action */}
          <div>
            <Label>At the Start of the Call</Label>
            <Select
              value={formData.ivrStartAction || "ask_a_question"}
              onValueChange={(value) => updateFormData({ ivrStartAction: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ask_a_question">Ask a Question</SelectItem>
                <SelectItem value="forward_immediately">Forward Immediately</SelectItem>
                <SelectItem value="play_message">Play Message</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Greeting */}
          <div>
            <Textarea
              value={formData.ivrGreeting || ""}
              onChange={(e) => updateFormData({ ivrGreeting: e.target.value })}
              placeholder="Thanks for calling to check your eligibility for final expense insurance. You may qualify for up to $25,000 in coverage, starting at just $1/day. Press 1 now to speak with a licensed agent to see how much you qualify for. Press 2 for all other inquiries."
              className="mt-1"
              rows={4}
            />
            <div className="flex items-center gap-2 mt-2">
              <Button variant="ghost" size="sm">
                <Play className="h-4 w-4 mr-2" />
                Play
              </Button>
              <span className="text-xs text-muted-foreground">Vanessa-1_day.mp3</span>
              <Button variant="link" size="sm" className="text-primary">
                Change
              </Button>
            </div>
          </div>

          {/* IVR Keys Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Key</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>IVR Filter</TableHead>
                  <TableHead className="w-32">Play Prompt First</TableHead>
                  <TableHead className="w-24">Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.ivrKeys?.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell>
                      <Input
                        value={key.key}
                        onChange={(e) => updateIVRKey(key.id, { key: e.target.value })}
                        placeholder="1"
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={key.action}
                        onValueChange={(value) => updateIVRKey(key.id, { action: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="forward_to_call_center">Forward to Call Center</SelectItem>
                          <SelectItem value="hang_up">Hang up</SelectItem>
                          <SelectItem value="voicemail">Voicemail</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={key.ivrFilter}
                        onValueChange={(value) => updateIVRKey(key.id, { ivrFilter: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free_quote">Free Quote</SelectItem>
                          <SelectItem value="customer_service">Customer Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={key.playPromptFirst}
                          onCheckedChange={(checked) => 
                            updateIVRKey(key.id, { playPromptFirst: checked === true })
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeIVRKey(key.id)}
                        className="text-destructive"
                      >
                        <X className="h-4 w-4" />
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Add New Key Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addIVRKey}
          >
            <Plus className="h-4 w-4 mr-2" />
            NEW KEY
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
