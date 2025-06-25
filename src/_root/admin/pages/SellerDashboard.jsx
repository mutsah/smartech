import React, { useContext, useEffect, useState } from 'react';
import AdminNavBar from '../../../components/AdminNavbar';
import ProductsTab from '../../../components/ProductsTab';
import StatsCards from '../../../components/StatsCards';
import NavigationTabs from '../../../components/NavigationTabs';
import OrdersTab from '../../../components/OrdersTab';
import Modal from '../../../components/Modal';
import { ShopContext } from '../../../context/ShopContext';
import { tabs } from '../../../partials/tabs';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { products, orders, imageUrls, refreshProducts, refreshOrders } = useContext(ShopContext);

  useEffect(() => {
    const refreshData = async () => {
      try {
        await Promise.all([refreshProducts(), refreshOrders()]);
      } catch (error) {
        console.error('Error refreshing dashboard data:', error);
      }
    };

    refreshData();
  }, []);

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedProduct(item);
    setSelectedOrder(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedProduct(null);
    setSelectedOrder(null);
  };

  const handleAddProduct = (newProduct) => {
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      image: '/api/placeholder/200/200',
      rating: 0,
      stock: parseInt(newProduct.stock) || 0,
      sales: 0,
      status: 'active',
    };
    setProducts([...products, product]);
    closeModal();
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    closeModal();
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
    );
  };

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + parseFloat(order.totalAmount || 0), 0),
    avgRating:
      products.reduce((sum, product) => sum + parseFloat(product.rating || 0), 0) /
        products.length || 0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards stats={stats} />

        <NavigationTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="bg-white rounded-lg shadow-sm">
          {activeTab === 'products' && (
            <ProductsTab products={products} onOpenModal={openModal} imageUrls={imageUrls} />
          )}

          {activeTab === 'orders' && <OrdersTab orders={orders} onOpenModal={openModal} />}
        </div>
      </div>

      <Modal
        show={showModal}
        type={modalType}
        selectedProduct={selectedProduct}
        selectedOrder={selectedOrder}
        onClose={closeModal}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateOrderStatus={updateOrderStatus}
      />
    </div>
  );
};

export default SellerDashboard;
