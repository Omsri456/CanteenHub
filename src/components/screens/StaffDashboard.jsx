import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Clock, CheckCircle, Package, Filter, ArrowLeft } from 'lucide-react';

const getStatusIcon = (status) => {
  switch (status) {
    case 'preparing':
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case 'ready':
      return <Package className="w-5 h-5 text-blue-500" />;
    case 'delivered':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    default:
      return <Clock className="w-5 h-5 text-gray-500" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'preparing':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'ready':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'preparing':
      return 'Preparing';
    case 'ready':
      return 'Ready for Pickup';
    case 'delivered':
      return 'Delivered';
    default:
      return status;
  }
};

const getNextStatus = (status) => {
  switch (status) {
    case 'preparing':
      return 'ready';
    case 'ready':
      return 'delivered';
    default:
      return status;
  }
};

export function StaffDashboard({ orders = [], onUpdateOrderStatus, onNavigate }) {
  // Mock data for orders if none are provided
  const mockOrders = [
    {
      id: 'ORD001',
      items: [
        { id: '1', name: 'Classic Burger', price: 12.99, quantity: 2 },
        { id: '4', name: 'Premium Coffee', price: 4.99, quantity: 1 }
      ],
      total: 30.97,
      status: 'preparing',
      orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedTime: '15-20 mins'
    },
    {
      id: 'ORD002',
      items: [
        { id: '2', name: 'Margherita Pizza', price: 14.99, quantity: 1 },
        { id: '3', name: 'Fresh Garden Salad', price: 9.99, quantity: 1 }
      ],
      total: 24.98,
      status: 'ready',
      orderTime: new Date(Date.now() - 15 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedTime: '10-15 mins'
    },
    {
      id: 'ORD003',
      items: [
        { id: '5', name: 'Club Sandwich', price: 11.99, quantity: 2 }
      ],
      total: 23.98,
      status: 'delivered',
      orderTime: new Date(Date.now() - 30 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ];

  const displayOrders = orders.length > 0 ? orders : mockOrders;
  const handleUpdateStatus = (orderId) => {
    const order = displayOrders.find(o => o.id === orderId);
    if (order && order.status !== 'delivered') {
      const newStatus = getNextStatus(order.status);
      if (onUpdateOrderStatus) {
        onUpdateOrderStatus(orderId, newStatus);
      } else {
        // Simulate status update for demo purposes
        alert(`Order ${orderId} status updated to ${getStatusText(newStatus)}`);
      }
    }
  };

  const getFilteredOrders = (filter) => {
    if (filter === 'all') return displayOrders;
    return displayOrders.filter(order => order.status === filter);
  };

  const [filter, setFilter] = React.useState('all');
  const filteredOrders = getFilteredOrders(filter);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Staff Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage and update order statuses
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

        {/* Filter section */}
        <div className="mb-8 flex items-center space-x-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-2">
            {['all', 'preparing', 'ready', 'delivered'].map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(status)}
                className={filter === status ? 'bg-primary text-primary-foreground' : ''}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Orders to Manage</h3>
              <p className="text-muted-foreground">
                There are no orders in the selected category.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Order #{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Placed at {order.orderTime}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} border`}>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </div>
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-6">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                <Package className="w-6 h-6 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{item.name}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="font-semibold text-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-foreground">Total</span>
                        <span className="text-xl font-bold text-primary">${order.total.toFixed(2)}</span>
                      </div>
                      {order.estimatedTime && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Estimated time: {order.estimatedTime}
                        </p>
                      )}
                    </div>

                    {/* Action Button */}
                    {order.status !== 'delivered' && (
                      <Button
                        onClick={() => handleUpdateStatus(order.id)}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Mark as {getStatusText(getNextStatus(order.status))}
                      </Button>
                    )}

                    {order.status === 'delivered' && (
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled
                      >
                        Order Completed
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}