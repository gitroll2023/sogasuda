'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './YouTubePlayer.module.css';

export default function YouTubePlayer({ videoId }) {
  const [isMuted, setIsMuted] = useState(true); 
  const [showInstructions, setShowInstructions] = useState(true);
  const playerRef = useRef(null);
  const instructionsTimerRef = useRef(null);
  const playerReadyRef = useRef(false);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1, 
          mute: 1, 
          controls: 0,
          rel: 0,
          showinfo: 0,
          modestbranding: 1,
          loop: 1,
          playlist: videoId, 
          cc_load_policy: 3, 
          cc_lang_pref: 'ko', 
          disablekb: 1, 
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    };

    const autoPlayTimer = setTimeout(() => {
      if (playerRef.current && playerReadyRef.current) {
        try {
          playerRef.current.playVideo();
        } catch (error) {
          console.error("자동 재생 실패:", error);
        }
      }
    }, 1000);

    instructionsTimerRef.current = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);

    return () => {
      if (instructionsTimerRef.current) {
        clearTimeout(instructionsTimerRef.current);
      }
      
      if (autoPlayTimer) {
        clearTimeout(autoPlayTimer);
      }
      
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      
      delete window.onYouTubeIframeAPIReady;
    };
  }, [videoId]);

  const onPlayerReady = (event) => {
    playerReadyRef.current = true;
    try {
      event.target.playVideo();
    } catch (error) {
      console.error("재생 시작 실패:", error);
    }
  };

  const onPlayerStateChange = (event) => {
    if (event.data === 0) { 
      try {
        event.target.playVideo();
      } catch (error) {
        console.error("반복 재생 실패:", error);
      }
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
      
      setShowInstructions(true);
      clearTimeout(instructionsTimerRef.current);
      instructionsTimerRef.current = setTimeout(() => {
        setShowInstructions(false);
      }, 3000);
    }
  };

  return (
    <div className={styles.youtubePlayerContainer}>
      <div className={styles.playerWrapper}>
        <div id="youtube-player" className={styles.player}></div>
        
        <button 
          className={styles.muteButton} 
          onClick={toggleMute}
          aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>
        
        {showInstructions && (
          <div className={styles.instructions}>
            <p>{isMuted ? "버튼을 클릭하여 소리를 켤 수 있습니다" : "소리가 켜져 있습니다"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
