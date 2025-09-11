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
import { Users, Search, Edit, CheckCircle2 } from 'lucide-react';

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

interface Agent {
  id: string;
  name: string;
  email: string;
  agency: string;
  status: "active" | "inactive";
  verticals: string[];
  presence: "available" | "in-call" | "away" | "offline";
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@agency1.com",
    agency: "Premier Insurance Agency",
    status: "active",
    verticals: ["Medicare", "Final Expense"],
    presence: "available"
  },
  {
    id: "2", 
    name: "Mike Chen",
    email: "mike@agency1.com",
    agency: "Premier Insurance Agency",
    status: "active",
    verticals: ["Auto Insurance", "Home Insurance"],
    presence: "in-call"
  },
  {
    id: "3",
    name: "Lisa Rodriguez",
    email: "lisa@agency2.com", 
    agency: "Elite Coverage Solutions",
    status: "active",
    verticals: ["Medicare"],
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
    setIsEditModalOpen(true);
  };

  const updateAgentVerticals = (agentId: string, newVerticals: string[]) => {
    // Update agent verticals logic would go here
    toast({
      title: "Agent verticals updated",
      description: `Updated vertical assignments for ${selectedAgent?.name}`,
    });
    setIsEditModalOpen(false);
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
            View and manage agent vertical assignments
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
              {filteredAgents.map((agent) => (
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditVerticals(agent)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Verticals Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Agent Verticals</DialogTitle>
            <DialogDescription>
              Update vertical assignments for {selectedAgent?.name}
            </DialogDescription>
          </DialogHeader>
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
        </DialogContent>
      </Dialog>
    </div>
  );
};