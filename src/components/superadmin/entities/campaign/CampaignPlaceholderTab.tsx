
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CampaignPlaceholderTabProps {
  title: string;
  message: string;
}

const CampaignPlaceholderTab = ({ title, message }: CampaignPlaceholderTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{message}</p>
      </CardContent>
    </Card>
  );
};

export default CampaignPlaceholderTab;
