import PRODUCTS from "../../Products";
import Product from "./Product";

const Shop = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 py-10">
        {PRODUCTS.map((product) => (
          <Product data={product}></Product>
        ))}
      </div>
    </div>
  );
};
export default Shop;
