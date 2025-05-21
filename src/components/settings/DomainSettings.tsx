
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2, Copy } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DomainSettings = () => {
  const [subdomain, setSubdomain] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [subdomainStatus, setSubdomainStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  const [domainStatus, setDomainStatus] = useState<"idle" | "pending" | "active" | "failed">("idle");

  const checkSubdomainAvailability = () => {
    if (!subdomain) {
      toast.error("Please enter a subdomain");
      return;
    }

    // Simulate API call to check availability
    setSubdomainStatus("checking");
    setTimeout(() => {
      const isAvailable = subdomain !== "taken"; // Demo validation
      setSubdomainStatus(isAvailable ? "available" : "unavailable");
      if (isAvailable) {
        toast.success(`Subdomain ${subdomain}.callx.com is available!`);
      } else {
        toast.error(`Subdomain ${subdomain}.callx.com is already taken.`);
      }
    }, 1000);
  };

  const saveSubdomain = () => {
    if (subdomainStatus !== "available") {
      toast.error("Please check subdomain availability first");
      return;
    }
    
    // Simulate API call to save subdomain
    toast.success(`Subdomain ${subdomain}.callx.com has been activated!`);
  };

  const verifyCustomDomain = () => {
    if (!customDomain) {
      toast.error("Please enter a custom domain");
      return;
    }

    // Validate domain format
    const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
    if (!domainRegex.test(customDomain)) {
      toast.error("Please enter a valid domain format (e.g., portal.youragency.com)");
      return;
    }

    // Simulate API call to verify domain
    setDomainStatus("pending");
    toast.success(`Verification process started for ${customDomain}. DNS check initiated.`);
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success(message);
      },
      () => {
        toast.error("Failed to copy to clipboard");
      }
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Custom Domain</h2>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Subdomain Setup</h3>
          <p className="text-gray-500">
            Create a unique subdomain on callx.com for your agency portal.
          </p>
          
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Label htmlFor="subdomain">Your Subdomain</Label>
              <div className="flex items-center mt-1">
                <Input 
                  id="subdomain"
                  placeholder="youragency"
                  value={subdomain}
                  onChange={(e) => {
                    setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
                    setSubdomainStatus("idle");
                  }}
                  className="rounded-r-none"
                />
                <div className="bg-gray-100 border border-l-0 border-input px-3 py-2 text-sm rounded-r-md">
                  .callx.com
                </div>
              </div>
            </div>
            <Button 
              onClick={checkSubdomainAvailability}
              disabled={subdomainStatus === "checking" || !subdomain}
            >
              {subdomainStatus === "checking" ? "Checking..." : "Check Availability"}
            </Button>
          </div>
          
          {subdomainStatus === "available" && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              <span><strong>{subdomain}.callx.com</strong> is available!</span>
              <Button variant="outline" size="sm" onClick={saveSubdomain}>
                Activate
              </Button>
            </div>
          )}
          
          {subdomainStatus === "unavailable" && (
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <span><strong>{subdomain}.callx.com</strong> is already taken. Try another one.</span>
            </div>
          )}
        </div>
        
        <div className="pt-6 border-t space-y-4">
          <h3 className="text-lg font-medium">Custom Domain (Advanced)</h3>
          <p className="text-gray-500">
            Use your own domain for your agency portal (requires DNS configuration).
          </p>
          
          <div>
            <Label htmlFor="custom-domain">Your Custom Domain</Label>
            <div className="flex items-end gap-3 mt-1">
              <Input 
                id="custom-domain"
                placeholder="portal.youragency.com"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={verifyCustomDomain}
                disabled={!customDomain || domainStatus === "pending"}
              >
                {domainStatus === "pending" ? "Verifying..." : "Verify Domain"}
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Must be a subdomain or root domain that you own.
            </p>
          </div>
          
          <Alert>
            <AlertTitle>DNS Configuration Required</AlertTitle>
            <AlertDescription>
              <p className="mb-2">
                To use your custom domain, you need to add a CNAME record in your DNS settings:
              </p>
              <div className="bg-gray-100 p-3 rounded-md flex justify-between items-center">
                <div>
                  <div className="font-medium">CNAME Record</div>
                  <div className="font-mono text-sm text-gray-600">whitelabel.callx.com</div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => copyToClipboard("whitelabel.callx.com", "CNAME value copied to clipboard")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-sm">
                DNS changes may take up to 48 hours to propagate. Once your DNS is configured,
                click "Verify Domain" to complete the setup.
              </p>
            </AlertDescription>
          </Alert>
          
          {domainStatus === "pending" && (
            <div className="bg-yellow-50 text-yellow-800 px-4 py-3 rounded-md border border-yellow-200 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>Waiting for DNS verification. This may take up to 48 hours.</span>
            </div>
          )}
          
          {domainStatus === "active" && (
            <div className="bg-green-50 text-green-800 px-4 py-3 rounded-md border border-green-200 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Domain verified and active! Your portal is now accessible at {customDomain}</span>
            </div>
          )}
          
          {domainStatus === "failed" && (
            <div className="bg-red-50 text-red-800 px-4 py-3 rounded-md border border-red-200 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>Domain verification failed. Please check your DNS configuration and try again.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DomainSettings;
