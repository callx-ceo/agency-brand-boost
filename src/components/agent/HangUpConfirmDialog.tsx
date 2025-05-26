
import React from "react";
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

interface HangUpConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const HangUpConfirmDialog = ({ isOpen, onClose, onConfirm }: HangUpConfirmDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Are you sure you want to hang up?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center gap-4 sm:justify-center">
          <AlertDialogCancel onClick={onClose} className="w-20">
            No
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="w-20 bg-red-600 hover:bg-red-700">
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default HangUpConfirmDialog;
