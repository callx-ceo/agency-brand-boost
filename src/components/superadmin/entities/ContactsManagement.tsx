
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users } from "lucide-react";

interface ContactsManagementProps {
  onBackToDashboard: () => void;
}

const ContactsManagement = ({ onBackToDashboard }: ContactsManagementProps) => {
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
            <h1 className="text-3xl font-bold">Contacts Management</h1>
            <p className="text-gray-600">Manage all platform contacts and communications</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Contact Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Contacts Management</h3>
            <p className="text-gray-600">Contact management functionality will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactsManagement;
