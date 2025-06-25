import React from 'react';
import { Eye, Edit3, Trash2, Star } from 'lucide-react';

const ProductCard = ({ product, onOpenModal, imageUrl }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-w-1 aspect-h-1 bg-gray-200">
        <img src={imageUrl} alt={product.title} className="w-full h-48 object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">{product.title}</h3>
        <div className="flex items-center space-x-1 mb-2">
          {renderStars(product.rating)}
          <span className="text-sm text-gray-500">({product.rating})</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(product.status)}`}>
            {product.status?.replace('_', ' ')}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>Stock: {product.stock}</span>
          <span>Sales: {product.sales}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onOpenModal('view', product)}
            className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
          <button
            onClick={() => onOpenModal('edit', product)}
            className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded hover:bg-gray-100 transition-colors flex items-center justify-center space-x-1"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onOpenModal('delete', product)}
            className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded hover:bg-red-100 transition-colors flex items-center justify-center space-x-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
