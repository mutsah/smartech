import React from "react";
import { Star } from "lucide-react";

const ViewProductModal = ({ product }) => {
  if (!product) return null;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "out_of_stock":
        return "bg-red-100 text-red-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <img
          src={product.image_path}
          alt={product.title}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div>
          <h4 className="text-lg font-medium text-gray-900">{product.title}</h4>
          <div className="flex items-center space-x-1 mt-1">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-500">({product.rating})</span>
          </div>
          <p className="text-xl font-bold text-gray-900 mt-2">
            ${product.price}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div>
          <p className="text-sm text-gray-600">Stock</p>
          <p className="font-medium text-gray-900">{product.stock} units</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Sales</p>
          <p className="font-medium text-gray-900">{product.sales} sold</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Status</p>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(
              product.status
            )}`}
          >
            {product.status?.replace("_", " ")}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-600">Revenue</p>
          <p className="font-medium text-gray-900">
            ${(product.price * product.sales).toFixed(2)}
          </p>
        </div>
      </div>

      {product.description && (
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">Description</p>
          <p className="text-gray-900">{product.description}</p>
        </div>
      )}

      {product.category && (
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">Category</p>
          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            {product.category}
          </span>
        </div>
      )}
    </div>
  );
};

export default ViewProductModal;
