export type PexelsPhotoResponse = {
  page: number;
  per_page: number;
  total_results: number;
  next_page: string;
  photos: PexelsPhoto[];
};

export type PexelsPhoto = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: PexelsPhotoSrc;
  liked: boolean;
  alt: string;
};

type PexelsPhotoSrc = {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
};

export type User = {
  username: string;
  password: string;
};

export type SignInResponse = {
  success: boolean;
  errorMessage?: string;
};
