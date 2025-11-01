import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Default test credentials
const DEFAULT_CREDENTIALS = {
  buyer: {
    email: "buyer@example.com",
    password: "password123",
  },
  farmer: {
    email: "farmer@example.com",
    password: "password123",
  },
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<"farmer" | "buyer">("buyer");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Buyer form state
  const [buyerForm, setBuyerForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    phone: "",
  });

  // Farmer form state
  const [farmerForm, setFarmerForm] = useState({
    name: "",
    email: "",
    password: "",
    farmName: "",
    farmLocation: "",
    phone: "",
  });

  const handleBuyerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login
      if (
        buyerForm.email === DEFAULT_CREDENTIALS.buyer.email &&
        buyerForm.password === DEFAULT_CREDENTIALS.buyer.password
      ) {
        const userData = {
          type: "buyer",
          email: buyerForm.email,
          name: "Buyer User",
        };
        localStorage.setItem("user", JSON.stringify(userData));
        window.dispatchEvent(new Event("userLogin"));
        toast({
          title: "Success!",
          description: "Logged in as buyer successfully.",
        });
        navigate("/profile");
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password. Use buyer@example.com / password123",
          variant: "destructive",
        });
      }
    } else {
      // Sign up
      if (!buyerForm.name || !buyerForm.email || !buyerForm.password) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      const userData = {
        type: "buyer",
        email: buyerForm.email,
        name: buyerForm.name,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      window.dispatchEvent(new Event("userLogin"));
      toast({
        title: "Success!",
        description: "Buyer account created successfully.",
      });
      navigate("/profile");
    }
  };

  const handleFarmerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login
      if (
        farmerForm.email === DEFAULT_CREDENTIALS.farmer.email &&
        farmerForm.password === DEFAULT_CREDENTIALS.farmer.password
      ) {
        const userData = {
          type: "farmer",
          email: farmerForm.email,
          name: "Farmer User",
        };
        localStorage.setItem("user", JSON.stringify(userData));
        window.dispatchEvent(new Event("userLogin"));
        toast({
          title: "Success!",
          description: "Logged in as farmer successfully.",
        });
        navigate("/profile");
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password. Use farmer@example.com / password123",
          variant: "destructive",
        });
      }
    } else {
      // Sign up
      if (!farmerForm.name || !farmerForm.email || !farmerForm.password) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      const userData = {
        type: "farmer",
        email: farmerForm.email,
        name: farmerForm.name,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      window.dispatchEvent(new Event("userLogin"));
      toast({
        title: "Success!",
        description: "Farmer account created successfully.",
      });
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl text-primary mb-4">
            <Sprout className="h-8 w-8" />
            <span>AgroConnect</span>
          </Link>
          <p className="text-muted-foreground">
            {isLogin ? "Welcome back!" : "Create your account"}
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>{isLogin ? "Sign In" : "Sign Up"}</CardTitle>
            <CardDescription>
              {isLogin 
                ? "Enter your credentials to access your account" 
                : "Create an account to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="buyer" className="w-full" onValueChange={(v) => setUserType(v as "farmer" | "buyer")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="buyer">I'm a Buyer</TabsTrigger>
                <TabsTrigger value="farmer">I'm a Farmer</TabsTrigger>
              </TabsList>
              
              <TabsContent value="buyer">
                <form className="space-y-4" onSubmit={handleBuyerSubmit}>
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={buyerForm.name}
                        onChange={(e) => setBuyerForm({ ...buyerForm, name: e.target.value })}
                        required={!isLogin}
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="buyer@example.com"
                      value={buyerForm.email}
                      onChange={(e) => setBuyerForm({ ...buyerForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={buyerForm.password}
                      onChange={(e) => setBuyerForm({ ...buyerForm, password: e.target.value })}
                      required
                    />
                    {isLogin && (
                      <p className="text-xs text-muted-foreground">
                        Demo: {DEFAULT_CREDENTIALS.buyer.email} / {DEFAULT_CREDENTIALS.buyer.password}
                      </p>
                    )}
                  </div>
                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="City, State"
                          value={buyerForm.location}
                          onChange={(e) => setBuyerForm({ ...buyerForm, location: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={buyerForm.phone}
                          onChange={(e) => setBuyerForm({ ...buyerForm, phone: e.target.value })}
                        />
                      </div>
                    </>
                  )}
                  <Button type="submit" className="w-full">
                    {isLogin ? "Sign In as Buyer" : "Create Buyer Account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="farmer">
                <form className="space-y-4" onSubmit={handleFarmerSubmit}>
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="farmer-name">Full Name</Label>
                      <Input
                        id="farmer-name"
                        placeholder="John Doe"
                        value={farmerForm.name}
                        onChange={(e) => setFarmerForm({ ...farmerForm, name: e.target.value })}
                        required={!isLogin}
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="farmer-email">Email</Label>
                    <Input
                      id="farmer-email"
                      type="email"
                      placeholder="farmer@example.com"
                      value={farmerForm.email}
                      onChange={(e) => setFarmerForm({ ...farmerForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmer-password">Password</Label>
                    <Input
                      id="farmer-password"
                      type="password"
                      value={farmerForm.password}
                      onChange={(e) => setFarmerForm({ ...farmerForm, password: e.target.value })}
                      required
                    />
                    {isLogin && (
                      <p className="text-xs text-muted-foreground">
                        Demo: {DEFAULT_CREDENTIALS.farmer.email} / {DEFAULT_CREDENTIALS.farmer.password}
                      </p>
                    )}
                  </div>
                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="farm-name">Farm Name</Label>
                        <Input
                          id="farm-name"
                          placeholder="Green Valley Farm"
                          value={farmerForm.farmName}
                          onChange={(e) => setFarmerForm({ ...farmerForm, farmName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farm-location">Farm Location</Label>
                        <Input
                          id="farm-location"
                          placeholder="City, State"
                          value={farmerForm.farmLocation}
                          onChange={(e) => setFarmerForm({ ...farmerForm, farmLocation: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farmer-phone">Phone Number</Label>
                        <Input
                          id="farmer-phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={farmerForm.phone}
                          onChange={(e) => setFarmerForm({ ...farmerForm, phone: e.target.value })}
                        />
                      </div>
                    </>
                  )}
                  <Button type="submit" className="w-full">
                    {isLogin ? "Sign In as Farmer" : "Create Farmer Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm">
              {isLogin ? (
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <button 
                    onClick={() => setIsLogin(false)}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <button 
                    onClick={() => setIsLogin(true)}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
