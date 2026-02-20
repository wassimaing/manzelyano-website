import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO, isSameDay } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEventDate(startDate?: string, endDate?: string, fallback?: string): string {
  if (!startDate || !endDate) return fallback || '';
  try {
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    if (isSameDay(start, end)) {
      return format(start, "MMMM d, yyyy");
    }

    return `FROM ${format(start, "MMMM d").toUpperCase()} TO ${format(end, "MMMM d, yyyy").toUpperCase()}`;
  } catch {
    return fallback || '';
  }
}

export function formatEventTime(timeline: { time: string; activity: string }[] = []): string {
  if (!timeline || timeline.length === 0) return '8:00 AM - 6:00 PM';

  const startTime = timeline[0].time;
  const endTime = timeline[timeline.length - 1].time;

  return `${startTime} - ${endTime}`;
}
