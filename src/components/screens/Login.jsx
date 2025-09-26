import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

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
      if (email === 'demo@canteenhub.com' && password === 'demo123') {
        onLogin({
          id: '1',
          name: 'John Doe',
          email: email
        });
        onNavigate('home');
      } else {
        setError('Invalid email or password. Try demo@canteenhub.com / demo123');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Visual panel */}
      <div className="hidden md:flex relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-transparent" />
        <div className="absolute -top-24 -left-24 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative z-10 m-auto p-12 text-center max-w-md">
          <h2 className="text-4xl font-bold text-foreground">Welcome back</h2>
          <p className="text-muted-foreground mt-3">
            Sign in to continue managing your canteen experience.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 opacity-90">
            <div className="h-28 rounded-xl bg-card border border-border shadow-sm" />
            <div className="h-28 rounded-xl bg-card border border-border shadow-sm" />
            <div className="h-28 rounded-xl bg-card border border-border shadow-sm" />
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-gradient-to-br from-background to-muted/30 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Use your email and password to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-9"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 z-10 text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4"  />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-1 relative z-0">
                <label className="flex items-center space-x-2 cursor-pointer">
                  {/* <input type="checkbox" className=" rounded border-border" />
                   <span className="text-sm text-muted-foreground">Remember me</span>  */}
                </label>
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Demo Account</span>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <p className="mb-1">Try the demo account:</p>
              <p><strong>Email:</strong> demo@canteenhub.com</p>
              <p><strong>Password:</strong> demo123</p>
            </div>

            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                  onClick={() => onNavigate('register')}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Sign up
                </button>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}