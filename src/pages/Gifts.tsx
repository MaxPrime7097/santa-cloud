import { useEffect, useState } from 'react';
import { Gift as GiftIcon, Package, CheckCircle, Truck, Wrench } from 'lucide-react';
import { api, Gift } from '@/services/api';
import PageTransition from '@/components/PageTransition';
import { cn } from '@/lib/utils';

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

  const statusConfig = {
    manufacturing: { icon: Wrench, color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20' },
    wrapping: { icon: Package, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
    ready: { icon: CheckCircle, color: 'text-nice', bg: 'bg-nice/10', border: 'border-nice/20' },
    delivered: { icon: Truck, color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20' },
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
        <div className="skeleton h-6 w-32" />
        <div className="grid gap-2 md:gap-3 grid-cols-2 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton h-16 rounded-lg" />
          ))}
        </div>
        <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton h-36 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-lg md:text-xl font-semibold text-foreground">Gift Tracker</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            {gifts.length} gifts in production
          </p>
        </div>

        {/* Status Summary - 2x2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {Object.entries(statusConfig).map(([status, config], index) => {
            const Icon = config.icon;
            const count = statusCounts[status as keyof typeof statusCounts];
            return (
              <div 
                key={status}
                className={cn(
                  "rounded-lg p-3 md:p-4 border animate-fade-in hover-lift cursor-pointer",
                  config.bg,
                  config.border
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-2">
                  <Icon className={cn("h-4 w-4", config.color)} />
                  <span className={cn("text-lg md:text-xl font-semibold", config.color)}>{count}</span>
                </div>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-1 capitalize">{status}</p>
              </div>
            );
          })}
        </div>

        {/* Gift Cards - Single column on mobile */}
        <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {gifts.map((gift, index) => {
            const config = statusConfig[gift.status];
            return (
              <div 
                key={gift.id} 
                className="rounded-xl bg-card border border-border p-4 animate-fade-in hover-lift"
                style={{ animationDelay: `${(index + 4) * 40}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center text-base">
                      🎁
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{gift.giftName}</h3>
                      <p className="text-xs text-muted-foreground">For {gift.childName}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[10px] font-medium px-1.5 py-0.5 rounded uppercase",
                    config.bg,
                    config.color
                  )}>
                    {gift.status}
                  </span>
                </div>

                {/* Progress */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{getProgressPercentage(gift.status)}%</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700 progress-animate"
                      style={{ 
                        width: `${getProgressPercentage(gift.status)}%`,
                        backgroundColor: 'hsl(var(--primary))'
                      }}
                    />
                  </div>
                </div>

                {/* Steps */}
                <div className="flex justify-between mt-3 pt-3 border-t border-border">
                  {['Manu', 'Wrap', 'Ready', 'Sent'].map((step, i) => {
                    const stepProgress = (i + 1) * 25;
                    const currentProgress = getProgressPercentage(gift.status);
                    const isCompleted = currentProgress >= stepProgress;
                    
                    return (
                      <div 
                        key={step}
                        className="flex flex-col items-center gap-1"
                      >
                        <div className={cn(
                          "h-2 w-2 rounded-full transition-all duration-300",
                          isCompleted ? 'bg-nice scale-110' : 'bg-muted'
                        )} />
                        <span className="text-[9px] text-muted-foreground">{step}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Priority */}
                <div className="mt-3">
                  <span className={cn(
                    "text-[10px] font-medium px-1.5 py-0.5 rounded",
                    gift.priority === 'high' 
                      ? 'bg-primary/10 text-primary' 
                      : gift.priority === 'medium'
                      ? 'bg-accent/10 text-accent'
                      : 'bg-muted text-muted-foreground'
                  )}>
                    {gift.priority} priority
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
};

export default Gifts;
