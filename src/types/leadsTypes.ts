
export interface LeadSummaryStats {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  conversionRate: number;
  avgResponseTime: number;
  monthlyGrowth: number;
}

export interface RecentLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  campaign: string;
  status: string;
  score: number;
  createdAt: string;
}

export interface CampaignPublisherData {
  campaign: string;
  publisher: string;
  leads: number;
  smsConv: number;
  smsConvRate: string;
  ivrConv: number;
  ivrConvRate: string;
  scheduledCalls: number;
  scheduledCallsRate: string;
  transferred: number;
  transferRate: string;
  paid: number;
  convRate: string;
  revenue: string;
  cost: string;
  profit: string;
  avgRPL: string;
  avgCPL: string;
  optOut: number;
  optOutRate: string;
}

export interface CampaignTotals {
  leads: number;
  transferred: number;
  paid: number;
  revenue: string;
  cost: string;
  profit: string;
}
