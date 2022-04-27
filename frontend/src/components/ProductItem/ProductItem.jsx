import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductItem.module.scss";

function ProductItem({
  id,
  src,
  title,
  desc,
  price,
  area,
  location,
  createdAt,
}) {
  return (
    <div style={{ width: "700px", height: "auto" }}>
      <div className={styles.container + " d-flex"}>
        <Link to={`/products/${id}`} className={styles.productImage}>
          <img src={src} alt={title} />
        </Link>
        <div
          className={
            styles.productInfo +
            " d-flex flex-column align-items-start px-3"
          }
        >
          <Link to={`/products/${id}`} className={styles.productTitle}>
            <h2>{title}</h2>
          </Link>
          <p>{desc} lorem ipsum dolor sit amet, consectetur adip lore Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nam distinctio est?lorem ipsum dolor sit amet, consectetur adip lore Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nam distinc m Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos, repellat libero sed excepturi sequi quam, aliquid magnam similique culpa molestiae quibusdam, dolorum deserunt perspiciatis ipsam voluptates neque consequuntur eveniet vitae.</p>
          <b>{price}dfdfđ</b>
          <div
            className={
              styles.otherProductInfo + " d-flex justify-content-between"
            }
          >
            <div>
              <span>{area}dfdffd </span>
              <span>{location}fdffdfdf</span>
            </div>

            <span>{createdAt}fdfdfdfdf</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
