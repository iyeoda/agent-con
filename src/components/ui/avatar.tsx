// src/components/ui/avatar.tsx
import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps {
  className?: string;
  children: ReactNode;
}

const Avatar = ({ className, children }: AvatarProps) => (
  <div
    className={cn(
      'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#3A366E] text-white text-sm font-bold aspect-square',
      className
    )}
  >
    {children}
  </div>
);

interface AvatarFallbackProps {
  className?: string;
  children: ReactNode;
}

export const AvatarFallback = ({ className, children }: AvatarFallbackProps) => (
  <div className={cn('flex h-full w-full items-center justify-center', className)}>
    {children}
  </div>
);

interface AvatarImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const AvatarImage = ({ src, alt, className }: AvatarImageProps) => (
  <img 
    src={src} 
    alt={alt} 
    className={cn('h-full w-full object-cover', className)} 
  />
);

export default Avatar;
