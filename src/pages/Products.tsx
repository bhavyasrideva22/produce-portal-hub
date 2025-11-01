import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Search,
  MapPin,
  ShoppingCart,
  Plus,
  Edit,
  Trash2,
  Package,
  Warehouse,
  TrendingUp,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  farmer: string;
  farmerId?: string;
  location: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  description?: string;
  stock?: number;
  sales?: number;
  orders?: number;
}

// Sample product data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Organic Tomatoes",
    farmer: "Green Valley Farm",
    location: "California",
    price: 3.99,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop",
    category: "Vegetables",
  },
  {
    id: 2,
    name: "Fresh Carrots",
    farmer: "Sunrise Acres",
    location: "Oregon",
    price: 2.49,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop",
    category: "Vegetables",
  },
  {
    id: 3,
    name: "Sweet Corn",
    farmer: "Harvest Hills",
    location: "Iowa",
    price: 4.99,
    unit: "dozen",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop",
    category: "Vegetables",
  },
  {
    id: 4,
    name: "Red Apples",
    farmer: "Orchard Estate",
    location: "Washington",
    price: 5.99,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
    category: "Fruits",
  },
  {
    id: 5,
    name: "Fresh Lettuce",
    farmer: "Green Leaf Co",
    location: "Arizona",
    price: 2.99,
    unit: "head",
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop",
    category: "Vegetables",
  },
  {
    id: 6,
    name: "Bell Peppers",
    farmer: "Sunny Fields",
    location: "Florida",
    price: 3.49,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop",
    category: "Vegetables",
  },
];

const Products = () => {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    unit: "lb",
    category: "Vegetables",
    image: "",
    description: "",
    stock: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
    }

    // Load farmer products from localStorage
    const farmerProducts = localStorage.getItem("farmerProducts");
    if (farmerProducts) {
      const parsed = JSON.parse(farmerProducts);
      setProducts([...sampleProducts, ...parsed]);
    }
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      price: "",
      unit: "lb",
      category: "Vegetables",
      image: "",
      description: "",
      stock: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      unit: product.unit,
      category: product.category,
      image: product.image,
      description: product.description || "",
      stock: product.stock?.toString() || "",
    });
    setIsDialogOpen(true);
  };

  const handleViewDetails = (product: Product) => {
    setViewingProduct(product);
    setIsDetailsDialogOpen(true);
  };

  const handleAddToCart = (product: Product) => {
    if (!currentUser || currentUser.type === "farmer") {
      toast({
        title: "Error",
        description: "Please login as a buyer to add items to cart.",
        variant: "destructive",
      });
      return;
    }

    // Get current cart from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      cartItems.push({
        id: product.id,
        name: product.name,
        farmer: product.farmer,
        price: product.price,
        quantity: 1,
        unit: product.unit,
        image: product.image,
        category: product.category,
      });
    }

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));
    
    // Dispatch event to update cart count in navbar
    window.dispatchEvent(new Event("cartUpdate"));

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleDeleteProduct = (productId: number) => {
    const updatedProducts = products.filter((p) => p.id !== productId);
    setProducts(updatedProducts);

    // Update localStorage
    const farmerProducts = updatedProducts.filter((p) => p.farmerId === currentUser?.email);
    localStorage.setItem("farmerProducts", JSON.stringify(farmerProducts));

    toast({
      title: "Product deleted",
      description: "Your product has been removed successfully.",
    });
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser || currentUser.type !== "farmer") {
      toast({
        title: "Error",
        description: "Only farmers can add products.",
        variant: "destructive",
      });
      return;
    }

    const newProduct: Product = {
      id: editingProduct
        ? editingProduct.id
        : Date.now() + Math.random(),
      name: productForm.name,
      farmer: currentUser.farmName || currentUser.name,
      farmerId: currentUser.email,
      location: currentUser.farmLocation || currentUser.location || "Location",
      price: parseFloat(productForm.price),
      unit: productForm.unit,
      category: productForm.category,
      image:
        productForm.image ||
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop",
      description: productForm.description,
      stock: productForm.stock ? parseInt(productForm.stock) : undefined,
      sales: editingProduct ? editingProduct.sales : 0,
      orders: editingProduct ? editingProduct.orders : 0,
    };

    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id ? newProduct : p
      );
      setProducts(updatedProducts);

      // Update localStorage
      const farmerProducts = updatedProducts.filter(
        (p) => p.farmerId === currentUser.email
      );
      localStorage.setItem("farmerProducts", JSON.stringify(farmerProducts));

      toast({
        title: "Product updated",
        description: "Your product has been updated successfully.",
      });
    } else {
      // Add new product
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);

      // Save to localStorage
      const farmerProducts = updatedProducts.filter(
        (p) => p.farmerId === currentUser.email
      );
      localStorage.setItem("farmerProducts", JSON.stringify(farmerProducts));

      toast({
        title: "Product added",
        description: "Your product has been added successfully.",
      });
    }

    setIsDialogOpen(false);
    setProductForm({
      name: "",
      price: "",
      unit: "lb",
      category: "Vegetables",
      image: "",
      description: "",
      stock: "",
    });
  };

  const isFarmer = currentUser?.type === "farmer";
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Fresh Products</h1>
            <p className="text-muted-foreground">Browse quality produce directly from local farmers</p>
          </div>
          {isFarmer && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddProduct} size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingProduct
                      ? "Update your product information"
                      : "Fill in the details to add your product to the marketplace"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitProduct} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">
                      Product Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="product-name"
                      placeholder="e.g., Organic Tomatoes"
                      value={productForm.name}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">
                        Price <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={productForm.price}
                        onChange={(e) =>
                          setProductForm({ ...productForm, price: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">
                        Unit <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={productForm.unit}
                        onValueChange={(value) =>
                          setProductForm({ ...productForm, unit: value })
                        }
                      >
                        <SelectTrigger id="unit">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lb">lb</SelectItem>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="piece">piece</SelectItem>
                          <SelectItem value="dozen">dozen</SelectItem>
                          <SelectItem value="bunch">bunch</SelectItem>
                          <SelectItem value="head">head</SelectItem>
                          <SelectItem value="box">box</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">
                      Stock Quantity (optional)
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      placeholder="e.g., 100"
                      value={productForm.stock}
                      onChange={(e) =>
                        setProductForm({ ...productForm, stock: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Current available stock for this product
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={productForm.category}
                      onValueChange={(value) =>
                        setProductForm({ ...productForm, category: value })
                      }
                    >
                      <SelectTrigger id="category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vegetables">Vegetables</SelectItem>
                        <SelectItem value="Fruits">Fruits</SelectItem>
                        <SelectItem value="Grains">Grains</SelectItem>
                        <SelectItem value="Dairy">Dairy</SelectItem>
                        <SelectItem value="Herbs">Herbs</SelectItem>
                        <SelectItem value="Nuts">Nuts</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL (optional)</Label>
                    <Input
                      id="image"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={productForm.image}
                      onChange={(e) =>
                        setProductForm({ ...productForm, image: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty to use default image
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your product..."
                      value={productForm.description}
                      onChange={(e) =>
                        setProductForm({ ...productForm, description: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingProduct ? "Update Product" : "Add Product"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Product Details Dialog */}
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {viewingProduct && (
              <>
                <DialogHeader>
                  <DialogTitle>Product Details</DialogTitle>
                  <DialogDescription>
                    Complete information about the product
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Product Image */}
                  <div className="relative h-64 w-full overflow-hidden rounded-lg">
                    <img
                      src={viewingProduct.image}
                      alt={viewingProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-primary">
                      {viewingProduct.category}
                    </Badge>
                  </div>

                  {/* Product Name and Price */}
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{viewingProduct.name}</h2>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">
                        ${viewingProduct.price.toFixed(2)}
                      </span>
                      <span className="text-lg text-muted-foreground">
                        / {viewingProduct.unit}
                      </span>
                    </div>
                  </div>

                  {/* Farmer Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Package className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Farmer</p>
                        <p className="font-semibold">{viewingProduct.farmer}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-semibold">{viewingProduct.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stock Information (if available) */}
                  {viewingProduct.stock !== undefined && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Warehouse className="h-5 w-5 text-primary" />
                          <span className="font-semibold">Available Stock</span>
                        </div>
                        <span className={`text-lg font-bold ${viewingProduct.stock < 10 ? 'text-destructive' : 'text-foreground'}`}>
                          {viewingProduct.stock} {viewingProduct.unit}
                          {viewingProduct.stock < 10 && (
                            <AlertCircle className="inline h-4 w-4 ml-1" />
                          )}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Statistics (if available) */}
                  {(viewingProduct.sales !== undefined || viewingProduct.orders !== undefined) && (
                    <div className="grid grid-cols-2 gap-4">
                      {viewingProduct.orders !== undefined && (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Total Orders</span>
                          </div>
                          <p className="text-2xl font-bold">{viewingProduct.orders}</p>
                        </div>
                      )}
                      {viewingProduct.sales !== undefined && (
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Total Sales</span>
                          </div>
                          <p className="text-2xl font-bold">
                            {viewingProduct.sales} {viewingProduct.unit}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  {viewingProduct.description ? (
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {viewingProduct.description}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground italic">
                        No description available for this product.
                      </p>
                    </div>
                  )}

                  {/* Close Button */}
                  <div className="flex justify-end pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsDetailsDialogOpen(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <MapPin className="mr-2 h-4 w-4" />
            Location
          </Button>
          <Button variant="outline">Filter</Button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isOwnProduct = isFarmer && product.farmerId === currentUser?.email;
              return (
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
                      {isOwnProduct && (
                        <Badge className="absolute top-3 left-3 bg-green-600">
                          <Package className="mr-1 h-3 w-3" />
                          My Product
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3" />
                      {product.farmer} • {product.location}
                    </div>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground">/ {product.unit}</span>
                    </div>
                    {isOwnProduct && (
                      <div className="space-y-2 mb-3 p-3 bg-muted/50 rounded-md">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <Warehouse className="h-4 w-4" />
                            Stock:
                          </span>
                          <span className={`font-semibold ${product.stock !== undefined && product.stock < 10 ? 'text-destructive' : 'text-foreground'}`}>
                            {product.stock !== undefined ? product.stock : 'N/A'} {product.unit}
                            {product.stock !== undefined && product.stock < 10 && (
                              <AlertCircle className="inline h-4 w-4 ml-1" />
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <BarChart3 className="h-4 w-4" />
                            Orders:
                          </span>
                          <span className="font-semibold">{product.orders || 0}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <TrendingUp className="h-4 w-4" />
                            Sales:
                          </span>
                          <span className="font-semibold">{product.sales || 0} {product.unit}</span>
                        </div>
                      </div>
                    )}
                    {product.description && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="p-4 pt-0 gap-2">
                    {isOwnProduct ? (
                      <>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          className="flex-1"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </>
                    ) : (
                      <>
                        {!isFarmer && (
                          <>
                            <Button 
                              className="flex-1" 
                              variant="outline"
                              onClick={() => handleViewDetails(product)}
                            >
                              View Details
                            </Button>
                            <Button 
                              className="flex-1"
                              onClick={() => handleAddToCart(product)}
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Add to Cart
                            </Button>
                          </>
                        )}
                        {isFarmer && (
                          <Button 
                            className="flex-1" 
                            variant="outline"
                            onClick={() => handleViewDetails(product)}
                          >
                            View Details
                          </Button>
                        )}
                      </>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Try adjusting your search query"
                : "No products available at the moment"}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;
