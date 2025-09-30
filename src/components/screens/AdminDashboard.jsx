import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Trash2, Plus, Edit, ArrowLeft } from 'lucide-react';

export function AdminDashboard({ users = [], menuItems = [], onNavigate, onAddMenuItem, onUpdateMenuItem, onDeleteMenuItem, onUpdateUserRole }) {
  // Mock data for users and menu items if none are provided
  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'demo@canteenhub.com', role: 'user' },
    { id: '2', name: 'Staff Member', email: 'staff@canteenhub.com', role: 'staff' },
    { id: '3', name: 'Admin User', email: 'admin@canteenhub.com', role: 'admin' }
  ];

  const mockMenuItems = [
    { id: '1', name: 'Classic Burger', description: 'Juicy beef patty with fresh lettuce, tomato, and special sauce', price: 12.99, category: 'Main Course', available: true },
    { id: '2', name: 'Margherita Pizza', description: 'Fresh mozzarella, tomato sauce, basil, and olive oil on crispy crust', price: 14.99, category: 'Main Course', available: true },
    { id: '3', name: 'Fresh Garden Salad', description: 'Mixed greens, cherry tomatoes, cucumbers, and vinaigrette dressing', price: 9.99, category: 'Salads', available: true },
    { id: '4', name: 'Premium Coffee', description: 'Rich and aromatic coffee blend, freshly brewed to perfection', price: 4.99, category: 'Beverages', available: true },
    { id: '5', name: 'Club Sandwich', description: 'Triple-layer sandwich with turkey, bacon, lettuce, and tomato', price: 11.99, category: 'Sandwiches', available: true }
  ];

  const displayUsers = users.length > 0 ? users : mockUsers;
  const displayMenuItems = menuItems.length > 0 ? menuItems : mockMenuItems;

  const [currentTab, setCurrentTab] = useState('users');
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [editMenuItemData, setEditMenuItemData] = useState({});
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Main Course',
    available: true
  });

  const handleAddMenuItem = () => {
    if (newMenuItem.name && newMenuItem.price) {
      const itemToAdd = {
        ...newMenuItem,
        id: Date.now().toString(),
        price: parseFloat(newMenuItem.price)
      };
      if (onAddMenuItem) {
        onAddMenuItem(itemToAdd);
      }
      // Reset form
      setNewMenuItem({
        name: '',
        description: '',
        price: '',
        category: 'Main Course',
        available: true
      });
    }
  };

  // Handle editing a menu item
  const handleEditMenuItem = (item) => {
    setEditingMenuItem(item.id);
    setEditMenuItemData({ ...item });
  };

  // Save edited menu item
  const handleSaveMenuItem = () => {
    if (editMenuItemData.name && editMenuItemData.price) {
      const updatedItem = {
        ...editMenuItemData,
        price: parseFloat(editMenuItemData.price)
      };
      if (onUpdateMenuItem) {
        onUpdateMenuItem(updatedItem);
      }
      setEditingMenuItem(null);
      setEditMenuItemData({});
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingMenuItem(null);
    setEditMenuItemData({});
  };

  // Delete menu item
  const handleDeleteMenuItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      if (onDeleteMenuItem) {
        onDeleteMenuItem(itemId);
      }
    }
  };

  const handleUpdateUserRole = (userId, newRole) => {
    if (onUpdateUserRole) {
      onUpdateUserRole(userId, newRole);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage users, menu items, and system settings
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="w-fit"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="users">Users Management</TabsTrigger>
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <p className="text-muted-foreground">View and manage all system users</p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge className={
                            user.role === 'admin' ? 'bg-red-100 text-red-800 border-red-200' :
                            user.role === 'staff' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            'bg-green-100 text-green-800 border-green-200'
                          }>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <select
                            value={user.role}
                            onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                            disabled={user.role === 'admin' && displayUsers.filter(u => u.role === 'admin').length <= 1}
                            className="rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="user">User</option>
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                          </select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="menu" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Menu Items</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Menu Item</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value={newMenuItem.name}
                          onChange={(e) => setNewMenuItem({...newMenuItem, name: e.target.value})}
                          className="col-span-3"
                          placeholder="Item name"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Input
                          id="description"
                          value={newMenuItem.description}
                          onChange={(e) => setNewMenuItem({...newMenuItem, description: e.target.value})}
                          className="col-span-3"
                          placeholder="Item description"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                          Price
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={newMenuItem.price}
                          onChange={(e) => setNewMenuItem({...newMenuItem, price: e.target.value})}
                          className="col-span-3"
                          placeholder="Item price"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                          Category
                        </Label>
                        <select
                          id="category"
                          value={newMenuItem.category}
                          onChange={(e) => setNewMenuItem({...newMenuItem, category: e.target.value})}
                          className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="Main Course">Main Course</option>
                          <option value="Salads">Salads</option>
                          <option value="Sandwiches">Sandwiches</option>
                          <option value="Beverages">Beverages</option>
                          <option value="Desserts">Desserts</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="available" className="text-right">
                          Available
                        </Label>
                        <div className="flex items-center space-x-2">
                          <input
                            id="available"
                            type="checkbox"
                            checked={newMenuItem.available}
                            onChange={(e) => setNewMenuItem({...newMenuItem, available: e.target.checked})}
                            className="rounded border-input text-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={handleAddMenuItem}>Add Item</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Description</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayMenuItems.map((item) => (
                      <>
                        {editingMenuItem === item.id ? (
                          <TableRow key={`${item.id}-edit`}>
                            <TableCell colSpan={6}>
                              <div className="grid grid-cols-6 gap-4 p-2">
                                <div className="col-span-2">
                                  <Label htmlFor={`edit-name-${item.id}`} className="text-xs mb-1 block">Name</Label>
                                  <Input
                                    id={`edit-name-${item.id}`}
                                    value={editMenuItemData.name}
                                    onChange={(e) => setEditMenuItemData({...editMenuItemData, name: e.target.value})}
                                    className="text-sm"
                                  />
                                </div>
                                <div className="col-span-1">
                                  <Label htmlFor={`edit-price-${item.id}`} className="text-xs mb-1 block">Price</Label>
                                  <Input
                                    id={`edit-price-${item.id}`}
                                    type="number"
                                    step="0.01"
                                    value={editMenuItemData.price}
                                    onChange={(e) => setEditMenuItemData({...editMenuItemData, price: e.target.value})}
                                    className="text-sm"
                                  />
                                </div>
                                <div className="col-span-1">
                                  <Label htmlFor={`edit-category-${item.id}`} className="text-xs mb-1 block">Category</Label>
                                  <select
                                    id={`edit-category-${item.id}`}
                                    value={editMenuItemData.category}
                                    onChange={(e) => setEditMenuItemData({...editMenuItemData, category: e.target.value})}
                                    className="text-sm rounded-md border border-input bg-background px-2 py-1"
                                  >
                                    <option value="Main Course">Main Course</option>
                                    <option value="Salads">Salads</option>
                                    <option value="Sandwiches">Sandwiches</option>
                                    <option value="Beverages">Beverages</option>
                                    <option value="Desserts">Desserts</option>
                                  </select>
                                </div>
                                <div className="col-span-1">
                                  <Label className="text-xs mb-1 block">Available</Label>
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      checked={editMenuItemData.available}
                                      onChange={(e) => setEditMenuItemData({...editMenuItemData, available: e.target.checked})}
                                      className="rounded border-input text-primary focus:ring-primary"
                                    />
                                  </div>
                                </div>
                                <div className="col-span-1 flex space-x-2 items-end">
                                  <Button variant="default" size="sm" onClick={handleSaveMenuItem} className="h-8">
                                    Save
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={handleCancelEdit} className="h-8">
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="hidden md:table-cell line-clamp-1">{item.description}</TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>
                              <Badge className={item.available ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}>
                                {item.available ? 'Available' : 'Unavailable'}
                              </Badge>
                            </TableCell>
                            <TableCell className="flex space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditMenuItem(item)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteMenuItem(item.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}