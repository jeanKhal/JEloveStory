import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface IntersectionObserverProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  animationClass?: string;
  delay?: number;
  once?: boolean;
}

const IntersectionObserver: React.FC<IntersectionObserverProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '0px',
  className = '',
  animationClass = 'animate-fade-in',
  delay = 0,
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (!hasAnimated || !once) {
            setTimeout(() => {
              setIsVisible(true);
              if (once) {
                setHasAnimated(true);
              }
            }, delay);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, delay, once, hasAnimated]);

  return (
    <div
      ref={elementRef}
      className={`${className} ${isVisible ? animationClass : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default IntersectionObserver; 