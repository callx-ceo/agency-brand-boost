
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface RealtimeUpdate {
  type: 'status_change' | 'new_application' | 'carrier_response';
  applicationId: number;
  message: string;
  timestamp: Date;
}

interface RealtimeContextType {
  updates: RealtimeUpdate[];
  clearUpdates: () => void;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export const RealtimeUpdatesProvider = ({ children }: { children: React.ReactNode }) => {
  const [updates, setUpdates] = useState<RealtimeUpdate[]>([]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const updateTypes: RealtimeUpdate['type'][] = ['status_change', 'new_application', 'carrier_response'];
      const randomType = updateTypes[Math.floor(Math.random() * updateTypes.length)];
      
      const newUpdate: RealtimeUpdate = {
        type: randomType,
        applicationId: Math.floor(Math.random() * 1000),
        message: getUpdateMessage(randomType),
        timestamp: new Date()
      };

      setUpdates(prev => [newUpdate, ...prev.slice(0, 9)]); // Keep last 10 updates
      
      // Show toast notification
      toast.info(newUpdate.message, {
        duration: 5000,
        action: {
          label: "View",
          onClick: () => console.log("Navigate to application:", newUpdate.applicationId)
        }
      });
    }, 30000); // Check for updates every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getUpdateMessage = (type: RealtimeUpdate['type']): string => {
    switch (type) {
      case 'status_change':
        return "Application status updated by carrier";
      case 'new_application':
        return "New application submitted";
      case 'carrier_response':
        return "Carrier response received";
      default:
        return "Application update";
    }
  };

  const clearUpdates = () => setUpdates([]);

  return (
    <RealtimeContext.Provider value={{ updates, clearUpdates }}>
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtimeUpdates = () => {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error('useRealtimeUpdates must be used within RealtimeUpdatesProvider');
  }
  return context;
};
