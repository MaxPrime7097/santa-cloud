import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: 'default' | 'christmas' | 'forest' | 'gold';
  delay?: number;
}

const StatsCard = ({ title, value, icon: Icon, trend, variant = 'default', delay = 0 }: StatsCardProps) => {
  const variants = {
    default: 'bg-card border-border',
    christmas: 'bg-gradient-christmas text-primary-foreground border-transparent',
    forest: 'bg-gradient-forest text-secondary-foreground border-transparent',
    gold: 'bg-gradient-gold text-accent-foreground border-transparent',
  };

  const iconVariants = {
    default: 'bg-primary/10 text-primary',
    christmas: 'bg-primary-foreground/20 text-primary-foreground',
    forest: 'bg-secondary-foreground/20 text-secondary-foreground',
    gold: 'bg-accent-foreground/20 text-accent-foreground',
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6 card-hover animate-fade-in",
        variants[variant]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Decorative element */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-current opacity-5" />
      
      <div className="flex items-start justify-between">
        <div>
          <p className={cn(
            "text-sm font-medium",
            variant === 'default' ? 'text-muted-foreground' : 'opacity-80'
          )}>
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight">
            {value}
          </p>
          {trend && (
            <p className={cn(
              "mt-1 text-xs font-medium",
              trend.positive ? 'text-nice' : 'text-naughty',
              variant !== 'default' && 'opacity-90'
            )}>
              {trend.positive ? '↑' : '↓'} {trend.value}% from last week
            </p>
          )}
        </div>
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl",
          iconVariants[variant]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
