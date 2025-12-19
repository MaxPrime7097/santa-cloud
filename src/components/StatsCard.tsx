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
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  delay?: number;
}

const StatsCard = ({ title, value, icon: Icon, trend, variant = 'default', delay = 0 }: StatsCardProps) => {
  const variants = {
    default: 'bg-card border-border',
    primary: 'bg-primary text-primary-foreground border-primary',
    secondary: 'bg-secondary text-secondary-foreground border-secondary',
    accent: 'bg-accent/10 border-accent/20',
  };

  const iconVariants = {
    default: 'text-muted-foreground',
    primary: 'text-primary-foreground/80',
    secondary: 'text-secondary-foreground/80',
    accent: 'text-accent',
  };

  const isColoredVariant = variant !== 'default' && variant !== 'accent';

  return (
    <div 
      className={cn(
        "relative rounded-xl border p-5 animate-fade-in",
        variants[variant]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={cn(
            "text-xs font-medium uppercase tracking-wide",
            isColoredVariant ? 'opacity-80' : 'text-muted-foreground'
          )}>
            {title}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">
            {value}
          </p>
          {trend && (
            <p className={cn(
              "mt-1 text-xs font-medium",
              trend.positive ? 'text-nice' : 'text-naughty',
              isColoredVariant && 'opacity-90'
            )}>
              {trend.positive ? '↑' : '↓'} {trend.value}%
            </p>
          )}
        </div>
        <Icon className={cn("h-5 w-5", iconVariants[variant])} />
      </div>
    </div>
  );
};

export default StatsCard;
