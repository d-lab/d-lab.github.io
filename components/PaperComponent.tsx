'use client';

// PodcastContext.tsx
import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

export type Publication = {
  title: string;
  authors: string[];
  year: string;
  conference?: string;
  journal?: string;
  abstract?: string;
  pdf?: string;
  code?: string;
  website?: string;
  doi?: string;
  podcast?: string;
}

interface PodcastContextType {
  currentPublication: Publication | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isPlayerVisible: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  playPodcast: (publication: Publication) => void;
  togglePlayPause: () => void;
  closePlayer: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setIsPlaying: (playing: boolean) => void;
}

const PodcastContext = createContext<PodcastContextType | undefined>(undefined);

export const usePodcast = () => {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error('usePodcast must be used within a PodcastProvider');
  }
  return context;
};

interface PodcastProviderProps {
  children: ReactNode;
}

export const PodcastProvider: React.FC<PodcastProviderProps> = ({ children }) => {
  const [currentPublication, setCurrentPublication] = useState<Publication | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playPodcast = (publication: Publication) => {
    setCurrentPublication(publication);
    setIsPlayerVisible(true);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlayerVisible(false);
    setCurrentPublication(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  return (
    <PodcastContext.Provider
      value={{
        currentPublication,
        isPlaying,
        currentTime,
        duration,
        isPlayerVisible,
        audioRef,
        playPodcast,
        togglePlayPause,
        closePlayer,
        setCurrentTime,
        setDuration,
        setIsPlaying,
      }}
    >
      {children}
      <FloatingPodcastPlayer />
    </PodcastContext.Provider>
  );
};

// FloatingPodcastPlayer.tsx
const FloatingPodcastPlayer: React.FC = () => {
  const {
    currentPublication,
    isPlaying,
    currentTime,
    duration,
    isPlayerVisible,
    audioRef,
    togglePlayPause,
    closePlayer,
    setCurrentTime,
    setDuration,
    setIsPlaying,
  } = usePodcast();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const clickX = e.clientX - progressBar.getBoundingClientRect().left;
      const width = progressBar.offsetWidth;
      const newTime = (clickX / width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  if (!isPlayerVisible || !currentPublication) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
        <audio
          ref={audioRef}
          src={currentPublication.podcast}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          preload="metadata"
        />
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {currentPublication.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
              {currentPublication.authors.join(', ')}
            </p>
          </div>
          
          <button
            onClick={closePlayer}
            className="ml-3 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            title="Close player"
          >
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={togglePlayPause}
            className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors flex-shrink-0"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 mb-2">
              <span>{formatTime(currentTime)}</span>
              <span className="font-medium">🎧 Podcast</span>
              <span>{formatTime(duration)}</span>
            </div>
            
            <div 
              className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Updated Paper Component
interface PaperProps {
  publication: Publication;
}

export const Paper: React.FC<PaperProps> = ({ publication }) => {
  const { playPodcast } = usePodcast();

  const formatAuthors = (authors: string[]) => {
    return authors.join(', ');
  };

  const handlePodcastClick = () => {
    if (publication.podcast) {
      playPodcast(publication);
    }
  };

  return (
    <div className="rounded-3xl border border-blue-100 dark:border-blue-900 bg-white/90 dark:bg-blue-950/20 p-6 shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 transition-shadow">
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="text-xl font-semibold text-blue-700 dark:text-yellow-200">
            {publication.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {formatAuthors(publication.authors)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
          {publication.conference || publication.journal ? (
            <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-600 px-3 py-1 dark:bg-blue-900/40 dark:text-yellow-200 uppercase tracking-[0.2em] text-[0.65rem]">
              {publication.conference || publication.journal}
            </span>
          ) : null}
          {publication.year && (
            <span className="text-gray-500 dark:text-gray-400">· {publication.year}</span>
          )}
        </div>
        {publication.abstract && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
            {publication.abstract}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        {publication.pdf && (
          <a
            href={publication.pdf}
            className="px-4 py-2 rounded-full border border-blue-600 text-blue-700 text-sm font-semibold hover:bg-blue-50 transition-colors dark:border-yellow-200 dark:text-yellow-200 dark:hover:bg-blue-900/40"
            target="_blank"
            rel="noopener noreferrer"
          >
            Paper
          </a>
        )}
        {publication.code && (
          <a
            href={publication.code}
            className="px-4 py-2 rounded-full border border-blue-600 text-blue-700 text-sm font-semibold hover:bg-blue-50 transition-colors dark:border-yellow-200 dark:text-yellow-200 dark:hover:bg-blue-900/40"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code
          </a>
        )}
        {publication.podcast && (
          <button
            onClick={handlePodcastClick}
            className="px-4 py-2 rounded-full border border-blue-600 text-blue-700 text-sm font-semibold hover:bg-blue-50 transition-colors dark:border-yellow-200 dark:text-yellow-200 dark:hover:bg-blue-900/40"
          >
            🎧 Listen as Podcast
          </button>
        )}
        {publication.website && (
          <a
            href={publication.website}
            className="px-4 py-2 rounded-full border border-blue-600 text-blue-700 text-sm font-semibold hover:bg-blue-50 transition-colors dark:border-yellow-200 dark:text-yellow-200 dark:hover:bg-blue-900/40"
            target="_blank"
            rel="noopener noreferrer"
          >
            Project Site
          </a>
        )}
      </div>
    </div>
  );
};

// Updated PaperList Component
interface PaperListProps {
  publications: Publication[];
  limit?: number;
}

export const PaperList: React.FC<PaperListProps> = ({ publications, limit }) => {
  const displayedPublications = limit ? publications.slice(0, limit) : publications;

  return (
    <div className="space-y-8">
      {displayedPublications.map((publication, index) => (
        <Paper key={index} publication={publication} />
      ))}
    </div>
  );
};

export default Paper;
