import React, { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem/ProductItem";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProduct() {}

    fetchProduct();
  });

  return (
    <div className="col-8">
      {products &&
        products.map((product) => 
          <ProductItem
            key={product.id}
            id={product.id}
            src={product.src}
            title={product.title}
            desc={product.desc}
            price={product.price}
            area={product.area}
            location={product.location}
            createdAt={product.createdAt}
          ></ProductItem>
        )}
    </div>
  );
}

export default ProductList;
