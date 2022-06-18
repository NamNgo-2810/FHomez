// Theo tỉnh
const provinceOptions = [
	{ value: "HN", label: "Hà Nội" },
	{ value: "HCM", label: "TP Hồ Chí Minh" },
	{ value: "ĐN", label: "Đà Nẵng" },
	{ value: "TN", label: "Thái Nguyên" },
];

// Theo quận
const districtOptions = [
	{ value: "1", label: "Hai Bà Trưng" },
	{ value: "2", label: "Hoàng Mai" },
	{ value: "3", label: "Thanh Xuân" },
	{ value: "4", label: "Hà Đông" },
	{ value: "5", label: "Cầu Giấy" },
];

// Theo loại phòng
const roomOptions = [
	{ value: "1", label: "Phòng trọ" },
	{ value: "2", label: "Chung cư mini" },
	{ value: "3", label: "Nhà nguyên căn" },
	{ value: "4", label: "Chung cư nguyên căn" },
];

// Theo cơ sở vật chất
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

// Theo giá phòng 
const roomPrice = [
  { value: "500", label: "Giá tối thiểu" },
  { value: "10000", label: "Giá tối đa"}
]

// Theo diện tích
const roomArea = [
  { value: "0", label: "Giá tối thiểu" },
  { value: "200", label: "Giá tối đa"}
]


export {provinceOptions,districtOptions, roomOptions,facilityOptions,roomPrice}