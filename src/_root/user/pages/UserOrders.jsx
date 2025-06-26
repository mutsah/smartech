import { useContext } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import OrdersTab from '../../../components/OrdersTab';
import Modal from '../../../components/Modal';

const UserOrders = () => {
  const { orders } = useContext(ShopContext);

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedProduct(item);
    setSelectedOrder(item);
    setShowModal(true);
  };

  return (
    <div className="container py-8">
      <div className="">
        <OrdersTab orders={orders} onOpenModal={openModal} />
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
export default UserOrders;
