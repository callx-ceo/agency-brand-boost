import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Bell, Phone, Headphones, Save, Lock, Eye, EyeOff, ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";
import { AgentTransferRequestModal } from "./AgentTransferRequestModal";
import { AgentVerticalSettings } from "../settings/AgentVerticalSettings";
import { AgentLanguagePicker } from "../settings/AgentLanguageSettings";
import { AgentVerticalBidSettings } from "../settings/AgentVerticalBidSettings";
import { AgentTargetStatesSettings } from "../settings/AgentTargetStatesSettings";
import AgentBillingView from "./AgentBillingView";

const AgentSettingsView = () => {
  const [profile, setProfile] = useState({
    firstName: "Aaron",
    lastName: "Javier", 
    email: "aaron.javier@fffieldunderwriter.com",
    phone: "(510) 566-0817",
    zipCode: "94579",
    city: "San Leandro",
    state: "CA",
    languages: ["English"]
  });

  const [selectedVerticals, setSelectedVerticals] = useState<string[]>(["Medicare"]);

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
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

  const [showTransferModal, setShowTransferModal] = useState(false);

  const handleSaveProfile = () => {
    toast.success("Profile and language skills updated successfully");
  };

  const handleSavePassword = () => {
    if (security.newPassword !== security.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    if (security.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    toast.success("Password updated successfully");
    setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
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
        <h1 className="text-2xl font-bold">Settings Dashboard</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="profile">Profile Data</TabsTrigger>
          <TabsTrigger value="verticals">Verticals</TabsTrigger>
          <TabsTrigger value="states">Target States</TabsTrigger>
          <TabsTrigger value="bids">Bid Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile({...profile, lastName: e.target.value})}
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
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    value={profile.zipCode}
                    onChange={(e) => setProfile({...profile, zipCode: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={profile.city}
                    onChange={(e) => setProfile({...profile, city: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select value={profile.state} onValueChange={(value) => setProfile({...profile, state: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CA">CA</SelectItem>
                      <SelectItem value="NY">NY</SelectItem>
                      <SelectItem value="TX">TX</SelectItem>
                      <SelectItem value="FL">FL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
              </div>
              
              {/* Language Skills Section */}
              <div className="mt-8">
                <AgentLanguagePicker 
                  selectedLanguages={profile.languages}
                  onLanguageChange={(languages) => setProfile({...profile, languages})}
                />
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={handleSaveProfile} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="verticals" className="space-y-6">
          <AgentVerticalSettings 
            currentVerticals={selectedVerticals}
            onUpdate={setSelectedVerticals}
          />
        </TabsContent>

        <TabsContent value="states" className="space-y-6">
          <AgentTargetStatesSettings 
            selectedVerticals={selectedVerticals}
            onUpdate={(targetStates) => {
              console.log('Updated target states:', targetStates);
            }}
          />
        </TabsContent>

        <TabsContent value="bids" className="space-y-6">
          <AgentVerticalBidSettings 
            selectedVerticals={selectedVerticals}
            onUpdate={(bids) => {
              console.log('Updated bid settings:', bids);
            }}
          />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
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
                  <div className="text-sm text-muted-foreground">Receive updates via email</div>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">SMS Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive text message alerts</div>
                </div>
                <Switch
                  checked={notifications.smsNotifications}
                  onCheckedChange={(checked) => setNotifications({...notifications, smsNotifications: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Call Reminders</div>
                  <div className="text-sm text-muted-foreground">Get notified about scheduled calls</div>
                </div>
                <Switch
                  checked={notifications.callReminders}
                  onCheckedChange={(checked) => setNotifications({...notifications, callReminders: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Lead Assignments</div>
                  <div className="text-sm text-muted-foreground">Notify when new leads are assigned</div>
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
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    value={security.currentPassword}
                    onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                  >
                    {showPasswords.current ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      value={security.newPassword}
                      onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                      placeholder="Enter new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                    >
                      {showPasswords.new ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={security.confirmPassword}
                      onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                      placeholder="Confirm new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.
              </div>
              
              <Button onClick={handleSavePassword} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <AgentBillingView />
        </TabsContent>

        <TabsContent value="transfer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5" />
                Agency Transfer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 className="font-semibold text-amber-800 mb-2">Current Agency Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-amber-700">Agency:</span>
                    <span className="font-medium text-amber-900">Premium Insurance Partners</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Role:</span>
                    <span className="font-medium text-amber-900">Agent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Status:</span>
                    <span className="font-medium text-amber-900">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Member Since:</span>
                    <span className="font-medium text-amber-900">March 15, 2024</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Request Agency Transfer</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you'd like to join a different agency, you can submit a transfer request. 
                    Both your current agency and the destination agency must approve the transfer.
                  </p>
                </div>

                <Button 
                  onClick={() => setShowTransferModal(true)}
                  className="flex items-center gap-2"
                  variant="outline"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  Request Transfer
                </Button>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Transfer Process</h4>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. Submit your transfer request with reason</li>
                  <li>2. Your current agency owner will be notified</li>
                  <li>3. The destination agency reviews and approves/rejects</li>
                  <li>4. If approved, transfer is completed automatically</li>
                  <li>5. You'll receive email updates throughout the process</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AgentTransferRequestModal
        open={showTransferModal}
        onOpenChange={setShowTransferModal}
      />
    </div>
  );
};

export default AgentSettingsView;