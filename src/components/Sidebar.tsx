import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Gift, 
  CircleDot,
  Mail,
  ChevronLeft,
  ChevronRight,
  Snowflake
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Children', href: '/children', icon: Users },
  { name: 'Gifts', href: '/gifts', icon: Gift },
  { name: 'Reindeers', href: '/reindeers', icon: CircleDot },
  { name: 'Letters', href: '/letters', icon: Mail },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 ease-out border-r border-sidebar-border",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-sidebar-border">
        <div className={cn(
          "flex items-center gap-2 transition-opacity duration-200",
          collapsed ? "opacity-0 w-0" : "opacity-100"
        )}>
          <Snowflake className="h-5 w-5 text-sidebar-foreground" />
          <span className="font-display text-base font-semibold text-sidebar-foreground">
            SantaCloud
          </span>
        </div>
        {collapsed && (
          <Snowflake className="h-5 w-5 text-sidebar-foreground mx-auto" />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-2 py-3">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className={cn(
                "transition-all duration-200",
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
        className="absolute -right-3 top-16 flex h-6 w-6 items-center justify-center rounded-full bg-card border border-border text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>

      {/* Footer */}
      <div className={cn(
        "border-t border-sidebar-border p-3",
        collapsed && "flex justify-center"
      )}>
        <div className={cn(
          "flex items-center gap-2 text-xs text-sidebar-foreground/50",
          collapsed && "hidden"
        )}>
          <span>✨</span>
          <span>Ready for Christmas</span>
        </div>
        {collapsed && <span className="text-sm">✨</span>}
      </div>
    </aside>
  );
};

export default Sidebar;
