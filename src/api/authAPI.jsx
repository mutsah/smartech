import { toast } from 'react-toastify';

const URL = 'https://smartech-backend.onrender.com/';

export async function createUser(user) {
  try {
    const response = await fetch(`${URL}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        address: user.address,
        mobileNumber: user.mobileNumber,
        password: user.confirmPassword,
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

export async function signIn(user) {
  try {
    const response = await fetch(`${URL}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();

      if (data.error == 'user not found') {
        toast.error('User does not exists');
      } else if (data.error == 'incorrect credentials') {
        toast.error('Invalid credentials');
      } else {
        toast.error('Error on sign in!');
      }

      return data;
    } else {
      const data = await response.json();

      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function sendResetLink(user) {
  try {
    const response = await fetch(`${URL}send-reset-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
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

export async function resetPassword(user, email, reference) {
  try {
    const response = await fetch(`${URL}reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        reference: reference,
        password: user.confirmPassword,
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
