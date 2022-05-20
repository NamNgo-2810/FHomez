import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
// import styles from "./Header.module.scss";

function Header() {
  const [registerShow,setRegisterShow] = useState(false)
  const [loginShow,setLoginShow] = useState(false)
  
  return (
    // navbar-expand-sm -> Các phần tử hiện thị theo chiều ngang ở màn hình > sm và theo chiều dọc ở màn hình sm 

    <div style={{ height:'80px',position:'fixed',top:'0',zIndex:999}} className="container-fluid navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <Link
          className="navbar-brand fs-2 fw-normal"
          to="/"
          style={{ color: "#df9c9d" }}
        >
          <img
            src="https://cdn.thukyluat.vn/nhch-images//CauHoi_Hinh/9eb6abaa-8cda-456c-ad66-26ba4da23ffe.jpg"
            alt=""
            width="60"
            height="48"
            className="d-inline-block align-text-bottom"
          />
          FHomez
        </Link>
        <button
          className="navbar-toggler d-sm-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMobile"
          aria-controls="navbarMobile"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMobile">
          <ul className="navbar-nav mr-auto w-100 flex-row justify-content-end align-items-center">
            <li className="nav-item active">
                <button style={{width: '125px'}} className="btn btn-light btn-block" onClick={() => setRegisterShow(true)}>Đăng kí</button>
            </li>
            <li className="nav-item">
                <button style={{width: '125px',backgroundColor:'#f6dddf'}} className="btn btn-block"
                onClick={() => setLoginShow(true)}>Đăng nhập</button>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/upload">
                <button style={{width: '125px'}} className="btn btn-primary btn-block">Đăng bài</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Register show={registerShow} setShow={setRegisterShow}></Register>
      <Login show={loginShow} setShow={setLoginShow}></Login>
    </div>
  );
}

export default Header;
