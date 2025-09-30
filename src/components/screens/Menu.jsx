
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Search, Star, Plus, Filter } from 'lucide-react';
import { AspectRatio } from '../ui/aspect-ratio'; // ✅ import AspectRatio

export function Menu({ menuItems, onAddToCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Use menuItems from props with default mock data if none provided
  const displayMenuItems = menuItems && menuItems.length > 0 ? menuItems : [
    {
      id: '1',
      name: 'Classic Burger',
      description: 'Juicy beef patty with fresh lettuce, tomato, and special sauce',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1600555379885-08a02224726d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwYnVyZ2VyJTIwbWVhbHxlbnwxfHx8fDE3NTg3ODc0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Main Course',
      available: true
    },
    {
      id: '2',
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomato sauce, basil, and olive oil on crispy crust',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1667422542005-eb6909ac24c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHNsaWNlJTIwZm9vZHxlbnwxfHx8fDE3NTg4MDYzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Main Course',
      available: true
    },
    {
      id: '3',
      name: 'Fresh Garden Salad',
      description: 'Mixed greens, cherry tomatoes, cucumbers, and vinaigrette dressing',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1651352650142-385087834d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjBmb29kfGVufDF8fHx8MTc1ODg1NjE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Salads',
      available: true
    },
    {
      id: '4',
      name: 'Premium Coffee',
      description: 'Rich and aromatic coffee blend, freshly brewed to perfection',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1614770012860-56f6ec4c4a2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBkcmluayUyMGJldmVyYWdlfGVufDF8fHx8MTc1ODgxOTE0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Beverages',
      available: true
    },
    {
      id: '5',
      name: 'Club Sandwich',
      description: 'Triple-layer sandwich with turkey, bacon, lettuce, and tomato',
      price: 11.99,
      image: 'https://images.unsplash.com/photo-1590301155505-471f05cd02db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2QlMjBsdW5jaHxlbnwxfHx8fDE3NTg4NTc1Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Sandwiches',
      available: true
    },
    {
      id: '6',
      name: 'Pasta Primavera',
      description: 'Fresh pasta with seasonal vegetables in a light cream sauce',
      price: 13.99,
      image: 'https://images.unsplash.com/photo-1749169337822-d875fd6f4c9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGl0YWxpYW4lMjBmb29kfGVufDF8fHx8MTc1ODc5NjUyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Main Course',
      available: false
    }
  ];
  
  // Add default image URLs for items that might not have them
  const itemsWithImages = displayMenuItems.map(item => ({
    ...item,
    image: item.image || `https://images.unsplash.com/photo-1721103530348-69262a02090b?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3`
  }));

  const categories = ['All', 'Main Course', 'Salads', 'Sandwiches', 'Beverages', 'Desserts'];

  const filteredItems = itemsWithImages.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Our Menu</h1>
          <p className="text-lg text-muted-foreground">
            Delicious meals made with fresh, quality ingredients
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-primary text-primary-foreground' : ''}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-md transition-all duration-200 overflow-hidden">
              <CardContent className="p-0">
                <AspectRatio ratio={4 / 3} className="relative overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!item.available && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Badge variant="destructive" className="text-xs">
                        Sold Out
                      </Badge>
                    </div>
                  )}
                  <Badge className="absolute top-1.5 left-1.5 bg-white/95 text-foreground text-xs px-1.5 py-0.5 backdrop-blur-sm">
                    {item.category}
                  </Badge>
                  <div className="absolute top-1.5 right-1.5 flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded px-1.5 py-0.5">
                    <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-white">4.8</span>
                  </div>
                </AspectRatio>
                
                <div className="p-3 space-y-2">
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                      {item.name}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-tight">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-primary">
                      ${item.price}
                    </span>
                    
                    <Button
                      onClick={() => onAddToCart(item)}
                      disabled={!item.available}
                      size="sm"
                      className="h-7 text-xs px-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No items found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

