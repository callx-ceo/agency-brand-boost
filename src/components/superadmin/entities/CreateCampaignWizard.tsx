
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { CampaignBasicInfoStep } from "./wizard/CampaignBasicInfoStep";
import CampaignVisibilityStep from "./wizard/CampaignVisibilityStep";
import { CampaignBidFloorStep } from "./wizard/CampaignBidFloorStep";
import CampaignOverflowStep from "./wizard/CampaignOverflowStep";
import { CampaignRoutingStep } from "./wizard/CampaignRoutingStep";
import { CampaignSummaryStep } from "./wizard/CampaignSummaryStep";
import { useCampaignWizard } from "./hooks/useCampaignWizard";
import { CampaignFormData } from "./types/campaignTypes";

interface CreateCampaignWizardProps {
  onClose: () => void;
  onCampaignCreated: (campaign: CampaignFormData) => void;
  userRole: "super_admin" | "agency_admin" | "publisher";
  currentUserId?: string;
}

const CreateCampaignWizard = ({ onClose, onCampaignCreated, userRole, currentUserId }: CreateCampaignWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  
  const {
    formData,
    updateFormData,
    validateStep,
    submitCampaign,
    isSubmitting
  } = useCampaignWizard({ userRole, currentUserId });

  const steps = [
    { number: 1, title: "Basic Information", component: CampaignBasicInfoStep },
    { number: 2, title: "Visibility", component: CampaignVisibilityStep },
    { number: 3, title: "Bid Floor Settings", component: CampaignBidFloorStep },
    { number: 4, title: "Overflow Management", component: CampaignOverflowStep },
    { number: 5, title: "Routing & Schedule", component: CampaignRoutingStep },
    { number: 6, title: "Review & Launch", component: CampaignSummaryStep }
  ];

  const handleNext = async () => {
    const isValid = await validateStep(currentStep, formData);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const campaign = await submitCampaign(formData);
      onCampaignCreated(campaign);
      onClose();
    } catch (error) {
      console.error("Failed to create campaign:", error);
    }
  };

  const currentStepData = steps[currentStep - 1];
  const StepComponent = currentStepData.component;

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Create New Campaign</CardTitle>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep > step.number 
                      ? 'bg-green-500 text-white' 
                      : currentStep === step.number 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }
                  `}>
                    {currentStep > step.number ? <Check className="w-4 h-4" /> : step.number}
                  </div>
                  <span className={`ml-2 text-sm ${currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`mx-4 h-px w-12 ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
            <Progress value={progressPercentage} className="w-full" />
          </div>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto max-h-[60vh]">
        <StepComponent
          formData={formData}
          updateFormData={updateFormData}
          userRole={userRole}
          currentUserId={currentUserId}
        />
        </CardContent>

        <div className="border-t p-6 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={handleNext} className="flex items-center gap-2">
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting ? "Creating..." : "Launch Campaign"}
                <Check className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateCampaignWizard;
