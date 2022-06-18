import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./ProductDetail.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronLeft, faChevronRight, faCircle, faHeart, faFlag } from "@fortawesome/free-solid-svg-icons";
import { } from "@fortawesome/fontawesome-svg-core";
import productDetail1 from "./product_detail1.jpg";
import productDetail2 from "./product_detail2.jpg";
import productDetail3 from "./product_detail3.jpg";
import userAvatar1 from "./user_avatar1.jpg";
import userAvatar2 from "./user_avatar2.jpg";
import userAvatar3 from "./user_avatar3.png";
import slideShowScript from "./SlideshowControl";
import 'react-slideshow-image/dist/styles.css';
// import { Slide } from "react-slideshow-image";
// import SimpleImageSlider from "react-simple-image-slider";
import { default as  ImageSlider} from "./ImageSlider";
import { SliderData } from "./SliderData";
import { FaStar } from "react-icons/fa"

const slideImagesRaw = [
    "./product_detail1.jpg",
    "./product_detail2.jpg",
    "./product_detail3.jpg"
  ];

const slideImages = [
{
    url: "./product_detail1.jpg",
    caption: "Slide 1"
},
{
    url: "./product_detail2.jpg",
    caption: "Slide 2"
},
{
    url: "./product_detail3.jpg",
    caption: "Slide 3"
},
];

const images = [
    { url: "product_detail1.jpg" },
    { url: "product_detail2.jpg" },
    { url: "product_detail3.jpg" },
  ];

const colors = {
    orange: "#FFBA5A",
    grey: "#A9A9A9",
}

function ProductDetail() {
    // const [current, setCurrent] = useState(0);
    // const length = SliderData.length;

    const stars = Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);

    const handleClick = value => {
        setCurrentValue(value)
    };

    const handleMouseOver = value => {
        setHoverValue(value)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    };
    
    const ratingStyles = {
        room_review_by_self: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },

        textarea: {
            border: "1px solid #A9A9A9",
            borderRadius: 5,
            width: 400,
            padding: 10,
            minHeight: 150,
            margin: "20px"
        },

        button: {
            border: "1px solid #A9A9A9",
            borderRadius: 5,
            width: 400,
            padding: 10,
            backgroundColor: "#f6dddf",
            marginBottom: "30px"
        },

        create_review_comment: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }
    }

    return (
        <div>
            {/* <Header /> */}
            <div className="room_detail_container">
                <div className="room_detail">
                    <div className="show_detail">
                        <div className="row justify_space_around">
                            <div className="col-md-5 col-12 room_illustation">
                                <div className="show_detail_image_slider v-window carousel v-item-group theme--dark v-window--show-arrows-on-hover v-carousel v-carousel--hide-delimiter-background">
                                    <div className="slideshow_container">
                                        <div className="v-window-item">
                                            <ImageSlider
                                                slides={SliderData}>
                                            </ImageSlider>
                                        </div>
                                    </div>
                                    {/* <div className="v-carousel__controls">
                                        <div className="v-item-group theme--dark">
                                            <button type="button" value={0} className="v-carousel__controls__item v-btn v-item--active v-btn--active v-btn--flat v-btn--icon v-btn--round theme--dark v-size--small">
                                                <span className="v-btn__content">
                                                    <FontAwesomeIcon icon={faCircle}></FontAwesomeIcon>
                                                </span>
                                            </button>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="tool ">
                                    <button type="button" className="favorite mx-2 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--default">
                                        <span className="v-btn__content">
                                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                                        </span>
                                    </button>
                                    <button type="button" className="report mx-2 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--default">
                                        <span className="v-btn__content">
                                            <FontAwesomeIcon icon={faFlag}></FontAwesomeIcon>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-5 col-12 room_information">
                                <div className="row room_owner_info">
                                    <div className="col col-12">
                                        <div className="detail_list_item">
                                            <div className="item--title">Thông tin chung</div>
                                            <div className="item--content">
                                                <div>
                                                    <div className="item--subtitle">Họ tên chủ trọ: </div>
                                                    <div className="item--text">Lê Anh Sáu</div>
                                                </div>
                                                <div>
                                                    <div className="item--subtitle">Số điện thoại liên hệ: </div>
                                                    <div className="item--text">0977194728</div>
                                                </div>
                                                <div>
                                                    <div className="item--subtitle">Kiểu phòng cho thuê: </div>
                                                    <div className="item--text">Chung cư Mini</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row room_detail_info">
                                    <div className="col col-12">
                                        <div className="detail-list-item mt-4">
                                            <div className="item--title">Chi tiết loại phòng</div>
                                        </div>
                                        <div className="v-data-table v-data-table--fixed-header theme--light">
                                            <div className="v-data-table__wrapper">
                                                <table>
                                                    <tbody>
                                                        <tr className="info_table_tr">
                                                            <td>Diện tích&nbsp;</td>
                                                            <td>
                                                                40m<sup>2</sup>
                                                            </td>
                                                        </tr>
                                                        <tr className="info_table_tr">
                                                            <td>Số phòng</td>
                                                            <td>2 phòng</td>
                                                        </tr>
                                                        <tr className="info_table_tr">
                                                            <td>Địa chỉ&nbsp;</td>
                                                            <td>Số nhà 107 Nguyễn Văn Đạo, Chương Dương, Hoàn Kiếm, Hà Nội</td>
                                                        </tr>
                                                        <tr className="info_table_tr">
                                                            <td>Landmark</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr className="info_table_tr">
                                                            <td>Cơ sở vật chất</td>
                                                            <td>
                                                                <ul className="facilities ml-auto mr-auto">
                                                                    <li>Không chung chủ</li>
                                                                    <li>Vệ sinh khép kín</li>
                                                                    <li>Có bình nóng lạnh</li>
                                                                    <li>Có điều hòa</li>
                                                                    <li>Có máy giặt</li>
                                                                    <li>Nấu ăn riêng</li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row room_price">
                                    <div className="col">
                                        <div className="detail-list-item mt-4">
                                            <div className="item--title">
                                                Giá thuê
                                                <br />
                                            </div>
                                            <div className="price">2.000.000 đồng/tháng</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row_room_opinion">
                        <div className="room_review_by_others">
                            <div className="item--title ribbon--title room_review_by_others_ribbon">
                                Bình luận
                            </div>
                            <div className="room_reviews_list">
                                <ul>
                                    <li className="comment_detail">
                                        <div className="user_avatar">
                                            <img className="user_avatar_img" src={userAvatar3} alt="useravatar3" />
                                        </div>
                                        <div className="user_text">
                                            <div className="comment_info">
                                                <div className="user_name">Kurisu</div>
                                                <div className="user_comment">Nhà đẹp, rộng rãi và thoáng mát</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="comment_detail">
                                        <div className="user_avatar">
                                            <img className="user_avatar_img" src={userAvatar2} alt="useravatar2" />
                                        </div>
                                        <div className="user_text">
                                            <div className="comment_info">
                                                <div className="user_name">Okarin</div>
                                                <div className="user_comment">Nhà nóng vkl, không phù hợp với một người như ta</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="comment_detail">
                                        <div className="user_avatar">
                                            <img className="user_avatar_img" src={userAvatar1} alt="useravatar" />
                                        </div>
                                        <div className="user_text">
                                            <div className="comment_info">
                                                <div className="user_name">Luffy</div>
                                                <div className="user_comment">Tiền nào của nấy, không có gì để khen và cũng không có gì để chê</div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <nav>
                                <ul className="v-pagination theme--light">
                                    <li></li>
                                    <li></li>
                                </ul>
                            </nav>
                        </div>
                        <hr className="room_review_separator" />
                        <div style={ratingStyles.room_review_by_self} className="room_review_by_self">
                            <div className="item--title ribbon--title room_review_by_self_ribbon">
                                Đánh giá của bạn
                            </div>
                            <div className="create_review">
                                <div className="create_review_rating">
                                    {stars.map((_, index) => {
                                        return (
                                            <FaStar className="create_rating_stars"
                                                key={index}
                                                size={45}
                                                style={{
                                                    margin: 10,
                                                    cursor: "pointer"
                                                }}
                                                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                                onClick={() => handleClick(index + 1)}
                                                onMouseOver={() => handleMouseOver(index + 1)}
                                                onMouseLeave={handleMouseLeave}
                                            />
                                        )
                                    })}
                                </div>
                                <div style={ratingStyles.create_review_comment} className="create_review_comment">
                                    <textarea style={ratingStyles.textarea} placeholder="Cảm nhận của bạn về phòng trọ này ..."></textarea>
                                    <button style={ratingStyles.button} className="button_submit_rating">Gửi đánh giá</button>
                                </div>
                            </div>                            
                        </div>
                        <hr className="room_review_separator" />
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    )    
}

export default ProductDetail