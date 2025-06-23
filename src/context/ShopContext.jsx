import { createContext, useState, useEffect } from "react";
import { getAllProducts } from "../api/productAPI";
import { getAllOrders } from "../api/orderAPI"; // Add this import
import { loadImage } from "../utils/imageLoader";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]); // Add orders state
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false); // Add products loading state for refresh
  const [ordersLoading, setOrdersLoading] = useState(false); // Add orders loading state
  const [error, setError] = useState(null);
  const [ordersError, setOrdersError] = useState(null); // Add orders error state
  const [imageUrls, setImageUrls] = useState({});

  // Initialize cart when products are loaded
  const initializeCart = (productList) => {
    const cart = {};
    productList.forEach((product) => {
      cart[product.id] = 0;
    });
    return cart;
  };

  // Core function to fetch products (extracted for reuse)
  const fetchProductsData = async () => {
    const fetchedProducts = await getAllProducts();
    const validProducts = Array.isArray(fetchedProducts) ? fetchedProducts : [];

    setProducts(validProducts);

    // Preserve existing cart items and add new products with 0 quantity
    setCartItems((prevCart) => {
      const newCart = initializeCart(validProducts);
      // Merge with existing cart items to preserve quantities
      Object.keys(prevCart).forEach((productId) => {
        if (newCart.hasOwnProperty(productId)) {
          newCart[productId] = prevCart[productId];
        }
      });
      return newCart;
    });

    // Load images in parallel (same logic as Shop page)
    const imageLoadPromises = validProducts.map(async (product) => {
      if (product.image_path) {
        const normalizedPath = product.image_path.replace(/\\/g, "/");
        const fullImageUrl = `http://localhost:3000/${normalizedPath}`;
        return {
          id: product.id,
          url: await loadImage(fullImageUrl),
        };
      }
      return null;
    });

    const loadedImages = await Promise.all(imageLoadPromises);
    const urls = {};
    loadedImages.forEach((img) => img && (urls[img.id] = img.url));
    setImageUrls(urls);

    setError(null);
    return validProducts;
  };

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        await fetchProductsData();
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error);
        setProducts([]);
        setCartItems({});
        setImageUrls({});
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to manually fetch all products (for refreshing)
  const fetchAllProducts = async () => {
    try {
      setProductsLoading(true);
      setError(null);
      const validProducts = await fetchProductsData();
      return validProducts;
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error);
      setProducts([]);
      setCartItems({});
      setImageUrls({});
      throw error;
    } finally {
      setProductsLoading(false);
    }
  };

  // Function to refresh products (useful for after adding new products)
  const refreshProducts = async () => {
    return await fetchAllProducts();
  };

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);
        setOrdersError(null);
        const fetchedOrders = await getAllOrders();
        const validOrders = Array.isArray(fetchedOrders) ? fetchedOrders : [];
        setOrders(validOrders);
        // console.log("Orders fetched successfully:", validOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrdersError(error);
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to manually fetch all orders (for refreshing)
  const fetchAllOrders = async () => {
    try {
      setOrdersLoading(true);
      setOrdersError(null);
      const fetchedOrders = await getAllOrders();
      const validOrders = Array.isArray(fetchedOrders) ? fetchedOrders : [];
      setOrders(validOrders);
      return validOrders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrdersError(error);
      setOrders([]);
      throw error;
    } finally {
      setOrdersLoading(false);
    }
  };

  // Function to get orders by user ID
  const getOrdersByUserId = (userId) => {
    if (!userId) {
      console.warn("No user ID provided");
      return [];
    }

    return orders.filter(
      (order) => order.user_id === userId || order.userId === userId
    );
  };

  // Function to refresh orders (useful for after placing new orders)
  const refreshOrders = async () => {
    return await fetchAllOrders();
  };

  // Helper function to get image URL for a product
  const getProductImageUrl = (productId) => {
    return imageUrls[productId] || "/placeholder-image.jpg";
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        total += cartItems[item]; // This counts actual quantity, not unique items
      }
    }
    return total;
  };

  // Alternative method to count unique items in cart
  const getUniqueCartItems = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        total++;
      }
    }
    return total;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(newAmount, 0),
    }));
  };

  const clearCart = () => {
    setCartItems(initializeCart(products));
  };

  const getCartItem = (itemId) => {
    return cartItems[itemId] || 0;
  };

  const contextValue = {
    // Product data
    products,
    loading,
    productsLoading, // Add products loading state for refresh operations
    error,
    imageUrls,
    getProductImageUrl,

    // Product actions
    fetchAllProducts,
    refreshProducts,

    // Cart state
    cartItems,

    // Cart actions
    addToCart,
    removeFromCart,
    updateCartItemCount,
    clearCart,

    // Cart calculations
    getTotalCartAmount,
    getTotalCartItems,
    getUniqueCartItems,
    getCartItem,

    // Orders data and functions
    orders,
    ordersLoading,
    ordersError,
    fetchAllOrders,
    getOrdersByUserId,
    refreshOrders,
  };

  // console.log("Cart Items:", cartItems);
  // console.log("Products:", products);
  // console.log("Image URLs:", imageUrls);
  // console.log("Orders:", orders);

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
