import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../api/authAPI';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/LoadingSpinner';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedUser = { ...user, [name]: value };

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordsMatch(updatedUser.password === updatedUser.confirmPassword);
    }

    setUser(updatedUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await createUser(user);
      if (response.success) {
        toast.success('Registered successfully, proceed to login');
        setUser({
          name: '',
          email: '',
          address: '',
          mobileNumber: '',
          password: '',
          confirmPassword: '',
        });
        navigate('/sign-in');
      }
      setIsLoading(false);
    } catch (error) {
      toast.error('Error adding user:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <form onSubmit={handleSubmit} className="w-full mt-4">
        <div className="flex justify-between gap-4">
          <div className="mb-4 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              value={user.name}
              onChange={handleChange}
              className="appearance-none border rounded shadow-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              value={user.email}
              onChange={handleChange}
              className="appearance-none border rounded shadow-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Email"
              required
            />
          </div>
        </div>

        <div className="mb-4 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Address (Shipping Address)
          </label>
          <input
            type="text"
            id="address"
            name="address"
            autoComplete="off"
            value={user.address}
            onChange={handleChange}
            className="appearance-none border rounded shadow-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Address"
            required
          />
        </div>

        <div className="mb-4 ">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            autoComplete="off"
            value={user.mobileNumber}
            onChange={handleChange}
            className="appearance-none border rounded shadow-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Address"
            required
          />
        </div>

        <div className="flex justify-between gap-4">
          <div className="mb-1 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              value={user.password}
              onChange={handleChange}
              className="appearance-none border rounded shadow-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="mb-1 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="off"
              value={user.confirmPassword}
              onChange={handleChange}
              className="appearance-none border rounded shadow-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Password"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          {!passwordsMatch && <p className="text-red-500 text-sm ">Passwords do not match.</p>}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-[#02152c] hover:bg-[#02152c] text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
          >
            {isLoading ? <LoadingSpinner></LoadingSpinner> : <span>Sign up</span>}
          </button>
        </div>
      </form>

      <div>
        <p className="text-small-regular text-light-2 text-center mt-5 ">
          <span className="text-gray-700">Already have an account?</span>
          <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUpForm;
