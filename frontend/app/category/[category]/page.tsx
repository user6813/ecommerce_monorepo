'use client';

import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import ProductCard from '../../../components/ProductCard';

export default function CategoryPage() {
  const { category } = useParams();
  const products = useSelector((state: RootState) => state.products.products);
  const categories = useSelector((state: RootState) => state.categories.categories);
  
  // Find the category from the ID
  const categoryId = parseInt(category as string, 10);
  const categoryData = categories.find(cat => cat.id === categoryId);
  
  // Filter products by category ID
  const categoryProducts = products.filter(product => 
    product.categoryId === categoryId
  );

  return (
    <div className="container mx-auto px-4 py-8 text-[#000]">
      <h1 className="text-3xl font-bold mb-8">
        {categoryData ? `${categoryData.name} Products` : 'Category Not Found'}
      </h1>
      
      {categoryProducts.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
} 