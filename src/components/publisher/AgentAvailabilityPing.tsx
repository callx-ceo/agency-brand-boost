import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Copy, Eye, EyeOff, RotateCcw, HelpCircle, Play, CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockCampaigns = [
  { id: "camp_123", name: "Health Insurance Q4", accessible: true },
  { id: "camp_456", name: "Auto Insurance Premium", accessible: true },
  { id: "camp_789", name: "Life Insurance Leads", accessible: true },
];

const mockApiKey = "pk_test_51234567890abcdef1234567890abcdef";

const AgentAvailabilityPing = () => {
  const { toast } = useToast();
  const [selectedCampaign, setSelectedCampaign] = useState<string>("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [testStatus, setTestStatus] = useState<"available" | "unavailable" | "error" | null>(null);
  const [requestTime, setRequestTime] = useState<number | null>(null);

  const selectedCampaignData = mockCampaigns.find(c => c.id === selectedCampaign);
  const pingUrl = selectedCampaign ? `https://api.callx.com/v1/availability/${selectedCampaign}` : "";

  const handleCopyUrl = async () => {
    if (!pingUrl) return;
    
    try {
      await navigator.clipboard.writeText(pingUrl);
      toast({
        title: "Copied!",
        description: "URL copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      });
    }
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy code",
        variant: "destructive",
      });
    }
  };

  const handleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  const handleRotateKey = () => {
    toast({
      title: "API Key Rotated",
      description: "Your API key has been successfully rotated",
    });
  };

  const handleTestAvailability = async () => {
    if (!selectedCampaign) return;

    setIsTestLoading(true);
    const startTime = Date.now();

    // Mock API call
    setTimeout(() => {
      const mockResponses = [
        {
          status: "available",
          data: {
            available: true,
            capacity_open: 3,
            estimated_queue_ms: 1200,
            reason: "agents_available",
            ttl_ms: 30000
          }
        },
        {
          status: "unavailable", 
          data: {
            available: false,
            capacity_open: 0,
            estimated_queue_ms: 45000,
            reason: "no_agents_available",
            ttl_ms: 60000
          }
        }
      ];

      const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setTestResult(response.data);
      setTestStatus(response.status as any);
      setRequestTime(Date.now() - startTime);
      setIsTestLoading(false);
    }, 800 + Math.random() * 400);
  };

  const getCodeExamples = () => {
    const apiKey = showApiKey ? mockApiKey : "YOUR_API_KEY";
    
    return {
      curl: `curl -X GET "${pingUrl}?min_seconds=90&max_queue_ms=3000" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json"`,
      
      javascript: `const response = await fetch('${pingUrl}?min_seconds=90&max_queue_ms=3000', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`,
      
      nodejs: `const axios = require('axios');

const response = await axios.get('${pingUrl}', {
  params: {
    min_seconds: 90,
    max_queue_ms: 3000
  },
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  }
});

console.log(response.data);`
    };
  };

  const getStatusPill = () => {
    if (!testStatus) return null;

    const variants = {
      available: { color: "bg-green-100 text-green-800", text: "Available", icon: CheckCircle },
      unavailable: { color: "bg-gray-100 text-gray-800", text: "Unavailable", icon: AlertCircle },
      error: { color: "bg-red-100 text-red-800", text: "Error", icon: XCircle }
    };

    const variant = variants[testStatus];
    const Icon = variant.icon;

    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${variant.color}`}>
        <Icon className="h-3 w-3" />
        {variant.text}
      </div>
    );
  };

  if (mockCampaigns.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Agent Availability Ping</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Campaigns Available</h3>
          <p className="text-muted-foreground mb-4">
            You don't have access to any campaigns yet.
          </p>
          <Button 
            onClick={() => window.open('mailto:support@callx.com?subject=Campaign Access Request')}
          >
            Request Campaign Access
          </Button>
        </CardContent>
      </Card>
    );
  }

  const codeExamples = getCodeExamples();

  return (
    <Card data-testid="agent-availability-ping">
      <CardHeader>
        <CardTitle>Agent Availability Ping</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Block 1: Campaign Selector */}
          <div className="space-y-2">
            <Label htmlFor="campaign-select">Campaign *</Label>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign} data-testid="campaign-selector">
              <SelectTrigger>
                <SelectValue placeholder="Select a campaign" />
              </SelectTrigger>
              <SelectContent>
                {mockCampaigns.map((campaign) => (
                  <SelectItem key={campaign.id} value={campaign.id}>
                    <div className="flex flex-col">
                      <span>{campaign.name}</span>
                      <span className="text-xs text-muted-foreground">{campaign.id}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Block 2: Ping URL */}
          {selectedCampaign && (
            <div className="space-y-2">
              <Label>Ping URL</Label>
              <div className="flex gap-2">
                <Input value={pingUrl} readOnly className="font-mono text-sm" />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCopyUrl}
                  data-testid="copy-url-button"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>Example query params:</span>
                <Badge variant="secondary">min_seconds: 90</Badge>
                <Badge variant="secondary">max_queue_ms: 3000</Badge>
              </div>
            </div>
          )}
        </div>

        {selectedCampaign && (
          <>
            <Separator className="my-6" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Block 3: API Key Controls */}
              <div className="space-y-4">
                <Label>API Key</Label>
                <div className="flex gap-2">
                  <Input 
                    value={showApiKey ? mockApiKey : "••••••••••••••••••••••••••••••••"}
                    readOnly 
                    className="font-mono text-sm"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleShowApiKey}
                    data-testid="toggle-api-key-button"
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs" data-testid="rotate-key-button">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Rotate key
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Rotate API Key</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will generate a new API key and immediately invalidate your current key. 
                        Make sure to update all your integrations with the new key before proceeding.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleRotateKey}>
                        Rotate Key
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {/* Block 5: Live Test Panel */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Live Test</Label>
                  {testStatus && getStatusPill()}
                </div>
                <Button 
                  onClick={handleTestAvailability}
                  disabled={!selectedCampaign || isTestLoading}
                  data-testid="test-availability-button"
                  className="w-full"
                >
                  {isTestLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Test Availability
                    </>
                  )}
                </Button>
                
                {testResult && (
                  <div className="border rounded-lg p-3 bg-muted/50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium">Result</span>
                      {requestTime && (
                        <span className="text-xs text-muted-foreground">{requestTime}ms</span>
                      )}
                    </div>
                    <pre className="text-xs overflow-auto bg-background p-2 rounded border">
{JSON.stringify(testResult, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Block 4: Quick Examples */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Quick Examples</Label>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs" data-testid="help-button">
                      <HelpCircle className="h-3 w-3 mr-1" />
                      What does this mean?
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Agent Availability API Guide</SheetTitle>
                      <SheetDescription>
                        Understanding the response fields and best practices
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 mt-6">
                      <div>
                        <h4 className="font-medium mb-2">Response Fields</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <strong>available:</strong> Indicates if at least one eligible agent slot is open for immediate connection.
                          </div>
                          <div>
                            <strong>capacity_open:</strong> The exact number of agent slots currently available to take calls.
                          </div>
                          <div>
                            <strong>estimated_queue_ms:</strong> Expected wait time in milliseconds if no agents are immediately available.
                          </div>
                          <div>
                            <strong>ttl_ms:</strong> Time-to-live in milliseconds - how long you can safely cache this response on your side.
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Best Practices</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          When availability shows false, return the caller to your own flows or implement a retry mechanism after the suggested wait time.
                        </p>
                        
                        <div className="border rounded">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="p-2 text-left">Response</th>
                                <th className="p-2 text-left">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="p-2">available: true</td>
                                <td className="p-2">Connect call immediately</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-2">available: false, queue &lt; 60s</td>
                                <td className="p-2">Offer callback or brief hold</td>
                              </tr>
                              <tr>
                                <td className="p-2">available: false, queue &gt; 60s</td>
                                <td className="p-2">Return to your flow</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              <Tabs defaultValue="curl" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="nodejs">Node.js</TabsTrigger>
                </TabsList>
                
                <TabsContent value="curl" className="space-y-2">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs font-mono">
{codeExamples.curl}
                    </pre>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="absolute top-2 right-2"
                      onClick={() => handleCopyCode(codeExamples.curl)}
                      data-testid="copy-curl-button"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="javascript" className="space-y-2">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs font-mono">
{codeExamples.javascript}
                    </pre>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="absolute top-2 right-2"
                      onClick={() => handleCopyCode(codeExamples.javascript)}
                      data-testid="copy-javascript-button"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="nodejs" className="space-y-2">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs font-mono">
{codeExamples.nodejs}
                    </pre>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="absolute top-2 right-2"
                      onClick={() => handleCopyCode(codeExamples.nodejs)}
                      data-testid="copy-nodejs-button"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentAvailabilityPing;