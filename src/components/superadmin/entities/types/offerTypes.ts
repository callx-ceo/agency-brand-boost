
export interface OfferFormData {
  // Basic Info
  name: string;
  type: "internal" | "external";
  vertical: string;
  targetStates: string[];
  callDurationRequirement: number;
  
  // Routing Details
  externalDestination?: string;
  fallbackNumber?: string;
  assignedAgents?: string[];
  concurrencyCapPerAgent?: number;
  schedule: {
    start: string;
    end: string;
    days: string[];
  };
  recordingEnabled?: boolean;
  
  // Bidding & Caps
  bidPrice: number;
  dailyCap?: number;
  monthlyCap?: number;
  activeImmediately: boolean;
  
  // System fields
  buyerId?: string;
  id?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  states: string[];
  status: "active" | "inactive";
}

export interface Advertiser {
  id: string;
  name: string;
  companyName: string;
}

export interface Agency {
  id: string;
  name: string;
  companyName: string;
}

export const VERTICALS = [
  "Final Expense",
  "Medicare",
  "Auto Insurance",
  "Home Insurance",
  "Health Insurance",
  "Life Insurance"
];

export const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export const DAYS_OF_WEEK = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];
