// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function HomeCarousel() {
  return (
    <div className="">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper">
        <SwiperSlide>
          <img
            src="/img/eccentric-18-cover.jpg"
            alt=""
            className=" h-[260px] md:h-[460px] lg:h-[520px] w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/img/eccentric-18-group-photo.jpg"
            alt=""
            className="h-[260px] md:h-[460px] lg:h-[520px] w-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
