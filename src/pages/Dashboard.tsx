import { useEffect, useState } from 'react';
import { Users, Gift, CircleDot, Mail, TrendingUp, Sparkles } from 'lucide-react';
import { api, DashboardStats } from '@/services/api';
import StatsCard from '@/components/StatsCard';
import ProgressChart from '@/components/ProgressChart';

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [giftProgress, setGiftProgress] = useState<{ label: string; value: number; color: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [dashStats, progress] = await Promise.all([
        api.getDashboardStats(),
        api.getGiftProgressStats(),
      ]);
      setStats(dashStats);
      setGiftProgress(progress);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-8 w-48" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-accent animate-sparkle" />
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, Santa! Here's your Christmas overview.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-nice/10 border border-nice/20">
          <TrendingUp className="h-4 w-4 text-nice" />
          <span className="text-sm font-medium text-nice">On track for Christmas!</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Children"
          value={stats.totalChildren.toLocaleString()}
          icon={Users}
          trend={{ value: 12, positive: true }}
          variant="christmas"
          delay={0}
        />
        <StatsCard
          title="Nice Children"
          value={stats.niceChildren.toLocaleString()}
          icon={Users}
          trend={{ value: 8, positive: true }}
          variant="forest"
          delay={100}
        />
        <StatsCard
          title="Gifts Ready"
          value={stats.giftsReady.toLocaleString()}
          icon={Gift}
          trend={{ value: 15, positive: true }}
          variant="gold"
          delay={200}
        />
        <StatsCard
          title="Active Reindeers"
          value={stats.activeReindeers}
          icon={CircleDot}
          variant="default"
          delay={300}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ProgressChart
          title="Gift Production Progress"
          data={giftProgress}
        />
        
        {/* Quick Stats */}
        <div className="rounded-2xl bg-card border border-border p-6 card-hover animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-naughty/10 flex items-center justify-center">
                  <span className="text-lg">😈</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Naughty List</p>
                  <p className="text-sm text-muted-foreground">Need behavior improvement</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-naughty">{stats.naughtyChildren}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-lg">🔧</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Gifts In Progress</p>
                  <p className="text-sm text-muted-foreground">Being manufactured or wrapped</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-accent">{stats.giftsInProgress}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Unread Letters</p>
                  <p className="text-sm text-muted-foreground">Waiting for magic reply</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-primary">{stats.unreadLetters}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="rounded-2xl bg-gradient-christmas p-6 text-primary-foreground card-hover animate-fade-in" style={{ animationDelay: '500ms' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-display font-bold">🎄 Christmas Countdown</h3>
            <p className="text-primary-foreground/80 mt-1">The magic night is approaching!</p>
          </div>
          <div className="flex gap-4">
            {['Days', 'Hours', 'Minutes'].map((label, i) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold bg-primary-foreground/20 rounded-xl px-4 py-2">
                  {i === 0 ? '11' : i === 1 ? '08' : '42'}
                </div>
                <p className="text-xs mt-1 opacity-80">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
