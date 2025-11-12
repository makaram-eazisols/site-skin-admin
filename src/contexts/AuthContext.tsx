import { createContext, useState, useEffect, ReactNode } from "react";
import { apiClient } from "@/lib/api-client";

export interface User {
  id: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  name: string;
  email: string;
  role: "admin" | "seller" | "customer";
  is_admin?: boolean;
  avatar?: string;
  phone?: string;
  bio?: string;
  verified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const userData = await apiClient.getCurrentUser();
          // Map backend user data to frontend User type
          const mappedUser: User = {
            id: userData.user_id,
            username: userData.username,
            first_name: userData.first_name,
            last_name: userData.last_name,
            name: userData.first_name && userData.last_name 
              ? `${userData.first_name} ${userData.last_name}` 
              : userData.username || userData.email,
            email: userData.email,
            role: userData.role || "customer",
            is_admin: userData.is_admin,
            avatar: userData.avatar_url,
            phone: userData.phone,
            bio: userData.bio,
            verified: userData.verified,
          };
          setUser(mappedUser);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiClient.login(email, password);
      
      // Store tokens
      localStorage.setItem("access_token", response.access_token);
      if (response.refresh_token) {
        localStorage.setItem("refresh_token", response.refresh_token);
      }
      
      // Map backend user data to frontend User type
      const mappedUser: User = {
        id: response.user.user_id || response.user.id,
        username: response.user.username,
        first_name: response.user.first_name,
        last_name: response.user.last_name,
        name: response.user.first_name && response.user.last_name 
          ? `${response.user.first_name} ${response.user.last_name}` 
          : response.user.username || response.user.email,
        email: response.user.email,
        role: response.user.role || "customer",
        is_admin: response.user.is_admin,
        avatar: response.user.avatar_url,
        phone: response.user.phone,
        bio: response.user.bio,
        verified: response.user.verified,
      };
      
      // Check if user is admin
      if (!mappedUser.is_admin) {
        throw new Error("Access denied. Admin privileges required.");
      }
      
      setUser(mappedUser);
    } catch (error: any) {
      console.error("Login failed:", error);
      throw new Error(error.response?.data?.detail || error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (user) {
      try {
        await apiClient.updateProfile({
          username: userData.username,
          first_name: userData.first_name,
          last_name: userData.last_name,
          phone: userData.phone,
          bio: userData.bio,
        });
        
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
      } catch (error) {
        console.error("Update user failed:", error);
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
