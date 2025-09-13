import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formateDate(dateString: string) {
  const date = new Date(dateString);

  // Extract date & time
  const formattedDate = date.toLocaleDateString("en-IN"); // 🇮🇳 dd/mm/yyyy
  const formattedTime = date.toLocaleTimeString("en-IN"); // hh:mm:ss AM/PM

  return {
    formattedDate,
    formattedTime,
  };
}
