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

    let result = await productService.search(keyword);
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
                          Object.assign(prev, {
                            min: min,
                            max: max,
                          })
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
