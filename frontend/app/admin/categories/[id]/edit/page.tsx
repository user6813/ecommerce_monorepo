'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CategoryForm from '../../../../../components/CategoryForm';
import { categoryApi, Category } from '../../../../../services/api';

export default function EditCategoryPage() {
  const params = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryId = parseInt(params.id as string, 10);
        const response = await categoryApi.getById(categoryId);
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category:', error);
        setError('Failed to load category');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCategory();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {error || 'Category not found'}
        </h3>
        <p className="text-gray-500">
          The category you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Category</h1>
        <p className="text-gray-600">Update category information</p>
      </div>
      
      <CategoryForm category={category} mode="edit" />
    </div>
  );
} 