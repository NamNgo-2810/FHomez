import React, { useState } from "react";
import { Component } from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import { Link } from "react-router-dom";
import styles from "./Search.css"
import MultiRangeSlider from "multi-range-slider-react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

// Thêm trong csdl sau
const provinceOptions = [
	{ value: "HN", label: "Hà Nội" },
	{ value: "HCM", label: "TP Hồ Chí Minh" },
	{ value: "ĐN", label: "Đà Nẵng" },
	{ value: "TN", label: "Thái Nguyên" },
];

const districtOptions = [
	{ value: "1", label: "Hai Bà Trưng" },
	{ value: "2", label: "Hoàng Mai" },
	{ value: "3", label: "Thanh Xuân" },
	{ value: "4", label: "Hà Đông" },
	{ value: "5", label: "Cầu Giấy" },
];

const roomOptions = [
	{ value: "1", label: "Phòng trọ" },
	{ value: "2", label: "Chung cư mini" },
	{ value: "3", label: "Nhà nguyên căn" },
	{ value: "4", label: "Chung cư nguyên căn" },
];

const facilityOptions = [
  { value: "0", label: "Phòng tắm chung" },
  { value: "1", label: "Phòng tắm khép kín" },
	{ value: "2", label: "Khu bếp riêng" },
	{ value: "3", label: "Khu bếp chung" },
  { value: "4", label: "Có nóng lạnh" },
  { value: "5", label: "Có điều hòa" },
  { value: "6", label: "Có ban công" },
  { value: "7", label: "Có tủ lạnh" },
  { value: "8", label: "Có máy giặt" },
  { value: "9", label: "Có giường tủ" },
  { value: "10", label: "Không nóng lạnh" },
  { value: "11", label: "Không điều hòa" },
  { value: "12", label: "Không ban công" },
  { value: "13", label: "Không tủ lạnh" },
  { value: "14", label: "Không máy giặt" },
  { value: "15", label: "Không giường tủ" },
  { value: "16", label: "Không nóng lạnh" },
  { value: "17", label: "Không chung chủ" },
  { value: "18", label: "Chung chủ" },
  { value: "19", label: "Điện nước giá dân" },
  { value: "20", label: "Điện nước giá thuê" },

]

const roomPrice = [
  { value: "500", label: "Giá tối thiểu" },
  { value: "10000", label: "Giá tối đa"}
]

function Search() {
  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  return (
    <div className="rowBody col-4">
      <div className="colSearch" id="">
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
                  <select name="searchbar_item_input_province_items_select" id="province_select">
                    <option hidden disabled selected value>
											Chọn Tỉnh/Thành phố
										</option>										
                    {
                      provinceOptions.map((item) => (
                        <option value={item.value}>{item.label}</option>
                      ) )
                    }
                  </select>
                </div>
              </div>
              <div className="searchbar_item_input_district">
                <div className="searchbar_item_input_district_title">
                Quận/Huyện
                </div>
                <div className="searchbar_item_input_district_items">
                  <select name="searchbar_item_input_district_items_select" id="province_select">
                    <option hidden disabled selected value>
										Chọn Huyện/Quận
										</option>
                    {
                      districtOptions.map((item) => (
                        <option value={item.value}>{item.label}</option>
                      ) )
                    }
                  </select>
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
                {/* <MultiRangeSlider
                  min={0}
                  max={100}
                  step={5}
                  ruler={true}
                  label={true}
                  preventWheel={false}
                  minValue={minValue}
                  maxValue={maxValue}
                  onInput={(e) => {
                    handleInput(e);
                  }}
                /> */}
                <input value={roomPrice[0].value} id="input_min" readOnly="readOnly" tabIndex="-1" />
                <input value={roomPrice[1].value} id="input_max" readOnly="readOnly" tabIndex="-1" />
                <div className="price_slider_track_container">
                  
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
                  {/* <select name="searchbar_item_input_class_items_select" id="province_select">
                    <option hidden disabled selected value>
											Chọn loại phòng
										</option>										
                    {
                      roomOptions.map((item) => (
                        <option value={item.value}>{item.label}</option>
                      ) )
                    }
                  </select> */}
                  
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
                <div className="searchbar_item_input_province_title">
                Tỉnh/Thành phố
                </div>
                <div className="searchbar_item_input_province_items">
                  <select name="searchbar_item_input_province_items_select" id="province_select">
                    <option hidden disabled selected value>
											Chọn Tỉnh/Thành phố
										</option>										
                    {
                      provinceOptions.map((item) => (
                        <option value={item.value}>{item.label}</option>
                      ) )
                    }
                  </select>
                </div>
              </div>
              <div className="searchbar_item_input_district">
                <div className="searchbar_item_input_district_title">
                Quận/Huyện
                </div>
                <div className="searchbar_item_input_district_items">
                  <select name="searchbar_item_input_district_items_select" id="province_select">
                    <option hidden disabled selected value>
										Chọn Huyện/Quận
										</option>
                    {
                      districtOptions.map((item) => (
                        <option value={item.value}>{item.label}</option>
                      ) )
                    }
                  </select>
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
                <div className="searchbar_item_input_province_title">
                Tỉnh/Thành phố
                </div>
                <div className="searchbar_item_input_province_items">
                  <select name="searchbar_item_input_province_items_select" id="province_select">
                    <option hidden disabled selected value>
											Chọn Tỉnh/Thành phố
										</option>										
                    {
                      provinceOptions.map((item) => (
                        <option value={item.value}>{item.label}</option>
                      ) )
                    }
                  </select>
                </div>
              </div>
              <div className="searchbar_item_input_district">
                <div className="searchbar_item_input_district_title">
                Quận/Huyện
                </div>
                <div className="searchbar_item_input_district_items">
                  <select name="searchbar_item_input_district_items_select" id="province_select">
                    <option hidden disabled selected value>
										Chọn Huyện/Quận
										</option>
                    {
                      districtOptions.map((item) => (
                        <option value={item.value}>{item.label}</option>
                      ) )
                    }
                  </select>
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