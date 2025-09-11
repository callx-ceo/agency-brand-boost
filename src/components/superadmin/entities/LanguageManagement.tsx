import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Globe, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Language {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  campaignCount: number;
  agentCount: number;
  createdAt: string;
}

const INITIAL_LANGUAGES: Language[] = [
  { id: '1', name: 'English', code: 'en', isActive: true, campaignCount: 45, agentCount: 120, createdAt: '2024-01-01' },
  { id: '2', name: 'Spanish', code: 'es', isActive: true, campaignCount: 28, agentCount: 85, createdAt: '2024-01-01' },
  { id: '3', name: 'French', code: 'fr', isActive: true, campaignCount: 12, agentCount: 34, createdAt: '2024-01-01' },
  { id: '4', name: 'Portuguese', code: 'pt', isActive: true, campaignCount: 8, agentCount: 22, createdAt: '2024-01-01' },
  { id: '5', name: 'Mandarin', code: 'zh', isActive: true, campaignCount: 15, agentCount: 28, createdAt: '2024-01-01' },
  { id: '6', name: 'Cantonese', code: 'yue', isActive: true, campaignCount: 6, agentCount: 12, createdAt: '2024-01-01' },
  { id: '7', name: 'Korean', code: 'ko', isActive: true, campaignCount: 9, agentCount: 18, createdAt: '2024-01-01' },
  { id: '8', name: 'Vietnamese', code: 'vi', isActive: true, campaignCount: 11, agentCount: 25, createdAt: '2024-01-01' },
  { id: '9', name: 'Arabic', code: 'ar', isActive: true, campaignCount: 7, agentCount: 16, createdAt: '2024-01-01' },
  { id: '10', name: 'Hindi', code: 'hi', isActive: true, campaignCount: 4, agentCount: 14, createdAt: '2024-01-01' },
];

export const LanguageManagement: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>(INITIAL_LANGUAGES);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
  const [newLanguage, setNewLanguage] = useState({ name: '', code: '' });
  const { toast } = useToast();

  const handleAddLanguage = () => {
    if (!newLanguage.name.trim() || !newLanguage.code.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide both language name and code",
        variant: "destructive"
      });
      return;
    }

    const language: Language = {
      id: Date.now().toString(),
      name: newLanguage.name.trim(),
      code: newLanguage.code.trim().toLowerCase(),
      isActive: true,
      campaignCount: 0,
      agentCount: 0,
      createdAt: new Date().toISOString()
    };

    setLanguages([...languages, language]);
    setNewLanguage({ name: '', code: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Language Added",
      description: `${language.name} has been added successfully`
    });
  };

  const handleEditLanguage = (language: Language) => {
    if (!language.name.trim() || !language.code.trim()) {
      toast({
        title: "Validation Error", 
        description: "Please provide both language name and code",
        variant: "destructive"
      });
      return;
    }

    setLanguages(languages.map(l => 
      l.id === language.id 
        ? { ...language, name: language.name.trim(), code: language.code.trim().toLowerCase() }
        : l
    ));
    setEditingLanguage(null);
    
    toast({
      title: "Language Updated",
      description: `${language.name} has been updated successfully`
    });
  };

  const handleToggleStatus = (id: string) => {
    const language = languages.find(l => l.id === id);
    if (!language) return;

    if (language.campaignCount > 0 && language.isActive) {
      toast({
        title: "Cannot Deactivate",
        description: `${language.name} is currently used in ${language.campaignCount} campaign(s)`,
        variant: "destructive"
      });
      return;
    }

    setLanguages(languages.map(l => 
      l.id === id ? { ...l, isActive: !l.isActive } : l
    ));
    
    toast({
      title: `Language ${language.isActive ? 'Deactivated' : 'Activated'}`,
      description: `${language.name} has been ${language.isActive ? 'deactivated' : 'activated'}`
    });
  };

  const handleDeleteLanguage = (id: string) => {
    const language = languages.find(l => l.id === id);
    if (!language) return;

    if (language.campaignCount > 0 || language.agentCount > 0) {
      toast({
        title: "Cannot Delete",
        description: `${language.name} is currently in use by campaigns or agents`,
        variant: "destructive"
      });
      return;
    }

    setLanguages(languages.filter(l => l.id !== id));
    toast({
      title: "Language Deleted",
      description: `${language.name} has been deleted successfully`
    });
  };

  const totalActiveLanguages = languages.filter(l => l.isActive).length;
  const totalCampaigns = languages.reduce((sum, l) => sum + l.campaignCount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Language Management</h1>
          <p className="text-muted-foreground">
            Manage available languages for campaigns and agent assignments
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Language
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Language</DialogTitle>
              <DialogDescription>
                Add a new language option for campaigns and agents
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="languageName">Language Name</Label>
                <Input
                  id="languageName"
                  value={newLanguage.name}
                  onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
                  placeholder="e.g., Italian"
                />
              </div>
              <div>
                <Label htmlFor="languageCode">Language Code</Label>
                <Input
                  id="languageCode"
                  value={newLanguage.code}
                  onChange={(e) => setNewLanguage({ ...newLanguage, code: e.target.value })}
                  placeholder="e.g., it"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddLanguage}>Add Language</Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Languages</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{languages.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Languages</CardTitle>
            <Check className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActiveLanguages}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCampaigns}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{languages.reduce((sum, l) => sum + l.agentCount, 0)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Languages Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Languages</CardTitle>
          <CardDescription>
            Manage language availability and view usage statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {languages.map((language) => (
              <div key={language.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    {editingLanguage?.id === language.id ? (
                      <div className="flex gap-2">
                        <Input
                          value={editingLanguage.name}
                          onChange={(e) => setEditingLanguage({ ...editingLanguage, name: e.target.value })}
                          className="w-32"
                        />
                        <Input
                          value={editingLanguage.code}
                          onChange={(e) => setEditingLanguage({ ...editingLanguage, code: e.target.value })}
                          className="w-20"
                          placeholder="Code"
                        />
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-medium">{language.name}</h3>
                        <p className="text-sm text-muted-foreground">Code: {language.code}</p>
                      </div>
                    )}
                  </div>
                  <Badge variant={language.isActive ? "default" : "secondary"}>
                    {language.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{language.campaignCount}</span> campaigns
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{language.agentCount}</span> agents
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {editingLanguage?.id === language.id ? (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditLanguage(editingLanguage)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingLanguage(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingLanguage(language)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(language.id)}
                        >
                          {language.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={language.campaignCount > 0 || language.agentCount > 0}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Language</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{language.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteLanguage(language.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};