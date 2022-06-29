import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { FcAcceptDatabase } from "react-icons/fc";
import { GiThink } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { productService } from "../../services/home.service";


function PostManager() {
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState([]);
  useEffect(() => {
    async function fetchHomeByUserId() {
      let result = await productService.getHomeByUserId(user.user_id)
      setPost(result)
    }

    fetchHomeByUserId()
  }, []);

  const handleDelete = async(id) => {
    await productService.deleteHome(id)
  }

  return (
    <table className="mt-3 table">
      <thead>
        <tr>
          <th>#</th>
          <th>Link xem trước bài đăng</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {post &&
          post.map((e, i) => (
            <tr key={"post" + e.motel_id}>
              <th>{i + 1}</th>
              <td>
                {" "}
                <Link target="_blank" to={`/products/${e.motel_id}`}>
                  {e.motel_id}
                </Link>
              </td>
              <td>
                {
                  {
                    "-1": <div style={{color:'red'}}><FcCancel /> Bị từ chối</div>,
                    0: <div style={{color: 'orange'}}><GiThink/> Đang xem xét</div>,
                    1: <div style={{color:'green'}}><FcAcceptDatabase /> Đã được duyệt</div>,
                  }[e.status]
                }
              </td>
              <td>
                <button className="btn btn-primary" onClick={() => handleDelete(e.motel_id)}>Xóa bài</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default PostManager;

// Ctrl + Shift + K	Xóa dòng con trỏ đang đứng
// Ctrl + Shift + Enter	Thêm 1 dòng trống phía trên dòng hiện tại
// Ctrl + Enter	Thêm 1 dòng trống phía dưới dòng hiện tại
// Ctrl + G	Di chuyển đến dòng
// Shift + Alt + F	Định dạng lại file (theo ngôn ngữ lập trình)
