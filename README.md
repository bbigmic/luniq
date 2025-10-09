# E-Commerce Platform - Dark Theme

A modern, full-stack e-commerce platform built with Next.js 14, TypeScript, and PostgreSQL. Features a beautiful homepage, comprehensive admin panel, and complete authentication system.

**Latest Update**: Dark theme and products page added - Force deployment v3

## 🚀 Features

### Customer Features
- **Modern Homepage** - Beautiful, responsive design with hero section, featured products, and categories
- **Product Catalog** - Browse products by categories with search and filtering
- **Shopping Cart** - Add products to cart and manage quantities
- **User Authentication** - Sign up, sign in with email/password or Google OAuth
- **Order Management** - Track order status and history
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### Admin Features
- **Dashboard** - Overview of sales, orders, products, and users
- **Product Management** - Create, edit, delete products with variants and inventory tracking
- **Category Management** - Organize products with hierarchical categories
- **Order Management** - Process orders, update status, and track fulfillment
- **User Management** - View and manage customer accounts
- **Analytics** - Sales reports and performance metrics

### Technical Features
- **Next.js 14** - Latest React framework with App Router
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Modern, utility-first CSS framework
- **PostgreSQL** - Robust database with Neon cloud hosting
- **NextAuth.js** - Secure authentication with multiple providers
- **Drizzle ORM** - Type-safe database operations
- **Responsive Design** - Mobile-first approach with modern UI/UX

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Authentication**: NextAuth.js with Google OAuth
- **UI Components**: Radix UI, Lucide React Icons
- **Styling**: Tailwind CSS with custom design system

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   
   # Admin
   ADMIN_EMAIL="admin@example.com"
   ```

4. **Set up the database**
   - Create a Neon PostgreSQL database
   - Run the SQL schema from `database-schema.sql` in your Neon SQL Editor
   - Or use Drizzle migrations:
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### Using Neon (Recommended)

1. **Create a Neon account** at [neon.tech](https://neon.tech)
2. **Create a new project** and get your connection string
3. **Run the SQL schema** in the Neon SQL Editor:
   - Copy the contents of `database-schema.sql`
   - Paste and execute in the SQL Editor
4. **Update your `.env.local`** with the connection string

### Database Schema

The database includes the following tables:
- `users` - User accounts and authentication
- `categories` - Product categories (hierarchical)
- `products` - Product catalog with variants
- `product_variants` - Product variations (size, color, etc.)
- `orders` - Customer orders
- `order_items` - Individual items in orders
- `cart` - Shopping cart items

## 🔐 Authentication

The platform supports multiple authentication methods:

### Email/Password Authentication
- Users can sign up with email and password
- Passwords are hashed using bcrypt
- Secure session management with NextAuth.js

### Google OAuth (Optional)
- One-click sign-in with Google
- Configure in Google Cloud Console
- Add credentials to environment variables

### Admin Access
- Admin users have access to the admin panel
- Role-based access control
- Default admin account created with sample data

## 🎨 UI/UX Features

### Modern Design System
- **Color Scheme**: Professional blue and gray palette
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's design tokens
- **Components**: Reusable UI components with Radix UI primitives

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: Responsive design for all screen sizes
- **Touch-Friendly**: Large touch targets for mobile users
- **Performance**: Optimized images and lazy loading

### User Experience
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time form validation
- **Accessibility**: WCAG compliant components

## 📱 Pages & Routes

### Public Pages
- `/` - Homepage with hero, featured products, categories
- `/products` - Product catalog with filtering
- `/products/[slug]` - Individual product pages
- `/categories` - Category listing
- `/categories/[slug]` - Category product pages
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page

### Admin Pages
- `/admin` - Dashboard overview
- `/admin/products` - Product management
- `/admin/categories` - Category management
- `/admin/orders` - Order management
- `/admin/users` - User management
- `/admin/analytics` - Analytics and reports
- `/admin/settings` - System settings

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Other Platforms
- **Netlify**: Compatible with static export
- **Railway**: Full-stack deployment with database
- **DigitalOcean**: App Platform deployment

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate database migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
```

### Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── admin/          # Admin panel pages
│   ├── auth/           # Authentication pages
│   └── api/            # API routes
├── components/         # React components
│   ├── admin/          # Admin-specific components
│   ├── home/           # Homepage components
│   ├── layout/         # Layout components
│   └── ui/             # Reusable UI components
├── lib/                # Utility functions
│   ├── auth.ts         # Authentication configuration
│   ├── db/             # Database schema and connection
│   └── utils.ts        # Helper functions
└── types/              # TypeScript type definitions
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Neon](https://neon.tech/) - Serverless PostgreSQL
- [NextAuth.js](https://next-auth.js.org/) - Authentication

---

Built with ❤️ using modern web technologies
