'use client';

import Link from 'next/link';
import CartIcon from './CartIcon';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
            Ecommerce Store
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Home
            </Link>
            <Link href="/category/electronics" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Electronics
            </Link>
            <Link href="/category/clothing" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Clothing
            </Link>
            <Link href="/category/home-garden" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Home & Garden
            </Link>
            <Link href="/category/sports" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Sports
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Cart
            </Link>
          </nav>
          
          <CartIcon />
        </div>
      </div>
    </header>
  );
} 