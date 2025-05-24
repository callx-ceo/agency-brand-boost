import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { Plus, Eye, Pause, Play, Trash2, Search, ArrowRight, CheckCircle } from "lucide-react";

interface Publisher {
  id: string;
  name: string;
  email: string;
  status: "active" | "paused" | "disabled";
  assignedCampaigns: string[];
  callsDelivered: number;
  conversionRate: number;
  createdAt: string;
}

const PublishersTab = () => {
  // Mock current plan - starting with starter to show gating walkthrough
  const [currentPlan, setCurrentPlan] = useState("agency_starter");
  const isEnterprise = currentPlan === "enterprise";
  const [showUpgradeWalkthrough, setShowUpgradeWalkthrough] = useState(false);

  // Mock current plan - this would come from your auth/billing context
  // const currentPlan = "enterprise"; // Change to "enterprise" to test the feature
  // const isEnterprise = currentPlan === "enterprise";

  const [publishers, setPublishers] = useState<Publisher[]>([
    {
      id: "pub_abc123",
      name: "TrafficBoost Media",
      email: "contact@trafficboost.com",
      status: "active",
      assignedCampaigns: ["Final Expense Inbound", "Medicare Warm Transfer"],
      callsDelivered: 240,
      conversionRate: 63.2,
      createdAt: "2024-11-12"
    },
    {
      id: "pub_def456",
      name: "LeadGen Pro",
      email: "info@leadgenpro.com",
      status: "active",
      assignedCampaigns: ["Auto Insurance Leads"],
      callsDelivered: 150,
      conversionRate: 45.8,
      createdAt: "2024-11-10"
    },
    {
      id: "pub_ghi789",
      name: "Premium Partners",
      email: "hello@premiumpartners.com",
      status: "paused",
      assignedCampaigns: ["Life Insurance Warm Transfer"],
      callsDelivered: 89,
      conversionRate: 72.1,
      createdAt: "2024-11-08"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Mock campaigns data
  const campaigns = [
    "Final Expense Inbound",
    "Medicare Warm Transfer", 
    "Auto Insurance Leads",
    "Life Insurance Warm Transfer",
    "Home Security Leads"
  ];

  const [newPublisher, setNewPublisher] = useState({
    name: "",
    email: "",
    assignedCampaigns: [] as string[],
    notes: ""
  });

  // Simulate upgrade process
  const handleUpgradeToEnterprise = () => {
    setCurrentPlan("enterprise");
    setShowUpgradeWalkthrough(false);
    toast.success("Successfully upgraded to Enterprise! Publishers feature unlocked.");
  };

  const handleStartUpgradeWalkthrough = () => {
    setShowUpgradeWalkthrough(true);
  };

  const filteredPublishers = publishers.filter(publisher =>
    publisher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publisher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "paused": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "disabled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleAddPublisher = () => {
    if (!newPublisher.name || !newPublisher.email) {
      toast.error("Please fill in required fields");
      return;
    }

    const publisher: Publisher = {
      id: `pub_${Date.now()}`,
      name: newPublisher.name,
      email: newPublisher.email,
      status: "active",
      assignedCampaigns: newPublisher.assignedCampaigns,
      callsDelivered: 0,
      conversionRate: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setPublishers([...publishers, publisher]);
    setNewPublisher({ name: "", email: "", assignedCampaigns: [], notes: "" });
    setIsAddModalOpen(false);
    toast.success("Publisher added successfully");
  };

  const handleStatusChange = (publisherId: string, newStatus: "active" | "paused" | "disabled") => {
    setPublishers(publishers.map(publisher => 
      publisher.id === publisherId 
        ? { ...publisher, status: newStatus }
        : publisher
    ));
    toast.success(`Publisher status updated to ${newStatus}`);
  };

  const handleViewPublisher = (publisher: Publisher) => {
    setSelectedPublisher(publisher);
    setIsDetailModalOpen(true);
  };

  if (!isEnterprise) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Publishers</h2>
        <Alert className="border-blue-200 bg-blue-50">
          <AlertTitle className="flex items-center gap-2">
            Enterprise Feature Required
            <Badge variant="outline" className="bg-orange-100 text-orange-600 border-orange-200">
              Current: {currentPlan === "agency_starter" ? "Agency Starter" : "Agency Pro"}
            </Badge>
          </AlertTitle>
          <AlertDescription className="mt-4">
            <div className="space-y-4">
              <p>
                Publisher management is an exclusive Enterprise feature that allows you to manage traffic partners, 
                track performance, and scale your agency operations with advanced routing capabilities.
              </p>
              
              {/* Upgrade Walkthrough */}
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-lg">Unlock Publishers with Enterprise</h4>
                  <Button 
                    onClick={handleStartUpgradeWalkthrough}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Start Upgrade Walkthrough
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium mb-3 text-gray-600">What you'll get:</h5>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Unlimited publisher management",
                        "Advanced traffic attribution tracking", 
                        "Custom campaign assignments per publisher",
                        "Detailed performance analytics & reporting",
                        "Automated fallback routing",
                        "White-label publisher portals",
                        "Priority enterprise support"
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-l pl-6">
                    <div className="text-center space-y-3">
                      <div>
                        <p className="text-3xl font-bold text-blue-600">$1,997</p>
                        <p className="text-sm text-gray-600">per month</p>
                      </div>
                      <Badge className="bg-green-100 text-green-600 border-green-200">
                        Full Publisher Management
                      </Badge>
                      <p className="text-xs text-gray-500">
                        Billed annually • Cancel anytime
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Upgrade Walkthrough Modal */}
        <Dialog open={showUpgradeWalkthrough} onOpenChange={setShowUpgradeWalkthrough}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upgrade to Enterprise</DialogTitle>
              <DialogDescription>
                Unlock publisher management and advanced agency features
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Plan Comparison */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Current: Agency Starter</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Up to 5 agent licenses</li>
                    <li>• Basic campaign management</li>
                    <li>• Standard analytics</li>
                    <li>• Email support</li>
                  </ul>
                  <p className="font-bold mt-3">$497/month</p>
                </div>
                
                <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                  <h4 className="font-semibold mb-2 text-blue-700">Upgrade: Enterprise</h4>
                  <ul className="text-sm space-y-1 text-blue-600">
                    <li>• Unlimited agent licenses</li>
                    <li>• Publisher management</li>
                    <li>• Advanced analytics & reporting</li>
                    <li>• Priority support</li>
                    <li>• White-label options</li>
                  </ul>
                  <p className="font-bold mt-3 text-blue-700">$1,997/month</p>
                </div>
              </div>
              
              {/* Demo Preview */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h5 className="font-medium mb-3">Publishers Dashboard Preview:</h5>
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>TrafficBoost Media</span>
                    <Badge className="bg-green-100 text-green-600 text-xs">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>LeadGen Pro</span>
                    <Badge className="bg-green-100 text-green-600 text-xs">Active</Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    + Full publisher performance analytics, campaign assignments, and routing controls
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowUpgradeWalkthrough(false)}>
                  Maybe Later
                </Button>
                <Button 
                  onClick={handleUpgradeToEnterprise}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Upgrade to Enterprise - $1,997/month
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Publishers</h2>
          <Badge className="bg-green-100 text-green-600 border-green-200 mt-2">
            Enterprise Feature Unlocked
          </Badge>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Publisher
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Publisher</DialogTitle>
              <DialogDescription>
                Add a new traffic partner to manage campaigns and track performance.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="publisher-name">Publisher Name *</Label>
                <Input 
                  id="publisher-name"
                  value={newPublisher.name}
                  onChange={(e) => setNewPublisher({...newPublisher, name: e.target.value})}
                  placeholder="Enter publisher name"
                />
              </div>
              <div>
                <Label htmlFor="publisher-email">Contact Email *</Label>
                <Input 
                  id="publisher-email"
                  type="email"
                  value={newPublisher.email}
                  onChange={(e) => setNewPublisher({...newPublisher, email: e.target.value})}
                  placeholder="contact@publisher.com"
                />
              </div>
              <div>
                <Label>Assign to Campaigns</Label>
                <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                  {campaigns.map((campaign) => (
                    <label key={campaign} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newPublisher.assignedCampaigns.includes(campaign)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewPublisher({
                              ...newPublisher,
                              assignedCampaigns: [...newPublisher.assignedCampaigns, campaign]
                            });
                          } else {
                            setNewPublisher({
                              ...newPublisher,
                              assignedCampaigns: newPublisher.assignedCampaigns.filter(c => c !== campaign)
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{campaign}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="publisher-notes">Notes (Optional)</Label>
                <Input 
                  id="publisher-notes"
                  value={newPublisher.notes}
                  onChange={(e) => setNewPublisher({...newPublisher, notes: e.target.value})}
                  placeholder="Additional notes about this publisher"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPublisher}>
                  Create Publisher
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Publishers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Publishers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {publishers.filter(p => p.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Calls Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {publishers.reduce((sum, p) => sum + p.callsDelivered, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {publishers.length > 0 
                ? (publishers.reduce((sum, p) => sum + p.conversionRate, 0) / publishers.length).toFixed(1)
                : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search publishers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Publishers Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Publisher Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned Campaigns</TableHead>
              <TableHead>Calls Delivered</TableHead>
              <TableHead>Conversion Rate</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPublishers.map((publisher) => (
              <TableRow key={publisher.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{publisher.name}</div>
                    <div className="text-sm text-gray-500">{publisher.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(publisher.status)}>
                    {publisher.status.charAt(0).toUpperCase() + publisher.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {publisher.assignedCampaigns.map((campaign, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {campaign}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{publisher.callsDelivered.toLocaleString()}</TableCell>
                <TableCell>{publisher.conversionRate}%</TableCell>
                <TableCell>{publisher.createdAt}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewPublisher(publisher)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStatusChange(
                        publisher.id, 
                        publisher.status === "active" ? "paused" : "active"
                      )}
                    >
                      {publisher.status === "active" ? 
                        <Pause className="w-4 h-4" /> : 
                        <Play className="w-4 h-4" />
                      }
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Publisher Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Publisher Details</DialogTitle>
            <DialogDescription>
              View and manage publisher information and performance.
            </DialogDescription>
          </DialogHeader>
          {selectedPublisher && (
            <div className="space-y-6">
              {/* Publisher Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Publisher Name</Label>
                  <p className="mt-1">{selectedPublisher.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Contact Email</Label>
                  <p className="mt-1">{selectedPublisher.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Status</Label>
                  <div className="mt-1">
                    <Badge className={getStatusBadgeColor(selectedPublisher.status)}>
                      {selectedPublisher.status.charAt(0).toUpperCase() + selectedPublisher.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Date Added</Label>
                  <p className="mt-1">{selectedPublisher.createdAt}</p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Calls Delivered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{selectedPublisher.callsDelivered}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{selectedPublisher.conversionRate}%</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{selectedPublisher.assignedCampaigns.length}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Assigned Campaigns */}
              <div>
                <Label className="text-sm font-medium text-gray-600">Assigned Campaigns</Label>
                <div className="mt-2 space-y-2">
                  {selectedPublisher.assignedCampaigns.map((campaign, index) => (
                    <Badge key={index} variant="outline">
                      {campaign}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                  Close
                </Button>
                <Button 
                  variant={selectedPublisher.status === "active" ? "secondary" : "default"}
                  onClick={() => {
                    handleStatusChange(
                      selectedPublisher.id, 
                      selectedPublisher.status === "active" ? "paused" : "active"
                    );
                    setIsDetailModalOpen(false);
                  }}
                >
                  {selectedPublisher.status === "active" ? "Pause Publisher" : "Activate Publisher"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PublishersTab;
