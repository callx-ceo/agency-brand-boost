import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Circle, ChevronDown, Clock, Phone, Minus } from 'lucide-react';

type PresenceStatus = 'available' | 'away' | 'in-call' | 'offline';

interface PresenceControlProps {
  canTakeCalls?: boolean;
  initialStatus?: PresenceStatus;
  onStatusChange?: (status: PresenceStatus) => void;
  className?: string;
}

export const PresenceControl: React.FC<PresenceControlProps> = ({
  canTakeCalls = true,
  initialStatus = 'offline',
  onStatusChange,
  className = ''
}) => {
  const [currentStatus, setCurrentStatus] = useState<PresenceStatus>(initialStatus);

  const presenceOptions = [
    {
      status: 'available' as const,
      label: 'Available',
      description: 'Ready to receive calls',
      icon: Circle,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200'
    },
    {
      status: 'away' as const,
      label: 'Away',
      description: 'Temporarily unavailable',
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-200'
    },
    {
      status: 'in-call' as const,
      label: 'In Call',
      description: 'Currently on a call',
      icon: Phone,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200',
      disabled: true // Users can't manually set this
    },
    {
      status: 'offline' as const,
      label: 'Offline',
      description: 'Not available for calls',
      icon: Minus,
      color: 'text-gray-500',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-200'
    }
  ];

  const currentPresence = presenceOptions.find(option => option.status === currentStatus);

  const handleStatusChange = (newStatus: PresenceStatus) => {
    setCurrentStatus(newStatus);
    onStatusChange?.(newStatus);
  };

  const getStatusBadge = (status: PresenceStatus) => {
    const option = presenceOptions.find(opt => opt.status === status);
    if (!option) return null;

    const { icon: Icon, color, bgColor, borderColor } = option;

    return (
      <Badge 
        variant="outline" 
        className={`${bgColor} ${borderColor} border`}
      >
        <Icon className={`h-3 w-3 mr-1 ${color}`} />
        <span className={color.replace('text-', 'text-')}>{option.label}</span>
      </Badge>
    );
  };

  // If user can't take calls, show disabled state
  if (!canTakeCalls) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Badge variant="secondary">
          <Minus className="h-3 w-3 mr-1 text-gray-400" />
          <span>Cannot Take Calls</span>
        </Badge>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            {currentPresence && (
              <>
                <currentPresence.icon className={`h-4 w-4 ${currentPresence.color}`} />
                <span>{currentPresence.label}</span>
                <ChevronDown className="h-3 w-3" />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {presenceOptions
            .filter(option => !option.disabled) // Hide "In Call" from manual selection
            .map((option) => (
              <DropdownMenuItem
                key={option.status}
                onClick={() => handleStatusChange(option.status)}
                className="flex items-start space-x-3 p-3"
              >
                <div className={`p-1 rounded-full ${option.bgColor}`}>
                  <option.icon className={`h-3 w-3 ${option.color}`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {option.description}
                  </div>
                </div>
                {currentStatus === option.status && (
                  <Circle className="h-2 w-2 fill-primary text-primary" />
                )}
              </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Status indicator for compact view */}
      <div className="hidden sm:block">
        {getStatusBadge(currentStatus)}
      </div>
    </div>
  );
};