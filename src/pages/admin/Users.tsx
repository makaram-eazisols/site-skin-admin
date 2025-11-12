import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Filter, Ban, CheckCircle, Edit2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const users = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john@example.com", 
    role: "customer", 
    orders: 12, 
    joined: "2024-03-15",
    status: "active",
    verified: true,
    totalSales: "$2,450"
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    email: "jane@example.com", 
    role: "seller", 
    orders: 45, 
    joined: "2024-05-20",
    status: "active",
    verified: true,
    totalSales: "$8,920"
  },
  { 
    id: 3, 
    name: "Mike Johnson", 
    email: "mike@example.com", 
    role: "seller", 
    orders: 67, 
    joined: "2024-01-10",
    status: "banned",
    verified: false,
    totalSales: "$0"
  },
  { 
    id: 4, 
    name: "Sarah Williams", 
    email: "sarah@example.com", 
    role: "customer", 
    orders: 3, 
    joined: "2024-11-05",
    status: "active",
    verified: false,
    totalSales: "$1,200"
  },
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<any>(null);

  const handleBanUser = (userId: number) => {
    console.log("Banning user:", userId);
    // TODO: Call API
  };

  const handleVerifyUser = (userId: number) => {
    console.log("Verifying user:", userId);
    // TODO: Call API
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
  };

  const handleSaveUser = () => {
    console.log("Saving user:", editingUser);
    // TODO: Call API
    setEditingUser(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-driptyard-text">Users</h1>
            <p className="text-muted-foreground mt-1">Manage user accounts and permissions</p>
          </div>
          <Button className="gradient-driptyard-hover text-white shadow-md">
            <UserPlus className="h-4 w-4 mr-2" strokeWidth={2.5} />
            Add User
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search users..." 
                  className="pl-10 bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Total Sales</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="gradient-driptyard text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "destructive"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.verified ? (
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Not Verified</Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{user.totalSales}</TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Name</Label>
                                <Input 
                                  value={editingUser?.name || ""} 
                                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Email</Label>
                                <Input 
                                  value={editingUser?.email || ""} 
                                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Role</Label>
                                <Input 
                                  value={editingUser?.role || ""} 
                                  onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                                />
                              </div>
                              <Button onClick={handleSaveUser} className="w-full gradient-driptyard-hover text-white">
                                Save Changes
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        {!user.verified && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleVerifyUser(user.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {user.status !== "banned" && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleBanUser(user.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
