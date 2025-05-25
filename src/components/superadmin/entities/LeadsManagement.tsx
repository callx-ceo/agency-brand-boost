
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  UserPlus, 
  FileText,
  XCircle,
  MessageSquare,
  Phone,
  Globe,
  Users
} from "lucide-react";
import { summaryStats, recentLeads, campaignsByPublisher } from "@/data/mockLeadsData";
import { calculateTotals } from "@/utils/leadsUtils";
import LeadsKPICards from "./leads/LeadsKPICards";
import RecentLeadsTable from "./leads/RecentLeadsTable";
import CampaignsByPublisherTable from "./leads/CampaignsByPublisherTable";
import PlaceholderContent from "./leads/PlaceholderContent";

interface LeadsManagementProps {
  onBackToDashboard: () => void;
}

const LeadsManagement = ({ onBackToDashboard }: LeadsManagementProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const totals = calculateTotals(campaignsByPublisher);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBackToDashboard}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Leads Management</h1>
            <p className="text-gray-600">Manage marketing campaign leads and track conversion performance</p>
          </div>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Import Leads
        </Button>
      </div>

      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 gap-1">
          <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
          <TabsTrigger value="post-report" className="text-xs">Post Report</TabsTrigger>
          <TabsTrigger value="rejected-leads" className="text-xs">Rejected Leads</TabsTrigger>
          <TabsTrigger value="smsm-report" className="text-xs">SMSM Report</TabsTrigger>
          <TabsTrigger value="dnc-list" className="text-xs">DNC List</TabsTrigger>
          <TabsTrigger value="campaigns" className="text-xs">Campaigns</TabsTrigger>
          <TabsTrigger value="publishers" className="text-xs">Publishers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <LeadsKPICards stats={summaryStats} />
          <RecentLeadsTable leads={recentLeads} />
        </TabsContent>

        <TabsContent value="post-report" className="mt-6">
          <PlaceholderContent 
            title="Post Report"
            description="Track lead posting performance and delivery metrics across campaigns"
            icon={<FileText className="w-12 h-12 mx-auto text-blue-400 mb-4" />}
          />
        </TabsContent>

        <TabsContent value="rejected-leads" className="mt-6">
          <PlaceholderContent 
            title="Rejected Lead Report"
            description="Analyze rejected leads with rejection reasons and quality metrics"
            icon={<XCircle className="w-12 h-12 mx-auto text-red-400 mb-4" />}
          />
        </TabsContent>

        <TabsContent value="smsm-report" className="mt-6">
          <PlaceholderContent 
            title="SMSM Report"
            description="SMS marketing campaign performance and delivery reports"
            icon={<MessageSquare className="w-12 h-12 mx-auto text-green-400 mb-4" />}
          />
        </TabsContent>

        <TabsContent value="dnc-list" className="mt-6">
          <PlaceholderContent 
            title="Do Not Contact (DNC) List"
            description="Manage and view the Do Not Contact list for compliance"
            icon={<Phone className="w-12 h-12 mx-auto text-orange-400 mb-4" />}
          />
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          <CampaignsByPublisherTable data={campaignsByPublisher} totals={totals} />
        </TabsContent>

        <TabsContent value="publishers" className="mt-6">
          <div className="space-y-6">
            <PlaceholderContent 
              title="Publishers"
              description="Manage publishers and their lead generation performance"
              icon={<Globe className="w-12 h-12 mx-auto text-indigo-400 mb-4" />}
            />
            
            <PlaceholderContent 
              title="Campaigns by Publisher"
              description="View campaign performance broken down by publisher"
              icon={<Users className="w-12 h-12 mx-auto text-teal-400 mb-4" />}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadsManagement;
