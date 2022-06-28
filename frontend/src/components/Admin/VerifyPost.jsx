import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function VerifyPost() {
  const [post, setPost] = useState([]);
  useEffect(() => {
   
  }, []);

  const handleAccept = (id) => {
    
  };
  const handleReject = (id) => {
   
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
            <tr key={"post" + e.id}>
              <th>{i + 1}</th>
              <td>
                {" "}
                <Link target="_blank" to={`/products/${e.id}`}>
                  {e.id}
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleAccept(e.id)}
                >
                  Chấp nhận
                </button>
                <button className="btn btn-danger" onClick={() => handleReject(e.id)}>
                  Từ chối
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default VerifyPost;
