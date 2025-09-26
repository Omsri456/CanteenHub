import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User, ShoppingCart, Menu, LogOut } from 'lucide-react';

export function Navbar({ user, onNavigate, cartItemCount, onLogout }) {
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Menu className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">CanteenHub</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Button
              variant="ghost"
              onClick={() => onNavigate('home')}
              className="text-foreground hover:text-primary"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => onNavigate('menu')}
              className="text-foreground hover:text-primary"
            >
              Menu
            </Button>
            {user && (
              <Button
                variant="ghost"
                onClick={() => onNavigate('orders')}
                className="text-foreground hover:text-primary"
              >
                Orders
              </Button>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('cart')}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* User menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm text-foreground">{user.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('login')}
                  className="text-foreground hover:text-primary"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => onNavigate('register')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border">
          <div className="flex justify-around py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('home')}
              className="flex flex-col items-center space-y-1 text-xs"
            >
              <Menu className="w-4 h-4" />
              <span>Home</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('menu')}
              className="flex flex-col items-center space-y-1 text-xs"
            >
              <Menu className="w-4 h-4" />
              <span>Menu</span>
            </Button>
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('orders')}
                className="flex flex-col items-center space-y-1 text-xs"
              >
                <Menu className="w-4 h-4" />
                <span>Orders</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}