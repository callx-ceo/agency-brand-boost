import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Users, Search, Edit, CheckCircle2, DollarSign, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const VERTICALS = [
  "Final Expense",
  "Medicare", 
  "Auto Insurance",
  "Home Insurance",
  "Health Insurance",
  "Life Insurance",
  "Debt Settlement",
  "Home Services",
  "Legal"
];

interface VerticalBid {
  vertical: string;
  bidAmount: number;
  minimumBid: number;
}

interface Agent {
  id: string;
  name: string;
  email: string;
  agency: string;
  status: "active" | "inactive";
  verticals: string[];
  bids: VerticalBid[];
  presence: "available" | "in-call" | "away" | "offline";
}

const MINIMUM_BIDS: Record<string, number> = {
  "Medicare": 12.00,
  "Final Expense": 15.00,
  "Auto Insurance": 8.00,
  "Home Insurance": 10.00,
  "Health Insurance": 14.00,
  "Life Insurance": 13.00,
  "Debt Settlement": 9.00,
  "Home Services": 7.00,
  "Legal": 11.00
};

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@agency1.com",
    agency: "Premier Insurance Agency",
    status: "active",
    verticals: ["Medicare", "Final Expense"],
    bids: [
      { vertical: "Medicare", bidAmount: 15.00, minimumBid: 12.00 },
      { vertical: "Final Expense", bidAmount: 18.00, minimumBid: 15.00 }
    ],
    presence: "available"
  },
  {
    id: "2", 
    name: "Mike Chen",
    email: "mike@agency1.com",
    agency: "Premier Insurance Agency",
    status: "active",
    verticals: ["Auto Insurance", "Home Insurance"],
    bids: [
      { vertical: "Auto Insurance", bidAmount: 10.00, minimumBid: 8.00 },
      { vertical: "Home Insurance", bidAmount: 12.00, minimumBid: 10.00 }
    ],
    presence: "in-call"
  },
  {
    id: "3",
    name: "Lisa Rodriguez",
    email: "lisa@agency2.com", 
    agency: "Elite Coverage Solutions",
    status: "active",
    verticals: ["Medicare"],
    bids: [
      { vertical: "Medicare", bidAmount: 14.50, minimumBid: 12.00 }
    ],
    presence: "available"
  }
];

interface AgentVerticalManagementProps {
  onBackToDashboard: () => void;
}

export const AgentVerticalManagement: React.FC<AgentVerticalManagementProps> = ({
  onBackToDashboard
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [verticalFilter, setVerticalFilter] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editType, setEditType] = useState<'verticals' | 'bids'>('verticals');
  const [editBids, setEditBids] = useState<VerticalBid[]>([]);

  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.agency.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesVertical = verticalFilter === 'all' || 
      agent.verticals.includes(verticalFilter);
    
    return matchesSearch && matchesVertical;
  });

  const getPresenceBadge = (presence: string) => {
    const variants = {
      available: "bg-green-100 text-green-800",
      "in-call": "bg-blue-100 text-blue-800", 
      away: "bg-yellow-100 text-yellow-800",
      offline: "bg-gray-100 text-gray-800"
    };
    return <Badge className={variants[presence as keyof typeof variants]}>{presence}</Badge>;
  };

  const handleEditVerticals = (agent: Agent) => {
    setSelectedAgent(agent);
    setEditType('verticals');
    setIsEditModalOpen(true);
  };

  const handleEditBids = (agent: Agent) => {
    setSelectedAgent(agent);
    setEditType('bids');
    setEditBids(agent.bids);
    setIsEditModalOpen(true);
  };

  const updateAgentVerticals = (agentId: string, newVerticals: string[]) => {
    toast({
      title: "Agent verticals updated",
      description: `Updated vertical assignments for ${selectedAgent?.name}`,
    });
    setIsEditModalOpen(false);
  };

  const updateAgentBids = () => {
    const invalidBids = editBids.filter(bid => bid.bidAmount < bid.minimumBid);
    if (invalidBids.length > 0) {
      toast({
        title: "Invalid bid amounts",
        description: `Some bids are below the minimum required amount`,
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Bid prices updated",
      description: `Updated bid prices for ${selectedAgent?.name}`,
    });
    setIsEditModalOpen(false);
  };

  const handleBidChange = (vertical: string, newAmount: string) => {
    const amount = parseFloat(newAmount);
    setEditBids(prev => 
      prev.map(bid => 
        bid.vertical === vertical 
          ? { ...bid, bidAmount: isNaN(amount) ? 0 : amount }
          : bid
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agent Vertical Management</h1>
          <p className="text-muted-foreground">
            Manage agent vertical assignments across all agencies
          </p>
        </div>
        <Button variant="outline" onClick={onBackToDashboard}>
          Back to Dashboard
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{mockAgents.length}</p>
                <p className="text-xs text-muted-foreground">Total Agents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {mockAgents.filter(a => a.presence === 'available').length}
                </p>
                <p className="text-xs text-muted-foreground">Available Now</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <div>
                <p className="text-2xl font-bold">
                  {mockAgents.filter(a => a.verticals.includes('Medicare')).length}
                </p>
                <p className="text-xs text-muted-foreground">Medicare Agents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full" />
              <div>
                <p className="text-2xl font-bold">
                  {mockAgents.filter(a => a.verticals.includes('Final Expense')).length}
                </p>
                <p className="text-xs text-muted-foreground">Final Expense Agents</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={verticalFilter} onValueChange={setVerticalFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by vertical" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Verticals</SelectItem>
            {VERTICALS.map((vertical) => (
              <SelectItem key={vertical} value={vertical}>
                {vertical}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Agents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agents by Vertical</CardTitle>
          <CardDescription>
            View and manage agent vertical assignments and bid prices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Agency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verticals</TableHead>
                <TableHead>Presence</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => {
                const minBid = Math.min(...agent.bids.map(b => b.bidAmount));
                const maxBid = Math.max(...agent.bids.map(b => b.bidAmount));
                
                return (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">{agent.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{agent.agency}</TableCell>
                    <TableCell>
                      <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                        {agent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {agent.verticals.map((vertical) => (
                          <Badge key={vertical} variant="outline" className="text-xs">
                            {vertical}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getPresenceBadge(agent.presence)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditVerticals(agent)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Verticals
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBids(agent)}
                        >
                          <DollarSign className="h-3 w-3 mr-1" />
                          Bids
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editType === 'verticals' ? 'Edit Agent Verticals' : 'Edit Bid Prices'}
            </DialogTitle>
            <DialogDescription>
              {editType === 'verticals' 
                ? `Update vertical assignments for ${selectedAgent?.name}`
                : `Set bid prices for ${selectedAgent?.name}'s verticals`
              }
            </DialogDescription>
          </DialogHeader>
          
          {editType === 'verticals' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {VERTICALS.map((vertical) => (
                  <div key={vertical} className="flex items-center space-x-3">
                    <Checkbox
                      id={vertical}
                      defaultChecked={selectedAgent?.verticals.includes(vertical)}
                    />
                    <Label htmlFor={vertical} className="text-sm">
                      {vertical}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-4">
                <Button 
                  className="flex-1"
                  onClick={() => updateAgentVerticals(selectedAgent?.id || '', [])}
                >
                  Update Verticals
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {editBids.map((bid) => {
                const isValid = bid.bidAmount >= bid.minimumBid;
                return (
                  <Card key={bid.vertical} className={!isValid ? 'border-destructive' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium">{bid.vertical}</p>
                          <p className="text-xs text-muted-foreground">
                            Minimum bid: ${bid.minimumBid.toFixed(2)}
                          </p>
                        </div>
                        <Badge variant={isValid ? 'secondary' : 'destructive'}>
                          {isValid ? 'Valid' : 'Below minimum'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Bid Amount ($)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          min={bid.minimumBid}
                          value={bid.bidAmount}
                          onChange={(e) => handleBidChange(bid.vertical, e.target.value)}
                          className={!isValid ? 'border-destructive' : ''}
                        />
                      </div>
                      {!isValid && (
                        <p className="text-xs text-destructive mt-2">
                          Must be at least ${bid.minimumBid.toFixed(2)}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Estimated Weekly Spend</span>
                  <span className="text-lg font-bold">
                    ${(editBids.reduce((sum, bid) => sum + bid.bidAmount, 0) * 50).toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on ~50 calls per week per vertical
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  className="flex-1"
                  onClick={updateAgentBids}
                >
                  Update Bid Prices
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};