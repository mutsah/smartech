import { useAuth } from "../context/AuthContext";
import Stars from "./StarRating";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCard = ({ product, imageUrl }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const handleBuyNowClick = (e) => {
    e.preventDefault();

    try {
      if (isLoggedIn) {
        navigate(`/product/${product.id}`, {
          state: {
            productData: product,
            imageUrl: imageUrl,
            timestamp: new Date().toISOString(),
          },
        });
      } else {
        toast.warning("Log in first to buy products!");
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("Navigation failed:", error);
      window.location.href = `/product/${product.id}`;
    }
  };
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-md p-2 hover:shadow-lg transition duration-300">
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "block";
            }}
          />
        ) : null}
        <div
          className={`w-full h-full bg-gray-200 flex items-center justify-center ${
            imageUrl ? "hidden" : "block"
          }`}
        >
          <span className="text-gray-500">Image not available</span>
        </div>
      </div>
      <h3 className="mt-4 text-sm font-semibold text-gray-800">
        {product.title}
      </h3>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center text-sm text-yellow-500">
          <span className="ml-1">
            <Stars rating={product.rating}></Stars>
          </span>
        </div>
        <span className="text-lg font-bold text-gray-800">
          ${product.price}
        </span>
      </div>
      <button
        onClick={handleBuyNowClick}
        className="mt-4 w-full bg-primary text-white py-2 rounded-xl hover:bg-gray-800 transition"
      >
        Buy now
      </button>
    </div>
  );
};

// ProductCard.propTypes = {
//   product: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     rating: PropTypes.number.isRequired,
//     image_path: PropTypes.string,
//   }).isRequired,
//   imageUrl: PropTypes.string,
// };

export default ProductCard;
