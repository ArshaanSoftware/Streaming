import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  SkipBack, SkipForward, Settings, Subtitles, X
} from 'lucide-react';
import { gsap } from 'gsap';
import { Content } from '../../types';
import { useAuthStore } from '../../store/authStore';

interface VideoPlayerProps {
  content: Content;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ content, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('1080p');
  const [showSettings, setShowSettings] = useState(false);
  const [subtitles, setSubtitles] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const { updateWatchProgress } = useAuthStore();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      const progress = video.currentTime / video.duration;
      updateWatchProgress(content.id, progress);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      if (content.watchProgress) {
        video.currentTime = content.watchProgress * video.duration;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [content.id, content.watchProgress, updateWatchProgress]);

  useEffect(() => {
    let hideControlsTimeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(hideControlsTimeout);
      hideControlsTimeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(hideControlsTimeout);
      };
    }
  }, [isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progressBar = progressRef.current;
    if (!video || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds));
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={content.backdrop}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={content.videoUrl || '#'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Controls Overlay */}
      <div 
        ref={controlsRef}
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-semibold">{content.title}</h1>
            <p className="text-gray-300 text-sm">{content.year} • {content.rating} • {content.duration}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="bg-white/20 hover:bg-white/30 rounded-full p-4 transition-colors"
          >
            {isPlaying ? <Pause size={32} className="text-white" /> : <Play size={32} className="text-white" />}
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* Progress Bar */}
          <div 
            ref={progressRef}
            className="w-full h-2 bg-gray-600 rounded-full mb-4 cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-red-600 rounded-full relative"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              <button
                onClick={() => skip(-10)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <SkipBack size={20} />
              </button>

              <button
                onClick={() => skip(10)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <SkipForward size={20} />
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSubtitles(!subtitles)}
                className={`transition-colors ${
                  subtitles ? 'text-red-500' : 'text-white hover:text-gray-300'
                }`}
              >
                <Subtitles size={20} />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Settings size={20} />
                </button>

                {showSettings && (
                  <div className="absolute bottom-8 right-0 bg-gray-800 rounded-lg p-4 min-w-48">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-white text-sm mb-1">Quality</label>
                        <select
                          value={quality}
                          onChange={(e) => setQuality(e.target.value)}
                          className="w-full bg-gray-700 text-white rounded px-2 py-1 text-sm"
                        >
                          <option value="auto">Auto</option>
                          <option value="4K">4K</option>
                          <option value="1080p">1080p</option>
                          <option value="720p">720p</option>
                          <option value="480p">480p</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white text-sm mb-1">Speed</label>
                        <select className="w-full bg-gray-700 text-white rounded px-2 py-1 text-sm">
                          <option value="0.5">0.5x</option>
                          <option value="0.75">0.75x</option>
                          <option value="1" selected>Normal</option>
                          <option value="1.25">1.25x</option>
                          <option value="1.5">1.5x</option>
                          <option value="2">2x</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;