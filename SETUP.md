# Admin Panel Setup Guide

## Prerequisites
- Node.js 18+ installed
- Your backend running on AWS RDS PostgreSQL
- Admin user account in your database with `role = 'admin'`

## 1. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `VITE_API_BASE_URL` with your backend URL:

```env
VITE_API_BASE_URL=https://your-backend-domain.com
```

For local development:
```env
VITE_API_BASE_URL=http://localhost:8000
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Run Development Server

```bash
npm run dev
```

The admin panel will be available at `http://localhost:5173/admin/login`

## 4. Backend Requirements

### ✅ Already Implemented
Your backend already has these endpoints:
- `/auth/login` - Admin login
- `/auth/logout` - Logout
- `/users/me` - Get current user
- `/products/*` - Product management
- `/products/my-listings` - List seller products

### ⚠️ Missing Admin Endpoints

To complete Milestone 3 functionality, you need to implement these admin-specific endpoints (see `MISSING_ADMIN_APIS.md` for details):

**CRITICAL:**
1. Product Moderation:
   - `GET /admin/products/pending`
   - `POST /admin/products/{id}/approve`
   - `POST /admin/products/{id}/reject`

2. Flagged Content:
   - `GET /admin/flagged-content`
   - `POST /products/{id}/flag` (for users)
   - `POST /admin/flagged-content/{id}/approve`
   - `POST /admin/flagged-content/{id}/remove`

3. Spotlight Management:
   - `GET /admin/spotlight`
   - `POST /admin/products/{id}/spotlight`
   - `DELETE /admin/products/{id}/spotlight`

4. User Management:
   - `GET /admin/users`
   - `POST /admin/users/{id}/ban`
   - `POST /admin/users/{id}/unban`
   - `PATCH /admin/users/{id}`

5. Dashboard Stats:
   - `GET /admin/stats/overview`

## 5. Database Requirements

Ensure your `users` table has a `role` column:

```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'customer';
-- Valid roles: 'admin', 'seller', 'customer'

-- Create your first admin user:
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

## 6. Authentication Flow

1. User enters email/password at `/admin/login`
2. Frontend calls `POST /auth/login`
3. Backend validates credentials and returns:
   ```json
   {
     "access_token": "...",
     "refresh_token": "...",
     "user": {
       "id": "...",
       "email": "...",
       "role": "admin"  // MUST be "admin"
     }
   }
   ```
4. Frontend stores tokens in localStorage
5. All subsequent requests include `Authorization: Bearer {access_token}`
6. If user role is not "admin", login fails

## 7. API Client Usage

The `src/lib/api-client.ts` file handles all backend communication:

```typescript
import { apiClient } from '@/lib/api-client';

// Login
const response = await apiClient.login(email, password);

// Get current user
const user = await apiClient.getCurrentUser();

// Get products
const products = await apiClient.getProducts({ page: 1, page_size: 10 });

// Create product with images
const formData = new FormData();
formData.append('title', 'Product Name');
formData.append('images', file1);
formData.append('images', file2);
const product = await apiClient.createProduct(formData);
```

## 8. Next Steps

1. ✅ Set up your `.env` file
2. ✅ Create an admin user in your database
3. ⚠️ Implement missing admin endpoints (see MISSING_ADMIN_APIS.md)
4. ✅ Test login with admin credentials
5. ✅ Start using the admin panel!

## 9. Troubleshooting

### "Login failed" error
- Check if your backend is running
- Verify `VITE_API_BASE_URL` is correct
- Check browser console for error details
- Ensure user has `role = 'admin'` in database

### "Access denied" error
- User must have `role = 'admin'` in database
- Check `/auth/login` response includes correct role

### CORS errors
- Add CORS middleware to your backend
- Allow origin: `http://localhost:5173` for development
- Allow credentials: `true`

### Token refresh not working
- Ensure `/auth/refresh` endpoint is implemented
- Check refresh_token is stored in localStorage

## 10. Production Deployment

Before deploying to production:
1. Update `VITE_API_BASE_URL` to production backend URL
2. Build the project: `npm run build`
3. Deploy `dist` folder to your hosting service
4. Update CORS settings on backend to allow production domain
5. Use HTTPS for both frontend and backend

## Support

For issues or questions:
1. Check browser console for errors
2. Check network tab for failed API calls
3. Verify backend logs for errors
4. Review `MISSING_ADMIN_APIS.md` for required endpoints
