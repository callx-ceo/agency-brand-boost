import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightLeft, ArrowLeft, ArrowRight, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

type TransferStatus = 'pending' | 'approved' | 'rejected' | 'canceled' | 'completed';

interface TransferRequest {
  id: string;
  userName: string;
  userEmail: string;
  fromAgency: string;
  toAgency: string;
  requestedBy: string;
  status: TransferStatus;
  requestedAt: string;
  type: 'outgoing' | 'incoming';
}

const mockTransfers: TransferRequest[] = [
  {
    id: '1',
    userName: 'Alice Cooper',
    userEmail: 'alice@agency1.com',
    fromAgency: 'CallX Agency',
    toAgency: 'Premium Leads Co',
    requestedBy: 'John Smith',
    status: 'pending',
    requestedAt: '2024-01-15 10:30 AM',
    type: 'outgoing'
  },
  {
    id: '2',
    userName: 'Bob Johnson',
    userEmail: 'bob@agency2.com',
    fromAgency: 'Sales Pro Agency',
    toAgency: 'CallX Agency',
    requestedBy: 'External Admin',
    status: 'pending',
    requestedAt: '2024-01-14 2:15 PM',
    type: 'incoming'
  },
  {
    id: '3',
    userName: 'Carol Davis',
    userEmail: 'carol@agency1.com',
    fromAgency: 'CallX Agency',
    toAgency: 'Elite Callers Inc',
    requestedBy: 'Sarah Johnson',
    status: 'approved',
    requestedAt: '2024-01-13 9:00 AM',
    type: 'outgoing'
  },
  {
    id: '4',
    userName: 'David Wilson',
    userEmail: 'david@agency3.com',
    fromAgency: 'Lead Masters',
    toAgency: 'CallX Agency',
    requestedBy: 'External Admin',
    status: 'completed',
    requestedAt: '2024-01-10 11:45 AM',
    type: 'incoming'
  }
];

export const TransfersTab: React.FC = () => {
  const [activeTransferTab, setActiveTransferTab] = useState('outgoing');

  const getFilteredTransfers = (type: 'outgoing' | 'incoming') => {
    return mockTransfers.filter(transfer => transfer.type === type);
  };

  const getStatusBadge = (status: TransferStatus) => {
    const variants = {
      pending: { variant: 'outline' as const, icon: Clock, color: 'text-yellow-600' },
      approved: { variant: 'default' as const, icon: CheckCircle, color: 'text-blue-600' },
      rejected: { variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' },
      canceled: { variant: 'secondary' as const, icon: AlertCircle, color: 'text-gray-600' },
      completed: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' }
    };

    const { variant, icon: Icon, color } = variants[status];
    
    return (
      <Badge variant={variant}>
        <Icon className={`h-3 w-3 mr-1 ${color}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleApprove = (transferId: string) => {
    console.log(`Approving transfer ${transferId}`);
  };

  const handleReject = (transferId: string) => {
    console.log(`Rejecting transfer ${transferId}`);
  };

  const handleComplete = (transferId: string) => {
    console.log(`Completing transfer ${transferId}`);
  };

  const getTabCounts = () => {
    return {
      outgoing: getFilteredTransfers('outgoing').length,
      incoming: getFilteredTransfers('incoming').length
    };
  };

  const tabCounts = getTabCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Transfer Requests</h3>
        <p className="text-sm text-muted-foreground">
          Manage incoming and outgoing user transfer requests
        </p>
      </div>

      {/* Transfer Tabs */}
      <Tabs value={activeTransferTab} onValueChange={setActiveTransferTab}>
        <TabsList>
          <TabsTrigger value="outgoing" className="flex items-center space-x-2">
            <ArrowRight className="h-4 w-4" />
            <span>Outgoing</span>
            {tabCounts.outgoing > 0 && (
              <Badge variant="secondary" className="ml-1">
                {tabCounts.outgoing}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="incoming" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Incoming</span>
            {tabCounts.incoming > 0 && (
              <Badge variant="default" className="ml-1">
                {tabCounts.incoming}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="outgoing" className="mt-6">
          <OutgoingTransfersTable 
            transfers={getFilteredTransfers('outgoing')}
            onComplete={handleComplete}
          />
        </TabsContent>

        <TabsContent value="incoming" className="mt-6">
          <IncomingTransfersTable 
            transfers={getFilteredTransfers('incoming')}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface TransfersTableProps {
  transfers: TransferRequest[];
  onApprove?: (transferId: string) => void;
  onReject?: (transferId: string) => void;
  onComplete?: (transferId: string) => void;
}

const OutgoingTransfersTable: React.FC<TransfersTableProps> = ({ transfers, onComplete }) => {
  const getStatusBadge = (status: TransferStatus) => {
    const variants = {
      pending: { variant: 'outline' as const, icon: Clock, color: 'text-yellow-600' },
      approved: { variant: 'default' as const, icon: CheckCircle, color: 'text-blue-600' },
      rejected: { variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' },
      canceled: { variant: 'secondary' as const, icon: AlertCircle, color: 'text-gray-600' },
      completed: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' }
    };

    const { variant, icon: Icon, color } = variants[status];
    
    return (
      <Badge variant={variant}>
        <Icon className={`h-3 w-3 mr-1 ${color}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (transfers.length === 0) {
    return (
      <div className="text-center py-12">
        <ArrowRightLeft className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No outgoing transfers</h3>
        <p className="text-muted-foreground mb-4">
          No transfer requests have been made from this agency.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>To Agency</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Requested At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transfers.map((transfer) => (
            <TableRow key={transfer.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{transfer.userName}</div>
                  <div className="text-sm text-muted-foreground">{transfer.userEmail}</div>
                </div>
              </TableCell>
              <TableCell className="font-medium">{transfer.toAgency}</TableCell>
              <TableCell>{transfer.requestedBy}</TableCell>
              <TableCell>{getStatusBadge(transfer.status)}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {transfer.requestedAt}
              </TableCell>
              <TableCell className="text-right">
                {transfer.status === 'approved' && onComplete && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onComplete(transfer.id)}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Complete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const IncomingTransfersTable: React.FC<TransfersTableProps> = ({ transfers, onApprove, onReject }) => {
  const getStatusBadge = (status: TransferStatus) => {
    const variants = {
      pending: { variant: 'outline' as const, icon: Clock, color: 'text-yellow-600' },
      approved: { variant: 'default' as const, icon: CheckCircle, color: 'text-blue-600' },
      rejected: { variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' },
      canceled: { variant: 'secondary' as const, icon: AlertCircle, color: 'text-gray-600' },
      completed: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' }
    };

    const { variant, icon: Icon, color } = variants[status];
    
    return (
      <Badge variant={variant}>
        <Icon className={`h-3 w-3 mr-1 ${color}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (transfers.length === 0) {
    return (
      <div className="text-center py-12">
        <ArrowRightLeft className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No incoming transfers</h3>
        <p className="text-muted-foreground mb-4">
          No transfer requests have been received by this agency.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>From Agency</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Requested At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transfers.map((transfer) => (
            <TableRow key={transfer.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{transfer.userName}</div>
                  <div className="text-sm text-muted-foreground">{transfer.userEmail}</div>
                </div>
              </TableCell>
              <TableCell className="font-medium">{transfer.fromAgency}</TableCell>
              <TableCell>{transfer.requestedBy}</TableCell>
              <TableCell>{getStatusBadge(transfer.status)}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {transfer.requestedAt}
              </TableCell>
              <TableCell className="text-right">
                {transfer.status === 'pending' && onApprove && onReject && (
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onApprove(transfer.id)}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onReject(transfer.id)}
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};