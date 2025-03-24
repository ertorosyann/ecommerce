# Prisma + Node.js TypeScript REST API

A production-ready e-commerce backend with JWT authentication, product management, order processing, and cart functionality.

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/project-in-prisma-and-node.js-ts.git
   cd project-in-prisma-and-node.js-ts

2. Install dependencies:
    ```bash
   npm install

3. Configure environment:
    ```bash
    cp .env.example .env
    # Update .env with your 

4. Run database migrations:
    ```bash
    npx prisma migrate dev

5. Start the server:
    ```bash
    npm start

📚 API Documentation
   🔐 Authentication
   
      POST /auth/signup: Register a new user.
      
      POST /auth/login: Log in and receive a JWT token.
      
      GET /auth/me: Get the current user's profile.
   
   🛍️ Products
   
      POST /products: Create a new product (Admin only).
      
      PUT /products/:id: Update a product by ID (Admin only).
      
      DELETE /products/:id: Delete a product by ID (Admin only).
      
      GET /products: List all products (Admin only).
      
      GET /products/search: Search for products by name, description, or tags.
      
      GET /products/:id: Get a product by ID.
   
   👥 Users
   
      POST /users/address: Add a new address (Admin only).
      
      DELETE /users/address/:id: Delete an address by ID.
      
      GET /users/address: List all addresses for the user.
      
      PUT /users: Update user information.
      
      PUT /users/:id/role: Change the user's role to admin (Admin only).
      
      GET /users: List all users (Admin only).
      
      GET /users/:id: Get a user by ID (Admin only).
   
   🛒 Cart
   
      POST /carts: Add an item to the cart.
      
      GET /carts: Get the current user's cart.
      
      DELETE /carts/:id: Delete an item from the cart.
      
      PUT /carts/:id: Update the quantity of a cart item.
   
   📦 Orders
   
      POST /orders: Create a new order.
      
      GET /orders: List all orders for the user.
      
      PUT /orders/:id/cancel: Cancel an order.
      
      GET /orders/index: List all orders for admins.
      
      GET /orders/users/:id: List orders for a specific user (Admin only).
      
      PUT /orders/:id/status: Change the status of an order (Admin only).
      
      GET /orders/:id: Get an order by ID.
   
🗄️ Database Models

   User
   
      id (Integer): Unique user ID.
      
      name (String): User's name.
      
      email (String): Unique email address.
      
      password (String): User's password (hashed).
      
      role (Role): User's role (ADMIN, USER).
      
      defaultShippingAddress (Integer): ID of the default shipping address.
      
      defaultBillingAddress (Integer): ID of the default billing address.
   
   Address
   
      id (Integer): Unique address ID.
      
      lineOne (String): Address line 1.
      
      lineTwo (String): Address line 2 (optional).
      
      city (String): City.
      
      country (String): Country.
      
      pincode (String): Postal code.
   
   Product
   
      id (Integer): Unique product ID.
      
      name (String): Product name.
      
      description (String): Product description.
      
      price (Integer): Price of the product.
      
      tags (String): Tags for the product.
   
   CartItem
   
      id (Integer): Unique cart item ID.
      userId (Integer): User who owns the cart.
      productId (Integer): Product in the cart.
      quantity (Integer): Quantity of the product in the cart.
   
   Order
   
      id (Integer): Unique order ID.
      userId (Integer): User who placed the order.
      netAmount (Decimal): Total amount for the order.
      address (String): Shipping address for the order.
      status (OrderEventStatus): Status of the order (PENDING, ACCEPTED, etc.).
   
   OrderProduct
   
      id (Integer): Unique order product ID.
      orderId (Integer): Associated order ID.
      productId (Integer): Associated product ID.
      quantity (Integer): Quantity of the product in the order.
   
   OrderEvent
   
      id (Integer): Unique order event ID.
      orderId (Integer): Associated order ID.
      status (OrderEventStatus): Current status of the order (PENDING, DELIVERED, etc.).
      address (String): Address for the event.

📦 Environment-Variables

   DATABASE_URL="mysql://user:password@localhost:3306/dbname"
   
   JWT_SECRET="your_jwt_secret_here"

   PORT=3000
