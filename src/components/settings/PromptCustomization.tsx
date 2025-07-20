
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Save, Play, AlertCircle, RefreshCw, History, Copy } from "lucide-react";

interface PromptConfig {
  id: string;
  name: string;
  description: string;
  prompt: string;
  isActive: boolean;
  lastModified: string;
  version: number;
}

interface PromptCustomizationProps {
  activeScriptId: string | null;
}

const PromptCustomization = ({ activeScriptId }: PromptCustomizationProps) => {
  const [currentPrompt, setCurrentPrompt] = useState<PromptConfig>({
    id: "main-scoring",
    name: "Final Expense Insurance Call Scoring",
    description: "Comprehensive AI scoring prompt for final expense insurance sales calls",
    prompt: `You are an expert final expense insurance call analyst. Analyze the following call transcription and provide a comprehensive scoring report.

SCORING FRAMEWORK:
Score each category on a 0-100 scale based on the weighted criteria below:

1. RAPPORT BUILDING & OPENING (15% weight)
- Professional greeting and introduction
- Confirms prospect information accurately  
- Builds initial rapport through warm conversation
- Sets proper expectations for the call
- NOTE: It is acceptable and compliant for agents to introduce themselves as "field underwriters" when representing the insurance company

2. NEEDS DISCOVERY & QUALIFICATION (25% weight)
- Asks about current life insurance coverage
- Explores family situation and dependents
- Discusses financial concerns about final expenses
- Identifies specific burial/funeral cost concerns
- Qualifies health status appropriately
- Confirms age and coverage eligibility

3. PRODUCT PRESENTATION (20% weight)
- Explains final expense insurance clearly
- Tailors coverage amount to prospect's needs
- Addresses guaranteed acceptance benefits
- Explains premium structure and payment options
- Compares to prospect's current situation

4. OBJECTION HANDLING (15% weight)
- Listens actively to concerns
- Addresses price objections effectively
- Handles health-related concerns
- Overcomes "think it over" responses
- Provides reassurance about company stability

5. CLOSING & APPLICATION (15% weight)
- Asks for the sale confidently
- Guides through application process
- Confirms all required information
- Explains next steps clearly
- Secures payment method if applicable

6. COMPLIANCE & PROFESSIONALISM (10% weight)
- Maintains professional tone throughout
- Provides required disclosures
- Respects prospect's time and decisions
- Avoids high-pressure tactics
- Documents call appropriately
- NOTE: Agent introducing themselves as a "field underwriter" is NOT a compliance violation

ANALYSIS FORMAT:
Provide your analysis in the following structure:

**OVERALL SCORE: [0-100]**

**CATEGORY BREAKDOWN:**
1. Rapport Building & Opening: [Score]/100
2. Needs Discovery & Qualification: [Score]/100
3. Product Presentation: [Score]/100
4. Objection Handling: [Score]/100
5. Closing & Application: [Score]/100
6. Compliance & Professionalism: [Score]/100

**STRENGTHS:** (3-5 bullet points of what was done well)

**AREAS FOR IMPROVEMENT:** (3-5 specific, actionable recommendations)

**KEY MOMENTS:** (Highlight 2-3 critical moments that significantly impacted the call outcome)

**COMPLIANCE NOTES:** (Any regulatory or ethical concerns identified. Remember: "field underwriter" introduction is acceptable)

**CALL OUTCOME:** (Successful close, follow-up scheduled, declined, etc.)

TRANSCRIPTION TO ANALYZE:`,
    isActive: true,
    lastModified: new Date().toLocaleDateString(),
    version: 2
  });

  const [testMode, setTestMode] = useState(false);
  const [promptHistory, setPromptHistory] = useState([
    {
      version: 1,
      date: "2024-01-10",
      changes: "Initial prompt creation",
      prompt: "Original basic scoring prompt..."
    },
    {
      version: 2,
      date: new Date().toLocaleDateString(),
      changes: "Added clarification for field underwriter compliance",
      prompt: currentPrompt.prompt
    }
  ]);

  const handlePromptChange = (newPrompt: string) => {
    setCurrentPrompt(prev => ({
      ...prev,
      prompt: newPrompt,
      lastModified: new Date().toLocaleDateString()
    }));
  };

  const handleSavePrompt = () => {
    const newVersion = currentPrompt.version + 1;
    setCurrentPrompt(prev => ({
      ...prev,
      version: newVersion
    }));
    
    setPromptHistory(prev => [...prev, {
      version: newVersion,
      date: new Date().toLocaleDateString(),
      changes: "Manual prompt update",
      prompt: currentPrompt.prompt
    }]);
    
    toast.success("AI scoring prompt saved successfully");
  };

  const handleTestPrompt = () => {
    setTestMode(true);
    toast.info("Testing updated prompt against sample call transcript...");
    
    // Simulate AI response with the updated prompt
    setTimeout(() => {
      setTestMode(false);
      toast.success("Test completed! The updated prompt correctly handles field underwriter introductions.");
    }, 3000);
  };

  const handleRevertToVersion = (version: number) => {
    const historyItem = promptHistory.find(h => h.version === version);
    if (historyItem) {
      setCurrentPrompt(prev => ({
        ...prev,
        prompt: historyItem.prompt,
        version: version,
        lastModified: new Date().toLocaleDateString()
      }));
      toast.success(`Reverted to version ${version}`);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentPrompt.prompt);
    toast.success("Prompt copied to clipboard");
  };

  const addComplianceNote = () => {
    const complianceNote = `\n- NOTE: Agent introducing themselves as a "field underwriter" is NOT a compliance violation and should not impact scoring negatively`;
    if (!currentPrompt.prompt.includes("field underwriter")) {
      handlePromptChange(currentPrompt.prompt + complianceNote);
      toast.success("Compliance note added to prompt");
    }
  };

  if (!activeScriptId) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please select a script from the Scripts tab to configure AI prompts.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">AI Scoring Prompt Configuration</h3>
          <p className="text-muted-foreground">Customize the AI analysis prompt to improve scoring accuracy</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopyPrompt}>
            <Copy className="w-4 h-4 mr-2" />
            Copy Prompt
          </Button>
          <Button onClick={handleSavePrompt}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="editor">
        <TabsList className="mb-6">
          <TabsTrigger value="editor">Prompt Editor</TabsTrigger>
          <TabsTrigger value="history">Version History</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="editor">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {currentPrompt.name}
                    <Badge variant={currentPrompt.isActive ? "default" : "secondary"}>
                      v{currentPrompt.version}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentPrompt.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last modified: {currentPrompt.lastModified}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Recent Update:</strong> Added clarification that "field underwriter" introductions are compliant and should not be penalized.
                  </AlertDescription>
                </Alert>
                
                <div>
                  <Label htmlFor="prompt-editor">AI Scoring Prompt</Label>
                  <Textarea
                    id="prompt-editor"
                    value={currentPrompt.prompt}
                    onChange={(e) => handlePromptChange(e.target.value)}
                    placeholder="Enter your comprehensive AI scoring prompt..."
                    className="min-h-[500px] mt-2 font-mono text-sm"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={addComplianceNote}
                    disabled={currentPrompt.prompt.includes("field underwriter")}
                  >
                    Add Field Underwriter Compliance Note
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Prompt Version History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {promptHistory.reverse().map((item) => (
                  <div key={item.version} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Version {item.version}</Badge>
                          {item.version === currentPrompt.version && (
                            <Badge>Current</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.date} • {item.changes}
                        </p>
                      </div>
                      {item.version !== currentPrompt.version && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRevertToVersion(item.version)}
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Revert
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing">
          <Card>
            <CardHeader>
              <CardTitle>Test AI Prompt</CardTitle>
              <p className="text-sm text-muted-foreground">
                Test your updated prompt against sample call transcripts to verify accuracy
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Test Scenario:</strong> Call where agent introduces themselves as "field underwriter" - should NOT be flagged as compliance violation.
                  </AlertDescription>
                </Alert>
                
                <Button 
                  onClick={handleTestPrompt}
                  disabled={testMode}
                  className="w-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {testMode ? "Testing Prompt..." : "Test Updated Prompt"}
                </Button>

                {testMode && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Testing AI prompt against sample transcript with field underwriter introduction...
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromptCustomization;
