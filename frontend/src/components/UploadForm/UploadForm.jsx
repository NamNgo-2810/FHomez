import React, { useState, useMemo } from "react";
import { storage } from "../../services/firebase.service";
import styles from "./UploadForm.module.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "react-bootstrap";
import PreviewImage from "./PreviewImage";
import { firestore } from "../../services/firebase.service.js";

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
  name: yup.string().required("Tên người cho thuê không được để trống"),
  phone: yup
    .string()
    .required("Số điện thoại không được để trống")
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
      "Số điện thoại không đúng định dạng"
    ),
  typeOfNews: yup.number().required("Loại tin không được để trống"),
  dayOfNews: yup.number().required("Số ngày đăng tin không được để trống"),
});

const UploadForm = () => {
  const [files, setFiles] = useState([]);
  const [show, setShow] = useState(false);
  const days = useMemo(() => Array.from(new Array(100), (x) => 1), []);
  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });
  const onSubmit = async (data) => {

    if (files.length !== 0) {
      const promises = [];
      const uid = Date.now();
      files.forEach((file) => {
        const uploadTask = storage.ref(`${uid}/${file.path}`).put(file);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log("ok");
          },
          (error) => {
            console.log(error);
          }
        );
      });
      Promise.all(promises)
        .then(() => {
          data.files = uid;

          // store to firebase
          firestore
            .collection("posts")
            .doc()
            .set(data)
            .then(() => {
              console.log("success");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => console.log(err));
    } else {
      alert("Pls choose at least 1 image");
    }

    // reset form
    // reset({ ...data });
  };

  return (
    <>
      <div className={`${styles.container} container row`}>
        <form className="col-8 text-start" onSubmit={handleSubmit(onSubmit)}>
          <div className="row shadow bg-body rounded mb-5">
            <h3>Địa chỉ cho thuê</h3>
            <div className="row mt-3 mb-3">
              <div className="col">
                <label>Quận/Huyện(*)</label>
                <select className="form-select" {...register("district")}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <p style={{ color: "red" }}>{errors.district?.message}</p>
              </div>
              <div className="col"></div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label>Phường/Xã(*)</label>
                <select className="form-select" {...register("subDistrict")}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <p style={{ color: "red" }}>{errors.subDistrict?.message}</p>
              </div>
              <div className="col">
                <label>Đường/Phố(*)</label>
                <select className="form-select" {...register("street")}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
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
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
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
                  <input className="form-control" {...register("name")} />
                </div>
                <p style={{ color: "red" }}>{errors.name?.message}</p>
              </div>
              <div className="col">
                <label>Điện thoại(*)</label>
                <div className="input-group">
                  <input className="form-control" {...register("phone")} />
                </div>
                <p style={{ color: "red" }}>{errors.phone?.message}</p>
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
                    <td>30.000 đ/ngày</td>
                    <td>189.000 đ/tuần</td>
                    <td>720.000 đ/tháng</td>
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
                    <td>20.000 đ/ngày</td>
                    <td>126.000 đ/tuần</td>
                    <td>480.000 đ/tháng</td>
                  </tr>
                  <tr>
                    <td
                      style={{ textTransform: "uppercase", fontWeight: "bold" }}
                    >
                      Tin thường
                    </td>
                    <td>2.000 đ/ngày</td>
                    <td>12.600 đ/tuần</td>
                    <td>48.000 đ/tháng</td>
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
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
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
        show={show}
        variant="success"
        onClose={() => setShow(false)}
        dismissible
      >
        <p>
          Bài đăng sẽ được kiểm duyệt sớm nhất, bạn có thể kiểm tra trạng thái
          bài đăng tại đây
        </p>
      </Alert>
    </>
  );
};

export default UploadForm;
