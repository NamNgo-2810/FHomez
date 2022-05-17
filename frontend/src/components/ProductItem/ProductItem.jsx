import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductItem.module.scss";
import {FaRegHeart} from "react-icons/fa"

function ProductItem({
  id,
  src,
  title,
  desc,
  price,
  area,
  location,
  createdAt
}) {
  return (
      <div className={styles.container + " d-flex"}>
        <Link to={`/products/${id}`} className={styles.productImage}>
            <img src={src} alt={title} />
            {
              {
                0: null,
                1: <div className={`${styles.typeNews} ${styles.hotBg}`}>{"HOT".toUpperCase()}</div>,
                2: <div className={`${styles.typeNews} ${styles.vipBg}`}>{"VIP".toUpperCase()}</div>
              }[1]
            }
            
        </Link>
        <div
          className={
            styles.productInfo +
            " d-flex flex-column align-items-start px-3"
          }
        >
          <Link to={`/products/${id}`} className={styles.productTitle}>
            <h4>{title}</h4>
          </Link>
          <p>{desc} </p>
          <b>{price}</b>
          <div
            className={
              styles.otherProductInfo + " d-flex justify-content-between"
            }
          >
            <div>
              <span style={{marginRight:'12px'}}>{area}</span>
              <span>{location}</span>
            </div>

            <span>{createdAt}</span>
            <span><FaRegHeart/></span>
          </div>
        </div>
      </div>
  );
}

export default ProductItem;
