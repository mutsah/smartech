import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";

export const CartItem = (props) => {
  const { data } = props;

  // Handle both static and API data structures
  const id = data.id;
  const title =
    data.title || data.name || data.product_name || "Unknown Product";
  const price = parseFloat(data.price) || 0;

  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getProductImageUrl,
  } = useContext(ShopContext);

  const quantity = cartItems[id] || 0;
  const totalAmount = quantity * price;

  // Local state for input value to handle temporary empty states
  const [inputValue, setInputValue] = useState(quantity.toString());

  // Update local input when cart quantity changes from outside
  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  // Don't render if item is not in cart or quantity is 0
  if (!quantity || quantity === 0) {
    return null;
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Only update cart if value is a valid number
    if (value !== "" && !isNaN(value)) {
      const numValue = parseInt(value) || 0;
      if (numValue >= 0) {
        updateCartItemCount(numValue, id);
      }
    }
  };

  const handleInputBlur = () => {
    // On blur, ensure we have a valid value
    if (inputValue === "" || isNaN(inputValue)) {
      setInputValue(quantity.toString());
    }
  };

  return (
    <div
      key={id}
      className="grid md:grid-cols-[1fr_120px_120px_120px] grid-cols-1 gap-4 py-4 border-b"
    >
      {/* Product */}
      <div className="flex gap-4">
        <img
          src={getProductImageUrl(id)}
          alt={title}
          className="w-16 h-16 object-cover rounded"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.src = "/placeholder-image.jpg";
          }}
        />
        <div className="flex-1">
          <p className="font-medium text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">SKU: {data.sku || id}</p>
          <button
            className="text-orange-500 text-sm hover:underline mt-1 transition-colors"
            onClick={() => updateCartItemCount(0, id)}
          >
            Remove
          </button>

          {/* Show details on mobile */}
          <div className="mt-2 space-y-1 text-sm text-gray-600 md:hidden">
            <div>Price: ${price.toFixed(2)}</div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-end space-x-2">
                <button
                  className="px-2 py-1 border rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
                  onClick={() => removeFromCart(id)}
                  disabled={quantity <= 0}
                >
                  &#x25C0;
                </button>
                <input
                  type="number"
                  min="0"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className="w-16 text-center border rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  className="px-2 py-1 border rounded hover:bg-gray-50 transition-colors"
                  onClick={() => addToCart(id)}
                >
                  &#x25B6;
                </button>
              </div>
            </div>
            <div className="font-medium">
              Subtotal: ${totalAmount.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Price (hidden on mobile) */}
      <div className="hidden md:flex items-center justify-center text-gray-700">
        ${price.toFixed(2)}
      </div>

      {/* Quantity (hidden on mobile) */}
      <div className="hidden md:flex items-center justify-center space-x-2">
        <button
          className="px-2 py-1 border rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
          onClick={() => removeFromCart(id)}
          disabled={quantity <= 0}
        >
          &#x25C0;
        </button>
        <input
          type="number"
          min="0"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-16 text-center border rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          className="px-2 py-1 border rounded hover:bg-gray-50 transition-colors"
          onClick={() => addToCart(id)}
        >
          &#x25B6;
        </button>
      </div>

      {/* Subtotal (hidden on mobile) */}
      <div className="hidden md:flex items-center justify-end font-semibold text-gray-800">
        ${totalAmount.toFixed(2)}
      </div>
    </div>
  );
};
