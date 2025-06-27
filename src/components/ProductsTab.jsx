import React, { useContext } from 'react';
import { Plus } from 'lucide-react';
import ProductCard from './AdminProductCard';
import { ShopContext } from '../context/ShopContext';

const ProductsTab = ({ products, onOpenModal, imageUrls }) => {
  const { loading } = useContext(ShopContext);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">My Products</h2>
        <button
          onClick={() => onOpenModal('add')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {loading ? (
        <div className="container mt-12 mb-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenModal={onOpenModal}
              imageUrl={imageUrls[product.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsTab;
