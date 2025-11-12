import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-2xl gradient-driptyard flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-white" />
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
          className="gradient-driptyard text-white hover:opacity-90 text-lg px-8"
          onClick={() => navigate("/admin")}
        >
          Go to Admin Dashboard
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
