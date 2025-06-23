import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

import MacBook from "../assets/3.jpg";
import Office from "../assets/4.jpg";
import PS5 from "../assets/6.jpg";

const slides = [
  {
    title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
    subtitle: "Exclusive Deal 40% Off",
    image: MacBook,
    cta: "Order Now",
  },
  {
    title: "Unleash Productivity - Get the Ultimate Office Setup!",
    subtitle: "Limited Time Offer",
    image: Office,
    cta: "Shop Now",
  },
  {
    title: "Game On - Elevate Your Gaming with the Best Headphones",
    subtitle: "Gaming Sale Now Live!",
    image: PS5,
    cta: "Explore Deals",
  },
];

export const HeroSlider = () => {
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
              <p className="text-sm text-orange-600 font-semibold">
                {slide.subtitle}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900">
                {slide.title}
              </h2>
              <div className="mt-6 flex gap-4">
                <button className="cosmic-button">{slide.cta}</button>
                <button className="text-slate-700 font-medium flex items-center gap-1 hover:underline">
                  Learn More →
                </button>
              </div>
            </div>
            <div className="h-48 overflow-hidden rounded">
              <img
                src={slide.image}
                alt="slide"
                className="w-full h-full object-cover "
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
