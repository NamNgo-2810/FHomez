import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Form, Modal } from "react-bootstrap";
import { FaFacebookF, FaGoogle, FaSignInAlt } from "react-icons/fa";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";

// Handle message error validation
const validationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Số điện thoại không được để trống")
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
      "Số điện thoại không đúng định dạng"
    ),
  password: yup.string().required("Mật khẩu không được để trống"),
});

function Login({show,setShow}) {
  

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} className={styles.modal}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Control
                type="tel"
                {...register("phoneNumber", { required: true })}
                placeholder="Nhập số điện thoại"
              />
              <span style={{ color: "red" }}>
                {errors.phoneNumber?.message}
              </span>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                {...register("password", { required: true })}
                placeholder="Nhập mật khẩu"
              />
              <span style={{ color: "red" }}>{errors.password?.message}</span>
            </Form.Group>
            <Form.Group className="mb-3 mx-1 row">
              <Form.Check
                className="col"
                type="checkbox"
                label="Nhớ tài khoản"
              />
              <Form.Text className="col ml-3 text-end text-info">
                <span>Quên mật khẩu ?</span>
              </Form.Text>
            </Form.Group>
            <Form.Group className="d-grid gap-2">
              <Button className={styles.signIn} type="submit">
                <FaSignInAlt className="me-1 mb-1"/>
                Đăng nhập
              </Button>
              <hr />
              <Button className={`${styles.fSignIn} d-flex align-items-center justify-content-center`}>
                <FaFacebookF />
                Đăng nhập bằng facebook
              </Button>
              <Button className={`${styles.gSignIn} d-flex align-items-center justify-content-center`}>
                <FaGoogle className="me-1 ms-1" /> 
                Đăng nhập bằng google
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          {/* Need handle open sign up form */}
          Chưa có tài khoản ?{" "}
          <span className="text-info">
            <Link to="/signup" style={{ cursor: "pointer",textDecoration:'none' }}>Đăng kí</Link>
          </span>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
