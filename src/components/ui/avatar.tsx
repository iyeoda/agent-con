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

interface AvatarFallbackProps {
  className?: string;
  children: ReactNode;
}

export const AvatarFallback = ({ className, children }: AvatarFallbackProps) => (
  <div className={className}>{children}</div>
);

interface AvatarImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const AvatarImage = ({ src, alt, className }: AvatarImageProps) => (
  <img src={src} alt={alt} className={`rounded-full ${className}`} />
);

export default Avatar;
