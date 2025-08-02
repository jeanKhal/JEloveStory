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

  const countdownItems = useMemo(() => [
    { value: timeLeft.days, label: 'Jours', icon: '📅' },
    { value: timeLeft.hours, label: 'Heures', icon: '⏰' },
    { value: timeLeft.minutes, label: 'Minutes', icon: '⏱️' },
    { value: timeLeft.seconds, label: 'Secondes', icon: '⚡' }
  ], [timeLeft]);

  const isComplete = useMemo(() => 
    timeLeft.days === 0 && timeLeft.hours === 0 && 
    timeLeft.minutes === 0 && timeLeft.seconds === 0, 
    [timeLeft]
  );

  return (
    <div className={`countdown-timer ${className} ${isVisible ? 'animate-fade-in' : ''}`}>
      <div className="countdown-grid">
        {countdownItems.map((item, index) => (
          <div 
            key={item.label}
            className="countdown-item"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s ease-out ${index * 0.1}s`
            }}
          >
            <div className="countdown-icon">{item.icon}</div>
            <div className="countdown-number">
              {formatNumber(item.value)}
            </div>
            <div className="countdown-label">{item.label}</div>
          </div>
        ))}
      </div>
      
      {isComplete && (
        <div className="countdown-complete">
          <div className="complete-message">
            <span className="complete-icon">🎉</span>
            <h3>Le Grand Jour est arrivé !</h3>
            <p>Joel & Eunice se marient aujourd'hui !</p>
          </div>
        </div>
      )}
    </div>
  );
});

CountdownTimer.displayName = 'CountdownTimer';

export default CountdownTimer; 