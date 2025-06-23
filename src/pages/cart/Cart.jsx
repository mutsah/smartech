import PRODUCTS from "../../Products";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="w-[70%]">
        <div>
          <h1 className="text-center py-5 font-extrabold">Your Cart Items</h1>
        </div>
        <div>
          {PRODUCTS.map((product) => {
            if (cartItems[product.id] !== 0) {
              return <CartItem data={product}></CartItem>;
            }
          })}
        </div>
        <h1></h1>
        <div className="flex items-center flex-col mt-5">
          {totalAmount > 0 ? (
            <div>
              <p>Subtotal: ${totalAmount}</p>
              <div className="flex gap-5 mt-3">
                <button
                  className="bg-black text-white rounded-lg p-2"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </button>
                <button className="bg-black text-white rounded-lg p-2">
                  Checkout
                </button>
              </div>
            </div>
          ) : (
            <h1>Cart is empty!</h1>
          )}
        </div>
      </div>
    </div>
  );
};
export default Cart;
