import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current && overlayRef.current) {
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(modalRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    if (modalRef.current && overlayRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: 'power2.in'
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: onClose
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div 
        ref={modalRef}
        className="bg-gray-900 rounded-2xl p-8 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {mode === 'login' ? (
          <LoginForm onSwitchToRegister={() => setMode('register')} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setMode('login')} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;