// src/components/ui/avatar.tsx
import React, { ReactNode } from 'react';

interface AvatarProps {
  className?: string;
  children: ReactNode;
}

const Avatar = ({ className, children }: AvatarProps) => (
  <div
    className={`flex items-center justify-center rounded-full bg-[#3A366E] text-white text-sm font-bold ${className}`}
  >
    {children}
  </div>
);

export default Avatar;
