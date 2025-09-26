import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Clock, CheckCircle, Package, Truck } from 'lucide-react';

export function OrderTracking({ orders }) {
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

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Order Tracking</h1>
          <p className="text-muted-foreground mt-2">
            Track your orders and see their current status
          </p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Truck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Orders Yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't placed any orders yet. Start by browsing our menu!
              </p>
              <Button>Browse Menu</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
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
                  <div className="space-y-4">
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

                    {/* Status Progress */}
                    <div className="mt-6">
                      <h4 className="font-semibold text-foreground mb-3">Order Progress</h4>
                      <div className="flex items-center space-x-4">
                        <div className={`flex items-center space-x-2 ${order.status === 'preparing' || order.status === 'ready' || order.status === 'delivered' ? 'text-primary' : 'text-muted-foreground'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === 'preparing' || order.status === 'ready' || order.status === 'delivered' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            <Clock className="w-4 h-4" />
                          </div>
                          <span className="text-sm">Preparing</span>
                        </div>
                        
                        <div className={`flex-1 h-1 rounded ${order.status === 'ready' || order.status === 'delivered' ? 'bg-primary' : 'bg-muted'}`}></div>
                        
                        <div className={`flex items-center space-x-2 ${order.status === 'ready' || order.status === 'delivered' ? 'text-primary' : 'text-muted-foreground'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === 'ready' || order.status === 'delivered' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            <Package className="w-4 h-4" />
                          </div>
                          <span className="text-sm">Ready</span>
                        </div>
                        
                        <div className={`flex-1 h-1 rounded ${order.status === 'delivered' ? 'bg-primary' : 'bg-muted'}`}></div>
                        
                        <div className={`flex items-center space-x-2 ${order.status === 'delivered' ? 'text-primary' : 'text-muted-foreground'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === 'delivered' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <span className="text-sm">Delivered</span>
                        </div>
                      </div>
                    </div>
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
