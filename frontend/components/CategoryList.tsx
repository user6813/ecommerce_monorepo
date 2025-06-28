'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function CategoryList() {
  const categories = useSelector((state: RootState) => state.categories.categories);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-3">
        <Link 
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          All Products
        </Link>
        
        {categories.map((category) => (
          <Link
            key={category}
            href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
} 