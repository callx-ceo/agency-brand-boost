import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  X, 
  Edit3, 
  Zap, 
  Mail, 
  Phone, 
  FileText, 
  Calendar,
  Save,
  Undo2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RecommendedAction {
  id: string;
  title: string;
  type: 'email' | 'call' | 'document' | 'calendar';
  priority: 'high' | 'medium' | 'low';
  description: string;
  fullContext: string;
  estimatedTime: string;
  impact: string;
}

const RecommendedActions = () => {
  const { toast } = useToast();
  const [actions, setActions] = useState<RecommendedAction[]>([
    {
      id: '1',
      title: 'Send follow-up email to Josh Baker',
      type: 'email',
      priority: 'high',
      description: 'Follow up on life insurance quote discussion',
      fullContext: `Subject: Follow-up on Your Life Insurance Quote

Hi Josh,

I hope this email finds you well. I wanted to follow up on our conversation yesterday regarding your life insurance needs for your growing family.

Based on our discussion, I've prepared a customized quote that includes:
- $500,000 term life insurance policy
- 20-year level premium guarantee
- Competitive monthly premium of $45

This policy would provide excellent protection for your family while fitting comfortably within your budget. The application process is straightforward and can be completed online in about 15 minutes.

Would you like to schedule a brief 10-minute call this week to review the details and answer any questions you might have?

Best regards,
Alex`,
      estimatedTime: '2 min',
      impact: 'High conversion probability'
    },
    {
      id: '2', 
      title: 'Schedule callback with Sarah Johnson',
      type: 'calendar',
      priority: 'high',
      description: 'Hot lead requested callback for policy review',
      fullContext: `Calendar Invitation Details:

Meeting: Life Insurance Policy Review
Duration: 30 minutes
Suggested Times: 
- Tomorrow 2:00 PM - 3:00 PM
- Thursday 10:00 AM - 11:00 AM  
- Friday 3:00 PM - 4:00 PM

Agenda:
- Review current coverage gaps
- Discuss family protection goals
- Present customized policy options
- Address any concerns or questions

Notes: Sarah mentioned she's particularly interested in term life insurance with conversion options. She has a $200K mortgage and two young children.`,
      estimatedTime: '1 min',
      impact: 'Prevent lead from going cold'
    },
    {
      id: '3',
      title: 'Create proposal document for Mike Davis',
      type: 'document', 
      priority: 'medium',
      description: 'Generate comprehensive insurance proposal',
      fullContext: `Proposal Document Outline:

Client: Mike Davis, Age 35
Occupation: Software Engineer
Family: Married, 1 child (age 3)

Coverage Recommendations:
1. Term Life Insurance: $750,000 (20-year term)
   - Monthly Premium: $68
   - Covers mortgage + education + income replacement

2. Disability Insurance: $4,000/month benefit
   - Monthly Premium: $92
   - Protects 60% of current income

Key Benefits:
- Comprehensive family protection
- Affordable premium structure
- Flexible conversion options
- A+ rated insurance carrier

Next Steps:
- Review proposal details
- Complete health questionnaire
- Schedule medical exam if needed`,
      estimatedTime: '5 min',
      impact: 'Professional presentation increases close rate'
    }
  ]);

  const [expandedActions, setExpandedActions] = useState<Set<string>>(new Set());
  const [editingActions, setEditingActions] = useState<Set<string>>(new Set());
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});

  const toggleExpanded = (actionId: string) => {
    const newExpanded = new Set(expandedActions);
    if (newExpanded.has(actionId)) {
      newExpanded.delete(actionId);
    } else {
      newExpanded.add(actionId);
    }
    setExpandedActions(newExpanded);
  };

  const handleAccept = (action: RecommendedAction) => {
    toast({
      title: "Action Executed",
      description: `${action.title} has been completed successfully.`,
      duration: 3000,
    });
    
    // Remove the action from the list
    setActions(actions.filter(a => a.id !== action.id));
  };

  const handleDismiss = (actionId: string) => {
    setActions(actions.filter(a => a.id !== actionId));
    toast({
      title: "Action Dismissed", 
      description: "The recommendation has been removed.",
      duration: 2000,
    });
  };

  const handleEdit = (actionId: string) => {
    const action = actions.find(a => a.id === actionId);
    if (action) {
      setEditedContent({ ...editedContent, [actionId]: action.fullContext });
      setEditingActions(new Set([...editingActions, actionId]));
    }
  };

  const handleSaveEdit = (actionId: string) => {
    const newContent = editedContent[actionId];
    if (newContent) {
      setActions(actions.map(action => 
        action.id === actionId 
          ? { ...action, fullContext: newContent }
          : action
      ));
    }
    
    const newEditing = new Set(editingActions);
    newEditing.delete(actionId);
    setEditingActions(newEditing);
    
    toast({
      title: "Changes Saved",
      description: "The action content has been updated.",
      duration: 2000,
    });
  };

  const handleCancelEdit = (actionId: string) => {
    const newEditing = new Set(editingActions);
    newEditing.delete(actionId);
    setEditingActions(newEditing);
    
    // Remove the edited content
    const newEditedContent = { ...editedContent };
    delete newEditedContent[actionId];
    setEditedContent(newEditedContent);
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'call': return <Phone className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'calendar': return <Calendar className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (actions.length === 0) {
    return (
      <Card className="border-0 shadow-apple-lg bg-card/80 backdrop-blur-sm animate-slide-in">
        <CardContent className="p-8 text-center">
          <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No recommendations at the moment. Check back soon!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-apple-lg bg-card/80 backdrop-blur-sm animate-slide-in">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-primary text-white">
            <Zap className="w-5 h-5" />
          </div>
          Recommended One-Click Optimizations
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0">
            {actions.length} pending
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action) => {
          const isExpanded = expandedActions.has(action.id);
          const isEditing = editingActions.has(action.id);
          
          return (
            <div 
              key={action.id}
              className="border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-200 bg-background"
            >
              {/* Action Header */}
              <div className="p-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-secondary text-primary">
                    {getActionIcon(action.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground mb-1">{action.title}</h4>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <Badge className={`${getPriorityColor(action.priority)} border`}>
                    {action.priority}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>⏱️ {action.estimatedTime}</span>
                    <span>📈 {action.impact}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => toggleExpanded(action.id)}
                      className="rounded-full border-border hover:border-primary/20"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      {isExpanded ? 'Collapse' : 'Expand'}
                    </Button>
                    
                    <Button 
                      size="sm" 
                      onClick={() => handleAccept(action)}
                      className="bg-gradient-success border-0 rounded-full text-white hover:opacity-90"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDismiss(action.id)}
                      className="rounded-full border-border hover:border-destructive/20 hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-border bg-muted/30 p-4 animate-fade-in">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-foreground">Full Context</h5>
                    {!isEditing && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleEdit(action.id)}
                        className="rounded-full border-border hover:border-primary/20"
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-3">
                      <Textarea 
                        value={editedContent[action.id] || action.fullContext}
                        onChange={(e) => setEditedContent({
                          ...editedContent, 
                          [action.id]: e.target.value
                        })}
                        rows={8}
                        className="font-mono text-sm resize-none border-border focus:border-primary/20"
                      />
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleSaveEdit(action.id)}
                          className="bg-gradient-primary border-0 rounded-full text-white"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          Save Changes
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleCancelEdit(action.id)}
                          className="rounded-full border-border"
                        >
                          <Undo2 className="w-4 h-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-background rounded-xl p-4 border border-border">
                      <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                        {action.fullContext}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RecommendedActions;