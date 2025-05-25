
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CallVolumeChart from "./CallVolumeChart";
import WalletPanel from "./WalletPanel";

interface DashboardChartsSectionProps {
  walletBalance: number;
  estimatedSpend: number;
}

const DashboardChartsSection = ({ walletBalance, estimatedSpend }: DashboardChartsSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>7-Day Call Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <CallVolumeChart />
        </CardContent>
      </Card>
      <WalletPanel 
        balance={walletBalance}
        estimatedSpend={estimatedSpend}
      />
    </div>
  );
};

export default DashboardChartsSection;
