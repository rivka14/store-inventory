import { Link, useLocation } from 'react-router-dom';
import { Package, ClipboardList } from 'lucide-react';

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-primary" strokeWidth={2.5} />
            <h1 className="text-xl font-semibold tracking-tight max-[500px]:hidden">
              Store Inventory
            </h1>
          </div>
          <nav className="flex gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                isActive('/')
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <ClipboardList className="h-4 w-4" />
              <span className="font-medium">Inventory</span>
            </Link>
            <Link
              to="/products"
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                isActive('/products')
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <Package className="h-4 w-4" />
              <span className="font-medium">Products</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
