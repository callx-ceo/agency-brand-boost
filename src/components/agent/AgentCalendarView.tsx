
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Phone,
  Clock,
  User,
  Video,
  FileText,
  Info,
  CalendarDays,
  Mail,
  Cloud,
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

interface CalendarConnection {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
}

const AgentCalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeSettingsTab, setActiveSettingsTab] = useState("calendars");
  const [showSettings, setShowSettings] = useState(false);

  const today = new Date();
  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

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

  const datesWithEvents = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
  ];

  const calendarConnections: CalendarConnection[] = [
    { id: "google", name: "Google Calendar", description: "Connect your Google Calendar", icon: <CalendarDays className="w-5 h-5 text-blue-600" />, connected: false },
    { id: "outlook", name: "Outlook Calendar", description: "Connect your Office 365, Outlook.com, live.com, or hotmail calendar", icon: <Mail className="w-5 h-5 text-blue-700" />, connected: false },
    { id: "icloud", name: "iCloud Calendar", description: "Connect your iCloud Calendar", icon: <Cloud className="w-5 h-5 text-sky-500" />, connected: false },
    { id: "calendly", name: "Calendly", description: "Connect your Calendly account to sync all calendly events into the system", icon: <CalendarDays className="w-5 h-5 text-blue-500" />, connected: false },
  ];

  const videoConnections = [
    { id: "zoom", name: "Zoom", description: "Connect your Zoom account for video meetings", icon: <Video className="w-5 h-5 text-blue-600" />, connected: false },
    { id: "teams", name: "Microsoft Teams", description: "Connect your Microsoft Teams for video calls", icon: <Video className="w-5 h-5 text-purple-600" />, connected: false },
    { id: "google-meet", name: "Google Meet", description: "Connect Google Meet for video conferencing", icon: <Video className="w-5 h-5 text-green-600" />, connected: false },
  ];

  // Settings / Connections View
  if (showSettings) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Calendar Settings</h2>
            <p className="text-sm text-muted-foreground">Manage your calendar connections and preferences</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowSettings(false)}>
            Back to Calendar
          </Button>
        </div>

        <Card className="border-border/60">
          <CardContent className="p-0">
            <Tabs value={activeSettingsTab} onValueChange={setActiveSettingsTab}>
              <div className="border-b border-border/60 px-4">
                <TabsList className="bg-transparent h-auto p-0 gap-6">
                  <TabsTrigger
                    value="calendars"
                    className="bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 pt-3 text-sm"
                  >
                    Calendars
                  </TabsTrigger>
                  <TabsTrigger
                    value="video"
                    className="bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 pt-3 text-sm"
                  >
                    Video Conferencing
                  </TabsTrigger>
                  <TabsTrigger
                    value="booking"
                    className="bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 pt-3 text-sm"
                  >
                    Google Organic Booking
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="calendars" className="p-4 mt-0">
                <h3 className="font-semibold text-foreground mb-1">Connected Calendars</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Easily connect your third-party calendar(s) to check availability, update appointments as they're scheduled and avoid double bookings.
                </p>

                <div className="space-y-3">
                  {calendarConnections.map((cal) => (
                    <div
                      key={cal.id}
                      className="flex items-center justify-between p-4 border border-border/60 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                          {cal.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-sm text-foreground">{cal.name}</span>
                            <Info className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                          <p className="text-xs text-muted-foreground">{cal.description}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className={cal.connected ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                      >
                        {cal.connected ? "Connected" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="video" className="p-4 mt-0">
                <h3 className="font-semibold text-foreground mb-1">Video Conferencing</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Connect your video conferencing tools to automatically create meeting links.
                </p>

                <div className="space-y-3">
                  {videoConnections.map((vc) => (
                    <div
                      key={vc.id}
                      className="flex items-center justify-between p-4 border border-border/60 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                          {vc.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-sm text-foreground">{vc.name}</span>
                            <Info className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                          <p className="text-xs text-muted-foreground">{vc.description}</p>
                        </div>
                      </div>
                      <Button size="sm">Connect</Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="booking" className="p-4 mt-0">
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CalendarDays className="w-12 h-12 text-muted-foreground/40 mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">Google Organic Booking</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Allow clients to book appointments directly from Google Search and Maps. Connect your Google Business Profile to get started.
                  </p>
                  <Button size="sm" className="mt-4 gap-1.5">
                    <Plus className="w-4 h-4" />
                    Set Up
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Calendar View
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">My Calendar</h2>
          <p className="text-sm text-muted-foreground">{formatDate(today)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
            Connect Calendars
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="w-4 h-4" />
            New Event
          </Button>
        </div>
      </div>

      {/* No connections banner */}
      <Card className="border-border/60 bg-muted/20">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">No calendars connected</p>
            <p className="text-xs text-muted-foreground">Connect your third-party calendar(s) to sync bookings and check availability</p>
          </div>
        </CardContent>
      </Card>

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
