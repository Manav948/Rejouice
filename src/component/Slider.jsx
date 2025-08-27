import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import { FreeMode, Autoplay } from "swiper/modules"

export default function Slider({ slides }) {
  return (
    <Swiper
      slidesPerView={"auto"}   
      spaceBetween={30}        
      loop={true}              
      freeMode={true}
      autoplay={{
        delay: 0,         
        disableOnInteraction: false,
      }}
      speed={5000}
      modules={[FreeMode, Autoplay]}
      className="mySwiper h-full flex items-center"
    >
      {slides.map((src, i) => (
        <SwiperSlide key={i} className="!w-[300px] md:!w-[400px] lg:!w-[450px]">
          <img
            src={src}
            alt={`Slide ${i + 1}`}
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
