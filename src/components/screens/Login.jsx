import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Shield, Coffee, Users, CheckCircle2, User } from 'lucide-react';

export function Login({ onLogin, onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Demo accounts for different roles
      if ((email === 'demo@canteenhub.com' && password === 'demo123')) {
        onLogin({
          id: '1',
          name: 'John Doe',
          email: email,
          role: 'user'
        });
        onNavigate('home');
      } else if (email === 'staff@canteenhub.com' && password === 'staff123') {
        onLogin({
          id: '2',
          name: 'Staff Member',
          email: email,
          role: 'staff'
        });
        onNavigate('staff-dashboard');
      } else if (email === 'admin@canteenhub.com' && password === 'admin123') {
        onLogin({
          id: '3',
          name: 'Admin User',
          email: email,
          role: 'admin'
        });
        onNavigate('admin-dashboard');
      } else {
        setError('Invalid email or password. Try one of the demo accounts');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden">
      {/* Visual panel with compact vertical card format */}
      <div className="hidden md:flex items-center justify-center p-6 bg-gradient-to-br from-primary to-primary/90">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl w-full max-w-xs transition-all duration-300 hover:shadow-2xl">
          {/* Image container */}
          {/* <div className="h-18 overflow-hidden">
            <img 
              src="https://picsum.photos/id/431/600/400" 
              alt="Canteen food display" 
              className="w-full  object-cover object-center transition-transform hover:scale-105 duration-300"
              loading="lazy"
            />
          </div> */}
          
          {/* Content below image */}
          <div className="p-4 text-center">
            <h2 className="text-xl font-bold text-white mb-1 tracking-tight">Welcome back</h2>
            <p className="text-white/80 text-xs leading-relaxed">
              Delicious meals and efficient service
            </p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-gradient-to-br from-background to-muted/30 py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute -top-40 -right-40 size-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-secondary/5 blur-3xl" />
        
        <Card className="w-full max-w-md shadow-xl border-none bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl relative z-10">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="absolute top-4 left-4 w-fit transition-all duration-300 hover:translate-x-[-4px] z-10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pt-12 pb-0 text-center">
            <div className="mb-2 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Sign in to CanteenHub</CardTitle>
            <CardDescription className="text-center text-muted-foreground mt-2">
              Access your account and start your food journey
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-8 pb-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <Alert variant="destructive" className="animate-fade-in-down">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium tracking-wide">Email</Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                    <Mail className="h-4 w-4" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 transition-all duration-200 border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium tracking-wide">Password</Label>
                  <button
                    type="button"
                    className="text-xs text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                    <Lock className="h-4 w-4" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-9 transition-all duration-200 border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 z-10 text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-all duration-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 mb-6 group relative overflow-hidden rounded-md bg-primary hover:bg-primary/90 transition-all duration-300 text-white font-medium shadow-lg hover:shadow-primary/20"
                disabled={isLoading}
              >
                <span className="absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-500">
                  {isLoading ? (
                    <span className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </span>
                  ) : (
                    'Sign in'
                  )}
                </span>
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Demo Account</span>
              </div>

            <div className="text-center text-xs text-muted-foreground bg-muted/50 p-4 rounded-lg border border-border/20 shadow-inner">
              <p className="mb-2 font-medium text-center text-foreground">Demo Accounts:</p>
              <div className="space-y-2">
                <p className="flex items-center gap-2 justify-center"><User className="w-3 h-3 text-primary" /> <strong>User:</strong> demo@canteenhub.com / demo123</p>
                <p className="flex items-center gap-2 justify-center"><Coffee className="w-3 h-3 text-primary" /> <strong>Staff:</strong> staff@canteenhub.com / staff123</p>
                <p className="flex items-center gap-2 justify-center"><Users className="w-3 h-3 text-primary" /> <strong>Admin:</strong> admin@canteenhub.com / admin123</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <span className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                  onClick={() => onNavigate('register')}
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                >
                  Sign up
                </button>
              </span>
            </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}