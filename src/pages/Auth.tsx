import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout } from "lucide-react";
import { Link } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<"farmer" | "buyer">("buyer");

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
                <form className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="buyer@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="City, State" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                      </div>
                    </>
                  )}
                  <Button type="submit" className="w-full">
                    {isLogin ? "Sign In as Buyer" : "Create Buyer Account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="farmer">
                <form className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="farmer-name">Full Name</Label>
                      <Input id="farmer-name" placeholder="John Doe" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="farmer-email">Email</Label>
                    <Input id="farmer-email" type="email" placeholder="farmer@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmer-password">Password</Label>
                    <Input id="farmer-password" type="password" />
                  </div>
                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="farm-name">Farm Name</Label>
                        <Input id="farm-name" placeholder="Green Valley Farm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farm-location">Farm Location</Label>
                        <Input id="farm-location" placeholder="City, State" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farmer-phone">Phone Number</Label>
                        <Input id="farmer-phone" type="tel" placeholder="+1 (555) 000-0000" />
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
