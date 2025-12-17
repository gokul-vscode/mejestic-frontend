import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import '../Banner/Banner.css'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import cricket from "../../../Assets/cricket-banner.png";
import football from "../../../Assets/football-banner.png";
import tennis from "../../../Assets/tennis-banner.png";

const Banner = () => {
  const banners = [
    { id: 1, image: cricket, offermsg: "SALE! UP TO 50% OFF !", dji: "CRICKET FULL KIT", description: "Metallic Press Stud  Fastening Baded detail.Festival Season " },
    { id: 2, image: football, offermsg: "SALE! UP TO 50% OFF !", dji: "FOOTBALL FULL KIT", description: "Metallic Press Stud  Fastening Baded detail.Festival Season " },
    { id: 3, image: tennis, offermsg: "SALE! UP TO 50% OFF !", dji: "TENNIS FULL KIT", description: "Metallic Press Stud  Fastening Baded detail.Festival Season " }
  ];

  return (
    <div className="slide" id="banner">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        speed={1500}
      >
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="slideimg">
              <img src={item.image} alt="banner" className="slide-image" />

              <motion.div
                className="slideoffer"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="slide-content">
                  <p className="offermsg">{item.offermsg}</p>
                  <h2 className="dji">{item.dji}</h2>
                  <p className="description">{item.description}</p>
                  <button className="shopnow">Shop Now</button>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
