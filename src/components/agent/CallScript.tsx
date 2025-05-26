
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "lucide-react";

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
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="John" />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Doe" />
          </div>
        </div>
      )
    },
    {
      title: "Demographics",
      content: "What is your gender?",
      form: (
        <RadioGroup defaultValue="male" className="flex gap-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
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
            <Label htmlFor="zipCode">Zip code</Label>
            <Input id="zipCode" placeholder="Enter zip code" />
          </div>
          <div>
            <Label htmlFor="dob">What is your DOB?</Label>
            <Input id="dob" placeholder="Enter Date of birth" />
          </div>
        </div>
      )
    }
  ];

  const currentStepData = scriptSteps[currentStep - 1];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Script</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm leading-relaxed">{currentStepData?.content}</p>
          </div>

          {currentStepData?.form && (
            <div className="space-y-4">
              {currentStepData.form}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CallScript;
