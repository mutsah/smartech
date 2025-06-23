import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../api/authAPI";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const SignInForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await signIn(user);

      if (response.success) {
        setUser({
          email: "",
          password: "",
        });

        login(response.user);

        if (response.user.user_type == "Admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error signing in");
    }
  };
  return (
    <div className="p-6 w-full">
      <div className="text-center">
        <h1 className="font-bold text-2xl mb-3">Smartech </h1>
        <p className="pr-14 pl-14 mb-6 text-gray-700">
          Are you ready to take the next to modern shopping? Look no further
          than Smartech
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full mt-4">
        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="appearance-none border rounded shadow-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="appearance-none border rounded shadow-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-[#02152c] hover:bg-[#02152c] text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
          >
            {isLoading ? (
              <LoadingSpinner></LoadingSpinner>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </div>
        <div className="mt-2 flex justify-between">
          <Link to="/password-reset" className="text-sm">
            Forgot password?
          </Link>
        </div>
      </form>

      <div>
        <p className="text-small-regular text-light-2 text-center mt-5 ">
          <span className="text-gray-700">Don't have an account?</span>
          <Link
            to="/sign-up"
            className="text-primary-500 text-small-semibold ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignInForm;
