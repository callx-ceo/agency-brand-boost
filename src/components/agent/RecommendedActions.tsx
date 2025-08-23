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
  const [showAll, setShowAll] = useState(false);
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

Based on our discussion, I have prepared a customized quote that includes:
- $500,000 term life insurance policy
- 20-year level premium guarantee
- Competitive monthly premium of $45

This policy would provide excellent protection for your family while fitting comfortably within your budget. The application process is straightforward and can be completed online in about 15 minutes.

Would you like to schedule a brief 10-minute call this week to review the details and answer any questions you might have?

Best regards,
Alex

P.S. I have also attached a comparison chart showing how this policy stacks up against competitors - you will see we are offering exceptional value.`,
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

Meeting: Life Insurance Policy Review with Sarah Johnson
Duration: 30 minutes
Attendees: sarah.johnson@techcorp.com, alex@insuranceagency.com

Suggested Times: 
- Tomorrow 2:00 PM - 2:30 PM
- Thursday 10:00 AM - 10:30 AM  
- Friday 3:00 PM - 3:30 PM

Meeting Agenda:
- Review current coverage gaps
- Discuss family protection goals  
- Present customized policy options
- Address any concerns or questions
- Next steps and timeline

Pre-meeting Preparation:
- Current policy documents (if any)
- Family financial overview
- Protection goals discussion

Notes: Sarah mentioned she is particularly interested in term life insurance with conversion options. She has a $200K mortgage and two young children (ages 3 and 5). Current employer provides basic $50K coverage.

Meeting Link: https://meet.google.com/abc-defg-hij`,
      estimatedTime: '1 min',
      impact: 'Prevent lead from going cold'
    },
    {
      id: '3',
      title: 'Send text message to Mike Davis',
      type: 'call',
      priority: 'medium',
      description: 'Quick SMS follow-up on missed call',
      fullContext: `Text Message to: (555) 123-4567

Hi Mike! This is Alex from SecureLife Insurance. I tried calling you earlier about your life insurance inquiry. 

I have some great news - I found a policy that could save you $30/month compared to your current plan while increasing your coverage by $100K! 

When would be a good time for a quick 10-minute call? I can work around your schedule.

Reply STOP to opt out.

Best,
Alex
SecureLife Insurance
(555) 987-6543`,
      estimatedTime: '30 sec',
      impact: 'Immediate engagement opportunity'
    },
    {
      id: '4',
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
    },
    {
      id: '5',
      title: 'Send birthday email to Jennifer Walsh',
      type: 'email',
      priority: 'low',
      description: 'Personal touch birthday follow-up',
      fullContext: `Subject: Happy Birthday Jennifer! 🎂

Dear Jennifer,

Happy Birthday! I hope you are having a wonderful day celebrating with family and friends.

As you start another year, it might be a perfect time to review your life insurance coverage to ensure your family continues to be protected as your life evolves.

I would love to schedule a brief call to discuss any changes in your coverage needs. Plus, I have some exciting new policy options that might save you money!

Enjoy your special day!

Warm regards,
Alex
SecureLife Insurance

P.S. I will send you a small gift card as a birthday surprise!`,
      estimatedTime: '2 min',
      impact: 'Strengthen client relationship'
    },
    {
      id: '6',
      title: 'Text reminder to Robert Chen',
      type: 'call',
      priority: 'medium',
      description: 'Policy renewal due in 30 days',
      fullContext: `Text Message to: (555) 456-7890

Hi Robert! This is Alex from SecureLife Insurance. 

Your term life policy is up for renewal in 30 days. The good news? Your rates are still locked in!

However, I found a NEW policy that could increase your coverage by 25% at the SAME price. 

Can we chat for 5 minutes this week? I think you will love what I found.

Best,
Alex
(555) 987-6543`,
      estimatedTime: '30 sec',
      impact: 'Prevent policy lapse'
    },
    {
      id: '7',
      title: 'Email quote comparison to Lisa Martinez',
      type: 'email',
      priority: 'high',
      description: 'Competitive analysis vs current provider',
      fullContext: `Subject: You Could Save $840/Year on Life Insurance

Hi Lisa,

I completed the analysis you requested comparing your current MetLife policy to our SecureLife options.

The results are impressive:

Current MetLife Policy:
- $250,000 coverage
- $95/month ($1,140/year)
- Limited conversion options

Our Recommended Policy:
- $300,000 coverage (20% more!)
- $25/month ($300/year)
- Full conversion privileges
- A+ rated carrier

Annual Savings: $840
Increased Coverage: $50,000

This analysis is valid for 30 days. Would you like to lock in these savings with a quick call this week?

Best regards,
Alex`,
      estimatedTime: '3 min',
      impact: 'Strong value proposition for conversion'
    },
    {
      id: '8',
      title: 'Text check-in to David Kim',
      type: 'call',
      priority: 'low',
      description: 'Post-application status update',
      fullContext: `Text Message to: (555) 789-0123

Hi David! 

Great news! Your life insurance application was approved and your policy is now ACTIVE! 🎉

Your first premium will be auto-drafted on the 15th as requested. 

You should receive your policy documents via email within 24 hours. Please review and let me know if you have any questions.

Thanks for choosing SecureLife!

Alex
(555) 987-6543`,
      estimatedTime: '1 min',
      impact: 'Excellent customer service touchpoint'
    },
    {
      id: '9',
      title: 'Send referral request to Amanda Foster',
      type: 'email',
      priority: 'medium',
      description: 'Happy client referral opportunity',
      fullContext: `Subject: Could You Help a Friend Save on Life Insurance?

Hi Amanda,

I hope you and your family are doing wonderful! It has been 6 months since we set up your life insurance policy, and I wanted to check in.

Since you have been so happy with your coverage and savings, I was wondering if you might know anyone who could benefit from our services?

For every friend or family member you refer who gets a quote, I will send you a $50 Amazon gift card. If they purchase a policy, you will receive an additional $100 gift card!

There is no limit to how many people you can refer. Some of my best clients have earned over $500 in gift cards!

Would you like me to send you some referral cards to share?

Best regards,
Alex`,
      estimatedTime: '2 min',
      impact: 'Potential for multiple new leads'
    },
    {
      id: '10',
      title: 'Text appointment reminder to Susan Wilson',
      type: 'call',
      priority: 'high',
      description: 'Tomorrow appointment confirmation',
      fullContext: `Text Message to: (555) 234-5678

Hi Susan!

This is Alex from SecureLife Insurance. Just confirming our appointment tomorrow (Thursday) at 2:00 PM to review your life insurance options.

We will be meeting at:
Starbucks on Main Street
123 Main St, Downtown

I will have all your customized quotes ready to review. This should take about 30 minutes.

Please reply Y to confirm or call me if you need to reschedule.

Looking forward to seeing you!

Alex
(555) 987-6543`,
      estimatedTime: '1 min',
      impact: 'Reduce no-shows by 60%'
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
    // Simulate different actions based on type
    switch (action.type) {
      case 'email':
        // Simulate opening email client with pre-filled content
        const emailSubject = action.fullContext.split('\n')[0].replace('Subject: ', '');
        const emailBody = action.fullContext.split('\n').slice(2).join('\n');
        const emailRecipient = action.title.includes('Josh') ? 'josh.baker@example.com' : 
                              action.title.includes('Jennifer') ? 'jennifer.walsh@example.com' :
                              action.title.includes('Lisa') ? 'lisa.martinez@example.com' :
                              action.title.includes('Amanda') ? 'amanda.foster@example.com' :
                              'contact@example.com';
        const mailtoLink = `mailto:${emailRecipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(mailtoLink, '_blank');
        
        toast({
          title: "Email Draft Opened",
          description: `Email client opened with pre-filled message for ${emailRecipient}.`,
          duration: 4000,
        });
        break;
      case 'call':
        // Simulate SMS/text message actions
        const phoneNumber = action.fullContext.match(/\(\d{3}\) \d{3}-\d{4}/)?.[0] || '(555) 123-4567';
        const smsBody = action.fullContext.split('\n').slice(2).join('\n').replace(/Reply STOP.*\n?/g, '');
        const smsLink = `sms:${phoneNumber.replace(/\D/g, '')}?body=${encodeURIComponent(smsBody)}`;
        
        // Try to open SMS app (works on mobile)
        window.open(smsLink, '_blank');
        
        toast({
          title: "SMS App Opened",
          description: `Text message app opened with pre-filled message for ${phoneNumber}.`,
          duration: 4000,
        });
        break;
        
      case 'calendar':
        // Simulate opening calendar with meeting details
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 1); // Tomorrow
        startDate.setHours(14, 0, 0, 0); // 2 PM
        
        const endDate = new Date(startDate);
        endDate.setMinutes(endDate.getMinutes() + 30);
        
        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Life Insurance Policy Review with Sarah Johnson')}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(action.fullContext)}&location=Conference%20Call`;
        
        window.open(calendarUrl, '_blank');
        
        toast({
          title: "Calendar Event Created",
          description: "Google Calendar opened with meeting details. Contact will receive an invitation once you save the event.",
          duration: 4000,
        });
        break;
        
      case 'document':
        // Simulate document generation
        toast({
          title: "Proposal Generated",
          description: "Insurance proposal document has been generated and saved to your documents folder. You can now send it to Mike Davis.",
          duration: 4000,
        });
        
        // Simulate file download
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(action.fullContext);
          link.download = 'Mike_Davis_Insurance_Proposal.txt';
          link.click();
        }, 1000);
        break;
        
      default:
        toast({
          title: "Action Executed",
          description: `${action.title} has been completed successfully.`,
          duration: 3000,
        });
    }
    
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

  // Show first 3 items by default, all items when showAll is true
  const visibleActions = showAll ? actions : actions.slice(0, 3);
  const hasMoreActions = actions.length > 3;

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
            {actions.length} total {showAll ? '' : `(showing ${visibleActions.length})`}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 px-8 pb-8">
        {visibleActions.map((action, index) => {
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
                      className="rounded-2xl border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 px-6 py-3 text-base font-semibold text-primary"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5 mr-2" /> : <ChevronDown className="w-5 h-5 mr-2" />}
                      {isExpanded ? 'Collapse' : 'Expand'}
                    </Button>
                    
                    <Button 
                      size="lg" 
                      onClick={() => handleAccept(action)}
                      className="bg-green-600 hover:bg-green-700 border-0 rounded-2xl text-white hover:opacity-95 px-8 py-3 text-base font-bold shadow-apple-md transition-all duration-200"
                    >
                      <Check className="w-5 h-5 mr-2" />
                      Accept
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline" 
                      onClick={() => handleDismiss(action.id)}
                      className="rounded-2xl border-2 border-red-300 hover:border-red-400 hover:bg-red-50 text-red-600 hover:text-red-700 px-4 py-3 font-semibold"
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
                        className="rounded-2xl border-2 border-blue-300 hover:border-blue-400 hover:bg-blue-50 text-blue-600 hover:text-blue-700 px-6 py-3 text-base font-semibold"
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
                          className="bg-blue-600 hover:bg-blue-700 border-0 rounded-2xl text-white px-6 py-3 text-base font-bold"
                        >
                          <Save className="w-5 h-5 mr-2" />
                          Save Changes
                        </Button>
                        <Button 
                          size="lg" 
                          variant="outline" 
                          onClick={() => handleCancelEdit(action.id)}
                          className="rounded-2xl border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-600 hover:text-gray-700 px-6 py-3 text-base font-semibold"
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
        
        {/* Show More/Less Button */}
        {hasMoreActions && (
          <div className="pt-4 text-center border-t border-border">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="rounded-2xl border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 px-8 py-3 text-base font-semibold text-primary"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-5 h-5 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5 mr-2" />
                  Show {actions.length - 3} More Optimizations
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendedActions;