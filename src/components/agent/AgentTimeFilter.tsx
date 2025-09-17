import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar, CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type TimeFilterPeriod = "today" | "yesterday" | "custom" | "monthly";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface AgentTimeFilterProps {
  onFilterChange: (period: TimeFilterPeriod, dateRange?: DateRange) => void;
  className?: string;
}

const AgentTimeFilter = ({ onFilterChange, className }: AgentTimeFilterProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimeFilterPeriod>("today");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handlePeriodChange = (period: TimeFilterPeriod) => {
    setSelectedPeriod(period);
    
    if (period !== "custom") {
      onFilterChange(period);
    }
  };

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    if (range.from && range.to) {
      onFilterChange("custom", range);
      setIsCalendarOpen(false);
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="yesterday">Yesterday</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>

      {selectedPeriod === "custom" && (
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !dateRange.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={{
                from: dateRange.from,
                to: dateRange.to,
              }}
              onSelect={(range) => handleDateRangeChange({
                from: range?.from,
                to: range?.to,
              })}
              numberOfMonths={2}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default AgentTimeFilter;