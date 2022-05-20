import React, { useState } from "react";
import { storage } from "../../services/firebase.service";

const UploadForm = () => {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = () => {
    if (images.length !== 0) {
      const promises = [];
      images.forEach((image) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            console.log(error);
          },
          async () => {
            await storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((urls) => {
                setUrls((prevState) => [...prevState, urls]);
              });
          }
        );
      });

      Promise.all(promises)
        .then(() => alert("All images uploaded"))
        .catch((err) => console.log(err));
    } else {
      alert("Pls choose at least 1 image");
    }
  };


  return (
    <>
      <div className="container mt-300">
        <form>
          <div class="row align-items-start">
            <div class="col">One of three columns</div>
            <div class="col">One of three columns</div>
            <div class="col">One of three columns</div>
          </div>
          <div class="row align-items-center">
            <div class="col">One of three columns</div>
            <div class="col">One of three columns</div>
            <div class="col">One of three columns</div>
          </div>
          <div class="row align-items-end">
            <div class="col">One of three columns</div>
            <div class="col">One of three columns</div>
            <div class="col">One of three columns</div>
          </div>
        </form>

        <div className="instruction">
          Thông tin có dấu * là bắt buộc. Nội dung phải viết bằng tiếng Việt có
          dấu Tiêu đề tin không dài quá 100 kí tự Các bạn nên điền đầy đủ thông
          tin vào các mục để tin đăng có hiệu quả hơn. Để tăng độ tin cậy và tin
          rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao của bạn trên
          bản đồ bằng cách kéo icon tới đúng vị trí của tin rao. Tin đăng có
          hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không
          có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng!
        </div>
      </div>
      <progress value={progress} max="100" />
      <br />
      <br />
      <input type="file" multiple onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      <br />
      {urls.map((url, i) => (
        <img
          key={i}
          style={{ width: "500px" }}
          src={url || "http://via.placeholder.com/300"}
          alt="avatar"
        />
      ))}
    </>
  );
};

export default UploadForm;
