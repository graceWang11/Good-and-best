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
git clone [repository-url]
cd good-and-best
```

2. Install dependencies:
```bash
npm install convex dotenv
npm install @clerk/nextjs
```

3. Configure Environment:
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

### Development Setup

1. Convex Setup:
- Login to Convex
- Create a new project named "021"
- Configure your local project with Convex

2. Clerk Setup:
- Login to Clerk dashboard
- Set up authentication
- Configure JWT template

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
3. Contact development team

## Contributing

1. Fork the repository
2. Create feature branch
3. Submit pull request

## License

MIT License - see LICENSE file

## Acknowledgments

- Next.js team
- Convex team
- Clerk team
- Project contributors
```

This README now includes:
1. Complete setup instructions
2. Detailed feature lists
3. Troubleshooting guide
4. Development guidelines
5. Support information
6. Clear structure
7. All necessary commands
8. Environment setup details
9. More detailed system architecture
10. Database structure overview
11. Comprehensive admin features breakdown
12. Detailed project structure
13. Authentication flow explanation
14. Development workflow details
```

    
