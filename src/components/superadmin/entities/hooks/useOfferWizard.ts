
import { useState } from "react";
import { toast } from "sonner";
import { OfferFormData } from "../types/offerTypes";

interface UseOfferWizardProps {
  userRole: "super_admin" | "agency_admin" | "publisher";
  currentUserId?: string;
}

export const useOfferWizard = ({ userRole, currentUserId }: UseOfferWizardProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<OfferFormData>({
    name: "",
    type: "internal",
    vertical: "",
    targetStates: [],
    callDurationRequirement: 60,
    schedule: {
      start: "08:00",
      end: "18:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    },
    bidPrice: 0,
    activeImmediately: true,
    buyerId: userRole === "agency_admin" ? currentUserId : undefined
  });

  const updateFormData = (updates: Partial<OfferFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateStep = async (step: number, data: OfferFormData): Promise<boolean> => {
    switch (step) {
      case 1:
        if (!data.name.trim()) {
          toast.error("Offer name is required");
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
        if (data.type === "external") {
          if (!data.externalDestination?.trim()) {
            toast.error("External destination number is required");
            return false;
          }
          // Basic E.164 format validation
          if (!/^\+[1-9]\d{1,14}$/.test(data.externalDestination)) {
            toast.error("Please enter a valid phone number in E.164 format");
            return false;
          }
        } else {
          if (!data.assignedAgents || data.assignedAgents.length === 0) {
            toast.error("Please assign at least one agent");
            return false;
          }
        }
        if (data.schedule.days.length === 0) {
          toast.error("Please select at least one operating day");
          return false;
        }
        break;
        
      case 3:
        if (data.bidPrice <= 0) {
          toast.error("Bid price must be greater than 0");
          return false;
        }
        break;
    }
    return true;
  };

  const submitOffer = async (data: OfferFormData): Promise<OfferFormData> => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newOffer: OfferFormData = {
        ...data,
        id: `offer_${Date.now()}`,
        buyerId: data.buyerId || currentUserId
      };
      
      toast.success("Offer created successfully!");
      
      return newOffer;
    } catch (error) {
      toast.error("Failed to create offer. Please try again.");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    updateFormData,
    validateStep,
    submitOffer,
    isSubmitting
  };
};
