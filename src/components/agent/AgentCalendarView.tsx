
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Phone,
  Clock,
  User,
  Video,
  FileText,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  type: "call" | "follow-up" | "meeting" | "task";
  contact?: string;
  duration?: string;
  status?: "upcoming" | "completed" | "missed";
}

const AgentCalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  // Mock events for selected date
  const eventsForDate: CalendarEvent[] = [
    { id: "1", title: "Follow-up: John Martinez", time: "9:00 AM", type: "follow-up", contact: "John Martinez", duration: "15 min", status: "upcoming" },
    { id: "2", title: "Policy Review Call", time: "10:30 AM", type: "call", contact: "Sarah Williams", duration: "30 min", status: "upcoming" },
    { id: "3", title: "Team Standup", time: "11:00 AM", type: "meeting", duration: "15 min", status: "upcoming" },
    { id: "4", title: "Submit Application – Davis", time: "1:00 PM", type: "task", contact: "Robert Davis", status: "upcoming" },
    { id: "5", title: "New Lead Call", time: "2:30 PM", type: "call", contact: "Emily Chen", duration: "20 min", status: "upcoming" },
    { id: "6", title: "Quote Follow-up", time: "4:00 PM", type: "follow-up", contact: "Michael Brown", duration: "10 min", status: "upcoming" },
  ];

  const upcomingEvents: CalendarEvent[] = [
    { id: "u1", title: "Renewal Reminder – Thompson", time: "Tomorrow, 9:00 AM", type: "follow-up", contact: "Lisa Thompson" },
    { id: "u2", title: "Carrier Training Webinar", time: "Tomorrow, 2:00 PM", type: "meeting", duration: "1 hr" },
    { id: "u3", title: "Monthly Review – Agency", time: "Apr 18, 10:00 AM", type: "meeting", duration: "45 min" },
  ];

  const typeConfig = {
    call: { icon: Phone, color: "bg-emerald-500/10 text-emerald-600", label: "Call" },
    "follow-up": { icon: Clock, color: "bg-amber-500/10 text-amber-600", label: "Follow-up" },
    meeting: { icon: Video, color: "bg-blue-500/10 text-blue-600", label: "Meeting" },
    task: { icon: FileText, color: "bg-purple-500/10 text-purple-600", label: "Task" },
  };

  // Dates with events (for dot indicators)
  const datesWithEvents = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">My Calendar</h2>
          <p className="text-sm text-muted-foreground">{formatDate(today)}</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" />
          New Event
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Today's Events", value: "6", sub: "2 calls, 2 follow-ups" },
          { label: "This Week", value: "18", sub: "8 calls scheduled" },
          { label: "Overdue Tasks", value: "2", sub: "Action needed" },
          { label: "Upcoming Renewals", value: "5", sub: "Next 30 days" },
        ].map((s) => (
          <Card key={s.label} className="border-border/60">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Calendar */}
        <Card className="col-span-1 border-border/60">
          <CardContent className="p-3">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="w-full"
              modifiers={{ hasEvent: datesWithEvents }}
              modifiersClassNames={{ hasEvent: "font-bold" }}
            />
            <div className="mt-3 pt-3 border-t border-border/40 space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Upcoming</p>
              {upcomingEvents.map((evt) => {
                const cfg = typeConfig[evt.type];
                const Icon = cfg.icon;
                return (
                  <div key={evt.id} className="flex items-center gap-2 p-1.5 rounded hover:bg-muted/50 cursor-pointer">
                    <div className={`w-6 h-6 rounded flex items-center justify-center ${cfg.color}`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{evt.title}</p>
                      <p className="text-[10px] text-muted-foreground">{evt.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Day Schedule */}
        <Card className="col-span-2 border-border/60">
          <CardHeader className="pb-2 px-4 pt-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">
                {selectedDate ? formatDate(selectedDate) : "Select a date"}
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => setSelectedDate(new Date())}>
                  Today
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-2">
              {eventsForDate.map((evt) => {
                const cfg = typeConfig[evt.type];
                const Icon = cfg.icon;
                return (
                  <div
                    key={evt.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border/40 hover:bg-muted/30 cursor-pointer transition-colors"
                  >
                    <div className="text-xs text-muted-foreground w-16 pt-0.5 font-mono">{evt.time}</div>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cfg.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{evt.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {evt.contact && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="w-3 h-3" />
                            {evt.contact}
                          </span>
                        )}
                        {evt.duration && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {evt.duration}
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${cfg.color} border-0`}>
                      {cfg.label}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentCalendarView;
