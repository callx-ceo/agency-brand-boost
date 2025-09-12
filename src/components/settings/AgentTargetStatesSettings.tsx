import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" }
];

interface VerticalTargetStates {
  vertical: string;
  states: string[];
}

interface AgentTargetStatesSettingsProps {
  selectedVerticals: string[];
  currentTargetStates?: VerticalTargetStates[];
  onUpdate?: (targetStates: VerticalTargetStates[]) => void;
}

export const AgentTargetStatesSettings: React.FC<AgentTargetStatesSettingsProps> = ({
  selectedVerticals,
  currentTargetStates = [],
  onUpdate
}) => {
  const [targetStates, setTargetStates] = useState<VerticalTargetStates[]>(() => {
    return selectedVerticals.map(vertical => {
      const existing = currentTargetStates.find(ts => ts.vertical === vertical);
      return {
        vertical,
        states: existing?.states || []
      };
    });
  });

  const [openVerticals, setOpenVerticals] = useState<string[]>(selectedVerticals.slice(0, 1));
  const { toast } = useToast();

  const handleStateToggle = (vertical: string, stateCode: string) => {
    setTargetStates(prev => prev.map(ts => {
      if (ts.vertical === vertical) {
        const newStates = ts.states.includes(stateCode)
          ? ts.states.filter(s => s !== stateCode)
          : [...ts.states, stateCode];
        return { ...ts, states: newStates };
      }
      return ts;
    }));
  };

  const handleSelectAllStates = (vertical: string) => {
    setTargetStates(prev => prev.map(ts => {
      if (ts.vertical === vertical) {
        return { ...ts, states: US_STATES.map(s => s.code) };
      }
      return ts;
    }));
  };

  const handleClearAllStates = (vertical: string) => {
    setTargetStates(prev => prev.map(ts => {
      if (ts.vertical === vertical) {
        return { ...ts, states: [] };
      }
      return ts;
    }));
  };

  const toggleVertical = (vertical: string) => {
    setOpenVerticals(prev => 
      prev.includes(vertical) 
        ? prev.filter(v => v !== vertical)
        : [...prev, vertical]
    );
  };

  const handleSave = () => {
    onUpdate?.(targetStates);
    toast({
      title: "Target States Updated", 
      description: `Updated target states for ${targetStates.length} vertical(s)`,
    });
  };

  if (selectedVerticals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Target States by Vertical
          </CardTitle>
          <CardDescription>
            Configure which states you're licensed to work in for each vertical.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Please select verticals first to configure target states.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Target States by Vertical
        </CardTitle>
        <CardDescription>
          Configure which states you're licensed to work in for each vertical. You'll only receive calls from campaigns in your selected states.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {targetStates.map((verticalStates) => {
            const isOpen = openVerticals.includes(verticalStates.vertical);
            return (
              <Collapsible 
                key={verticalStates.vertical}
                open={isOpen}
                onOpenChange={() => toggleVertical(verticalStates.vertical)}
              >
                <div className="border rounded-lg">
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{verticalStates.vertical}</h3>
                        <Badge variant="outline">
                          {verticalStates.states.length} state{verticalStates.states.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="p-4 pt-0 border-t">
                      <div className="flex gap-2 mb-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSelectAllStates(verticalStates.vertical)}
                        >
                          Select All
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleClearAllStates(verticalStates.vertical)}
                        >
                          Clear All
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {US_STATES.map((state) => (
                          <div key={state.code} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${verticalStates.vertical}-${state.code}`}
                              checked={verticalStates.states.includes(state.code)}
                              onCheckedChange={() => handleStateToggle(verticalStates.vertical, state.code)}
                            />
                            <Label 
                              htmlFor={`${verticalStates.vertical}-${state.code}`}
                              className="text-sm cursor-pointer"
                            >
                              {state.name} ({state.code})
                            </Label>
                          </div>
                        ))}
                      </div>
                      
                      {verticalStates.states.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="text-sm font-medium mb-2">Selected States:</h4>
                          <div className="flex flex-wrap gap-1">
                            {verticalStates.states.map(stateCode => {
                              const state = US_STATES.find(s => s.code === stateCode);
                              return (
                                <Badge key={stateCode} variant="secondary" className="text-xs">
                                  {state?.name} ({stateCode})
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>

        <div className="pt-4 border-t">
          <div className="mb-4">
            <h4 className="font-medium mb-2">Summary</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              {targetStates.map(vs => (
                <div key={vs.vertical} className="flex justify-between">
                  <span>{vs.vertical}:</span>
                  <span>{vs.states.length} state{vs.states.length !== 1 ? 's' : ''}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Target States
        </Button>
      </CardContent>
    </Card>
  );
};