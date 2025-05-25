
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

interface CampaignSearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const CampaignSearchFilter = ({ searchTerm, onSearchChange }: CampaignSearchFilterProps) => {
  return (
    <div className="flex gap-2">
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-64"
        />
      </div>
      <Button variant="outline" size="sm">
        <Filter className="w-4 h-4 mr-2" />
        Filter
      </Button>
    </div>
  );
};

export default CampaignSearchFilter;
