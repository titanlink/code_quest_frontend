import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (imageUrl?: string | File | undefined): string => {
  if (!imageUrl) return "/no_image_available.jpg";
  if (typeof imageUrl === "string") return imageUrl;
  return URL.createObjectURL(imageUrl);
};
