import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Autoplay } from 'swiper/modules';
import { slides } from '../partials/slide';
import { useNavigate } from 'react-router-dom';

export const HeroSlider = () => {
  const navigate = useNavigate();
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 7000 }}
      loop
      className="w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 bg-[#e9eff8] rounded-lg gap-4">
            <div className="max-w-xl">
              <p className="text-sm text-orange-600 font-semibold">{slide.subtitle}</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900">{slide.title}</h2>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => {
                    navigate('/shop');
                  }}
                  className="cosmic-button"
                >
                  {' '}
                  {slide.cta}
                </button>
              </div>
            </div>
            <div className="h-48 overflow-hidden rounded">
              <img src={slide.image} alt="slide" className="w-full h-full object-cover " />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
