import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users2, TrendingUp } from "lucide-react";

export default function Analytics() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold gradient-driptyard-text">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your store's performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">$45,231</h3>
                </div>
                <div className="w-12 h-12 rounded-xl gradient-driptyard flex items-center justify-center shadow-md">
                  <DollarSign className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Orders</p>
                  <h3 className="text-2xl font-bold mt-1">1,234</h3>
                </div>
                <div className="w-12 h-12 rounded-xl gradient-driptyard flex items-center justify-center shadow-md">
                  <ShoppingBag className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Customers</p>
                  <h3 className="text-2xl font-bold mt-1">8,549</h3>
                </div>
                <div className="w-12 h-12 rounded-xl gradient-driptyard flex items-center justify-center shadow-md">
                  <Users2 className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Growth</p>
                  <h3 className="text-2xl font-bold mt-1">+18.2%</h3>
                </div>
                <div className="w-12 h-12 rounded-xl gradient-driptyard flex items-center justify-center shadow-md">
                  <TrendingUp className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">Revenue Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center text-muted-foreground">
              Chart visualization would go here
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
