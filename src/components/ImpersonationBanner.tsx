
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useImpersonation } from '@/contexts/ImpersonationContext';
import { UserSwitch, X } from 'lucide-react';
import { toast } from 'sonner';

const ImpersonationBanner = () => {
  const { isImpersonating, impersonatedAgent, exitImpersonation } = useImpersonation();

  if (!isImpersonating || !impersonatedAgent) {
    return null;
  }

  const handleExitImpersonation = () => {
    exitImpersonation();
    toast.success('Exited impersonation mode');
  };

  return (
    <Alert className="border-blue-200 bg-blue-50 mb-6 rounded-lg">
      <UserSwitch className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-800 font-semibold">
        Impersonation Mode Active
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between text-blue-700">
        <span>
          You are currently impersonating <strong>{impersonatedAgent.name}</strong> (Agent ID: {impersonatedAgent.id})
        </span>
        <Button
          onClick={handleExitImpersonation}
          variant="destructive"
          size="sm"
          className="ml-4"
        >
          <X className="w-4 h-4 mr-1" />
          Exit Impersonation
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ImpersonationBanner;
