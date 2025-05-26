
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, User, MapPin, X } from "lucide-react";

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-blue-500" />
              <span>{contact.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <User className="w-4 h-4" />
                Contact Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">First Name:</span>
                  <span className="font-medium">{contact.firstName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Name:</span>
                  <span className="font-medium">{contact.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{contact.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-medium">{contact.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Zip Code:</span>
                  <span className="font-medium">{contact.zipCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">DOB:</span>
                  <span className="font-medium">{contact.dob}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">{contact.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Height:</span>
                  <span className="font-medium">{contact.height}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Face Value:</span>
                  <span className="font-medium">{contact.faceValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tobacco User:</span>
                  <span className="font-medium">{contact.tobaccoUser}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Any Diseases:</span>
                  <span className="font-medium">{contact.anyDiseases}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank Account:</span>
                  <span className="font-medium">{contact.bankAccount}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Call Summary</h4>
              <div className="text-sm space-y-1">
                <div>Total Calls: <span className="font-medium">{contact.calls.length}</span></div>
                <div>Answered: <span className="font-medium">{contact.calls.filter(c => c.status === 'answered').length}</span></div>
                <div>Missed: <span className="font-medium">{contact.calls.filter(c => c.status === 'missed').length}</span></div>
              </div>
            </div>
          </div>

          {/* Call History */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call History ({contact.calls.length})
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-blue-500 text-white border-blue-500">
                  CALL LOG
                </Button>
                <Button variant="outline" size="sm">
                  NOTES
                </Button>
                <Button variant="outline" size="sm">
                  APPLICATION
                </Button>
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {contact.calls.map((call) => (
                <div key={call.id} className="bg-white border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getCallTypeIcon(call.type)}</span>
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">BJ</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{contact.name}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {call.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{call.duration}</span>
                      <Badge className={getCallStatusColor(call.status)}>
                        {call.status === 'answered' ? '✓' : call.status === 'missed' ? '✗' : '📧'}
                      </Badge>
                    </div>
                  </div>
                  {call.notes && (
                    <div className="text-xs text-gray-600 mt-2 p-2 bg-gray-50 rounded">
                      {call.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetailsModal;
