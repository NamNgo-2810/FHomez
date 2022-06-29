import React, { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "./ImageSlider.css";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  console.log(slides);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  return (
    <section className="custom_slider">
      <FaArrowAltCircleLeft className="custom_left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight
        className="custom_right-arrow"
        onClick={nextSlide}
      />
      {Array.isArray(slides) ? (
        slides &&
        slides.map((slide, index) => (
          <div
            className={
              index === current ? "custom_slide active" : "custom_slide"
            }
            key={index}
          >
            {index === current && (
              <img src={slide} alt="OKOK" className="custom_image" />
            )}
          </div>
        ))
      ) : (
        <div className="custom_slide active">
          <img src={slides} alt="OKOK" className="custom_image" />
        </div>
      )}
    </section>
  );
};

export default ImageSlider;
