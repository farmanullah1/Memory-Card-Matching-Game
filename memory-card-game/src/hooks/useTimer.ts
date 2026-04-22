import { useState, useEffect, useCallback, useRef } from 'react';

export const useTimer = (isRunning: boolean) => {
  const [time, setTime] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - time * 1000;
      
      const tick = () => {
        setTime((Date.now() - startTime) / 1000);
        timerRef.current = requestAnimationFrame(tick);
      };
      
      timerRef.current = requestAnimationFrame(tick);
    } else {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
      }
    };
  }, [isRunning]);

  const resetTimer = useCallback(() => {
    setTime(0);
  }, []);

  return { time, resetTimer };
};
