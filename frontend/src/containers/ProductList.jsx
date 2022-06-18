import React, { useEffect, useState } from "react";
import { Card, Placeholder } from "react-bootstrap";
import ProductItem from "../components/ProductItem/ProductItem";
import { productService } from "../services/home.service.js";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProductList() {
      // let result = await productService.getAll();
      // setIsLoading(false);
      // setProducts(result);
    }

    getProductList();
  }, [products]);


  return (
    <div className="col-9 d-grid gap-3">
      {
      isLoading ? 
      <Card style={{ width: "100%", height: "100%"}}>
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card> : 
      products &&
        products.map((product,i) => (
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
        ))}
    </div>
  );
}

export default ProductList;
