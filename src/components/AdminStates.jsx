const AdminStates = () => {
  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    avgRating:
      products.reduce((sum, product) => sum + product.rating, 0) /
        products.length || 0,
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Products</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalProducts}
            </p>
          </div>
          <Package className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalOrders}
            </p>
          </div>
          <ShoppingCart className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">
              ${stats.totalRevenue.toFixed(2)}
            </p>
          </div>
          <DollarSign className="w-8 h-8 text-yellow-600" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Avg Rating</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.avgRating.toFixed(1)}
            </p>
          </div>
          <Star className="w-8 h-8 text-purple-600" />
        </div>
      </div>
    </div>
  );
};
export default AdminStates;
