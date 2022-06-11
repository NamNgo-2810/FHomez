import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Form, Modal } from "react-bootstrap";
import { FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { userService } from "../../services/user.service.js";
import styles from "./Register.module.scss";

// Handle message error validation
const validationSchema = yup.object().shape({
    phoneNumber: yup
        .string()
        .required("Số điện thoại không được để trống")
        .matches(
            /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
            "Số điện thoại không đúng định dạng"
        ),
    username: yup
        .string()
        .required("Tên không được để trống")
        .min(10, "Tên quá ngắn")
        .max(50, "Tên quá dài"),
    password: yup
        .string()
        .required("Mật khẩu không được để trống")
        .min(8, "Mật khẩu quá ngắn")
        .max(30, "Mật khẩu quá dài"),
    rePassword: yup
        .string()
        .required("Mật khẩu không được để trống")
        .oneOf(
            [yup.ref("password"), null],
            "Mật khẩu mới nhập không trùng khớp"
        ),
});

function Register({ setShow }) {
    // Declare state
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const [existedPhoneNumber, setExistedPhoneNumber] = useState(false);

    // react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) });
    const onSubmit = async (data) => {
        const response = await userService.register(data);
        console.log("response", response);
        if (response.data === "Phone number existed") {
            setExistedPhoneNumber(true);
        }
        // setShow(0);
    };

    return (
        <>
            <Modal show={true} onHide={() => setShow(0)}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng kí</Modal.Title>
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
                                {existedPhoneNumber
                                    ? "Phone number existed"
                                    : errors.phoneNumber?.message}
                            </span>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                {...register("username", { required: true })}
                                placeholder="Nhập họ và tên"
                            />
                            <span style={{ color: "red" }}>
                                {errors.username?.message}
                            </span>
                        </Form.Group>
                        <Form.Group className={"mb-3 " + styles["p-relative"]}>
                            <Form.Control
                                type={showPass1 ? "text" : "password"}
                                {...register("password", { required: true })}
                                placeholder="Nhập mật khẩu"
                            />
                            {showPass1 ? (
                                <FaEye
                                    className={styles["fa-eye"]}
                                    onClick={() => setShowPass1(!showPass1)}
                                />
                            ) : (
                                <FaEyeSlash
                                    className={styles["fa-eye"]}
                                    onClick={() => setShowPass1(!showPass1)}
                                />
                            )}
                            <span style={{ color: "red" }}>
                                {errors.password?.message}
                            </span>
                        </Form.Group>
                        <Form.Group className={"mb-3 " + styles["p-relative"]}>
                            <Form.Control
                                type={showPass2 ? "text" : "password"}
                                {...register("rePassword", { required: true })}
                                placeholder="Nhập lại mật khẩu"
                            />
                            {showPass2 ? (
                                <FaEye
                                    className={styles["fa-eye"]}
                                    onClick={() => setShowPass2(!showPass2)}
                                />
                            ) : (
                                <FaEyeSlash
                                    className={styles["fa-eye"]}
                                    onClick={() => setShowPass2(!showPass2)}
                                />
                            )}
                            <span style={{ color: "red" }}>
                                {errors.rePassword?.message}
                            </span>
                        </Form.Group>
                        <Form.Group className="d-grid gap-2">
                            <Button className="sign-up" type="submit">
                                <FaSignInAlt className="me-1 mb-1" />
                                Đăng kí
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    {/* Need handle open sign in form */}
                    Đã có tài khoản ?{" "}
                    <span
                        className="text-info"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShow(2)}
                    >
                        Đăng nhập
                    </span>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Register;
