import ProductForm from '../../../../components/ProductForm';

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Product</h1>
        <p className="text-gray-600">Add a new product to your store</p>
      </div>
      
      <ProductForm mode="create" />
    </div>
  );
} 