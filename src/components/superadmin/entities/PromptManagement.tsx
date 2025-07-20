import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Settings, 
  Target, 
  Eye, 
  Save, 
  Play, 
  Download, 
  Upload, 
  Copy 
} from "lucide-react";
import { toast } from "sonner";

interface PromptConfig {
  id: string;
  sectionLabel: string;
  sectionName: string;
  prompt: string;
  isActive: boolean;
  agencyId?: string;
  agencyName?: string;
  lastModified?: string;
  performance?: {
    accuracy: number;
    usage: number;
  };
}

interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  prompts: PromptConfig[];
  isDefault: boolean;
}

interface PromptManagementProps {
  onBackToDashboard: () => void;
}

const PromptManagement = ({ onBackToDashboard }: PromptManagementProps) => {
  const [selectedAgency, setSelectedAgency] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isTestingPrompt, setIsTestingPrompt] = useState(false);
  // Mock data for demonstration
  const mockAgencies = [
    { id: "all", name: "All Agencies" },
    { id: "agency1", name: "Elite Insurance Partners" },
    { id: "agency2", name: "National Coverage Group" },
    { id: "agency3", name: "Premier Health Solutions" },
  ];

  // Real prompt data based on your actual scoring prompt
  const mockPrompts: PromptConfig[] = [
    {
      id: "1",
      sectionLabel: "Final Expense Insurance Call Scoring",
      sectionName: "comprehensive-scoring",
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
      agencyId: "global",
      agencyName: "Global Template",
      lastModified: new Date().toLocaleDateString(),
      performance: { accuracy: 94, usage: 287 }
    },
    {
      id: "2",
      sectionLabel: "Opening Section Analysis",
      sectionName: "greeting",
      prompt: "Analyze this opening section for professionalism, engagement, and compliance with industry standards. NOTE: Field underwriter introductions are compliant.",
      isActive: true,
      agencyId: "agency1",
      agencyName: "Elite Insurance Partners",
      lastModified: "2024-01-15",
      performance: { accuracy: 92, usage: 145 }
    },
    {
      id: "3",
      sectionLabel: "Needs Assessment",
      sectionName: "discovery",
      prompt: "Evaluate the agent's questioning technique, listening skills, and ability to identify customer needs.",
      isActive: true,
      agencyId: "agency1",
      agencyName: "Elite Insurance Partners",
      lastModified: "2024-01-14",
      performance: { accuracy: 88, usage: 132 }
    },
    {
      id: "4",
      sectionLabel: "Product Presentation",
      sectionName: "presentation",
      prompt: "Assess how well the agent presents product features, benefits, and addresses customer concerns.",
      isActive: false,
      agencyId: "agency2",
      agencyName: "National Coverage Group",
      lastModified: "2024-01-13",
      performance: { accuracy: 85, usage: 98 }
    }
  ];

  const mockTemplates: PromptTemplate[] = [
    {
      id: "default",
      name: "Default Insurance Sales",
      category: "Insurance",
      isDefault: true,
      prompts: mockPrompts.filter(p => p.agencyId === "global")
    },
    {
      id: "health",
      name: "Health Insurance Specialized",
      category: "Health",
      isDefault: false,
      prompts: mockPrompts.slice(0, 3)
    },
    {
      id: "life",
      name: "Life Insurance Focused",
      category: "Life",
      isDefault: false,
      prompts: mockPrompts.slice(1, 4)
    }
  ];

  const filteredPrompts = selectedAgency === "all" 
    ? mockPrompts 
    : mockPrompts.filter(p => p.agencyId === selectedAgency || p.agencyId === "global");

  const handlePromptChange = (id: string, newPrompt: string) => {
    // Update prompt logic here
    toast.success("Prompt updated successfully");
  };

  const handleToggleActive = (id: string) => {
    // Toggle active state logic here
    toast.success("Prompt status updated");
  };

  const handleSavePrompts = () => {
    toast.success("All prompts saved successfully");
  };

  const handleTestPrompt = async (prompt: PromptConfig) => {
    setIsTestingPrompt(true);
    // Simulate testing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsTestingPrompt(false);
    toast.success(`Prompt "${prompt.sectionLabel}" tested successfully`);
  };

  const handleCreateTemplate = () => {
    toast.success("New template created from current configuration");
  };

  const handleApplyTemplate = (templateId: string) => {
    const template = mockTemplates.find(t => t.id === templateId);
    if (template) {
      toast.success(`Template "${template.name}" applied successfully`);
    }
  };

  const handleBulkUpdate = () => {
    toast.success("Bulk update applied to all selected agencies");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={onBackToDashboard}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">AI Prompt Management</h1>
            <p className="text-muted-foreground">Manage AI scoring prompts across all agencies</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCreateTemplate}>
            <Download className="w-4 h-4 mr-2" />
            Export Config
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Config
          </Button>
          <Button onClick={handleSavePrompts}>
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Agency Filter</label>
              <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select agency" />
                </SelectTrigger>
                <SelectContent>
                  {mockAgencies.map((agency) => (
                    <SelectItem key={agency.id} value={agency.id}>
                      {agency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Template</label>
              <Select value={selectedTemplate || ""} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select template to apply" />
                </SelectTrigger>
                <SelectContent>
                  {mockTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name} {template.isDefault && "(Default)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => selectedTemplate && handleApplyTemplate(selectedTemplate)}
                disabled={!selectedTemplate}
              >
                Apply Template
              </Button>
              <Button variant="outline" onClick={handleBulkUpdate}>
                Bulk Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="prompts">
        <TabsList className="mb-6">
          <TabsTrigger value="prompts" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Prompt Configuration
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Copy className="w-4 h-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Performance Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prompts">
          <div className="space-y-4">
            {filteredPrompts.map((prompt) => (
              <Card key={prompt.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {prompt.sectionLabel}
                        <Badge variant={prompt.isActive ? "default" : "secondary"}>
                          {prompt.isActive ? "Active" : "Inactive"}
                        </Badge>
                        {prompt.agencyId === "global" && (
                          <Badge variant="outline">Global Template</Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {prompt.agencyName} • Last modified: {prompt.lastModified}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right text-sm">
                        <div>Accuracy: {prompt.performance?.accuracy}%</div>
                        <div className="text-muted-foreground">Usage: {prompt.performance?.usage}</div>
                      </div>
                      <Switch
                        checked={prompt.isActive}
                        onCheckedChange={() => handleToggleActive(prompt.id)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      value={prompt.prompt}
                      onChange={(e) => handlePromptChange(prompt.id, e.target.value)}
                      className="min-h-[100px]"
                      placeholder="Enter AI scoring prompt..."
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTestPrompt(prompt)}
                          disabled={isTestingPrompt}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {isTestingPrompt ? "Testing..." : "Test Prompt"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview Results
                        </Button>
                      </div>
                      <Button size="sm">Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {template.name}
                    {template.isDefault && <Badge>Default</Badge>}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Category: {template.category} • {template.prompts.length} prompts
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {template.prompts.slice(0, 3).map((prompt) => (
                      <div key={prompt.id} className="text-sm">
                        • {prompt.sectionLabel}
                      </div>
                    ))}
                    {template.prompts.length > 3 && (
                      <div className="text-sm text-muted-foreground">
                        +{template.prompts.length - 3} more prompts
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" onClick={() => handleApplyTemplate(template.id)}>
                      Apply Template
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPrompts
                    .sort((a, b) => (b.performance?.accuracy || 0) - (a.performance?.accuracy || 0))
                    .slice(0, 3)
                    .map((prompt) => (
                      <div key={prompt.id} className="flex justify-between items-center">
                        <span className="text-sm">{prompt.sectionLabel}</span>
                        <Badge variant="secondary">{prompt.performance?.accuracy}%</Badge>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Used Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPrompts
                    .sort((a, b) => (b.performance?.usage || 0) - (a.performance?.usage || 0))
                    .slice(0, 3)
                    .map((prompt) => (
                      <div key={prompt.id} className="flex justify-between items-center">
                        <span className="text-sm">{prompt.sectionLabel}</span>
                        <Badge variant="outline">{prompt.performance?.usage}</Badge>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Template Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTemplates.map((template) => (
                    <div key={template.id} className="flex justify-between items-center">
                      <span className="text-sm">{template.name}</span>
                      <Badge variant="secondary">
                        {Math.floor(Math.random() * 50) + 10} agencies
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromptManagement;