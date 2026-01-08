import * as React from "react"
import { cn } from "@/lib/utils"

// Simplified Tabs component (No external dependencies required)
export const Tabs = ({ defaultValue, children, className }) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue);
    return (
        <div className={className}>
            {React.Children.map(children, child => {
                if (!React.isValidElement(child)) return null;
                return React.cloneElement(child, { activeTab, setActiveTab });
            })}
        </div>
    );
}

export const TabsList = ({ children, className }) => (
    <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-slate-900/50 p-1 text-slate-400", className)}>
        {children}
    </div>
)

export const TabsTrigger = ({ value, children, activeTab, setActiveTab, className }) => (
    <button
        onClick={() => setActiveTab && setActiveTab(value)}
        className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
            activeTab === value ? "bg-indigo-600 text-white shadow-sm" : "hover:bg-slate-800 hover:text-white",
            className
        )}
    >
        {children}
    </button>
)

export const TabsContent = ({ value, children, activeTab, className }) => {
    if (value !== activeTab) return null;
    return (
        <div className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}>
            {children}
        </div>
    )
}
