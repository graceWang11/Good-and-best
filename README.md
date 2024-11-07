# Good and Best - Badminton Equipment E-commerce Platform

## Project Overview
Good and Best is a modern e-commerce platform specializing in badminton equipment and accessories. Built with Next.js 13, Convex backend, and Clerk authentication, this platform offers a seamless shopping experience for badminton enthusiasts and robust admin management capabilities.

### Key Features
- 🛍️ Product browsing and searching
- 🛒 Shopping cart functionality
- 👤 User authentication and profiles
- 📦 Order management
- 🎯 Admin dashboard with real-time analytics
- 📊 Inventory tracking
- 💳 Secure checkout process
- 📱 Responsive design

## System Architecture

### Frontend
- Next.js 13 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui for component library
- Recharts for analytics visualization

### Backend
- Convex for real-time database
- Clerk for authentication
- Real-time data synchronization
- Secure API endpoints

### Database Structure
- Products table with category management
- User profiles and authentication
- Order tracking system
- Inventory management
- Size management for shoes

## Admin Features
1. **Dashboard Overview**
   - Real-time sales analytics
   - Monthly revenue tracking
   - Customer growth metrics
   - Order statistics

2. **Product Management**
   - Add/Edit products
   - Category management
   - Stock tracking
   - Size management for shoes

3. **Order Management**
   - Order tracking by quarters
   - Order status updates
   - Detailed order views
   - Customer order history

4. **Customer Management**
   - Customer profiles
   - Order history
   - Customer analytics
   - Spending patterns

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/graceWang11/Good-and-best.git
cd good-and-best
cd 021
cd 021
```

2. Install dependencies:
```bash
npm install convex 
npm install @clerk/nextjs
```
3. Convex Setup:
- Login to Convex
- Create a new project 
- Configure your local project with Convex

4. Clerk Setup:
- Login to Clerk dashboard
- Set up authentication(Middleware.ts)
- create a new JWT template named Convex
- Configure JWT template

5. Configure Environment:
- For convex
  ```bash
  npx conex dev
  ```
  This will prompt you to log in with GitHub, create a project, and save your production and deployment URLs and also create a convex/ folder for you to write your backend API functions
- For Clerk
   Create a `.env.local` file in the root directory with:
   ```env
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_secret_key
   ```

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. In a separate terminal, start Convex:
```bash
npx convex dev
```

**Important**: Keep both terminals running while developing.


## Development Workflow

### Setting Up Development Environment
1. Configure Convex:
- Initialize product categories
- Set up user roles
- Configure inventory tracking
- Set up order management system

### Authentication Flow
1. User registration/login via Clerk
2. Role-based access control
3. Protected admin routes
4. Secure API endpoints

## Project Structure
```
src/
├── app/                 # Next.js app directory
│   ├── Admin/          # Admin dashboard components
│   │   ├── DashboardOverview
│   │   ├── ProductManagement
│   │   ├── OrderManagement
│   │   └── CustomerManagement
│   └── Components/     # Shared components
├── convex/             # Backend logic
│   ├── product.ts     # Product management
│   ├── order.ts       # Order processing
│   └── schema.ts      # Database schema
└── lib/               # Utility functions
```

## Application Structure

### Admin Dashboard Features
- Sales Analytics
- Product Management
- Order Management
- Customer Management
- Inventory Control
- User Authentication

### Customer Features
- Product Browsing
- Shopping Cart
- Order History
- Profile Management

## Development Guidelines

### Version Control
- Create feature branches
- Use descriptive commit messages
- Test before merging

### Code Style
- Follow TypeScript best practices
- Use consistent formatting
- Document complex functions

## Troubleshooting

Common issues and solutions:

1. Login Page Not Showing:
- Check Clerk credentials
- Verify middleware.ts location
- Confirm JWT template settings

2. Database Connection:
- Verify Convex configuration
- Check environment variables
- Ensure Convex dev is running

## Support

For support:
1. Check documentation
2. Review troubleshooting guide
3. Contact goodandbestteam@gmail.com


## Database Structure UML Diagram 
The following diagram represents the database architecture for the Good and Best e-commerce platform, focusing on badminton equipment. It defines key entities, their attributes, and the relationships that structure the system.

- Product: Central to the platform, the Product entity encapsulates essential details such as ProductID, Brand, Series, and Price. Each product is associated with a specific ProductCategory and is connected to the Stock, Size, and ImageStorage entities, ensuring detailed product representation and inventory management.

- ProductCategory: This entity categorizes products, allowing streamlined organization based on categories, facilitating efficient browsing and inventory segmentation.

- Size and Stock: The Size entity manages product sizing details (e.g., region-specific sizing), while the Stock entity monitors product availability through StockQuantity, enhancing inventory control.

- Order and OrderDetails: Orders are managed through the Order entity, which tracks details such as OrderDate, TotalAmount, and Status. The OrderDetails entity breaks down each order into individual product components, recording Quantity and Price, essential for accurate order processing and reporting.

- OrderHistory: This entity maintains a historical record of each order, tracking order-related events and changes.

- User and UserType: User information is captured in the User entity, with attributes for identification and contact details. UserType further refines roles and access permissions, supporting role-based functionalities (e.g., admin vs. customer).

- Reviews: The Reviews entity enables users to provide feedback on products through ratings and descriptions, enriching the user experience and supporting customer decision-making.

- ImageStorage: This entity links products to their respective images, enabling a visual representation in the platform.
![image](https://github.com/user-attachments/assets/c1a31cf1-2bed-42ee-93c3-93d641294c42)

## Prototyping

The following prototype illustrates the user interface and flow of the Good and Best platform. It showcases key user interactions and design elements for product browsing, cart management, checkout, and admin dashboards.

For a fully interactive prototype, please visit https://miro.com/app/board/uXjVKpKz9Ws=/


    
