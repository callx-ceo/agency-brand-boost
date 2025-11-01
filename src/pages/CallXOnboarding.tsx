import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShoppingCart, Upload, Merge, Check } from "lucide-react";

type ModelType = "marketplace" | "byo" | "hybrid" | null;

const CallXOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedModel, setSelectedModel] = useState<ModelType>(null);
  const [monthlyCallsEstimate, setMonthlyCallsEstimate] = useState([1000]);
  const [overflowRouting, setOverflowRouting] = useState("marketplace");

  const handleModelSelect = (model: ModelType) => {
    setSelectedModel(model);
    if (model === "marketplace") {
      setStep(3); // Skip pricing for marketplace
    } else {
      setStep(2);
    }
  };

  const handleComplete = () => {
    navigate('/callx/dashboard');
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                1
              </div>
              <span className="font-medium">Choose Model</span>
            </div>
            <div className="w-16 h-0.5 bg-border" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                2
              </div>
              <span className="font-medium">Pricing</span>
            </div>
            <div className="w-16 h-0.5 bg-border" />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                3
              </div>
              <span className="font-medium">Configuration</span>
            </div>
          </div>
        </div>

        {/* Step 1: Model Selection */}
        {step === 1 && (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">How do you want to source your calls?</h1>
              <p className="text-muted-foreground text-lg">Choose the model that best fits your agency</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 hover:border-primary"
                onClick={() => handleModelSelect("marketplace")}
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <ShoppingCart className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">Marketplace Buyer</CardTitle>
                    <Badge className="bg-primary text-primary-foreground">No Tracking Fees</Badge>
                  </div>
                  <CardDescription className="text-base">
                    Buy 100% of calls through CallX media
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6">
                    <strong>Best for:</strong> Agencies wanting done-for-you inbound flow
                  </p>
                  <Button className="w-full" size="lg">
                    Select Marketplace
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 hover:border-primary"
                onClick={() => handleModelSelect("byo")}
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">Bring Your Own Media</CardTitle>
                    <Badge variant="secondary">Usage-Based</Badge>
                  </div>
                  <CardDescription className="text-base">
                    Run your own ads and publishers through CallX tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6">
                    <strong>Best for:</strong> Agencies with in-house buyers or publisher relationships
                  </p>
                  <Button className="w-full" size="lg">
                    Select BYO Media
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 hover:border-primary"
                onClick={() => handleModelSelect("hybrid")}
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Merge className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">Hybrid Model</CardTitle>
                    <Badge variant="outline" className="border-primary text-primary">Flexible</Badge>
                  </div>
                  <CardDescription className="text-base">
                    Combine CallX Marketplace with your own traffic sources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6">
                    <strong>Best for:</strong> Growth agencies mixing owned and network traffic
                  </p>
                  <Button className="w-full" size="lg">
                    Select Hybrid
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 2: Pricing Overview */}
        {step === 2 && (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Transparent Usage-Based Pricing</h1>
              <p className="text-muted-foreground text-lg">15% below Ringba - pay only for what you use</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Core Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Recording</span>
                    <span className="font-mono font-semibold">$0.0085/min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ICP Requests</span>
                    <span className="font-mono font-semibold">$0.128/req</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Transcription</span>
                    <span className="font-mono font-semibold">$0.034/min</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>US/Canada Numbers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Phone Numbers</span>
                    <span className="font-mono font-semibold">$0.85/mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Minutes</span>
                    <span className="font-mono font-semibold">$0.041/min</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Default Numbers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">DID</span>
                    <span className="font-mono font-semibold">$2.55/mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Toll-Free</span>
                    <span className="font-mono font-semibold">$3.40/mo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">DID Minutes</span>
                    <span className="font-mono font-semibold">$0.047/min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">TF Minutes</span>
                    <span className="font-mono font-semibold">$0.051/min</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>Estimate your monthly cost</CardTitle>
                <CardDescription>Adjust the slider to see estimated costs based on your usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-2 block">Expected Monthly Calls</Label>
                  <Slider
                    value={monthlyCallsEstimate}
                    onValueChange={setMonthlyCallsEstimate}
                    min={100}
                    max={10000}
                    step={100}
                    className="mb-2"
                  />
                  <div className="text-right text-sm font-semibold">{monthlyCallsEstimate[0].toLocaleString()} calls</div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-2xl font-bold text-primary">
                    Estimated: ${((monthlyCallsEstimate[0] * 0.041 * 3.5) + (10 * 0.85)).toFixed(2)}/month
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Based on average 3.5 min calls and 10 tracking numbers</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-8">
              <Button size="lg" onClick={() => setStep(3)}>
                Continue to Setup
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Configuration */}
        {step === 3 && (
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Basic Configuration</h1>
              <p className="text-muted-foreground text-lg">Tell us a bit about your agency</p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="Enter your company name" />
                </div>

                <div className="space-y-2">
                  <Label>Expected Monthly Calls</Label>
                  <Slider
                    value={monthlyCallsEstimate}
                    onValueChange={setMonthlyCallsEstimate}
                    min={100}
                    max={10000}
                    step={100}
                  />
                  <div className="text-sm text-muted-foreground">{monthlyCallsEstimate[0].toLocaleString()} calls/month</div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vertical">Primary Industry/Vertical</Label>
                  <Select>
                    <SelectTrigger id="vertical">
                      <SelectValue placeholder="Select a vertical" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solar">Solar</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Overflow Routing Preference</Label>
                  <RadioGroup value={overflowRouting} onValueChange={setOverflowRouting}>
                    <div className="flex items-start space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="marketplace" id="marketplace" />
                      <div className="space-y-1">
                        <Label htmlFor="marketplace" className="cursor-pointer font-medium">
                          Route to CallX Marketplace
                        </Label>
                        <p className="text-sm text-muted-foreground">Earn shared revenue on overflow calls</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="partner" id="partner" />
                      <div className="space-y-1">
                        <Label htmlFor="partner" className="cursor-pointer font-medium">
                          Route to partner agencies
                        </Label>
                        <p className="text-sm text-muted-foreground">Send overflow to your network</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="none" id="none" />
                      <div className="space-y-1">
                        <Label htmlFor="none" className="cursor-pointer font-medium">
                          No overflow routing
                        </Label>
                        <p className="text-sm text-muted-foreground">Handle capacity internally</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="pt-6 flex justify-end">
                  <Button size="lg" onClick={handleComplete}>
                    <Check className="w-4 h-4 mr-2" />
                    Complete Setup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallXOnboarding;
