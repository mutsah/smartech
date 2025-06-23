import React from "react";
import { formatDate } from "../utils/formatDate";

const ViewOrderModal = ({ order, onUpdateStatus, onClose }) => {
  if (!order) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusUpdate = (newStatus) => {
    onUpdateStatus(order.id, newStatus);
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Order Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Date</p>
            <p className="font-medium">{formatDate(order.createdAt)}</p>
          </div>
          <div>
            <p className="text-gray-600">Customer</p>
            <p className="font-medium">{order.userName}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
        {order.orderItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center shadow-md rounded py-2 px-4 mb-2"
          >
            <div>
              <p className="font-medium">{item.productName}</p>
              <div className="flex gap-4">
                <p className="text-sm text-gray-600">Price: {item.price}</p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                ${item.subtotal}
              </p>
            </div>
          </div>
        ))}
      </div>

      {order.customerEmail && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Customer Contact</h4>
          <div className="text-sm">
            <p className="text-gray-600">Email</p>
            <p className="font-medium">{order.customerEmail}</p>
          </div>
        </div>
      )}

      {order.shippingAddress && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
          <div className="text-sm">
            <p className="text-gray-900">{order.shippingAddress}</p>
          </div>
        </div>
      )}

      {order.notes && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Order Notes</h4>
          <div className="text-sm">
            <p className="text-gray-900">{order.notes}</p>
          </div>
        </div>
      )}

      {order.status === "pending" && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">
            Update Order Status
          </h4>
          <div className="flex space-x-2">
            <button
              onClick={() => handleStatusUpdate("shipped")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Mark as Shipped
            </button>
            <button
              onClick={() => handleStatusUpdate("cancelled")}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
            >
              Cancel Order
            </button>
          </div>
        </div>
      )}

      {order.status === "shipped" && (
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">
            Update Order Status
          </h4>
          <div className="flex space-x-2">
            <button
              onClick={() => handleStatusUpdate("delivered")}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
            >
              Mark as Delivered
            </button>
          </div>
        </div>
      )}

      {(order.status === "delivered" || order.status === "cancelled") && (
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600">
            This order has been {order.status}. No further actions available.
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewOrderModal;
