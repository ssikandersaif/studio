import { placeholderImages } from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// This is now redundant as we import directly in the component, but we'll keep it for structural consistency
export const PlaceHolderImages: ImagePlaceholder[] = placeholderImages;
