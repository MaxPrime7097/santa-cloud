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
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between bg-background/95 backdrop-blur-sm px-6 border-b border-border">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg bg-muted py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <span className="hidden md:block text-sm text-muted-foreground">
          Welcome back, Santa
        </span>

        {/* Notifications */}
        <button 
          className="relative p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setShowNotification(!showNotification)}
        >
          <Bell className="h-4 w-4 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notification Dropdown */}
        {showNotification && (
          <div className="absolute right-6 top-12 w-64 rounded-lg bg-card shadow-lg border border-border p-3 animate-scale-in">
            <h3 className="font-medium text-sm text-foreground mb-2">Notifications</h3>
            <div className="space-y-1.5">
              <div className="p-2 rounded-md bg-muted text-xs text-muted-foreground">
                {unreadCount} new letters awaiting reply
              </div>
              <div className="p-2 rounded-md bg-muted text-xs text-muted-foreground">
                2 gifts ready for delivery
              </div>
            </div>
          </div>
        )}

        {/* Avatar */}
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-sm text-primary-foreground font-medium">
          S
        </div>
      </div>
    </header>
  );
};

export default Topbar;
