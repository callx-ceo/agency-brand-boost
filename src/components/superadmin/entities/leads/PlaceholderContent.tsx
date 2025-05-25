
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface PlaceholderContentProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PlaceholderContent = ({ title, description, icon }: PlaceholderContentProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="text-center py-8">
        {icon}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button variant="outline">
          <FileText className="w-4 h-4 mr-2" />
          View Report
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default PlaceholderContent;
