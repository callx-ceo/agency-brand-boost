
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Save, Plus, Trash2, ArrowLeft, GripVertical } from "lucide-react";

interface ScriptSection {
  id: string;
  name: string;
  label: "intro" | "discovery" | "presentation" | "objection_handling" | "close" | "followup" | "custom";
  content: string;
  order: number;
}

interface Script {
  id: string;
  name: string;
  description: string;
  type: "final_expense" | "solar" | "insurance" | "real_estate" | "custom";
  sections: ScriptSection[];
  createdAt: string;
  lastModified: string;
}

interface ScriptEditorProps {
  script: Script;
  onSave: (script: Script) => void;
  onClose: () => void;
}

const ScriptEditor = ({ script, onSave, onClose }: ScriptEditorProps) => {
  const [editingScript, setEditingScript] = useState<Script>({ ...script });
  const [isAddSectionDialogOpen, setIsAddSectionDialogOpen] = useState(false);
  const [newSection, setNewSection] = useState({
    name: "",
    label: "custom" as ScriptSection["label"],
    content: ""
  });

  const sectionLabels = [
    { value: "intro", label: "Opening/Introduction" },
    { value: "discovery", label: "Discovery/Qualifying" },
    { value: "presentation", label: "Presentation" },
    { value: "objection_handling", label: "Objection Handling" },
    { value: "close", label: "Closing" },
    { value: "followup", label: "Follow-up" },
    { value: "custom", label: "Custom Section" }
  ];

  const handleScriptInfoChange = (field: keyof Script, value: string) => {
    setEditingScript(prev => ({
      ...prev,
      [field]: value,
      lastModified: new Date().toISOString().split('T')[0]
    }));
  };

  const handleSectionChange = (sectionId: string, field: keyof ScriptSection, value: string) => {
    setEditingScript(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    }));
  };

  const handleAddSection = () => {
    if (!newSection.name || !newSection.content) {
      toast.error("Please fill in section name and content");
      return;
    }

    const section: ScriptSection = {
      id: Date.now().toString(),
      name: newSection.name,
      label: newSection.label,
      content: newSection.content,
      order: editingScript.sections.length + 1
    };

    setEditingScript(prev => ({
      ...prev,
      sections: [...prev.sections, section]
    }));

    setNewSection({ name: "", label: "custom", content: "" });
    setIsAddSectionDialogOpen(false);
    toast.success("Section added successfully");
  };

  const handleDeleteSection = (sectionId: string) => {
    setEditingScript(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
    toast.success("Section deleted");
  };

  const handleSave = () => {
    onSave(editingScript);
    toast.success("Script saved successfully");
  };

  const getLabelDisplay = (label: ScriptSection["label"]) => {
    return sectionLabels.find(l => l.value === label)?.label || label;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Scripts
          </Button>
          <div>
            <h3 className="text-xl font-semibold">Edit Script</h3>
            <p className="text-gray-600">Modify script details and sections</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsAddSectionDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Script Info */}
      <Card>
        <CardHeader>
          <CardTitle>Script Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="script-name">Script Name</Label>
            <Input
              id="script-name"
              value={editingScript.name}
              onChange={(e) => handleScriptInfoChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="script-description">Description</Label>
            <Input
              id="script-description"
              value={editingScript.description}
              onChange={(e) => handleScriptInfoChange("description", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Script Sections */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Script Sections</h4>
        {editingScript.sections.map((section) => (
          <Card key={section.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <div>
                    <CardTitle className="text-base">{section.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {getLabelDisplay(section.label)}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteSection(section.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor={`section-name-${section.id}`}>Section Name</Label>
                <Input
                  id={`section-name-${section.id}`}
                  value={section.name}
                  onChange={(e) => handleSectionChange(section.id, "name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`section-content-${section.id}`}>Content</Label>
                <Textarea
                  id={`section-content-${section.id}`}
                  value={section.content}
                  onChange={(e) => handleSectionChange(section.id, "content", e.target.value)}
                  className="min-h-[120px]"
                  placeholder="Enter the script content for this section..."
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Section Dialog */}
      <Dialog open={isAddSectionDialogOpen} onOpenChange={setIsAddSectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Section</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="new-section-name">Section Name</Label>
              <Input
                id="new-section-name"
                value={newSection.name}
                onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
                placeholder="e.g., Opening Statement"
              />
            </div>
            
            <div>
              <Label htmlFor="new-section-label">Section Type</Label>
              <Select
                value={newSection.label}
                onValueChange={(value) => setNewSection({ ...newSection, label: value as ScriptSection["label"] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sectionLabels.map((label) => (
                    <SelectItem key={label.value} value={label.value}>
                      {label.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="new-section-content">Content</Label>
              <Textarea
                id="new-section-content"
                value={newSection.content}
                onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
                placeholder="Enter the script content..."
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddSectionDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSection}>
                Add Section
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScriptEditor;
