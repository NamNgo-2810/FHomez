import React from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";


// Handle message error validation
const validationSchema = yup.object().shape({
  name: yup.string(),
  address: yup.string(),

});

function AccountManager() {

  const handleUpdateAccount = () => {

  }

  return (
    <div className="container border" style={{height:'300px'}}>
      <h1>Thông tin tài khoản</h1>
      <hr />
      <form onSubmit={() => handleUpdateAccount()}>

      </form>
    </div>
  )
}

export default AccountManager