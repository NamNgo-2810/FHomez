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

  return (
    <div className="rowBody col-3">
      <div className={styles.colSearch}>
        <div className={styles.searchbar_title}>
          <FaSearch /> Bộ lọc tìm kiếm
        </div>
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
                    onChange={({ min, max }) => console.log()}
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
                    options={roomOptions}
                    isMulti
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
                    onChange={({ min, max }) => console.log()}
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
                    options={facilityOptions}
                    isMulti
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.searchbar_items_button}>
            <button className={styles.searchbar_items_button_execute}>
              <Link
                to="productDetail"
                className="searchbar_items_button_explore_toProductDetail"
              >
                Tìm kiếm
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
