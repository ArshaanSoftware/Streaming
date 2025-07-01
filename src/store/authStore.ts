import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserProfile } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  activeProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  switchProfile: (profileId: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addToWatchlist: (contentId: string) => void;
  removeFromWatchlist: (contentId: string) => void;
  updateWatchProgress: (contentId: string, progress: number) => void;
}

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
  subscription: 'premium',
  watchlist: [],
  watchHistory: [],
  preferences: {
    language: 'en',
    subtitles: false,
    autoplay: true,
    quality: 'auto',
    notifications: true,
    maturityRating: 'PG-13'
  },
  profiles: [
    {
      id: 'profile-1',
      name: 'John',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      isKid: false,
      language: 'en',
      maturityRating: 'R',
      watchlist: [],
      watchHistory: []
    },
    {
      id: 'profile-2',
      name: 'Kids',
      avatar: 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      isKid: true,
      language: 'en',
      maturityRating: 'G',
      watchlist: [],
      watchHistory: []
    }
  ],
  activeProfile: 'profile-1'
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      activeProfile: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (email === 'demo@streamflix.com' && password === 'demo123') {
          const activeProfile = mockUser.profiles.find(p => p.id === mockUser.activeProfile);
          set({ 
            user: mockUser, 
            isAuthenticated: true, 
            activeProfile,
            isLoading: false 
          });
        } else {
          set({ isLoading: false });
          throw new Error('Invalid credentials');
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, activeProfile: null });
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newUser: User = {
          ...mockUser,
          id: Date.now().toString(),
          name,
          email,
          profiles: [{
            id: 'profile-1',
            name,
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
            isKid: false,
            language: 'en',
            maturityRating: 'R',
            watchlist: [],
            watchHistory: []
          }]
        };
        
        set({ 
          user: newUser, 
          isAuthenticated: true, 
          activeProfile: newUser.profiles[0],
          isLoading: false 
        });
      },

      switchProfile: (profileId: string) => {
        const { user } = get();
        if (user) {
          const profile = user.profiles.find(p => p.id === profileId);
          if (profile) {
            set({ activeProfile: profile });
          }
        }
      },

      updateProfile: (profileData: Partial<UserProfile>) => {
        const { user, activeProfile } = get();
        if (user && activeProfile) {
          const updatedProfile = { ...activeProfile, ...profileData };
          const updatedProfiles = user.profiles.map(p => 
            p.id === activeProfile.id ? updatedProfile : p
          );
          set({ 
            user: { ...user, profiles: updatedProfiles },
            activeProfile: updatedProfile
          });
        }
      },

      addToWatchlist: (contentId: string) => {
        const { user, activeProfile } = get();
        if (user && activeProfile) {
          const updatedProfile = {
            ...activeProfile,
            watchlist: [...activeProfile.watchlist, contentId]
          };
          const updatedProfiles = user.profiles.map(p => 
            p.id === activeProfile.id ? updatedProfile : p
          );
          set({ 
            user: { ...user, profiles: updatedProfiles },
            activeProfile: updatedProfile
          });
        }
      },

      removeFromWatchlist: (contentId: string) => {
        const { user, activeProfile } = get();
        if (user && activeProfile) {
          const updatedProfile = {
            ...activeProfile,
            watchlist: activeProfile.watchlist.filter(id => id !== contentId)
          };
          const updatedProfiles = user.profiles.map(p => 
            p.id === activeProfile.id ? updatedProfile : p
          );
          set({ 
            user: { ...user, profiles: updatedProfiles },
            activeProfile: updatedProfile
          });
        }
      },

      updateWatchProgress: (contentId: string, progress: number) => {
        const { user, activeProfile } = get();
        if (user && activeProfile) {
          const existingItem = activeProfile.watchHistory.find(item => item.contentId === contentId);
          let updatedHistory;
          
          if (existingItem) {
            updatedHistory = activeProfile.watchHistory.map(item =>
              item.contentId === contentId 
                ? { ...item, progress, watchedAt: new Date(), completed: progress >= 0.9 }
                : item
            );
          } else {
            updatedHistory = [
              ...activeProfile.watchHistory,
              {
                contentId,
                progress,
                watchedAt: new Date(),
                completed: progress >= 0.9
              }
            ];
          }

          const updatedProfile = {
            ...activeProfile,
            watchHistory: updatedHistory
          };
          
          const updatedProfiles = user.profiles.map(p => 
            p.id === activeProfile.id ? updatedProfile : p
          );
          
          set({ 
            user: { ...user, profiles: updatedProfiles },
            activeProfile: updatedProfile
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        activeProfile: state.activeProfile
      })
    }
  )
);