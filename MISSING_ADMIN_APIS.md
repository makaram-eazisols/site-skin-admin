# Missing Admin APIs for Milestone 3

Based on your current API structure, here are the **admin-specific endpoints** needed to complete Milestone 3 functionality:

---

## 🔐 1. Admin Authentication & Authorization

### Current Gap:
- Your `/auth/login` endpoint exists, but we need to verify if it returns user **role** information
- Need to ensure only users with `role: "admin"` can access admin endpoints

### Required Changes:
```
GET /auth/login response should include:
{
  "access_token": "...",
  "refresh_token": "...",
  "user": {
    "id": "...",
    "email": "...",
    "username": "...",
    "role": "admin" | "seller" | "customer"  // ← THIS IS CRITICAL
  }
}
```

**OR** create a separate admin login:
```
POST /admin/login
- Same as /auth/login but specifically checks for admin role
- Returns 403 if user is not an admin
```

---

## 🛍️ 2. Product Moderation (CRITICAL)

These endpoints are **essential** for the product verification workflow:

```
GET /admin/products/pending
- List all products with status "verification_pending"
- Query params: page, page_size, search, sort
- Response: Paginated list of products awaiting approval

POST /admin/products/{product_id}/approve
- Approve a product (change status to "active")
- Body: { "notes": "optional admin notes" }
- Sends notification email to seller

POST /admin/products/{product_id}/reject
- Reject a product (change status to "rejected")
- Body: { "reason": "reason for rejection", "notes": "..." }
- Sends rejection email to seller
- Removes from public feed
```

---

## 🚩 3. Flagged Content Management (CRITICAL)

These endpoints handle content moderation:

```
GET /admin/flagged-content
- List all flagged products/content
- Query params: page, page_size, status (pending/resolved), type
- Response: List of flagged items with flag details

POST /products/{product_id}/flag (for regular users)
- Allow users to flag inappropriate content
- Body: { "reason": "spam|inappropriate|fake|other", "details": "..." }
- Creates flagged_content record

POST /admin/flagged-content/{flag_id}/approve
- Approve flagged content (dismiss the flag, keep product active)
- Body: { "notes": "admin notes" }

POST /admin/flagged-content/{flag_id}/remove
- Remove flagged content (delete/deactivate product)
- Body: { "reason": "...", "notes": "..." }
- Sends notification to product owner
```

**Suggested Database Schema:**
```sql
CREATE TABLE flagged_content (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  flagged_by UUID REFERENCES users(id),
  reason VARCHAR(50), -- spam, inappropriate, fake, other
  details TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, removed
  admin_notes TEXT,
  created_at TIMESTAMP,
  resolved_at TIMESTAMP,
  resolved_by UUID REFERENCES users(id)
);
```

---

## ⭐ 4. Spotlight/Featured Products (CRITICAL)

Endpoints to manage manually featured/boosted products:

```
GET /admin/spotlight
- List all products currently in spotlight
- Response: Products with spotlight metadata (duration, views, etc.)

POST /admin/products/{product_id}/spotlight
- Add product to spotlight/featured section
- Body: { "duration_days": 7, "position": 1 }
- Makes product appear in featured section

DELETE /admin/products/{product_id}/spotlight
- Remove product from spotlight

PATCH /admin/products/{product_id}/spotlight
- Update spotlight settings
- Body: { "duration_days": 14, "position": 2 }
```

**Suggested Database Schema:**
```sql
CREATE TABLE product_spotlight (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id) UNIQUE,
  added_by UUID REFERENCES users(id), -- admin who added it
  duration_days INTEGER,
  position INTEGER, -- display order
  views INTEGER DEFAULT 0,
  started_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP
);
```

---

## 👥 5. User Management (CRITICAL)

Endpoints for admin to manage users:

```
GET /admin/users
- List all users with filters
- Query params: page, page_size, role, status (active/banned), verified, search
- Response: Paginated user list

GET /admin/users/{user_id}
- Get detailed user info including sales, listings, reports
- Response: User profile + stats

POST /admin/users/{user_id}/ban
- Ban a user (prevent login, hide listings)
- Body: { "reason": "...", "duration_days": 30 } // null for permanent
- Sends email notification

POST /admin/users/{user_id}/unban
- Unban a previously banned user

PATCH /admin/users/{user_id}
- Update user details (admin override)
- Body: { "role": "seller", "verified": true, ... }

POST /admin/users/{user_id}/verify
- Manually verify a user (business verification)
- Body: { "notes": "admin notes" }
```

**Suggested Database Changes:**
```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS banned BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS ban_reason TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS ban_expires_at TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT FALSE;
```

---

## 📊 6. Dashboard Statistics (OPTIONAL but NICE)

Endpoints to power the admin dashboard:

```
GET /admin/stats/overview
- Get overview statistics
- Response: {
    "total_users": 1234,
    "total_products": 567,
    "pending_verifications": 23,
    "flagged_items": 5,
    "active_spotlight": 10,
    "revenue_today": 1234.56
  }

GET /admin/stats/products
- Product-related stats (by category, status, etc.)

GET /admin/stats/users
- User-related stats (growth, active users, etc.)
```

---

## 🔔 7. Notifications/Emails (IMPORTANT)

Ensure your backend sends emails for:
- ✅ Product approved → Notify seller
- ✅ Product rejected → Notify seller with reason
- ✅ User banned → Notify user
- ✅ Content flagged → Notify product owner
- ✅ Spotlight added → Notify seller

---

## 🎯 Priority Implementation Order

### **MUST HAVE (for Milestone 3):**
1. ✅ Product moderation endpoints (approve/reject)
2. ✅ Flagged content endpoints
3. ✅ Spotlight management endpoints
4. ✅ User ban/unban endpoints
5. ✅ Admin role check in auth

### **SHOULD HAVE:**
6. ⭐ Dashboard stats endpoint
7. ⭐ Admin user listing with filters

### **NICE TO HAVE:**
8. 💡 Activity logs/audit trail
9. 💡 Bulk actions (bulk approve/reject)

---

## 📝 Summary

You have a **solid foundation** with auth, users, and products endpoints. 

To complete Milestone 3, you need to add:
- **5 critical admin routers** (moderation, flagged content, spotlight, user management, stats)
- **Role-based access control** (ensure admin role is returned in auth)
- **Email notifications** for moderation actions

Let me know once you've created these endpoints, and I'll integrate them into the frontend! 🚀
