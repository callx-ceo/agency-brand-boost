import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Send } from "lucide-react";

interface SendTextModalProps {
  lead: {
    name: string;
    company: string;
    status: string;
  };
  onClose: () => void;
}

const SendTextModal = ({ lead, onClose }: SendTextModalProps) => {
  const [message, setMessage] = useState(
    `Hi ${lead.name.split(" ")[0]}, I wanted to follow up on our conversation about ${lead.company}. Do you have a moment to discuss next steps?`
  );
  const [scheduleLater, setScheduleLater] = useState(false);

  const handleSend = () => {
    console.log("Sending message:", message, "to", lead.name);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Send Text Message</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Lead Info */}
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {lead.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg">{lead.name}</h3>
              <p className="text-sm text-muted-foreground">{lead.company}</p>
            </div>
            <Badge className="ml-auto">
              {lead.status}
            </Badge>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="resize-none"
              placeholder="Type your message here..."
            />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{message.length} characters</span>
              <span>~{Math.ceil(message.length / 160)} SMS segment(s)</span>
            </div>
          </div>

          {/* Schedule Option */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="schedule"
              checked={scheduleLater}
              onChange={(e) => setScheduleLater(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="schedule" className="text-sm font-medium cursor-pointer">
              Schedule for later
            </label>
          </div>

          {scheduleLater && (
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <input
                type="datetime-local"
                className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-sm"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              className="bg-[#10B981] hover:bg-[#059669] text-white gap-2"
            >
              <Send className="w-4 h-4" />
              {scheduleLater ? "Schedule Send" : "Send Now"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendTextModal;
