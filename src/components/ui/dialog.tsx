// src/components/ui/dialog.tsx
import React, { ReactNode } from 'react';
import { Dialog as RadixDialog, DialogTrigger, DialogContent, DialogTitle } from '@radix-ui/react-dialog';

interface DialogProps {
  children: ReactNode;
  title: string;
  content: ReactNode;
}

const Dialog = ({ children, title, content }: DialogProps) => (
  <RadixDialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="w-full max-w-2xl p-6 bg-[#F7F5F2] border border-[#A7CEBC] shadow-lg">
      <DialogTitle className="text-xl font-bold mb-4">{title}</DialogTitle>
      {content}
    </DialogContent>
  </RadixDialog>
);

export default Dialog;
