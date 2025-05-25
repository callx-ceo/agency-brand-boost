
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, PhoneCall, Building2, Download } from "lucide-react";
import RealtimeReport from "@/components/dashboard/RealtimeReport";
import AgentReports from "@/components/dashboard/AgentReports";
import AgencyReports from "./AgencyReports";

interface GlobalReportingProps {
  onBackToDashboard: () => void;
}

const GlobalReporting = ({ onBackToDashboard }: GlobalReportingProps) => {
  const [activeTab, setActiveTab] = useState("realtime");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Global Reporting</h1>
          <p className="text-gray-600">Comprehensive reporting across all agencies and entities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export All
          </Button>
          <Button variant="outline" onClick={onBackToDashboard}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Platform-Wide Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="realtime" className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4" />
                Realtime Calls
              </TabsTrigger>
              <TabsTrigger value="agencies" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Agency Reports
              </TabsTrigger>
              <TabsTrigger value="agents" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Agent Reports
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Performance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="realtime" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Global Realtime Call Monitoring</h3>
                <p className="text-gray-600">Monitor all active calls across all agencies in real-time</p>
              </div>
              <RealtimeReport />
            </TabsContent>

            <TabsContent value="agencies" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Cross-Agency Performance Reports</h3>
                <p className="text-gray-600">Performance metrics and analytics across all agencies</p>
              </div>
              <AgencyReports />
            </TabsContent>

            <TabsContent value="agents" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Cross-Agency Agent Performance</h3>
                <p className="text-gray-600">Comprehensive agent performance metrics across all agencies</p>
              </div>
              <AgentReports />
            </TabsContent>

            <TabsContent value="performance" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Platform Performance Analytics</h3>
                <p className="text-gray-600">High-level performance metrics and trends</p>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">94.2%</div>
                      <div className="text-sm text-gray-600">Average Conversion Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">$2.4M</div>
                      <div className="text-sm text-gray-600">Total Platform Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">15,847</div>
                      <div className="text-sm text-gray-600">Total Calls Today</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">312</div>
                      <div className="text-sm text-gray-600">Active Agents</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalReporting;
