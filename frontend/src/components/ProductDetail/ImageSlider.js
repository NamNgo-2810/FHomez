import React, { useState } from "react";
import { SliderData } from "./SliderData";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "./ImageSlider.css";

const ImageSlider = ({slides}) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;
    
    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    console.log(current);

    return (
        <section className="custom_slider">
            <FaArrowAltCircleLeft className="custom_left-arrow" onClick={prevSlide}/>
            <FaArrowAltCircleRight className="custom_right-arrow" onClick={nextSlide}/>
            {SliderData.map((slide, index) => {
                return (
                    <div
                        className={index === current ? 'custom_slide active' : 'custom_slide'}
                        key={index}>
                        {index === current && (<img src={slide.image} alt="OKOK" className="custom_image"/>)}
                        
                    </div>
                );
            })}
        </section>
    );
};

export default ImageSlider