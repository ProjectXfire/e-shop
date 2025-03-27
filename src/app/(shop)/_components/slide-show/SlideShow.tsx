"use client";

import { useState } from "react";
import NextImage from "next/image";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import styles from "./styles.module.css";
import "./slide.css";

interface Props {
  images: string[];
}

function SlideShow({ images }: Props): React.ReactElement {
  const [thumbsSwiper, setThumbsSwiper] = useState<null | SwiperType>(null);

  return (
    <section className={styles["slide-container"]}>
      <Swiper
        className="swiper"
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        pagination
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Thumbs, Pagination]}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <NextImage src={img} alt="image" width={600} height={500} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        className="mySwiper"
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <NextImage src={img} alt="image" width={600} height={500} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
export default SlideShow;
