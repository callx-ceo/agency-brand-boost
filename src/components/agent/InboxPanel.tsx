import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  Clock,
  ChevronRight,
  Inbox,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  MoreHorizontal
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InboundMessage {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  type: 'email' | 'sms' | 'call';
  subject?: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  responseToAction?: string; // References the original action that triggered this response
}

const InboxPanel = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<InboundMessage[]>([
    {
      id: '1',
      customerName: 'Josh Baker',
      customerEmail: 'josh.baker@example.com',
      type: 'email',
      subject: 'Re: Follow-up on Your Life Insurance Quote',
      message: 'Hi Alex, thanks for the follow-up! The quote looks great. I have a few questions about the 20-year term and what happens at the end. Also, my wife wants to know if we can get a joint policy instead? When would be a good time to discuss this week?',
      timestamp: '2 hours ago',
      isRead: false,
      priority: 'high',
      responseToAction: 'Send follow-up email to Josh Baker'
    },
    {
      id: '2',
      customerName: 'Mike Davis',
      customerPhone: '(555) 123-4567',
      type: 'sms',
      message: 'Hey Alex! Got your text. That sounds amazing - saving $30/month AND more coverage? Yes please! I can do a call tomorrow around 3pm or Thursday morning. Let me know what works!',
      timestamp: '4 hours ago',
      isRead: false,
      priority: 'high',
      responseToAction: 'Send text message to Mike Davis'
    },
    {
      id: '3',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.johnson@techcorp.com',
      type: 'email',
      subject: 'Re: Calendar Invitation - Life Insurance Policy Review',
      message: 'Hi Alex, I received the calendar invite. Thursday at 10 AM works perfectly for me. I have my current policy documents ready to review. Looking forward to discussing the conversion options you mentioned.',
      timestamp: '6 hours ago',
      isRead: true,
      priority: 'medium',
      responseToAction: 'Schedule callback with Sarah Johnson'
    },
    {
      id: '4',
      customerName: 'Robert Chen',
      customerPhone: '(555) 456-7890',
      type: 'sms',
      message: 'Thanks for the heads up about renewal! Same price for 25% more coverage sounds too good to be true 😄 Can you call me Friday afternoon? I want to hear the details.',
      timestamp: '1 day ago',
      isRead: true,
      priority: 'medium',
      responseToAction: 'Text reminder to Robert Chen'
    },
    {
      id: '5',
      customerName: 'Lisa Martinez',
      customerEmail: 'lisa.martinez@example.com',
      type: 'email',
      subject: 'Re: You Could Save $840/Year on Life Insurance',
      message: 'Alex, this comparison is eye-opening! I had no idea I was overpaying so much. The $840 savings would really help our family budget. What do I need to do to switch? Is there any waiting period or medical exam required?',
      timestamp: '1 day ago',
      isRead: false,
      priority: 'high',
      responseToAction: 'Email quote comparison to Lisa Martinez'
    },
    {
      id: '6',
      customerName: 'Susan Wilson',
      customerPhone: '(555) 234-5678',
      type: 'sms',
      message: 'Y - confirmed for tomorrow at 2pm! See you at Starbucks on Main Street. Thanks for the reminder 👍',
      timestamp: '1 day ago',
      isRead: true,
      priority: 'low',
      responseToAction: 'Text appointment reminder to Susan Wilson'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');

  const handleMarkAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
  };

  const handleReply = (message: InboundMessage) => {
    if (message.type === 'email') {
      const replySubject = `Re: ${message.subject}`;
      const mailtoLink = `mailto:${message.customerEmail}?subject=${encodeURIComponent(replySubject)}`;
      window.open(mailtoLink, '_blank');
      
      toast({
        title: "Reply Opened",
        description: `Email client opened to reply to ${message.customerName}.`,
        duration: 3000,
      });
    } else if (message.type === 'sms') {
      const smsLink = `sms:${message.customerPhone?.replace(/\D/g, '')}`;
      window.open(smsLink, '_blank');
      
      toast({
        title: "SMS Reply Opened",
        description: `Text message app opened to reply to ${message.customerName}.`,
        duration: 3000,
      });
    }
    
    handleMarkAsRead(message.id);
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms': return <MessageCircle className="w-4 h-4" />;
      case 'call': return <Phone className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
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

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.isRead;
    if (filter === 'high') return msg.priority === 'high';
    return true;
  });

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  return (
    <Card className="border-0 shadow-apple-lg bg-gradient-card backdrop-blur-sm animate-slide-in rounded-3xl overflow-hidden">
      <CardHeader className="pb-6 pt-8 px-8">
        <CardTitle className="text-3xl font-bold flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-green-600 text-white shadow-apple-md">
            <Inbox className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <div className="text-foreground mb-1">Customer Inbox</div>
            <div className="text-lg font-normal text-muted-foreground">Inbound messages and responses</div>
          </div>
          <Badge variant="secondary" className="bg-gradient-soft text-primary border-0 px-4 py-2 text-base font-semibold rounded-2xl">
            {unreadCount} unread
          </Badge>
        </CardTitle>
        
        {/* Filter Buttons */}
        <div className="flex gap-3 mt-4">
          <Button
            size="sm"
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="rounded-full"
          >
            All ({messages.length})
          </Button>
          <Button
            size="sm"
            variant={filter === 'unread' ? 'default' : 'outline'}
            onClick={() => setFilter('unread')}
            className="rounded-full"
          >
            Unread ({unreadCount})
          </Button>
          <Button
            size="sm"
            variant={filter === 'high' ? 'default' : 'outline'}
            onClick={() => setFilter('high')}
            className="rounded-full"
          >
            High Priority
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="px-8 pb-8">
        <div className="space-y-4">
          {filteredMessages.map((message, index) => (
            <div 
              key={message.id}
              className={`border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-300 hover:shadow-apple-md hover:-translate-y-1 ${
                !message.isRead ? 'bg-blue-50 border-blue-200' : 'bg-background'
              } animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                      {message.customerName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className={`font-bold text-foreground ${!message.isRead ? 'text-blue-700' : ''}`}>
                        {message.customerName}
                      </h4>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="p-1 rounded bg-blue-100 text-blue-700">
                          {getMessageIcon(message.type)}
                        </div>
                        <span className="text-sm">{message.timestamp}</span>
                      </div>
                      <Badge className={`${getPriorityColor(message.priority)} border text-xs`}>
                        {message.priority}
                      </Badge>
                      {!message.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    
                    {message.subject && (
                      <p className="font-semibold text-foreground mb-2">{message.subject}</p>
                    )}
                    
                    <p className="text-foreground mb-3 leading-relaxed">
                      {message.message}
                    </p>
                    
                    {message.responseToAction && (
                      <div className="mb-3">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                          Response to: {message.responseToAction}
                        </Badge>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        onClick={() => handleReply(message)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 text-sm font-semibold"
                      >
                        <Reply className="w-4 h-4 mr-1" />
                        Reply
                      </Button>
                      
                      {!message.isRead && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAsRead(message.id)}
                          className="rounded-full border-border hover:border-primary/20 px-4 py-2 text-sm"
                        >
                          Mark as Read
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full border-border hover:border-primary/20 p-2"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredMessages.length === 0 && (
            <div className="text-center py-12">
              <Inbox className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No Messages</h3>
              <p className="text-muted-foreground">
                {filter === 'unread' ? 'All caught up! No unread messages.' : 
                 filter === 'high' ? 'No high priority messages at the moment.' :
                 'Your inbox is empty.'}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InboxPanel;