
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Download, FileText, Building2, Users, Phone, Hash } from "lucide-react";
import AgencyReports from "./AgencyReports";

interface GlobalReportingProps {
  onBackToDashboard: () => void;
}

const GlobalReporting = ({ onBackToDashboard }: GlobalReportingProps) => {
  const [activeTab, setActiveTab] = useState("campaigns");

  const PlaceholderReport = ({ title, description }: { title: string; description: string }) => (
    <Card>
      <CardContent className="p-6">
        <div className="text-center py-8">
          <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );

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
            <TabsList className="grid w-full grid-cols-6 lg:grid-cols-11 gap-1">
              <TabsTrigger value="campaigns" className="text-xs">
                Campaigns
              </TabsTrigger>
              <TabsTrigger value="campaigns-by-publisher" className="text-xs">
                Campaigns by Publisher
              </TabsTrigger>
              <TabsTrigger value="publisher-by-manager" className="text-xs">
                Publisher by Manager
              </TabsTrigger>
              <TabsTrigger value="offers" className="text-xs">
                Offers
              </TabsTrigger>
              <TabsTrigger value="offers-by-publisher" className="text-xs">
                Offers by Publisher
              </TabsTrigger>
              <TabsTrigger value="promo-numbers" className="text-xs">
                Promo Numbers
              </TabsTrigger>
              <TabsTrigger value="offers-by-promo" className="text-xs">
                Offers by Promo #
              </TabsTrigger>
              <TabsTrigger value="advertisers" className="text-xs">
                Advertisers
              </TabsTrigger>
              <TabsTrigger value="publishers" className="text-xs">
                Publishers
              </TabsTrigger>
              <TabsTrigger value="ivr-fees" className="text-xs">
                IVR Fees
              </TabsTrigger>
              <TabsTrigger value="key-press" className="text-xs">
                Key Press
              </TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Campaigns Report</h3>
                <p className="text-gray-600">Comprehensive campaign performance and metrics</p>
              </div>
              <PlaceholderReport 
                title="Campaigns Report"
                description="View performance metrics, conversion rates, and analytics for all campaigns across the platform"
              />
            </TabsContent>

            <TabsContent value="campaigns-by-publisher" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Campaigns by Publisher</h3>
                <p className="text-gray-600">Campaign performance broken down by publisher</p>
              </div>
              <PlaceholderReport 
                title="Campaigns by Publisher Report"
                description="Analyze how different campaigns perform across various publishers and traffic sources"
              />
            </TabsContent>

            <TabsContent value="publisher-by-manager" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Publisher by Manager</h3>
                <p className="text-gray-600">Publisher performance organized by account managers</p>
              </div>
              <PlaceholderReport 
                title="Publisher by Manager Report"
                description="Track publisher performance metrics grouped by their assigned account managers"
              />
            </TabsContent>

            <TabsContent value="offers" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Offers Report</h3>
                <p className="text-gray-600">Complete offers performance and conversion data</p>
              </div>
              <PlaceholderReport 
                title="Offers Report"
                description="Detailed analysis of offer performance, conversion rates, and revenue metrics"
              />
            </TabsContent>

            <TabsContent value="offers-by-publisher" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Offers by Publisher</h3>
                <p className="text-gray-600">Offer performance segmented by publisher</p>
              </div>
              <PlaceholderReport 
                title="Offers by Publisher Report"
                description="See how specific offers perform across different publishers and traffic sources"
              />
            </TabsContent>

            <TabsContent value="promo-numbers" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Promo Numbers Report</h3>
                <p className="text-gray-600">Promotional number usage and performance tracking</p>
              </div>
              <PlaceholderReport 
                title="Promo Numbers Report"
                description="Track promotional number usage, call volumes, and conversion metrics"
              />
            </TabsContent>

            <TabsContent value="offers-by-promo" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Offers by Promo Number</h3>
                <p className="text-gray-600">Offer performance tied to specific promotional numbers</p>
              </div>
              <PlaceholderReport 
                title="Offers by Promo Number Report"
                description="Analyze offer conversion rates and performance by promotional number campaigns"
              />
            </TabsContent>

            <TabsContent value="advertisers" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Advertisers Report</h3>
                <p className="text-gray-600">Advertiser performance and spend analytics</p>
              </div>
              <PlaceholderReport 
                title="Advertisers Report"
                description="Comprehensive advertiser metrics including spend, ROI, and campaign performance"
              />
            </TabsContent>

            <TabsContent value="publishers" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Publishers Report</h3>
                <p className="text-gray-600">Publisher performance and revenue analytics</p>
              </div>
              <PlaceholderReport 
                title="Publishers Report"
                description="Detailed publisher performance metrics, revenue tracking, and quality scores"
              />
            </TabsContent>

            <TabsContent value="ivr-fees" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">IVR Fees Report</h3>
                <p className="text-gray-600">Interactive Voice Response system fees and usage</p>
              </div>
              <PlaceholderReport 
                title="IVR Fees Report"
                description="Track IVR system usage, associated fees, and cost breakdowns by campaign"
              />
            </TabsContent>

            <TabsContent value="key-press" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Key Press Report</h3>
                <p className="text-gray-600">Call key press analytics and conversion tracking</p>
              </div>
              <PlaceholderReport 
                title="Key Press Report"
                description="Analyze caller key press behavior, navigation patterns, and conversion outcomes"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Agency Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AgencyReports />
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalReporting;
