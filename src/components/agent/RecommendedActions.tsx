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
      <Card className="border-0 shadow-apple-lg bg-gradient-card backdrop-blur-sm animate-slide-in rounded-3xl">
        <CardContent className="p-12 text-center">
          <Zap className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-foreground mb-2">All Caught Up!</h3>
          <p className="text-lg text-muted-foreground">No recommendations at the moment. Check back soon!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-apple-lg bg-gradient-card backdrop-blur-sm animate-slide-in rounded-3xl overflow-hidden">
      <CardHeader className="pb-6 pt-8 px-8">
        <CardTitle className="text-3xl font-bold flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-primary text-white shadow-apple-md">
            <Zap className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <div className="text-foreground mb-1">Recommended Actions</div>
            <div className="text-lg font-normal text-muted-foreground">One-click optimizations powered by AI</div>
          </div>
          <Badge variant="secondary" className="bg-gradient-soft text-primary border-0 px-4 py-2 text-base font-semibold rounded-2xl">
            {actions.length} pending
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 px-8 pb-8">
        {actions.map((action, index) => {
          const isExpanded = expandedActions.has(action.id);
          const isEditing = editingActions.has(action.id);
          
          return (
            <div 
              key={action.id}
              className={`border border-border rounded-3xl overflow-hidden hover:border-primary/20 transition-all duration-500 bg-gradient-soft hover:shadow-apple-md hover:-translate-y-1 animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Action Header */}
              <div className="p-6">
                <div className="flex items-center gap-5 mb-4">
                  <div className="p-3 rounded-2xl bg-gradient-secondary text-primary shadow-apple-sm">
                    {getActionIcon(action.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-foreground mb-2">{action.title}</h4>
                    <p className="text-base text-muted-foreground">{action.description}</p>
                  </div>
                  <Badge className={`${getPriorityColor(action.priority)} border`}>
                    {action.priority}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-base text-muted-foreground">
                    <span className="flex items-center gap-2">
                      ⏱️ <span className="font-medium">{action.estimatedTime}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      📈 <span className="font-medium">{action.impact}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      onClick={() => toggleExpanded(action.id)}
                      className="rounded-2xl border-border hover:border-primary/20 px-6 py-3 text-base font-medium"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5 mr-2" /> : <ChevronDown className="w-5 h-5 mr-2" />}
                      {isExpanded ? 'Collapse' : 'Expand'}
                    </Button>
                    
                    <Button 
                      size="lg" 
                      onClick={() => handleAccept(action)}
                      className="bg-gradient-success border-0 rounded-2xl text-white hover:opacity-90 px-8 py-3 text-base font-semibold shadow-apple-md"
                    >
                      <Check className="w-5 h-5 mr-2" />
                      Accept
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline" 
                      onClick={() => handleDismiss(action.id)}
                      className="rounded-2xl border-border hover:border-destructive/20 hover:text-destructive px-4 py-3"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-border bg-gradient-soft p-6 animate-slide-in">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold text-foreground">Full Context</h5>
                    {!isEditing && (
                      <Button 
                        size="lg" 
                        variant="outline" 
                        onClick={() => handleEdit(action.id)}
                        className="rounded-2xl border-border hover:border-primary/20 px-6 py-3 text-base font-medium"
                      >
                        <Edit3 className="w-5 h-5 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-4">
                      <Textarea 
                        value={editedContent[action.id] || action.fullContext}
                        onChange={(e) => setEditedContent({
                          ...editedContent, 
                          [action.id]: e.target.value
                        })}
                        rows={10}
                        className="font-mono text-base resize-none border-border focus:border-primary/20 rounded-2xl p-4"
                      />
                      <div className="flex gap-3">
                        <Button
                          size="lg" 
                          onClick={() => handleSaveEdit(action.id)}
                          className="bg-gradient-primary border-0 rounded-2xl text-white px-6 py-3 text-base font-semibold"
                        >
                          <Save className="w-5 h-5 mr-2" />
                          Save Changes
                        </Button>
                        <Button 
                          size="lg" 
                          variant="outline" 
                          onClick={() => handleCancelEdit(action.id)}
                          className="rounded-2xl border-border px-6 py-3 text-base font-medium"
                        >
                          <Undo2 className="w-5 h-5 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-background rounded-2xl p-6 border border-border shadow-apple-sm">
                      <pre className="text-base text-foreground whitespace-pre-wrap font-mono leading-relaxed">
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