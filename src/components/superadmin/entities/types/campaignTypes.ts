
export interface CampaignOffer {
  id?: string;
  payout: number;
  payoutType: "per_call" | "per_minute" | "per_conversion";
  qualificationCriteria?: string;
  minimumCallDuration?: number; // in seconds
  conversionGoal?: string;
}

export interface CampaignFormData {
  // Basic Info
  name: string;
  vertical: string;
  language: string;
  targetStates: string[];
  visibility?: "private" | "marketplace"; // Only for superadmin
  
  // Single Offer (Agency as Advertiser)
  offer?: CampaignOffer;
  
  // Bid Floor Settings
  bidFloorEnabled?: boolean;
  minimumBidFloor?: number;
  bidFloorCurrency?: "USD" | "EUR" | "GBP";
  
  // Routing Details - Agent Visibility
  assignedAgents?: string[]; // All agency agents by default
  blockedAgents?: string[]; // Agents blocked from this campaign
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
  
  // Overflow Management
  overflowBehavior?: "internal_redirect" | "offer_marketplace" | "drop_queue";
  overflowDestination?: string; // URL or phone number for internal redirect
  
  // Settings
  activeImmediately: boolean;
  
  // System fields
  id?: string;
  promoNumber?: string;
  status?: "active" | "paused" | "no_agents";
  callsReceived?: number;
  connectedToAgent?: number;
  fallbacksTriggered?: number;
  createdAt?: string;
  agencyId?: string;
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

export const CAMPAIGN_LANGUAGES = [
  "English",
  "Spanish", 
  "French",
  "Portuguese",
  "Mandarin",
  "Cantonese",
  "Korean",
  "Vietnamese",
  "Arabic",
  "Hindi"
];
