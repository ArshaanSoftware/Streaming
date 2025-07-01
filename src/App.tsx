import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';
import Carousel from './components/Carousel';
import LoadingScreen from './components/LoadingScreen';
import SearchResults from './components/Search/SearchResults';
import ProfileSelector from './components/Profile/ProfileSelector';
import WatchlistPage from './components/Watchlist/WatchlistPage';
import { featuredContent, carouselSections } from './data/mockContent';
import { useAuthStore } from './store/authStore';
import { useContentStore } from './store/contentStore';

gsap.registerPlugin(ScrollTrigger);

type AppView = 'home' | 'search' | 'profiles' | 'watchlist';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<AppView>('home');
  
  const { isAuthenticated, activeProfile, switchProfile } = useAuthStore();
  const { searchQuery, getContinueWatching } = useContentStore();

  // Get continue watching content based on user's watch history
  const continueWatchingContent = activeProfile 
    ? getContinueWatching(activeProfile.watchHistory)
    : [];

  // Update carousel sections with continue watching
  const updatedCarouselSections = continueWatchingContent.length > 0
    ? [
        { id: 'continue-watching', title: 'Continue Watching', content: continueWatchingContent },
        ...carouselSections
      ]
    : carouselSections;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setCurrentView('search');
    } else if (currentView === 'search') {
      setCurrentView('home');
    }
  }, [searchQuery]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleProfileSelect = (profileId: string) => {
    switchProfile(profileId);
    setCurrentView('home');
  };

  const renderCurrentView = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Header />
          <Hero content={featuredContent} />
          <div className="relative z-10 -mt-32 bg-gradient-to-t from-black via-black/95 to-transparent pt-32">
            {carouselSections.map((section) => (
              <Carousel
                key={section.id}
                title={section.title}
                content={section.content}
              />
            ))}
          </div>
        </>
      );
    }

    if (!activeProfile) {
      return (
        <ProfileSelector
          onProfileSelect={handleProfileSelect}
          onManageProfiles={() => setCurrentView('profiles')}
        />
      );
    }

    switch (currentView) {
      case 'search':
        return (
          <>
            <Header 
              onShowWatchlist={() => setCurrentView('watchlist')}
              onShowProfiles={() => setCurrentView('profiles')}
            />
            <SearchResults />
          </>
        );
      
      case 'profiles':
        return (
          <ProfileSelector
            onProfileSelect={handleProfileSelect}
            onManageProfiles={() => setCurrentView('profiles')}
          />
        );
      
      case 'watchlist':
        return (
          <>
            <Header 
              onShowWatchlist={() => setCurrentView('watchlist')}
              onShowProfiles={() => setCurrentView('profiles')}
            />
            <WatchlistPage />
          </>
        );
      
      default:
        return (
          <>
            <Header 
              onShowWatchlist={() => setCurrentView('watchlist')}
              onShowProfiles={() => setCurrentView('profiles')}
            />
            <Hero content={featuredContent} />
            <div className="relative z-10 -mt-32 bg-gradient-to-t from-black via-black/95 to-transparent pt-32">
              {updatedCarouselSections.map((section) => (
                <Carousel
                  key={section.id}
                  title={section.title}
                  content={section.content}
                />
              ))}
            </div>
          </>
        );
    }
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="bg-black min-h-screen">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151'
          }
        }}
      />
      
      {renderCurrentView()}
      
      {currentView === 'home' && (
        <footer className="bg-gray-900 text-gray-400 py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-4">StreamFlix</h3>
                <p className="text-sm">Your premium streaming destination for the best movies and TV shows.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Navigation</h4>
                <ul className="space-y-2 text-sm">
                  <li><button className="hover:text-white transition-colors">Home</button></li>
                  <li><button className="hover:text-white transition-colors">Movies</button></li>
                  <li><button className="hover:text-white transition-colors">TV Shows</button></li>
                  <li><button onClick={() => setCurrentView('watchlist')} className="hover:text-white transition-colors">My List</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><button className="hover:text-white transition-colors">Help Center</button></li>
                  <li><button className="hover:text-white transition-colors">Contact Us</button></li>
                  <li><button className="hover:text-white transition-colors">Terms of Service</button></li>
                  <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Connect</h4>
                <ul className="space-y-2 text-sm">
                  <li><button className="hover:text-white transition-colors">Facebook</button></li>
                  <li><button className="hover:text-white transition-colors">Twitter</button></li>
                  <li><button className="hover:text-white transition-colors">Instagram</button></li>
                  <li><button className="hover:text-white transition-colors">YouTube</button></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-sm">&copy; 2024 StreamFlix. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;