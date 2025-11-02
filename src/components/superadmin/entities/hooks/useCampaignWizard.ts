
import { useState } from "react";
import { toast } from "sonner";
import { CampaignFormData } from "../types/campaignTypes";

interface UseCampaignWizardProps {
  userRole: "super_admin" | "agency_admin" | "publisher";
  currentUserId?: string;
}

export const useCampaignWizard = ({ userRole, currentUserId }: UseCampaignWizardProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<CampaignFormData>({
    name: "",
    vertical: "",
    language: "",
    targetStates: [],
    bidFloorEnabled: false,
    minimumBidFloor: 0,
    bidFloorCurrency: "USD",
    schedule: {
      start: "08:00",
      end: "18:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    },
    activeImmediately: true
  });

  const updateFormData = (updates: Partial<CampaignFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateStep = async (step: number, data: CampaignFormData): Promise<boolean> => {
    switch (step) {
      case 1:
        // Basic Info step
        if (!data.name.trim()) {
          toast.error("Campaign name is required");
          return false;
        }
        if (!data.vertical) {
          toast.error("Please select a vertical");
          return false;
        }
        if (data.targetStates.length === 0) {
          toast.error("Please select at least one target state");
          return false;
        }
        break;
        
      case 2:
        // Offer step
        if (!data.offer) {
          toast.error("Please configure the campaign offer");
          return false;
        }
        if (!data.offer.payout || data.offer.payout <= 0) {
          toast.error("Please set a valid payout amount");
          return false;
        }
        break;
        
      case 3:
        // Agent Visibility step - no validation needed (all agents by default)
        break;
        
      case 4:
        // Bid Floor step
        if (data.bidFloorEnabled && (data.minimumBidFloor === undefined || data.minimumBidFloor < 0)) {
          toast.error("Please set a valid minimum bid floor");
          return false;
        }
        if (data.bidFloorEnabled && data.minimumBidFloor !== undefined && data.minimumBidFloor > 1000) {
          toast.error("Bid floor seems unusually high. Please verify the amount.");
          return false;
        }
        break;
        
      case 5:
        // Routing step
        if (data.schedule.operationType === "specificDays") {
          const hasOpenDays = Object.values(data.schedule.daySchedules || {}).some(day => !day.closed);
          if (!hasOpenDays) {
            toast.error("At least one day must be open for business");
            return false;
          }
        }
        break;
        
      case 6:
        // Overflow step - no validation needed
        break;
        
      case 7:
        // Summary step - no additional validation needed
        break;
    }
    return true;
  };

  const submitCampaign = async (data: CampaignFormData): Promise<CampaignFormData> => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newCampaign: CampaignFormData = {
        ...data,
        id: `campaign_${Date.now()}`,
        status: data.activeImmediately ? "active" : "paused",
        callsReceived: 0,
        connectedToAgent: 0,
        fallbacksTriggered: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      toast.success("Campaign created successfully!");
      
      return newCampaign;
    } catch (error) {
      toast.error("Failed to create campaign. Please try again.");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    updateFormData,
    validateStep,
    submitCampaign,
    isSubmitting
  };
};
