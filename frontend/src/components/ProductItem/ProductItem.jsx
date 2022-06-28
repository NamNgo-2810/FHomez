import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductItem.module.scss";
import { FaRegHeart } from "react-icons/fa";

function ProductItem({
  id,
  src,
  title,
  content,
  price,
  category,
  area,
  address,
  typeNews,
  createdAt,
}) {

  return (
    <div className={styles.container + " d-flex"}>
      <Link to={`/products/${id}`} className={styles.productImage}>
        <img src={src} alt={title} style={{ borderRadius: "5px" }} />
        {
          {
            1: null,
            3: (
              <div className={`${styles.typeNews} ${styles.hotBg}`}>
                {"HOT".toUpperCase()}
              </div>
            ),
            2: (
              <div className={`${styles.typeNews} ${styles.vipBg}`}>
                {"VIP".toUpperCase()}
              </div>
            ),
          }[typeNews]
        }
      </Link>
      <div
        className={
          styles.productInfo + " d-flex flex-column align-items-start px-3"
        }
      >
        <Link to={`/products/${id}`} className={styles.productTitle}>
          <h4>{title}</h4>
        </Link>
        <p className={`${styles.content} container-fluid`}>
          {content}
        </p>
        <div className="container-fluid d-flex justify-content-between align-items-center mb-2">
          <b>Giá: {price} triệu đồng/tháng</b>
        </div>

        <p style={{textAlign: 'start'}} className="container-fluid">Địa chỉ: {address}</p>

        <div className="container-fluid d-flex justify-content-between">
          <span>Loại nhà: {category}</span>
          <span>Diện tích: {area}m2</span>
        </div>

        <div className="container-fluid d-flex justify-content-between">
          <span>Ngày đăng {createdAt}</span>
          <span>
            <FaRegHeart />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
