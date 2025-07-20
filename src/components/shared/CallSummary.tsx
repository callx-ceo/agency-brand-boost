import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Edit, 
  Save, 
  X, 
  Plus, 
  Target, 
  User, 
  Shield, 
  DollarSign, 
  Clock, 
  MessageSquare, 
  CheckCircle, 
  Calendar 
} from "lucide-react";

interface CallSummaryData {
  customerWhy: {
    primaryReason: string;
    currentSituation: string;
    specificConcerns: string[];
    urgencyLevel: string;
  };
  customerConfirmation: {
    age: string;
    dependents: string;
    maritalStatus: string;
    insurancePurpose: string;
    beneficiaries: string;
    priority: string;
    budget: string;
    timeline: string;
  };
  discussionSummary: string[];
  agentCommitments: string[];
  nextSteps: string[];
}

interface CallSummaryProps {
  contactId: string;
  initialData?: CallSummaryData;
  onSave?: (data: CallSummaryData) => void;
}

const defaultData: CallSummaryData = {
  customerWhy: {
    primaryReason: "Customer wants to ensure family doesn't burden with funeral costs. Recent death of spouse made them realize importance of having coverage in place.",
    currentSituation: "Currently has no life insurance coverage. Fixed income of $2,400/month from Social Security. Concerned about rising funeral costs after seeing recent quotes of $12,000-15,000.",
    specificConcerns: [
      "Doesn't want children to pay for funeral expenses",
      "Worried about qualification due to diabetes",
      "Concerned about premium affordability on fixed income",
      "Wants coverage to start immediately"
    ],
    urgencyLevel: "High - motivated to apply today"
  },
  customerConfirmation: {
    age: "72",
    dependents: "2 adult children, 1 spouse",
    maritalStatus: "Widowed",
    insurancePurpose: "Final expense/burial coverage",
    beneficiaries: "Daughter Sarah (primary), Son Michael (secondary)",
    priority: "Immediate coverage, guaranteed acceptance",
    budget: "$75-100 per month maximum",
    timeline: "Wants coverage effective immediately"
  },
  discussionSummary: [
    "Customer expressed genuine concern about burdening family with funeral costs",
    "Discussed guaranteed acceptance whole life policy - no medical exam required",
    "Explained $15,000 coverage amount would cover average funeral costs in their area",
    "Customer appreciates that premiums never increase and coverage builds cash value",
    "Addressed concerns about diabetes - confirmed guaranteed acceptance regardless of health"
  ],
  agentCommitments: [
    "Will email policy documents within 24 hours of application approval",
    "Promised to call back tomorrow to confirm first payment processed",
    "Committed to sending beneficiary change forms if needed in the future",
    "Will provide customer service number for any future questions"
  ],
  nextSteps: [
    "Complete application over the phone today",
    "Set up automatic monthly payment of $89/month",
    "Email confirmation and policy documents within 24 hours",
    "Schedule follow-up call in 30 days to ensure customer satisfaction",
    "Mail physical policy documents within 7-10 business days"
  ]
};

const CallSummary = ({ contactId, initialData = defaultData, onSave }: CallSummaryProps) => {
  const [data, setData] = useState<CallSummaryData>(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    onSave?.(data);
    setIsEditing(false);
    setHasChanges(false);
    toast({
      title: "Call Summary Saved",
      description: "The call summary has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setData(initialData);
    setIsEditing(false);
    setHasChanges(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const updateData = (path: string[], value: any) => {
    setData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
      setHasChanges(true);
      return newData;
    });
  };

  const addArrayItem = (path: string[]) => {
    updateData(path, [...getNestedValue(data, path), ""]);
  };

  const removeArrayItem = (path: string[], index: number) => {
    const currentArray = getNestedValue(data, path);
    updateData(path, currentArray.filter((_: any, i: number) => i !== index));
  };

  const updateArrayItem = (path: string[], index: number, value: string) => {
    const currentArray = [...getNestedValue(data, path)];
    currentArray[index] = value;
    updateData(path, currentArray);
  };

  const getNestedValue = (obj: any, path: string[]): any => {
    return path.reduce((current, key) => current?.[key], obj) || [];
  };

  const ArrayEditor = ({ path, items, placeholder }: { path: string[], items: string[], placeholder: string }) => (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) => updateArrayItem(path, index, e.target.value)}
            placeholder={placeholder}
            disabled={!isEditing}
            className="flex-1"
          />
          {isEditing && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeArrayItem(path, index)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      {isEditing && (
        <Button
          type="button"
          variant="outline"
          onClick={() => addArrayItem(path)}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add {placeholder}
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Call Summary</h2>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!hasChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </div>

      {/* Customer's WHY */}
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <Target className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-lg">Customer's WHY</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="primaryReason">Primary Reason</Label>
            <Textarea
              id="primaryReason"
              value={data.customerWhy.primaryReason}
              onChange={(e) => updateData(['customerWhy', 'primaryReason'], e.target.value)}
              placeholder="Why is the customer seeking insurance?"
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="currentSituation">Current Situation</Label>
            <Textarea
              id="currentSituation"
              value={data.customerWhy.currentSituation}
              onChange={(e) => updateData(['customerWhy', 'currentSituation'], e.target.value)}
              placeholder="Describe the customer's current situation"
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Specific Concerns</Label>
            <ArrayEditor 
              path={['customerWhy', 'specificConcerns']} 
              items={data.customerWhy.specificConcerns}
              placeholder="Add a concern"
            />
          </div>
          <div>
            <Label htmlFor="urgencyLevel">Urgency Level</Label>
            <Input
              id="urgencyLevel"
              value={data.customerWhy.urgencyLevel}
              onChange={(e) => updateData(['customerWhy', 'urgencyLevel'], e.target.value)}
              placeholder="High, Medium, Low"
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customer Confirmation */}
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <User className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-lg">Customer Confirmation</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              value={data.customerConfirmation.age}
              onChange={(e) => updateData(['customerConfirmation', 'age'], e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="dependents">Dependents</Label>
            <Input
              id="dependents"
              value={data.customerConfirmation.dependents}
              onChange={(e) => updateData(['customerConfirmation', 'dependents'], e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="maritalStatus">Marital Status</Label>
            <Input
              id="maritalStatus"
              value={data.customerConfirmation.maritalStatus}
              onChange={(e) => updateData(['customerConfirmation', 'maritalStatus'], e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="insurancePurpose">Insurance Purpose</Label>
            <Input
              id="insurancePurpose"
              value={data.customerConfirmation.insurancePurpose}
              onChange={(e) => updateData(['customerConfirmation', 'insurancePurpose'], e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="beneficiaries">Beneficiaries</Label>
            <Input
              id="beneficiaries"
              value={data.customerConfirmation.beneficiaries}
              onChange={(e) => updateData(['customerConfirmation', 'beneficiaries'], e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Input
              id="priority"
              value={data.customerConfirmation.priority}
              onChange={(e) => updateData(['customerConfirmation', 'priority'], e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="budget">Budget Information</Label>
            <Input
              id="budget"
              value={data.customerConfirmation.budget}
              onChange={(e) => updateData(['customerConfirmation', 'budget'], e.target.value)}
              placeholder="Monthly budget or coverage amount"
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="timeline">Timeline Requirements</Label>
            <Input
              id="timeline"
              value={data.customerConfirmation.timeline}
              onChange={(e) => updateData(['customerConfirmation', 'timeline'], e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Discussion Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <MessageSquare className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-lg">Discussion Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ArrayEditor 
            path={['discussionSummary']} 
            items={data.discussionSummary}
            placeholder="Add key discussion point"
          />
        </CardContent>
      </Card>

      {/* Agent Commitments */}
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <CheckCircle className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-lg">Agent Commitments</CardTitle>
        </CardHeader>
        <CardContent>
          <ArrayEditor 
            path={['agentCommitments']} 
            items={data.agentCommitments}
            placeholder="Add commitment made to customer"
          />
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <Calendar className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-lg">Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ArrayEditor 
            path={['nextSteps']} 
            items={data.nextSteps}
            placeholder="Add follow-up action"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CallSummary;