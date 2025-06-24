import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateOrder } from '../../../api/orderAPI';
import { toast } from 'react-toastify';

const OrderPaymentUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Updating Order...');

  useEffect(() => {
    if (id) {
      updateOrder(id).then((success) => {
        if (success) {
          toast.success('Order paid successfully');
          navigate('/order-success');
        } else {
          setMessage('Failed to update order. Please contact the admin');
          toast.error('Failed to update order. Please try again.');
        }
      });
    }
  }, [id, navigate]);

  return (
    <div className="container mt-12 mb-24">
      <div className="bg-[#f7f7f7] rounded-md">
        <div className="text-center py-20">
          <p className="py-4">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderPaymentUpdate;
