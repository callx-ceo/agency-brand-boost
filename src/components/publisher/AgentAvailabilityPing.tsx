import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, Eye, EyeOff, RotateCcw, Play, AlertCircle, CheckCircle, XCircle, HelpCircle, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock campaigns data with different verticals
const mockCampaigns = [
  { id: "MEDICARE_US", name: "Medicare Advantage", vertical: "Medicare", region: "US" },
  { id: "LIFE_FINAL_US", name: "Final Expense Life", vertical: "Life Insurance", region: "US" },
  { id: "AUTO_US", name: "Auto Insurance", vertical: "Auto", region: "US" },
  { id: "HEALTH_US", name: "Health Insurance", vertical: "Health", region: "US" },
];

// Mock API responses per vertical
const mockResponses = {
  MEDICARE_US: {
    available: true,
    capacity_open: 3,
    estimated_queue_ms: 1200,
    reason: "agents_available",
    ttl_ms: 30000,
    vertical_specific: {
      licensed_states: ["FL", "TX", "CA"],
      medicare_certified: true
    }
  },
  LIFE_FINAL_US: {
    available: false,
    capacity_open: 0,
    estimated_queue_ms: 45000,
    reason: "all_agents_busy",
    ttl_ms: 15000,
    vertical_specific: {
      licensed_states: ["FL", "TX"],
      life_licensed: true
    }
  },
  AUTO_US: {
    available: true,
    capacity_open: 5,
    estimated_queue_ms: 800,
    reason: "agents_available",
    ttl_ms: 30000,
    vertical_specific: {
      licensed_states: ["CA", "NY", "FL"],
      auto_certified: true
    }
  },
  HEALTH_US: {
    available: true,
    capacity_open: 2,
    estimated_queue_ms: 2100,
    reason: "limited_availability",
    ttl_ms: 20000,
    vertical_specific: {
      licensed_states: ["TX", "CA"],
      health_licensed: true
    }
  }
};

const AgentAvailabilityPing = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<string>("");
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [testLoading, setTestLoading] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'available' | 'unavailable' | 'error'>('idle');
  const [requestTime, setRequestTime] = useState<number>(0);
  const [rotateKeyOpen, setRotateKeyOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  // Feature flag check (mocked)
  const isFeatureEnabled = true; // In real app: useFeatureFlag('publisher_availability_ping_ui')

  const mockApiKey = "pk_live_abcd1234efgh5678ijkl9012mnop3456";
  const publisherId = "PUB123";

  const generatePingUrl = (campaignId: string) => {
    return `https://app.callx.com/api/v1/availability/ping?publisher_id=${publisherId}&campaign_id=${campaignId}&api_key=${mockApiKey}`;
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied",
        description: `${label} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  const handleTestAvailability = async () => {
    if (!selectedCampaign) return;

    setTestLoading(true);
    const startTime = Date.now();

    // Simulate API call delay
    setTimeout(() => {
      const endTime = Date.now();
      setRequestTime(endTime - startTime);

      const response = mockResponses[selectedCampaign as keyof typeof mockResponses];
      setTestResult(response);
      setTestStatus(response.available ? 'available' : 'unavailable');
      setTestLoading(false);

      // Fire analytics event (mocked)
      console.log('Analytics: Test availability clicked', { campaignId: selectedCampaign });
    }, Math.random() * 1000 + 500);
  };

  const handleRotateKey = () => {
    // Mock key rotation
    toast({
      title: "API Key Rotated",
      description: "Your new API key has been generated",
    });
    setRotateKeyOpen(false);
    console.log('Analytics: Rotate key action');
  };

  const generateCodeExample = (type: 'curl' | 'javascript' | 'nodejs') => {
    if (!selectedCampaign) return "";

    const url = generatePingUrl(selectedCampaign);

    switch (type) {
      case 'curl':
        return `curl -X GET "${url}" \\
  -H "Content-Type: application/json"`;

      case 'javascript':
        return `fetch('${url}')
  .then(response => response.json())
  .then(data => {
    if (data.available) {
      // Route call to CallX
      console.log('Agents available:', data.capacity_open);
    } else {
      // Handle unavailable state
      console.log('No agents available, reason:', data.reason);
    }
  })
  .catch(error => console.error('Error:', error));`;

      case 'nodejs':
        return `const axios = require('axios');

try {
  const response = await axios.get('${url}');
  const data = response.data;
  
  if (data.available) {
    // Route call to CallX
    console.log('Agents available:', data.capacity_open);
  } else {
    // Handle unavailable state
    console.log('No agents available, reason:', data.reason);
  }
} catch (error) {
  console.error('Error checking availability:', error);
}`;

      default:
        return "";
    }
  };

  if (!isFeatureEnabled) {
    return null;
  }

  const selectedCampaignData = mockCampaigns.find(c => c.id === selectedCampaign);

  return (
    <Card className="w-full" data-testid="availability-ping-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Agent Availability Ping
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Check real-time agent availability for your campaigns before routing calls
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Campaign Selector */}
        <div className="space-y-2">
          <Label htmlFor="campaign-select">Campaign</Label>
          <Select value={selectedCampaign} onValueChange={setSelectedCampaign} data-testid="campaign-selector">
            <SelectTrigger id="campaign-select">
              <SelectValue placeholder="Select a campaign" />
            </SelectTrigger>
            <SelectContent className="bg-background border shadow-lg z-50">
              {mockCampaigns.length === 0 ? (
                <div className="p-4 text-center">
                  <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">
                    No campaigns available. Contact support to request access.
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open('mailto:support@callx.com?subject=Campaign Access Request', '_blank')}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Request Campaign Access
                  </Button>
                </div>
              ) : (
                mockCampaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    <div>
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {campaign.vertical} – {campaign.region} (ID: {campaign.id})
                      </div>
                    </div>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {selectedCampaign && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Ping URL */}
              <div className="space-y-2">
                <Label htmlFor="ping-url">Ping URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="ping-url"
                    value={generatePingUrl(selectedCampaign)}
                    readOnly
                    className="font-mono text-xs"
                    data-testid="ping-url-field"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(generatePingUrl(selectedCampaign), "URL")}
                    data-testid="copy-url-button"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Example query params:</span>
                  <Badge variant="secondary" className="text-xs">min_seconds=90</Badge>
                  <Badge variant="secondary" className="text-xs">max_queue_ms=3000</Badge>
                </div>
              </div>

              {/* API Key Controls */}
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    value={apiKeyVisible ? mockApiKey : "••••••••••••••••••••••••••••••••••••"}
                    readOnly
                    className="font-mono"
                    data-testid="api-key-field"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setApiKeyVisible(!apiKeyVisible);
                      console.log('Analytics:', apiKeyVisible ? 'Hide key' : 'Show key');
                    }}
                    data-testid="toggle-api-key-button"
                  >
                    {apiKeyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Dialog open={rotateKeyOpen} onOpenChange={setRotateKeyOpen}>
                  <DialogTrigger asChild>
                    <Button variant="link" size="sm" className="p-0 h-auto text-xs" data-testid="rotate-key-button">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Rotate key
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Rotate API Key</DialogTitle>
                      <DialogDescription>
                        This will generate a new API key and invalidate the current one. 
                        Make sure to update all your integrations with the new key.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setRotateKeyOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleRotateKey}>
                        Rotate Key
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Live Test Panel */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Live Test</Label>
                  <Button
                    size="sm"
                    onClick={handleTestAvailability}
                    disabled={!selectedCampaign || testLoading}
                    data-testid="test-availability-button"
                  >
                    {testLoading ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Test Availability
                      </>
                    )}
                  </Button>
                </div>

                {testResult && (
                  <div className="border rounded-lg p-4 space-y-3" data-testid="test-result-panel">
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={testStatus === 'available' ? 'default' : testStatus === 'unavailable' ? 'secondary' : 'destructive'}
                        className={testStatus === 'available' ? 'bg-green-500 text-white' : ''}
                      >
                        {testStatus === 'available' ? <CheckCircle className="h-3 w-3 mr-1" /> : 
                         testStatus === 'unavailable' ? <AlertCircle className="h-3 w-3 mr-1" /> :
                         <XCircle className="h-3 w-3 mr-1" />}
                        {testStatus === 'available' ? 'Available' : 
                         testStatus === 'unavailable' ? 'Unavailable' : 'Error'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{requestTime}ms</span>
                    </div>
                    <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-48">
                      {JSON.stringify(testResult, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Code Examples */}
              <div className="space-y-3">
                <Label>Quick Examples</Label>
                <Tabs defaultValue="curl" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="nodejs">Node.js</TabsTrigger>
                  </TabsList>

                  {(['curl', 'javascript', 'nodejs'] as const).map((type) => (
                    <TabsContent key={type} value={type} className="relative">
                      <div className="relative">
                        <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto max-h-64 pr-12">
                          <code>{generateCodeExample(type)}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            copyToClipboard(generateCodeExample(type), "code");
                            console.log('Analytics: Copy code clicked', { type });
                          }}
                          data-testid={`copy-${type}-button`}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              {/* Help Link */}
              <div className="pt-4 border-t">
                <Sheet open={helpOpen} onOpenChange={setHelpOpen}>
                  <SheetTrigger asChild>
                    <Button variant="link" size="sm" className="p-0 h-auto text-xs" data-testid="help-button">
                      <HelpCircle className="h-3 w-3 mr-1" />
                      What does this mean?
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[400px] sm:w-[540px] overflow-auto">
                    <SheetHeader>
                      <SheetTitle>Agent Availability API Guide</SheetTitle>
                      <SheetDescription>
                        Understanding the availability response and best practices
                      </SheetDescription>
                    </SheetHeader>

                    <div className="mt-6 space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Response Fields</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <strong>available:</strong> Boolean indicating if at least one eligible agent slot is open for this campaign
                          </div>
                          <div>
                            <strong>capacity_open:</strong> Number of agent slots currently available
                          </div>
                          <div>
                            <strong>estimated_queue_ms:</strong> Expected wait time in milliseconds before an agent becomes available
                          </div>
                          <div>
                            <strong>ttl_ms:</strong> Safe cache time on your side - how long this response remains valid
                          </div>
                          <div>
                            <strong>reason:</strong> Context for the availability status (agents_available, all_agents_busy, etc.)
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium mb-2">Best Practices</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>• Check availability before routing high-value calls</p>
                          <p>• If unavailable, route callers to your own flows or try again later</p>
                          <p>• Cache responses for the TTL duration to reduce API calls</p>
                          <p>• Consider queue times when setting caller expectations</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium mb-3">Sample Responses</h4>
                        <div className="space-y-3">
                          <div className="border rounded p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-green-500 text-white">Available</Badge>
                              <span className="text-sm font-medium">Route to CallX</span>
                            </div>
                            <pre className="text-xs text-muted-foreground">
{`{
  "available": true,
  "capacity_open": 3,
  "estimated_queue_ms": 1200
}`}
                            </pre>
                          </div>
                          <div className="border rounded p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">Unavailable</Badge>
                              <span className="text-sm font-medium">Use fallback flow</span>
                            </div>
                            <pre className="text-xs text-muted-foreground">
{`{
  "available": false,
  "capacity_open": 0,
  "reason": "all_agents_busy"
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentAvailabilityPing;