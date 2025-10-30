import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EmailTemplatePreviewProps {
  type: "call_score" | "recommended_actions" | "performance_report";
  customization?: {
    primaryColor?: string;
    headerText?: string;
    footerText?: string;
  };
}

const CallScorePreview = ({ customization }: { customization?: any }) => {
  const primaryColor = customization?.primaryColor || "#667eea";
  const headerText = customization?.headerText || "Call Performance Score";
  const footerText = customization?.footerText || "This is an automated performance report. Keep improving! 🚀";

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", lineHeight: 1.6, color: "#333" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <div style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #764ba2 100%)`, color: "white", padding: "30px", textAlign: "center", borderRadius: "8px 8px 0 0" }}>
          <h1 style={{ margin: 0, fontSize: "24px" }}>📊 {headerText}</h1>
          <p style={{ margin: "10px 0 0 0" }}>Call Date: {new Date().toLocaleDateString()}</p>
          <div style={{ fontSize: "48px", fontWeight: "bold", margin: "10px 0", color: "#10b981" }}>87/100</div>
        </div>
        
        <div style={{ background: "white", padding: "30px", border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 8px 8px" }}>
          <p>Hi Agent Name,</p>
          <p>Here's your detailed performance analysis for your recent call:</p>
          
          <div style={{ margin: "25px 0" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1f2937", marginBottom: "15px", borderBottom: `2px solid ${primaryColor}`, paddingBottom: "8px" }}>📈 Scoring Breakdown</div>
            
            <div style={{ background: "#f9fafb", padding: "15px", margin: "10px 0", borderRadius: "6px", borderLeft: `4px solid ${primaryColor}` }}>
              <span style={{ float: "right", fontWeight: "bold", color: "#10b981" }}>92/100</span>
              <strong>Script Adherence</strong>
              <p style={{ margin: "8px 0 0 0", color: "#6b7280" }}>Excellent job following the script while maintaining natural conversation flow.</p>
            </div>
            
            <div style={{ background: "#f9fafb", padding: "15px", margin: "10px 0", borderRadius: "6px", borderLeft: `4px solid ${primaryColor}` }}>
              <span style={{ float: "right", fontWeight: "bold", color: "#f59e0b" }}>85/100</span>
              <strong>Objection Handling</strong>
              <p style={{ margin: "8px 0 0 0", color: "#6b7280" }}>Good responses to objections. Consider using more empathy statements.</p>
            </div>
          </div>
          
          <div style={{ margin: "25px 0" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1f2937", marginBottom: "15px", borderBottom: `2px solid ${primaryColor}`, paddingBottom: "8px" }}>✨ Strengths</div>
            <div style={{ paddingLeft: "20px" }}>• Natural and friendly tone throughout the call</div>
            <div style={{ paddingLeft: "20px" }}>• Asked great discovery questions</div>
          </div>
          
          <p style={{ marginTop: "30px" }}>Keep up the great work! Every call is an opportunity to improve.</p>
        </div>
        
        <div style={{ textAlign: "center", padding: "20px", color: "#6b7280", fontSize: "14px" }}>
          <p>{footerText}</p>
        </div>
      </div>
    </div>
  );
};

const RecommendedActionsPreview = ({ customization }: { customization?: any }) => {
  const primaryColor = customization?.primaryColor || "#10b981";
  const headerText = customization?.headerText || "Recommended Actions";
  const footerText = customization?.footerText || "These recommendations are generated based on your performance data. Keep growing! 🌱";

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", lineHeight: 1.6, color: "#333" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <div style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #059669 100%)`, color: "white", padding: "30px", textAlign: "center", borderRadius: "8px 8px 0 0" }}>
          <h1 style={{ margin: 0, fontSize: "24px" }}>🎯 {headerText}</h1>
          <p style={{ margin: "10px 0 0 0" }}>Your personalized improvement plan</p>
        </div>
        
        <div style={{ background: "white", padding: "30px", border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 8px 8px" }}>
          <p>Hi Agent Name,</p>
          <p>Based on your recent performance, here are some personalized recommendations to help you excel:</p>
          
          <div style={{ background: "#f0fdf4", padding: "15px", borderRadius: "6px", margin: "20px 0", borderLeft: `4px solid ${primaryColor}` }}>
            <strong>📊 Performance Summary:</strong>
            <p style={{ margin: "8px 0 0 0" }}>Your performance this week shows strong progress!</p>
          </div>
          
          <h3 style={{ color: "#1f2937", marginTop: "30px" }}>Recommended Actions:</h3>
          
          <div style={{ background: "#f9fafb", padding: "20px", margin: "15px 0", borderRadius: "8px", borderLeft: `4px solid ${primaryColor}` }}>
            <div>
              <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold", color: "white", backgroundColor: "#ef4444" }}>HIGH PRIORITY</span>
              <span style={{ display: "inline-block", background: "#e0e7ff", color: "#4f46e5", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", marginLeft: "8px" }}>Sales Skills</span>
            </div>
            <div style={{ fontSize: "16px", fontWeight: "bold", color: "#1f2937", margin: "10px 0" }}>Practice handling price objections</div>
            <div style={{ color: "#6b7280", marginTop: "8px" }}>Your conversion rate drops when discussing pricing. Review the pricing confidence module.</div>
          </div>
          
          <div style={{ marginTop: "30px", padding: "15px", background: "#eff6ff", borderRadius: "6px" }}>
            💡 <strong>Pro Tip:</strong> Focus on high-priority actions first for maximum impact on your performance!
          </div>
        </div>
        
        <div style={{ textAlign: "center", padding: "20px", color: "#6b7280", fontSize: "14px" }}>
          <p>{footerText}</p>
        </div>
      </div>
    </div>
  );
};

const PerformanceReportPreview = ({ customization }: { customization?: any }) => {
  const primaryColor = customization?.primaryColor || "#667eea";
  const headerText = customization?.headerText || "Complete Performance Report";
  const footerText = customization?.footerText || "This is an automated performance report. Keep improving! 🚀";

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", lineHeight: 1.6, color: "#333" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <div style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #764ba2 100%)`, color: "white", padding: "30px", textAlign: "center", borderRadius: "8px 8px 0 0" }}>
          <h1 style={{ margin: 0, fontSize: "24px" }}>📊 {headerText}</h1>
          <p style={{ margin: "10px 0 0 0" }}>Call Date: {new Date().toLocaleDateString()}</p>
          <div style={{ fontSize: "48px", fontWeight: "bold", margin: "10px 0", color: "#10b981" }}>87/100</div>
        </div>
        
        <div style={{ background: "white", padding: "30px", border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 8px 8px" }}>
          <p>Hi Agent Name,</p>
          <p>Here's your comprehensive performance analysis with personalized recommendations:</p>
          
          {/* Call Details */}
          <div style={{ background: "#f0f9ff", padding: "15px", borderRadius: "6px", margin: "20px 0", borderLeft: "4px solid #0ea5e9" }}>
            <div style={{ padding: "8px 0", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e0f2fe" }}>
              <span style={{ fontWeight: 600, color: "#0c4a6e" }}>📞 Caller ID:</span>
              <span style={{ color: "#475569" }}>+1 (555) 123-4567</span>
            </div>
            <div style={{ padding: "8px 0", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 600, color: "#0c4a6e" }}>🔖 Transaction ID:</span>
              <span style={{ color: "#475569" }}>TXN-2024-10-30-8472</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div style={{ textAlign: "center", margin: "25px 0" }}>
            <a href="#" style={{ display: "inline-block", padding: "12px 24px", margin: "8px", textDecoration: "none", borderRadius: "6px", fontWeight: "bold", background: "#10b981", color: "white" }}>
              🎧 Listen to Call Recording
            </a>
            <a href="#" style={{ display: "inline-block", padding: "12px 24px", margin: "8px", textDecoration: "none", borderRadius: "6px", fontWeight: "bold", background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", color: "white" }}>
              📸 Share on Instagram
            </a>
          </div>
          
          {/* Performance Summary */}
          <div style={{ background: "#f0fdf4", padding: "15px", borderRadius: "6px", margin: "20px 0", borderLeft: `4px solid #10b981` }}>
            <strong>📊 Performance Summary:</strong>
            <p style={{ margin: "8px 0 0 0" }}>Your performance this week shows strong progress! Your close rate increased by 12%.</p>
          </div>
          
          {/* Scoring Breakdown */}
          <div style={{ margin: "25px 0" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1f2937", marginBottom: "15px", borderBottom: `2px solid ${primaryColor}`, paddingBottom: "8px" }}>📈 Scoring Breakdown</div>
            
            <div style={{ background: "#f9fafb", padding: "15px", margin: "10px 0", borderRadius: "6px", borderLeft: `4px solid ${primaryColor}` }}>
              <span style={{ float: "right", fontWeight: "bold", color: "#10b981" }}>92/100</span>
              <strong>Script Adherence</strong>
              <p style={{ margin: "8px 0 0 0", color: "#6b7280" }}>Excellent job following the script!</p>
            </div>
          </div>
          
          {/* Strengths */}
          <div style={{ margin: "25px 0" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1f2937", marginBottom: "15px", borderBottom: `2px solid ${primaryColor}`, paddingBottom: "8px" }}>✨ Strengths</div>
            <div style={{ paddingLeft: "20px" }}>• Natural and friendly tone</div>
            <div style={{ paddingLeft: "20px" }}>• Asked great discovery questions</div>
          </div>
          
          {/* Follow-Up Insights */}
          <div style={{ margin: "25px 0" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1f2937", marginBottom: "15px", borderBottom: `2px solid ${primaryColor}`, paddingBottom: "8px" }}>💭 Follow-Up Insights</div>
            <div style={{ background: "#fef3c7", padding: "15px", borderRadius: "6px", margin: "10px 0", borderLeft: "4px solid #f59e0b" }}>
              Based on your conversation pattern, the customer showed high interest when you mentioned premium features.
            </div>
          </div>
          
          {/* Recommended Actions */}
          <div style={{ margin: "25px 0" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1f2937", marginBottom: "15px", borderBottom: `2px solid ${primaryColor}`, paddingBottom: "8px" }}>🎯 Recommended Actions</div>
            <div style={{ background: "#f9fafb", padding: "20px", margin: "15px 0", borderRadius: "8px", borderLeft: "4px solid #10b981" }}>
              <div>
                <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold", color: "white", backgroundColor: "#ef4444" }}>HIGH PRIORITY</span>
                <span style={{ display: "inline-block", background: "#e0e7ff", color: "#4f46e5", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", marginLeft: "8px" }}>Sales Skills</span>
              </div>
              <div style={{ fontSize: "16px", fontWeight: "bold", color: "#1f2937", margin: "10px 0" }}>Practice handling price objections</div>
              <div style={{ color: "#6b7280", marginTop: "8px" }}>Review the pricing confidence module and practice with your manager.</div>
            </div>
          </div>
          
          <p style={{ marginTop: "30px", padding: "15px", background: "#eff6ff", borderRadius: "6px" }}>
            💡 <strong>Pro Tip:</strong> Focus on high-priority actions first for maximum impact!
          </p>
          
          <p style={{ marginTop: "20px" }}>Keep up the great work! Every call is an opportunity to improve.</p>
        </div>
        
        <div style={{ textAlign: "center", padding: "20px", color: "#6b7280", fontSize: "14px" }}>
          <p>{footerText}</p>
        </div>
      </div>
    </div>
  );
};

export const EmailTemplatePreview: React.FC<EmailTemplatePreviewProps> = ({ type, customization }) => {
  return (
    <Card className="p-6 max-h-[600px] overflow-y-auto">
      {type === "call_score" ? (
        <CallScorePreview customization={customization} />
      ) : type === "performance_report" ? (
        <PerformanceReportPreview customization={customization} />
      ) : (
        <RecommendedActionsPreview customization={customization} />
      )}
    </Card>
  );
};

export const EmailTemplateSelector = ({ onCustomizationChange }: { onCustomizationChange?: (customization: any) => void }) => {
  const [activeTab, setActiveTab] = React.useState<"call_score" | "recommended_actions" | "performance_report">("performance_report");
  const [customization, setCustomization] = React.useState({
    primaryColor: "#667eea",
    headerText: "Complete Performance Report",
    footerText: "This is an automated performance report. Keep improving! 🚀"
  });

  React.useEffect(() => {
    if (activeTab === "call_score") {
      setCustomization({
        primaryColor: "#667eea",
        headerText: "Call Performance Score",
        footerText: "This is an automated performance report. Keep improving! 🚀"
      });
    } else if (activeTab === "recommended_actions") {
      setCustomization({
        primaryColor: "#10b981",
        headerText: "Recommended Actions",
        footerText: "These recommendations are generated based on your performance data. Keep growing! 🌱"
      });
    } else {
      setCustomization({
        primaryColor: "#667eea",
        headerText: "Complete Performance Report",
        footerText: "This is an automated performance report. Keep improving! 🚀"
      });
    }
  }, [activeTab]);

  const handleCustomizationChange = (field: string, value: string) => {
    const newCustomization = { ...customization, [field]: value };
    setCustomization(newCustomization);
    onCustomizationChange?.(newCustomization);
  };

  return (
    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="performance_report">Complete Report</TabsTrigger>
        <TabsTrigger value="call_score">Call Score Only</TabsTrigger>
        <TabsTrigger value="recommended_actions">Actions Only</TabsTrigger>
      </TabsList>
      
      <TabsContent value="performance_report" className="space-y-4">
        <div className="grid gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Primary Color</label>
            <input 
              type="color" 
              value={customization.primaryColor}
              onChange={(e) => handleCustomizationChange("primaryColor", e.target.value)}
              className="h-10 w-full rounded border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Header Text</label>
            <input 
              type="text" 
              value={customization.headerText}
              onChange={(e) => handleCustomizationChange("headerText", e.target.value)}
              className="w-full px-3 py-2 rounded border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Footer Text</label>
            <input 
              type="text" 
              value={customization.footerText}
              onChange={(e) => handleCustomizationChange("footerText", e.target.value)}
              className="w-full px-3 py-2 rounded border"
            />
          </div>
        </div>
        <EmailTemplatePreview type="performance_report" customization={customization} />
      </TabsContent>
      
      <TabsContent value="call_score" className="space-y-4">
        <div className="grid gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Primary Color</label>
            <input 
              type="color" 
              value={customization.primaryColor}
              onChange={(e) => handleCustomizationChange("primaryColor", e.target.value)}
              className="h-10 w-full rounded border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Header Text</label>
            <input 
              type="text" 
              value={customization.headerText}
              onChange={(e) => handleCustomizationChange("headerText", e.target.value)}
              className="w-full px-3 py-2 rounded border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Footer Text</label>
            <input 
              type="text" 
              value={customization.footerText}
              onChange={(e) => handleCustomizationChange("footerText", e.target.value)}
              className="w-full px-3 py-2 rounded border"
            />
          </div>
        </div>
        <EmailTemplatePreview type="call_score" customization={customization} />
      </TabsContent>
      
      <TabsContent value="recommended_actions" className="space-y-4">
        <div className="grid gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Primary Color</label>
            <input 
              type="color" 
              value={customization.primaryColor}
              onChange={(e) => handleCustomizationChange("primaryColor", e.target.value)}
              className="h-10 w-full rounded border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Header Text</label>
            <input 
              type="text" 
              value={customization.headerText}
              onChange={(e) => handleCustomizationChange("headerText", e.target.value)}
              className="w-full px-3 py-2 rounded border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Footer Text</label>
            <input 
              type="text" 
              value={customization.footerText}
              onChange={(e) => handleCustomizationChange("footerText", e.target.value)}
              className="w-full px-3 py-2 rounded border"
            />
          </div>
        </div>
        <EmailTemplatePreview type="recommended_actions" customization={customization} />
      </TabsContent>
    </Tabs>
  );
};
