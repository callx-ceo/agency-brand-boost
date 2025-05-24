
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowUpCircle, CheckCircle } from "lucide-react";

interface UpgradePromptProps {
  upgradeFeatures: string[];
  onUpgrade: () => void;
}

const UpgradePrompt = ({ upgradeFeatures, onUpgrade }: UpgradePromptProps) => {
  return (
    <div className="border-l pl-6">
      <div className="flex items-center space-x-2 mb-3">
        <ArrowUpCircle className="h-5 w-5 text-primary" />
        <h4 className="font-semibold text-primary">Why Upgrade to Pro?</h4>
      </div>
      <ul className="space-y-2 mb-4">
        {upgradeFeatures.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Upgrade to Pro - $997/month</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upgrade to Agency Pro</DialogTitle>
            <DialogDescription>
              Unlock advanced features and scale your agency
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-4">
              <h4 className="font-semibold">Current: Agency Starter</h4>
              <ul className="space-y-2 text-sm">
                <li>• Up to 5 agent licenses</li>
                <li>• Basic analytics</li>
                <li>• Standard support</li>
                <li>• CallX branding</li>
              </ul>
              <p className="text-2xl font-bold">$497/month</p>
            </div>
            <div className="space-y-4 border-l pl-6">
              <h4 className="font-semibold text-primary">Upgrade: Agency Pro</h4>
              <ul className="space-y-2 text-sm">
                <li>• Unlimited agent licenses</li>
                <li>• Advanced analytics & reporting</li>
                <li>• Priority support</li>
                <li>• White-label options</li>
                <li>• Custom domain</li>
                <li>• Referral program</li>
              </ul>
              <p className="text-2xl font-bold text-primary">$997/month</p>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button onClick={onUpgrade}>
              Upgrade Now - $997/month
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpgradePrompt;
