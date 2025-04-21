
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  User, 
  LogIn, 
  Menu, 
  Search, 
  X 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="py-4 bg-background sticky top-0 z-50 border-b">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-primary">Whimsy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/shop" className="nav-link">Shop</Link>
            <Link to="/categories" className="nav-link">Categories</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            {searchOpen ? (
              <div className="relative flex items-center">
                <Input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-64 bg-background"
                  autoFocus
                />
                <button 
                  className="absolute right-2" 
                  onClick={() => setSearchOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={20} />
              </Button>
            )}
            
            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative group">
                <Button variant="ghost" size="icon">
                  <User size={20} />
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-card border rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-3 border-b">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                  <div className="p-2">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 hover:bg-accent rounded-md"
                    >
                      My Profile
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 hover:bg-accent rounded-md"
                    >
                      My Orders
                    </Link>
                    {isAdmin && (
                      <Link 
                        to="/admin/dashboard" 
                        className="block px-4 py-2 hover:bg-accent rounded-md"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-accent rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <LogIn size={20} />
                </Button>
              </Link>
            )}
            
            {/* Cart with Badge */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground h-5 w-5 flex items-center justify-center p-0 rounded-full text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground h-5 w-5 flex items-center justify-center p-0 rounded-full text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 md:hidden">
          <div className="p-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-2xl font-serif font-bold text-primary">Whimsy</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </Button>
            </div>
            <div className="mb-6">
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="w-full"
              />
            </div>
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-lg py-2 border-b" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/shop" className="text-lg py-2 border-b" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
              <Link to="/categories" className="text-lg py-2 border-b" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
              <Link to="/about" className="text-lg py-2 border-b" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/contact" className="text-lg py-2 border-b" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </nav>
            <div className="mt-auto">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <User size={18} className="mr-2" /> My Profile
                    </Button>
                  </Link>
                  <Link to="/orders" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <User size={18} className="mr-2" /> My Orders
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User size={18} className="mr-2" /> Admin Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogIn size={18} className="mr-2" /> Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">
                    <LogIn size={18} className="mr-2" /> Login / Register
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
