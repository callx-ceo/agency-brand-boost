
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Phone, MapPin, Calendar, Weight, Ruler, DollarSign, Cigarette, Heart, CreditCard } from "lucide-react";
import CallSummary from "../shared/CallSummary";

interface Call {
  id: string;
  date: string;
  duration: string;
  type: "incoming" | "outgoing";
  status: "answered" | "missed" | "voicemail";
  notes?: string;
}

interface ContactDetails {
  id: string;
  name: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  zipCode: string;
  dob: string;
  weight: string;
  height: string;
  faceValue: string;
  tobaccoUser: string;
  anyDiseases: string;
  bankAccount: string;
  calls: Call[];
}

interface ContactDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: ContactDetails | null;
}

const ContactDetailsModal = ({ isOpen, onClose, contact }: ContactDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("details");
  
  if (!contact) return null;

  const getCallStatusColor = (status: string) => {
    switch (status) {
      case "answered": return "bg-green-100 text-green-800";
      case "missed": return "bg-red-100 text-red-800";
      case "voicemail": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCallTypeIcon = (type: string) => {
    return type === "incoming" ? "↓" : "↑";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Contact Details - {contact.name}</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Contact Details</TabsTrigger>
            <TabsTrigger value="summary">Call Summary</TabsTrigger>
            <TabsTrigger value="history">Call History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Name:</span>
                  <span>{contact.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Phone:</span>
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Gender:</span>
                  <span>{contact.gender}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Zip Code:</span>
                  <span>{contact.zipCode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Date of Birth:</span>
                  <span>{contact.dob}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Weight className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Weight:</span>
                  <span>{contact.weight}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Height:</span>
                  <span>{contact.height}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Face Value:</span>
                  <span>{contact.faceValue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cigarette className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Tobacco User:</span>
                  <span>{contact.tobaccoUser}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Any Diseases:</span>
                  <span>{contact.anyDiseases}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Bank Account:</span>
                  <span>{contact.bankAccount}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="summary" className="space-y-6">
            <CallSummary 
              contactId={contact.id}
              onSave={(data) => {
                console.log("Saving call summary for contact:", contact.id, data);
                // Here you would typically save to your backend
              }}
            />
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            {/* Call History */}
            <Card>
              <CardHeader>
                <CardTitle>Call History</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Total calls: {contact.calls.length} | 
                  Last contact: {contact.calls.length > 0 ? contact.calls[contact.calls.length - 1].date : 'Never'}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contact.calls.map((call) => (
                    <div key={call.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">
                          {getCallTypeIcon(call.type)}
                        </div>
                        <div>
                          <div className="font-medium">{call.date}</div>
                          <div className="text-sm text-muted-foreground">Duration: {call.duration}</div>
                          {call.notes && (
                            <div className="text-sm text-muted-foreground mt-1">
                              Notes: {call.notes}
                            </div>
                          )}
                        </div>
                      </div>
                      <Badge className={getCallStatusColor(call.status)}>
                        {call.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetailsModal;
