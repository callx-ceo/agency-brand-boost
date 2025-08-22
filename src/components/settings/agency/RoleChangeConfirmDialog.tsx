import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Crown, Shield, User, AlertTriangle } from 'lucide-react';

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

interface RoleChangeConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pendingChange: { member: AgencyMember; newRole: UserRole } | null;
  onConfirm: () => void;
}

export const RoleChangeConfirmDialog: React.FC<RoleChangeConfirmDialogProps> = ({
  open,
  onOpenChange,
  pendingChange,
  onConfirm
}) => {
  if (!pendingChange) return null;

  const { member, newRole } = pendingChange;

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'Owner': return <Crown className="h-4 w-4" />;
      case 'Admin': return <Shield className="h-4 w-4" />;
      case 'Agent': return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadge = (role: UserRole) => {
    const colors = {
      Owner: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Admin: 'bg-blue-100 text-blue-800 border-blue-200',
      Agent: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return (
      <Badge variant="outline" className={colors[role]}>
        <span className="flex items-center space-x-1">
          {getRoleIcon(role)}
          <span>{role}</span>
        </span>
      </Badge>
    );
  };

  const isPromotingToOwner = newRole === 'Owner';

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center space-x-2">
            {isPromotingToOwner && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
            <span>
              {isPromotingToOwner ? 'Transfer Ownership' : 'Change Role'}
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <div>
              You are about to change <strong>{member.name}</strong>'s role from{' '}
              {getRoleBadge(member.role)} to {getRoleBadge(newRole)}.
            </div>
            
            {isPromotingToOwner && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="font-semibold text-yellow-800">
                      Important: Ownership Transfer
                    </p>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• You will lose owner privileges and become an Admin</li>
                      <li>• The new owner will have full control over the agency</li>
                      <li>• This action cannot be undone without the new owner's approval</li>
                      <li>• All billing and account management will transfer to them</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <p className="font-medium">Role capabilities:</p>
              <div className="space-y-1 text-sm">
                {newRole === 'Owner' && (
                  <div>
                    <strong>Owner:</strong> Full control over agency settings, members, billing, and transfers
                  </div>
                )}
                {newRole === 'Admin' && (
                  <div>
                    <strong>Admin:</strong> Can manage members, invites, take calls, but cannot transfer ownership
                  </div>
                )}
                {newRole === 'Agent' && (
                  <div>
                    <strong>Agent:</strong> Can take calls and view personal metrics only
                  </div>
                )}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={isPromotingToOwner ? "bg-yellow-600 hover:bg-yellow-700" : ""}
          >
            {isPromotingToOwner ? 'Transfer Ownership' : 'Change Role'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};