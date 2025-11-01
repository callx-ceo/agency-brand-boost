import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, LineChart, Network } from "lucide-react";

const CallXLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            The Call Intelligence Platform Built for Performance Agencies
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Source, track, and route every call through one unified platform
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => navigate('/callx/onboarding')}
          >
            Get Started
          </Button>
        </div>

        {/* Value Proposition Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Buy from Marketplace</CardTitle>
              <CardDescription>
                Access premium call sources through our verified publisher network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• No tracking fees</li>
                <li>• Pre-vetted publishers</li>
                <li>• Instant scalability</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <LineChart className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Track Your Own Media</CardTitle>
              <CardDescription>
                Run your own ads and publishers through CallX tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Usage-based pricing</li>
                <li>• Full attribution control</li>
                <li>• Custom integrations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Network className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Hybrid Model</CardTitle>
              <CardDescription>
                Combine CallX Marketplace with your own traffic sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Flexible pricing</li>
                <li>• Best of both worlds</li>
                <li>• Seamless integration</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CallXLanding;
