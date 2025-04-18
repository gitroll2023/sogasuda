'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './MusicPlayer.module.css';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const videoRef = useRef(null);
  const instructionsTimerRef = useRef(null);

  // 노래 목록 정의
  const songList = [
    { 
      file: "/music/ost/디어(d.ear) - 밤 산책 (폭싹 속았수다 OST) [가사 Lyrics].mp4", 
      title: "폭싹 속았수다 OST - 디어_밤산책" 
    },
    { 
      file: "/music/ost/홍이삭 - 내사랑 내곁에 (폭싹 속았수다 OST) [가사 Lyrics].mp4", 
      title: "폭싹 속았수다 OST - 홍이삭_내사랑 내곁에" 
    },
    { 
      file: "/music/ost/최백호 - 희망의 나라로 (폭싹 속았수다 OST) [가사 Lyrics].mp4", 
      title: "폭싹 속았수다 OST - 최백호_희망의 나라로" 
    },
    { 
      file: "/music/ost/곽진언 - 이름 (폭싹 속았수다 OST) [가사 Lyrics].mp4", 
      title: "폭싹 속았수다 OST - 곽진언_이름" 
    },
    { 
      file: "/music/ost/추다혜 - 생존가 (폭싹 속았수다 OST) [가사 Lyrics].mp4", 
      title: "폭싹 속았수다 OST - 추다혜_청춘가" 
    },
    { 
      file: "/music/ost/안은경 - 너영나영 (폭싹 속았수다 OST) [가사 Lyrics].mp4", 
      title: "폭싹 속았수다 OST - 안은경_너영나영" 
    },
    { 
      file: "/music/ost/황소윤(새소년) - 활활 (폭싹 속았수다 OST) [가사 Lyrics].mp4", 
      title: "폭싹 속았수다 OST - 황소윤_활활" 
    }
  ];

  // 비디오 초기화 및 이벤트 리스너 설정
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // 이벤트 리스너 설정
    const handleEnded = () => {
      console.log("비디오 재생 완료, 다음 곡으로 이동");
      const newIndex = (currentSongIndex + 1) % songList.length;
      setCurrentSongIndex(newIndex);
    };

    const handlePlay = () => {
      console.log("비디오 재생 시작");
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log("비디오 일시 정지");
      setIsPlaying(false);
    };

    const handleError = (e) => {
      console.error("비디오 재생 오류:", e);
    };

    // 이벤트 리스너 등록
    videoElement.addEventListener('ended', handleEnded);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('error', handleError);

    // 비디오 소스 설정
    videoElement.src = songList[currentSongIndex].file;
    
    // 음소거 상태 설정
    videoElement.muted = isMuted;
    
    // 자동 재생
    const playPromise = videoElement.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error("자동 재생 실패:", error);
      });
    }

    // 안내 메시지 타이머 설정
    instructionsTimerRef.current = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);

    // 컴포넌트 언마운트 시 정리
    return () => {
      videoElement.removeEventListener('ended', handleEnded);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('error', handleError);
      
      if (instructionsTimerRef.current) {
        clearTimeout(instructionsTimerRef.current);
      }
    };
  }, [currentSongIndex, isMuted]);

  // 음소거 토글
  const toggleMute = () => {
    if (!videoRef.current) return;
    
    try {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      
      setShowInstructions(true);
      clearTimeout(instructionsTimerRef.current);
      instructionsTimerRef.current = setTimeout(() => {
        setShowInstructions(false);
      }, 3000);
    } catch (error) {
      console.error("음소거 토글 실패:", error);
    }
  };

  // 재생/일시정지 토글
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    try {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error("재생 실패:", error);
        });
      }
    } catch (error) {
      console.error("재생 토글 실패:", error);
    }
  };

  // 이전 노래 재생
  const playPreviousSong = () => {
    const newIndex = currentSongIndex === 0 ? songList.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(newIndex);
  };

  // 다음 노래 재생
  const playNextSong = () => {
    const newIndex = (currentSongIndex + 1) % songList.length;
    setCurrentSongIndex(newIndex);
  };

  return (
    <div className={styles.youtubePlayerContainer}>
      <div className={styles.playerWrapper}>
        <video 
          ref={videoRef}
          className={styles.player}
          playsInline
          controlsList="nodownload"
        />
        
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
        
        <button 
          className={styles.playButton} 
          onClick={togglePlay}
          aria-label={isPlaying ? "일시정지" : "재생"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
        
        {showInstructions && (
          <div className={styles.instructions}>
            <p>{isMuted ? "버튼을 클릭하여 소리를 켤 수 있습니다" : "소리가 켜져 있습니다"}</p>
          </div>
        )}
      </div>

      <div className={styles.playlistContainer}>
        <div className={styles.playlistControls}>
          <button 
            className={styles.controlButton} 
            onClick={playPreviousSong}
            aria-label="이전 노래"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>
          <button 
            className={styles.controlButton} 
            onClick={playNextSong}
            aria-label="다음 노래"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>
        <div className={styles.playlist}>
          {songList.map((song, index) => (
            <div 
              key={index} 
              className={`${styles.playlistItem} ${index === currentSongIndex ? styles.active : ''}`}
              onClick={() => setCurrentSongIndex(index)}
            >
              <span className={styles.songNumber}>{index + 1}</span>
              <span className={styles.songTitle}>{song.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
