// src/components/ui/input.tsx
import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className, ...props }: InputProps) => (
  <input
    className={`px-4 py-2 rounded-md border border-[#4C5760] text-[#4C5760] focus:outline-none focus:ring-2 focus:ring-[#D15F36] ${className}`}
    {...props}
  />
);

export default Input;
