import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Phone, Headphones, Save } from "lucide-react";
import { toast } from "sonner";

const AgentSettingsView = () => {
  const [profile, setProfile] = useState({
    name: "Sean Frank",
    email: "sean.frank@company.com",
    phone: "(555) 123-4567",
    timezone: "America/New_York",
    bio: "Experienced insurance agent specializing in life and auto insurance."
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    callReminders: true,
    leadAssignments: true
  });

  const [callSettings, setCallSettings] = useState({
    autoAnswer: false,
    callRecording: true,
    callScript: "Hello, this is {agent_name} from {company_name}. How can I help you today?",
    maxCallDuration: "60",
    voicemailEnabled: true
  });

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated");
  };

  const handleSaveCallSettings = () => {
    toast.success("Call settings updated");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Agent Settings</h1>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={profile.timezone} onValueChange={(value) => setProfile({...profile, timezone: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              rows={3}
            />
          </div>
          <Button onClick={handleSaveProfile} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Email Notifications</div>
              <div className="text-sm text-gray-500">Receive updates via email</div>
            </div>
            <Switch
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">SMS Notifications</div>
              <div className="text-sm text-gray-500">Receive text message alerts</div>
            </div>
            <Switch
              checked={notifications.smsNotifications}
              onCheckedChange={(checked) => setNotifications({...notifications, smsNotifications: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Call Reminders</div>
              <div className="text-sm text-gray-500">Get notified about scheduled calls</div>
            </div>
            <Switch
              checked={notifications.callReminders}
              onCheckedChange={(checked) => setNotifications({...notifications, callReminders: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Lead Assignments</div>
              <div className="text-sm text-gray-500">Notify when new leads are assigned</div>
            </div>
            <Switch
              checked={notifications.leadAssignments}
              onCheckedChange={(checked) => setNotifications({...notifications, leadAssignments: checked})}
            />
          </div>
          <Button onClick={handleSaveNotifications} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Preferences
          </Button>
        </CardContent>
      </Card>

      {/* Call Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Call Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Auto-Answer Calls</div>
              <div className="text-sm text-gray-500">Automatically answer incoming calls</div>
            </div>
            <Switch
              checked={callSettings.autoAnswer}
              onCheckedChange={(checked) => setCallSettings({...callSettings, autoAnswer: checked})}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Call Recording</div>
              <div className="text-sm text-gray-500">Record all calls for quality assurance</div>
            </div>
            <Switch
              checked={callSettings.callRecording}
              onCheckedChange={(checked) => setCallSettings({...callSettings, callRecording: checked})}
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="callScript">Call Script</Label>
            <Textarea
              id="callScript"
              value={callSettings.callScript}
              onChange={(e) => setCallSettings({...callSettings, callScript: e.target.value})}
              rows={3}
              placeholder="Enter your opening call script..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxDuration">Max Call Duration (minutes)</Label>
              <Input
                id="maxDuration"
                type="number"
                value={callSettings.maxCallDuration}
                onChange={(e) => setCallSettings({...callSettings, maxCallDuration: e.target.value})}
              />
            </div>
            <div className="flex items-center justify-between pt-6">
              <div>
                <div className="font-medium">Voicemail Enabled</div>
                <div className="text-sm text-gray-500">Allow voicemail for missed calls</div>
              </div>
              <Switch
                checked={callSettings.voicemailEnabled}
                onCheckedChange={(checked) => setCallSettings({...callSettings, voicemailEnabled: checked})}
              />
            </div>
          </div>
          <Button onClick={handleSaveCallSettings} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Call Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentSettingsView;