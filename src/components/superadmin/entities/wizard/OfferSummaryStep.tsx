
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Phone, Clock, DollarSign, Target } from "lucide-react";
import { OfferFormData } from "../types/offerTypes";

interface OfferSummaryStepProps {
  formData: OfferFormData;
  updateFormData: (updates: Partial<OfferFormData>) => void;
  userRole: "super_admin" | "agency_admin" | "publisher";
  currentUserId?: string;
}

export const OfferSummaryStep = ({ formData }: OfferSummaryStepProps) => {
  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getRouteTypeIcon = () => {
    return formData.type === "internal" ? Users : Phone;
  };

  const RouteIcon = getRouteTypeIcon();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold">Ready to Launch</h2>
        <p className="text-gray-600">Review your offer configuration before launching</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RouteIcon className="w-5 h-5" />
            Offer Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Offer Name:</span>
                <p className="font-semibold">{formData.name}</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-gray-500">Type:</span>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={formData.type === "internal" ? "default" : "secondary"}>
                    {formData.type === "internal" ? "Distribute to Agents" : "External Destination"}
                  </Badge>
                </div>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Vertical:</span>
                <p className="font-semibold">{formData.vertical}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Target States:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.targetStates.map((state) => (
                    <Badge key={state} variant="outline" className="text-xs">
                      {state}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Call Duration Requirement:</span>
                <p className="font-semibold">{formData.callDurationRequirement} seconds</p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Schedule:</span>
                <p className="font-semibold">
                  {formatTime(formData.schedule.start)} – {formatTime(formData.schedule.end)}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.schedule.days.map((day) => (
                    <Badge key={day} variant="outline" className="text-xs">
                      {day.slice(0, 3)}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">Status:</span>
                <Badge variant={formData.activeImmediately ? "default" : "secondary"}>
                  {formData.activeImmediately ? "Active Immediately" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {formData.type === "internal" ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Agent Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Assigned Agents:</span>
                <p className="font-semibold">{formData.assignedAgents?.length || 0} agents</p>
              </div>
              
              {formData.concurrencyCapPerAgent && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Concurrency Limit:</span>
                  <p className="font-semibold">{formData.concurrencyCapPerAgent} calls per agent</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              External Routing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Destination Number:</span>
                <p className="font-semibold">{formData.externalDestination}</p>
              </div>
              
              {formData.fallbackNumber && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Fallback Number:</span>
                  <p className="font-semibold">{formData.fallbackNumber}</p>
                </div>
              )}

              <div>
                <span className="text-sm font-medium text-gray-500">Call Recording:</span>
                <Badge variant={formData.recordingEnabled ? "default" : "secondary"}>
                  {formData.recordingEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Bidding & Caps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">${formData.bidPrice}</div>
              <div className="text-sm text-gray-600">Bid Price</div>
            </div>
            
            {formData.dailyCap && (
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{formData.dailyCap}</div>
                <div className="text-sm text-gray-600">Daily Cap</div>
              </div>
            )}
            
            {formData.monthlyCap && (
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{formData.monthlyCap}</div>
                <div className="text-sm text-gray-600">Monthly Cap</div>
              </div>
            )}
          </div>

          {(formData.dailyCap || formData.monthlyCap) && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Target className="w-4 h-4" />
                <span>
                  Projected maximum spend: 
                  {formData.dailyCap && ` $${(formData.dailyCap * formData.bidPrice).toLocaleString()}/day`}
                  {formData.dailyCap && formData.monthlyCap && ", "}
                  {formData.monthlyCap && ` $${(formData.monthlyCap * formData.bidPrice).toLocaleString()}/month`}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
