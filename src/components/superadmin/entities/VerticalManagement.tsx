import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Vertical {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  campaignCount: number;
  agentCount: number;
  createdAt: string;
}

interface VerticalManagementProps {
  onBackToDashboard: () => void;
}

const VerticalManagement = ({ onBackToDashboard }: VerticalManagementProps) => {
  const [verticals, setVerticals] = useState<Vertical[]>([
    {
      id: "1",
      name: "Final Expense",
      description: "Final expense insurance for seniors and individuals planning end-of-life coverage",
      status: "active",
      campaignCount: 3,
      agentCount: 24,
      createdAt: "2024-01-15"
    },
    {
      id: "2", 
      name: "Medicare",
      description: "Medicare plans and supplemental insurance for eligible individuals",
      status: "active",
      campaignCount: 2,
      agentCount: 18,
      createdAt: "2024-01-20"
    },
    {
      id: "3",
      name: "Auto Insurance",
      description: "Vehicle insurance coverage for cars, trucks, and motorcycles",
      status: "active",
      campaignCount: 1,
      agentCount: 12,
      createdAt: "2024-02-01"
    },
    {
      id: "4",
      name: "Home Insurance", 
      description: "Homeowners and renters insurance coverage",
      status: "active",
      campaignCount: 1,
      agentCount: 8,
      createdAt: "2024-02-10"
    },
    {
      id: "5",
      name: "Health Insurance",
      description: "Individual and family health insurance plans",
      status: "inactive",
      campaignCount: 0,
      agentCount: 0,
      createdAt: "2024-03-01"
    },
    {
      id: "6",
      name: "Life Insurance",
      description: "Term and whole life insurance policies",
      status: "active",
      campaignCount: 0,
      agentCount: 5,
      createdAt: "2024-03-15"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingVertical, setEditingVertical] = useState<Vertical | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });
  const { toast } = useToast();

  const filteredVerticals = verticals.filter(vertical =>
    vertical.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vertical.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateVertical = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Vertical name is required",
        variant: "destructive",
      });
      return;
    }

    const newVertical: Vertical = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      status: "active",
      campaignCount: 0,
      agentCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setVerticals([...verticals, newVertical]);
    setFormData({ name: "", description: "" });
    setIsCreateModalOpen(false);
    
    toast({
      title: "Success",
      description: "Vertical created successfully",
    });
  };

  const handleEditVertical = () => {
    if (!editingVertical || !formData.name.trim()) return;

    const updatedVerticals = verticals.map(v => 
      v.id === editingVertical.id 
        ? { ...v, name: formData.name, description: formData.description }
        : v
    );

    setVerticals(updatedVerticals);
    setEditingVertical(null);
    setFormData({ name: "", description: "" });
    
    toast({
      title: "Success", 
      description: "Vertical updated successfully",
    });
  };

  const toggleVerticalStatus = (verticalId: string) => {
    setVerticals(verticals.map(v => 
      v.id === verticalId 
        ? { ...v, status: v.status === "active" ? "inactive" : "active" }
        : v
    ));
  };

  const openEditModal = (vertical: Vertical) => {
    setEditingVertical(vertical);
    setFormData({
      name: vertical.name,
      description: vertical.description
    });
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vertical Management</h1>
          <p className="text-gray-600">Manage campaign verticals and their configurations</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Vertical
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Vertical</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="verticalName">Vertical Name *</Label>
                  <Input
                    id="verticalName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Debt Settlement"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="verticalDescription">Description</Label>
                  <Textarea
                    id="verticalDescription"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of this vertical"
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateVertical}>
                    Create Vertical
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={onBackToDashboard}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{verticals.length}</div>
              <div className="text-sm text-gray-600">Total Verticals</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {verticals.filter(v => v.status === "active").length}
              </div>
              <div className="text-sm text-gray-600">Active Verticals</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {verticals.reduce((sum, v) => sum + v.campaignCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Campaigns</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {verticals.reduce((sum, v) => sum + v.agentCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Assigned Agents</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Verticals</CardTitle>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search verticals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vertical Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Campaigns</TableHead>
                <TableHead className="text-center">Agents</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVerticals.map((vertical) => (
                <TableRow key={vertical.id}>
                  <TableCell className="font-medium">{vertical.name}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-sm text-gray-600 truncate">{vertical.description}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(vertical.status)}>
                      {vertical.status.charAt(0).toUpperCase() + vertical.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{vertical.campaignCount}</TableCell>
                  <TableCell className="text-center">{vertical.agentCount}</TableCell>
                  <TableCell>{new Date(vertical.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditModal(vertical)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleVerticalStatus(vertical.id)}
                        className={vertical.status === "active" ? "text-red-600" : "text-green-600"}
                      >
                        {vertical.status === "active" ? "Disable" : "Enable"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {editingVertical && (
        <Dialog open={!!editingVertical} onOpenChange={() => setEditingVertical(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Vertical</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="editVerticalName">Vertical Name *</Label>
                <Input
                  id="editVerticalName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="editVerticalDescription">Description</Label>
                <Textarea
                  id="editVerticalDescription"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingVertical(null)}>
                  Cancel
                </Button>
                <Button onClick={handleEditVertical}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VerticalManagement;