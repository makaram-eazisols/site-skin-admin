import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import Categories from "./pages/admin/Categories";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import FlaggedContent from "./pages/admin/FlaggedContent";
import Appeals from "./pages/admin/Appeals";
import Spotlight from "./pages/admin/Spotlight";
import Payouts from "./pages/admin/Payouts";
import BusinessVerification from "./pages/admin/BusinessVerification";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/flagged" element={<FlaggedContent />} />
          <Route path="/admin/appeals" element={<Appeals />} />
          <Route path="/admin/spotlight" element={<Spotlight />} />
          <Route path="/admin/payouts" element={<Payouts />} />
          <Route path="/admin/verification" element={<BusinessVerification />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
