import { useEffect, useState } from 'react';
import { Search, Plus, Gift, MapPin, Calendar, Star, X } from 'lucide-react';
import { api, Child } from '@/services/api';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Children = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'nice' | 'naughty'>('all');
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

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
      className="rounded-xl bg-card border border-border p-4 animate-fade-in hover-lift cursor-pointer"
      style={{ animationDelay: `${index * 30}ms` }}
      onClick={() => setSelectedChild(child)}
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
      accessor: (row: Child) => (
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs text-primary h-7 press-effect"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedChild(row);
          }}
        >
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

        {/* Child Detail Modal */}
        <Dialog open={!!selectedChild} onOpenChange={() => setSelectedChild(null)}>
          <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold text-primary">
                  {selectedChild?.name.charAt(0)}
                </div>
                <div>
                  <span className="text-foreground">{selectedChild?.name}</span>
                  <p className="text-sm font-normal text-muted-foreground mt-0.5">
                    {selectedChild?.status === 'nice' ? '🌟 Nice List' : '⚠️ Naughty List'}
                  </p>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            {selectedChild && (
              <div className="space-y-4 mt-2">
                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="text-xs">Country</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{selectedChild.country}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span className="text-xs">Age</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{selectedChild.age} years old</p>
                  </div>
                </div>

                {/* Nice Score */}
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Star className="h-3.5 w-3.5" />
                      <span className="text-xs">Nice Score</span>
                    </div>
                    <span className={cn(
                      "text-sm font-semibold",
                      selectedChild.niceScore >= 70 ? "text-nice" : "text-naughty"
                    )}>
                      {selectedChild.niceScore}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-background overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700"
                      style={{ 
                        width: `${selectedChild.niceScore}%`,
                        backgroundColor: selectedChild.niceScore >= 70 ? 'hsl(var(--nice))' : 'hsl(var(--naughty))'
                      }}
                    />
                  </div>
                </div>

                {/* Wishlist */}
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Gift className="h-3.5 w-3.5" />
                    <span className="text-xs">Wishlist ({selectedChild.wishlist.length} items)</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedChild.wishlist.map((item, i) => (
                      <span 
                        key={i}
                        className="text-xs bg-background px-2.5 py-1 rounded-full text-foreground border border-border"
                      >
                        🎁 {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status Badge */}
                <div className={cn(
                  "rounded-lg p-3 text-center",
                  selectedChild.status === 'nice' 
                    ? "bg-nice/10 border border-nice/20" 
                    : "bg-naughty/10 border border-naughty/20"
                )}>
                  <p className={cn(
                    "text-sm font-medium",
                    selectedChild.status === 'nice' ? "text-nice" : "text-naughty"
                  )}>
                    {selectedChild.status === 'nice' 
                      ? "✨ This child has been very good this year!" 
                      : "📝 This child needs to improve their behavior"}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
};

export default Children;
