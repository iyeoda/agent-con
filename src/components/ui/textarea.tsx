// src/components/ui/textarea.tsx
import React, { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea = ({ className, ...props }: TextareaProps) => (
  <textarea
    className={`w-full resize-none min-h-[60px] max-h-[200px] border border-[#4C5760] text-[#4C5760] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D15F36] ${className}`}
    {...props}
  />
);

export default Textarea;
