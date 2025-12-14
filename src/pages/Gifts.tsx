import { useEffect, useState } from 'react';
import { Gift as GiftIcon, Package, CheckCircle, Truck, Wrench } from 'lucide-react';
import { api, Gift } from '@/services/api';
import StatusBadge from '@/components/StatusBadge';

const Gifts = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGifts = async () => {
      setIsLoading(true);
      const data = await api.getGifts();
      setGifts(data);
      setIsLoading(false);
    };
    fetchGifts();
  }, []);

  const getProgressPercentage = (status: Gift['status']): number => {
    const statusProgress = {
      manufacturing: 25,
      wrapping: 50,
      ready: 75,
      delivered: 100,
    };
    return statusProgress[status];
  };

  const statusCounts = {
    manufacturing: gifts.filter(g => g.status === 'manufacturing').length,
    wrapping: gifts.filter(g => g.status === 'wrapping').length,
    ready: gifts.filter(g => g.status === 'ready').length,
    delivered: gifts.filter(g => g.status === 'delivered').length,
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton h-24" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
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
          <GiftIcon className="h-8 w-8 text-primary animate-bounce-gentle" />
          Gift Tracker
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor gift production and delivery status
        </p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl bg-accent/10 border border-accent/20 p-4 card-hover animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Wrench className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">{statusCounts.manufacturing}</p>
              <p className="text-sm text-accent/80">Manufacturing</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl bg-primary/10 border border-primary/20 p-4 card-hover animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{statusCounts.wrapping}</p>
              <p className="text-sm text-primary/80">Wrapping</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl bg-nice/10 border border-nice/20 p-4 card-hover animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-nice/20 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-nice" />
            </div>
            <div>
              <p className="text-2xl font-bold text-nice">{statusCounts.ready}</p>
              <p className="text-sm text-nice/80">Ready</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl bg-secondary/20 border border-secondary/30 p-4 card-hover animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-secondary/30 flex items-center justify-center">
              <Truck className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">{statusCounts.delivered}</p>
              <p className="text-sm text-secondary/80">Delivered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gift Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {gifts.map((gift, index) => (
          <div 
            key={gift.id} 
            className="rounded-2xl bg-card border border-border p-6 card-hover animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-gold flex items-center justify-center text-2xl">
                  🎁
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{gift.giftName}</h3>
                  <p className="text-sm text-muted-foreground">For {gift.childName}</p>
                </div>
              </div>
              <StatusBadge status={gift.status} />
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{getProgressPercentage(gift.status)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 progress-animate"
                  style={{ 
                    width: `${getProgressPercentage(gift.status)}%`,
                    background: 'var(--gradient-christmas)'
                  }}
                />
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-between mt-4 text-xs">
              {['Manufacturing', 'Wrapping', 'Ready', 'Delivered'].map((step, i) => {
                const stepProgress = (i + 1) * 25;
                const currentProgress = getProgressPercentage(gift.status);
                const isCompleted = currentProgress >= stepProgress;
                const isCurrent = currentProgress >= stepProgress - 25 && currentProgress < stepProgress;
                
                return (
                  <div 
                    key={step}
                    className={`flex flex-col items-center gap-1 ${
                      isCompleted ? 'text-nice' : isCurrent ? 'text-accent' : 'text-muted-foreground'
                    }`}
                  >
                    <div className={`h-3 w-3 rounded-full ${
                      isCompleted ? 'bg-nice' : isCurrent ? 'bg-accent animate-pulse' : 'bg-muted'
                    }`} />
                    <span className="hidden md:block">{step}</span>
                  </div>
                );
              })}
            </div>

            {/* Priority Badge */}
            <div className="mt-4 flex items-center justify-between">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                gift.priority === 'high' 
                  ? 'bg-primary/10 text-primary' 
                  : gift.priority === 'medium'
                  ? 'bg-accent/10 text-accent'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {gift.priority.toUpperCase()} Priority
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gifts;
