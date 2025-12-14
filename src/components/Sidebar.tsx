import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Gift, 
  CircleDot,
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Children', href: '/children', icon: Users },
  { name: 'Gifts', href: '/gifts', icon: Gift },
  { name: 'Reindeers', href: '/reindeers', icon: CircleDot },
  { name: 'Letters (AI)', href: '/letters', icon: Mail },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <div className={cn(
          "flex items-center gap-2 transition-opacity duration-300",
          collapsed ? "opacity-0 w-0" : "opacity-100"
        )}>
          <span className="text-3xl animate-wiggle">🎅</span>
          <span className="font-display text-xl font-bold text-sidebar-foreground">
            SantaCloud
          </span>
        </div>
        {collapsed && (
          <span className="text-2xl mx-auto animate-wiggle">🎅</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0",
                isActive && "animate-bounce-gentle"
              )} />
              <span className={cn(
                "transition-all duration-300",
                collapsed ? "hidden" : "block"
              )}>
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Footer */}
      <div className={cn(
        "border-t border-sidebar-border p-4",
        collapsed && "flex justify-center"
      )}>
        <div className={cn(
          "flex items-center gap-2 text-sm text-sidebar-foreground/70",
          collapsed && "hidden"
        )}>
          <span className="sparkle">✨</span>
          <span>Magic Level: 100%</span>
        </div>
        {collapsed && <span className="sparkle text-xl">✨</span>}
      </div>
    </aside>
  );
};

export default Sidebar;
