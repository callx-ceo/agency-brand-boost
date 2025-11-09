import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, ArrowLeftRight, Settings, Building2, DollarSign } from 'lucide-react';
import { MembersTab } from './agency/MembersTab';
import { InvitesTab } from './agency/InvitesTab';
import { TransfersTab } from './agency/TransfersTab';
import { UserRoleManagement } from './agency/UserRoleManagement';
import { AgencyModelSettings } from './AgencyModelSettings';
import BillingTab from './BillingTab';
import { ImpersonationProvider } from '@/contexts/ImpersonationContext';
import ImpersonationBanner from '@/components/ImpersonationBanner';

interface AgencySettingsProps {
  onBackToDashboard?: () => void;
}

export const AgencySettings: React.FC<AgencySettingsProps> = ({ onBackToDashboard }) => {
  const [activeTab, setActiveTab] = useState("model");

  // Mock data for badges - in production, these would come from API
  const tabCounts = {
    members: 200, // Updated to reflect 200 agents
    pendingInvites: 3,
    transfers: 2
  };

  return (
    <ImpersonationProvider>
      <div className="space-y-6">
        <ImpersonationBanner />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Agency Settings</h1>
              <p className="text-muted-foreground">
                Manage your agency members, invitations, and transfers
              </p>
            </div>
          </div>
          {onBackToDashboard && (
            <Button variant="outline" onClick={onBackToDashboard}>
              Back to Dashboard
            </Button>
          )}
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Membership Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="model" className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Agency Model</span>
              </TabsTrigger>
              <TabsTrigger value="members" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Members</span>
                <Badge variant="secondary" className="ml-1">
                  {tabCounts.members}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="roles">
                User Roles
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Payment Settings</span>
              </TabsTrigger>
              <TabsTrigger value="invites" className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Invites</span>
                {tabCounts.pendingInvites > 0 && (
                  <Badge variant="default" className="ml-1">
                    {tabCounts.pendingInvites}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="transfers" className="flex items-center space-x-2">
                <ArrowLeftRight className="h-4 w-4" />
                <span>Transfers</span>
                {tabCounts.transfers > 0 && (
                  <Badge variant="outline" className="ml-1">
                    {tabCounts.transfers}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

          <TabsContent value="model" className="mt-6">
            <AgencyModelSettings />
          </TabsContent>

          <TabsContent value="members" className="mt-6">
            <MembersTab />
          </TabsContent>

          <TabsContent value="roles" className="mt-6">
            <UserRoleManagement />
          </TabsContent>

          <TabsContent value="billing" className="mt-6">
            <BillingTab />
          </TabsContent>

          <TabsContent value="invites" className="mt-6">
            <InvitesTab />
          </TabsContent>

          <TabsContent value="transfers" className="mt-6">
            <TransfersTab />
          </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      </div>
    </ImpersonationProvider>
  );
};