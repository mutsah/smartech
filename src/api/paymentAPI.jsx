import { toast } from 'react-toastify';
import axios from 'axios';

const URL = 'https://smartech-backend.onrender.com/';

export async function handlePaynow(
  reference,
  orderItems,
  total,
  totalCartAmount,
  shippingFee,
  taxAmount,
) {
  try {
    const response = await axios.post(`${URL}create-order`, {
      email: 'taringamutsah@gmail.com',
      reference: reference,
      totalAmount: total,
      subTotal: totalCartAmount,
      shippingFee: shippingFee,
      tax: taxAmount,
      orderItems: orderItems,
    });

    if (response.data.success) {
      window.location.href = response.data.redirectUrl;
    } else {
      toast.error('Failed to start payment');
    }
  } catch (error) {
    console.error(error);
    toast.error('Error processing payment');
  }
}
