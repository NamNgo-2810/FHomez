import React, { useState } from "react";
import { useEffect } from "react";
import { adminService } from "../../services/admin.service";

function VerifyUser() {
  const [users, setUsers] = useState();
  useEffect(() => {
    async function fetchWaitingOwner() {
      let result = await adminService.waitOwnerIsWating();
      setUsers(result);
    }

    fetchWaitingOwner()
  }, []);

  const handleAccept = async (id) => {
    await adminService.acceptOwner(id);
  };
  const handleReject = async (id) => {
    await adminService.declineOwner(id);
  };

  return (
    <table className="mt-3 table">
      <thead>
        <tr>
          <th>#</th>
          <th>Thông tin người dùng</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((e, i) => (
            <tr key={"users" + i}>
              <td>{i + 1}</td>
              <td>{e.user_id}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleAccept(e.user_id)}
                >
                  Chấp nhận
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleReject(e.user_id)}
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

export default VerifyUser;
