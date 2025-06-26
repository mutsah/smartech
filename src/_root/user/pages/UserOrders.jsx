import { useContext } from 'react';
import { ShopContext } from '../../../context/ShopContext';
import OrdersTab from '../../../components/OrdersTab';

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
      <div className="mb-6">
        <h3 className="font-semibold text-2xl">All Products</h3>
        <div className="ruler w-full h-px bg-gray-200"></div>
      </div>
      <div className="">
        <OrdersTab orders={orders} onOpenModal={openModal} />
      </div>
    </div>
  );
};
export default UserOrders;
