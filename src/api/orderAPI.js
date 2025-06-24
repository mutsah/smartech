import { toast } from 'react-toastify';

const URL = 'http://localhost:3000/order/';

export async function saveOrder(orderItems, address, shippingFee, total, user) {
  try {
    const response = await fetch(`${URL}saveOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user,
        totalAmount: total,
        shippingFee: shippingFee,
        orderItems: orderItems,
        shippingAddress: address,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      toast.error(data.error);
      return data;
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getAllOrders() {
  try {
    const response = await fetch(`${URL}getOrders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    console.log(data.orders);
    return data.orders;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function updateOrder(id) {
  try {
    const response = await fetch(`${URL}update-order/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
}
