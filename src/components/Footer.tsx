import { Link } from "react-router-dom";
import { Sprout, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <Sprout className="h-8 w-8" />
              <span>AgroConnect</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting farmers and buyers for a sustainable agricultural future.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">For Users</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">Farmer Login</Link></li>
              <li><Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">Buyer Login</Link></li>
              <li><Link to="/cart" className="text-muted-foreground hover:text-primary transition-colors">My Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                support@agroconnect.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Agriculture Hub, Farm Valley
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 AgroConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
