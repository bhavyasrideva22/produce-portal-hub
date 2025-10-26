import { Store, ShoppingBag, MessageSquare, Shield } from "lucide-react";

const features = [
  {
    icon: Store,
    title: "For Farmers",
    description: "List your products, manage inventory, and reach buyers directly without middlemen.",
    color: "primary"
  },
  {
    icon: ShoppingBag,
    title: "For Buyers",
    description: "Browse fresh produce, compare prices, and buy directly from verified farmers.",
    color: "accent"
  },
  {
    icon: MessageSquare,
    title: "Direct Communication",
    description: "Chat with farmers or buyers in real-time to discuss products and negotiate deals.",
    color: "secondary"
  },
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "Safe transactions, verified users, and quality assurance for every purchase.",
    color: "primary"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose AgroConnect?
          </h2>
          <p className="text-muted-foreground text-lg">
            A modern platform designed to empower farmers and provide buyers with fresh, quality produce.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all border group hover:border-primary/50"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
