import React, { useState } from "react";
import Select from "react-select";
import { roomOptions, facilityOptions } from "./SearchConstant.js";
import styles from "./Search.module.scss";
import MultiRangeSlider from "./MultiRangeSlider";
import { FaSearch } from "react-icons/fa";
import useFilterProvince from "../../helpers/FilterProvince.js";
import { productService } from "../../services/home.service";
import { useEffect } from "react";

const Search = ({ keyword, setKeyword, setHasQuery, setQueryItems }) => {
    const { getDistrict, getSubDistrict, getStreet } = useFilterProvince();

    // get coordinate
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setKeyword((prev) =>
                Object.assign(prev, { latitude: position.coords.latitude })
            );
            setKeyword((prev) =>
                Object.assign(prev, { longitude: position.coords.longitude })
            );
        });
    }, []);

    // Handle Search Results
    const fetchDataQuery = async (e) => {
        e.preventDefault();

<<<<<<< HEAD
        let result = await productService.search(keyword);
        setQueryItems(result);
        setHasQuery(true);
    };
=======
    let result = await productService.search(keyword);
    console.log(result)
    setQueryItems(result);
    setHasQuery(true);
  };
>>>>>>> 3999733038e19f68e9817aad7bceb960a0252cba

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
                        {/* <div className="searchbar_item">
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
                          Object.assign(prev, {
                            district: e.value,
                          })
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
                          Object.assign(prev, {
                            subDistrict: e.value,
                          })
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
                          Object.assign(prev, {
                            street: e.value,
                          })
                        )
                      }
                    ></Select>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="searchbar_item">
              <div className="searchbar_item_input">
                <div className="searchbar_item_input_district">
                  <div className="searchbar_item_input_district_title">
                    <h6>Chọn mức độ ưu tiên(*)</h6>
                  </div>
                  <div className="searchbar_item_input_district_items" style={{ paddingLeft: "24px" }}>
                    <div className="mb-2">
                      <label style={{ width: '100px' }} htmlFor="price">Giá nhà</label>
                      <input style={{ paddingLeft: '4px' }} type="number" min="0" max="1" step="0.1" id="price" onChange={(e) => setKeyword((prev) => Object.assign(prev, {
                        priceWeight: Number(e.target.value)
                      }))} />
                    </div>
                    <div className="mb-2">
                      <label style={{ width: '100px' }} htmlFor="area">Diện tích</label>
                      <input style={{ paddingLeft: '4px' }} type="number" min="0" max="1" step="0.1" id="area" onChange={(e) => setKeyword((prev) => Object.assign(prev, {
                        areaWeight: Number(e.target.value)
                      }))} />
                    </div>
                    <div className="mb-3">
                      <label style={{ width: '100px' }} htmlFor="distance">Khoảng cách</label>
                      <input style={{ paddingLeft: '4px' }} type="number" min="0" max="1" step="0.1" id="distance" onChange={(e) => setKeyword((prev) => Object.assign(prev, {
                        distanceWeight: Number(e.target.value)
                      }))} />
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {/* Search by price */}
            {/* <hr className="searchbar_item_divider" /> */}
            <div className="searchbar_item">
              <div className="searchbar_item_title">
                <h6>Giá thuê/tháng (triệu đồng)</h6>
              </div>
              <div className="searchbar_item_input">
                <div className="searchbar_price_slider">
                  <div className="price_slider_track_container">
                    <MultiRangeSlider
                      min={0}
                      max={6}
                      onChange={({ min, max }) =>
                        setKeyword((prev) =>
                          Object.assign(prev, {
                            minCost: min,
                            maxCost: max,
                          })
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Search by room class */}
            {/* <hr className="searchbar_item_divider" /> */}
            {/* <div className="searchbar_item">
              <div className="searchbar_item_title">Loại phòng</div>
              <div className="searchbar_item_input">
                <div className="searchbar_item_input_class">
                  <div className="searchbar_item_input_class_items">
                    <Select
                      placeholder="Chọn loại phòng"
                      onChange={(e) =>
                        setKeyword((prev) =>
                          Object.assign(prev, {
                            category: e.value,
                          })
                        )
                      }
                      options={roomOptions}
                      // isMulti
                    />
                  </div>
                </div>
              </div>
            </div> */}

<<<<<<< HEAD
                        {/* Search by area */}
                        <hr className="searchbar_item_divider" />
                        <div className="searchbar_item">
                            <div className="searchbar_item_title">
                                <h6>Diện tích (m2)</h6>{" "}
                            </div>
                            <div className="searchbar_item_input">
                                <div className="searchbar_item_input_province">
                                    <div className="searchbar_item_input_province_items">
                                        <MultiRangeSlider
                                            min={0}
                                            max={200}
                                            onChange={({ min, max }) =>
                                                setKeyword((prev) =>
                                                    Object.assign(prev, {
                                                        minArea: min,
                                                        maxArea: max,
                                                    })
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Search by facilities */}
                        <hr className="searchbar_item_divider" />
                        {/* <div className="searchbar_item">
=======
            {/* Search by area */}
            <hr className="searchbar_item_divider" />
            <div className="searchbar_item">
              <div className="searchbar_item_title"><h6>Diện tích (m2)</h6> </div>
              <div className="searchbar_item_input">
                <div className="searchbar_item_input_province">
                  <div className="searchbar_item_input_province_items">
                    <MultiRangeSlider
                      min={0}
                      max={50}
                      onChange={({ min, max }) =>
                        setKeyword((prev) =>
                          Object.assign(prev, {
                            minArea: min,
                            maxArea: max,
                          })
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Search by facilities */}
            <hr className="searchbar_item_divider" />
            {/* <div className="searchbar_item">
>>>>>>> 3999733038e19f68e9817aad7bceb960a0252cba
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
            </div> */}
                        <div className={styles.searchbar_items_button}>
                            <button
                                type="submit"
                                className={
                                    styles.searchbar_items_button_execute
                                }
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
