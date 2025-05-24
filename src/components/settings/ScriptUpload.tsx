
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, FileText, Edit, Trash2, Plus } from "lucide-react";

interface Script {
  id: string;
  name: string;
  description: string;
  type: "final_expense" | "solar" | "insurance" | "real_estate" | "custom";
  sections: ScriptSection[];
  createdAt: string;
  lastModified: string;
}

interface ScriptSection {
  id: string;
  name: string;
  label: "intro" | "discovery" | "presentation" | "objection_handling" | "close" | "followup" | "custom";
  content: string;
  order: number;
}

interface ScriptUploadProps {
  onScriptSelect: (scriptId: string) => void;
}

const ScriptUpload = ({ onScriptSelect }: ScriptUploadProps) => {
  const [scripts, setScripts] = useState<Script[]>([
    {
      id: "1",
      name: "Final Expense Script v2.1",
      description: "Updated final expense script with new objection handling",
      type: "final_expense",
      sections: [
        { id: "1", name: "Opening", label: "intro", content: "Good morning, this is [Name] calling from...", order: 1 },
        { id: "2", name: "Discovery", label: "discovery", content: "I'm calling to help families...", order: 2 },
        { id: "3", name: "Close", label: "close", content: "Would you like to move forward?", order: 3 }
      ],
      createdAt: "2024-05-20",
      lastModified: "2024-05-24"
    }
  ]);

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [newScript, setNewScript] = useState({
    name: "",
    description: "",
    type: "custom" as Script["type"],
    content: ""
  });

  const scriptTypes = [
    { value: "final_expense", label: "Final Expense" },
    { value: "solar", label: "Solar" },
    { value: "insurance", label: "Insurance" },
    { value: "real_estate", label: "Real Estate" },
    { value: "custom", label: "Custom" }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real implementation, this would parse the file content
      toast.success(`File "${file.name}" uploaded successfully`);
      setNewScript({ ...newScript, content: `[Content from ${file.name}]` });
    }
  };

  const handleSaveScript = () => {
    if (!newScript.name || !newScript.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const script: Script = {
      id: Date.now().toString(),
      name: newScript.name,
      description: newScript.description,
      type: newScript.type,
      sections: [
        { id: "1", name: "Auto-Generated Section", label: "custom", content: newScript.content, order: 1 }
      ],
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };

    setScripts([...scripts, script]);
    setNewScript({ name: "", description: "", type: "custom", content: "" });
    setIsUploadDialogOpen(false);
    toast.success("Script uploaded and processed successfully");
  };

  const handleDeleteScript = (id: string) => {
    setScripts(scripts.filter(script => script.id !== id));
    toast.success("Script deleted");
  };

  const getTypeColor = (type: Script["type"]) => {
    const colors = {
      final_expense: "bg-blue-100 text-blue-700",
      solar: "bg-yellow-100 text-yellow-700",
      insurance: "bg-green-100 text-green-700",
      real_estate: "bg-purple-100 text-purple-700",
      custom: "bg-gray-100 text-gray-700"
    };
    return colors[type];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Sales Scripts</h3>
          <p className="text-gray-600">Upload and manage your sales scripts</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Upload Script
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Script</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="script-name">Script Name *</Label>
                <Input
                  id="script-name"
                  value={newScript.name}
                  onChange={(e) => setNewScript({ ...newScript, name: e.target.value })}
                  placeholder="e.g., Solar Lead Script v1.0"
                />
              </div>
              
              <div>
                <Label htmlFor="script-description">Description</Label>
                <Input
                  id="script-description"
                  value={newScript.description}
                  onChange={(e) => setNewScript({ ...newScript, description: e.target.value })}
                  placeholder="Brief description of this script"
                />
              </div>

              <div>
                <Label htmlFor="script-type">Script Type</Label>
                <Select
                  value={newScript.type}
                  onValueChange={(value) => setNewScript({ ...newScript, type: value as Script["type"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scriptTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Upload Method</Label>
                <div className="mt-2 space-y-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload file (TXT, PDF, DOCX)</p>
                    <Input
                      type="file"
                      accept=".txt,.pdf,.docx"
                      onChange={handleFileUpload}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                  
                  <div className="text-center text-gray-500">or</div>
                  
                  <div>
                    <Label htmlFor="script-content">Paste Script Content</Label>
                    <Textarea
                      id="script-content"
                      value={newScript.content}
                      onChange={(e) => setNewScript({ ...newScript, content: e.target.value })}
                      placeholder="Paste your script content here..."
                      className="min-h-[200px]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveScript}>
                  Upload & Process
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Scripts List */}
      <div className="grid gap-4">
        {scripts.map((script) => (
          <Card key={script.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold">{script.name}</h4>
                    <Badge className={getTypeColor(script.type)}>
                      {scriptTypes.find(t => t.value === script.type)?.label}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{script.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{script.sections.length} sections</span>
                    <span>Modified: {script.lastModified}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onScriptSelect(script.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteScript(script.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScriptUpload;
