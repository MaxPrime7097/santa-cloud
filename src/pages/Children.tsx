import { useEffect, useState } from 'react';
import { Search, Plus, Users } from 'lucide-react';
import { api, Child } from '@/services/api';
import DataTable from '@/components/DataTable';
import Badge from '@/components/Badge';
import { Button } from '@/components/ui/button';

const Children = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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

  const columns = [
    {
      header: 'Name',
      accessor: (row: Child) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg">
            {row.status === 'nice' ? '😊' : '😈'}
          </div>
          <div>
            <p className="font-medium text-foreground">{row.name}</p>
            <p className="text-sm text-muted-foreground">{row.country}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Age',
      accessor: 'age' as keyof Child,
      className: 'text-center',
    },
    {
      header: 'Status',
      accessor: (row: Child) => (
        <Badge variant={row.status === 'nice' ? 'nice' : 'naughty'}>
          {row.status === 'nice' ? '✨ Nice' : '⚠️ Naughty'}
        </Badge>
      ),
    },
    {
      header: 'Nice Score',
      accessor: (row: Child) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-20 rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000 progress-animate"
              style={{ 
                width: `${row.niceScore}%`,
                backgroundColor: row.niceScore >= 70 ? 'hsl(var(--nice))' : 'hsl(var(--naughty))'
              }}
            />
          </div>
          <span className="text-sm font-medium">{row.niceScore}%</span>
        </div>
      ),
    },
    {
      header: 'Wishlist',
      accessor: (row: Child) => (
        <div className="flex flex-wrap gap-1">
          {row.wishlist.slice(0, 2).map((item, i) => (
            <span 
              key={i}
              className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
            >
              🎁 {item}
            </span>
          ))}
          {row.wishlist.length > 2 && (
            <span className="text-xs text-muted-foreground">
              +{row.wishlist.length - 2} more
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: (row: Child) => (
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
          View Details
        </Button>
      ),
      className: 'text-right',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Children Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all children on the list
          </p>
        </div>
        <Button className="btn-christmas rounded-xl">
          <Plus className="h-4 w-4 mr-2" />
          Add Child
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-card border border-border py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl border-nice text-nice hover:bg-nice/10">
            ✨ Nice ({children.filter(c => c.status === 'nice').length})
          </Button>
          <Button variant="outline" className="rounded-xl border-naughty text-naughty hover:bg-naughty/10">
            ⚠️ Naughty ({children.filter(c => c.status === 'naughty').length})
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl bg-card border border-border p-4 text-center card-hover">
          <p className="text-2xl font-bold text-foreground">{children.length}</p>
          <p className="text-sm text-muted-foreground">Total Children</p>
        </div>
        <div className="rounded-xl bg-nice/10 border border-nice/20 p-4 text-center card-hover">
          <p className="text-2xl font-bold text-nice">{children.filter(c => c.status === 'nice').length}</p>
          <p className="text-sm text-nice/80">Nice List</p>
        </div>
        <div className="rounded-xl bg-naughty/10 border border-naughty/20 p-4 text-center card-hover">
          <p className="text-2xl font-bold text-naughty">{children.filter(c => c.status === 'naughty').length}</p>
          <p className="text-sm text-naughty/80">Naughty List</p>
        </div>
        <div className="rounded-xl bg-accent/10 border border-accent/20 p-4 text-center card-hover">
          <p className="text-2xl font-bold text-accent">
            {Math.round(children.reduce((acc, c) => acc + c.niceScore, 0) / children.length || 0)}%
          </p>
          <p className="text-sm text-accent/80">Avg Nice Score</p>
        </div>
      </div>

      {/* Table */}
      <DataTable 
        columns={columns} 
        data={children} 
        isLoading={isLoading}
      />
    </div>
  );
};

export default Children;
