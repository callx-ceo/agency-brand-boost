import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AVAILABLE_VERTICALS = [
  "Final Expense",
  "Medicare", 
  "Auto Insurance",
  "Home Insurance",
  "Health Insurance",
  "Life Insurance",
  "Debt Settlement",
  "Home Services",
  "Legal"
];


interface AgentVerticalSettingsProps {
  currentVerticals?: string[];
  onUpdate?: (verticals: string[]) => void;
}

export const AgentVerticalSettings: React.FC<AgentVerticalSettingsProps> = ({
  currentVerticals = ["Medicare"],
  onUpdate
}) => {
  const [selectedVerticals, setSelectedVerticals] = useState<string[]>(currentVerticals);
  const { toast } = useToast();

  const handleVerticalToggle = (vertical: string) => {
    const updated = selectedVerticals.includes(vertical)
      ? selectedVerticals.filter(v => v !== vertical)
      : [...selectedVerticals, vertical];
    
    setSelectedVerticals(updated);
  };



  const handleSave = () => {
    onUpdate?.(selectedVerticals);
    toast({
      title: "Verticals Updated", 
      description: `Saved ${selectedVerticals.length} vertical(s)`,
    });
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          Vertical Assignments
        </CardTitle>
        <CardDescription>
          Select which verticals you want to handle calls for. You'll only receive calls from campaigns matching your selected verticals.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-sm font-medium">Available Verticals</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {AVAILABLE_VERTICALS.map((vertical) => (
              <div key={vertical} className="flex items-center space-x-3">
                <Checkbox
                  id={vertical}
                  checked={selectedVerticals.includes(vertical)}
                  onCheckedChange={() => handleVerticalToggle(vertical)}
                />
                <Label 
                  htmlFor={vertical}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {vertical}
                </Label>
                {selectedVerticals.includes(vertical) && (
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Selected Verticals</p>
              <p className="text-xs text-muted-foreground">
                {selectedVerticals.length === 0 
                  ? "No verticals selected - you won't receive any calls"
                  : `${selectedVerticals.length} vertical(s) selected`
                }
              </p>
            </div>
            <div className="flex gap-2">
              {selectedVerticals.map((vertical) => (
                <Badge key={vertical} variant="default" className="text-xs">
                  {vertical}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Vertical Preferences
        </Button>
      </CardContent>
    </Card>
  );
};