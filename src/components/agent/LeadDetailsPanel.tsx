import React from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare, Edit } from "lucide-react";

interface LeadDetailsPanelProps {
  lead: {
    name: string;
    company: string;
    context: string;
  };
}

const LeadDetailsPanel = ({ lead }: LeadDetailsPanelProps) => {
  const activities = [
    {
      id: 1,
      action: "Opened email",
      time: "2 hours ago",
      detail: "Product overview email",
    },
    {
      id: 2,
      action: "Clicked link",
      time: "Yesterday at 3:45 PM",
      detail: "Pricing page",
    },
    {
      id: 3,
      action: "Sent email",
      time: "2 days ago",
      detail: "Initial outreach",
    },
  ];

  return (
    <div className="mt-6 pt-6 border-t space-y-6 animate-fade-in">
      {/* Contact Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Email</p>
          <p className="text-sm font-medium">
            {lead.name.toLowerCase().replace(" ", ".")}@{lead.company.toLowerCase()}.com
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Phone</p>
          <p className="text-sm font-medium">+1 (555) 123-4567</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Call", lead.name);
          }}
        >
          <Phone className="w-4 h-4" />
          Call
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Text", lead.name);
          }}
        >
          <MessageSquare className="w-4 h-4" />
          Text
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Email", lead.name);
          }}
        >
          <Mail className="w-4 h-4" />
          Email
        </Button>
      </div>

      {/* Recent Activity */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Recent Activity</h4>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.detail}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold">Notes</h4>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 gap-1 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Edit notes");
            }}
          >
            <Edit className="w-3 h-3" />
            Edit
          </Button>
        </div>
        <div className="text-sm text-muted-foreground p-3 bg-muted/30 rounded-md">
          {lead.context}. Follow up recommended for next steps discussion.
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsPanel;
