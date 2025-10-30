import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2 } from "lucide-react";

interface EmailTemplatePreviewProps {
  type: "per_call" | "daily_digest" | "weekly_digest";
  customization?: {
    primaryColor?: string;
    headerText?: string;
  };
}

const PerCallPreview: React.FC<{ customization?: EmailTemplatePreviewProps['customization'] }> = ({ customization }) => {
  const primaryColor = customization?.primaryColor || '#3B82F6';
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f9fafb' }}>
      <div style={{ backgroundColor: primaryColor, padding: '30px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '24px' }}>{customization?.headerText || 'Your Call Performance Report'}</h1>
      </div>
      <div style={{ backgroundColor: 'white', padding: '30px' }}>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151' }}>
          Hi John,
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151' }}>
          Here's your performance summary for the call that just ended:
        </p>
        
        <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h2 style={{ color: primaryColor, fontSize: '20px', marginTop: 0 }}>Call Score: 85/100</h2>
          <div style={{ marginTop: '15px' }}>
            <div style={{ marginBottom: '10px' }}>
              <strong style={{ color: '#1f2937' }}>Strengths:</strong>
              <ul style={{ marginTop: '5px', color: '#374151' }}>
                <li>Excellent rapport building</li>
                <li>Clear communication</li>
                <li>Strong product knowledge</li>
              </ul>
            </div>
            <div>
              <strong style={{ color: '#1f2937' }}>Areas for Improvement:</strong>
              <ul style={{ marginTop: '5px', color: '#374151' }}>
                <li>Objection handling could be more confident</li>
                <li>Consider asking more discovery questions</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#eff6ff', padding: '20px', borderRadius: '8px', margin: '20px 0', borderLeft: `4px solid ${primaryColor}` }}>
          <h3 style={{ color: primaryColor, fontSize: '18px', marginTop: 0 }}>Recommended Actions</h3>
          <ol style={{ marginTop: '10px', color: '#374151', lineHeight: '1.8' }}>
            <li>Practice the objection handling script in the training module</li>
            <li>Review top performer calls to see effective discovery questions</li>
            <li>Schedule a 15-minute coaching session with your manager</li>
          </ol>
        </div>

        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151' }}>
          Keep up the great work! Review the detailed feedback in your dashboard for more insights.
        </p>
        
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <a href="#" style={{ 
            backgroundColor: primaryColor, 
            color: 'white', 
            padding: '12px 30px', 
            textDecoration: 'none', 
            borderRadius: '6px',
            display: 'inline-block',
            fontSize: '16px'
          }}>View Full Report</a>
        </div>
      </div>
      <div style={{ backgroundColor: '#f9fafb', padding: '20px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
        <p style={{ margin: '0 0 8px 0' }}>This is an automated email. Please do not reply.</p>
        <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>Powered by <strong>CallX</strong></p>
      </div>
    </div>
  );
};

const DailyDigestPreview: React.FC<{ customization?: EmailTemplatePreviewProps['customization'] }> = ({ customization }) => {
  const primaryColor = customization?.primaryColor || '#3B82F6';
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f9fafb' }}>
      <div style={{ backgroundColor: primaryColor, padding: '30px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '24px' }}>{customization?.headerText || 'Your Daily Performance Summary'}</h1>
      </div>
      <div style={{ backgroundColor: 'white', padding: '30px' }}>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151' }}>
          Hi John,
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151' }}>
          Here's your performance summary for today:
        </p>
        
        <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h2 style={{ color: primaryColor, fontSize: '20px', marginTop: 0 }}>Today's Stats</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <div>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Total Calls</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>12</p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Average Score</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>82/100</p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Applications</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>4</p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Conversion Rate</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>33%</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: '#1f2937', fontSize: '18px' }}>Key Highlights</h3>
          <ul style={{ marginTop: '10px', color: '#374151', lineHeight: '1.8' }}>
            <li>Your best call scored 92 - great job on rapport building!</li>
            <li>Conversion rate is up 5% from yesterday</li>
            <li>Average call duration: 12 minutes (target: 10-15 min)</li>
          </ul>
        </div>

        <div style={{ backgroundColor: '#eff6ff', padding: '20px', borderRadius: '8px', margin: '20px 0', borderLeft: `4px solid ${primaryColor}` }}>
          <h3 style={{ color: primaryColor, fontSize: '18px', marginTop: 0 }}>Tomorrow's Focus Areas</h3>
          <ol style={{ marginTop: '10px', color: '#374151', lineHeight: '1.8' }}>
            <li>Practice handling price objections with confidence</li>
            <li>Ask more discovery questions in the first 2 minutes</li>
            <li>Work on creating urgency without being pushy</li>
          </ol>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <a href="#" style={{ 
            backgroundColor: primaryColor, 
            color: 'white', 
            padding: '12px 30px', 
            textDecoration: 'none', 
            borderRadius: '6px',
            display: 'inline-block',
            fontSize: '16px'
          }}>View Detailed Analytics</a>
        </div>
      </div>
      <div style={{ backgroundColor: '#f9fafb', padding: '20px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
        <p style={{ margin: '0 0 8px 0' }}>This is an automated email. Please do not reply.</p>
        <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>Powered by <strong>CallX</strong></p>
      </div>
    </div>
  );
};

const WeeklyDigestPreview: React.FC<{ customization?: EmailTemplatePreviewProps['customization'] }> = ({ customization }) => {
  const primaryColor = customization?.primaryColor || '#3B82F6';
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f9fafb' }}>
      <div style={{ backgroundColor: primaryColor, padding: '30px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '24px' }}>{customization?.headerText || 'Your Weekly Performance Report'}</h1>
      </div>
      <div style={{ backgroundColor: 'white', padding: '30px' }}>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151' }}>
          Hi John,
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#374151' }}>
          Here's your comprehensive performance summary for this week:
        </p>
        
        <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h2 style={{ color: primaryColor, fontSize: '20px', marginTop: 0 }}>This Week's Stats</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <div>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Total Calls</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>58</p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Average Score</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>84/100</p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Applications</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>19</p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Conversion Rate</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>33%</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: '#1f2937', fontSize: '18px' }}>Weekly Highlights</h3>
          <ul style={{ marginTop: '10px', color: '#374151', lineHeight: '1.8' }}>
            <li>Performance improved 8% compared to last week!</li>
            <li>Your highest scoring day was Wednesday with an average of 89</li>
            <li>You're in the top 20% of performers in your team</li>
            <li>Call quality consistency has improved significantly</li>
          </ul>
        </div>

        <div style={{ backgroundColor: '#fef3c7', padding: '20px', borderRadius: '8px', margin: '20px 0', borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ color: '#92400e', fontSize: '18px', marginTop: 0 }}>Areas for Growth</h3>
          <ul style={{ marginTop: '10px', color: '#78350f', lineHeight: '1.8' }}>
            <li>Objection handling remains the biggest opportunity for improvement</li>
            <li>Monday and Friday show lower performance - consider energy management</li>
          </ul>
        </div>

        <div style={{ backgroundColor: '#eff6ff', padding: '20px', borderRadius: '8px', margin: '20px 0', borderLeft: `4px solid ${primaryColor}` }}>
          <h3 style={{ color: primaryColor, fontSize: '18px', marginTop: 0 }}>Next Week's Action Plan</h3>
          <ol style={{ marginTop: '10px', color: '#374151', lineHeight: '1.8' }}>
            <li>Complete the "Advanced Objection Handling" training module</li>
            <li>Shadow top performer Sarah on 2-3 calls</li>
            <li>Focus on maintaining energy levels on Mondays and Fridays</li>
            <li>Set a goal to improve average score to 87+ next week</li>
          </ol>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <a href="#" style={{ 
            backgroundColor: primaryColor, 
            color: 'white', 
            padding: '12px 30px', 
            textDecoration: 'none', 
            borderRadius: '6px',
            display: 'inline-block',
            fontSize: '16px'
          }}>View Full Weekly Report</a>
        </div>
      </div>
      <div style={{ backgroundColor: '#f9fafb', padding: '20px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
        <p style={{ margin: '0 0 8px 0' }}>This is an automated email. Please do not reply.</p>
        <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>Powered by <strong>CallX</strong></p>
      </div>
    </div>
  );
};

export const EmailTemplatePreview: React.FC<EmailTemplatePreviewProps> = ({ type, customization }) => {
  const PreviewContent = () => (
    <>
      {type === "per_call" ? (
        <PerCallPreview customization={customization} />
      ) : type === "daily_digest" ? (
        <DailyDigestPreview customization={customization} />
      ) : (
        <WeeklyDigestPreview customization={customization} />
      )}
    </>
  );

  return (
    <div className="relative">
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="absolute top-2 right-2 z-10"
          >
            <Maximize2 className="w-4 h-4 mr-2" />
            Full Preview
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <PreviewContent />
        </DialogContent>
      </Dialog>
      
      <Card className="p-6 max-h-[600px] overflow-y-auto">
        <PreviewContent />
      </Card>
    </div>
  );
};

export const EmailTemplateSelector = () => {
  const [selectedType, setSelectedType] = useState<"per_call" | "daily_digest" | "weekly_digest">("per_call");
  const [customization] = useState({
    primaryColor: "#3B82F6",
    headerText: "Your Performance Update"
  });

  return (
    <div className="space-y-6">
      <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="per_call">After Every Call</TabsTrigger>
          <TabsTrigger value="daily_digest">Daily Digest</TabsTrigger>
          <TabsTrigger value="weekly_digest">Weekly Digest</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <EmailTemplatePreview type={selectedType} customization={customization} />
        </div>
      </Tabs>
    </div>
  );
};