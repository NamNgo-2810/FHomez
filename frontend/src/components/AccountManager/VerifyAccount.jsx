import React from "react";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { productService } from "../../services/home.service";
function VerifyAccount() {
  const { user } = useContext(AuthContext);
  const handleSendVerifyAccount = async (uid) => {
    productService.sendRequestVerify(uid).then(() => {
      window.location.reload();
    });
  };
  return (
    <ul className="mt-3" style={{ listStyle: "none" }}>
      {user.isWaitingForVerify ? (
        <li>
          Tài khoản của bạn đang đợi để xác thực, chúng tôi sẽ thông báo sớm
          nhất
        </li>
      ) : (
        <>
          <li>Cung cấp giấy tờ tùy thân (cmnd,cccd, license drive)</li>
          <li>Cung cấp giấy tờ sở hữu và sử dụng đất</li>

          <li>
            <button
              className="btn btn-primary"
              onClick={() => handleSendVerifyAccount(user.user_id)}
            >
              Xác thực
            </button>
          </li>
        </>
      )}
    </ul>
  );
}

export default VerifyAccount;
