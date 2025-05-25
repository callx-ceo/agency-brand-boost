
import React from "react";
import { Button } from "@/components/ui/button";

type ViewType = 'dashboard' | 'agent-reports' | 'contacts' | 'realtime-report' | 'call-history';

interface NavigationTabsProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const NavigationTabs = ({ activeView, onViewChange }: NavigationTabsProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant={activeView === 'dashboard' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onViewChange('dashboard')}
      >
        Dashboard
      </Button>
      <Button 
        variant={activeView === 'agent-reports' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onViewChange('agent-reports')}
      >
        Agent Reports
      </Button>
      <Button 
        variant={activeView === 'contacts' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onViewChange('contacts')}
      >
        Contacts
      </Button>
      <Button 
        variant={activeView === 'realtime-report' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onViewChange('realtime-report')}
      >
        Realtime
      </Button>
      <Button 
        variant={activeView === 'call-history' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onViewChange('call-history')}
      >
        Call History
      </Button>
    </div>
  );
};

export default NavigationTabs;
