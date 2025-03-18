'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './MusicPlayer.module.css';

export default function MusicPlayer({ lyrics }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const audioRef = useRef(null);
  const lyricsContainerRef = useRef(null);

  // 컴포넌트 마운트 시 이벤트 리스너 설정
  useEffect(() => {
    const audioElement = audioRef.current;
    
    if (!audioElement) return;
    
    const handleTimeUpdateEvent = () => {
      if (audioElement) {
        setCurrentTime(audioElement.currentTime);
      }
    };
    
    const handleEndedEvent = () => setIsPlaying(false);
    const handlePauseEvent = () => setIsPlaying(false);
    const handlePlayEvent = () => setIsPlaying(true);
    
    // 이벤트 리스너 등록
    audioElement.addEventListener('timeupdate', handleTimeUpdateEvent);
    audioElement.addEventListener('ended', handleEndedEvent);
    audioElement.addEventListener('pause', handlePauseEvent);
    audioElement.addEventListener('play', handlePlayEvent);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', handleTimeUpdateEvent);
        audioElement.removeEventListener('ended', handleEndedEvent);
        audioElement.removeEventListener('pause', handlePauseEvent);
        audioElement.removeEventListener('play', handlePlayEvent);
      }
    };
  }, []);

  // 가사 표시 관리
  useEffect(() => {
    if (isPlaying) {
      // 재생 시작 시 약간의 지연 후 가사 표시
      const timer = setTimeout(() => {
        setShowLyrics(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setShowLyrics(false);
    }
  }, [isPlaying]);

  // 현재 가사 인덱스 업데이트
  useEffect(() => {
    if (!lyrics.length || !showLyrics) return;
    
    const index = lyrics.findIndex((lyric, i) => {
      return currentTime >= lyric.time && (!lyrics[i + 1] || currentTime < lyrics[i + 1].time);
    });
    
    if (index !== currentLyricIndex && index !== -1) {
      // 가사 전환 시 지연 시간 최소화
      setCurrentLyricIndex(index);
      
      // 애니메이션 효과는 유지하되 지연 시간 최소화
      if (lyricsContainerRef.current) {
        setIsTransitioning(true);
        requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      }
    }
  }, [currentTime, lyrics, currentLyricIndex, showLyrics]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("오디오 재생 오류:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const renderLyrics = () => {
    if (currentLyricIndex === -1 || !lyrics.length) return null;
    
    const prevIndex = Math.max(0, currentLyricIndex - 1);
    const nextIndex = Math.min(lyrics.length - 1, currentLyricIndex + 1);
    
    return (
      <div 
        ref={lyricsContainerRef}
        className={`${styles.lyricsContainer} ${isTransitioning ? styles.transitioning : ''}`}
      >
        {currentLyricIndex > 0 && (
          <div className={styles.prevLyric}>{lyrics[prevIndex].text}</div>
        )}
        <div className={styles.currentLyric}>{lyrics[currentLyricIndex].text}</div>
        {currentLyricIndex < lyrics.length - 1 && (
          <div className={styles.nextLyric}>{lyrics[nextIndex].text}</div>
        )}
        <div className={styles.timeInfo}>
          {formatTime(currentTime)} / {formatTime(audioRef.current?.duration || 0)}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.musicPlayer}>
      <button 
        className={styles.playButton} 
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <span className={styles.playIcon}>
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </span>
        <span className={styles.playText}>
          {isPlaying ? "Pause" : "Play Spring Love"}
        </span>
      </button>
      
      <audio
        ref={audioRef}
        src="/music/Spring Love.mp3"
      />
      
      {showLyrics && renderLyrics()}
    </div>
  );
}
