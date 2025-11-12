import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, CheckCircle, XCircle, Building2, FileText } from "lucide-react";
import { useState } from "react";

// Mock data
const mockVerifications = [
  {
    id: "1",
    businessName: "Sneaker Haven LLC",
    ownerName: "John Doe",
    email: "john@sneakerhaven.com",
    phone: "+1 (555) 123-4567",
    businessType: "LLC",
    taxId: "****5678",
    submittedDate: "2024-01-15",
    status: "pending",
    documents: ["Business License", "Tax ID", "Proof of Address"],
    description: "Authorized retailer of premium sneakers"
  },
  {
    id: "2",
    businessName: "Urban Streetwear Co",
    ownerName: "Jane Smith",
    email: "jane@urbanstreetwear.com",
    phone: "+1 (555) 987-6543",
    businessType: "Corporation",
    taxId: "****9012",
    submittedDate: "2024-01-14",
    status: "pending",
    documents: ["Articles of Incorporation", "Tax ID", "Operating Agreement"],
    description: "Wholesale streetwear distributor"
  },
];

const BusinessVerification = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = (id: string) => {
    console.log("Approving verification:", id);
    // TODO: Call API
  };

  const handleReject = (id: string) => {
    console.log("Rejecting verification:", id, "Reason:", rejectReason);
    // TODO: Call API
    setRejectReason("");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-driptyard bg-clip-text text-transparent">
            Business Verification
          </h1>
          <p className="text-muted-foreground">Review and approve business verification requests</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search verification requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4">
          {mockVerifications.map((verification) => (
            <Card key={verification.id}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-driptyard flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{verification.businessName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Owner: {verification.ownerName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Submitted: {verification.submittedDate}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {verification.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{verification.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{verification.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Business Type</p>
                      <p className="font-medium">{verification.businessType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tax ID</p>
                      <p className="font-medium">{verification.taxId}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-sm">{verification.description}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Submitted Documents</p>
                  <div className="flex flex-wrap gap-2">
                    {verification.documents.map((doc, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t">
                  <Textarea
                    placeholder="Add rejection reason (if applicable)..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="flex gap-2">
                    <Button
                      className="bg-gradient-driptyard hover:opacity-90"
                      onClick={() => handleApprove(verification.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Business
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReject(verification.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default BusinessVerification;
