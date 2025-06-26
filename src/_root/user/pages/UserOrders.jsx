import { useContext, useMemo, useState } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import OrdersTab from '../../../components/OrdersTab';
import Modal from '../../../components/Modal';
import { useAuth } from '../../../context/AuthContext';

const UserOrders = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { orders } = useContext(ShopContext);

  const { user } = useAuth();

  const userOrders = useMemo(() => {
    if (!user?.id || !orders) return [];
    return orders.filter((order) => order.userId === user.id);
  }, [orders, user?.id]);

  const openModal = (type, item = null) => {
    setModalType(type);
    setShowModal(true);
    setSelectedOrder(item);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedProduct(null);
    setSelectedOrder(null);
  };

  return (
    <div className="container py-8">
      <div className="">
        <OrdersTab orders={userOrders} onOpenModal={openModal} />
      </div>

      <Modal
        show={showModal}
        type={modalType}
        selectedProduct=""
        selectedOrder={selectedOrder}
        onClose={closeModal}
        onAddProduct=""
        onDeleteProduct=""
        onUpdateOrderStatus=""
      />
    </div>
  );
};
export default UserOrders;
