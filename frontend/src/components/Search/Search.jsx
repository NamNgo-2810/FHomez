import React, { useState } from "react";
import Select from "react-select";
import { roomOptions, facilityOptions } from "./SearchConstant.js";
import styles from "./Search.module.scss";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import useFilterProvince from "../../helpers/FilterProvince.js";

const Search = () => {
  const { getDistrict, getSubDistrict, getStreet } = useFilterProvince();

  // Filter then return a list of rooms
  

  // Get Element for filter
  const [district, setDistrict] = useState(null);
  const [subDistrict, setSubDistrict] = useState(null);
  const [street, setStreet] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [category, setCategory] = useState(null);
  const [maxArea, setMaxArea] = useState(null);
  const [minArea, setMinArea] = useState(null);
  const [facilities, setFacilities] = useState([]);
  
  const handleDistrictChange = e => { 
    setDistrict(e.value);
  }

  const handleSubDistrictChange = e => { 
    setSubDistrict(e.value);
  }

  const handleStreetChange = e => { 
    setStreet(e.value);
  }

  const handleMaxPriceChange = e => { 
    setMaxPrice(e);
  }

  const handleMinPriceChange = e => { 
    setMinPrice(e);
  }

  const handleCategoryChange = e => {
    setCategory(e.value);
  }

  const handleMaxAreaChange = e => { 
    setMaxArea(e);
  }

  const handleMinAreaChange = e => { 
    setMinArea(e);
  }

  const handleFacilitiesChange = (e) => { 
    setFacilities(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  //const [district, setDistrict] = useState(null);
  function TestButton() {
    console.log("District: " + district);
    console.log("SubDistrict: " + subDistrict);
    console.log("Street: " + street);
    console.log("MaxPrice: " + maxPrice);
    console.log("MinPrice: " + minPrice);
    console.log("Category: " + category);
    console.log("MaxArea: " + maxArea);
    console.log("MinArea: " + minArea);
    console.log("Facilities: " + facilities);
  }

  // Handle Search Results 
  const Search = ({ keyword, setKeyword, setHasQuery, setQueryItems }) => {
    const { getDistrict, getSubDistrict, getStreet } = useFilterProvince();
  
    const fetchDataQuery = async (e) => {
      e.preventDefault();
  
      const { min, max, minArea, maxArea } = keyword;
      let result = await productService.search({
        minCost: min,
        maxCost: max,
        minArea: minArea,
        maxArea: maxArea,
      });
      console.log(result);
      setQueryItems(result);
      setHasQuery(true);
    };

  return (
    <div className="rowBody col-3">
      <div className={styles.colSearch}>
        <div className={styles.searchbar_title}>
          <FaSearch /> Bộ lọc tìm kiếm
        </div>
        <form onSubmit={(e) => fetchDataQuery(e)}>
          <div className={styles.searchbar_items}>
            {/* Search by geographical location */}
            <hr className="searchbar_item_divider" />
            <div className="searchbar_item">
              <div className="searchbar_item_input">
                <div className="searchbar_item_input_district">
                  <div className="searchbar_item_input_district_title">
                    Quận/Huyện
                  </div>
                  <div className="searchbar_item_input_district_items">
                    <Select
                      placeholder="Chọn quận/huyện"
                      options={getDistrict()}
                      onChange={(e) =>
                        setKeyword((prev) =>
                          Object.assign(prev, { district: e.value })
                        )
                      }
                    ></Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="searchbar_item mt-3">
              <div className="searchbar_item_input">
                <div className="searchbar_item_input_district">
                  <div className="searchbar_item_input_district_title">
                    Phường/xã
                  </div>
                  <div className="searchbar_item_input_district_items">
                    <Select
                      placeholder="Chọn phường/xã"
                      options={getSubDistrict()}
                      onChange={(e) =>
                        setKeyword((prev) =>
                          Object.assign(prev, { subDistrict: e.value })
                        )
                      }
                    ></Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="searchbar_item mt-3">
              <div className="searchbar_item_input">
                <div className="searchbar_item_input_district">
                  <div className="searchbar_item_input_district_title">
                    Đường phố
                  </div>
                  <div className="searchbar_item_input_district_items">
                    <Select
                      placeholder="Chọn đường phố"
                      options={getStreet()}
                      onChange={(e) =>
                        setKeyword((prev) =>
                          Object.assign(prev, { street: e.value })
                        )
                      }
                    ></Select>
                  </div>
                </div>
              </div>
            </div>
            {/* Search by price */}
            <hr className="searchbar_item_divider" />
            <div className="searchbar_item">
              <div className="searchbar_item_title">
                Giá thuê/tháng (triệu đồng)
              </div>
              <div className="searchbar_item_input">
                <div className="searchbar_price_slider">
                  <div className="price_slider_track_container">
                    <MultiRangeSlider
                      min={0}
                      max={50}
                      onChange={({ min, max }) =>
                        setKeyword((prev) =>
                          Object.assign(prev, { min: min, max: max })
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Search by room class */}
            <hr className="searchbar_item_divider" />
            <div className="searchbar_item">
              <div className="searchbar_item_title">Loại phòng</div>
              <div className="searchbar_item_input">
                <div className="searchbar_item_input_class">
                  <div className="searchbar_item_input_class_items">
                    <Select
                      placeholder="Chọn loại phòng"
                      onChange={(e) =>
                        setKeyword((prev) =>
                          Object.assign(prev, { category: e.value })
                        )
                      }
                      options={roomOptions}
                      // isMulti
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Search by area */}
            <hr className="searchbar_item_divider" />
            <div className="searchbar_item">
              <div className="searchbar_item_title">Diện tích (m2)</div>
              <div className="searchbar_item_input">
                <div className="searchbar_item_input_province">
                  <div className="searchbar_item_input_province_items">
                    <MultiRangeSlider
                      min={0}
                      max={200}
                      onChange={({ min, max }) =>
                        setKeyword((prev) =>
                          Object.assign(prev, { areaMin: min, areaMax: max })
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Search by facilities */}
            <hr className="searchbar_item_divider" />
            <div className="searchbar_item">
              <div className="searchbar_item_title">Cơ sở vật chất</div>
              <div className="searchbar_item_input">
                <div className="searchbar_item_input_province">
                  <div className="searchbar_item_input_province_items">
                    <Select
                      placeholder="Chọn cơ sở vật chất"
                      onChange={(e) =>
                        setKeyword((prev) =>
                          Object.assign(prev, {
                            facilities: e.map((el) => el.value),
                          })
                        )
                      }
                      options={facilityOptions}
                      isMulti
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.searchbar_items_button}>
              <button
                type="submit"
                className={styles.searchbar_items_button_execute}
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
