import { useEffect, useState } from 'react';
import { Search, Plus, Users } from 'lucide-react';
import { api, Child } from '@/services/api';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
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
        <Button variant="ghost" size="sm" className="text-xs text-primary h-7">
          View
        </Button>
      ),
      className: 'text-right',
    },
  ];

  const niceCount = children.filter(c => c.status === 'nice').length;
  const naughtyCount = children.filter(c => c.status === 'naughty').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Children</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {children.length} children on the list
          </p>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-1.5" />
          Add Child
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-muted py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex gap-1.5">
          {[
            { key: 'all', label: 'All', count: children.length },
            { key: 'nice', label: 'Nice', count: niceCount },
            { key: 'naughty', label: 'Naughty', count: naughtyCount },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key as typeof filter)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-card border border-border p-4 text-center">
          <p className="text-2xl font-semibold text-foreground">{children.length}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Total</p>
        </div>
        <div className="rounded-lg bg-nice/5 border border-nice/10 p-4 text-center">
          <p className="text-2xl font-semibold text-nice">{niceCount}</p>
          <p className="text-xs text-nice/80 mt-0.5">Nice</p>
        </div>
        <div className="rounded-lg bg-naughty/5 border border-naughty/10 p-4 text-center">
          <p className="text-2xl font-semibold text-naughty">{naughtyCount}</p>
          <p className="text-xs text-naughty/80 mt-0.5">Naughty</p>
        </div>
      </div>

      {/* Table */}
      <DataTable 
        columns={columns} 
        data={filteredChildren} 
        isLoading={isLoading}
      />
    </div>
  );
};

export default Children;
