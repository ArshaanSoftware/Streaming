import { create } from 'zustand';
import { Content, SearchFilters } from '../types';
import { featuredContent, carouselSections } from '../data/mockContent';

interface ContentState {
  allContent: Content[];
  featuredContent: Content;
  carouselSections: any[];
  searchResults: Content[];
  searchQuery: string;
  searchFilters: SearchFilters;
  isLoading: boolean;
  currentlyWatching: Content | null;
  searchContent: (query: string, filters?: SearchFilters) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  clearSearch: () => void;
  setCurrentlyWatching: (content: Content | null) => void;
  getContentById: (id: string) => Content | undefined;
  getRecommendations: (contentId: string) => Content[];
  getContinueWatching: (watchHistory: any[]) => Content[];
}

export const useContentStore = create<ContentState>((set, get) => ({
  allContent: [
    featuredContent,
    ...carouselSections.flatMap(section => section.content)
  ],
  featuredContent,
  carouselSections,
  searchResults: [],
  searchQuery: '',
  searchFilters: {},
  isLoading: false,
  currentlyWatching: null,

  searchContent: (query: string, filters: SearchFilters = {}) => {
    set({ isLoading: true, searchQuery: query, searchFilters: filters });
    
    // Simulate API delay
    setTimeout(() => {
      const { allContent } = get();
      
      let results = allContent.filter(content => {
        const matchesQuery = content.title.toLowerCase().includes(query.toLowerCase()) ||
                            content.description.toLowerCase().includes(query.toLowerCase()) ||
                            content.genre.some(g => g.toLowerCase().includes(query.toLowerCase()));
        
        const matchesGenre = !filters.genre?.length || 
                            filters.genre.some(g => content.genre.includes(g));
        
        const matchesType = !filters.type || content.type === filters.type;
        
        const matchesYear = !filters.year || content.year === filters.year;
        
        const matchesRating = !filters.rating || content.rating === filters.rating;
        
        return matchesQuery && matchesGenre && matchesType && matchesYear && matchesRating;
      });
      
      set({ searchResults: results, isLoading: false });
    }, 500);
  },

  setSearchFilters: (filters: SearchFilters) => {
    const { searchQuery } = get();
    set({ searchFilters: filters });
    if (searchQuery) {
      get().searchContent(searchQuery, filters);
    }
  },

  clearSearch: () => {
    set({ searchResults: [], searchQuery: '', searchFilters: {} });
  },

  setCurrentlyWatching: (content: Content | null) => {
    set({ currentlyWatching: content });
  },

  getContentById: (id: string) => {
    const { allContent } = get();
    return allContent.find(content => content.id === id);
  },

  getRecommendations: (contentId: string) => {
    const { allContent } = get();
    const content = allContent.find(c => c.id === contentId);
    if (!content) return [];
    
    // Simple recommendation based on genre
    return allContent
      .filter(c => c.id !== contentId && c.genre.some(g => content.genre.includes(g)))
      .slice(0, 10);
  },

  getContinueWatching: (watchHistory: any[]) => {
    const { allContent } = get();
    return watchHistory
      .filter(item => item.progress > 0 && item.progress < 0.9)
      .map(item => {
        const content = allContent.find(c => c.id === item.contentId);
        return content ? { ...content, watchProgress: item.progress } : null;
      })
      .filter(Boolean)
      .slice(0, 10) as Content[];
  }
}));