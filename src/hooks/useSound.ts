import { useState, useCallback } from 'react';

type SoundType = 'flip' | 'match' | 'win';

export const useSound = () => {
  const [isMuted, setIsMuted] = useState(() => {
    const stored = localStorage.getItem('memory-game-muted');
    return stored ? JSON.parse(stored) : false;
  });

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (isMuted) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }, [isMuted]);

  const playSound = useCallback((soundType: SoundType) => {
    switch (soundType) {
      case 'flip':
        playTone(400, 0.1);
        break;
      case 'match':
        playTone(523.25, 0.15); // C5
        setTimeout(() => playTone(659.25, 0.15), 100); // E5
        break;
      case 'win':
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          setTimeout(() => playTone(freq, 0.3), i * 150);
        });
        break;
    }
  }, [playTone]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev: boolean) => {
      const newValue = !prev;
      localStorage.setItem('memory-game-muted', JSON.stringify(newValue));
      return newValue;
    });
  }, []);

  return { isMuted, toggleMute, playSound };
};