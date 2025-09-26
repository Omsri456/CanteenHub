import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Clock, Star, Users, ChefHat } from 'lucide-react';

export function Home({ onNavigate }) {
  const featuredItems = [
    {
      id: '1',
      name: 'Classic Burger',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1600555379885-08a02224726d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwYnVyZ2VyJTIwbWVhbHxlbnwxfHx8fDE3NTg3ODc0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Margherita Pizza',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1667422542005-eb6909ac24c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHNsaWNlJTIwZm9vZHxlbnwxfHx8fDE3NTg4MDYzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Fresh Garden Salad',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1651352650142-385087834d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjBmb29kfGVufDF8fHx8MTc1ODg1NjE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.7
    }
  ];

  const stats = [
    { icon: Clock, label: 'Avg. Prep Time', value: '15 min' },
    { icon: Star, label: 'Customer Rating', value: '4.8/5' },
    { icon: Users, label: 'Daily Orders', value: '500+' },
    { icon: ChefHat, label: 'Menu Items', value: '50+' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Delicious Food,
              <span className="text-primary block">Delivered Fast</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Order from your favorite campus canteen with just a few clicks. 
              Fresh ingredients, quick service, and unbeatable taste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onNavigate('menu')}
                className="text-lg px-8 py-6"
              >
                Browse Menu
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('register')}
                className="text-lg px-8 py-6"
              >
                Sign Up Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Today's Favorites
            </h2>
            <p className="text-lg text-muted-foreground">
              Our most popular dishes, loved by students and staff
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-foreground">{item.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">${item.price}</span>
                      <Button
                        onClick={() => onNavigate('menu')}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Order Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('menu')}
              className="text-lg px-8 py-6"
            >
              View Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Order?
          </h2>
          <p className="text-xl opacity-90">
            Join thousands of satisfied customers who choose CanteenHub for their daily meals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('register')}
              className="text-lg px-8 py-6"
            >
              Create Account
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('menu')}
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Start Ordering
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}