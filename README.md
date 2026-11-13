# Ecommerce Application

A production-style, full-stack e-commerce platform built on the MERN stack. It implements three distinct user roles (customer, seller, admin) with role-based access control, real Stripe payment processing, cloud-based image hosting, and a cookie + Redis-backed JWT authentication system.

This project was built end-to-end — from database schema design and REST API architecture to the React frontend and third-party integrations — to demonstrate a complete, working understanding of modern web development.

---

## Table of Contents

- [What This Project Demonstrates](#what-this-project-demonstrates)
- [Tech Stack](#tech-stack)
- [Architecture & How It Was Built](#architecture--how-it-was-built)
- [Technical Highlights](#technical-highlights)
- [Security Practices](#security-practices)
- [Features by Role](#features-by-role)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation & Setup](#installation--setup)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Authentication & Authorization](#authentication--authorization)
- [Payment Flow](#payment-flow)

---

## What This Project Demonstrates

This is more than a CRUD app. It reflects a working knowledge of:

- **Full-stack architecture** — designing a REST API, modeling data in MongoDB, and consuming it from a React SPA
- **Authentication engineering** — cookie-based JWT auth with access/refresh token separation and Redis-backed token storage
- **Role-based authorization** — a reusable middleware pattern that gates routes by user role
- **Payment integration** — end-to-end Stripe Checkout flow with webhook-free order verification and idempotency
- **Cloud integration** — Cloudinary for product image upload and delivery
- **State management** — a single React Context provider handling auth, products, cart, and orders across the app
- **Security awareness** — HttpOnly cookies, bcrypt password hashing, input validation, and CORS configuration

---

## Tech Stack

**Backend**

| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM with schema validation |
| Redis (ioredis) | Refresh token storage (Upstash) |
| JSON Web Tokens (JWT) | Stateless access & refresh tokens |
| Stripe | Payment processing (Checkout Sessions) |
| Cloudinary | Product image hosting |
| bcrypt | Password hashing |
| cookie-parser | HttpOnly cookie handling |

**Frontend**

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| React Router DOM | Client-side routing |
| Axios | HTTP client |
| React Hot Toast | User notifications |
| Lucide React / React Icons | Icon libraries |
| @stripe/stripe-js | Stripe client SDK |

---

## Architecture & How It Was Built

### Backend (Layered Express API)

The backend follows a clean separation of concerns:

```
Request → Router → Middleware (auth) → Controller → Model (Mongoose) → Response
```

- **Routes** define the URL structure and which middleware/handlers apply to each.
- **Middleware** (`authMiddleware.js`) handles two concerns: `isLoggedIn` verifies the JWT access token from the cookie and attaches the user to `req.user`, and `authorizeRoles(...roles)` gates routes by role. These are composable, so any route can be protected by chaining `isLoggedIn` + `authorizeRoles('seller', 'admin')`.
- **Controllers** contain the business logic and are kept independent of routing concerns.
- **Models** define Mongoose schemas with field-level validation (required, min length, enum constraints, ObjectId refs).
- **Config** centralizes all third-party SDK setup (MongoDB, Redis, Cloudinary, Stripe) so credentials and clients are initialized in one place.

### Why cookie-based JWT instead of localStorage?

Access and refresh tokens are stored in **HttpOnly cookies**, which JavaScript running in the browser cannot read. This protects against XSS-based token theft — a common vulnerability when tokens are stored in `localStorage`. The `sameSite: "lax"` and `secure` (in production) flags further harden the cookies.

### Why Redis for refresh tokens?

Refresh tokens are persisted in Redis keyed by user ID with a 7-day TTL. This allows the server to:
- Invalidate a session immediately on logout (delete from Redis + clear cookies)
- Track active sessions per user
- Decouple token validity from the stateless access token

### Frontend (React SPA with Context-based state)

The frontend uses a single `GlobalContext` provider that wraps the entire app and exposes three context slices:
- `authContext` — user info, login state, auth check
- `productContext` — products, cart, orders, product CRUD
- `adminContext` — admin-only order management

This avoids prop drilling while keeping related state grouped. Protected routes are handled by a `ProtectedRoute` wrapper component that checks `isAuthReady` (the async auth-check flag) and `isUserLoggedIn` before rendering the page, redirecting to `/login` otherwise.

### Deployment-Ready Single-Server Build

The Express server serves the built React app from `frontend/dist` in production via a static middleware and a catch-all route that returns `index.html` for client-side routing. This means the entire app can run from one server in production while keeping separate dev servers during development.

---

## Technical Highlights

### Nested Mongoose Population

Order retrieval uses chained population to resolve the full data graph in a single query:

```javascript
const orders = await orderModel.find()
    .populate("userId")
    .populate({
        path: "products.product",
        populate: {
            path: "seller",
            model: "user"
        }
    });
```

This resolves `order → user (buyer)`, `order → product`, and `product → user (seller)` in one call, so the frontend gets a fully denormalized order object without N+1 queries.

### Stripe Payment Flow with Idempotency

After a successful Stripe checkout, the backend verifies the payment by retrieving the session directly from Stripe (server-side) before creating an order. A `stripeSessionId` unique constraint on the order model prevents duplicate order creation if the success callback fires more than once — a lightweight idempotency safeguard.

### Cart as an Embedded Document

The cart is stored as an embedded array on the user document (`cartItems: [{ product, productQty }]`) rather than a separate collection. This is a deliberate modeling choice: carts are always read with their owning user, don't need independent querying, and the embedded pattern avoids extra joins. Product details are populated on demand via `populate("cartItems.product")`.

### Toggle-to-Add/Remove Cart

The `addToCart` endpoint acts as a toggle — if the product is already in the cart, it removes it; if not, it adds it. This simplifies the frontend to a single button that handles both states.

### Stock Auto-Deduction on Purchase

When a payment succeeds, the backend iterates the purchased products and decrements stock on each product document. This keeps inventory accurate in real time without requiring a separate inventory service.

### Role-Based Route Protection (Backend + Frontend)

Both layers enforce authorization:
- Backend: `authorizeRoles('admin')` on routes like `GET /orders/getAll` rejects non-admins with a 403.
- Frontend: admin users are automatically routed to the admin dashboard instead of the home page, and admin-only pages render sidebar navigation to Products, Orders, and Customers management views.

---

## Security Practices

- **HttpOnly cookies** for both access and refresh tokens — not readable by client-side JS
- **bcrypt** password hashing with a salt factor of 10
- **`secure` flag** on cookies in production (`process.env.NODE_ENV === "production"`)
- **`sameSite: "lax"`** to mitigate CSRF
- **CORS configured** with a specific allowed origin and `credentials: true`
- **Input validation** at the Mongoose schema level (required fields, min length, enum for roles and categories)
- **`.env` excluded** from version control via `.gitignore`
- **Role checks** on every sensitive route via middleware, not just on the frontend

---

## Features by Role

### Customer
- Register and log in
- Browse products on the home page, filter by category
- View product details
- Add to / remove from cart, update quantities
- Checkout via Stripe (card payments)
- View order history

### Seller
- Everything a customer can do, plus:
- Add products with image upload (Cloudinary)
- View, edit, and delete their own products
- Stock auto-reduces after successful purchases

### Admin
- Dedicated dashboard with sidebar navigation
- View and manage all platform products (block/unblock)
- View all orders across the platform, delete orders
- View all registered users
- Auto-redirected to dashboard on login

---

## Project Structure

```
Ecommerce-Application/
├── .env                          # Environment variables (not committed)
├── package.json                  # Root scripts (dev, start, build)
├── backend/
│   ├── server.js                 # Express app entry point
│   ├── config/                   # SDK & connection setup
│   │   ├── cloudinaryConfig.js
│   │   ├── dbConnection.js
│   │   ├── redisConfig.js
│   │   └── stripeConfig.js
│   ├── controllers/              # Business logic
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   └── productController.js
│   ├── middlewares/
│   │   └── authMiddleware.js     # isLoggedIn + authorizeRoles
│   ├── models/                   # Mongoose schemas
│   │   ├── adminModel.js
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes/                   # Route definitions
│   │   ├── authRouter.js
│   │   ├── cartRouter.js
│   │   ├── orderRouter.js
│   │   ├── paymentRouter.js
│   │   └── productRouter.js
│   └── ulits/                    # Auth utilities
│       ├── getToken.js           # JWT token generation
│       └── setTokenOnRedis.js    # Redis token set/remove
└── frontend/
    ├── index.html
    ├── package.json
    ├── public/
    └── src/
        ├── main.jsx              # App entry (BrowserRouter + GlobalContext)
        ├── App.jsx               # Routes & layout
        ├── context/
        │   └── GlobalContext.jsx # Global state provider
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── Herosection.jsx
        │   ├── FeaturedProducts.jsx
        │   ├── CategorySection.jsx
        │   ├── Sidebar.jsx
        │   ├── BuyerDetails.jsx
        │   ├── SellersDetails.jsx
        │   └── ToggelBtn.jsx
        └── pages/                # Route-level views
            ├── Home.jsx
            ├── Signup.jsx
            ├── LoginPage.jsx
            ├── Cart.jsx
            ├── Category.jsx
            ├── ProductDetails.jsx
            ├── Orders.jsx
            ├── AddProduct.jsx
            ├── EditProduct.jsx
            ├── PurchaseSuccess.jsx
            ├── PurchaseCancel.jsx
            ├── AdminPanel.jsx
            ├── AdminDashBoard.jsx
            ├── AdminProducts.jsx
            ├── AdminOrders.jsx
            ├── AdminCustomers.jsx
            ├── AdminCategories.jsx
            ├── AdminFeedback.jsx
            └── PageNotFound.jsx
```

---

## Prerequisites

- **Node.js** v18 or higher
- **npm** (comes with Node.js)
- A **MongoDB** database (Atlas or local)
- A **Redis** instance (the project uses Upstash Redis via a connection URL)
- A **Cloudinary** account (for image uploads)
- A **Stripe** account (for payment processing)

---

## Environment Variables

Create a `.env` file in the **project root** with the following variables. Fill in your own values:

```env
# Server
PORT=5000

# MongoDB
MONGODB_URL=your_mongodb_connection_string

# JWT secrets (use strong random strings in production)
JWT_KEY_AT=your_access_token_secret
JWT_KEY_RT=your_refresh_token_secret

# Redis
REDIS_URL=your_redis_connection_url

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# Frontend URL (used for Stripe redirect URLs)
CLIENT_URL=http://localhost:5173

# Platform admin credentials (for admin login)
PLATFORM_OWNER_EMAIL=your_admin_email
PLATFORM_OWNER_PASSWORD=your_admin_password
```

> **Important:** Never commit your `.env` file to version control. It is listed in `.gitignore`.

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/rajan18236/Ecommerce-Application.git
cd Ecommerce-Application
```

### 2. Install backend dependencies

The backend dependencies live in the root `package.json`:

```bash
npm install
```

### 3. Install frontend dependencies

```bash
npm install --prefix frontend
```

### 4. Configure environment variables

Create the `.env` file in the project root as described in [Environment Variables](#environment-variables).

### 5. Run the development servers

**Backend** (from project root):

```bash
npm run dev
```

This starts the Express server with nodemon on the port defined in `.env` (default 5000).

**Frontend** (in a separate terminal):

```bash
npm run dev --prefix frontend
```

This starts the Vite dev server (default http://localhost:5173).

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start backend with nodemon |
| `npm start` | Start backend without nodemon |
| `npm run build` | Install all deps and build the frontend for production |
| `npm run dev --prefix frontend` | Start the Vite dev server |
| `npm run build --prefix frontend` | Build the frontend into `frontend/dist` |
| `npm run lint --prefix frontend` | Run ESLint on the frontend |

---

## API Endpoints

All routes are prefixed with `/api`.

### Auth (`/api/auth`)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/me` | `isLoggedIn` | Get current logged-in user |
| POST | `/register` | Public | Register a new user |
| POST | `/login` | Public | Log in (sets cookies) |
| POST | `/logout` | `isLoggedIn` | Log out (clears cookies & Redis token) |
| GET | `/clearCartItems` | `isLoggedIn` | Empty the user's cart |
| GET | `/getUsers` | `admin` | List all registered users |

### Products (`/api/product`)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/getAll` | Public | List all products |
| POST | `/create` | `seller` | Create a new product (uploads image to Cloudinary) |
| GET | `/my-products` | `seller` | List products created by the logged-in seller |
| DELETE | `/delete/:productId` | `seller`, `admin` | Delete a product |
| PUT | `/edit` | `seller`, `admin` | Edit a product |
| GET | `/:productId` | `seller`, `admin` | Get a single product by ID |
| GET | `/category/:category` | Public | List products by category |
| PATCH | `/disable` | `admin` | Enable/disable (block) a product |

### Cart (`/api/cart`)

| Method | Path | Auth | Description |
|---|---|---|---|
| PUT | `/addToCart` | `isLoggedIn` | Add to cart (toggles — removes if already in cart) |
| DELETE | `/removeFromCart` | `isLoggedIn` | Remove a specific cart item |
| GET | `/getAllCartItems` | `isLoggedIn` | Get all cart items (populated with product details) |
| PATCH | `/updateCart` | `isLoggedIn` | Update cart item quantity |

### Orders (`/api/orders`)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/my-orders` | `isLoggedIn` | Get orders for the logged-in user |
| GET | `/getAll` | `admin` | Get all orders across the platform |
| DELETE | `/delete/:orderId` | `admin` | Delete an order |

### Payments (`/api/payments`)

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/create-checkout-session` | `isLoggedIn` | Create a Stripe checkout session and redirect to Stripe |
| POST | `/checkout-success` | `isLoggedIn` | Verify payment and create an order |

---

## Database Models

### User (`userModel`)

| Field | Type | Notes |
|---|---|---|
| `fullName` | String | Required |
| `email` | String | Required, unique, lowercased |
| `password` | String | Required, min 6 chars, hashed with bcrypt |
| `cartItems` | Array | Embedded array of `{ product, productQty }` |
| `role` | String | `customer`, `seller`, or `admin` (default: `customer`) |

### Product (`productModel`)

| Field | Type | Notes |
|---|---|---|
| `productName` | String | Required |
| `stock` | Number | Required |
| `price` | Number | Required, min 0 |
| `description` | String | Optional |
| `image` | String | Required, Cloudinary URL |
| `category` | String | Enum of predefined categories (default: `Others`) |
| `isFeatured` | Boolean | Default `false` |
| `seller` | ObjectId → `user` | Required |
| `isBlocked` | Boolean | Default `false`, set by admin |

### Order (`orderModel`)

| Field | Type | Notes |
|---|---|---|
| `userId` | ObjectId → `user` | Required |
| `products` | Array | `{ product, productQty, price }` |
| `totalAmount` | Number | Required, min 0 |
| `stripeSessionId` | String | Unique, links to Stripe session |
| `date` | Date | Default `Date.now` |

### Admin (`adminModel`)

| Field | Type | Notes |
|---|---|---|
| `fullName` | String | Required |
| `email` | String | Required, unique |
| `password` | String | Required, hashed |
| `productItems` | Array | Array of product ObjectIds |
| `role` | String | Default `admin` |

---

## Authentication & Authorization

The app uses **cookie-based JWT authentication** with two tokens:

1. **Access token** — stored in an HttpOnly cookie (`accessToken`), signed with `JWT_KEY_AT`. Verified on every protected request via the `isLoggedIn` middleware.
2. **Refresh token** — stored in an HttpOnly cookie (`refreshToken`), signed with `JWT_KEY_RT`, and persisted in Redis keyed by user ID with a 7-day expiry.

**Role-based access control** is handled by the `authorizeRoles(...roles)` middleware. It checks `req.user.role` against the allowed roles for each route. The three roles are:

- **customer** — default role, can shop and place orders
- **seller** — can create and manage their own products
- **admin** — can manage all products, orders, and users

---

## Payment Flow

1. The customer adds items to their cart and clicks checkout.
2. The frontend calls `POST /api/payments/create-checkout-session` with the cart items.
3. The backend builds Stripe line items, embeds order metadata (user ID + product list), and returns a Stripe checkout URL.
4. The customer is redirected to Stripe's hosted checkout page.
5. On success, Stripe redirects to `/purchase-success?session_id={CHECKOUT_SESSION_ID}`.
6. The frontend calls `POST /api/payments/checkout-success` with the session ID.
7. The backend retrieves the session from Stripe, verifies `payment_status === "paid"`, creates an order in the database, and decrements product stock.

If the customer cancels, they are redirected to `/purchase-cancel`.
