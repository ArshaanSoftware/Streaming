import React, { useRef, useEffect } from 'react';
import { Plus, Edit } from 'lucide-react';
import { gsap } from 'gsap';
import { useAuthStore } from '../../store/authStore';

interface ProfileSelectorProps {
  onProfileSelect: (profileId: string) => void;
  onManageProfiles: () => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onProfileSelect, onManageProfiles }) => {
  const { user } = useAuthStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current.children,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }
      );
    }
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">
          Who's watching?
        </h1>
        
        <div 
          ref={containerRef}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {user.profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => onProfileSelect(profile.id)}
            >
              <div className="relative mb-4">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-lg object-cover border-4 border-transparent group-hover:border-white transition-all duration-300"
                />
                {profile.isKid && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                    KIDS
                  </div>
                )}
              </div>
              <span className="text-white text-lg font-medium group-hover:text-gray-300 transition-colors">
                {profile.name}
              </span>
            </div>
          ))}
          
          {user.profiles.length < 5 && (
            <div
              className="flex flex-col items-center cursor-pointer group"
              onClick={onManageProfiles}
            >
              <div className="w-32 h-32 rounded-lg bg-gray-800 border-4 border-dashed border-gray-600 group-hover:border-white flex items-center justify-center mb-4 transition-all duration-300">
                <Plus size={32} className="text-gray-400 group-hover:text-white" />
              </div>
              <span className="text-gray-400 text-lg font-medium group-hover:text-white transition-colors">
                Add Profile
              </span>
            </div>
          )}
        </div>

        <button
          onClick={onManageProfiles}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mx-auto"
        >
          <Edit size={16} />
          <span>Manage Profiles</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSelector;