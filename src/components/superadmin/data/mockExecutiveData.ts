
export const mockExecutiveDashboardData = {
  totalPlatformRevenue: 2400000,
  totalCallVolume: 15847,
  liveCalls: 47,
  endedCalls: 1204,
  globalConversionRate: 23.4,
  systemUptime: 99.97,
  totalAgencies: 47,
  activeAgencies: 44,
  totalAgents: 312,
  activeAgents: 289,
  totalAdvertisers: 89,
  activeAdvertisers: 78,
  totalPublishers: 156,
  activePublishers: 142,
  avgRevenuePerAgent: 7650,
  advertiserROI: 340,
  systemCapacityUtilization: 67,
  complianceScore: 98.2,
  activeSecurityAlerts: 3,
  fraudDetectionAlerts: 1,
  pendingAgencies: 3,
  suspendedAgents: 8,
  advertisersUnderReview: 7,
  publishersAwaitingApproval: 14,
};

export const getKPIValue = (kpiId: string) => {
  const data = mockExecutiveDashboardData;
  switch (kpiId) {
    case 'platform-revenue': return { value: `$${(data.totalPlatformRevenue / 1000000).toFixed(1)}M`, trend: "+18.5%", trendColor: "text-green-600" };
    case 'call-volume': return { value: data.totalCallVolume.toLocaleString(), trend: "+1,247", trendColor: "text-green-600" };
    case 'conversion-rate': return { value: `${data.globalConversionRate}%`, trend: "+2.1%", trendColor: "text-green-600" };
    case 'system-uptime': return { value: `${data.systemUptime}%`, trend: "99.9% SLA", trendColor: "text-green-600" };
    case 'active-agencies': return { value: data.activeAgencies.toString(), trend: `${data.pendingAgencies} pending`, trendColor: "text-blue-600" };
    case 'active-agents': return { value: data.activeAgents.toString(), trend: `${data.suspendedAgents} suspended`, trendColor: data.suspendedAgents > 5 ? "text-orange-600" : "text-green-600" };
    case 'total-advertisers': return { value: data.totalAdvertisers.toString(), trend: `${data.advertisersUnderReview} under review`, trendColor: "text-blue-600" };
    case 'total-publishers': return { value: data.totalPublishers.toString(), trend: `${data.publishersAwaitingApproval} awaiting`, trendColor: "text-orange-600" };
    case 'avg-revenue-agent': return { value: `$${data.avgRevenuePerAgent.toLocaleString()}`, trend: "+$450", trendColor: "text-green-600" };
    case 'advertiser-roi': return { value: `${data.advertiserROI}%`, trend: "+15%", trendColor: "text-green-600" };
    case 'system-capacity': return { value: `${data.systemCapacityUtilization}%`, trend: "Normal", trendColor: "text-green-600" };
    case 'compliance-score': return { value: `${data.complianceScore}%`, trend: "+0.3%", trendColor: "text-green-600" };
    default: return { value: "0", trend: "0%", trendColor: "text-gray-600" };
  }
};
