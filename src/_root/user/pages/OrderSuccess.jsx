import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-12 mb-24">
      <div className="bg-[#f7f7f7] rounded-md">
        <div className="text-center py-20">
          <h2>Order Confirmed!</h2>
          <p className="py-4">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
export default OrderSuccess;
