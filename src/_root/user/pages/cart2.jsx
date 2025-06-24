import { useContext, useState } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import { CartItem } from '../../../components/CartItem';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { saveOrder } from '../../../api/orderAPI';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../components/LoadingSpinner';

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
  const total = totalCartAmount + shippingFee;

  const handlePlaceOrder = async () => {
    // Extract product IDs and their quantities from cartItems
    const orderItems = [];

    Object.entries(cartItems).forEach(([productId, quantity]) => {
      if (quantity > 0) {
        // Find the product details
        const product = products.find((p) => p.id.toString() === productId);

        orderItems.push({
          productId: productId,
          quantity: quantity,
          productName:
            product?.title || product?.name || product?.product_name || 'Unknown Product',
          price: product?.price || 0,
          subtotal: (product?.price || 0) * quantity,
        });
      }
    });

    try {
      const response = await saveOrder(orderItems, user.address, shippingFee, total, user.id);
      if (response.success) {
        toast.success('Order processed successfully');
        clearCart();
        navigate('/shop');
      }
      setIsLoading(false);
    } catch (error) {
      toast.error('Error processing:', error);
      setIsLoading(false);
    }
  };

  // Loading state
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

  // Error state
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
              {/* <p>{totalItems > 0 && <>{totalItems}</>}</p> */}
            </div>
            <hr className="mt-4 mb-2" />

            <div className="py-4 md:py-6">
              {/* Header row (hidden on mobile) */}
              <div className="hidden md:grid grid-cols-[1fr_120px_120px_120px] font-semibold text-gray-600 mb-4">
                <span>Product Details</span>
                <span className="text-center">Price</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Subtotal</span>
              </div>

              {/* Render cart items from API products */}
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
              {user.address}
            </div>

            <hr className="mt-4 mb-4" />

            <div className="flex justify-between">
              <div className="">
                <p className="font-semibold text-sm py-1">Amount</p>
                <p className="font-semibold text-sm py-1">Shipping Fee</p>
              </div>
              <div className="">
                <p className="font-semibold text-sm py-1 text-end">${totalCartAmount.toFixed(2)}</p>
                <p className="font-semibold text-sm py-1 text-end">${shippingFee.toFixed(2)}</p>
              </div>
            </div>

            <hr className="mt-4 mb-4" />

            <div className="flex justify-between">
              <p className="font-semibold text-md py-1">Total</p>
              <p className="font-semibold text-md py-1 text-end">${total.toFixed(2)}</p>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-primary text-white mt-2 py-2 rounded hover:bg-primary/90 transition-colors"
            >
              {isLoading ? <LoadingSpinner></LoadingSpinner> : <span>Place Order</span>}
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
