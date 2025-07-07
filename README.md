# Ecommerce Monorepo

A full-stack ecommerce application with a NestJS backend, Next.js frontend, and comprehensive admin panel.

## 🚀 Features

### Backend (NestJS)
- **RESTful API** with Swagger documentation
- **Product Management** - CRUD operations for products
- **Category Management** - CRUD operations for categories
- **User Management** - Authentication and authorization system
- **Order Management** - Order processing and tracking
- **Database Integration** - PostgreSQL with TypeORM
- **Redis Integration** - Caching and session management
- **CORS Enabled** - Cross-origin resource sharing
- **API Documentation** - Swagger UI at `/api-docs`

### Frontend (Next.js)
- **Modern UI** - Built with Tailwind CSS
- **Product Catalog** - Display products with filtering
- **Shopping Cart** - Add/remove items with quantity management
- **Category Navigation** - Browse products by category
- **Responsive Design** - Mobile-first approach
- **State Management** - Redux Toolkit for global state

### Admin Panel
- **Dashboard** - Overview with statistics and quick actions
- **Product Management** - Create, edit, delete products
- **Category Management** - Create, edit, delete categories
- **User Management** - Manage user accounts and permissions
- **Order Management** - View and process orders
- **Modern Interface** - Clean, intuitive admin interface

## 🛠️ Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **PostgreSQL** - Relational database
- **TypeORM** - Object-relational mapping
- **Redis** - In-memory data store
- **Swagger** - API documentation
- **JWT** - Authentication tokens

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Lucide React** - Icon library

## 📁 Project Structure

```
ecommerce_monorepo/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── authentication/  # Auth system
│   │   ├── inventory/       # Products & categories
│   │   ├── order/          # Order management
│   │   ├── user/           # User management
│   │   └── common/         # Shared utilities
│   └── package.json
├── frontend/               # Next.js frontend
│   ├── app/               # App router pages
│   │   ├── admin/         # Admin panel pages
│   │   └── category/      # Category pages
│   ├── components/        # Reusable components
│   ├── services/          # API services
│   ├── store/             # Redux store
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL
- Redis (optional)

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the backend directory:
   ```env
   PORT=3001
   DATABASE_URL=postgresql://username:password@localhost:5432/ecommerce
   REDIS_URL=redis://localhost:6379
   JWT_SECRET=your-secret-key
   ```

3. **Database Setup:**
   ```bash
   # Create database
   createdb ecommerce
   
   # Run migrations (if using TypeORM migrations)
   npm run migration:run
   ```

4. **Start the backend:**
   ```bash
   npm run dev
   ```

   The backend will be available at `http://localhost:3001`
   API documentation at `http://localhost:3001/api-docs`

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Start the frontend:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## 📖 API Endpoints

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create new category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## 🔧 Admin Panel

Access the admin panel at `http://localhost:3000/admin`

### Features:
- **Dashboard** - Overview with key metrics
- **Products** - Manage product catalog
- **Categories** - Organize products by category
- **Users** - User account management
- **Orders** - Order processing and tracking

### Admin Actions:
- Create, edit, and delete products
- Manage product categories
- View order history
- Monitor inventory levels
- User management

## 🎨 Frontend Features

### Customer Features:
- Browse products by category
- Add items to shopping cart
- View product details
- Responsive design for all devices

### Shopping Cart:
- Add/remove items
- Update quantities
- Real-time price calculation
- Persistent cart state

## 🔒 Security

- CORS enabled for cross-origin requests
- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- SQL injection protection

## 🧪 Testing

### Backend Testing:
```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:cov      # Coverage report
```

### Frontend Testing:
```bash
cd frontend
npm run test          # Unit tests
npm run build         # Build test
```

## 📦 Deployment

### Backend Deployment:
1. Build the application:
   ```bash
   cd backend
   npm run build
   ```

2. Start production server:
   ```bash
   npm run start:prod
   ```

### Frontend Deployment:
1. Build the application:
   ```bash
   cd frontend
   npm run build
   ```

2. Start production server:
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the API documentation at `/api-docs`
- Review the code comments
- Open an issue on GitHub

---

**Happy coding! 🚀** 