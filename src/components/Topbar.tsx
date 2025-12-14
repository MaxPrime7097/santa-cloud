import { Bell, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '@/services/api';

const Topbar = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      const stats = await api.getDashboardStats();
      setUnreadCount(stats.unreadLetters);
    };
    fetchStats();
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-card/80 backdrop-blur-lg px-6 border-b border-border">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search children, gifts, reindeers..."
            className="w-full rounded-xl bg-muted/50 py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Greeting */}
        <span className="hidden md:block text-sm font-medium text-foreground">
          Ho Ho Ho, Santa! 🎄
        </span>

        {/* Notifications */}
        <button 
          className="relative p-2 rounded-xl hover:bg-muted transition-colors"
          onClick={() => setShowNotification(!showNotification)}
        >
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground animate-bounce-gentle">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notification Dropdown */}
        {showNotification && (
          <div className="absolute right-6 top-14 w-72 rounded-2xl bg-card shadow-lg border border-border p-4 animate-scale-in">
            <h3 className="font-semibold text-foreground mb-2">Notifications</h3>
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-muted/50 text-sm">
                <span className="text-accent">📬</span> {unreadCount} new letters awaiting reply
              </div>
              <div className="p-2 rounded-lg bg-muted/50 text-sm">
                <span>🎁</span> 2 gifts ready for delivery
              </div>
              <div className="p-2 rounded-lg bg-muted/50 text-sm">
                <span>🦌</span> Vixen completed training
              </div>
            </div>
          </div>
        )}

        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-christmas flex items-center justify-center text-xl shadow-lg">
            🎅
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
