import { useEffect, useState } from 'react';
import { MapPin, Battery, Activity } from 'lucide-react';
import { api, Reindeer } from '@/services/api';
import StatusBadge from '@/components/StatusBadge';

const Reindeers = () => {
  const [reindeers, setReindeers] = useState<Reindeer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReindeers = async () => {
      setIsLoading(true);
      const data = await api.getReindeers();
      setReindeers(data);
      setIsLoading(false);
    };
    fetchReindeers();
  }, []);

  const statusCounts = {
    resting: reindeers.filter(r => r.status === 'resting').length,
    training: reindeers.filter(r => r.status === 'training').length,
    flying: reindeers.filter(r => r.status === 'flying').length,
  };

  const reindeerEmojis: { [key: string]: string } = {
    Rudolph: '🔴',
    Dasher: '⚡',
    Dancer: '💃',
    Prancer: '🎪',
    Vixen: '🦊',
    Comet: '☄️',
    Cupid: '💕',
    Donner: '🌩️',
    Blitzen: '⚡',
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48" />
        <div className="skeleton h-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="skeleton h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-2">
          <span className="text-4xl animate-bounce-gentle">🦌</span>
          Reindeer Tracker
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor reindeer status and locations in real-time
        </p>
      </div>

      {/* Map Placeholder */}
      <div className="relative rounded-2xl bg-gradient-forest overflow-hidden h-64 card-hover animate-fade-in">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-secondary-foreground">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold">North Pole Operations Map</h3>
            <p className="text-secondary-foreground/80 mt-1">Real-time tracking enabled</p>
          </div>
        </div>
        
        {/* Animated dots representing flying reindeers */}
        {reindeers.filter(r => r.status === 'flying').map((reindeer, i) => (
          <div
            key={reindeer.id}
            className="absolute h-4 w-4 rounded-full bg-accent animate-ping"
            style={{
              top: `${30 + i * 15}%`,
              left: `${40 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-muted/50 border border-border p-4 text-center card-hover">
          <p className="text-2xl font-bold text-foreground">{statusCounts.resting}</p>
          <p className="text-sm text-muted-foreground">😴 Resting</p>
        </div>
        <div className="rounded-xl bg-accent/10 border border-accent/20 p-4 text-center card-hover">
          <p className="text-2xl font-bold text-accent">{statusCounts.training}</p>
          <p className="text-sm text-accent/80">🏃 Training</p>
        </div>
        <div className="rounded-xl bg-nice/10 border border-nice/20 p-4 text-center card-hover">
          <p className="text-2xl font-bold text-nice">{statusCounts.flying}</p>
          <p className="text-sm text-nice/80">✈️ Flying</p>
        </div>
      </div>

      {/* Reindeer Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reindeers.map((reindeer, index) => (
          <div 
            key={reindeer.id} 
            className={`rounded-2xl bg-card border border-border p-6 card-hover animate-fade-in ${
              reindeer.name === 'Rudolph' ? 'ring-2 ring-primary' : ''
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-3xl ${
                  reindeer.name === 'Rudolph' 
                    ? 'bg-gradient-christmas' 
                    : 'bg-gradient-forest'
                }`}>
                  {reindeerEmojis[reindeer.name] || '🦌'}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    {reindeer.name}
                    {reindeer.name === 'Rudolph' && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Leader</span>
                    )}
                  </h3>
                  <StatusBadge status={reindeer.status} />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <MapPin className="h-4 w-4" />
              <span>{reindeer.location}</span>
            </div>

            {/* Energy Level */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Energy Level</span>
                </div>
                <span className={`font-semibold ${
                  reindeer.energyLevel >= 80 ? 'text-nice' : 
                  reindeer.energyLevel >= 50 ? 'text-accent' : 'text-naughty'
                }`}>
                  {reindeer.energyLevel}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 progress-animate"
                  style={{ 
                    width: `${reindeer.energyLevel}%`,
                    backgroundColor: reindeer.energyLevel >= 80 
                      ? 'hsl(var(--nice))' 
                      : reindeer.energyLevel >= 50 
                      ? 'hsl(var(--accent))' 
                      : 'hsl(var(--naughty))'
                  }}
                />
              </div>
            </div>

            {/* Activity Indicator */}
            {reindeer.status === 'flying' && (
              <div className="mt-4 flex items-center gap-2 text-nice">
                <Activity className="h-4 w-4 animate-pulse" />
                <span className="text-sm font-medium">Currently Active</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reindeers;
