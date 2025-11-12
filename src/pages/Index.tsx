import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-20 h-20 rounded-2xl gradient-driptyard flex items-center justify-center shadow-2xl">
              <ShoppingCart className="h-10 w-10 text-white driptyard-icon" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-5xl font-bold gradient-driptyard-text">
            DRIPTYARD
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Welcome to your admin dashboard. Manage products, orders, and customers all in one place.
          </p>
        </div>
        
        <Button 
          size="lg" 
          className="gradient-driptyard-hover text-white text-lg px-8 shadow-lg"
          onClick={() => navigate("/admin")}
        >
          Go to Admin Dashboard
          <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2.5} />
        </Button>
      </div>
    </div>
  );
};

export default Index;
