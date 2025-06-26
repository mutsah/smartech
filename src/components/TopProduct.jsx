import { ArrowRight } from 'lucide-react';
import { getTopProduct } from '../partials/products';

export const TopProduct = () => {
  return (
    <div className="bg-[#e9eff8] mt-12 rounded-lg py-12 ">
      {getTopProduct.map((product, key) => (
        <div className="flex flex-col items-center" key={key}>
          <h3 className="font-semibold text-2xl">{product.title}</h3>
          <p className="w-[60%] text-center py-3">{product.description}</p>
          {/* <button className="bg-primary text-white mt-2 py-1 px-5 flex items-center gap-2 rounded-sm">
            Buy Now <ArrowRight size={16}></ArrowRight>
          </button> */}
        </div>
      ))}
    </div>
  );
};
