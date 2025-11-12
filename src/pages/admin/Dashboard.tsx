import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users2, Package2, TrendingUp, Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const recentOrders = [
  { id: "ORD001", customer: "John Doe", product: "Luxury Watch", amount: "$1,299", status: "completed" },
  { id: "ORD002", customer: "Jane Smith", product: "Designer Shirt", amount: "$89", status: "pending" },
  { id: "ORD003", customer: "Mike Johnson", product: "Sneakers", amount: "$159", status: "processing" },
  { id: "ORD004", customer: "Sarah Williams", product: "Handbag", amount: "$449", status: "completed" },
  { id: "ORD005", customer: "Tom Brown", product: "Sunglasses", amount: "$199", status: "pending" },
];

const topProducts = [
  { name: "Luxury Watch Collection", sales: 234, revenue: "$304,866" },
  { name: "Designer Shoes", sales: 189, revenue: "$30,051" },
  { name: "Premium Shirts", sales: 156, revenue: "$13,884" },
  { name: "Fashion Accessories", sales: 142, revenue: "$28,400" },
];

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold gradient-driptyard-text">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value="$45,231"
            change="+20.1%"
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Total Orders"
            value="1,234"
            change="+12.5%"
            icon={ShoppingBag}
            trend="up"
          />
          <StatCard
            title="Total Users"
            value="8,549"
            change="+8.2%"
            icon={Users2}
            trend="up"
          />
          <StatCard
            title="Total Products"
            value="345"
            change="-2.4%"
            icon={Package2}
            trend="down"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-bold">
                <ShoppingBag className="h-5 w-5 text-primary" strokeWidth={2.5} />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "default"
                              : order.status === "pending"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-bold">
                <TrendingUp className="h-5 w-5 text-accent" strokeWidth={2.5} />
                Top Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg gradient-driptyard flex items-center justify-center">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-current text-accent" />
                          {product.sales} sales
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{product.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
