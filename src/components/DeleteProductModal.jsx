import React, { useContext, useState } from "react";
import { Trash2 } from "lucide-react";
import { removeProduct } from "../api/productAPI";
import { ShopContext } from "../context/ShopContext";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";

const DeleteProductModal = ({ product, onClose }) => {
  if (!product) return null;

  const { refreshProducts } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await removeProduct(product.id);
      if (response.success) {
        // console.log("Removed");
        onClose();
        await refreshProducts();
        toast.success("Product removed successfully");
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Error removing product:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
        <Trash2 className="h-6 w-6 text-red-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Product</h3>
      <p className="text-sm text-gray-500 mb-6">
        Are you sure you want to delete "{product.title}"? This action cannot be
        undone.
      </p>
      <div className="flex space-x-3">
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          {isLoading ? <LoadingSpinner></LoadingSpinner> : <span>Delete</span>}
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteProductModal;
