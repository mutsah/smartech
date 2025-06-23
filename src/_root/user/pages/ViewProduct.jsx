import { useNavigate, useParams } from "react-router-dom";
import { getProducts, getTopProduct } from "../../../partials/products";
import Stars from "../../../components/StarRating";
import { ExternalLink, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { ShopContext } from "../../../context/ShopContext";
import { useLocation } from "react-router-dom";

export const ViewProduct = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { productData, imageUrl } = state || {};

  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemAmount = cartItems[id];

  return (
    <div className="container mt-16 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[400px]">
          <img
            src={imageUrl}
            alt={productData.title}
            className="w-full h-[400px] rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="font-semibold text-2xl mb-2">{productData.title}</h3>
          <Stars rating={productData.rating}></Stars>
          <p className="py-8">{productData.description}</p>
          <h3 className="font-semibold text-2xl mb-8">${productData.price}</h3>
          <table>
            <tbody>
              <tr>
                <td className="w-20 font-bold">Brand</td>
                <td>Generic</td>
              </tr>
              <tr>
                <td className="w-20 font-bold">Color</td>
                <td>Multi</td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-center gap-3 mt-8">
            <button
              className="w-full bg-[#e9eff8] rounded-md py-3 flex items-center justify-center gap-2"
              onClick={() => addToCart(id)}
            >
              Add To Cart <ShoppingCart size={16}></ShoppingCart>
            </button>
            <button
              className="w-full bg-primary rounded-md py-3 px-5 text-white flex items-center justify-between gap-2"
              onClick={() => navigate("/cart")}
            >
              <div className="flex items-center gap-3">
                View Cart <ExternalLink size={16}></ExternalLink>
              </div>
              <div>{cartItemAmount > 0 ? <>{cartItemAmount}</> : <>0</>}</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
