
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Filter } from "lucide-react";
import NotificationCenter from "../NotificationCenter";

interface ApplicationsTableHeaderProps {
  applicationsCount: number;
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
  selectedAgency: string;
  setSelectedAgency: (value: string) => void;
  agencies: string[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const ApplicationsTableHeader = ({
  applicationsCount,
  priorityFilter,
  setPriorityFilter,
  selectedAgency,
  setSelectedAgency,
  agencies,
  searchTerm,
  setSearchTerm,
}: ApplicationsTableHeaderProps) => {
  return (
    <CardHeader>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Agency Applications ({applicationsCount})
        </CardTitle>
        <div className="flex gap-2 flex-wrap">
          <NotificationCenter />
          <div className="relative">
            <Filter className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="pl-8 w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative">
            <Filter className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Select value={selectedAgency} onValueChange={setSelectedAgency}>
              <SelectTrigger className="pl-8 w-48">
                <SelectValue placeholder="Filter by agency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agencies</SelectItem>
                {agencies.map((agency) => (
                  <SelectItem key={agency} value={agency}>
                    {agency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
        </div>
      </div>
    </CardHeader>
  );
};

export default ApplicationsTableHeader;
