import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./components/screens/Home";
import { Login } from "./components/screens/Login";
import { Register } from "./components/screens/Register";
import { Menu } from "./components/screens/Menu";
import { Cart } from "./components/screens/Cart";
import { OrderTracking } from "./components/screens/OrderTracking";
import { StaffDashboard } from "./components/screens/StaffDashboard";
import { AdminDashboard } from "./components/screens/AdminDashboard";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  // Initial menu items data
  const [menuItems, setMenuItems] = useState([
    { id: '1', name: 'Classic Burger', description: 'Juicy beef patty with fresh lettuce, tomato, and special sauce', price: 12.99, image: 'https://images.unsplash.com/photo-1600555379885-08a02224726d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwYnVyZ2VyJTIwbWVhbHxlbnwxfHx8fDE3NTg3ODc0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', category: 'Main Course', available: true },
    { id: '2', name: 'Margherita Pizza', description: 'Fresh mozzarella, tomato sauce, basil, and olive oil on crispy crust', price: 14.99, image: 'https://images.unsplash.com/photo-1667422542005-eb6909ac24c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHNsaWNlJTIwZm9vZHxlbnwxfHx8fDE3NTg4MDYzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', category: 'Main Course', available: true },
    { id: '3', name: 'Fresh Garden Salad', description: 'Mixed greens, cherry tomatoes, cucumbers, and vinaigrette dressing', price: 9.99, image: 'https://images.unsplash.com/photo-1651352650142-385087834d9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGhlYWx0aHklMjBmb29kfGVufDF8fHx8MTc1ODg1NjE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', category: 'Salads', available: true },
    { id: '4', name: 'Premium Coffee', description: 'Rich and aromatic coffee blend, freshly brewed to perfection', price: 4.99, image: 'https://images.unsplash.com/photo-1614770012860-56f6ec4c4a2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBkcmluayUyMGJldmVyYWdlfGVufDF8fHx8MTc1ODgxOTE0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', category: 'Beverages', available: true },
    { id: '5', name: 'Club Sandwich', description: 'Triple-layer sandwich with turkey, bacon, lettuce, and tomato', price: 11.99, image: 'https://images.unsplash.com/photo-1590301155505-471f05cd02db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2QlMjBsdW5jaHxlbnwxfHx8fDE3NTg4NTc1Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', category: 'Sandwiches', available: true }
  ]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (cartItem) => cartItem.id === item.id,
      );
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== itemId),
    );
  };

  const updateCartQuantity = (
    itemId,
    quantity,
  ) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      ),
    );
  };

  const placeOrder = () => {
    if (cartItems.length === 0) return;

    const newOrder = {
      id: `ORD${String(orders.length + 1).padStart(3, "0")}`,
      items: [...cartItems],
      total: cartTotal,
      status: "preparing",
      orderTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      estimatedTime: "15-20 mins",
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setCurrentScreen("orders");
  };

  // Menu management functions for Admin Dashboard
  const addMenuItem = (item) => {
    setMenuItems((prev) => [...prev, item]);
  };

  const updateMenuItem = (updatedItem) => {
    setMenuItems((prev) => 
      prev.map((item) => 
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  const deleteMenuItem = (itemId) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateUserRole = (userId, newRole) => {
    // This would be implemented with actual user management
    console.log(`Updating user ${userId} to role: ${newRole}`);
  };
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <Home onNavigate={setCurrentScreen} />;
      case "login":
        return (
          <Login
            onLogin={setUser}
            onNavigate={setCurrentScreen}
          />
        );
      case "register":
        return (
          <Register
            onRegister={setUser}
            onNavigate={setCurrentScreen}
          />
        );
      case "menu":
        return <Menu menuItems={menuItems} onAddToCart={addToCart} />;
      case "cart":
        return (
          <Cart
            items={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onPlaceOrder={placeOrder}
            total={cartTotal}
          />
        );
      case "orders":
        return <OrderTracking orders={orders} user={user} onNavigate={setCurrentScreen} />;
      case "staff-dashboard":
        return <StaffDashboard orders={orders} onNavigate={setCurrentScreen} onUpdateOrderStatus={updateOrderStatus} />;
      case "admin-dashboard":
        return (
          <AdminDashboard 
            menuItems={menuItems} 
            onNavigate={setCurrentScreen} 
            onAddMenuItem={addMenuItem} 
            onUpdateMenuItem={updateMenuItem} 
            onDeleteMenuItem={deleteMenuItem} 
            onUpdateUserRole={updateUserRole} 
          />
        );
      default:
        return <Home onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar
        user={user}
        onNavigate={setCurrentScreen}
        cartItemCount={cartItemCount}
        onLogout={() => setUser(null)}
      />
      <main className="flex-1">{renderScreen()}</main>
      <Footer />
    </div>
  );
}