import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

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

interface AgentLanguagePickerProps {
  selectedLanguages: string[];
  onLanguageChange: (languages: string[]) => void;
}

export const AgentLanguagePicker: React.FC<AgentLanguagePickerProps> = ({
  selectedLanguages,
  onLanguageChange
}) => {
  const handleLanguageToggle = (language: string) => {
    if (selectedLanguages.includes(language)) {
      onLanguageChange(selectedLanguages.filter(l => l !== language));
    } else {
      onLanguageChange([...selectedLanguages, language]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium">Language Skills</Label>
        <p className="text-xs text-muted-foreground mt-1">
          Select the languages you can communicate in for campaign routing.
        </p>
      </div>
      
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
    </div>
  );
};