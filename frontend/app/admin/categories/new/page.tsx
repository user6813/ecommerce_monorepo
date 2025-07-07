import CategoryForm from '../../../../components/CategoryForm';

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Category</h1>
        <p className="text-gray-600">Add a new category to your store</p>
      </div>
      
      <CategoryForm mode="create" />
    </div>
  );
} 