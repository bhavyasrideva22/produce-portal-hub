import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sprout,
  ShoppingCart,
  Users,
  TrendingUp,
  Shield,
  Truck,
  Heart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Better Prices",
      description: "Farmers get fair prices, buyers get competitive rates without middleman markup",
    },
    {
      icon: Truck,
      title: "Direct Delivery",
      description: "Fresh produce delivered directly from farm to your doorstep",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Buy directly from the source, ensuring freshness and quality",
    },
    {
      icon: Heart,
      title: "Support Local",
      description: "Support local farmers and sustainable agriculture practices",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Farmers List Products",
      description: "Farmers create profiles and list their fresh produce directly on the platform",
      icon: Sprout,
    },
    {
      step: "2",
      title: "Buyers Browse & Shop",
      description: "Buyers explore products, compare prices, and add items to their cart",
      icon: ShoppingCart,
    },
    {
      step: "3",
      title: "Direct Connection",
      description: "Our platform connects buyers directly with farmers, eliminating middlemen",
      icon: Users,
    },
    {
      step: "4",
      title: "Fresh Delivery",
      description: "Products are shipped directly from farm to buyer, ensuring maximum freshness",
      icon: Truck,
    },
  ];

  const problems = [
    "High prices due to multiple middlemen",
    "Reduced farmer profits",
    "Long supply chains reducing freshness",
    "Limited transparency in sourcing",
    "Difficult for small farmers to reach buyers",
  ];

  const solutions = [
    "Direct farmer-to-buyer connections",
    "Fair pricing for both parties",
    "Fresh produce delivered quickly",
    "Transparent sourcing and farming practices",
    "Empowering small and local farmers",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              About AgroConnect
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Bridging the Gap Between Farmers and Buyers
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              AgroConnect is a revolutionary platform that connects farmers directly with buyers,
              eliminating middlemen and creating a more transparent, fair, and efficient
              agricultural marketplace.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/products">
                  Explore Products <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">The Problem We're Solving</h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  Traditional agricultural supply chains are complicated, with multiple intermediaries
                  between farmers and end consumers. This system creates several problems:
                </p>
                <ul className="space-y-3">
                  {problems.map((problem, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-destructive mt-1">×</span>
                      <span className="text-muted-foreground">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Our Solution</CardTitle>
                  <CardDescription>
                    Direct connections that benefit everyone
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {solutions.map((solution, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A simple, transparent process that connects farmers directly with buyers
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index} className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-primary/10 p-2 rounded-bl-lg">
                      <span className="text-2xl font-bold text-primary">{step.step}</span>
                    </div>
                    <CardHeader className="pt-8">
                      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{step.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Benefits for Everyone</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform creates value for both farmers and buyers
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{benefit.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Direct Connection Emphasis */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader className="text-center">
                <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl mb-4">Direct Farmer-to-Buyer Connection</CardTitle>
                <CardDescription className="text-lg">
                  No Middlemen. No Markups. Just Fresh Produce.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-background rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Sprout className="h-5 w-5 text-primary" />
                      For Farmers
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Sell directly to buyers at fair prices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Reach a wider customer base</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Reduce dependency on intermediaries</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Build direct relationships with customers</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                      For Buyers
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Buy fresh produce directly from farmers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Get better prices without middleman fees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Ensure product quality and freshness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Support local and sustainable farming</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="pt-4 text-center">
                  <Button asChild size="lg">
                    <Link to="/products">
                      Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              At AgroConnect, we believe in creating a more sustainable and fair agricultural
              ecosystem. By removing the middleman and connecting farmers directly with buyers, we
              empower farmers to earn fair prices while ensuring buyers receive fresh, quality
              produce at competitive rates. Our platform bridges the gap in the agricultural supply
              chain, making it easier for everyone to participate in a transparent, efficient, and
              mutually beneficial marketplace.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/auth">Join Us Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

