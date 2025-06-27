import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export const PopularProducts = () => {
  const navigate = useNavigate();

  const handleViewMoreClick = () => {
    navigate('/shop');
  };

  const { products, loading, error, imageUrls } = useContext(ShopContext);

  if (loading)
    return (
      <div className="container mt-12 mb-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );

  if (error)
    return <div className="container mt-12 mb-16 text-red-500">Error: {error.message}</div>;

  return (
    <div className="mt-12">
      <div className="flex flex-col items-start mb-8">
        <h3 className="font-semibold ">Popular Products</h3>
        <div className="ruler"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} imageUrl={imageUrls[product.id]} />
        ))}
      </div>
      <div className="flex items-center justify-center py-8">
        <button
          onClick={handleViewMoreClick}
          className="flex items-center gap-2 border rounded-lg py-3 px-5 hover:border-primary transition-colors duration-300"
        >
          View More
          <span className="text-primary">
            <ArrowRight></ArrowRight>
          </span>
        </button>
      </div>
    </div>
  );
};
