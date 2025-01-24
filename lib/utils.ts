import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using `clsx` and merges them with Tailwind's
 * `twMerge` utility to ensure no conflicting styles.
 *
 * @param inputs - An array of class name values or expressions.
 * @returns A single string with the merged class names.
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
