'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setProducts } from '../store/features/productsSlice';
import { setCategories } from '../store/features/categoriesSlice';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const dispatch = useDispatch();
  const productsState = useSelector((state: RootState) => state.products);
  const categoriesState = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    // Initialize store with data
    dispatch(setProducts(products));
    dispatch(setCategories(categories));
  }, [dispatch]);

  if (productsState.loading || categoriesState.loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (productsState.error || categoriesState.error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Error loading products. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Our Store</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productsState.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
