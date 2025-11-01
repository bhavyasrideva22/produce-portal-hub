import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Package,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowLeft,
  Eye,
  MapPin,
  CreditCard,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  productName?: string;
  productId?: number;
  buyerName?: string;
  buyerEmail?: string;
  quantity?: number;
  price?: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" | "Confirmed";
  orderDate?: string;
  date?: string;
  deliveryDate?: string;
  address?: string;
  items?: Array<{
    id: number;
    name: string;
    farmer: string;
    price: number;
    quantity: number;
    unit: string;
    image: string;
    category: string;
  }>;
  shippingInfo?: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  payment?: {
    method: string;
    last4?: string;
  };
  subtotal?: number;
  shipping?: number;
}

const Orders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/auth");
      return;
    }

    const user = JSON.parse(userData);
    setCurrentUser(user);

    if (user.type === "farmer") {
      // Farmer orders view
      // Load farmer products
      const farmerProducts = localStorage.getItem("farmerProducts");
      if (farmerProducts) {
        setProducts(JSON.parse(farmerProducts));
      }

      // Load orders from localStorage
      const storedOrders = localStorage.getItem(`farmerOrders_${user.email}`);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        // Sample orders for demo
        const sampleOrders: Order[] = [
          {
            id: "ORD-001",
            productName: "Organic Tomatoes",
            productId: 1,
            buyerName: "John Buyer",
            buyerEmail: "buyer@example.com",
            quantity: 5,
            price: 3.99,
            total: 19.95,
            status: "confirmed",
            orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            address: "123 Main St, City, State 12345",
          },
          {
            id: "ORD-002",
            productName: "Fresh Carrots",
            productId: 2,
            buyerName: "Jane Customer",
            buyerEmail: "jane@example.com",
            quantity: 3,
            price: 2.49,
            total: 7.47,
            status: "shipped",
            orderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            address: "456 Oak Ave, City, State 12345",
          },
        ];
        setOrders(sampleOrders);
        localStorage.setItem(`farmerOrders_${user.email}`, JSON.stringify(sampleOrders));
      }
    } else {
      // Buyer orders view
      const storedOrders = localStorage.getItem("orders");
      if (storedOrders) {
        const allOrders = JSON.parse(storedOrders);
        // Filter orders by current user email if available
        const userOrders = allOrders.filter((order: Order) => 
          !order.shippingInfo || order.shippingInfo.email === user.email
        );
        setOrders(userOrders);
      }
    }
  }, [navigate]);

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem(`farmerOrders_${currentUser.email}`, JSON.stringify(updatedOrders));

    // Update product sales/orders stats
    const order = updatedOrders.find((o) => o.id === orderId);
    if (order && newStatus === "delivered") {
      const updatedProducts = products.map((p) => {
        if (p.id === order.productId) {
          return {
            ...p,
            orders: (p.orders || 0) + 1,
            sales: (p.sales || 0) + (order.quantity || 0),
            stock: p.stock !== undefined ? Math.max(0, p.stock - (order.quantity || 0)) : undefined,
          };
        }
        return p;
      });
      setProducts(updatedProducts);
      localStorage.setItem("farmerProducts", JSON.stringify(updatedProducts));
    }

    toast({
      title: "Order updated",
      description: `Order status changed to ${newStatus}.`,
    });
  };

  const getStatusBadge = (status: Order["status"]) => {
    const statusLower = status.toLowerCase() as Order["status"];
    const variants: Record<string, { variant: any; icon: any }> = {
      pending: { variant: "secondary", icon: Clock },
      confirmed: { variant: "default", icon: CheckCircle2 },
      shipped: { variant: "default", icon: Package },
      delivered: { variant: "default", icon: CheckCircle2 },
      cancelled: { variant: "destructive", icon: XCircle },
    };

    const { variant, icon: Icon } = variants[statusLower] || variants.confirmed;
    return (
      <Badge variant={variant}>
        <Icon className="mr-1 h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
      </Badge>
    );
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const isFarmer = currentUser?.type === "farmer";
  const totalRevenue = isFarmer
    ? orders
        .filter((o) => o.status === "delivered" || o.status === "Confirmed")
        .reduce((sum, o) => sum + o.total, 0)
    : 0;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => {
    const status = o.status.toLowerCase();
    return status === "pending" || status === "confirmed";
  }).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/products")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {isFarmer ? "Orders & Analytics" : "My Orders"}
          </h1>
          <p className="text-muted-foreground">
            {isFarmer
              ? "Track your orders and monitor your product performance"
              : "View your purchase history and order details"}
          </p>
        </div>

        {isFarmer && (
          <>
            {/* Stats Cards for Farmers */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  From {orders.filter((o) => o.status === "delivered" || o.status === "Confirmed").length} delivered orders
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  {pendingOrders} pending orders
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.length}</div>
                <p className="text-xs text-muted-foreground">
                  Active products in marketplace
                </p>
              </CardContent>
            </Card>
          </div>
          </>
        )}

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isFarmer ? "Order Management" : "Order History"}
            </CardTitle>
            <CardDescription>
              {isFarmer
                ? "Manage and track all orders for your products"
                : "View all your past and current orders"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    {isFarmer && <TableHead>Product</TableHead>}
                    {isFarmer && <TableHead>Buyer</TableHead>}
                    {!isFarmer && <TableHead>Items</TableHead>}
                    {isFarmer && <TableHead>Quantity</TableHead>}
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => {
                    const orderDate = order.date || order.orderDate;
                    const itemCount = order.items ? order.items.reduce((sum, item) => sum + item.quantity, 0) : (order.quantity || 0);
                    
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        {isFarmer && <TableCell>{order.productName}</TableCell>}
                        {isFarmer && (
                          <TableCell>
                            <div>
                              <div className="font-medium">{order.buyerName}</div>
                              <div className="text-sm text-muted-foreground">
                                {order.buyerEmail}
                              </div>
                            </div>
                          </TableCell>
                        )}
                        {!isFarmer && (
                          <TableCell>
                            {order.items ? `${order.items.length} item(s)` : "N/A"}
                          </TableCell>
                        )}
                        {isFarmer && <TableCell>{order.quantity}</TableCell>}
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          {orderDate
                            ? new Date(orderDate).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {isFarmer ? (
                              <>
                                {order.status === "pending" && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateOrderStatus(order.id, "confirmed")}
                                    >
                                      Confirm
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => updateOrderStatus(order.id, "cancelled")}
                                    >
                                      Cancel
                                    </Button>
                                  </>
                                )}
                                {order.status === "confirmed" && (
                                  <Button
                                    size="sm"
                                    onClick={() => updateOrderStatus(order.id, "shipped")}
                                  >
                                    Mark as Shipped
                                  </Button>
                                )}
                                {order.status === "shipped" && (
                                  <Button
                                    size="sm"
                                    onClick={() => updateOrderStatus(order.id, "delivered")}
                                  >
                                    Mark as Delivered
                                  </Button>
                                )}
                              </>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => viewOrderDetails(order)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {isFarmer ? "No orders yet" : "No orders found"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isFarmer
                    ? "When buyers purchase your products, orders will appear here."
                    : "You haven't placed any orders yet. Start shopping to see your orders here."}
                </p>
                <Button onClick={() => navigate("/products")}>
                  {isFarmer ? "Add Products" : "Browse Products"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Details Dialog for Buyers */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
                <DialogDescription>
                  Complete information about your order
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                {/* Order Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="font-semibold">
                      {selectedOrder.date || selectedOrder.orderDate
                        ? new Date(selectedOrder.date || selectedOrder.orderDate || "").toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                  </div>
                </div>

                {/* Order Items */}
                {selectedOrder.items && selectedOrder.items.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-3 border rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.farmer}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Quantity: {item.quantity} {item.unit} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shipping Information */}
                {selectedOrder.shippingInfo && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Shipping Address
                    </h3>
                    <div className="p-4 bg-muted/50 rounded-lg space-y-1">
                      <p className="font-medium">{selectedOrder.shippingInfo.fullName}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.shippingInfo.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.shippingInfo.phone}
                      </p>
                      <p className="text-sm mt-2">
                        {selectedOrder.shippingInfo.address}<br />
                        {selectedOrder.shippingInfo.city}, {selectedOrder.shippingInfo.state} {selectedOrder.shippingInfo.zipCode}<br />
                        {selectedOrder.shippingInfo.country}
                      </p>
                    </div>
                  </div>
                )}

                {/* Payment Information */}
                {selectedOrder.payment && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Payment Information
                    </h3>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm">
                        <span className="text-muted-foreground">Method: </span>
                        <span className="font-medium">{selectedOrder.payment.method}</span>
                      </p>
                      {selectedOrder.payment.last4 && (
                        <p className="text-sm mt-1">
                          <span className="text-muted-foreground">Card ending in: </span>
                          <span className="font-medium">**** {selectedOrder.payment.last4}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Order Total */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      ${(selectedOrder.subtotal || selectedOrder.total).toFixed(2)}
                    </span>
                  </div>
                  {selectedOrder.shipping !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        ${selectedOrder.shipping.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-primary">
                      ${selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Orders;