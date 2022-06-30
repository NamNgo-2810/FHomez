import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminService } from "../../services/admin.service";
import { productService } from "../../services/home.service";

function VerifyPost() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    async function fetchHomeByStatus() {
      let result = await productService.getHomeByStatus();
      setPost(result);
    }

    fetchHomeByStatus()
  }, []);

  const handleAccept = async (id) => {
    await adminService.blogApproval(id);
    window.location.reload();
  };
  const handleReject = async (id) => {
    await adminService.blogApproval(id);
    window.location.reload();
  };

  return (
    <table className="mt-3 table">
      <thead>
        <tr>
          <th>#</th>
          <th>Link xem trước bài đăng</th>
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
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleAccept(e.motel_id)}
                >
                  Chấp nhận
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleReject(e.motel_id)}
                >
                  Từ chối
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default VerifyPost;
