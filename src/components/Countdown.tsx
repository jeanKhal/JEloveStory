import React, { useState, useEffect } from 'react';
import './Countdown.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2025-08-29T14:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown">
      <div className="countdown-item">
        <div className="countdown-number">{timeLeft.days}</div>
        <div className="countdown-label">Jours</div>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-item">
        <div className="countdown-number">{timeLeft.hours.toString().padStart(2, '0')}</div>
        <div className="countdown-label">Heures</div>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-item">
        <div className="countdown-number">{timeLeft.minutes.toString().padStart(2, '0')}</div>
        <div className="countdown-label">Minutes</div>
      </div>
      <div className="countdown-separator">:</div>
      <div className="countdown-item">
        <div className="countdown-number">{timeLeft.seconds.toString().padStart(2, '0')}</div>
        <div className="countdown-label">Secondes</div>
      </div>
    </div>
  );
};

export default Countdown; 