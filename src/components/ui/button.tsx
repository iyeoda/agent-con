// src/components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D15F36] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          // Variant styles
          variant === 'default' && "bg-[#D15F36] text-white hover:bg-opacity-90",
          variant === 'destructive' && "bg-red-600 text-white hover:bg-red-700",
          variant === 'outline' && "border border-[#A7CEBC] bg-white hover:bg-gray-50 hover:text-[#3A366E]",
          variant === 'secondary' && "bg-[#F7F5F2] text-[#3A366E] hover:bg-gray-100",
          variant === 'ghost' && "hover:bg-gray-100 hover:text-[#3A366E]",
          variant === 'link' && "text-[#3A366E] underline-offset-4 hover:underline",
          // Size styles
          size === 'default' && "h-10 px-4 py-2",
          size === 'sm' && "h-9 rounded-md px-3",
          size === 'lg' && "h-11 rounded-md px-8",
          size === 'icon' && "h-10 w-10",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export default Button
