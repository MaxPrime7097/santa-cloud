import { useEffect, useState } from 'react';
import { Search, Plus, Users } from 'lucide-react';
import { api, Child } from '@/services/api';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import { cn } from '@/lib/utils';

const Children = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'nice' | 'naughty'>('all');

  useEffect(() => {
    const fetchChildren = async () => {
      setIsLoading(true);
      const data = searchQuery 
        ? await api.searchChildren(searchQuery)
        : await api.getChildren();
      setChildren(data);
      setIsLoading(false);
    };
    
    const debounce = setTimeout(fetchChildren, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const filteredChildren = filter === 'all' 
    ? children 
    : children.filter(c => c.status === filter);

  const niceCount = children.filter(c => c.status === 'nice').length;
  const naughtyCount = children.filter(c => c.status === 'naughty').length;

  // Mobile card view
  const MobileChildCard = ({ child, index }: { child: Child; index: number }) => (
    <div 
      className="rounded-xl bg-card border border-border p-4 animate-fade-in hover-lift"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
            {child.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">{child.name}</p>
            <p className="text-xs text-muted-foreground">{child.country} • Age {child.age}</p>
          </div>
        </div>
        <span className={cn(
          "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
          child.status === 'nice' 
            ? 'bg-nice/10 text-nice' 
            : 'bg-naughty/10 text-naughty'
        )}>
          {child.status === 'nice' ? 'Nice' : 'Naughty'}
        </span>
      </div>
      
      {/* Score Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-muted-foreground">Nice Score</span>
          <span className="font-medium">{child.niceScore}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${child.niceScore}%`,
              backgroundColor: child.niceScore >= 70 ? 'hsl(var(--nice))' : 'hsl(var(--naughty))'
            }}
          />
        </div>
      </div>
      
      {/* Wishlist */}
      <div className="flex flex-wrap gap-1">
        {child.wishlist.slice(0, 3).map((item, i) => (
          <span 
            key={i}
            className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground"
          >
            {item}
          </span>
        ))}
        {child.wishlist.length > 3 && (
          <span className="text-xs text-muted-foreground px-2 py-1">+{child.wishlist.length - 3}</span>
        )}
      </div>
    </div>
  );

  const columns = [
    {
      header: 'Name',
      accessor: (row: Child) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.country}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Age',
      accessor: 'age' as keyof Child,
      className: 'text-center text-sm',
    },
    {
      header: 'Status',
      accessor: (row: Child) => (
        <span className={cn(
          "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
          row.status === 'nice' 
            ? 'bg-nice/10 text-nice' 
            : 'bg-naughty/10 text-naughty'
        )}>
          {row.status === 'nice' ? 'Nice' : 'Naughty'}
        </span>
      ),
    },
    {
      header: 'Score',
      accessor: (row: Child) => (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${row.niceScore}%`,
                backgroundColor: row.niceScore >= 70 ? 'hsl(var(--nice))' : 'hsl(var(--naughty))'
              }}
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground w-8">{row.niceScore}%</span>
        </div>
      ),
    },
    {
      header: 'Wishlist',
      accessor: (row: Child) => (
        <div className="flex gap-1">
          {row.wishlist.slice(0, 2).map((item, i) => (
            <span 
              key={i}
              className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground"
            >
              {item}
            </span>
          ))}
          {row.wishlist.length > 2 && (
            <span className="text-xs text-muted-foreground">+{row.wishlist.length - 2}</span>
          )}
        </div>
      ),
    },
    {
      header: '',
      accessor: () => (
        <Button variant="ghost" size="sm" className="text-xs text-primary h-7 press-effect">
          View
        </Button>
      ),
      className: 'text-right',
    },
  ];

  return (
    <PageTransition>
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-foreground">Children</h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              {children.length} children on the list
            </p>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground press-effect w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Child
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-muted py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-background transition-all duration-200"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { key: 'all', label: 'All', count: children.length },
              { key: 'nice', label: 'Nice', count: niceCount },
              { key: 'naughty', label: 'Naughty', count: naughtyCount },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key as typeof filter)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap press-effect",
                  filter === item.key 
                    ? "bg-foreground text-background" 
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label} ({item.count})
              </button>
            ))}
          </div>
        </div>

        {/* Stats - More compact on mobile */}
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          <div className="rounded-lg bg-card border border-border p-3 md:p-4 text-center hover-lift">
            <p className="text-xl md:text-2xl font-semibold text-foreground">{children.length}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">Total</p>
          </div>
          <div className="rounded-lg bg-nice/5 border border-nice/10 p-3 md:p-4 text-center hover-lift">
            <p className="text-xl md:text-2xl font-semibold text-nice">{niceCount}</p>
            <p className="text-[10px] md:text-xs text-nice/80 mt-0.5">Nice</p>
          </div>
          <div className="rounded-lg bg-naughty/5 border border-naughty/10 p-3 md:p-4 text-center hover-lift">
            <p className="text-xl md:text-2xl font-semibold text-naughty">{naughtyCount}</p>
            <p className="text-[10px] md:text-xs text-naughty/80 mt-0.5">Naughty</p>
          </div>
        </div>

        {/* Mobile: Card View */}
        <div className="md:hidden space-y-3">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-32 rounded-xl" />
            ))
          ) : (
            filteredChildren.map((child, index) => (
              <MobileChildCard key={child.id} child={child} index={index} />
            ))
          )}
        </div>

        {/* Desktop: Table */}
        <div className="hidden md:block">
          <DataTable 
            columns={columns} 
            data={filteredChildren} 
            isLoading={isLoading}
          />
        </div>
      </div>
    </PageTransition>
  );
};

export default Children;
