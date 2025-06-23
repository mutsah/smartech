import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { resetPassword, sendResetLink } from "../../api/authAPI";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";

const ResetForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const { reference, email } = useParams();

  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedUser = { ...user, [name]: value };

    if (name === "password" || name === "confirmPassword") {
      setPasswordsMatch(updatedUser.password === updatedUser.confirmPassword);
    }

    setUser(updatedUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await resetPassword(user, email, reference);

      if (response.success) {
        setUser({
          password: "",
          confirmPassword: "",
        });

        toast.success("Password reset successful");
        navigate("/sign-in");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-6 w-full">
      <div className="text-center">
        <h1 className="font-bold text-2xl mb-6">Reset Password</h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full mt-4">
        <div className="mb-4 w-full">
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
            autoComplete="off"
            value={user.password}
            onChange={handleChange}
            className="appearance-none border rounded shadow-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="mb-1 w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
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
        <div className="mb-4">
          {!passwordsMatch && (
            <p className="text-red-500 text-sm ">Passwords do not match.</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-[#02152c] hover:bg-[#02152c] text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
          >
            {isLoading ? (
              <LoadingSpinner></LoadingSpinner>
            ) : (
              <span>Reset password</span>
            )}
          </button>
        </div>
        <div className="mt-2 flex justify-between">
          <Link to="/sign-in" className="flex items-center text-sm">
            <ArrowLeft size={18}></ArrowLeft>
            login
          </Link>
        </div>
      </form>
    </div>
  );
};
export default ResetForm;
