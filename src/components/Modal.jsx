import React, { useState } from 'react';
import { X } from 'lucide-react';
import AddEditProductModal from './AddEditProductModal';
import ViewProductModal from './ViewProductModal';
import DeleteProductModal from './DeleteProductModal';
import ViewOrderModal from './ViewOrderModal';

const Modal = ({
  show,
  type,
  selectedProduct,
  selectedOrder,
  onClose,
  onAddProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  imageUrl,
}) => {
  if (!show) return null;

  const getModalTitle = () => {
    switch (type) {
      case 'add':
        return 'Add New Product';
      case 'edit':
        return 'Edit Product';
      case 'view':
        return 'Product Details';
      case 'delete':
        return 'Delete Product';
      case 'viewOrder':
        return 'Order Details';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">{getModalTitle()}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {(type === 'add' || type === 'edit') && (
            <AddEditProductModal
              type={type}
              product={selectedProduct}
              onSave={onAddProduct}
              onClose={onClose}
            />
          )}

          {type === 'view' && selectedProduct && <ViewProductModal product={selectedProduct} />}

          {type === 'delete' && selectedProduct && (
            <DeleteProductModal product={selectedProduct} onClose={onClose} />
          )}

          {type === 'viewOrder' && selectedOrder && (
            <ViewOrderModal
              order={selectedOrder}
              onUpdateStatus={onUpdateOrderStatus}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
