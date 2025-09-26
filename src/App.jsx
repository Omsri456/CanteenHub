import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./components/screens/Home";
import { Login } from "./components/screens/Login";
import { Register } from "./components/screens/Register";
import { Menu } from "./components/screens/Menu";
import { Cart } from "./components/screens/Cart";
import { OrderTracking } from "./components/screens/OrderTracking";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

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

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

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
        return <Menu onAddToCart={addToCart} />;
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
        return <OrderTracking orders={orders} />;
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