import React, { useState } from "react";
import Banner from "../components/Banner/Banner";
import Search from "../components/Search/Search";
import ProductList from "./ProductList";

function Home() {
    const [keyword, setKeyword] = useState({
        // district: "",
        // subDistrict: "",
        // street: "",
        priceWeight: 0.33,
        areaWeight: 0.33,
        distanceWeight : 0.33,
        minCost: -1,
        maxCost: -1,
        // category: "",
        minArea: -1,
        maxArea: -1,
        // facilities: "",
        latitude: "",
        longitude: "",
    });
    console.log(keyword)

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
