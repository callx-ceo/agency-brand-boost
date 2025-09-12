import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface AgentLanguageSettingsProps {
  currentLanguages?: string[];
  onUpdate?: (languages: string[]) => void;
}

export const AgentLanguageSettings: React.FC<AgentLanguageSettingsProps> = ({
  currentLanguages = ["English"],
  onUpdate
}) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(currentLanguages);
  const { toast } = useToast();

  const handleLanguageToggle = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleSave = () => {
    onUpdate?.(selectedLanguages);
    toast({
      title: "Language Skills Updated", 
      description: `Saved ${selectedLanguages.length} language(s)`,
    });
  };

  return (
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
          Save Language Skills
        </Button>
      </CardContent>
    </Card>
  );
};