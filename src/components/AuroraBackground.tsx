import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export function AuroraBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generatedStars: Star[] = [];
    for (let i = 0; i < 50; i++) {
      generatedStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2,
      });
    }
    setStars(generatedStars);
  }, []);

  return (
    <>
      {/* Aurora gradient background */}
      <div className="aurora-bg" />
      
      {/* Floating orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="orb w-96 h-96 bg-primary/20 -top-48 -left-48"
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="orb w-80 h-80 bg-secondary/15 top-1/3 -right-40"
          style={{ animationDelay: '3s' }}
        />
        <div 
          className="orb w-64 h-64 bg-nice/10 bottom-20 left-1/4"
          style={{ animationDelay: '6s' }}
        />
        <div 
          className="orb w-48 h-48 bg-accent/10 top-1/2 left-1/2"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Stars */}
      <div className="stars">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
