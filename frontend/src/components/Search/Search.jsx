import React, { useState } from "react";
import Select from "react-select";
import { provinceOptions, districtOptions, roomOptions, facilityOptions, roomPrice } from "./SearchConstant.js"
import MultiRangeSlider from "multi-range-slider-react";
import styles from "./Search.module.scss"

const Search = () => {
  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  return (
    <div className="rowBody col-3">
      <div className="colSearch">
        <div className="searchbar_title">
          Bộ lọc tìm kiếm
          <button type="button" className="searchbar_title_collapse_button">
            <span className="searchbar_title_collapse_button_span">
              <strong>^</strong> 
              <i></i>
            </span>
          </button>
        </div>
        <div className="searchbar_items">          
          {/* Search by geographical location */}
          <hr role={"separator"} className="searchbar_item_divider" />
          <div className="searchbar_item">
            <div className="searchbar_item_title">Vị trí</div>
            <div className="searchbar_item_input">
              <div className="searchbar_item_input_province">
                <div className="searchbar_item_input_province_title">
                Tỉnh/Thành phố
                </div>
                <div className="searchbar_item_input_province_items">
                  <Select options={provinceOptions}></Select>
                </div>
              </div>
              <div className="searchbar_item_input_district">
                <div className="searchbar_item_input_district_title">
                Quận/Huyện
                </div>
                <div className="searchbar_item_input_district_items">
                  <Select options={districtOptions}></Select>
                </div>
              </div>
            </div>
          </div>
          {/* Search by price */}
          <hr role={"separator"} className="searchbar_item_divider" />
          <div className="searchbar_item">
            <div className="searchbar_item_title">Giá thuê/tháng (nghìn đồng)</div>
            <div className="searchbar_item_input">
              <div className="searchbar_price_slider">
                <div className="price_slider_track_container">
                <MultiRangeSlider
                    baseClassName={styles.multiRangeSliderCustom + " multi-range-slider"}
                    min={0}
                    max={100}
                    step={5}
                  label={true}
                  ruler={false}
                    preventWheel={false}
                    minValue={minValue}
                    maxValue={maxValue}
                    onInput={(e) => {
                      handleInput(e);
                    }}
                />
                </div>
              </div>
            </div>
          </div>
          {/* Search by room class */}
          <hr role={"separator"} className="searchbar_item_divider" />
          <div className="searchbar_item">
            <div className="searchbar_item_title">Loại phòng</div>
            <div className="searchbar_item_input">
              <div className="searchbar_item_input_class">
                <div className="searchbar_item_input_class_items">
                <Select options={roomOptions} />
                </div>
              </div>
            </div>
          </div>

          {/* Search by area */}
          <hr role={"separator"} className="searchbar_item_divider" />
          <div className="searchbar_item">
          <div className="searchbar_item_title">Diện tích</div>
            <div className="searchbar_item_input">
              <div className="searchbar_item_input_province">
                <div className="searchbar_item_input_province_items">
                <MultiRangeSlider
                    baseClassName={styles.multiRangeSliderCustom + " multi-range-slider"}
                    min={0}
                    max={100}
                    step={5}
                    label={true}
                    ruler={false}
                    preventWheel={false}
                    minValue={minValue}
                    maxValue={maxValue}
                    onInput={(e) => {
                      handleInput(e);
                    }}
                />
                </div>
              </div>
            </div>
          </div>
          {/* Search by facilities */}
          <hr role={"separator"} className="searchbar_item_divider" />
          <div className="searchbar_item">
          <div className="searchbar_item_title">Cơ sở vật chất</div>
            <div className="searchbar_item_input">
              <div className="searchbar_item_input_province">
                <div className="searchbar_item_input_province_items">
                  <Select options={facilityOptions}></Select>
                </div>
              </div>
            </div>
          </div>
          <button className="searchbar_items_button_execute">
          Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  )
}

export default Search