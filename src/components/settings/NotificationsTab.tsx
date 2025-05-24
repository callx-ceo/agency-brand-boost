
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertCircle, DollarSign, Phone, Users, Settings } from "lucide-react";
import { toast } from "sonner";

type NotificationType = "all" | "system" | "billing" | "calls" | "agents";

type NotificationPriority = "low" | "medium" | "high" | "critical";

interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  actionUrl?: string;
  priority: NotificationPriority;
  createdAt: string;
  read: boolean;
  category: NotificationType;
}

const NotificationsTab = () => {
  const [activeFilter, setActiveFilter] = useState<NotificationType>("all");
  
  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif_001",
      userId: "admin_001",
      type: "call_volume_drop",
      title: "📉 Call Volume Down",
      message: "Your call volume is down 42% vs. yesterday.",
      actionUrl: "/campaigns",
      priority: "high",
      createdAt: "2025-05-24T07:30:00Z",
      read: false,
      category: "calls"
    },
    {
      id: "notif_002",
      userId: "admin_001",
      type: "wallet_low_balance",
      title: "💳 Low Wallet Balance",
      message: "Wallet below $100—top up now to avoid call interruptions.",
      actionUrl: "/billing",
      priority: "critical",
      createdAt: "2025-05-24T06:45:00Z",
      read: false,
      category: "billing"
    },
    {
      id: "notif_003",
      userId: "admin_001",
      type: "new_agent_added",
      title: "👥 New Agent Onboarded",
      message: "New agent onboarded: Jane Doe is ready to take calls.",
      actionUrl: "/team",
      priority: "medium",
      createdAt: "2025-05-24T05:12:00Z",
      read: true,
      category: "agents"
    },
    {
      id: "notif_004",
      userId: "admin_001",
      type: "call_routing_failed",
      title: "⚠️ Call Routing Issues",
      message: "5 calls failed to route—no agents available during peak hours.",
      actionUrl: "/campaigns",
      priority: "high",
      createdAt: "2025-05-23T23:30:00Z",
      read: false,
      category: "calls"
    },
    {
      id: "notif_005",
      userId: "admin_001",
      type: "system_update",
      title: "🔧 System Maintenance",
      message: "Scheduled maintenance completed. All systems operational.",
      priority: "low",
      createdAt: "2025-05-23T20:00:00Z",
      read: true,
      category: "system"
    }
  ]);

  const filters = [
    { key: "all" as const, label: "All", icon: <Bell className="w-4 h-4" /> },
    { key: "system" as const, label: "System", icon: <Settings className="w-4 h-4" /> },
    { key: "billing" as const, label: "Billing", icon: <DollarSign className="w-4 h-4" /> },
    { key: "calls" as const, label: "Calls", icon: <Phone className="w-4 h-4" /> },
    { key: "agents" as const, label: "Agents", icon: <Users className="w-4 h-4" /> },
  ];

  const filteredNotifications = notifications.filter(notification => 
    activeFilter === "all" || notification.category === activeFilter
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const getPriorityColor = (priority: NotificationPriority) => {
    switch (priority) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    toast.success("Notification marked as read");
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast.success("All notifications marked as read");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-gray-600">Stay updated on important events and system changes</p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline">
            Mark All as Read ({unreadCount})
          </Button>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? "default" : "outline"}
            onClick={() => setActiveFilter(filter.key)}
            className="flex items-center gap-2"
          >
            {filter.icon}
            {filter.label}
            {filter.key === "all" && unreadCount > 0 && (
              <Badge variant="destructive" className="ml-1">
                {unreadCount}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Bell className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-500">
                {activeFilter === "all" 
                  ? "You're all caught up! No new notifications to display."
                  : `No ${activeFilter} notifications at this time.`
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`cursor-pointer transition-colors ${
                !notification.read 
                  ? "bg-blue-50 border-blue-200" 
                  : "bg-white"
              }`}
              onClick={() => !notification.read && markAsRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`} />
                      <h3 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <Badge variant="secondary" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {getRelativeTime(notification.createdAt)}
                      </span>
                      {notification.actionUrl && (
                        <Button variant="link" size="sm" className="p-0 h-auto">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                  {notification.priority === "critical" && (
                    <AlertCircle className="w-5 h-5 text-red-500 ml-2 flex-shrink-0" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsTab;
