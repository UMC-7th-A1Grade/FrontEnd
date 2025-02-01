import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [time, setTime] = useState(60 * 60); 
  const [start, setStart] = useState(false); 

  useEffect(() => {
    if (!start) return; // start가 false이면 타이머 시작하지 않도록 함

    const countdown = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, [start]);

  const startTimer = () => setStart(true);

  return (
    <TimerContext.Provider value={{ time, start, startTimer }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext);
}
