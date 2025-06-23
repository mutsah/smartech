import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);
  return (
    <div className="py-3">
      <div className="shadow-lg rounded-md p-4 flex items-center gap-5 ">
        <div className="">
          <img
            src={productImage}
            alt=""
            className="w-[80px] h-[80px] rounded-md"
          />
        </div>
        <div className="">
          <h2 className="font-extrabold">{productName}</h2>
          <p>${price}</p>
          <div className="flex gap-3">
            <button onClick={() => removeFromCart(id)}> - </button>
            <input
              className="w-[30px] text-center"
              value={cartItems[id]}
              onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
            />
            <button onClick={() => addToCart(id)}> + </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
