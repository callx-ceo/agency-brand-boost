import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowRightLeft, Building, User, Search, AlertCircle, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type UserRole = 'Owner' | 'Admin' | 'Agent';

interface AgencyMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'suspended';
  canTakeCalls: boolean;
  lastSeen: string;
  presence?: 'available' | 'away' | 'in-call' | 'offline';
}

interface Agency {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'suspended';
}

// Mock agencies for the transfer destination
const mockAgencies: Agency[] = [
  {
    id: '1',
    name: 'Premium Leads Co',
    type: 'Sales Agency',
    status: 'active'
  },
  {
    id: '2',
    name: 'Elite Callers Inc',
    type: 'Call Center',
    status: 'active'
  },
  {
    id: '3',
    name: 'Sales Pro Agency',
    type: 'Sales Agency',
    status: 'active'
  },
  {
    id: '4',
    name: 'Lead Masters',
    type: 'Lead Generation',
    status: 'active'
  }
];

interface TransferUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: AgencyMember | null;
}

export const TransferUserModal: React.FC<TransferUserModalProps> = ({ 
  open, 
  onOpenChange, 
  member 
}) => {
  const [selectedAgency, setSelectedAgency] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [transferReason, setTransferReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accountBalance, setAccountBalance] = useState<number | null>(null);
  const [isCheckingBalance, setIsCheckingBalance] = useState(false);
  const { toast } = useToast();

  // Check member's account balance when modal opens or member changes
  useEffect(() => {
    const checkBalance = async () => {
      if (!open || !member || member.role !== 'Agent') {
        setAccountBalance(null);
        return;
      }
      
      setIsCheckingBalance(true);
      try {
        // In a real implementation, you'd use the member's actual user_id
        // For now, we'll simulate the check
        // const { data, error } = await supabase
        //   .from('agent_payment_settings')
        //   .select('call_credits_balance')
        //   .eq('agent_id', member.id)
        //   .maybeSingle();

        // Simulating balance check - replace with actual query
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data - in production this would be real data from the database
        const mockBalance = Math.random() > 0.5 ? 0 : Math.random() * 100;
        setAccountBalance(mockBalance);
        
      } catch (error) {
        console.error('Error checking balance:', error);
        setAccountBalance(null);
      } finally {
        setIsCheckingBalance(false);
      }
    };

    checkBalance();
  }, [open, member]);

  const filteredAgencies = mockAgencies.filter(agency =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check balance requirement for agents
    if (member?.role === 'Agent' && accountBalance !== null && accountBalance !== 0) {
      toast({
        title: "Outstanding balance",
        description: `${member.name} has an outstanding balance of $${Math.abs(accountBalance).toFixed(2)}. The agent's account must be settled to $0.00 before transfer.`,
        variant: "destructive",
      });
      return;
    }

    if (!selectedAgency) {
      toast({
        title: "Agency required",
        description: "Please select a destination agency",
        variant: "destructive",
      });
      return;
    }

    if (!member) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const agency = mockAgencies.find(a => a.id === selectedAgency);
      
      console.log('Creating transfer request:', { 
        member: member.id, 
        toAgency: selectedAgency,
        reason: transferReason 
      });
      
      toast({
        title: "Transfer request sent",
        description: `Transfer request for ${member.name} to ${agency?.name} has been submitted`,
      });
      
      // Reset form
      setSelectedAgency('');
      setTransferReason('');
      setSearchTerm('');
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error creating transfer request",
        description: "There was a problem creating the transfer request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedAgency('');
    setTransferReason('');
    setSearchTerm('');
    onOpenChange(false);
  };

  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ArrowRightLeft className="h-5 w-5" />
            <span>Transfer User</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* User Info */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                  <Badge variant="outline" className="mt-1">
                    {member.role}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Balance Check for Agents */}
            {member.role === 'Agent' && (
              <>
                {isCheckingBalance ? (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Checking account balance...</AlertTitle>
                  </Alert>
                ) : accountBalance !== null && accountBalance !== 0 ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Outstanding Balance Detected</AlertTitle>
                    <AlertDescription>
                      This agent has an outstanding balance of ${Math.abs(accountBalance).toFixed(2)}. 
                      The account must be settled to $0.00 before transferring to another agency.
                    </AlertDescription>
                  </Alert>
                ) : accountBalance === 0 ? (
                  <Alert className="bg-green-50 border-green-200">
                    <Info className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800">Account Balance Cleared</AlertTitle>
                    <AlertDescription className="text-green-700">
                      This agent's account balance is $0.00 and eligible for transfer.
                    </AlertDescription>
                  </Alert>
                ) : null}
              </>
            )}

            {/* Agency Search */}
            <div className="space-y-2">
              <Label htmlFor="agency-search">Search Agencies</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="agency-search"
                  placeholder="Search by agency name or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Agency Selection */}
            <div className="space-y-2">
              <Label htmlFor="agency">Destination Agency</Label>
              <Select 
                value={selectedAgency} 
                onValueChange={setSelectedAgency} 
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination agency">
                    {selectedAgency && (
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4" />
                        <span>
                          {mockAgencies.find(a => a.id === selectedAgency)?.name}
                        </span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {filteredAgencies.map((agency) => (
                    <SelectItem key={agency.id} value={agency.id}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{agency.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {agency.type}
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={agency.status === 'active' ? 'default' : 'secondary'}
                          className="ml-2"
                        >
                          {agency.status}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {filteredAgencies.length === 0 && searchTerm && (
                <p className="text-sm text-muted-foreground">
                  No agencies found matching "{searchTerm}"
                </p>
              )}
            </div>

            {/* Transfer Reason */}
            <div className="space-y-2">
              <Label htmlFor="reason">Transfer Reason (Optional)</Label>
              <textarea
                id="reason"
                placeholder="Provide a reason for the transfer request..."
                value={transferReason}
                onChange={(e) => setTransferReason(e.target.value)}
                className="w-full min-h-[80px] px-3 py-2 border border-input rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            {/* Transfer Info */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <ArrowRightLeft className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-semibold text-blue-800">Transfer Process</p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    {member.role === 'Agent' && (
                      <li>• Agent account balance must be $0 to transfer</li>
                    )}
                    <li>• The destination agency owner will be notified</li>
                    <li>• They must approve the transfer before it's processed</li>
                    <li>• The user will maintain their current role and permissions</li>
                    <li>• Transfer can be canceled before approval</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={
                isLoading || 
                isCheckingBalance ||
                !selectedAgency ||
                (member.role === 'Agent' && accountBalance !== null && accountBalance !== 0)
              }
            >
              {isLoading ? 'Creating Request...' : 'Create Transfer Request'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};