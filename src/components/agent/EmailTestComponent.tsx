import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/**
 * EmailTestComponent - Used for testing email functionality
 * This component allows manual testing of call score and recommended action emails
 */
const EmailTestComponent = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendTestCallScoreEmail = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-agent-emails", {
        body: {
          to: email,
          type: "call_score",
          data: {
            agentName: "Aaron Javier",
            callDate: new Date().toLocaleDateString(),
            callerId: "+1 (555) 123-4567",
            transactionId: "TXN-2024-10-30-8472",
            recordingUrl: "https://example.com/recordings/call-8472.mp3",
            overallScore: 87,
            criteria: [
              {
                name: "Script Adherence",
                score: 92,
                feedback: "Excellent job following the script while maintaining natural conversation flow.",
              },
              {
                name: "Objection Handling",
                score: 85,
                feedback: "Good responses to objections. Consider using more empathy statements.",
              },
              {
                name: "Closing Technique",
                score: 84,
                feedback: "Strong closing. Try asking for the sale more directly earlier in the conversation.",
              },
            ],
            strengths: [
              "Natural and friendly tone throughout the call",
              "Asked great discovery questions",
              "Built strong rapport with the customer",
            ],
            improvements: [
              "Work on handling price objections with more confidence",
              "Reduce filler words ('um', 'like') for more professional delivery",
            ],
            nextSteps: [
              "Review the objection handling training module",
              "Practice the ABC closing technique",
              "Listen to top performer call recordings",
            ],
            followUpInsights: [
              "Based on your conversation pattern, the customer showed high interest when you mentioned the premium features. Consider leading with benefits rather than features in future calls.",
              "Your response time to objections averaged 2.3 seconds - this is excellent! Quick, confident responses build trust.",
              "The customer mentioned 'budget concerns' 3 times. Next time, address pricing early and frame it as an investment rather than a cost.",
            ],
          },
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Email Sent!",
        description: "Call score email has been sent successfully.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send email. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendTestPerformanceReportEmail = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-agent-emails", {
        body: {
          to: email,
          type: "performance_report",
          data: {
            agentName: "Aaron Javier",
            callDate: new Date().toLocaleDateString(),
            callerId: "+1 (555) 123-4567",
            transactionId: "TXN-2024-10-30-8472",
            recordingUrl: "https://example.com/recordings/call-8472.mp3",
            overallScore: 87,
            performanceSummary: "Your performance this week shows strong progress! Your close rate increased by 12% and you handled 23% more calls. Focus on the areas below to maintain this momentum.",
            criteria: [
              {
                name: "Script Adherence",
                score: 92,
                feedback: "Excellent job following the script while maintaining natural conversation flow.",
              },
              {
                name: "Objection Handling",
                score: 85,
                feedback: "Good responses to objections. Consider using more empathy statements.",
              },
              {
                name: "Closing Technique",
                score: 84,
                feedback: "Strong closing. Try asking for the sale more directly earlier in the conversation.",
              },
            ],
            strengths: [
              "Natural and friendly tone throughout the call",
              "Asked great discovery questions",
              "Built strong rapport with the customer",
            ],
            improvements: [
              "Work on handling price objections with more confidence",
              "Reduce filler words ('um', 'like') for more professional delivery",
            ],
            followUpInsights: [
              "Based on your conversation pattern, the customer showed high interest when you mentioned the premium features. Consider leading with benefits rather than features in future calls.",
              "Your response time to objections averaged 2.3 seconds - this is excellent! Quick, confident responses build trust.",
              "The customer mentioned 'budget concerns' 3 times. Next time, address pricing early and frame it as an investment rather than a cost.",
            ],
            recommendedActions: [
              {
                title: "Practice handling price objections",
                priority: "high",
                category: "Sales Skills",
                description: "Your conversion rate drops when discussing pricing. Review the pricing confidence module and practice with your manager this week.",
              },
              {
                title: "Improve opening statements",
                priority: "medium",
                category: "Communication",
                description: "First impressions matter! Work on making your opening 15 seconds more engaging to capture attention immediately.",
              },
              {
                title: "Study competitor products",
                priority: "medium",
                category: "Product Knowledge",
                description: "Understanding competitor offerings will help you position your products better. Spend 30 minutes reviewing the comparison guide.",
              },
            ],
            nextSteps: [
              "Review the objection handling training module",
              "Practice the ABC closing technique",
              "Listen to top performer call recordings",
            ],
          },
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Email Sent!",
        description: "Complete performance report email has been sent successfully.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send email. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendTestRecommendedActionsEmail = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-agent-emails", {
        body: {
          to: email,
          type: "recommended_actions",
          data: {
            agentName: "Aaron Javier",
            performanceSummary:
              "Your performance this week shows strong progress! Your close rate increased by 12% and you handled 23% more calls. Focus on the areas below to maintain this momentum.",
            actions: [
              {
                title: "Practice handling price objections",
                priority: "high",
                category: "Sales Skills",
                description:
                  "Your conversion rate drops when discussing pricing. Review the pricing confidence module and practice with your manager this week.",
              },
              {
                title: "Improve opening statements",
                priority: "medium",
                category: "Communication",
                description:
                  "First impressions matter! Work on making your opening 15 seconds more engaging to capture attention immediately.",
              },
              {
                title: "Study competitor products",
                priority: "medium",
                category: "Product Knowledge",
                description:
                  "Understanding competitor offerings will help you position your products better. Spend 30 minutes reviewing the comparison guide.",
              },
              {
                title: "Celebrate your wins!",
                priority: "low",
                category: "Mindset",
                description:
                  "You've made great progress! Take time to acknowledge your achievements and maintain positive momentum.",
              },
            ],
          },
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Email Sent!",
        description: "Recommended actions email has been sent successfully.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send email. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Test Email System
        </CardTitle>
        <CardDescription>
          Send test emails to verify your email notification setup
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="test-email">Recipient Email</Label>
          <Input
            id="test-email"
            type="email"
            placeholder="agent@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex gap-3 flex-wrap">
          <Button
            onClick={sendTestPerformanceReportEmail}
            disabled={isLoading}
            className="flex-1 min-w-[200px]"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Mail className="w-4 h-4 mr-2" />
            )}
            Send Complete Report
          </Button>

          <Button
            onClick={sendTestCallScoreEmail}
            disabled={isLoading}
            variant="outline"
            className="flex-1 min-w-[200px]"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Mail className="w-4 h-4 mr-2" />
            )}
            Send Test Call Score
          </Button>

          <Button
            onClick={sendTestRecommendedActionsEmail}
            disabled={isLoading}
            variant="outline"
            className="flex-1 min-w-[200px]"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Mail className="w-4 h-4 mr-2" />
            )}
            Send Test Actions Email
          </Button>
        </div>

        <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted rounded-md">
          <strong>Note:</strong> Make sure you've added your RESEND_API_KEY in the
          Lovable Cloud secrets and verified your sending domain at resend.com.
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailTestComponent;
