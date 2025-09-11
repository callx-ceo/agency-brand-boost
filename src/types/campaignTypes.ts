
export interface Campaign {
  id: string;
  name: string;
  type: string;
  category: string;
  vertical: string;
  language: string;
  accepts: string;
  approvedPublishers: number;
  pendingPublishers: number;
  callsToday: number;
  callsMTD: number;
  revenueToday: number;
  revenueMTD: number;
  conversionRateMTD: number;
  status: "active" | "paused" | "pending";
}
