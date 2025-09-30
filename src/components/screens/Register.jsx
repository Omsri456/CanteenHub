import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { User, Mail, Lock, ArrowLeft, CheckCircle2, Shield, Coffee, Users } from 'lucide-react';

export function Register({ onRegister, onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' // Default to regular user
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role || !['user', 'staff', 'admin'].includes(formData.role)) {
      newErrors.role = 'Please select a valid account type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate successful registration
      setTimeout(() => {
        const user = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          role: formData.role
        };
        
        onRegister(user);
        onNavigate('home');
        setIsSubmitting(false);
      }, 1000);
    }
  };

  // Helper function to get role icon
  const getRoleIcon = (role) => {
    switch(role) {
      case 'user': return <User className="w-4 h-4" />;
      case 'staff': return <Coffee className="w-4 h-4" />;
      case 'admin': return <Users className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden">
      {/* Visual panel with compact image */}
      <div className="hidden md:flex items-center justify-center p-6 bg-gradient-to-br from-primary to-primary/90">
        <div className="w-full max-w-xs">
          {/* Image with simple implementation */}
          
          
          {/* Content below image */}
          <div className="text-center text-white">
            <h2 className="text-xl font-bold mb-2">Join our canteen</h2>
            <p className="text-white/80 text-sm">
              Create your account and start enjoying delicious meals
            </p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-gradient-to-br from-background to-muted/30 py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute -top-40 -right-40 size-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-secondary/5 blur-3xl" />
        
        <div className="w-full max-w-md space-y-8 relative z-10">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="w-fit transition-all duration-300 hover:translate-x-[-4px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <Card className="shadow-xl border-none bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pt-12 pb-0 text-center">
            <div className="mb-2 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <User className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Join CanteenHub</CardTitle>
            <p className="text-center text-muted-foreground mt-2 text-sm">
              Create your account and start your food journey today
            </p>
            </CardHeader>
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="block text-sm font-medium tracking-wide">Full Name</Label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                      <User className="h-4 w-4" />
                    </div>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`pl-10 transition-all duration-200 border-input focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.name ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1 animate-fade-in-down">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="block text-sm font-medium tracking-wide">Email Address</Label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                      <Mail className="h-4 w-4" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`pl-10 transition-all duration-200 border-input focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1 animate-fade-in-down">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="block text-sm font-medium tracking-wide">Password</Label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`pl-10 transition-all duration-200 border-input focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.password ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-xs text-destructive mt-1 animate-fade-in-down">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="block text-sm font-medium tracking-wide">Confirm Password</Label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`pl-10 transition-all duration-200 border-input focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.confirmPassword ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive mt-1 animate-fade-in-down">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="block text-sm font-medium tracking-wide">Account Type</Label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                      {getRoleIcon(formData.role)}
                    </div>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className={`w-full h-10 px-10 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 focus:border-primary focus:ring-primary/20 ${errors.role ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
                    >
                      <option value="user">Regular User</option>
                      <option value="staff">Canteen Staff</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                  {errors.role && (
                    <p className="text-xs text-destructive mt-1 animate-fade-in-down">{errors.role}</p>
                  )}
                </div>

                <Button type="submit" className="w-full h-12 mb-6 group relative overflow-hidden rounded-md bg-primary hover:bg-primary/90 transition-all duration-300 text-white font-medium shadow-lg hover:shadow-primary/20">
                  <span className="absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-500">
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating Account...</span>
                      </span>
                    ) : (
                      'Create Account'
                    )}
                  </span>
                </Button>
              </form>

              <div className="mt-6 text-xs text-muted-foreground bg-muted/50 p-4 rounded-lg border border-border/20 shadow-inner">
                <p className="mb-2 font-medium text-center text-foreground">Account Types:</p>
                <div className="space-y-2">
                  <p className="flex items-center gap-2"><User className="w-3 h-3 text-primary" /> <strong>Regular User:</strong> For customers ordering food</p>
                  <p className="flex items-center gap-2"><Coffee className="w-3 h-3 text-primary" /> <strong>Canteen Staff:</strong> For managing orders and updating status</p>
                  <p className="flex items-center gap-2"><Users className="w-3 h-3 text-primary" /> <strong>Administrator:</strong> For system management including users and menu</p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Button
                    variant="link"
                    onClick={() => onNavigate('login')}
                    className="p-0 h-auto font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    Sign in here
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
