import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Store,
  Package,
  ShoppingCart,
  LogOut,
  Edit2,
} from "lucide-react";

interface UserData {
  type: "buyer" | "farmer";
  email: string;
  name: string;
  location?: string;
  phone?: string;
  farmName?: string;
  farmLocation?: string;
}

const Profile = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setFormData(parsed);
    } else {
      navigate("/auth");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleSave = () => {
    if (formData) {
      localStorage.setItem("user", JSON.stringify(formData));
      setUser(formData);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  if (!user) {
    return null;
  }

  const isFarmer = user.type === "farmer";

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Navbar />
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your {isFarmer ? "farmer" : "buyer"} account settings and preferences
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <div className="mt-4">
                <Badge variant={isFarmer ? "default" : "secondary"}>
                  {isFarmer ? "Farmer" : "Buyer"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Role:</span>
                  <span>{isFarmer ? "Farmer" : "Buyer"}</span>
                </div>
              </div>
              <Separator />
              <Button variant="outline" className="w-full" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{isFarmer ? "Farm Information" : "Account Information"}</CardTitle>
                <CardDescription>
                  {isFarmer
                    ? "Manage your farm details and listings"
                    : "Manage your personal information"}
                </CardDescription>
              </div>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData?.name || ""}
                      onChange={(e) =>
                        setFormData({ ...formData!, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData?.email || ""}
                      onChange={(e) =>
                        setFormData({ ...formData!, email: e.target.value })
                      }
                    />
                  </div>
                  {isFarmer ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="farmName">Farm Name</Label>
                        <Input
                          id="farmName"
                          value={formData?.farmName || ""}
                          onChange={(e) =>
                            setFormData({ ...formData!, farmName: e.target.value })
                          }
                          placeholder="Green Valley Farm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farmLocation">Farm Location</Label>
                        <Input
                          id="farmLocation"
                          value={formData?.farmLocation || ""}
                          onChange={(e) =>
                            setFormData({ ...formData!, farmLocation: e.target.value })
                          }
                          placeholder="City, State"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData?.location || ""}
                        onChange={(e) =>
                          setFormData({ ...formData!, location: e.target.value })
                        }
                        placeholder="City, State"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData?.phone || ""}
                      onChange={(e) =>
                        setFormData({ ...formData!, phone: e.target.value })
                      }
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Full Name</p>
                      <p className="text-sm text-muted-foreground">{user.name}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Separator />
                  {isFarmer ? (
                    <>
                      <div className="flex items-start gap-4">
                        <Store className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Farm Name</p>
                          <p className="text-sm text-muted-foreground">
                            {user.farmName || "Not set"}
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-start gap-4">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Farm Location</p>
                          <p className="text-sm text-muted-foreground">
                            {user.farmLocation || "Not set"}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">
                          {user.location || "Not set"}
                        </p>
                      </div>
                    </div>
                  )}
                  <Separator />
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Phone Number</p>
                      <p className="text-sm text-muted-foreground">
                        {user.phone || "Not set"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Info Cards */}
        <div className="grid gap-6 mt-6 md:grid-cols-2">
          {isFarmer ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  My Products
                </CardTitle>
                <CardDescription>Manage your product listings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View and manage all your product listings from here. Add new products, update
                  prices, and track your sales.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => navigate("/products")}>
                  View Products
                </Button>
                <Button variant="default" className="mt-4 ml-2" onClick={() => navigate("/orders")}>
                  Track Orders
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  My Orders
                </CardTitle>
                <CardDescription>View your purchase history</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track all your orders and purchase history. View order details, track
                  shipments, and manage returns.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate("/orders")}
                >
                  View Orders
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Cart
              </CardTitle>
              <CardDescription>View items in your cart</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {isFarmer
                  ? "Manage your inventory and stock levels."
                  : "Review items you've added to your cart before checkout."}
              </p>
              <Button variant="outline" className="mt-4" onClick={() => navigate("/cart")}>
                View Cart
              </Button>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

