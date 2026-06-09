import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSeoParam(param: string | null): string | null {
  if (!param) return null;
  // If it's a 3 letter airport code like DEL or BOM, uppercase it.
  if (param.length === 3 && !param.includes("-")) return param.toUpperCase();
  return param
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
