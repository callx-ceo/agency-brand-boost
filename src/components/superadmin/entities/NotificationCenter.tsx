
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, X, Check, AlertCircle, Info, CheckCircle } from "lucide-react";
import { useRealtimeUpdates } from "./RealtimeUpdatesProvider";

const NotificationCenter = () => {
  const { updates, clearUpdates } = useRealtimeUpdates();
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'status_change':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'new_application':
        return <Info className="w-4 h-4 text-blue-500" />;
      case 'carrier_response':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-4 h-4" />
        {updates.length > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
          >
            {updates.length > 9 ? '9+' : updates.length}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute top-full right-0 z-50 w-80 mt-2 shadow-lg border bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications ({updates.length})
              </CardTitle>
              <div className="flex gap-1">
                {updates.length > 0 && (
                  <Button size="sm" variant="ghost" onClick={clearUpdates}>
                    <Check className="w-4 h-4" />
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {updates.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                No new notifications
              </div>
            ) : (
              <div className="max-h-64 overflow-y-auto">
                {updates.map((update, index) => (
                  <div
                    key={`${update.applicationId}-${update.timestamp.getTime()}`}
                    className="p-3 border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      {getNotificationIcon(update.type)}
                      <div className="flex-1 text-sm">
                        <p className="font-medium">{update.message}</p>
                        <p className="text-gray-500">App #{update.applicationId}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatTimeAgo(update.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationCenter;
