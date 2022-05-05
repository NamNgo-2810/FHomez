import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

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

const wardOptions = [
	{ value: "1", label: "Hoàng Liệt" },
	{ value: "2", label: "Tân Triều" },
	{ value: "3", label: "Khương Đình" },
	{ value: "4", label: "Xuân Tảo" },
];

const roomOptions = [
	{ value: "1", label: "Phòng trọ" },
	{ value: "2", label: "Chung cư mini" },
	{ value: "3", label: "Nhà nguyên căn" },
	{ value: "4", label: "Chung cư nguyên căn" },
];

function Search() {
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

          </div>
          {/* Search by room class */}
          <hr role={"separator"} className="searchbar_item_divider" />
          <div className="searchbar_item">

          </div>
          {/* Search by area */}
          <hr role={"separator"} className="searchbar_item_divider" />
          <div className="searchbar_item">

          </div>
          {/* Search by facilities */}
          <hr role={"separator"} className="searchbar_item_divider" />
          <div className="searchbar_item">

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