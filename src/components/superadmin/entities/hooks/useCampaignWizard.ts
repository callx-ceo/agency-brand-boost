
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
    // Campaign Type & Config
    campaignType: "bundle",
    category: "",
    ivrFilters: [],
    destinationOffers: [
      {
        id: "offer_1",
        offerName: "Insurex-Social-Tier 1",
        advertiserName: "Insurex Insurance Services",
        weight: 5,
        ivrEnabled: true,
        ivrFilter: "Free Quote",
        destinationPayout: 75.00,
        connectDuration: "90 seconds",
        publisherPayout: 48.75,
        epc: 32.88,
        isPaused: false,
        isSuspended: false
      }
    ],
    callDistribution: "weighted",
    callDistributionValue: 70,
    
    // Campaign Information
    name: "",
    description: "",
    
    // Campaign Settings
    payout: 65,
    vertical: "",
    language: "English",
    expirationDate: "ongoing",
    repeatCalls: false,
    recordCalls: true,
    greetingRecording: false,
    leadSettings: true,
    offHoursMessage: false,
    visibilitySettings: "all_publishers",
    
    // IVR Tree
    ivrStartAction: "ask_a_question",
    ivrGreeting: "Thanks for calling to check your eligibility for final expense insurance. You may qualify for up to $25,000 in coverage, starting at just $1/day. Press 1 now to speak with a licensed agent to see how much you qualify for. Press 2 for all other inquiries.",
    ivrKeys: [
      {
        id: "key_1",
        key: "1",
        action: "forward_to_call_center",
        ivrFilter: "Free Quote",
        playPromptFirst: false
      },
      {
        id: "key_2",
        key: "2",
        action: "hang_up",
        ivrFilter: "Customer Service",
        playPromptFirst: true,
        promptText: "Thank you for calling. You've reached the sales department for final expense life insurance. Unfortunately, we are unable to assist with customer service requests, including payments, claims, or policy inquiries."
      }
    ],
    
    // Legacy fields
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
        // Campaign Type & Config step
        if (!data.name.trim()) {
          toast.error("Campaign name is required");
          return false;
        }
        if (!data.category?.trim()) {
          toast.error("Category is required");
          return false;
        }
        break;
        
      case 2:
        // Campaign Settings step
        if (!data.vertical) {
          toast.error("Please select a vertical");
          return false;
        }
        if (!data.payout || data.payout <= 0) {
          toast.error("Please set a valid payout");
          return false;
        }
        break;
        
      case 3:
        // Inbound IVR Tree step
        if (!data.ivrGreeting?.trim()) {
          toast.error("IVR greeting message is required");
          return false;
        }
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
