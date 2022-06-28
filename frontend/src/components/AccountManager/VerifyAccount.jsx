import React from 'react'
import { useContext } from 'react';
import AuthContext from "../../contexts/AuthContext"
function VerifyAccount() {

  const { user } = useContext(AuthContext);
  const handleSendVerifyAccount = (uid) => {
            
  }
  return (
    <ul className="mt-3" style={{listStyle: 'none'}}>
      <li>
        Cung cấp giấy tờ tùy thân (cmnd,cccd, license drive)
      </li>
      <li>
        Cung cấp giấy tờ sở hữu và sử dụng đất
      </li>

      <li>
        <button className="btn btn-primary" onClick={() => handleSendVerifyAccount(user.uid)}>Xác thực</button>
      </li>
    </ul>
  )
}

export default VerifyAccount