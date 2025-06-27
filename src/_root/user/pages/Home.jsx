import { FeaturedProducts } from '../../../components/FeaturedProducts';
import { HeroSlider } from '../../../components/HeroSlider';
import { PopularProducts } from '../../../components/PopularProducts';
import { SubscribeEmail } from '../../../components/SubscribeEmail';
import { TopProduct } from '../../../components/TopProduct';

export const Home = () => {
  return (
    <div className="container py-8">
      {/* hero */}
      <HeroSlider></HeroSlider>

      {/* popular products */}
      <PopularProducts></PopularProducts>

      {/* featured products */}
      <FeaturedProducts></FeaturedProducts>

      {/* top products */}
      <TopProduct></TopProduct>
    </div>
  );
};
