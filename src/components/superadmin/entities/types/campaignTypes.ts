
export interface CampaignFormData {
  // Basic Info
  name: string;
  vertical: string;
  targetStates: string[];
  callDurationRequirement: number;
  
  // Routing Details
  assignedAgents?: string[];
  concurrencyCapPerAgent?: number;
  schedule: {
    start: string;
    end: string;
    days: string[];
    timezone?: string;
    operationType?: "allDays" | "specificDays";
    daySchedules?: {
      [key: string]: {
        start: string;
        end: string;
        closed: boolean;
      };
    };
  };
  recordingEnabled?: boolean;
  fallbackBehavior: "redirect_url" | "return_publisher" | "custom_message";
  fallbackUrl?: string;
  fallbackMessage?: string;
  whisperMessage?: string;
  
  // Settings
  maxConcurrency: number;
  activeImmediately: boolean;
  
  // System fields
  id?: string;
  promoNumber?: string;
  status?: "active" | "paused" | "no_agents";
  callsReceived?: number;
  connectedToAgent?: number;
  fallbacksTriggered?: number;
  createdAt?: string;
}

export const CAMPAIGN_VERTICALS = [
  "Final Expense",
  "Medicare", 
  "Auto Insurance",
  "Home Insurance",
  "Health Insurance",
  "Life Insurance",
  "Debt Settlement",
  "Home Services",
  "Legal"
];
