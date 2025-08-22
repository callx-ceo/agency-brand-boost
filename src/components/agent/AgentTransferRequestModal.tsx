import React, { useState } from 'react';
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
import { ArrowRightLeft, Building, Search, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Agency {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'suspended';
  description?: string;
}

// Mock agencies for transfer destinations
const mockAgencies: Agency[] = [
  {
    id: '1',
    name: 'Premium Leads Co',
    type: 'Sales Agency',
    status: 'active',
    description: 'High-quality lead generation and sales'
  },
  {
    id: '2',
    name: 'Elite Callers Inc',
    type: 'Call Center',
    status: 'active',
    description: 'Professional outbound calling services'
  },
  {
    id: '3',
    name: 'Sales Pro Agency',
    type: 'Sales Agency',
    status: 'active',
    description: 'Performance-driven sales solutions'
  },
  {
    id: '4',
    name: 'Lead Masters',
    type: 'Lead Generation',
    status: 'active',
    description: 'Expert lead acquisition and nurturing'
  }
];

interface AgentTransferRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AgentTransferRequestModal: React.FC<AgentTransferRequestModalProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const [selectedAgency, setSelectedAgency] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [transferReason, setTransferReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const filteredAgencies = mockAgencies.filter(agency =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAgency) {
      toast({
        title: "Agency required",
        description: "Please select a destination agency",
        variant: "destructive",
      });
      return;
    }

    if (!transferReason.trim()) {
      toast({
        title: "Reason required",
        description: "Please provide a reason for your transfer request",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const agency = mockAgencies.find(a => a.id === selectedAgency);
      
      console.log('Creating agent transfer request:', { 
        toAgency: selectedAgency,
        reason: transferReason 
      });
      
      toast({
        title: "Transfer request submitted",
        description: `Your transfer request to ${agency?.name} has been submitted for review`,
      });
      
      // Reset form
      setSelectedAgency('');
      setTransferReason('');
      setSearchTerm('');
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error submitting transfer request",
        description: "There was a problem submitting your request. Please try again.",
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ArrowRightLeft className="h-5 w-5" />
            <span>Request Transfer</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Information Alert */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-semibold text-blue-800">Transfer Request Process</p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Your current agency owner will be notified</li>
                    <li>• The destination agency must approve your request</li>
                    <li>• You'll keep your current role and permissions</li>
                    <li>• Request can be withdrawn before approval</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Agency Search */}
            <div className="space-y-2">
              <Label htmlFor="agency-search">Search Agencies</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="agency-search"
                  placeholder="Search by name, type, or description..."
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
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4" />
                          <span className="font-medium">{agency.name}</span>
                          <Badge 
                            variant={agency.status === 'active' ? 'default' : 'secondary'}
                            className="ml-2"
                          >
                            {agency.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground ml-6">
                          {agency.type} • {agency.description}
                        </div>
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
              <Label htmlFor="reason">Reason for Transfer Request <span className="text-red-500">*</span></Label>
              <textarea
                id="reason"
                placeholder="Please explain why you want to transfer to this agency..."
                value={transferReason}
                onChange={(e) => setTransferReason(e.target.value)}
                className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                disabled={isLoading}
                required
              />
              <p className="text-xs text-muted-foreground">
                This will be shared with both your current agency and the destination agency.
              </p>
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
              disabled={isLoading || !selectedAgency || !transferReason.trim()}
            >
              {isLoading ? 'Submitting Request...' : 'Submit Transfer Request'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};