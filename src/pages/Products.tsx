import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Search, MapPin, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample product data
const products = [
  {
    id: 1,
    name: "Organic Tomatoes",
    farmer: "Green Valley Farm",
    location: "California",
    price: 3.99,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop",
    category: "Vegetables"
  },
  {
    id: 2,
    name: "Fresh Carrots",
    farmer: "Sunrise Acres",
    location: "Oregon",
    price: 2.49,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop",
    category: "Vegetables"
  },
  {
    id: 3,
    name: "Sweet Corn",
    farmer: "Harvest Hills",
    location: "Iowa",
    price: 4.99,
    unit: "dozen",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop",
    category: "Vegetables"
  },
  {
    id: 4,
    name: "Red Apples",
    farmer: "Orchard Estate",
    location: "Washington",
    price: 5.99,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
    category: "Fruits"
  },
  {
    id: 5,
    name: "Fresh Lettuce",
    farmer: "Green Leaf Co",
    location: "Arizona",
    price: 2.99,
    unit: "head",
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop",
    category: "Vegetables"
  },
  {
    id: 6,
    name: "Bell Peppers",
    farmer: "Sunny Fields",
    location: "Florida",
    price: 3.49,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop",
    category: "Vegetables"
  }
];

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Fresh Products</h1>
          <p className="text-muted-foreground">Browse quality produce directly from local farmers</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <MapPin className="mr-2 h-4 w-4" />
            Location
          </Button>
          <Button variant="outline">Filter</Button>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-primary">
                    {product.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  {product.farmer} • {product.location}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">${product.price}</span>
                  <span className="text-sm text-muted-foreground">/ {product.unit}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 gap-2">
                <Button className="flex-1" variant="outline">
                  View Details
                </Button>
                <Button className="flex-1">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
