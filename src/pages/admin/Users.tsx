import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Ban, CheckCircle, Edit2, Trash2, UserCheck, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  phone?: string;
  country?: string;
  bio?: string;
  is_active: boolean;
  is_verified: boolean;
  is_banned: boolean;
  is_admin: boolean;
  created_at: string;
}

export default function Users() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getAdminUsers({
        page: currentPage,
        page_size: 10,
        search: searchTerm || undefined,
        exclude_admins: true,
      });
      // Filter out admins on client side as well
      const nonAdminUsers = data.users.filter((user: User) => !user.is_admin);
      setUsers(nonAdminUsers);
      setTotalPages(data.total_pages);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (userId: string, isBanned: boolean) => {
    try {
      if (isBanned) {
        await apiClient.unbanAdminUser(userId);
        toast({
          title: "Success",
          description: "User has been unbanned",
        });
      } else {
        await apiClient.banAdminUser(userId);
        toast({
          title: "Success",
          description: "User has been banned",
        });
      }
      fetchUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  const handleVerifyUser = async (userId: string, isVerified: boolean) => {
    try {
      await apiClient.updateAdminUser(userId, {
        is_verified: !isVerified,
      });
      toast({
        title: "Success",
        description: isVerified ? "User verification removed" : "User has been verified",
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update verification status",
        variant: "destructive",
      });
    }
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setIsEditDialogOpen(true);
  };

  const handleSaveUser = async () => {
    if (!editUser) return;

    try {
      await apiClient.updateAdminUser(editUser.id, {
        is_active: editUser.is_active,
        is_verified: editUser.is_verified,
      });
      toast({
        title: "Success",
        description: "User has been updated",
      });
      setIsEditDialogOpen(false);
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteUserId) return;

    try {
      await apiClient.deleteAdminUser(deleteUserId);
      toast({
        title: "Success",
        description: "User has been deleted",
      });
      setDeleteUserId(null);
      fetchUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  const getStatusBadgeVariant = (user: User) => {
    if (user.is_banned) return "destructive";
    if (!user.is_active) return "secondary";
    if (!user.is_verified) return "outline";
    return "default";
  };

  const getStatusText = (user: User) => {
    if (user.is_banned) return "Banned";
    if (!user.is_active) return "Inactive";
    if (!user.is_verified) return "Unverified";
    return "Active";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-driptyard-text">Users</h1>
            <p className="text-muted-foreground mt-1">Manage user accounts and permissions</p>
          </div>
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
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                {user.avatar_url && <AvatarImage src={user.avatar_url} />}
                                <AvatarFallback className="gradient-driptyard text-white">
                                  {user.first_name?.[0]?.toUpperCase()}{user.last_name?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase() || 'U'}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.first_name} {user.last_name}</div>
                                <div className="text-xs text-muted-foreground">@{user.username}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{user.email}</TableCell>
                          <TableCell className="text-muted-foreground">{user.phone || '-'}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(user)}>
                              {getStatusText(user)}
                            </Badge>
                          </TableCell>
                          <TableCell>{format(new Date(user.created_at), 'MMM dd, yyyy')}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleVerifyUser(user.id, user.is_verified)}
                                className={user.is_verified ? "text-green-600" : "text-muted-foreground"}
                              >
                                <UserCheck className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleBanUser(user.id, user.is_banned)}
                                className={user.is_banned ? "text-orange-600" : "text-red-600"}
                              >
                                <Ban className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setDeleteUserId(user.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {editUser && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="is-active">Active</Label>
                <Switch
                  id="is-active"
                  checked={editUser.is_active}
                  onCheckedChange={(checked) =>
                    setEditUser({ ...editUser, is_active: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="is-verified">Verified</Label>
                <Switch
                  id="is-verified"
                  checked={editUser.is_verified}
                  onCheckedChange={(checked) =>
                    setEditUser({ ...editUser, is_verified: checked })
                  }
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setEditUser(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveUser} className="gradient-driptyard-hover text-white">
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this user and all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
