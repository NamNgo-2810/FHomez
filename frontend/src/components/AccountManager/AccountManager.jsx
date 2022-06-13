import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";

// Handle message error validation
const validationSchema = yup.object().shape({
  name: yup.string(),
});

function AccountManager() {
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const handleUpdateAccount = () => {
    
  };

  return (
    <div className="container border">
      <h3 className="text-start mt-3">Thông tin tài khoản</h3>
      <hr />
      <div className="row">
        <div className="col-4">
          <Form
            className="d-flex flex-column align-items-center text-start ms-3"
            onSubmit={() => handleSubmit(handleUpdateAccount)}
          >
            <Form.Group className="mb-3 container">
              <Form.Label>Mã tài khoản</Form.Label>
              <Form.Control value="uid" disabled />
            </Form.Group>
            <Form.Group className="mb-3 container">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control value="sdt" disabled />
            </Form.Group>
            <Form.Group className="mb-3 container">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                defaultValue="Long"
                {...register("name", { required: true })}
              />
              <span style={{ color: "red" }}>{errors.name?.message}</span>
            </Form.Group>

            <Form.Group className="mb-3 container">
              <Button type="submit" className="btn btn-primary container">
                Cập nhật thông tin
              </Button>
            </Form.Group>
          </Form>
        </div>
        <div className="col-4">
          <div className="border text-start ps-3 mt-3" style={{height:'40px',lineHeight:'40px'}}>Số dư: <b style={{color: '#0d6efd',fontSize: '17px'}}>0đ</b></div>
        </div>
      </div>
    </div>
  );
}

export default AccountManager;
