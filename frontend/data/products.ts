export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: 89.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    description: "High-quality wireless headphones with noise cancellation"
  },
  {
    id: 2,
    title: "Smartphone Case",
    price: 24.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1603314585442-ee3b3c16fbcf?w=400&h=400&fit=crop",
    description: "Durable protective case for smartphones"
  },
  {
    id: 3,
    title: "Cotton T-Shirt",
    price: 19.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    description: "Comfortable cotton t-shirt in various colors"
  },
  {
    id: 4,
    title: "Denim Jeans",
    price: 59.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    description: "Classic denim jeans with perfect fit"
  },
  {
    id: 5,
    title: "Coffee Mug",
    price: 12.99,
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    description: "Ceramic coffee mug with elegant design"
  },
  {
    id: 6,
    title: "Garden Plant Pot",
    price: 15.99,
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
    description: "Beautiful ceramic plant pot for indoor plants"
  },
  {
    id: 7,
    title: "Running Shoes",
    price: 79.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    description: "Comfortable running shoes for all terrains"
  },
  {
    id: 8,
    title: "Yoga Mat",
    price: 29.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    description: "Non-slip yoga mat for home workouts"
  },
  {
    id: 9,
    title: "Laptop Stand",
    price: 34.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
    description: "Adjustable laptop stand for better ergonomics"
  },
  {
    id: 10,
    title: "Desk Lamp",
    price: 45.99,
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    description: "Modern LED desk lamp with adjustable brightness"
  }
]; 