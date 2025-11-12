import { createContext, useState, ReactNode } from "react";

// Types
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "banned";
  verified: boolean;
  joinDate: string;
  totalSales: string;
  orders: number;
}

export interface Product {
  id: string;
  title: string;
  seller: string;
  price: string;
  status: "active" | "pending" | "rejected";
  image: string;
  category?: string;
}

export interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
}

export interface FlaggedContent {
  id: string;
  type: "product" | "user";
  title: string;
  flaggedBy: string;
  reason: string;
  date: string;
  status: "pending" | "approved" | "removed";
  image: string;
}

export interface Appeal {
  id: string;
  productTitle: string;
  seller: string;
  reason: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  originalRejectionReason: string;
  evidence: string;
}

export interface PayoutRequest {
  id: string;
  seller: string;
  amount: string;
  method: string;
  accountDetails: string;
  requestedDate: string;
  status: "pending" | "approved" | "rejected";
  salesCount: number;
  period: string;
}

export interface BusinessVerification {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  businessType: string;
  taxId: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  documents: string[];
  description: string;
}

interface AdminContextType {
  users: AdminUser[];
  products: Product[];
  orders: Order[];
  flaggedContent: FlaggedContent[];
  appeals: Appeal[];
  payoutRequests: PayoutRequest[];
  businessVerifications: BusinessVerification[];
  
  // User actions
  banUser: (userId: string) => void;
  verifyUser: (userId: string) => void;
  updateUser: (userId: string, data: Partial<AdminUser>) => void;
  
  // Product actions
  approveProduct: (productId: string) => void;
  rejectProduct: (productId: string, reason: string) => void;
  
  // Flagged content actions
  approveFlaggedContent: (flagId: string) => void;
  removeFlaggedContent: (flagId: string) => void;
  
  // Appeal actions
  approveAppeal: (appealId: string) => void;
  rejectAppeal: (appealId: string, reason: string) => void;
  
  // Payout actions
  approvePayout: (payoutId: string) => void;
  rejectPayout: (payoutId: string, reason: string) => void;
  
  // Business verification actions
  approveBusinessVerification: (verificationId: string) => void;
  rejectBusinessVerification: (verificationId: string, reason: string) => void;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  // Mock data - will be replaced with API calls
  const [users, setUsers] = useState<AdminUser[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "customer",
      orders: 12,
      joinDate: "2024-03-15",
      status: "active",
      verified: true,
      totalSales: "$2,450"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "seller",
      orders: 45,
      joinDate: "2024-05-20",
      status: "active",
      verified: true,
      totalSales: "$8,920"
    },
  ]);

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [flaggedContent, setFlaggedContent] = useState<FlaggedContent[]>([]);
  const [appeals, setAppeals] = useState<Appeal[]>([]);
  const [payoutRequests, setPayoutRequests] = useState<PayoutRequest[]>([]);
  const [businessVerifications, setBusinessVerifications] = useState<BusinessVerification[]>([]);

  // User actions
  const banUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: "banned" as const } : user
    ));
    console.log("User banned:", userId);
    // TODO: Call API
  };

  const verifyUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, verified: true } : user
    ));
    console.log("User verified:", userId);
    // TODO: Call API
  };

  const updateUser = (userId: string, data: Partial<AdminUser>) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, ...data } : user
    ));
    console.log("User updated:", userId, data);
    // TODO: Call API
  };

  // Product actions
  const approveProduct = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, status: "active" as const } : product
    ));
    console.log("Product approved:", productId);
    // TODO: Call API
  };

  const rejectProduct = (productId: string, reason: string) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, status: "rejected" as const } : product
    ));
    console.log("Product rejected:", productId, reason);
    // TODO: Call API
  };

  // Flagged content actions
  const approveFlaggedContent = (flagId: string) => {
    setFlaggedContent(flaggedContent.map(item => 
      item.id === flagId ? { ...item, status: "approved" as const } : item
    ));
    console.log("Flagged content approved:", flagId);
    // TODO: Call API
  };

  const removeFlaggedContent = (flagId: string) => {
    setFlaggedContent(flaggedContent.map(item => 
      item.id === flagId ? { ...item, status: "removed" as const } : item
    ));
    console.log("Flagged content removed:", flagId);
    // TODO: Call API
  };

  // Appeal actions
  const approveAppeal = (appealId: string) => {
    setAppeals(appeals.map(appeal => 
      appeal.id === appealId ? { ...appeal, status: "approved" as const } : appeal
    ));
    console.log("Appeal approved:", appealId);
    // TODO: Call API
  };

  const rejectAppeal = (appealId: string, reason: string) => {
    setAppeals(appeals.map(appeal => 
      appeal.id === appealId ? { ...appeal, status: "rejected" as const } : appeal
    ));
    console.log("Appeal rejected:", appealId, reason);
    // TODO: Call API
  };

  // Payout actions
  const approvePayout = (payoutId: string) => {
    setPayoutRequests(payoutRequests.map(payout => 
      payout.id === payoutId ? { ...payout, status: "approved" as const } : payout
    ));
    console.log("Payout approved:", payoutId);
    // TODO: Call API
  };

  const rejectPayout = (payoutId: string, reason: string) => {
    setPayoutRequests(payoutRequests.map(payout => 
      payout.id === payoutId ? { ...payout, status: "rejected" as const } : payout
    ));
    console.log("Payout rejected:", payoutId, reason);
    // TODO: Call API
  };

  // Business verification actions
  const approveBusinessVerification = (verificationId: string) => {
    setBusinessVerifications(businessVerifications.map(verification => 
      verification.id === verificationId ? { ...verification, status: "approved" as const } : verification
    ));
    console.log("Business verification approved:", verificationId);
    // TODO: Call API
  };

  const rejectBusinessVerification = (verificationId: string, reason: string) => {
    setBusinessVerifications(businessVerifications.map(verification => 
      verification.id === verificationId ? { ...verification, status: "rejected" as const } : verification
    ));
    console.log("Business verification rejected:", verificationId, reason);
    // TODO: Call API
  };

  return (
    <AdminContext.Provider
      value={{
        users,
        products,
        orders,
        flaggedContent,
        appeals,
        payoutRequests,
        businessVerifications,
        banUser,
        verifyUser,
        updateUser,
        approveProduct,
        rejectProduct,
        approveFlaggedContent,
        removeFlaggedContent,
        approveAppeal,
        rejectAppeal,
        approvePayout,
        rejectPayout,
        approveBusinessVerification,
        rejectBusinessVerification,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
