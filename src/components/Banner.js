import React from "react";
import { bannar_down, banners } from "../data/Data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";

const Banner = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <BiChevronRight />,
    prevArrow: <BiChevronLeft />,
  };
  return (
    <div>
      <div className="w-10/12 m-auto">
        <Slider {...settings}>
          {banners.map((data, key) => (
            <div className="relative" key={key}>
              <img src={data.banner} alt="banner" className="w-full" />
              <div className="banner-items">
                <h2>All Collections</h2>
                <h1>Get Up to 50% Off Select Styles.</h1>
                <button type="button" className="mt-4 btn pt-3 pb-3 pr-6 pl-6">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </Slider>

        <div className="mwa flex gap-8 mt-8 ">
          {bannar_down.map((val, index) => (
            <div className="w-1/3 overflow-hidden relative" key={index}>
              <img
                src={val.img}
                alt="womenmenaccessories"
                className="w-full overflow-hidden transition-transform transform hover:scale-110 duration-700"
              />
              <button
                type="button"
                className="mt-4 btn pt-3 pb-3 pr-6 pl-6 text-white absolute top-1/2 left-1/2 translate"
              >
                {val.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
