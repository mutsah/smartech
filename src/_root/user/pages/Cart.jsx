import { useContext, useState } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import { CartItem } from '../../../components/CartItem';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { saveOrder } from '../../../api/orderAPI';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { handlePaynow } from '../../../api/paymentAPI';

export const Cart = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { cartItems, products, loading, error, getTotalCartAmount, getTotalCartItems, clearCart } =
    useContext(ShopContext);

  const { user } = useAuth();

  const totalItems = getTotalCartItems();
  const totalCartAmount = getTotalCartAmount();
  const shippingFee = 3;
  const taxPercentage = 2;
  const taxAmount = (totalCartAmount * taxPercentage) / 100;
  const total = totalCartAmount + shippingFee + taxAmount;

  const prepareOrderItems = () => {
    const orderItems = [];
    Object.entries(cartItems).forEach(([productId, quantity]) => {
      if (quantity > 0) {
        const product = products.find((p) => p.id.toString() === productId);
        if (product) {
          const price = parseFloat(product?.price) || 0;
          // Ensure price is valid
          if (price > 0) {
            orderItems.push({
              productId: productId.toString(), // Ensure it's a string
              quantity: parseInt(quantity), // Ensure it's a number
              productName: product?.title || product?.name || 'Unknown Product',
              price: parseFloat(price.toFixed(2)), // Ensure 2 decimal places
              subtotal: parseFloat((price * quantity).toFixed(2)),
            });
          }
        }
      }
    });
    return orderItems;
  };

  // Handle regular order placement (without PayPal)
  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      const orderItems = prepareOrderItems();
      const response = await saveOrder(orderItems, user.address, shippingFee, total, user.id);

      if (response.success) {
        handlePaynow(response.order.id, orderItems, total, totalCartAmount, shippingFee, taxAmount);
      }
    } catch (err) {
      toast.error('Error processing order: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-12 mb-24">
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-12 mb-24">
        <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center">
          <p className="text-red-600 mb-4">Error loading cart: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-12 mb-24">
      {totalItems > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="flex justify-between">
              <h3 className="text-2xl">
                Your <span className="text-primary">Cart</span>
              </h3>
            </div>
            <hr className="mt-4 mb-2" />

            <div className="py-4 md:py-6">
              <div className="hidden md:grid grid-cols-[1fr_120px_120px_120px] font-semibold text-gray-600 mb-4">
                <span>Product Details</span>
                <span className="text-center">Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Subtotal</span>
              </div>

              {products.length > 0 ? (
                products.map((product) => {
                  if (cartItems[product.id] && cartItems[product.id] > 0) {
                    return <CartItem key={product.id} data={product} />;
                  }
                  return null;
                })
              ) : (
                <div className="text-center py-8 text-gray-500">No products available</div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1 bg-[#f7f7f7] rounded-md py-3 px-4">
            <h3 className="font-semibold">Order Summary</h3>
            <hr className="mt-3 mb-2" />

            <h3 className="mt-4 text-sm">DELIVERY ADDRESS</h3>
            <div className="mt-2 w-full py-2 px-2 border border-gray-300 rounded">
              {user?.address || 'No address provided'}
            </div>

            <hr className="mt-4 mb-4" />

            <div className="flex justify-between">
              <div className="">
                <p className="font-semibold text-sm py-1">Subtotal</p>
                <p className="font-semibold text-sm py-1">Shipping Fee</p>
                <p className="font-semibold text-sm py-1">Tax ({taxPercentage}%)</p>
              </div>
              <div className="">
                <p className="font-semibold text-sm py-1 text-end">${totalCartAmount.toFixed(2)}</p>
                <p className="font-semibold text-sm py-1 text-end">${shippingFee.toFixed(2)}</p>
                <p className="font-semibold text-sm py-1 text-end">${taxAmount.toFixed(2)}</p>
              </div>
            </div>

            <hr className="mt-4 mb-4" />

            <div className="flex justify-between">
              <p className="font-semibold text-md py-1">Total</p>
              <p className="font-semibold text-md py-1 text-end">${total.toFixed(2)}</p>
            </div>

            <p className="text-center text-gray-500 my-2">OR</p>

            <button
              onClick={handlePlaceOrder}
              disabled={isLoading}
              className="w-full bg-gray-700 text-white mt-2 py-2 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isLoading ? <LoadingSpinner /> : <span>Check out</span>}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#f7f7f7] rounded-md">
          <div className="text-center py-20">
            <p className="text-gray-600 mb-4">Your cart is empty!</p>
            <button
              onClick={() => navigate('/shop')}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
