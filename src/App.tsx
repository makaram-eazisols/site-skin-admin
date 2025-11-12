import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProviders } from "@/providers/AppProviders";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
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

const App = () => (
  <AppProviders>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
        <Route path="/admin/flagged" element={<ProtectedRoute><FlaggedContent /></ProtectedRoute>} />
        <Route path="/admin/appeals" element={<ProtectedRoute><Appeals /></ProtectedRoute>} />
        <Route path="/admin/spotlight" element={<ProtectedRoute><Spotlight /></ProtectedRoute>} />
        <Route path="/admin/payouts" element={<ProtectedRoute><Payouts /></ProtectedRoute>} />
        <Route path="/admin/verification" element={<ProtectedRoute><BusinessVerification /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AppProviders>
);

export default App;
