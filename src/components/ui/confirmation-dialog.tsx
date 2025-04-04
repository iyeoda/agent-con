import React from 'react';
import Dialog from './dialog';
import Button from './button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonClass = 'bg-red-600 hover:bg-red-700 text-white'
}) => {
  return (
    <Dialog
      title={title}
      content={
        <div className="space-y-4">
          <p className="text-[#4C5760]">{message}</p>
          <div className="flex justify-end gap-2 mt-6">
            <Button 
              variant="outline" 
              onClick={onClose}
            >
              {cancelText}
            </Button>
            <Button 
              className={confirmButtonClass}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      }
      open={isOpen}
      onOpenChange={onClose}
    />
  );
};

export default ConfirmationDialog; 