
export interface CampaignOffer {
  id?: string;
  payout: number;
  payoutType: "per_call" | "per_minute" | "per_conversion";
  qualificationCriteria?: string;
  minimumCallDuration?: number; // in seconds
  conversionGoal?: string;
}

export interface IVRFilter {
  id: string;
  name: string;
}

export interface DestinationOffer {
  id: string;
  offerName: string;
  advertiserName: string;
  weight: number;
  ivrEnabled: boolean;
  ivrFilter: string;
  destinationPayout: number;
  connectDuration: string;
  publisherPayout: number;
  epc: number;
  isPaused: boolean;
  isSuspended: boolean;
}

export interface IVRTreeKey {
  id: string;
  key: string;
  action: string;
  ivrFilter: string;
  playPromptFirst: boolean;
  promptText?: string;
}

export interface CampaignFormData {
  // Basic Info
  name: string;
  description?: string;
  vertical: string;
  language: string;
  targetStates: string[];
  
  // Campaign Type & Config
  campaignType?: "bundle" | "single";
  category?: string;
  ivrFilters?: IVRFilter[];
  destinationOffers?: DestinationOffer[];
  callDistribution?: "weighted" | "yield" | "round-robin";
  callDistributionValue?: number; // 0-100 for slider
  
  // Campaign Settings
  payout?: number;
  expirationDate?: "ongoing" | "expires";
  expirationValue?: string;
  repeatCalls?: boolean;
  recordCalls?: boolean;
  greetingRecording?: boolean;
  leadSettings?: boolean;
  offHoursMessage?: boolean;
  visibilitySettings?: "all_publishers" | "approved_publishers" | "invitation_only";
  
  // IVR Tree
  ivrStartAction?: string;
  ivrGreeting?: string;
  ivrKeys?: IVRTreeKey[];
  
  // Legacy fields for compatibility
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
  whisperMessage?: string;
  
  // Overflow Management
  overflowBehavior?: "internal_redirect" | "offer_marketplace" | "drop_queue";
  overflowDestination?: string; // URL or phone number for internal redirect
  
  // Settings
  activeImmediately: boolean;
  
  // System fields
  id?: string;
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
