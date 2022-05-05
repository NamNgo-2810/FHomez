import React from 'react'
import { Link } from "react-router-dom";
import styles from "./Banner.module.scss";

function Banner() {
  return (
    <div className="rowBanner">
      <div className="banner_container"> 
        <img src="bannerimg.jpg" alt="SampleRoom" className="banner_illustration"></img>
        <div className="banner_introduction">
          <div className="banner_intro_title">FHomezRE</div>
          <div className="banner_intro_description">
            "Hệ thống tìm nhà trọ hiện đại được thành lập và vận hành bởi " <strong> FHomezRECorp </strong> ". "
            <br/>
            "Việc tìm kiếm một nhà trọ lý tưởng với bạn sẽ trở nên đơn giản hơn bao giờ hết. 👉👈 "
            <br />
            <button className="banner_intro_button_explore">
              <Link to="/productItem"
              className="banner_intro_button_explore_toItemList">
              "Khám phá ngay 👈"
              <i aria-hidden="true"></i>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner