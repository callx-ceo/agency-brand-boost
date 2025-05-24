
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Plus, Target, Edit, Trash2, Save } from "lucide-react";

interface ScoringCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  isActive: boolean;
}

interface ScoringScale {
  type: "pass_fail" | "scale_10" | "scale_100";
  label: string;
}

interface CoachingTag {
  id: string;
  name: string;
  category: "positive" | "improvement" | "critical";
  description: string;
}

const ScoringConfiguration = () => {
  const [criteria, setCriteria] = useState<ScoringCriteria[]>([
    { id: "1", name: "Script Adherence", description: "How well did the agent follow the script?", weight: 25, isActive: true },
    { id: "2", name: "Empathy & Rapport", description: "Agent's ability to connect with the customer", weight: 20, isActive: true },
    { id: "3", name: "Objection Handling", description: "Effectiveness in addressing customer concerns", weight: 25, isActive: true },
    { id: "4", name: "Closing Technique", description: "Quality of the sales close attempt", weight: 30, isActive: true }
  ]);

  const [scoringScale, setScoringScale] = useState<ScoringScale["type"]>("scale_10");
  const [coachingTags, setCoachingTags] = useState<CoachingTag[]>([
    { id: "1", name: "Didn't ask for sale", category: "critical", description: "Agent failed to attempt closing" },
    { id: "2", name: "Excellent rapport", category: "positive", description: "Strong connection with customer" },
    { id: "3", name: "Weak objection handling", category: "improvement", description: "Could improve response to objections" }
  ]);

  const [isAddCriteriaOpen, setIsAddCriteriaOpen] = useState(false);
  const [isAddTagOpen, setIsAddTagOpen] = useState(false);
  const [newCriteria, setNewCriteria] = useState({ name: "", description: "", weight: 25 });
  const [newTag, setNewTag] = useState({ name: "", description: "", category: "improvement" as CoachingTag["category"] });

  const scoringScales: ScoringScale[] = [
    { type: "pass_fail", label: "Pass/Fail" },
    { type: "scale_10", label: "1-10 Scale" },
    { type: "scale_100", label: "1-100 Scale" }
  ];

  const handleAddCriteria = () => {
    if (!newCriteria.name || !newCriteria.description) {
      toast.error("Please fill in all fields");
      return;
    }

    const criteria_item: ScoringCriteria = {
      id: Date.now().toString(),
      name: newCriteria.name,
      description: newCriteria.description,
      weight: newCriteria.weight,
      isActive: true
    };

    setCriteria([...criteria, criteria_item]);
    setNewCriteria({ name: "", description: "", weight: 25 });
    setIsAddCriteriaOpen(false);
    toast.success("Scoring criteria added");
  };

  const handleAddTag = () => {
    if (!newTag.name || !newTag.description) {
      toast.error("Please fill in all fields");
      return;
    }

    const tag: CoachingTag = {
      id: Date.now().toString(),
      name: newTag.name,
      description: newTag.description,
      category: newTag.category
    };

    setCoachingTags([...coachingTags, tag]);
    setNewTag({ name: "", description: "", category: "improvement" });
    setIsAddTagOpen(false);
    toast.success("Coaching tag added");
  };

  const handleDeleteCriteria = (id: string) => {
    setCriteria(criteria.filter(c => c.id !== id));
    toast.success("Criteria deleted");
  };

  const handleDeleteTag = (id: string) => {
    setCoachingTags(coachingTags.filter(t => t.id !== id));
    toast.success("Tag deleted");
  };

  const handleSaveConfiguration = () => {
    toast.success("Scoring configuration saved successfully");
  };

  const getTagColor = (category: CoachingTag["category"]) => {
    const colors = {
      positive: "bg-green-100 text-green-700",
      improvement: "bg-yellow-100 text-yellow-700",
      critical: "bg-red-100 text-red-700"
    };
    return colors[category];
  };

  const totalWeight = criteria.filter(c => c.isActive).reduce((sum, c) => sum + c.weight, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">AI Scoring Configuration</h3>
          <p className="text-gray-600">Define scoring criteria and coaching insights</p>
        </div>
        <Button onClick={handleSaveConfiguration}>
          <Save className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </div>

      {/* Scoring Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Scoring Scale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label>Select scoring scale for evaluations</Label>
            <RadioGroup
              value={scoringScale}
              onValueChange={(value) => setScoringScale(value as ScoringScale["type"])}
              className="flex gap-6"
            >
              {scoringScales.map((scale) => (
                <div key={scale.type} className="flex items-center space-x-2">
                  <RadioGroupItem value={scale.type} id={scale.type} />
                  <Label htmlFor={scale.type}>{scale.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Scoring Criteria */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Scoring Criteria</CardTitle>
          <Dialog open={isAddCriteriaOpen} onOpenChange={setIsAddCriteriaOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Criteria
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Scoring Criteria</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="criteria-name">Criteria Name</Label>
                  <Input
                    id="criteria-name"
                    value={newCriteria.name}
                    onChange={(e) => setNewCriteria({ ...newCriteria, name: e.target.value })}
                    placeholder="e.g., Call Opening Quality"
                  />
                </div>
                <div>
                  <Label htmlFor="criteria-description">Description</Label>
                  <Input
                    id="criteria-description"
                    value={newCriteria.description}
                    onChange={(e) => setNewCriteria({ ...newCriteria, description: e.target.value })}
                    placeholder="What should be evaluated?"
                  />
                </div>
                <div>
                  <Label htmlFor="criteria-weight">Weight (%)</Label>
                  <Input
                    id="criteria-weight"
                    type="number"
                    min="1"
                    max="100"
                    value={newCriteria.weight}
                    onChange={(e) => setNewCriteria({ ...newCriteria, weight: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddCriteriaOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCriteria}>
                    Add Criteria
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {criteria.map((criterion) => (
              <div key={criterion.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{criterion.name}</h4>
                    <Badge variant={criterion.isActive ? "default" : "secondary"}>
                      {criterion.weight}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{criterion.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCriteria(criterion.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {totalWeight !== 100 && (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
                <p className="text-sm text-yellow-700">
                  Warning: Total weight is {totalWeight}%. Should equal 100% for accurate scoring.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Coaching Tags */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Coaching Tags</CardTitle>
          <Dialog open={isAddTagOpen} onOpenChange={setIsAddTagOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Tag
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Coaching Tag</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="tag-name">Tag Name</Label>
                  <Input
                    id="tag-name"
                    value={newTag.name}
                    onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                    placeholder="e.g., Missed opportunity"
                  />
                </div>
                <div>
                  <Label htmlFor="tag-description">Description</Label>
                  <Input
                    id="tag-description"
                    value={newTag.description}
                    onChange={(e) => setNewTag({ ...newTag, description: e.target.value })}
                    placeholder="When should this tag be applied?"
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select
                    value={newTag.category}
                    onValueChange={(value) => setNewTag({ ...newTag, category: value as CoachingTag["category"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="positive">Positive</SelectItem>
                      <SelectItem value="improvement">Needs Improvement</SelectItem>
                      <SelectItem value="critical">Critical Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddTagOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddTag}>
                    Add Tag
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {coachingTags.map((tag) => (
              <div key={tag.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge className={getTagColor(tag.category)}>
                    {tag.name}
                  </Badge>
                  <span className="text-sm text-gray-600">{tag.description}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteTag(tag.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoringConfiguration;
