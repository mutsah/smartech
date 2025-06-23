import { getProducts } from "../partials/products";
import { FeaturedProduct } from "./FeaturedProduct";

export const FeaturedProducts = () => {
  return (
    <div className="mt-8 w-[90%] mx-auto">
      <div className="flex flex-col justify-center items-center ">
        <h3 className="font-semibold text-lg md:text-2xl">Featured Products</h3>
        <div className="ruler"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {getProducts.slice(11, 14).map((product, key) => (
          <FeaturedProduct data={product} key={key}></FeaturedProduct>
        ))}
      </div>
    </div>
  );
};
