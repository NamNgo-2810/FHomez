import React, { useState, useMemo, useEffect, useContext } from "react";
import styles from "./UploadForm.module.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "react-bootstrap";
import PreviewImage from "./PreviewImage.jsx";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../services/firebase.service.js";
import { provinceData } from "./Province.js";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import CalculatePrice from "../../helpers/CalculatePrice";
import { facilityOptions } from "../Search/SearchConstant";
import Select from "react-select";
import { productService } from "../../services/home.service";

// Handle message error validation
const validationSchema = yup.object().shape({
  district: yup.string().required("Quận/huyện không được để trống"),
  subDistrict: yup.string().required("Phường/xã không được để trống"),
  street: yup.string().required("Đường không được để trống"),
  address: yup.string().required("Địa chỉ không được để trống"),
  title: yup.string().required("Tiêu đề bài viết không được để trống"),
  category: yup.string().required("Chuyên mục không được để trống"),
  area: yup.number().required("Diện tích không được để trống"),
  price: yup.number("Giá phải là số").required("Giá tiền không được để trống"),
  content: yup
    .string()
    .required("Nội dung không được để trống")
    .min(10, "Nội dung quá ngắn, nội dung cần nhiều hơn 10 kí tự")
    .max(100, "Nội dung quá dài,nội dung cần ít hơn 100 kí tự"),
  typeOfNews: yup.number().required("Loại tin không được để trống"),
  dayOfNews: yup.number().required("Số ngày đăng tin không được để trống"),
  status: yup.number().default(0),
});

const UploadForm = () => {
  const [files, setFiles] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);
  const days = useMemo(() => Array.from(new Array(100), (x) => 1), []);

  // react-hook-form
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  // watch fields update realtime
  const watchFields = watch(
    ["district", "subDistrict", "street", "typeOfNews", "dayOfNews"],
    {
      district: "",
      subDistrict: "",
      street: "",
      typeOfNews: 1,
      dayOfNews: 1,
    }
  );

  // handle update location
  const [subDistricts, setSubDistricts] = useState([]);
  const [streets, setStreets] = useState([]);
  const [typeOfNews, setTypeOfNews] = useState(1);
  const [dayOfNews, setDayOfNews] = useState(1);

  // handle update facilities
  const [facilities, setFacilities] = useState([]);
  const handleChangeFacilities = (e) => {
    setFacilities(e.map((e) => e.value));
  };

  useEffect(() => {
    setSubDistricts(
      provinceData.district.find((e) => e.name === watchFields[0])?.ward
    );
    setStreets(
      provinceData.district.find((e) => e.name === watchFields[0])?.street
    );
    setTypeOfNews(watchFields[3] && watchFields[3]);
    setDayOfNews(watchFields[4] && watchFields[4]);
  }, [watchFields]);

  // get price
  const [price, setPrice] = useState({
    hotPrice: ["20000", "200000", "800000"],
    vipPrice: ["18000", "180000", "650000"],
    normalPrice: ["12000", "120000", "300000"],
  });

  // get coordinate
  const [coordinate, setCoordinate] = useState({
    latitude: "",
    longitude: "",
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoordinate((prev) => Object.assign(prev, {latitude: position.coords.latitude}));
      setCoordinate((prev) => Object.assign(prev, {longitude: position.coords.longitude}));
    });
  }, []);

  const handleUploadForm = async (data) => {
    if (files.length !== 0) {
      const promises = [];
      const uid = Date.now();
      files.forEach((file) => {
        const uploadTask = uploadBytesResumable(
          ref(storage, `${file.path}-${uid}`),
          file
        ).then((result) => {
          return getDownloadURL(result.ref);
        });

        promises.push(uploadTask);
      });

      Promise.all(promises).then((result) => {
        let date = new Date();
        let currentTime =
          date.getDate() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getFullYear();
        data.src = result;
        data.facilities = facilities;
        data.createdAt = currentTime;
        data.longitude = coordinate.longitude
        data.latitude = coordinate.latitude
        
        // api store to my sql
        //if success: Gọi onShowSuccess
        productService
          .addHome(data)
          .then(() => {
            onShowSuccess();
          })
          .catch((err) => {
            console.log(err);
            onShowError();
          });
        //if false: Gọi onShowError
      });
    } else {
      alert("Pls choose at least 1 image");
    }
  };

  const onShowSuccess = () => {
    reset();
    setSuccess(true);
    setFiles([]);
    setTimeout(() => {
      setSuccess(false);
    }, 2200);
  };

  const onShowError = () => {
    reset();
    setError(true);
    setFiles([]);
    setTimeout(() => {
      setError(false);
    }, 2200);
  };

  return (
    <>
      <div className={`${styles.container} container row`}>
        <form
          className="col-8 text-start"
          onSubmit={handleSubmit(handleUploadForm)}
        >
          <div className="row shadow bg-body rounded mb-5">
            <h3>Địa chỉ cho thuê</h3>
            <div className="row mt-3 mb-3">
              <div className="col">
                <label>Quận/Huyện(*)</label>
                <select className="form-select" {...register("district")}>
                  <option
                    label="--Chọn quận/huyện--"
                    key="district-choose"
                  ></option>
                  {provinceData.district.map((e) => (
                    <option
                      key={e.id}
                      value={e.name}
                    >{`${e.pre} ${e.name}`}</option>
                  ))}
                </select>
                <p style={{ color: "red" }}>{errors.district?.message}</p>
              </div>
              <div className="col"></div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label>Phường/Xã(*)</label>
                <select className="form-select" {...register("subDistrict")}>
                  <option
                    label="--Chọn phường/xã--"
                    key="subDistrict-choose"
                  ></option>
                  {subDistricts &&
                    subDistricts.map((e) => (
                      <option
                        key={e.id}
                        value={e.pre + " " + e.name}
                      >{`${e.pre} ${e.name}`}</option>
                    ))}
                </select>
                <p style={{ color: "red" }}>{errors.subDistrict?.message}</p>
              </div>
              <div className="col">
                <label>Đường/Phố(*)</label>
                <select className="form-select" {...register("street")}>
                  <option label="--Chọn đường phố--"></option>
                  {streets &&
                    streets.map((e) => (
                      <option
                        key={e.id}
                        value={e.pre + " " + e.name}
                      >{`${e.pre} ${e.name}`}</option>
                    ))}
                </select>
                <p style={{ color: "red" }}>{errors.street?.message}</p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label>Địa chỉ(*)</label>
                <div className="input-group">
                  <input
                    style={{
                      height: "40px",
                      paddingLeft: "12px",
                    }}
                    defaultValue={
                      watchFields[0] &&
                      watchFields[1] &&
                      watchFields[2] &&
                      `${watchFields[2]}, ${watchFields[1]}, ${watchFields[0]}`
                    }
                    className="form-control"
                    type="text"
                    {...register("address")}
                  />
                </div>
                <p style={{ color: "red" }}>{errors.address?.message}</p>
              </div>
            </div>
          </div>
          <div className="row shadow bg-body rounded mb-5">
            <h3>Thông tin cho thuê</h3>
            <div className="row mt-3 mb-3">
              <label>Tiêu đề tin(*)</label>
              <div className="input-group">
                <input
                  style={{
                    height: "40px",
                    paddingLeft: "12px",
                  }}
                  className="form-control"
                  type="text"
                  {...register("title")}
                />
              </div>
              <p style={{ color: "red" }}>{errors.title?.message}</p>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label>Chuyên mục(*)</label>
                <select className="form-select" {...register("category")}>
                  <option value="Phòng trọ đơn">Phòng trọ đơn</option>
                  <option value="Chung cư mini">Chung cư mini</option>
                  <option value="Nhà nguyên căn">Nhà nguyên căn</option>
                </select>
                <p style={{ color: "red" }}>{errors.category?.message}</p>
              </div>
              <div className="col">
                <label>Diện tích(*)</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    {...register("area")}
                  />
                  <span className="input-group-text">m2</span>
                </div>
                <p style={{ color: "red" }}>{errors.area?.message}</p>
              </div>
            </div>

            <div className="row mb-3">
              <label>Chọn cơ sở vật chất(*)</label>
              <Select
                required
                placeholder="Chọn cơ sở vật chất"
                options={facilityOptions}
                onChange={(e) => handleChangeFacilities(e)}
                isMulti
              />
            </div>

            <div className="row mb-3">
              <div className="col">
                <label>Giá cho thuê(*)</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    {...register("price")}
                  />
                  <span className="input-group-text">triệu/tháng</span>
                </div>
                <p style={{ color: "red" }}>{errors.price?.message}</p>
              </div>
            </div>
            <div className="row mb-3">
              <label>Nội dung(*)</label>
              <div className="form-floating">
                <textarea
                  style={{ maxHeight: "200px", padding: "8px 8px" }}
                  className="form-control"
                  {...register("content")}
                ></textarea>
              </div>
              <p style={{ color: "red" }}>{errors.content?.message}</p>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label>Tên liên hệ(*)</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    value={user && user.displayName}
                    disabled
                  />
                </div>
              </div>
              <div className="col">
                <label>Điện thoại(*)</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    value={user && user.phoneNumber}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row shadow bg-body rounded mb-5">
            <h3>Hình ảnh</h3>
            <div className="row">
              <PreviewImage files={files} setFiles={setFiles} />
            </div>
            <div className="row"></div>
          </div>
          <div className="row shadow bg-body rounded mb-5">
            <h3>Lịch đăng tin</h3>
            <div className="row mt-3 mb-3">
              <table className="table table-striped text-center">
                <thead>
                  <tr className="table-primary">
                    <th>Loại tin</th>
                    <th>Gói ngày</th>
                    <th>Gói tuần (7 ngày)</th>
                    <th>Gói tháng (30 ngày)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        textTransform: "uppercase",
                        color: "#bf0a0a",
                        fontWeight: "bold",
                      }}
                    >
                      Tin hot
                    </td>
                    {price.hotPrice &&
                      price.hotPrice.map((e) => <td key={e}>{e}</td>)}
                  </tr>
                  <tr>
                    <td
                      style={{
                        textTransform: "uppercase",
                        color: "#f60",
                        fontWeight: "bold",
                      }}
                    >
                      Tin vip
                    </td>
                    {price.vipPrice &&
                      price.vipPrice.map((e) => <td key={e}>{e}</td>)}
                  </tr>
                  <tr>
                    <td
                      style={{ textTransform: "uppercase", fontWeight: "bold" }}
                    >
                      Tin thường
                    </td>
                    {price.normalPrice &&
                      price.normalPrice.map((e) => <td key={e}>{e}</td>)}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label>Loại tin(*)</label>
                <select className="form-select" {...register("typeOfNews")}>
                  <option value="1">Tin thường</option>
                  <option value="2">Tin vip</option>
                  <option value="3">Tin hot</option>
                </select>
              </div>
              <div className="col">
                <label>Số ngày(*)</label>
                <select className="form-select" {...register("dayOfNews")}>
                  {days.map((value, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1} ngày
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <table className="table table-striped text-center">
                <thead>
                  <tr className="table-primary">
                    <th>Đơn giá</th>
                    <th>Số ngày</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{[2000, 20000, 30000][typeOfNews - 1]}</td>
                    <td>{dayOfNews}</td>
                    <td>{CalculatePrice(typeOfNews, dayOfNews)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col"></div>
            <div className="col">
              <button className="btn btn-primary container" type="submit">
                Đăng bài
              </button>
            </div>
            <div className="col"></div>
          </div>
        </form>

        <div
          style={{ border: "1px solid black", height: "fit-content" }}
          className="col-4 px-0"
        >
          <h3 className="ps-2">Hướng dẫn đăng tin</h3>
          <ul className="text-start">
            <li>
              <b>Thông tin có dấu * là bắt buộc</b>
            </li>
            <li>
              <b>Nội dung phải viết bằng tiếng Việt có dấu</b>
            </li>
            <li>
              <b>
                Tiêu đề tin không dài quá 100 kí tự Các bạn nên điền đầy đủ
                thông tin vào các mục để tin đăng có hiệu quả hơn
              </b>
            </li>
            <li>
              Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy
              sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng
              vị trí của tin rao
            </li>
            <li>
              Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so
              với tin rao không có ảnh
            </li>
            <li>Hãy đăng ảnh để được giao dịch nhanh chóng!</li>
          </ul>
        </div>
      </div>
      <Alert
        style={{
          width: "400px",
          height: "auto",
          textWrap: "wrap",
          position: "fixed",
          right: "12px",
          bottom: "50px",
        }}
        show={success}
        variant="success"
      >
        <p>
          Bài đăng sẽ được kiểm duyệt sớm nhất, bạn có thể kiểm tra trạng thái
          bài đăng <Link to="/account/quan-li-tin">tại đây</Link>
        </p>
      </Alert>
      <Alert
        style={{
          width: "400px",
          height: "auto",
          textWrap: "wrap",
          position: "fixed",
          right: "12px",
          bottom: "50px",
        }}
        show={error}
        variant="error"
      >
        <p>
          Có điều gì đó không đúng xảy ra khiến bài đăng không được gửi, hãy
          kiểm tra và thử lại
        </p>
      </Alert>
    </>
  );
};

export default UploadForm;
