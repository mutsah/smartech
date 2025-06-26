import { useContext, useState } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import OrdersTab from '../../../components/OrdersTab';
import Modal from '../../../components/Modal';

const UserOrders = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const { orders, user } = useContext(ShopContext);

  const userId = user.id;

  console.log(user);

  // const userOrders = orders.filter((order) => order.userId === userId);

  const openModal = (type, item = null) => {
    setModalType(type);
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
        selectedProduct=""
        selectedOrder=""
        onClose={closeModal}
        onAddProduct=""
        onDeleteProduct=""
        onUpdateOrderStatus=""
      />
    </div>
  );
};
export default UserOrders;
