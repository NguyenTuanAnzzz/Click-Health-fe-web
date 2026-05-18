import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

const HorizontalRow = ({ title, children }) => {
  return (
    <div className="mb-20 relative overflow-hidden py-4">
      <div className="flex items-center justify-between mb-8 px-4 md:px-0">
        <h2 className="text-3xl font-bold text-primary-dark">{title}</h2>
        <div className="flex gap-2">
          <div className="w-12 h-1 bg-accent rounded-full" />
          <div className="w-4 h-1 bg-border rounded-full" />
        </div>
      </div>
      
      <div className="px-0 md:px-0">
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={24}
          slidesPerView="auto"
          freeMode={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className="mySwiper !overflow-visible"
        >
          {React.Children.map(children, (child, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }} className="pb-6">
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HorizontalRow;
