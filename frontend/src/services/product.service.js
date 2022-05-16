import axiosClient from "../apiConfig/axiosClient";


const data = [
    {
      "src": "https://img.thuephongtro.com/images/thumb/2020/04/29/20200429120046-0zgfo.jpg",
      "title": "Nhà A còn p.đẹp, rẻ 14-18m giá 1.6tr-1.9tr c thuê, Định Công Thượng,4 tầng giờ giấc t mái miễn TG",
      "desc": " Còn 1 phòng đẹp anh cho người đi làm SV... thuê. (PHòng ưu tiên 1-2 bạn ở) Nhà xây 4 tầng BT hiện đại. - Thời gian đi lại thoải mái tự do như ở nhà mình. Diện tích 15m- 18m2. - Internet điện nước rất rẻ. - Nóng lạnh",
      "price": "1.9 Triệu/tháng",
      "area": "Diện tích: 20 m²",
      "location": "Khu vực: Hoàng Mai, Hà Nội",
      "createdAt": "Cập nhật: 19/04/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2022/04/09/20220409142449-1scvp.jpg",
      "title": "Cho thuê phòng 24m2 khép kín tại Q.Hoàn Kiếm",
      "desc": " - Diện tích: 24m2 - Phòng vệ sinh khép kín có bình nóng lạnh - Điện nước đầy đủ an ninh tốt sống cùng nhà chủ. - Phòng rộng rãi thoáng mát. - Gần trường Đại học Dược Bệnh viện 108 gần Nhà Hát Lớn. - Ưu tiên sinh viên",
      "price": "2.8 Triệu/tháng",
      "area": "Diện tích: 24 m²",
      "location": "Khu vực: Hoàn Kiếm, Hà Nội",
      "createdAt": "Cập nhật: 16/04/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2020/06/13/20200613162602-ivraf.jpg",
      "title": "PhòngTốt,Thoáng dt25m,gíá 2.1tr, anh cho thuê ởP.Tân mai, giờ giấc thoải mái MTG",
      "desc": " Nhà anh còn 1 phòng tốt rẻ anh c cho người đi làm SV thuê ở tự do thoải mái. - Nhà biệt thự 5 tầng. Phòng 2.1tr (2-3 bạn nam ở) - Nóng lạnh vòi hoa sen bồn rửa mặt gương xí bệt sạch sẽ. - Giờ giấc đi",
      "price": "2.1 Triệu/tháng",
      "area": "Diện tích: 25 m²",
      "location": "Khu vực: Hoàng Mai, Hà Nội",
      "createdAt": "Cập nhật: 15/04/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2020/06/13/20200613162916-rg0hm.jpg",
      "title": "Nhà anh còn.p.Đẹp, tiện nghi,sống thoải mái dt20-25m2,giá 1.9tr- 2.3tr Nguyễn xiển,gần khu Linh Đàm",
      "desc": " Anh cho thuê phòng đẹp nhà 5 tầng liền kề sạch đẹp khép kín gần hồ công viên chợ gần các trường ĐH ở tự do. Nhà mới xây khép kín bao gồm các thiết bị hiện đại Không gian rộng rãi ánh sáng và thoáng gió. Phía trước tòa",
      "price": "1.9 Triệu/tháng",
      "area": "Diện tích: 20 m²",
      "location": "Khu vực: Hoàng Mai, Hà Nội",
      "createdAt": "Cập nhật: 15/04/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2020/07/27/20200727101233-xoazb.jpg",
      "title": "Cho thuê phòng  không chung chủ  ở phố Hào Nam",
      "desc": " Cho thuê phòng ở phố Hào Nam diện tích 10m2 công trình phụ 5m2 bếp chỗ phơi quần áo sân rộng 30m2 để xe Nhà xây để ở nên rất đẹp và sạch sẽ thoáng mát yên tĩnh. gần trung tâm thành phố Hà Nội thuận tiện cho việc đi",
      "price": "1.7 Triệu/tháng",
      "area": "Diện tích: 15 m²",
      "location": "Khu vực: Đống Đa, Hà Nội",
      "createdAt": "Cập nhật: 15/04/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2022/04/12/20220412140710-lswmx.jpg",
      "title": "Cho thuê nhà chính chủ- Lạc Long Quân- Cầu Giấy- Hà Nội",
      "desc": " Nhà mình còn một số phòng ở khép kín cho thuê. DT phòng từ 20-22m khép kín có nóng lạnh có 2 gác xép có bếp trong phòng. nhà gần các trường chợ Nghĩa Đô chợ Bưởi Hồ tây( ưu tiên người đi làm và gia đình thuê). Liên hệ",
      "price": "2 Triệu/tháng",
      "area": "Diện tích: 20 m²",
      "location": "Khu vực: Cầu Giấy, Hà Nội",
      "createdAt": "Cập nhật: 12/04/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2022/04/12/20220412140314-1eiht.jpg",
      "title": "Cho Thuê Căn Hộ Khu Tập Thể Nam Đồng - 30M2 - Công Trình Phụ Khép Kín",
      "desc": " Cho thuê căn hộ trên tầng 2 khu tập thể Nam Đồng khu dân trí cao an ninh tốt gần chợ và trường học các cấp giao thông thuận tiện. Diện tích 30m2 công trình phụ khép kín nhà sạch sẽ thoáng mát. Điện nước theo giá nhà nước giá",
      "price": "3.3 Triệu/tháng",
      "area": "Diện tích: 30 m²",
      "location": "Khu vực: Đống Đa, Hà Nội",
      "createdAt": "Cập nhật: 12/04/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2022/03/01/20220301230213-5gfsw.jpg",
      "title": "CHO THUÊ PHÒNG TRỌ ĐỦ ĐỒ 27m2 KHU VỰC TRƯỜNG CHINH THANH XUÂN - LIÊN HỆ: 0867703862",
      "desc": " Chính chủ cho thuê phòng trọ trong nhà 4 tầng phòng đẹp full đồ khu Trường Chinh Thanh Xuân. Nằm ở vị trí trung tâm cách đại học Bách Khoa Kinh tế quốc dân Xây Dựng 1.7km cách Đại học Y 1km gần chợ xanh Định công ... - Giá:",
      "price": "3 Triệu/tháng",
      "area": "Diện tích: 27 m²",
      "location": "Khu vực: Thanh Xuân, Hà Nội",
      "createdAt": "Cập nhật: 01/04/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2020/12/27/20201227135056-ozjda.jpg",
      "title": "Cho thuê CCMN tại Kim Giang, thoáng mát, ban cồn rộng, nội thất mới",
      "desc": " Cho thuê CCMN tại Kim Giang thoáng mát ban cồn rộng nội thất mới. Hiện tại mình có 1 phòng tại ngõ 64 Kim Giang với lỗi đi lại thuận tiện 200m đi thông ra Nguyễn Xiển sát đường Hoàng Đạo Thành nhà thuộc lô góc thuận tiền đi lại",
      "price": "4.5 Triệu/tháng",
      "area": "Diện tích: 32 m²",
      "location": "Khu vực: Thanh Xuân, Hà Nội",
      "createdAt": "Cập nhật: 11/04/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2022/03/29/20220329083824-fbkxa.jpg",
      "title": "Hot Hot Hot!!! Chính chủ cho thuê mặt bằng kinh doanh giá rẻ, mặt chợ",
      "desc": " Hot Hot Hot!!! Chính chủ cho thuê mặt bằng kinh doanh Hiện mình có 1 ki ốt cho thuê tại Kim Giang Hoàng Đạo Thành. Mặt bằng kinh doanh lô góc với 2 mặt thoáng 6m rất thu hút của mọi người đi lại. nhà nằm vị trí đắc địa",
      "price": "4.3 Triệu/tháng",
      "area": "Diện tích: 36 m²",
      "location": "Khu vực: Thanh Xuân, Hà Nội",
      "createdAt": "Cập nhật: 11/04/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2021/07/14/20210714141450-40r0z.jpg",
      "title": "Cập nhật phòng trọ chính chủ cho thuê giá rẻ tại khu vực Vĩnh Hưng – Vĩnh Tuy – Lĩnh Nam",
      "desc": " Cập nhật phòng trọ chính chủ cho thuê giá rẻ tại khu vực Vĩnh Hưng Vĩnh Tuy Lĩnh Nam. ️ hiện mình có các loại phòng từ 18 đến 30m với giá cho thuê từ 1 3tr 1 5tr-2 3tr chính chủ cho thuê có thể dọn đến ở luôn.",
      "price": "1.4 Triệu/tháng",
      "area": "Diện tích: 25 m²",
      "location": "Khu vực: Hoàng Mai, Hà Nội",
      "createdAt": "Cập nhật: 05/04/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2021/05/27/20210527170043-pdwja.jpg",
      "title": "cho thuê phòng trọ + gác xép rộng dãi thoáng mát , đủ đồ tại hoàng mai",
      "desc": " Cho thuê nhà DỌN VÀO Ở NGAY nhà thuộc khu vực thuận tiên đí lại về các ngả chỉ 5p ra hồ đền lừ 10p ra phố Minh Khai Mai động. nhà có sân rộn 300 th hộ để xe và sân chơi thoải mái. Diện tích 25m giờ giấc",
      "price": "3 Triệu/tháng",
      "area": "Diện tích: 32 m²",
      "location": "Khu vực: Hoàng Mai, Hà Nội",
      "createdAt": "Cập nhật: 02/04/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2021/07/20/20210720082332-fj53b.jpg",
      "title": "Cho thuê phòng - không chung chủ - ở phố Hào Nam",
      "desc": " Cho thuê phòng ở phố Hào Nam diện tích 20m2 công trình phụ 5m2 bếp chỗ phơi quần áo sân rộng 30m2 để xe Nhà xây để ở nên rất đẹp và sạch sẽ thoáng mát yên tĩnh. gần trung tâm thành phố Hà Nội thuận tiện cho việc đi",
      "price": "2.5 Triệu/tháng",
      "area": "Diện tích: 20 m²",
      "location": "Khu vực: Đống Đa, Hà Nội",
      "createdAt": "Cập nhật: 28/03/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2021/07/04/20210704095621-f4th3.jpg",
      "title": "Chính chủ cho thuê phòng trọ tại Vĩnh Hưng chỉ 1,4tr/tháng, điện nước giá rẻ",
      "desc": " Chính chủ cho thuê phòng trọ tại Vĩnh Hưng chỉ 1 4tr/tháng điện nước giá rẻ. chính chủ cho thuê phòng diện tích 20m tại tầng 3 trong nhà 3 tầng giá thuê 1 4tr/tháng. Nhà không chung chủ giờ giấc thoải mái vài bước ra phố 200 ra chợ",
      "price": "4300 Triệu/tháng",
      "area": "Diện tích: 30 m²",
      "location": "Khu vực: Hoàng Mai, Hà Nội",
      "createdAt": "Cập nhật: 28/03/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2022/03/12/20220312190244-xzi5e.jpg",
      "title": "Cho thuê nhà chính chủ- Lạc Long Quân- Cầu Giấy- Hà Nội",
      "desc": " Gia đình mình còn một số phòng ở Lạc Long QUân Cho thuê. DT phòng từ 20-25m khép kín có nóng lạnh có 2 gác xép có bếp trong phòng. Nhà gần các trường chợ Nghĩa Đô chợ Bưởi Hồ Tây. Gía tiền thuê từ 2-2 5tr/ 1 tháng. (",
      "price": "2 Triệu/tháng",
      "area": "Diện tích: 20 m²",
      "location": "Khu vực: Cầu Giấy, Hà Nội",
      "createdAt": "Cập nhật: 12/03/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2020/08/06/20200806113442-ll40t.jpg",
      "title": "Chính chủ cho thuê phòng trọ tại Vĩnh HCho thuê phòng giá rẻ, điều hòa, nóng lạnh chỉ 2.8 tr/th",
      "desc": " Chính chủ cho thuê phòng trọ tại Vĩnh HCho thuê phòng giá rẻ điều hòa nóng lạnh chỉ 1 7tr/th. hiên mình có 1 phòng với diên tích 22m tại tầng 4 trong nhà 4 tầng được trang bị Điều Hòa nóng lạnh máy giặt tủ quần áo cũ. phòng",
      "price": "2.8 Triệu/tháng",
      "area": "Diện tích: 22 m²",
      "location": "Khu vực: Hoàng Mai, Hà Nội",
      "createdAt": "Cập nhật: 10/03/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2021/09/27/20210927231453-buwxu.jpg",
      "title": "CHO THUÊ PHÒNG TRỌ CHUNG CƯ MINI 20m2. 2TR2 /THÁNG (Tầng 4 - 2TR)",
      "desc": " Cho thuê phòng trọ 20m2 tầng 2 3 hoặc 4 (riêng tầng 4 là 2 tr): 2 tr 2/tháng (ưu tiên hộ gia đình) - Có đầy đủ vệ sinh/gác xép và ban công rộng rãi. - Có nơi gửi xe có BẢO VỆ TRÔNG GIỮ XE 24/24. - Phòng",
      "price": "2.2 Triệu/tháng",
      "area": "Diện tích: 20 m²",
      "location": "Khu vực: Hoàng Mai, Hà Nội",
      "createdAt": "Cập nhật: 05/03/2022"
    },
    {
      "src": "https://img.thuephongtro.com/images/thumb/2022/02/28/20220228091228-c04nq.jpg",
      "title": "Cho sinh viên nữ thuê phòng trọ khép kín",
      "desc": " Cho sinh viên nữ thuê phòng trọ khu tập thể Nam Đồng diện tích 17m2 có gác xép công trình phụ khép kín điều hòa. Khu quân đội an ninh tốt. Gần chợ trường đi lại thuận tiện.Lối đi riêng không chung với chủ nhà.Điện 3 500đ/số nước 20 000đ/số",
      "price": "2.8 Triệu/tháng",
      "area": "Diện tích: 17 m²",
      "location": "Khu vực: Đống Đa, Hà Nội",
      "createdAt": "Cập nhật: 28/02/2022"
    }
]

const getAll = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(data),2000)
    })

}

const getById = (id) => {

}


const search = (keyword) => {

}


export const productService = {
    getAll,
    getById,
    search
}