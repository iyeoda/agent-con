// src/components/ui/button.tsx
import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className = '', variant = 'default', ...props }: ButtonProps) => (
  <button
    className={`px-4 py-2 rounded-md font-semibold text-white bg-[#3A366E] ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
