
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarRange, Calendar as CalendarIcon } from "lucide-react";
import { format, subDays, subMonths, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { cn } from "@/lib/utils";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangeSelectorProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

const DateRangeSelector = ({ value, onChange, className }: DateRangeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRange, setTempRange] = useState<DateRange>(value);

  const predefinedRanges = [
    { 
      label: "Today", 
      value: "today",
      range: { from: new Date(), to: new Date() }
    },
    { 
      label: "Yesterday", 
      value: "yesterday",
      range: { from: subDays(new Date(), 1), to: subDays(new Date(), 1) }
    },
    { 
      label: "Last 7 days", 
      value: "last-7-days",
      range: { from: subDays(new Date(), 6), to: new Date() }
    },
    { 
      label: "Last 30 days", 
      value: "last-30-days",
      range: { from: subDays(new Date(), 29), to: new Date() }
    },
    { 
      label: "This Month", 
      value: "this-month",
      range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) }
    },
    { 
      label: "Last Month", 
      value: "last-month",
      range: { from: startOfMonth(subMonths(new Date(), 1)), to: endOfMonth(subMonths(new Date(), 1)) }
    },
    { 
      label: "This Year", 
      value: "this-year",
      range: { from: startOfYear(new Date()), to: endOfYear(new Date()) }
    },
    { 
      label: "Custom Range", 
      value: "custom",
      range: { from: undefined, to: undefined }
    }
  ];

  const handlePredefinedRangeSelect = (rangeValue: string) => {
    const selectedRange = predefinedRanges.find(r => r.value === rangeValue);
    if (selectedRange && rangeValue !== "custom") {
      onChange(selectedRange.range);
      setTempRange(selectedRange.range);
      setIsOpen(false);
    }
  };

  const handleCustomRangeApply = () => {
    if (tempRange.from && tempRange.to) {
      onChange(tempRange);
      setIsOpen(false);
    }
  };

  const formatDateRange = () => {
    if (!value.from) return "Select date range";
    if (!value.to) return format(value.from, "MMM dd, yyyy");
    if (value.from.getTime() === value.to.getTime()) {
      return format(value.from, "MMM dd, yyyy");
    }
    return `${format(value.from, "MMM dd, yyyy")} - ${format(value.to, "MMM dd, yyyy")}`;
  };

  const getCurrentRangeLabel = () => {
    const matchingRange = predefinedRanges.find(range => {
      if (!range.range.from || !range.range.to || !value.from || !value.to) return false;
      return range.range.from.getTime() === value.from.getTime() && 
             range.range.to.getTime() === value.to.getTime();
    });
    return matchingRange?.label || "Custom Range";
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start text-left font-normal">
            <CalendarRange className="mr-2 h-4 w-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            {/* Predefined ranges */}
            <div className="border-r p-3 w-48">
              <div className="space-y-1">
                {predefinedRanges.map((range) => (
                  <Button
                    key={range.value}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start h-8"
                    onClick={() => handlePredefinedRangeSelect(range.value)}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Custom calendar */}
            <div className="p-3">
              <Calendar
                mode="range"
                selected={tempRange}
                onSelect={(range) => setTempRange(range || { from: undefined, to: undefined })}
                numberOfMonths={2}
                className="pointer-events-auto"
              />
              <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTempRange(value);
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleCustomRangeApply}
                  disabled={!tempRange.from || !tempRange.to}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      <Badge variant="secondary" className="text-xs">
        {getCurrentRangeLabel()}
      </Badge>
    </div>
  );
};

export default DateRangeSelector;
