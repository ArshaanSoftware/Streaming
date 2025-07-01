import React, { useEffect, useRef, useState } from 'react';
import { Bell, User, Menu, LogOut, Settings, Heart } from 'lucide-react';
import { gsap } from 'gsap';
import { useAuthStore } from '../store/authStore';
import { useContentStore } from '../store/contentStore';
import SearchBar from './Search/SearchBar';
import AuthModal from './Auth/AuthModal';

interface HeaderProps {
  onShowWatchlist?: () => void;
  onShowProfiles?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowWatchlist, onShowProfiles }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, user, activeProfile, logout } = useAuthStore();
  const { clearSearch } = useContentStore();

  useEffect(() => {
    if (headerRef.current && logoRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.fromTo(
        logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }
      );
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    clearSearch();
    setShowUserMenu(false);
  };

  const navItems = [
    { label: 'Home', href: '#', active: true },
    { label: 'TV Shows', href: '#' },
    { label: 'Movies', href: '#' },
    { label: 'New & Popular', href: '#' },
    { label: 'My List', href: '#', onClick: onShowWatchlist }
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 px-4 py-4 md:px-8 transition-all duration-300 ${
          isScrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-gradient-to-b from-black via-black/80 to-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div ref={logoRef} className="text-red-600 font-bold text-2xl cursor-pointer">
              StreamFlix
            </div>
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={`transition-colors duration-200 ${
                    item.active 
                      ? 'text-white font-medium' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <SearchBar 
              isExpanded={showSearchBar}
              onToggle={() => setShowSearchBar(!showSearchBar)}
            />

            {isAuthenticated ? (
              <>
                <button className="text-white hover:text-gray-300 transition-colors duration-200">
                  <Bell size={20} />
                </button>
                
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    <img
                      src={activeProfile?.avatar || user?.avatar}
                      alt={activeProfile?.name || user?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="hidden md:block">{activeProfile?.name || user?.name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-12 bg-gray-900 rounded-lg shadow-xl border border-gray-700 min-w-48 py-2">
                      <button
                        onClick={onShowProfiles}
                        className="w-full px-4 py-2 text-left text-white hover:bg-gray-800 transition-colors flex items-center space-x-2"
                      >
                        <User size={16} />
                        <span>Switch Profile</span>
                      </button>
                      <button
                        onClick={onShowWatchlist}
                        className="w-full px-4 py-2 text-left text-white hover:bg-gray-800 transition-colors flex items-center space-x-2"
                      >
                        <Heart size={16} />
                        <span>My Watchlist</span>
                      </button>
                      <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-800 transition-colors flex items-center space-x-2">
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>
                      <hr className="border-gray-700 my-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-800 transition-colors flex items-center space-x-2"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Sign In
              </button>
            )}

            <button className="text-white hover:text-gray-300 transition-colors duration-200 md:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Header;