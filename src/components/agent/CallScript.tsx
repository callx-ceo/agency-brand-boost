
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

interface CallScriptProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

const CallScript = ({ currentStep, onStepChange }: CallScriptProps) => {
  const scriptSteps = [
    {
      title: "Introduction",
      content: "Hi, My name is Brian Sales Agent and I am a licensed life insurance agent on a recorded line. How are you doing today? Can I start by verifying you information?",
      form: null
    },
    {
      title: "Personal Information",
      content: "What is your full name?",
      form: (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
            <Input id="firstName" placeholder="John" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
            <Input id="lastName" placeholder="Doe" className="mt-1" />
          </div>
        </div>
      )
    },
    {
      title: "Demographics",
      content: "What is your gender?",
      form: (
        <RadioGroup defaultValue="male" className="flex gap-8 mt-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="font-normal">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="font-normal">Female</Label>
          </div>
        </RadioGroup>
      )
    },
    {
      title: "Location Details",
      content: "What is your zip code?",
      form: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="zipCode" className="text-sm font-medium">Zip code</Label>
            <Input id="zipCode" placeholder="Enter zip code" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="dob" className="text-sm font-medium">What is your DOB?</Label>
            <Input id="dob" placeholder="Enter Date of birth" className="mt-1" />
          </div>
        </div>
      )
    }
  ];

  const currentStepData = scriptSteps[currentStep - 1];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Script</h2>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg border">
          <p className="text-sm leading-relaxed text-gray-800">{currentStepData?.content}</p>
        </div>

        {currentStepData?.form && (
          <div className="space-y-4">
            {currentStepData.form}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={() => setCurrentStep(Math.min(currentStep + 1, 4))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallScript;
