
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CakeSlice, Menu, X, ShoppingCart } from 'lucide-react';

const NavLink = ({ to, children, currentPath }: { to: string; children: React.ReactNode; currentPath: string }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`text-foreground relative px-3 py-2 text-base transition-colors hover:text-primary ${
        isActive ? 'font-medium text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary' : ''
      }`}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <CakeSlice className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-semibold">Sweet Cakes</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" currentPath={currentPath}>Home</NavLink>
          <NavLink to="/catalog" currentPath={currentPath}>Our Cakes</NavLink>
          <NavLink to="/order" currentPath={currentPath}>Order</NavLink>
          <NavLink to="/about" currentPath={currentPath}>About Us</NavLink>
          <NavLink to="/contact" currentPath={currentPath}>Contact</NavLink>
        </nav>

        <div className="hidden md:flex md:items-center md:gap-4">
          <Button asChild variant="ghost" size="icon">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild>
            <Link to="/order">Order Now</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="container pb-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="py-2 text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/catalog" className="py-2 text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Our Cakes</Link>
            <Link to="/order" className="py-2 text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Order</Link>
            <Link to="/about" className="py-2 text-lg font-medium" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/contact" className="py-2 text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Button asChild className="mt-4 w-full">
              <Link to="/order" onClick={() => setIsMenuOpen(false)}>Order Now</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
