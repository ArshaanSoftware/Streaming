export interface Content {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  backdrop: string;
  year: number;
  rating: string;
  duration: string;
  genre: string[];
  type: 'movie' | 'series';
  featured?: boolean;
  videoUrl?: string;
  trailerUrl?: string;
  cast?: string[];
  director?: string;
  seasons?: number;
  episodes?: number;
  imdbRating?: number;
  releaseDate?: string;
  language?: string;
  subtitles?: string[];
  quality?: '720p' | '1080p' | '4K';
  isNew?: boolean;
  isTrending?: boolean;
  watchProgress?: number;
  addedToWatchlist?: boolean;
  liked?: boolean;
}

export interface CarouselSection {
  id: string;
  title: string;
  content: Content[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  subscription: 'basic' | 'premium' | 'family';
  watchlist: string[];
  watchHistory: WatchHistoryItem[];
  preferences: UserPreferences;
  profiles: UserProfile[];
  activeProfile: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  isKid: boolean;
  language: string;
  maturityRating: string;
  watchlist: string[];
  watchHistory: WatchHistoryItem[];
}

export interface WatchHistoryItem {
  contentId: string;
  watchedAt: Date;
  progress: number;
  completed: boolean;
}

export interface UserPreferences {
  language: string;
  subtitles: boolean;
  autoplay: boolean;
  quality: 'auto' | '720p' | '1080p' | '4K';
  notifications: boolean;
  maturityRating: string;
}

export interface SearchFilters {
  genre?: string[];
  type?: 'movie' | 'series';
  year?: number;
  rating?: string;
  quality?: string;
  language?: string;
}

export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  quality: string;
  subtitles: boolean;
  playbackSpeed: number;
}