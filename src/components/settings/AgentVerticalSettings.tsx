import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Globe, CheckCircle2 } from 'lucide-react';
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

const AVAILABLE_LANGUAGES = [
  "English",
  "Spanish",
  "French", 
  "Portuguese",
  "Mandarin",
  "Cantonese",
  "Korean",
  "Vietnamese",
  "Arabic",
  "Hindi"
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
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["English"]);
  const { toast } = useToast();

  const handleVerticalToggle = (vertical: string) => {
    const updated = selectedVerticals.includes(vertical)
      ? selectedVerticals.filter(v => v !== vertical)
      : [...selectedVerticals, vertical];
    
    setSelectedVerticals(updated);
  };

  const handleLanguageToggle = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };


  const handleSave = () => {
    onUpdate?.(selectedVerticals);
    toast({
      title: "Settings Updated", 
      description: `Saved ${selectedVerticals.length} verticals and ${selectedLanguages.length} languages`,
    });
  };


  return (
    <div className="space-y-6">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Language Skills
          </CardTitle>
          <CardDescription>
            Select the languages you can communicate in. This determines which campaigns you'll receive calls from.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {AVAILABLE_LANGUAGES.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={language}
                  checked={selectedLanguages.includes(language)}
                  onCheckedChange={() => handleLanguageToggle(language)}
                />
                <Label 
                  htmlFor={language} 
                  className={`cursor-pointer ${selectedLanguages.includes(language) ? 'font-medium' : ''}`}
                >
                  {language}
                </Label>
              </div>
            ))}
          </div>
          
          {selectedLanguages.length > 0 && (
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Selected Languages:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedLanguages.map(language => (
                  <Badge key={language} variant="default">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button onClick={handleSave} className="w-full">
            Save Language & Vertical Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};