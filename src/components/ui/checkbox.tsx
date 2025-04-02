// src/components/ui/checkbox.tsx
import React, { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Checkbox = ({ className = '', ...props }: CheckboxProps) => (
  <input
    type="checkbox"
    className={`h-5 w-5 rounded border-[#4C5760] text-[#D15F36] focus:ring-2 focus:ring-[#D15F36] ${className}`}
    {...props}
  />
);

export default Checkbox;
