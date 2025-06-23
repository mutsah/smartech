// pages/Shop.jsx
import { useContext, useState, useMemo } from "react";
import { ShopContext } from "../../../context/ShopContext";
import ProductCard from "../../../components/ProductCard";

export const Shop = () => {
  const { products, loading, error, imageUrls } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "", "low-to-high", "high-to-low"

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }

    const searchLower = searchTerm.toLowerCase().trim();

    return products.filter((product) => {
      // Search in multiple fields
      const title = (
        product.title ||
        product.name ||
        product.product_name ||
        ""
      ).toLowerCase();
      const description = (product.description || "").toLowerCase();
      const category = (product.category || "").toLowerCase();
      const sku = (product.sku || "").toLowerCase();
      const tags = (product.tags || []).join(" ").toLowerCase();

      return (
        title.includes(searchLower) ||
        description.includes(searchLower) ||
        category.includes(searchLower) ||
        sku.includes(searchLower) ||
        tags.includes(searchLower)
      );
    });
  }, [products, searchTerm]);

  // Sort filtered products
  const sortedProducts = useMemo(() => {
    if (!sortOrder) return filteredProducts;

    return [...filteredProducts].sort((a, b) => {
      const priceA = parseFloat(a.price) || 0;
      const priceB = parseFloat(b.price) || 0;

      if (sortOrder === "low-to-high") {
        return priceA - priceB;
      } else if (sortOrder === "high-to-low") {
        return priceB - priceA;
      }
      return 0;
    });
  }, [filteredProducts, sortOrder]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  if (loading)
    return (
      <div className="container mt-12 mb-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container mt-12 mb-16 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="container mt-8 mb-16">
      <div className="flex flex-col mb-8">
        {/* Header */}
        <div className="mb-6">
          <h3 className="font-semibold text-2xl">All Products</h3>
          <div className="ruler w-full h-px bg-gray-200"></div>
        </div>

        {/* Search and Sort Section - Responsive Layout */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          {/* Search Section */}
          <div className="relative flex-1 sm:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 justify-end sm:justify-start">
            <label
              htmlFor="sort"
              className="text-sm text-gray-600 whitespace-nowrap"
            >
              Sort by:
            </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={handleSortChange}
              className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-0"
            >
              <option value="">Default</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Count */}
        <div className="flex justify-start items-center mb-2">
          <div className="text-sm text-gray-600">
            {searchTerm ? (
              filteredProducts.length === 0 ? (
                <span>No products found for "{searchTerm}"</span>
              ) : (
                <span>
                  {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""} found for "
                  {searchTerm}"
                </span>
              )
            ) : (
              <span>{products.length} products</span>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 && searchTerm ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-16 w-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-4">
            We couldn't find any products matching "{searchTerm}".
          </p>
          <button
            onClick={clearSearch}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              imageUrl={imageUrls[product.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
};
