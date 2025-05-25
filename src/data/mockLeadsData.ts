
import { LeadSummaryStats, RecentLead, CampaignPublisherData } from "@/types/leadsTypes";

export const summaryStats: LeadSummaryStats = {
  totalLeads: 4526,
  newLeads: 156,
  qualifiedLeads: 1893,
  convertedLeads: 847,
  conversionRate: 18.7,
  avgResponseTime: 2.4,
  monthlyGrowth: 12.3
};

export const recentLeads: RecentLead[] = [
  {
    id: "L001",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 123-4567",
    source: "Google Ads",
    campaign: "Health Insurance Q4",
    status: "New",
    score: 85,
    createdAt: "2 hours ago"
  },
  {
    id: "L002", 
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 (555) 234-5678",
    source: "Facebook",
    campaign: "Life Insurance Campaign",
    status: "Qualified",
    score: 92,
    createdAt: "4 hours ago"
  },
  {
    id: "L003",
    name: "Emily Rodriguez", 
    email: "emily.r@email.com",
    phone: "+1 (555) 345-6789",
    source: "LinkedIn",
    campaign: "Auto Insurance",
    status: "Contacted",
    score: 78,
    createdAt: "6 hours ago"
  }
];

export const campaignsByPublisher: CampaignPublisherData[] = [
  {
    campaign: "Final Expense - Social - No IVR",
    publisher: "Taboola",
    leads: 6,
    smsConv: 0,
    smsConvRate: "0%",
    ivrConv: 2,
    ivrConvRate: "33.34%",
    scheduledCalls: 0,
    scheduledCallsRate: "0%",
    transferred: 2,
    transferRate: "33.34%",
    paid: 0,
    convRate: "0%",
    revenue: "$0.00",
    cost: "$0.00",
    profit: "$0.00",
    avgRPL: "$0.00",
    avgCPL: "$0.00",
    optOut: 0,
    optOutRate: "0%"
  },
  {
    campaign: "Auto Insurance Bundle",
    publisher: "Bing",
    leads: 17,
    smsConv: 0,
    smsConvRate: "0%",
    ivrConv: 17,
    ivrConvRate: "100%",
    scheduledCalls: 0,
    scheduledCallsRate: "0%",
    transferred: 10,
    transferRate: "58.83%",
    paid: 6,
    convRate: "35.30%",
    revenue: "$120.00",
    cost: "$108.00",
    profit: "$12.00",
    avgRPL: "$7.06",
    avgCPL: "$6.35",
    optOut: 0,
    optOutRate: "0%"
  }
];
