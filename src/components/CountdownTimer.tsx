import React, { useState, useEffect, useMemo } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = React.memo(({ targetDate, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation d'entrée
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    };

    // Calcul initial
    setTimeLeft(calculateTimeLeft());

    // Mise à jour toutes les secondes
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = useMemo(() => (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  }, []);

  const isComplete = useMemo(() => 
    timeLeft.days === 0 && timeLeft.hours === 0 && 
    timeLeft.minutes === 0 && timeLeft.seconds === 0, 
    [timeLeft]
  );

  return (
    <div className={`countdown-timer-modern ${className} ${isVisible ? 'animate-fade-in' : ''}`}>
      {isComplete ? (
        <div className="countdown-complete">
          <div className="complete-message">
            <span className="complete-icon">🎉</span>
            <h3>Le Grand Jour est arrivé !</h3>
            <p>Joel & Eunice se marient aujourd&apos;hui !</p>
          </div>
        </div>
      ) : (
        <div className="countdown-line">
          <div className="countdown-segment">
            <span className="countdown-number">{formatNumber(timeLeft.days)}</span>
            <span className="countdown-label">J</span>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-segment">
            <span className="countdown-number">{formatNumber(timeLeft.hours)}</span>
            <span className="countdown-label">H</span>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-segment">
            <span className="countdown-number">{formatNumber(timeLeft.minutes)}</span>
            <span className="countdown-label">M</span>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-segment">
            <span className="countdown-number pulse">{formatNumber(timeLeft.seconds)}</span>
            <span className="countdown-label">S</span>
          </div>
        </div>
      )}
    </div>
  );
});

CountdownTimer.displayName = 'CountdownTimer';

export default CountdownTimer; 