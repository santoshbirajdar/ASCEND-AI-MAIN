import * as React from "react"
import { cn } from "@/lib/utils"
 
const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "border border-input bg-background hover:bg-slate-800 hover:text-accent-foreground",
    ghost: "hover:bg-slate-800 hover:text-accent-foreground",
  }
  return (
    <button
      className={cn(baseStyles, variants[variant || 'default'], className)}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"
export { Button }
