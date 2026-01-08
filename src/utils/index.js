import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function createPageUrl(page) {
  // Simple helper to format URLs
  if (!page) return "/";
  if (page.startsWith("/")) return page;
  return "/" + page.toLowerCase();
}
