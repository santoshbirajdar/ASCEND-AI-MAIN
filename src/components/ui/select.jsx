import * as React from "react"
// Simplified Select for demo purposes
export const Select = ({ value, onValueChange, children }) => {
    return React.cloneElement(children, { value, onValueChange });
}
export const SelectTrigger = ({ children, className }) => <div className={className}>{children}</div>
export const SelectValue = () => <span>Select...</span>
export const SelectContent = ({ children }) => <div className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">{children}</div>
export const SelectItem = ({ value, children }) => <div className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground">{children}</div>
