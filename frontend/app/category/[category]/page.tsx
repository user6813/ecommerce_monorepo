'use client';

import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import ProductCard from '../../../components/ProductCard';

export default function CategoryPage() {
  const { category } = useParams();
  const products = useSelector((state: RootState) => state.products.products);
  const categories = useSelector((state: RootState) => state.categories.categories);
  
  // Find the category name from the slug
  const categoryName = categories.find(cat => 
    cat.toLowerCase().replace(/\s+/g, '-') === category
  );
  
  // Filter products by category
  const categoryProducts = products.filter(product => 
    product.category.toLowerCase() === categoryName?.toLowerCase()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {categoryName ? `${categoryName} Products` : 'Category Not Found'}
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