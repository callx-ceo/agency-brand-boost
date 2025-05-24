
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Settings, Target } from "lucide-react";
import ScriptUpload from "./ScriptUpload";
import PromptCustomization from "./PromptCustomization";
import ScoringConfiguration from "./ScoringConfiguration";

const ScriptsAITab = () => {
  const [activeScriptId, setActiveScriptId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Scripts & AI Configuration</h2>
        <p className="text-gray-600">Upload sales scripts and configure AI scoring for your agency</p>
      </div>

      <Tabs defaultValue="scripts">
        <TabsList className="mb-6">
          <TabsTrigger value="scripts" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Scripts
          </TabsTrigger>
          <TabsTrigger value="prompts" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            AI Prompts
          </TabsTrigger>
          <TabsTrigger value="scoring" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Scoring Config
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scripts">
          <ScriptUpload onScriptSelect={setActiveScriptId} />
        </TabsContent>

        <TabsContent value="prompts">
          <PromptCustomization activeScriptId={activeScriptId} />
        </TabsContent>

        <TabsContent value="scoring">
          <ScoringConfiguration />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScriptsAITab;
