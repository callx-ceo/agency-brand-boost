
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Save, Play, AlertCircle } from "lucide-react";

interface PromptConfig {
  id: string;
  sectionLabel: string;
  sectionName: string;
  prompt: string;
  isActive: boolean;
}

interface PromptCustomizationProps {
  activeScriptId: string | null;
}

const PromptCustomization = ({ activeScriptId }: PromptCustomizationProps) => {
  const [prompts, setPrompts] = useState<PromptConfig[]>([
    {
      id: "1",
      sectionLabel: "intro",
      sectionName: "Opening",
      prompt: "Analyze how effectively the agent delivered the opening. Rate their tone, clarity, and adherence to the script structure.",
      isActive: true
    },
    {
      id: "2",
      sectionLabel: "discovery",
      sectionName: "Discovery",
      prompt: "Evaluate the agent's discovery process. Did they ask qualifying questions and gather necessary information?",
      isActive: true
    },
    {
      id: "3",
      sectionLabel: "objection_handling",
      sectionName: "Objection Handling",
      prompt: "Assess how well the agent addressed customer objections. Look for empathy, understanding, and effective responses.",
      isActive: false
    }
  ]);

  const [testMode, setTestMode] = useState(false);
  const [testTranscript] = useState("Hello, this is John calling from ABC Insurance. I hope you're having a great day today...");

  const handlePromptChange = (id: string, newPrompt: string) => {
    setPrompts(prompts.map(p => 
      p.id === id ? { ...p, prompt: newPrompt } : p
    ));
  };

  const handleToggleActive = (id: string) => {
    setPrompts(prompts.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const handleSavePrompts = () => {
    toast.success("AI prompts saved successfully");
  };

  const handleTestPrompt = (prompt: PromptConfig) => {
    setTestMode(true);
    toast.info(`Testing prompt for ${prompt.sectionName}...`);
    
    // Simulate AI response
    setTimeout(() => {
      setTestMode(false);
      toast.success("Test completed! Check console for results.");
    }, 2000);
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
          <h3 className="text-xl font-semibold">AI Prompt Configuration</h3>
          <p className="text-gray-600">Customize AI analysis prompts for each script section</p>
        </div>
        <Button onClick={handleSavePrompts}>
          <Save className="w-4 h-4 mr-2" />
          Save All Prompts
        </Button>
      </div>

      <div className="grid gap-6">
        {prompts.map((prompt) => (
          <Card key={prompt.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">{prompt.sectionName}</CardTitle>
                  <Badge variant={prompt.isActive ? "default" : "secondary"}>
                    {prompt.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTestPrompt(prompt)}
                    disabled={testMode}
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Test
                  </Button>
                  <Button
                    variant={prompt.isActive ? "secondary" : "default"}
                    size="sm"
                    onClick={() => handleToggleActive(prompt.id)}
                  >
                    {prompt.isActive ? "Disable" : "Enable"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`prompt-${prompt.id}`}>AI Analysis Prompt</Label>
                  <Textarea
                    id={`prompt-${prompt.id}`}
                    value={prompt.prompt}
                    onChange={(e) => handlePromptChange(prompt.id, e.target.value)}
                    placeholder="Describe what the AI should analyze for this section..."
                    className="min-h-[100px] mt-1"
                  />
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Section Type:</strong> {prompt.sectionLabel}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Tip:</strong> Be specific about what metrics to evaluate (tone, adherence, effectiveness, etc.)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {testMode && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Testing AI prompt against sample transcript... This may take a few moments.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default PromptCustomization;
