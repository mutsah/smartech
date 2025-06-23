import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendResetLink } from "../../api/authAPI";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";

const PasswordResetForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await sendResetLink(user);

      if (response.success) {
        setUser({
          email: "",
        });

        toast.success("Reset link sent");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-6 w-full">
      <div className="text-center">
        <h1 className="font-bold text-2xl mb-3">Trouble logging in?</h1>
        <p className="pr-14 pl-14 mb-6 text-gray-700">
          Enter your email and we will send you a link to reset your password.
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

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-[#02152c] hover:bg-[#02152c] text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
          >
            {isLoading ? (
              <LoadingSpinner></LoadingSpinner>
            ) : (
              <span>Send reset link</span>
            )}
          </button>
        </div>
        <div className="mt-2 flex justify-between">
          <Link to="/sign-in" className="flex items-center text-sm">
            <ArrowLeft size={18}></ArrowLeft>
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};
export default PasswordResetForm;
