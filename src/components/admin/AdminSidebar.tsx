import { 
  Home, 
  Package2, 
  ShoppingBag, 
  Users2, 
  Grid3x3, 
  LineChart, 
  Settings2, 
  ShoppingCart,
  Flag,
  MessageSquare,
  Star,
  DollarSign,
  Building2
} from "lucide-react";
import { NavLink } from "@/components/NavLink";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: Home, end: true },
  { title: "Products", url: "/admin/products", icon: Package2 },
  { title: "Orders", url: "/admin/orders", icon: ShoppingBag },
  { title: "Users", url: "/admin/users", icon: Users2 },
  { title: "Categories", url: "/admin/categories", icon: Grid3x3 },
  { title: "Flagged Content", url: "/admin/flagged", icon: Flag },
  { title: "Appeals", url: "/admin/appeals", icon: MessageSquare },
  { title: "Spotlight", url: "/admin/spotlight", icon: Star },
  { title: "Payouts", url: "/admin/payouts", icon: DollarSign },
  { title: "Business Verification", url: "/admin/verification", icon: Building2 },
  { title: "Analytics", url: "/admin/analytics", icon: LineChart },
  { title: "Settings", url: "/admin/settings", icon: Settings2 },
];

export function AdminSidebar() {
  return (
    <Sidebar className="border-r border-border bg-card">
      <SidebarHeader className="border-b border-border p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-driptyard flex items-center justify-center shadow-lg">
            <ShoppingCart className="h-5 w-5 text-white driptyard-icon" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="font-bold text-xl gradient-driptyard-text tracking-tight">DRIPTYARD</h2>
            <p className="text-xs text-muted-foreground font-medium">Admin Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.end}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-all text-foreground/70 hover:text-foreground"
                      activeClassName="gradient-driptyard text-white font-semibold shadow-md hover:text-white hover:opacity-90"
                    >
                      <item.icon className="h-5 w-5" strokeWidth={2} />
                      <span className="text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
