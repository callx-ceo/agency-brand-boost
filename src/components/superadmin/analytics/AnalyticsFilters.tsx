
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Filter, Download, RefreshCw } from "lucide-react";

interface AnalyticsFiltersProps {
  reportType: string;
  dateRange: string;
  onReportTypeChange: (value: string) => void;
  onDateRangeChange: (value: string) => void;
  onRefresh: () => void;
  onExport: () => void;
}

const AnalyticsFilters = ({
  reportType,
  dateRange,
  onReportTypeChange,
  onDateRangeChange,
  onRefresh,
  onExport
}: AnalyticsFiltersProps) => {
  const reportTypes = [
    { value: "overview", label: "Platform Overview" },
    { value: "revenue", label: "Revenue Analytics" },
    { value: "performance", label: "Performance Metrics" },
    { value: "agencies", label: "Agency Analytics" },
    { value: "agents", label: "Agent Performance" },
    { value: "compliance", label: "Compliance Reports" },
    { value: "conversion", label: "Conversion Analysis" },
    { value: "user-activity", label: "User Activity" }
  ];

  const dateRanges = [
    { value: "today", label: "Today" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "6m", label: "Last 6 Months" },
    { value: "1y", label: "Last Year" },
    { value: "custom", label: "Custom Range" }
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <Select value={reportType} onValueChange={onReportTypeChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={onDateRangeChange}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              {dateRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm" onClick={onExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsFilters;
