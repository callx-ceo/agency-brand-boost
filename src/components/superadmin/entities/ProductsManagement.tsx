
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Search, Plus, Edit, Archive, Building2, DollarSign, Tag } from "lucide-react";
import { toast } from "sonner";

interface ProductsManagementProps {
  onBackToDashboard: () => void;
}

const mockProducts = [
  {
    id: 1,
    name: "Term Life Insurance",
    carrier: "MetLife",
    category: "Life Insurance",
    status: "active",
    commissionRate: "85%",
    baseRate: "$25/month",
    ageRange: "18-65",
    description: "Affordable term life coverage with flexible terms"
  },
  {
    id: 2,
    name: "Final Expense Plan",
    carrier: "Colonial Penn",
    category: "Final Expense",
    status: "active",
    commissionRate: "90%",
    baseRate: "$15/month",
    ageRange: "50-85",
    description: "Whole life coverage for final expenses"
  },
  {
    id: 3,
    name: "Medicare Supplement Plan F",
    carrier: "Mutual of Omaha",
    category: "Medicare Supplement",
    status: "inactive",
    commissionRate: "75%",
    baseRate: "$120/month",
    ageRange: "65+",
    description: "Comprehensive Medicare supplement coverage"
  },
  {
    id: 4,
    name: "Whole Life Premium",
    carrier: "Guardian Life",
    category: "Whole Life",
    status: "active",
    commissionRate: "95%",
    baseRate: "$80/month",
    ageRange: "21-70",
    description: "Premium whole life with cash value accumulation"
  }
];

const ProductsManagement = ({ onBackToDashboard }: ProductsManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddProduct = () => {
    toast.success("Add product functionality would open here");
  };

  const handleEditProduct = (productId: number) => {
    toast.info(`Edit product ${productId}`);
  };

  const handleArchiveProduct = (productId: number) => {
    toast.success("Product archived successfully");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive": return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case "pending": return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.carrier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Products Management</h1>
          <p className="text-gray-600">Manage carrier products and commission structures</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddProduct} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
          <Button variant="outline" onClick={onBackToDashboard}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Products ({filteredProducts.length})
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Carrier</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Commission Rate</TableHead>
                <TableHead>Base Rate</TableHead>
                <TableHead>Age Range</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-blue-500" />
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{product.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      {product.carrier}
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      {product.commissionRate}
                    </div>
                  </TableCell>
                  <TableCell>{product.baseRate}</TableCell>
                  <TableCell>{product.ageRange}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        title="Edit Product"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        title="Archive Product"
                        onClick={() => handleArchiveProduct(product.id)}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        <Archive className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsManagement;
