import axios from 'axios';

const handlePaynow = async () => {
  try {
    const response = await axios.post('http://localhost:3000/payment/create-order', {
      email: 'taringamutsah@gmail.com',
      reference: 'ORDER123456',
      totalAmount: 943,
      subTotal: 940,
      shippingFee: 3,
      tax: 0,
      orderItems: [
        {
          productId: 1,
          productName: 'Wireless Headphones',
          quantity: 2,
          price: 45,
          subtotal: 90,
        },
        {
          productId: 2,
          productName: 'HP Monitor',
          quantity: 1,
          price: 850,
          subtotal: 850,
        },
      ],
    });

    if (response.data.success) {
      window.location.href = response.data.redirectUrl;
    } else {
      alert('Failed to start payment');
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong');
  }
};

const PaynowCheckOut = () => {
  return (
    <div className="container mt-12 mb-24">
      <div className="bg-[#f7f7f7] rounded-md">
        <div className="text-center py-20">
          <h2 className="py-4">Paynow testing</h2>

          <button
            onClick={handlePaynow}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Pay with Paynow Sandbox
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaynowCheckOut;
