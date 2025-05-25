
import { CampaignPublisherData, CampaignTotals } from "@/types/leadsTypes";

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "New": return "bg-blue-100 text-blue-800";
    case "Qualified": return "bg-green-100 text-green-800";
    case "Contacted": return "bg-purple-100 text-purple-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export const calculateTotals = (data: CampaignPublisherData[]): CampaignTotals => {
  return {
    leads: data.reduce((sum, row) => sum + row.leads, 0),
    transferred: data.reduce((sum, row) => sum + row.transferred, 0),
    paid: data.reduce((sum, row) => sum + row.paid, 0),
    revenue: "$120.00",
    cost: "$108.00",
    profit: "$12.00"
  };
};
