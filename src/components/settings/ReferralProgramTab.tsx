
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Users, 
  DollarSign, 
  Copy, 
  ChevronDown, 
  Mail, 
  MessageSquare, 
  Download,
  Info,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";

const ReferralProgramTab = () => {
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);

  // Mock data
  const referralData = {
    referralLink: "https://callx.com/join?ref=abc123",
    totalReferredAgents: 14,
    activeAgents: 9,
    monthlyCommission: 450,
    lifetimeEarnings: 2120,
    plan: "agency_starter", // This will show upgrade banner
    whiteLabelDomain: null
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const emailTemplate = `Subject: Join Our AI-Powered Real Estate Team

Hi [Agent Name],

I'd like to invite you to join our real estate team powered by CallX's AI technology. Our agents are closing more deals with AI-powered lead qualification and coaching.

Benefits:
• AI handles initial lead screening 24/7
• Real-time coaching during calls
• Automated follow-up sequences
• Performance analytics and insights

Ready to boost your sales? Join here: ${referralData.referralLink}

Best regards,
[Your Name]`;

  const whatsappTemplate = `🏠 Exciting opportunity for real estate agents!

Join our AI-powered team and boost your sales with:
✅ 24/7 AI lead qualification
✅ Real-time call coaching
✅ Automated follow-ups
✅ Performance insights

Ready to level up? ${referralData.referralLink}`;

  return (
    <div className="space-y-6">
      {/* Upgrade Banner for non-Pro plans */}
      {referralData.plan !== "agency_pro" && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-orange-800">Want to brand your own agent onboarding experience?</h3>
                <p className="text-sm text-orange-700 mt-1">
                  Upgrade to the White Label Plan to customize your referral funnel and domain.
                </p>
              </div>
              <Button variant="default">Upgrade Plan</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Referral Link Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Unique Referral Link</CardTitle>
          <CardDescription>
            Share this link to recruit new agents to your team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              value={referralData.whiteLabelDomain || referralData.referralLink} 
              readOnly 
              className="flex-1"
            />
            <Button 
              variant="outline" 
              onClick={() => copyToClipboard(referralData.whiteLabelDomain || referralData.referralLink)}
            >
              <Copy className="h-4 w-4" />
              Copy Link
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button variant="outline" size="sm">
              Share More
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Referral Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Referral Performance Summary</CardTitle>
          <CardDescription>Track your referral success and earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="cursor-help">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Total Referred</span>
                      </div>
                      <p className="text-2xl font-bold">{referralData.totalReferredAgents}</p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total number of agents you've successfully referred</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="cursor-help">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Active Agents</span>
                      </div>
                      <p className="text-2xl font-bold">{referralData.activeAgents}</p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Referred agents with active, paying subscriptions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="cursor-help">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Monthly Earnings</span>
                      </div>
                      <p className="text-2xl font-bold">${referralData.monthlyCommission}</p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your current monthly referral commission</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="cursor-help">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Total Earned</span>
                      </div>
                      <p className="text-2xl font-bold">${referralData.lifetimeEarnings}</p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total commission earned since you started referring</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      {/* Commission Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Commission Structure
            <Info className="h-4 w-4 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Collapsible open={isCommissionOpen} onOpenChange={setIsCommissionOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-0 h-auto">
                <ChevronDown className={`h-4 w-4 transition-transform ${isCommissionOpen ? 'rotate-180' : ''}`} />
                How it works
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium mb-2">You earn $50/month for every agent you refer who maintains an active subscription.</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Referral earnings paid monthly via Stripe Connect</li>
                  <li>• Agents must be active and paying to qualify</li>
                  <li>• No cap on referrals</li>
                  <li>• Commission starts after agent's first successful month</li>
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* Marketing Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Promotional Assets</CardTitle>
          <CardDescription>Ready-to-use content to help you recruit agents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Email Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-muted p-3 rounded text-xs max-h-32 overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-mono">{emailTemplate}</pre>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(emailTemplate)}
                  className="w-full"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Email Template
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">WhatsApp Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-muted p-3 rounded text-xs max-h-32 overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-mono">{whatsappTemplate}</pre>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(whatsappTemplate)}
                  className="w-full"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy WhatsApp Template
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download CallX Logo
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Banner Assets
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Canva Templates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralProgramTab;
