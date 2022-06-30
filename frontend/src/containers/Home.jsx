import React, { useState } from "react";
import Banner from "../components/Banner/Banner";
import Search from "../components/Search/Search";
import ProductList from "./ProductList";

function Home() {
    const [keyword, setKeyword] = useState({
        district: "",
        subDistrict: "",
        street: "",
        min: "",
        max: "",
        category: "",
        minArea: "",
        maxArea: "",
        facilities: "",
        latitude: "",
        longitude: "",
    });

    const [hasQuery, setHasQuery] = useState(false);
    const [queryItems, setQueryItems] = useState([]);

    return (
        <div className="col">
            <Banner></Banner>
            <div className="row">
                <Search
                    keyword={keyword}
                    setKeyword={setKeyword}
                    setHasQuery={setHasQuery}
                    setQueryItems={setQueryItems}
                ></Search>
                <ProductList
                    search={keyword}
                    hasQuery={hasQuery}
                    queryItems={queryItems}
                ></ProductList>
            </div>
        </div>
    );
}

export default Home;
