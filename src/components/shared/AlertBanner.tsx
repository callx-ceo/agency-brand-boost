
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface AlertMessage {
  id: string;
  text: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface AlertBannerProps {
  messages: AlertMessage[];
  onDismiss?: (id: string) => void;
  onDismissAll?: () => void;
}

const AlertBanner = ({ messages, onDismiss, onDismissAll }: AlertBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (messages.length === 0) return null;

  const safeIndex = Math.min(currentIndex, messages.length - 1);
  const current = messages[safeIndex];

  const handlePrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setCurrentIndex((i) => Math.min(messages.length - 1, i + 1));

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss(current.id);
      if (safeIndex >= messages.length - 1 && safeIndex > 0) {
        setCurrentIndex(safeIndex - 1);
      }
    } else {
      onDismissAll?.();
    }
  };

  return (
    <div className="flex items-center justify-between bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg text-sm">
      {/* Left: Pagination */}
      <div className="flex items-center gap-1 text-muted-foreground shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={handlePrev}
          disabled={safeIndex === 0}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </Button>
        <span className="text-xs font-medium min-w-[3ch] text-center">
          {safeIndex + 1}/{messages.length}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={handleNext}
          disabled={safeIndex === messages.length - 1}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Center: Message + Action */}
      <div className="flex items-center gap-3 justify-center flex-1">
        <span className="text-foreground">{current.text}</span>
        {current.action && (
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs"
            onClick={current.action.onClick}
          >
            {current.action.label}
          </Button>
        )}
      </div>

      {/* Right: Dismiss */}
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 shrink-0"
        onClick={handleDismiss}
      >
        <X className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
};

export default AlertBanner;
