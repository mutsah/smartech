import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemAmount = cartItems[id];

  return (
    <div className="">
      <div className="shadow-md rounded-md">
        <div className="">
          <img
            src={productImage}
            alt=""
            className="w-full h-[300px] rounded-t-md"
          />
        </div>
        <div className="text-center py-5">
          <p>{productName}</p>
          <p>${price}</p>
        </div>
        <div className="flex justify-center ">
          <button
            className="border py-1 px-4 rounded-xl mb-4 hover:bg-black hover:text-white"
            onClick={() => addToCart(id)}
          >
            Add To Cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Product;
